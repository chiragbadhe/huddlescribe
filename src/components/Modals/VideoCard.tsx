import "regenerator-runtime/runtime";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Avatar } from "connectkit";
import { useAccount } from "wagmi";
import { useMenuStore } from "@/hooks/useMenuStore";
import { Mic, MicOff } from "lucide-react";
import { useAudio, usePeers, useVideo } from "@huddle01/react/hooks";
import useDisplayTextStore from "@/hooks/useCaptionsStore";
import { useEnsName } from "wagmi";

type Props = {};

interface VideoCardProps {
  text: string;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  userId: string;
  walletAvatar: string;
  isCameraOn: boolean;
}

type State = {
  context: {
    camStream: MediaStream | undefined;
  };
};

type VideoElementRef = MutableRefObject<HTMLVideoElement | null>;
type AudioElementRef = MutableRefObject<HTMLAudioElement | null>;

function VideoCard({}: VideoCardProps) {
  const { stream: camStream } = useVideo();
  const { stream: audioStream } = useAudio();

  const { caption, setCaption } = useDisplayTextStore();

  const { address } = useAccount();
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  const { isMicOn, isCamOn } = useMenuStore();

  const videoElement: VideoElementRef = useRef(null);
  const audioElement: AudioElementRef = useRef(null);

  const { peerIds, peers } = usePeers();

  useEffect(() => {
    if (camStream && videoElement.current) {
      videoElement.current.srcObject = camStream;
    }
    if (audioStream && audioElement.current) {
      audioElement.current.srcObject = audioStream;
    }
  }, [camStream, audioStream]);

  const captionWords = caption.split(" ").slice(-10);
  const captionText = captionWords.join(" ");

  return (
    <div className="h-full">
      {isCamOn ? (
        <>
          <video
            className="object-cover w-full h-full"
            ref={videoElement}
            autoPlay
            muted
            style={{ transform: "scaleX(-1)" }}
            playsInline
          ></video>

          <audio ref={audioElement} autoPlay muted />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="h-[130px] w-[130px] rounded-full bg-white/10 p-2">
            <div className="w-full h-full rounded-full flex shadow-2xl items-center justify-center">
              <Avatar size={115} address={address} />
            </div>
          </div>
          <p className="pt-[10px] opacity-70">
            {isLoading
              ? "loading..."
              : isError
              ? "error"
              : data || "No name found 😔"}
          </p>
        </div>
      )}

      <div className="h-[130px] w-[130px] border">

      </div>

      <div className="absolute bottom-[30px] flex items-center justify-center w-full ">
        <p className="bg-black px-[10px] rounded  text-[14px] opacity-50 max-w-[400px]">
          {captionText}
        </p>
      </div>

      <div className="absolute top-[20px] left-[20px] rounded-full bg-black/20 p-[8px] ">
        {isMicOn ? <Mic /> : <MicOff />}
      </div>
    </div>
  );
}

export default VideoCard;
