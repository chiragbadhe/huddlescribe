import React, { useCallback, useEffect, useRef, useState } from "react";
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

import { useDisplayName, useRecorder } from "@huddle01/react/app-utils";
import Button from "../../components/Button";
import Header from "../../components/Header";
import VideoCard from "../../components/Modals/VideoCard";
import Menu from "../../components/Menu";
import { Avatar } from "connectkit";
import Router, { useRouter } from "next/router";
import { routes } from "connectkit/build/components/ConnectKit";
import toast from "react-hot-toast";
import InitHuddle from "@/components/InitHuddle";
import SpeechToText from "@/components/SpeechToText.tsx";
import SelectLanguage from "@/components/SelectLanguage";
import axios from "axios";
import Recorder from "@/components/Recorder";
import { useVideoStore } from "@/hooks/useVideoStore";

type MeetingDetails = {
  roomId: string;
  title: string | null;
  description: string | null;
  meetingLink: string;
  startTime: Date | null;
  expiryTime: Date | null;
  hostWalletAddress: string[];
  roomLocked: boolean;
  videoOnEntry: boolean;
  muteOnEntry: boolean;
};

const App = () => {
  const routes = useRouter();
  const roomId = routes?.query?.roomid as string;
  const { joinLobby } = useLobby();
  const { address } = useAccount();
  const { joinRoom, isRoomJoined } = useRoom();
  const [hasJoined, setHasJoined] = useState(false);
  const { videoSrc, setVideoSrc } = useVideoStore();

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>();

  const { peers } = usePeers();

  

  useRecorder(roomId, process.env.NEXT_PUBLIC_PROJECT_ID || "");

  useEffect(() => {
    if (!isRoomJoined) {
      if (typeof roomId === "string") {
        joinLobby(roomId);
      }
      joinRoom();
      toast("rooom joined");
      setHasJoined(true);
    }
  }, [isRoomJoined, hasJoined, roomId, joinLobby, joinRoom]);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(
          `/api/meeting-details?roomId=${roomId}`
        );
        setMeetingDetails(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get meeting details.");
      }
    };

    if (roomId) {
      fetchMeetingDetails();
    }
  }, [roomId]);

  console.log(meetingDetails?.title);

  console.log(peers);
  return (
    <div className="relative overflow-hidden min-h-screen pb-[40px]">
      <Header />
      <InitHuddle />

      <div className="asbolute ">
        <div className="gradient2"></div>
        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mx-auto h-full mt-[30px] z-50 relative">
        <div className="mb-[12px] opacity-60">
          <p className="text-[18px]">Meeting: {meetingDetails?.title}</p>
        </div>

        {/* <Recorder /> */}

        <div className="flex space-x-[20px] h-[400px]">
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard />
          </div>
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <div className="flex items-center justify-center h-full opacity-60 flex-col">
              <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <p className="text-[20px] pt-[20px]">
                Waiting For others to join ...
              </p>
              <p>
                {" "}
                <p className="text-[14px] mt-[12px] text-red-500">
                  temporarily disabled for demo
                </p>
              </p>
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
          <div>
            <SelectLanguage />
          </div>
        </div>
        <SpeechToText />
        <div className="flex items-start  mt-12 w-full">
          {videoSrc && (
            <>
              <div className="flex flex-col w-1/2">
                <p className="opacity-60 text-[20px]">Recoarded Video</p>
                <video
                  className="rounded-[10px] border border-white/10  mt-[16px]"
                  src={videoSrc}
                  controls
                />
              </div>
              <div className="flex flex-col w-1/2 pl-[20px]">
                <p className="opacity-60 text-[20px]">Video Details</p>

                <div className="pt-[16px] opacity-70 space-y-[10px] font-thin">
                  <p>Url: {videoSrc}</p>
                  <p>Title : test tile.webp</p>
                  <p>CID : test tile.webp</p>
                  <p>CID : test tile.webp</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
