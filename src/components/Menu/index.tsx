import React from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Circle,
  Disc2,
  PhoneOff,
} from "lucide-react";
import Router from "next/router";

import { useMenuStore } from "@/hooks/useMenuStore";
import { useRoom } from "@huddle01/react/hooks";

type Props = {
  userJoined: boolean;
};

function MenuWithState({ userJoined }: Props) {
  const router = Router;

  const { joinRoom, leaveRoom, isLoading, isRoomJoined, error } = useRoom();

  const { isMicOn, setIsMicOn, isCamOn, setIsCamOn, isRecOn, setIsRecOn } =
    useMenuStore();

  const MicClick = () => {
    setIsMicOn(!isMicOn);
  };

  const CamClick = () => {
    setIsCamOn(!isCamOn);
  };

  const RecClick = () => {
    setIsRecOn(!isRecOn);
  };

  const HandleEndCall = () => {
    leaveRoom();
    // router.push("/lobby");
    console.log(error);
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

export default MenuWithState;
