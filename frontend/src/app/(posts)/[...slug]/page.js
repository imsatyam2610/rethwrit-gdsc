import { notFound } from "next/navigation";
import PostLayout from "@/components/post/Layout";
import CommentForm from "@/components/post/Comment";
import RightSideBar from "@/components/post/RightSideBar";
import "@/styles/posts/post.scss";
import { sanitize } from "isomorphic-dompurify";
import { WidgetProvider } from "@/context/WidgetContext";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const slug = params.slug.join("/");
  try {
    const res = await fetch(`${process.env.API_URL}posts/slugseo/${slug}`, {
      method: "GET",
    });
    if (!res.ok) {
      notFound();
    }
    const data = await res.json();
    const seo = data.seo;
    const slugu = data.slug;
    const image = data.featured_image;
    const createdAt = data.createdAt;
    const updatedAt = data.createdAt;
    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.metaKeyword,
      metadataBase: new URL("https://rethwrit.com"),
      alternates: {
        canonical: `/${slugu}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription,
        url: `https://rethwrit.com/${slugu}`,
        siteName: "Rethwrit",
        images: [
          {
            url: image,
            width: 1200,
            height: 600,
          },
        ],
        locale: "en_IN",
        type: "article",
        publishedTime: createdAt,
        modifiedTime: updatedAt,
      },
    };
  } catch (error) {
    console.error("Error fetching Metadata:");
  }
}

const PostPage = async ({ params }) => {
  const slug = params.slug.join("/");
  try {
    const response = await fetch(`${process.env.API_URL}posts/sluget/${slug}`, {
      method: "GET",
      next: { revalidate: 86400 },
    });
    if (!response.ok) {
      notFound();
    }
    const post = await response.json();
    const sanitizedHtml = sanitize(post.content);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://rethwrit.com/${post.slug}`,
      },
      datePublished: `${post.createdAt}`,
      dateModified: `${post.updatedAt}`,
      headline: `${post.title}`,
      author: {
        "@type": "Person",
        name: "Admin",
      },
      publisher: {
        "@type": "Organization",
        name: "Rethwrit",
        logo: {
          "@type": "ImageObject",
          url: "",
        },
      },
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <WidgetProvider>
          <Suspense fallback={<p>Load</p>}>
            <PostLayout>
              <div className="content m-1 sm:m-3">
                <div className="container-post">
                  <div className="top  p-3 rounded-tr-md rounded-tl-md">
                    <div className="info">
                      <h1 className="title sm:text-3xl text-2xl">
                        {post.title}
                      </h1>
                    </div>
                  </div>
                  <div className="Content_Body mt-2 p-3 rounded-br-md rounded-bl-md">
                    <div
                      className="content text-base"
                      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                    />
                  </div>
                </div>
                <div className="comment mt-2">
                  <CommentForm postId={post._id} />
                </div>
              </div>
              <Suspense fallback={<p>Loading</p>}>
                <RightSideBar widgetData={post.widget} />
              </Suspense>
            </PostLayout>
          </Suspense>
        </WidgetProvider>
      </>
    );
  } catch (error) {
    console.error("Error fetching Article:");
  }
};

export default PostPage;
