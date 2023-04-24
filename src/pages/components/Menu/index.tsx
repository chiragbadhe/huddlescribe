import React from "react";
import { Mic, MicOff, Video, VideoOff, Circle, Disc2 } from "lucide-react";

type Props = {};

function Menu({}: Props) {
  return (
    <div className="border border-white/10 rounded-[10px]  flex p-[10px] px-[15px] space-x-[15px] opacity-80 cursor-pointer ">
      <div className="hover:text-[#36C4F1] duration-300">
        <Mic />
      </div>

      <div className="hover:text-[#36C4F1] duration-300">
        <MicOff />
      </div>

      <div className="hover:text-[#36C4F1] duration-300">
        <Video />
      </div>

      <div className="hover:text-[#36C4F1] duration-300">
        <VideoOff />
      </div>

      <div className="hover:text-[#36C4F1] duration-300">
        <Circle />
      </div>

      <div className="hover:text-[#36C4F1] duration-300">
        <Disc2 />
      </div>
    </div>
  );
}

export default Menu;
