import SearchBar from "@/components/navbar/SearchBar";

const HomeSection1 = () => {
  return (
    <>
      <div className="flex md:h-[220px] h-[300px] flex-col items-center justify-center overflow-hidden">
        <div className="text-center max-w-[625px]">
          <h1 className="text-2xl mb-8">
            Unlock the Power of Education With Rethwrit
          </h1>
          <p>Explore Educational article by searching...</p>
        </div>
        <div className="text-center mx-auto max-w-[500px] w-full mt-1">
          <SearchBar />
        </div>
      </div>
    </>
  );
};
export default HomeSection1;
