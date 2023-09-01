"use client";
import { Menu } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Logo = () => {
  const pathname = usePathname();
  const [menuButtonTitle, setMenuButtonTitle] = useState("Home");

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Doubt", path: "/doubt" },
    { title: "College", path: "/college" },
    { title: "News", path: "/news" },
    { title: "Exam", path: "/exam" },
    { title: "Tools", path: "/tool" },
  ];

  useEffect(() => {
    const currentPath = pathname;
    const matchedItem = menuItems.find((item) => item.path === currentPath);
    if (matchedItem) {
      setMenuButtonTitle(matchedItem.title);
    } else {
      setMenuButtonTitle("Home");
    }
  }, [pathname]);

  return (
    <>
      <div className="flex items-center">
        <Link href="/">
          <h2 className="text-xl">Rethwrit</h2>
        </Link>
        <Menu as="div" className="relative ml-2">
          {({ open }) => (
            <>
              {open && (
                <div className="fixed inset-0 bg-black opacity-10 z-30" />
              )}

              <Menu.Button
                className={`flex items-center ${
                  open
                    ? "relative text-sm shadow-md shadow-orange-400 pb-0 pr-1 pl-3.5 rounded-t-md py-2"
                    : null
                }`}
              >
                <span className="mr-1">{open ? "Go to" : menuButtonTitle}</span>
                <BiChevronDown className="h-5 w-5" />
              </Menu.Button>

              {open && (
                <Menu.Items
                  as="div"
                  className="z-50 origin-top-right absolute right-0 rounded-b-lg shadow-md shadow-orange-400 bg-dlmode focus:outline-none"
                >
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <Menu.Item key={item.title}>
                        {({ active }) => (
                          <Link
                            href={item.path}
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-orange-100 text-black" : null
                            }`}
                          >
                            {item.title}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Logo;
