import { AiOutlineLineChart, AiOutlineHome } from "react-icons/ai";
import { MdVideoLabel } from "react-icons/md";
import { BiTennisBall } from "react-icons/bi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import { VscCircuitBoard } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";

export const notesList = [
  { id: 1, text: "Class 10" },
  { id: 2, text: "Class 9" },
];

export const ncertsolList = [
  { id: 1, text: "NCERT" },
  { id: 2, text: "NCERT Class 10" },
];

export const scienceList = [
  { id: 1, text: "Physics" },
  { id: 2, text: "Class 10" },
  { id: 3, text: "Class 10" },
];

export const sanskritList = [
  { id: 1, text: "Dhatu roop" },
  { id: 2, text: "Shabd Rooop" },
];

export const gkList = [
  { id: 1, text: "GK" },
  { id: 2, text: "History" },
];

export const financeList = [
  { id: 1, text: "Finance" },
  { id: 2, text: "Indian Economy" },
];

export const sideListItems = [
  // { id: 1, text: "Home", icon: <AiOutlineHome />, path: "/" },
  // { id: 2, text: "News", icon: <AiOutlineHome /> },
  // { id: 3, text: "Exams", icon: <BsBoxArrowInUpRight /> },
  {
    id: 9,
    nested: true,
    data: notesList,
    icon: <GiConsoleController />,
    text: "Notes",
  },
  {
    id: 10,
    nested: true,
    data: ncertsolList,
    icon: <BiTennisBall />,
    text: "NCERT Solution",
  },
  {
    id: 11,
    nested: true,
    data: sanskritList,
    icon: <AiOutlineLineChart />,
    text: "Sanskrit",
  },
  {
    id: 12,
    nested: true,
    data: scienceList,
    icon: <VscCircuitBoard />,
    text: "Science",
  },
  {
    id: 13,
    nested: true,
    data: financeList,
    icon: <MdVideoLabel />,
    text: "Finance",
  },
  {
    id: 14,
    nested: true,
    data: gkList,
    icon: <CiUser />,
    text: "GK",
  },
];
