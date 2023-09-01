import NewsLayout from "@/components/news/Layout";
import "@/styles/posts/mainContent.scss";
import CommentForm from "@/components/post/Comment";
import RightSideBar from "@/components/post/RightSideBar";
import { WidgetProvider } from "@/context/WidgetContext";
import RightTopAd from "@/components/post/widgets/RightTopAd";
import RightLastAd from "@/components/post/widgets/RightLastAd";
import RightCommon from "@/components/post/widgets/RightCommon";

export default function page() {
  return (
    <>
      <NewsLayout>
        <WidgetProvider>
          <div className="content m-1 sm:m-3">
            <div className="container-post">
              <div className="top p-3 rounded-tr-md rounded-tl-md">
                <h1 className="title sm:text-3xl text-2xl">News Title</h1>
              </div>
              <div className="flex items-center justify-between my-1 top p-1">
                <span>Updated: Date</span>
                <div className="">Follow Share</div>
              </div>
              <div className="flex items-center my-1 top p-1">
                <span>Summary:</span>
                <div className="ml-2">Excerpt go here</div>
              </div>
              <div className="Content_Body p-3 rounded-br-md rounded-bl-md">
                {/* <div
                className="content text-base"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              /> */}
              </div>
            </div>
            <div className="comment mt-2">
              <CommentForm />
            </div>
          </div>
          <aside>
            <RightTopAd />
            <RightCommon />
            <RightLastAd />
          </aside>
        </WidgetProvider>
      </NewsLayout>
    </>
  );
}
