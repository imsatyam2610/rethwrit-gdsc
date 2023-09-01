import { CollegePredictors } from "@/components/tool/CollegePredictors";
import Link from "next/link";

export default function Tools() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-3xl mt-4 font-bold">Tools</h1>
        <div className="block my-2">
          <h2 className="text-xl text-violet-800 border-2 border-dashed border-[#ccc] p-2 w-fit rounded-lg">
            College Predictors
          </h2>
          <p className="text-red-500">
            Enter your Rank and Get Personalized Rank Wise College List
          </p>
          <div className="container mx-auto py-2 grid md:grid-cols-3 gap-4">
            {CollegePredictors.map((item, index) => (
              <div
                key={index}
                className="shadow-md shadow-amber-700 p-2 rounded-md bg-dlmode min-h-[100px]"
              >
                <div className="flex items-center">
                  <div className="w-1/4 my-auto">{item.icon}</div>
                  <div className="block">
                    <Link href={item.path} className="hover:text-blue-700">
                      <h3 className="sm:text-2xl">{item.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="block">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Missing Something?</h3>
            <p className="text-indigo-700">
              Submit Your Desire Tool, We Design and Launch it Soon
            </p>
          </div>
          <div className="mx-auto w-[700px]">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSemgchqcXOW90j3Tx4jI6WnnoFkJPqlhio6VlAtiNiSl8L9aA/viewform?embedded=true"
              height="850"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}
