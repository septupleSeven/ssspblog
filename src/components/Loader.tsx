import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[calc(100vh-125px)] w-full px-[20px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-[30px]">
        <div id="loader"></div>
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
