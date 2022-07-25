import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

interface IProps {
  text: string;
  commentIcon: boolean;
}

const NoResults = ({ text, commentIcon }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-4xl text-gray-500">
        {commentIcon ? <FaRegComment /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default NoResults;
