import React, { useEffect, useRef, useState } from "react";
import { Ghost, Outdent } from "lucide-react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import { Address, useAccount } from "wagmi";

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from "@huddle01/react/hooks";

import { useDisplayName } from "@huddle01/react/app-utils";
import Button from "../../components/Button";
import Header from "../../components/Header";
import VideoCard from "../../components/Modals/VideoCard";
import Menu from "../../components/Menu";
import { Avatar } from "connectkit";
import Router, { useRouter } from "next/router";
import { routes } from "connectkit/build/components/ConnectKit";
import toast from "react-hot-toast";
import InitHuddle from "@/components/InitHuddle";

const App = () => {
  const routes = useRouter();

  console.log(routes)

  const roomId = routes?.query?.roomid;

  const { joinLobby, isLobbyJoined } = useLobby();

  const videoRef = useRef<HTMLVideoElement>(null);
  const { address } = useAccount();

  const { joinRoom, error, isRoomJoined } = useRoom();

  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (!isRoomJoined) {
      joinLobby("bnh-dmmd-aac");
      joinRoom();
      setHasJoined(true);
    }
  }, [isRoomJoined, hasJoined, roomId, joinLobby, joinRoom]);

  const walletAvatar = address?.startsWith("0x") ? address : undefined;

  return (
    <div className="relative overflow-hidden pb-[40px]">
      <Header />
      <InitHuddle />

      <div className="asbolute ">
        <div className="gradient2"></div>

        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mx-auto h-full mt-[30px] z-50 relative">
        <div className="flex space-x-[20px] h-[400px]">
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard
              text={"lorejncsjdnchnd"}
              videoRef={null}
              userId={"0xchetan"}
              walletAvatar={`${walletAvatar}`}
              isCameraOn={true}
            />
          </div>
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            {/* <VideoCard
              text={"lorejncsjdnchnd"}
              videoRef={null}
              userId={"0xchirag"}
              walletAvatar={`${Avatar}`}
              isCameraOn={false}
            /> */}

            <div className="flex items-center justify-center h-full opacity-60 flex-col">
              <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <p className="text-[20px] pt-[20px]">Waiting For others to join ...</p>
            </div>
          </div>
        </div>

        <div className="relative mt-[25px] w-full flex items-center justify-between">
          <div className="border border-white/10 px-[20px] py-[8px] rounded-[10px]">
            <p className="opacity-60">Room Id: {roomId}</p>
          </div>
          <div className="absolute flex items-center justify-center w-full">
            <Menu userJoined={true} />
          </div>
          <div></div>
        </div>

        <div className="flex border mt-[25px] rounded-[10px] border-white/10">
          <div className="border-r w-1/2 border-white/10 p-[20px] ">
            <div className="text-[18px] border-b pb-2 border-white/10 opacity-90 flex ">
              <p className="flex space-x-[7px]">
                <span>
                  <Ghost />
                </span>
                <span>Transcribe</span>
              </p>
            </div>
            <p className="opacity-70 flex mt-[15px] font-extralight	">
              <span className="font-normal">peerId: </span>
              <span className="pl-[10px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt.
              </span>
            </p>

            <p className="opacity-70 flex mt-[10px] font-extralight	">
              <span className="font-normal">peerId: </span>
              <span className="pl-[10px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt.
              </span>
            </p>
          </div>
          <div className=" p-[20px] w-1/2">
            <div className="text-[18px] border-b pb-2 border-white/10 opacity-90 flex ">
              <p className="flex space-x-[7px]">
                <span>
                  <Outdent />
                </span>
                <span>Transcribe</span>
              </p>
            </div>
            <p className="opacity-70 flex mt-[15px] font-extralight">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt. Possimus
                sapiente et vero consequatur corporis cum, maiores ipsam
                tenetur. Iusto aliquid possimus iste ut?
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
