import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";

import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) return null;

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-gray-700">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer bg-[#ffffff1f] p-2 rounded-full"
            onClick={() => router.back()}
          >
            <IoMdClose className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              ref={videoRef}
              onClick={onVideoClick}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[46%] left-[48%] cursor-pointer">
            {!playing && (
              <div>
                <button type="button" onClick={onVideoClick} className="">
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer ">
          <div className="bg-[#ffffff1f] px-2 pt-2 pb-1 rounded-full">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-white text-3xl lg:text-3xl" />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-white text-3xl lg:text-3xl" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[600px]">
        <div className="lg:mt-10 mt-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-14 md:h-14 w-12 h-12">
              <Link href="/">
                <>
                  <Image
                    src={post.postedBy.image}
                    width={62}
                    height={62}
                    className="rounded-full"
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex flex-col mt-3">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    @{post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-7 text-md text-gray-600">{post.caption}</p>
          <div className="mb-3 px-7">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
