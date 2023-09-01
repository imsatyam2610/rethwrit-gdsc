import ExamLayout from "@/components/exam/Layout";
import "@/styles/posts/mainContent.scss";
import CommentForm from "@/components/post/Comment";

export default function page() {
  return (
    <>
      <ExamLayout>
        <div className="content m-1 sm:m-3">
          <div className="top p-3 rounded-tr-md rounded-tl-md">
            <h1 className="title sm:text-3xl text-2xl">Exam Title</h1>
          </div>
          <div className="flex items-center justify-between my-1 top p-1">
            <div className="">Post Dynamic Menu Bar</div>
          </div>
          <div className="flex items-center my-1 top p-1">
            <span>Information:</span>
            <div className="ml-2">Excerpt go here</div>
          </div>
          <div className="lg:grid lg:grid-cols-[750px_350px] lg:max-xl:grid-cols-[minmax(600px,1fr)] lg:gap-5">
            <div className="container-post ">
              <div className="Content_Body p-3 rounded-br-md rounded-bl-md">
                {/* <div
                className="content text-base"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              /> */}
              </div>

              <div className="comment sm:mt-3 mt-1">
                <CommentForm />
              </div>
            </div>
          </div>
        </div>
      </ExamLayout>
    </>
  );
}
