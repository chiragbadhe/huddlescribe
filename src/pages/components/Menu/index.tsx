import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Circle,
  Disc2,
  PhoneOff,
} from "lucide-react";
import Button from "../Button";
import Router from "next/router";

type Props = {
    userJoined : boolean
};

function Menu({userJoined}: Props) {
  const router = Router;

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isRecOn, setIsRecOn] = useState(false);

  const MicClick = () => {
    setIsMicOn((prev) => !prev);
  };

  const CamClick = () => {
    setIsCamOn((prev) => !prev);
  };

  const RecClick = () => {
    setIsRecOn((prev) => !prev);
  };

  const HandleEndCall = () => {
    router.push("/");
  };

  return (
    <div className="border border-white/10 rounded-[10px]  flex items-center p-[10px] px-[15px] space-x-[15px] opacity-80 cursor-pointer ">
      <button onClick={MicClick} className="hover:text-[#36C4F1] duration-300">
        {isMicOn ? <Mic /> : <MicOff />}
      </button>

      <button onClick={CamClick} className="hover:text-[#36C4F1] duration-300">
        {isCamOn ? <Video /> : <VideoOff />}
      </button>

      {userJoined && (
        <>
          <button
            onClick={RecClick}
            className="hover:text-[#36C4F1] duration-300"
          >
            {isRecOn ? <Circle /> : <Disc2 />}
          </button>
          <button
            onClick={HandleEndCall}
            className="hover:text-[#36C4F1] bg-red-700 p-1 rounded duration-300"
          >
            <PhoneOff />
          </button>
        </>
      )}
    </div>
  );
}

export default Menu;
function setIsOn(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.");
}
