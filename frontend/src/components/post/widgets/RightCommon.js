"use client";
import { useContext } from "react";
import { WidgetContext } from "@/context/WidgetContext";

const RightCommon = () => {
  const { widgets } = useContext(WidgetContext);
  const widgetId = "649d3236382e8cae3b3a0b4e";
  const widget = widgets.find((item) => item._id === widgetId);

  return (
    <>
      {!widget ? (
        <div>
          <p className="text-2xl text-gray-600 text-center">ADVERTISEMENT</p>
        </div>
      ) : (
        <div className="ads_common top my-3 p-1 rounded-tr-md rounded-tl-md">
          <h4 className="text-gray-500 text-center">{widget.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: widget.content }} />
        </div>
      )}
    </>
  );
};
export default RightCommon;
