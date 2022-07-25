import React, { useState } from "react";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b border-gray-200 bg-white">
        <div className={`w-1/4 flex justify-center ${accounts}`}>
          <p
            className="text-xl font-semibold cursor-pointer mt-2"
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
        </div>
        <div className={`w-1/4 flex justify-center ${isVideos}`}>
          <p
            className="text-xl font-semibold cursor-pointer mt-2"
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
      </div>
      {isAccounts ? <div>Accounts</div> : <div>Videos</div>}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
