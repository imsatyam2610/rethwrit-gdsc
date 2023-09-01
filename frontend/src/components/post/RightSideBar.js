import RightTopAd from "@/components/post/widgets/RightTopAd";
import "../../styles/posts/mainContent.scss";
import RightLastAd from "@/components/post/widgets/RightLastAd";
import RightDynamic from "@/components/post/widgets/RightDynamic";
import RightCommon from "@/components/post/widgets/RightCommon";
const RightSideBar = ({ widgetData }) => {
  return (
    <>
      <aside className="max-lg:m-1">
        <RightTopAd />
        <RightDynamic data={widgetData} />
        <RightCommon />
        <RightLastAd />
      </aside>
    </>
  );
};
export default RightSideBar;
