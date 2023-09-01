import Link from "next/link";
import { MdBatchPrediction } from "react-icons/md";

const HomeToolSection = () => {
  const tools = [
    {
      name: "Josaa College Predictor",
      path: "/tool/josaa-college-predictor",
      icon: (
        <MdBatchPrediction className="mx-auto p-2 rounded-full w-12 h-12 dl-icon" />
      ),
      desc: "Rank wise Past Years Opening and Closing Rank College List",
    },
    {
      name: "CSAB College Predictor",
      path: "/tool/csab-college-predictor",
      icon: (
        <MdBatchPrediction className="mx-auto p-2 rounded-full w-12 h-12 dl-icon" />
      ),
      desc: "Rank wise Past Years Opening and Closing Rank College List",
    },
    {
      name: "NEET College Predictor",
      path: "/tool/neet-college-predictor",
      icon: (
        <MdBatchPrediction className="mx-auto p-2 rounded-full w-12 h-12 dl-icon" />
      ),
      desc: "Rank wise Past Years Opening and Closing Rank College List",
    },
  ];
  return (
    <>
      <>
        <div className="tool_section py-1">
          <div className="container mx-auto justify-between flex items-center">
            <h2 className="sm:text-xl">Trending Tools</h2>
            <Link
              prefetch={false}
              href="/tool"
              className="text-orange-700 hover:text-green-600 p-1 rounded border border-orange-700"
            >
              More
            </Link>
          </div>
          <div className="container mx-auto py-2 grid md:grid-cols-3 gap-4">
            {tools.map((item, index) => (
              <div
                key={index}
                className="shadow-lg p-2 rounded-md bg-dlmode min-h-[100px]"
              >
                <div className="flex items-center">
                  <div className="w-1/4 my-auto">{item.icon}</div>
                  <div className="block">
                    <Link
                      prefetch={false}
                      href={item.path}
                      className="hover:text-blue-700"
                    >
                      <span className="sm:text-2xl">{item.name}</span>
                    </Link>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
};
export default HomeToolSection;
