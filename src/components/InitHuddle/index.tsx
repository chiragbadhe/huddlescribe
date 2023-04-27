import { useHuddle01, useLobby } from "@huddle01/react/hooks";
import React, { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRoomId } from "@/hooks/useRoomIdStore";
import { useEventListener } from "@huddle01/react";

type Props = {};

function InitHuddle() {
  const { roomId, setRoomId } = useRoomId();
  const { initialize, isInitialized } = useHuddle01();

  const [islobbyJoined, setIsLobbyJoined] = useState(true);

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
    setIsLobbyJoined(false);
  });

  const handleEnter = async () => {
    if (islobbyJoined) {
      try {
        const res = await fetch("/api/create-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const newRoomId = await data?.data?.roomId;

        if (newRoomId) {
          setRoomId(newRoomId);
        } else {
          toast.error("Room Id not set");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to set room id.");
      }
    }
  };

  useEffect(() => {
    if (!roomId) {
      handleEnter();
    }
  }, []);

  if (!isInitialized) {
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }

  return <div></div>;
}

export default InitHuddle;
