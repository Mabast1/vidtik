import React from "react";
import { FaRegComment } from "react-icons/fa";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-4xl text-gray-500">
        <FaRegComment />
      </p>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default NoResults;
