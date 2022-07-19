import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32 ">
          <Image
            src={user.image}
            alt="user profile"
            width={120}
            height={120}
            className="rounded-full"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col">
          <p className="flex gap-1 items-center text-md md:text-2xl tracking-wide font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <BsCheckCircleFill className="text-blue-400" />
          </p>
          <p className="md:text-xl text-black text-xs">{user.userName}</p>
        </div>
      </div>
      <div className="">
        <div className="flex gap-10 mb-10 mt-10 border-b border-gray-200 bg-white">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default profile;
