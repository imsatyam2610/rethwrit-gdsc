"use client";
import { useContext } from "react";
import { WidgetContext } from "@/context/WidgetContext";

const RightLastAd = () => {
  const { widgets } = useContext(WidgetContext);
  const widgetId = "649d30d6382e8cae3b3a0b44";
  const widget = widgets.find((item) => item._id === widgetId);

  return (
    <>
      {!widget ? (
        <div>
          <p className="text-2xl text-gray-600 text-center">ADVERTISEMENT</p>
        </div>
      ) : (
        <div className="ads_common sticky top-0 p-1 rounded-br-md rounded-bl-md">
          <h4 className="text-gray-500 text-center">{widget.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: widget.content }} />
        </div>
      )}
    </>
  );
};
export default RightLastAd;
