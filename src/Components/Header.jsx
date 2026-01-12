import React from "react";

export default function Header() {
  return (
    <>
      <header
        id="main-header"
        className="fixed flex flex-wrap items-center justify-between z-5 bg-[linear-gradient(to_bottom,#9ad1fc_0%,#83c6f3_10%,#128ddf_50%,#0f75b9_50%,#137bc0_70%,#5bade4_100%)] p-4 mx-5 my-10 backdrop-blur-md shadow-2xl rounded-3xl w-[35vw]"
      >
        <div className="text-white">
          <div className="text-4xl font-medium mb-[2vh]">
            Hi, my name's Tuhina Das!
          </div>
          <div className="text-medium font-light">
            {" "}
            Welcome to my site -- feel free to click around :){" "}
          </div>
        </div>
        <span className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-10 transform -skew-x-12"></span>
      </header>
    </>
  );
}
