import "regenerator-runtime/runtime";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Avatar } from "connectkit";
import { useAccount } from "wagmi";
import { useMenuStore } from "@/hooks/useMenuStore";
import { Mic, MicOff } from "lucide-react";
import { useAudio, useMeetingMachine, usePeers, useRoom, useVideo } from "@huddle01/react/hooks";
import useDisplayTextStore from "@/hooks/useCaptionsStore";
import { useEnsName } from "wagmi";
import { useDisplayName } from "@huddle01/react/app-utils";

type Props = {};

interface VideoCardProps {
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
  const { error: displayNameError, displayName } = useDisplayName();
  const { caption, setCaption } = useDisplayTextStore();
  const { address } = useAccount();
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });
  const { isMicOn, isCamOn } = useMenuStore();
  const videoElement: VideoElementRef = useRef(null);
  const audioElement: AudioElementRef = useRef(null);
  const { joinRoom, isRoomJoined } = useRoom();
  const { state, send } = useMeetingMachine();

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
  const MAX_ADDRESS_LENGTH = 8; // Change the value to the desired length

  const name = isLoading
    ? "loading..."
    : isError
    ? "error"
    : data ?? "No name found 😔";
  
  const nameDisplayed = name === "No ens found 😔"
    ? name
    : `${address?.slice(0, MAX_ADDRESS_LENGTH)}...`;

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
          
          <p className="pt-[10px] opacity-70">{isRoomJoined ? state.context.displayName : nameDisplayed  }</p>
        </div>
      )}

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
