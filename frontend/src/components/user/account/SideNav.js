import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

// export const doubtList = [
//   { id: 1, text: "My Doubts", path: "/account/doubt" },
//   { id: 2, text: "Ask Doubt", path: "/account/doubt/ask" },
// ];

export const AccountMenuItems = [
  {
    id: 1,
    text: "Account",
    icon: <MdOutlineDashboard size={16} />,
    path: "/account/",
  },
  {
    id: 2,
    text: "Comments",
    icon: <CiUser size={16} />,
    path: "/account/comments",
  },
  // {
  //   id: 10,
  //   text: "Doubt",
  //   icon: <HiOutlineAcademicCap size={16} />,
  //   submenu: true,
  //   data: doubtList,
  // },
];

const AccountSideNav = ({ isOpen }) => {
  return (
    <>
      <div
        className={`${
          isOpen
            ? "fixed top-12 left-0 max-w-[400px] w-full bg-dlmode h-full lg:hidden z-10"
            : "w-full p-3 pt-0"
        }`}
      >
        {AccountMenuItems.map((item) => (
          <div key={item.id} className="py-[8px] px-[4px] cursor-pointer">
            <nav aria-label="Side list items">
              <ul className="">
                <li className="p-0">
                  {item.path ? (
                    <Link href={item.path} className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.text}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  )}
                  {item.submenu ? (
                    <ul className="ml-6 text-sm">
                      {item.data.length &&
                        item.data.map((item) => (
                          <li key={item.id} className="py-1">
                            {item.path ? (
                              <Link href={item.path}>
                                <span>{item.text}</span>
                              </Link>
                            ) : (
                              <span>{item.text}</span>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </li>
              </ul>
            </nav>
          </div>
        ))}
      </div>
    </>
  );
};
export default AccountSideNav;
