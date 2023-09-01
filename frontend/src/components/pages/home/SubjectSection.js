"use client";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useState, useEffect  } from "react";

const HomeSubjectSection = () => {
  const categories = [
    { id: "64a916a1caac472fff8651b6", name: "Sanskrit" },
    // { id: "hindi", name: "Hindi" },
    // { id: "history", name: "History" },
    // { id: "english", name: "English" },
    // { id: "gk", name: "General Knowledge" },
  ];
  return (
    <>
      <div className="bg-dlmode py-1">
        <div className="container mx-auto">
          <h2 className="sm:text-xl mb-1 text-blue-700">Subjects</h2>
          <Tab.Group>
            <Tab.List className="flex justify-evenly space-x-1 p-1">
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  className="border p-1 rounded-md border-yellow-600"
                >
                  {category.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {categories.map((category) => (
                <Tab.Panel key={category.id}>
                  <CategoryPosts categoryId={category.id} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

const CategoryPosts = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}page/search?categoryid=${categoryId}&limit=6`,
          { method: "GET", next: { revalidate: 3600 } }
        );
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 gap-2">
      {posts.map((post) => (
        <div key={post._id} className="shadow-lg p-2 rounded-md bg-dlmode">
          <Link prefetch={false} href={post.slug}>
            <h3 className="rounded-md m-1 p-2 bg-gray-200 text-black">
              {post.title}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeSubjectSection;
