import React, { useEffect, useRef } from "react";
import { Audio, Video } from "@huddle01/react/components";
import { useEventListener, useHuddle01 } from "@huddle01/react";


import { Avatar } from "connectkit";
import { Address } from "wagmi";

type Props = {};

interface VideoCardProps {
  text: string;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  userId: string;
  walletAvatar: string;
  isCameraOn: boolean;
}

function VideoCard({
  text,
  videoRef,
  userId,
  walletAvatar,
  isCameraOn,
}: VideoCardProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);

  const videoElement = videoRef ?? internalVideoRef;

  // // Event Listner
  // useEventListener("lobby:cam-on", () => {
  //   if (camStream && internalVideoRef.current) internalVideoRef.current.srcObject = camStream;
  // });

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoElement.current) {
            videoElement.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Failed to get user media", err));
    }
  }, [videoElement, isCameraOn]);

  return (
    <div className="h-full">
      {isCameraOn ? (
        <video
          className="w-full h-full object-cover"
          ref={videoElement}
          autoPlay
          muted
          style={{ transform: "scaleX(-1)" }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="h-[130px] w-[130px] rounded-full bg-white/10 p-2">
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <Avatar size={115} address={`0x${walletAvatar}`} />
            </div>
          </div>
          <p className="pt-[10px] opacity-70">{userId}</p>
        </div>
      )}

      <div className="absolute bottom-[30px] flex items-center justify-center w-full ">
        <p className="bg-black px-[10px] rounded  text-[14px] opacity-50 max-w-[400px]">
          {text && text}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
