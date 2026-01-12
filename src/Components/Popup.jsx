import React, { useState } from "react";
import { FaRectangleXmark } from "react-icons/fa6";

export default function Popup({ header, body }) {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <div
          className="fixed flex items-center justify-center w-[90vw] h-[90vh] bg-[linear-gradient(to_bottom,#9ad1fc_0%,#83c6f3_10%,#128ddf_50%,#0f75b9_50%,#137bc0_70%,#5bade4_100%)]
   z-10 ml-[5vw] mt-[5vh] rounded-xl shadow-2xl backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <div
            className="absolute top-5 right-5 text-3xl text-white cursor-pointer hover:text-red-500"
            onClick={handleClick}
          >
            <FaRectangleXmark />
          </div>
          <div className="w-[80vw] h-[80vh] text-center text-2xl text-black bg-white p-20 overflow-auto rounded-xl">
            <div className="flex justify-between mb-10">
              <button className="w-[10vw] h-[5vh] bg-[linear-gradient(to_bottom,#BBF26B_0%,#88C236_10%,#588515_50%,#3B590E_50%,#598513_70%,#AEED53_100%)] text-white border-solid border-white rounded-xl hover:cursor-pointer">
                Previous
              </button>
              <h1 className="text-4xl text-white justify-center w-[60%] bg-[linear-gradient(to_bottom,#9ad1fc_0%,#83c6f3_10%,#128ddf_50%,#0f75b9_50%,#137bc0_70%,#5bade4_100%)] backdrop-blur-md shadow-2xl border-solid border-white border-1 p-2">
                {header}
              </h1>
              <button className="w-[10vw] h-[5vh] bg-[linear-gradient(to_bottom,#BBF26B_0%,#88C236_10%,#588515_50%,#3B590E_50%,#598513_70%,#AEED53_100%)] text-white border-solid border-white rounded-xl hover:cursor-pointer">
                Next
              </button>
            </div>
            <div>{body}</div>
          </div>
        </div>
      )}
    </>
  );
}
