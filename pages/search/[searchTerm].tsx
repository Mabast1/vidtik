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
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {isAccounts ? (
        <div className="mdmt-16">{}</div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      )}
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
