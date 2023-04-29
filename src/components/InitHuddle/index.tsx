import { useHuddle01, useLobby } from "@huddle01/react/hooks";
import React, { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRoomId } from "@/hooks/useRoomIdStore";
import { useEventListener } from "@huddle01/react";
import axios from "axios";
import { useAccount } from "wagmi";

type Props = {};

function InitHuddle() {
  const { roomId, setRoomId } = useRoomId();
  const { initialize, isInitialized } = useHuddle01();
  const { address } = useAccount();

  const [islobbyJoined, setIsLobbyJoined] = useState(true);

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  useEffect(() => {
    if (!islobbyJoined) {
      return;
    }
    const onLobbyJoined = () => {
      console.log("lobby:joined");
      setIsLobbyJoined(false);
    };
    document.addEventListener("lobby:joined", onLobbyJoined);
    return () => {
      document.removeEventListener("lobby:joined", onLobbyJoined);
    };
  }, [islobbyJoined]);

  const handleEnter = useCallback(async () => {
    if (islobbyJoined) {
      try {
        const response = await axios.post(
          "/api/create-room",
          {
            title: "HuddleScribe Demo Meet",
            hostWallets: [address],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const roomId = response?.data?.data?.roomId;

        if (roomId) {
          setRoomId(roomId);
          setIsLobbyJoined(false);
        } else {
          toast.error("Room Id not set");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to set room id.");
      }
    }
  }, [islobbyJoined, setRoomId, address]);

  useEffect(() => {
    if (!roomId) {
      handleEnter();
    }
  }, [roomId, handleEnter]);

  useEffect(() => {
    if (!isInitialized) {
      initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
    }
  }, [isInitialized, initialize]);

  return <div></div>;
}

export default InitHuddle;
