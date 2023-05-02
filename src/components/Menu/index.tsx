import React, { useEffect, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Circle,
  Disc2,
  PhoneOff,
} from "lucide-react";
import Router, { useRouter } from "next/router";

import { useMenuStore } from "@/hooks/useMenuStore";
import {
  useAudio,
  usePeers,
  useRecording,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useLanguageStore from "@/hooks/useLanguageStore";
import { useVideoStore } from "@/hooks/useVideoStore";
import { useRoomId } from "@/hooks/useRoomIdStore";
import { toast } from "react-hot-toast";

type Props = {
  userJoined: boolean;
};

function MenuWithState({ userJoined }: Props) {
  const router = Router;
  const route = useRouter();

  console.log(route.query);

  const { joinRoom, leaveRoom, isLoading, isRoomJoined } = useRoom();

  const {
    fetchVideoStream,
    stopVideoStream,
    isProducing,
    stream,
    stopProducingVideo,
    produceVideo,
    error,
  } = useVideo();

  const { fetchAudioStream, stopAudioStream } = useAudio();

  const { value, label } = useLanguageStore();

  const { roomId } = useRoomId();

  const {
    startRecording,
    isStarting,
    inProgress,
    isStopping,
    stopRecording,
    data,
    error: recordError,
  } = useRecording();

  const { setVideoSrc, videoSrc } = useVideoStore();

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  const { isMicOn, setIsMicOn, isCamOn, setIsCamOn, isRecOn, setIsRecOn } =
    useMenuStore();

  const MicClick = () => {
    setIsMicOn(!isMicOn);
    if (!isMicOn) {
      SpeechRecognition.startListening({ continuous: true, language: value });
      fetchAudioStream();
    } else {
      stopAudioStream();
      SpeechRecognition.stopListening();
    }
  };

  const CamClick = () => {
    setIsCamOn(!isCamOn);
    if (!isCamOn) {
      fetchVideoStream();
      produceVideo(stream);
    } else {
      stopVideoStream();
      stopProducingVideo();
    }
    console.log(error);
  };

  const RecClick = () => {
    setIsRecOn(!isRecOn);
    if (!isRecOn) {
      startRecording(`https://huddlescribe.vercel.app/${roomId}`);
    } else {
      stopRecording();
      console.log("rec stop");
    }
  };


  const HandleEndCall = () => {
    leaveRoom();
    router.push("/");
  };

  if (data) {
    console.log(data);
  }

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
