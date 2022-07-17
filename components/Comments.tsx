import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
import GoogleAuth from "./GoogleAuth";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-1 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-1 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              alt="user profile"
                              width={34}
                              height={34}
                              className="rounded-full"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block ">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <BsCheckCircleFill className="text-blue-400" />
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="ml-11 -mt-2 text-gray-500">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet, Be the first to say something..." />
        )}
      </div>
      {userProfile ? (
        <div className="absolute bottom-0 left-0 pb-10 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comments"
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      ) : (
        <div className="xl:flex hidden xl:flex-col xl:justify-center xl:items-center absolute bottom-10 left-auto pb-6 px-2 md:px-10">
          <p className="text-lg text-red-400 mb-4">
            You must be logged in to like or leave a comment!
          </p>
          <GoogleAuth />
        </div>
      )}
    </div>
  );
};

export default Comments;
