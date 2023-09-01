"use client";
import "../../../styles/tools/jcp.scss";
import React, { useState, useEffect } from "react";
import { parse } from "papaparse";
import { Listbox } from "@headlessui/react";

const COLLEGE_TYPES = ["iit", "nit", "iiit", "gfti"];
const COMMON_HEADERS = [
  "Institute",
  "Program",
  "Quota",
  "Duration",
  "Degree",
  "Category",
  "Gender",
  "Opening Rank",
  "Closing Rank",
];
const YEARS = ["2021", "2022", "2023"];

export default function CollegePredictor() {
  const [selectedYear, setSelectedYear] = useState(YEARS[2]); // Set the initial year
  const [rank, setRank] = useState("");
  const [instituteType, setInstituteType] = useState("iit");
  const [institute, setInstitute] = useState("All");
  const [degree, setDegree] = useState("All");
  const [program, setProgram] = useState("All");
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("All");
  const [colleges, setColleges] = useState([]);

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const handleInstituteTypeChange = (e) => {
    setInstituteType(e.target.value);
    setColleges([]); // Clear colleges when the institute_type changes
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const tocategory = ["All", "OBC-NCL"];
  const toinstitute = ["All", "IIT-Bombay"];
  const toprogram = [
    "All",
    "Aerospace Engineering",
    "BS in Mathematics",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Economics",
    "Electrical Engineering",
    "Energy Engineering",
    "Engineering Physics",
    "Environmental Science and Engineering	",
    "Mechanical Engineering",
    "Metallurgical Engineering and Materials Science",
  ];
  const toduration = ["All", "4 Years", "5 Years"];
  const todegree = ["All", "B.Tech", "M.Tech"];
  useEffect(() => {
    const applyFilters = (data) => {
      const openingRankKey = `${selectedYear}_opening_rank`;
      const closingRankKey = `${selectedYear}_closing_rank`;
      console.log(openingRankKey);
      if (rank <= 0 || isNaN(rank)) {
        return data.filter(
          (college) =>
            (institute === "All" || college.institute === institute) &&
            (degree === "All" || college.degree === degree) &&
            (program === "All" || college.program === program) &&
            (gender === "All" || college.gender === gender) &&
            (category === "All" || college.category === category) &&
            (duration === "All" || college.duration === duration) &&
            (instituteType === "All" ||
              college.institute_type.toLowerCase() === instituteType)
        );
      }
      return data.filter(
        (college) =>
          rank >= college[openingRankKey] &&
          rank <= college[closingRankKey] &&
          college.institute_type.toLowerCase() === instituteType &&
          (institute === "All" || college.institute === institute) &&
          (degree === "All" || college.degree === degree) &&
          (program === "All" || college.program === program) &&
          (gender === "All" || college.gender === gender) &&
          (category === "All" || college.category === category) &&
          (duration === "All" || college.duration === duration)
      );
    };

    const loadDataWithFilters = () => {
      fetch("/assets/files/csv/colleges.csv") // Assuming the colleges.csv is in the public folder
        .then((response) => response.text())
        .then((fileContent) => {
          const { data } = parse(fileContent, { header: true });
          const filteredData = applyFilters(data);
          setColleges(filteredData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    loadDataWithFilters();
  }, [
    rank,
    instituteType,
    selectedYear,
    institute,
    degree,
    program,
    gender,
    category,
    duration,
  ]);

  const getHeaders = () => {
    return ["Sr.", "Year", ...COMMON_HEADERS];
  };

  return (
    <>
      <div className="p-4 overflow-hidden">
        <div className="mb-4">
          <span className="rounded bg-blue-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            Select Year
          </span>
          {YEARS.map((year) => (
            <label
              key={year}
              className="inline-flex items-center mr-4 cursor-pointer"
            >
              <input
                type="radio"
                value={year}
                checked={selectedYear === year}
                onChange={handleYearChange}
                className="form-radio mr-2"
              />
              {year}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <span className="rounded bg-purple-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            College
          </span>
          {COLLEGE_TYPES.map((type) => (
            <label
              key={type}
              className="inline-flex items-center mr-4 cursor-pointer"
            >
              <input
                type="radio"
                value={type}
                checked={instituteType === type}
                onChange={handleInstituteTypeChange}
                className="form-radio mr-2"
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="mb-4 flex">
            <span className="rounded bg-teal-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Gender
            </span>
            <Listbox value={gender} onChange={setGender}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {gender}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40`}
                    >
                      {["All", "Gender-Neutral", "Female-Only"].map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Category */}
          <div className="mb-4 flex">
            <span className="rounded bg-blue-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Category
            </span>
            <Listbox value={category} onChange={setCategory}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {category}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40`}
                    >
                      {tocategory.map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Institute */}
          <div className="mb-4 flex">
            <span className="rounded bg-indigo-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Institute
            </span>
            <Listbox value={institute} onChange={setInstitute}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {institute}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40`}
                    >
                      {toinstitute.map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Program */}
          <div className="mb-4 flex">
            <span className="rounded bg-amber-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Program
            </span>
            <Listbox value={program} onChange={setProgram}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="text-ellipsis overflow-x-auto cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {program}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40 overflow-y-auto max-h-60`}
                    >
                      {toprogram.map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Duration */}
          <div className="mb-4 flex">
            <span className="rounded bg-orange-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Duration
            </span>
            <Listbox value={duration} onChange={setDuration}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {duration}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40`}
                    >
                      {toduration.map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Degree */}
          <div className="mb-4 flex">
            <span className="rounded bg-red-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
              Degree
            </span>
            <Listbox value={degree} onChange={setDegree}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="cursor-pointer bg-white border rounded-lg px-4 py-2 w-40 text-left">
                      {degree}
                    </Listbox.Button>
                    <Listbox.Options
                      className={`${
                        open ? "block" : "hidden"
                      } absolute z-10 mt-2 bg-white border rounded-lg w-40`}
                    >
                      {todegree.map((value) => (
                        <Listbox.Option key={value} value={value}>
                          {({ active }) => (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-blue-500"
                                  : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {value}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        {/* BOX  */}
        <div className="mr-4">
          <span className="rounded bg-green-700 px-6 pb-2 pt-2.5 mr-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            Rank
          </span>
          <input
            type="number"
            value={rank}
            onChange={handleRankChange}
            className="shadow-[1px_0px_1px_1px] rounded-lg px-4 py-2 mr-2"
            placeholder="Enter your rank"
          />
        </div>
        {colleges.length > 0 ? (
          <div className="overflow-auto">
            <table className="mt-4">
              <thead>
                <tr>
                  {getHeaders().map((header) =>
                    header === "Quota" && instituteType !== "nit" ? null : (
                      <th key={header} className="px-4 py-2">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {colleges.map((college, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{selectedYear}</td>
                    {getHeaders()
                      .slice(2)
                      .map((header) =>
                        header === "Quota" && instituteType !== "nit" ? null : (
                          <td key={header} className="px-4 py-2">
                            {header === "Opening Rank"
                              ? college[`${selectedYear}_opening_rank`]
                              : header === "Closing Rank"
                              ? college[`${selectedYear}_closing_rank`]
                              : college[
                                  header.toLowerCase().replace(/\s+/g, "_")
                                ]}
                          </td>
                        )
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="text-blue-700 text-lg font-bold text-center my-3">
              No Record Found
            </div>
          </>
        )}
      </div>
    </>
  );
}
