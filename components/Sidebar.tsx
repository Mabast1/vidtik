import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { TbUsers } from "react-icons/tb";
import { RiLiveLine } from "react-icons/ri";

import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  const brandLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded";
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-lg"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r border-gray-100 xl:border-0 p-3">
          <div className=" xl:border-b border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={brandLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-lg hidden xl:block">For You</span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <TbUsers />
                </p>
                <span className="text-lg hidden xl:block">Following</span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <RiLiveLine />
                </p>
                <span className="text-lg hidden xl:block">LIVE</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
