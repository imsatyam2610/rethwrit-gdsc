import QuestionLayout from "@/components/doubt/QuesLayout";
import React from "react";
import "@/styles/posts/mainContent.scss";
import { WidgetProvider } from "@/context/WidgetContext";
import RightTopAd from "@/components/post/widgets/RightTopAd";
import RightCommon from "@/components/post/widgets/RightCommon";
import RightLastAd from "@/components/post/widgets/RightLastAd";
export default function page() {
  return (
    <>
      <QuestionLayout>
        <WidgetProvider>
          <div className="md:flex m-1 sm:m-3">
            <div className="h-auto md:sticky">
              <RightTopAd />
            </div>
            <div className="w-[700px] mx-auto">
              <div className="question bg-dlmode my-2 p-2 rounded-t-lg">
                <div className="font-bold">Question</div>
                <div className="my-1">
                  It is a question on ratio proportion….it is asked that if
                  a,b,c,d are in a proportion prove that
                </div>
              </div>
              <div className="answer bg-green-200 text-black my-2 p-2 rounded-b-lg">
                <div className="font-bold">Answer</div>
                <div className="my-1">
                  It is a question on ratio proportion….it is asked that if
                  a,b,c,d are in a proportion prove that
                </div>
              </div>
            </div>
            <aside>
              <RightCommon />
              <RightLastAd />
            </aside>
          </div>
        </WidgetProvider>
      </QuestionLayout>
    </>
  );
}
