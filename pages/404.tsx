import React from "react";

const NoPageFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2 text-lg text-black">
      <p>404</p>
      <div className="border-r-2 h-6" />
      <p>This page does not exist</p>
    </div>
  );
};

export default NoPageFound;
