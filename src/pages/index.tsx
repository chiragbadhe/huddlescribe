import React, { useEffect, useRef, useState } from "react";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { useLobby } from "@huddle01/react/hooks";
import Button from "../components/Button";
import Header from "../components/Header";
import VideoCard from "../components/Modals/VideoCard";
import Menu from "../components/Menu";
import { Avatar } from "connectkit";
import Router from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useMenuStore } from "@/hooks/useMenuStore";
import { useRoomId } from "@/hooks/useRoomIdStore";
import InitHuddle from "@/components/InitHuddle";
import { Text } from "lucide-react";

import { useDisplayName } from "@huddle01/react/app-utils";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayNameText, setDisplayNameText] = useState("");
  const { error } = useLobby();
  const { roomId } = useRoomId();
  const { joinLobby } = useLobby();

  const {
    setDisplayName,
    error: displayNameError,
    displayName,
  } = useDisplayName();

  const handleEnterLobby = () => {
    joinLobby(`${roomId}`);
    console.log(error, displayNameError, "sucess");
    setDisplayName(displayNameText);
  };

  const handleEnterRoom = () => {
    Router.push(`/${roomId}`);
  };

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined", displayName);
    toast("Lobby joined");
  });

  return (
    <div className="relative overflow-hidden pb-[40px] min-h-screen">
      <Header />
      <InitHuddle />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="asbolute ">
        <div className="gradient2"></div>
        <div className="gradient1"></div>
      </div>
      <div className="max-w-[1350px] mt-[110px] mx-auto   z-50 relative">
        <div className="flex space-x-[20px] h-[470px]">
          <div className="relative w-full">
            <div className=" border h-full relative border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
              <VideoCard />
            </div>
            <div className="flex items-center justify-center mt-[20px]">
              <Menu userJoined={true} />
            </div>
          </div>
          <div className="relative  w-full flex items-center justify-center space-y-[10px] flex-col rounded-[10px] overflow-hidden ">
            <div className="max-w-[400px]">
              <p className="text-[28px] font-bold opacity-90 space-x-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  GM Buildoors
                </span>
                <span>🌞</span>
              </p>
              <p className="mt-[10px] opacity-70 text-[14px]">
                Lets make sure youre not having a bad hair day 💇‍♂️ or
                broadcasting a messy house 🏠 to the world 🌎 - do a quick hair
                check and tidy up any evidence of your untidy lifestyle 🧹.
              </p>
              <input
                type="text"
                placeholder="Display name here 🖊️"
                value={displayNameText}
                onChange={(e) => setDisplayNameText(e.target.value)}
                className="mt-[26px] rounded-[10px] w-full px-[20px] py-[10px] text-16px bg-white/5 border border-white/10 outline-none"
              />
              <div>
                <Button
                  disabled={loading}
                  onClick={(event?: React.MouseEvent<HTMLButtonElement>) => {
                    if (event) {
                      event.preventDefault();
                    }
                    handleEnterLobby();
                  }}
                >
                  {loading
                    ? "Loading..."
                    : error
                    ? `Error: ${error}`
                    : "Enter Lobby"}
                </Button>

                <Button
                  disabled={loading}
                  onClick={(event?: React.MouseEvent<HTMLButtonElement>) => {
                    if (event) {
                      event.preventDefault();
                    }
                    handleEnterRoom();
                  }}
                >
                  {loading
                    ? "Loading..."
                    : error
                    ? `Error: ${error}`
                    : "Enter Room"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
