import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { BsGear } from "react-icons/bs";

import { createOrGetUser } from "../utils";
import logo from "../utils/tiktik-logo.png";
import useAuthStore from "../store/authStore";
import GoogleAuth from "./GoogleAuth";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="border-b border-gray-200 h-[7vh] flex">
      <div className="w-full flex justify-between items-center py-2 px-4 xl:w-[1200px] m-auto">
        <Link href="/">
          <div className="w-[100px] md:w-[130px]">
            <Image
              src={logo}
              className=" cursor-pointer"
              alt="logo"
              layout="responsive"
            />
          </div>
        </Link>
        <div>Search</div>
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="border px-2 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-gray-100">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <div onClick={() => setProfileDropdown((prev) => !prev)}>
                  <>
                    <Image
                      src={userProfile.image}
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      alt="profile photo"
                    />
                  </>
                </div>
              )}
              {profileDropdown && (
                <div className="flex flex-col absolute bg-white drop-shadow-lg w-48 top-16 right-32 items-start justify-center p-2 rounded-md font-semibold z-10">
                  <Link href="/">
                    <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 w-full">
                      <BiUser className="text-xl" />
                      <p className="">View Profile</p>
                    </div>
                  </Link>
                  <Link href="/">
                    <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 w-full">
                      <BsGear className="text-xl" />
                      <p className="">Settings</p>
                    </div>
                  </Link>

                  <div className="border-t w-full">
                    <div
                      className="hover:bg-gray-100 w-full p-2 flex gap-2 cursor-pointer"
                      onClick={() => {
                        googleLogout();
                        removeUser();
                        setProfileDropdown(false);
                      }}
                    >
                      <AiOutlineLogout fontSize={21} />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <GoogleAuth />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
