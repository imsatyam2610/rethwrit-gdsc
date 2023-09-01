import { sanitize } from "isomorphic-dompurify";

const RightDynamic = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <div
        className="ads_common top p-1 rounded-tr-md rounded-tl-md"
        dangerouslySetInnerHTML={{ __html: sanitize(data) }}
      />
    </>
  );
};
export default RightDynamic;
