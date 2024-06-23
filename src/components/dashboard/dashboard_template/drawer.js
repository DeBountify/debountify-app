import IconTemplate from "@/components/Icons/IconTemplate";
import { useEffect, useState } from "react";
import "./animations.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Drawer = ({ isCompany, isOpen }) => {
  const pathname = usePathname();
  const [activeDrawerItem, setActiveDrawerItem] = useState("dashboard");
  const [activeAuthItem, setActiveAuthItem] = useState("dashboard");

  const handleDrawerItemClick = (index) => {
    setActiveDrawerItem(index);
  };

  const handleAuthItemClick = (index) => {
    setActiveAuthItem(index);
  };
  const companyDrawer = [
    {
      id: "dashboard",
      label: "Dashboard",
      active: "false",
      icon: "carbon:dashboard",
      link: "/dashboard",
    },
    {
      id: "profile",
      label: "Profile",
      active: "false",
      icon: "iconamoon:profile-bold",
      link: `/dashboard/company/profile`,
    },
    {
      id: "createbounty",
      label: "Create Bounty ",
      active: "false",
      icon: "solar:wallet-linear",
      link: "/dashboard/company/createbounty",
    },
    {
      id: "reports",
      label: "Reports",
      active: "false",
      icon: "ic:outline-report",
      link: "/dashboard/company/reports",
    },
    {
      id: "programs",
      label: "Programs",
      active: "false",
      icon: "mdi:report-box-outline",
      link: "/dashboard/company/programs",
    },
  ];
  const userDrawer = [
    {
      id: "dashboard",
      label: "Dashboard",
      active: "false",
      icon: "carbon:dashboard",
      link: "/dashboard",
    },
    {
      id: "profile",
      label: "Profile",
      active: "false",
      icon: "iconamoon:profile-bold",
      link: "/dashboard/user/profile",
    },
    {
      id: "reports",
      label: "Bug Report",
      active: "false",
      icon: "ic:outline-report",
      link: "/dashboard/user/reports",
    },
    {
      id: "programs",
      label: "Programs",
      active: "false",
      icon: "mdi:report-box-outline",
      link: "/dashboard/user/programs",
    },
    {
      id: "leaderboard",
      label: "leaderboard",
      active: "false",
      icon:"material-symbols:social-leaderboard-outline",
      link: "/dashboard/user/leaderboard",
    },
  ];
  const drawerItems = isCompany ? companyDrawer : userDrawer;
  useEffect(() => {
    const activePath = pathname.split("/");
    setActiveDrawerItem(activePath[activePath?.length - 1] || "dashboard");
  }, [pathname]);
  return (
    <>
      <aside
        className={`bg-[#0F123F] shadow-sm ${
          isOpen ? "translate-x-0" : "translate-x-80"
        } fixed inset-0 z-50   h-[100vh] w-72  top-16 transition-transform duration-300 xl:translate-x-0 border border-[#0F123F]`}
      >
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            {drawerItems.map((item, index) => (
              <li key={index}>
                <Link className="" href={item.link}>
                  <button
                    className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg ${
                      activeDrawerItem === item.id
                        ? "bg-[#4CAF4F] text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85]"
                        : "text-[#FFFFFF] hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    } w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                    style={{ position: "relative", overflow: "hidden" }}
                    onClick={() => handleDrawerItemClick(item.id)}
                  >
                    <IconTemplate icon={item.icon} className="text-2xl" />{" "}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {item.label}
                    </p>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Drawer;
