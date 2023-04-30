import React, { useEffect } from "react";
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
import { useAudio, usePeers, useRoom, useVideo } from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useLanguageStore from "@/hooks/useLanguageStore";
import { useReactMediaRecorder } from "react-media-recorder";
import { useVideoStore } from "@/hooks/useVideoStore";

import dynamic from "next/dynamic";

const ReactMediaRecorder = dynamic(() => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder), {
  ssr: false,
});

type Props = {
  userJoined: boolean;
};

function MenuWithState({ userJoined }: Props) {
  const router = Router;

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

  const { setVideoSrc, videoSrc } = useVideoStore();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      screen: true,
      onStop: (blobUrl) => {
        setVideoSrc(blobUrl);
      },
    }); // cast the options object to the new type

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
      startRecording();
    } else {
      stopRecording();
      const a = document.createElement("a");
      a.href = mediaBlobUrl?.toString() ?? "";
      a.download = "recording.webm";
      a.click();
    }
  };

  const HandleEndCall = () => {
    leaveRoom();
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

export default MenuWithState;
