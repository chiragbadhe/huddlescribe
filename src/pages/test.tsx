import React, { useEffect, useRef, useState } from "react";
import { Ghost, Outdent, Pencil } from "lucide-react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import Address, { useAccount } from "wagmi";

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
import Button from "./components/Button";
import Header from "./components/Header";
import VideoCard from "./components/Modals/VideoCard";
import Menu from "./components/Menu";
import { Avatar } from "connectkit";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { state, send } = useMeetingMachine();
  const [roomId, setRoomId] = useState("");
  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();

  const { address, isConnecting, isDisconnected } = useAccount();

  const [displayName, setDisplayName] = useState("");

  const { stream: camStream } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  const { isInitialized } = useHuddle01();

  useEffect(() => {
    if (!isInitialized) {
      initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
    }
  }, [initialize, isInitialized]);

  const [hostAddress, setHostAddress] = useState(address);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostAddress }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleDisplayNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Setting display name to: ${displayName}`);
  };

  return (
    <div className="relative overflow-hidden pb-[40px]  h-screen">
      <Header />

      <div className="asbolute ">
        <div className="gradient2"></div>

        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mt-[125px] mx-auto   z-50 relative">
        <div className="flex space-x-[20px] h-[400px]">
          <div className="relative w-full">
            <div className=" border h-full relative border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
              <VideoCard
                text={""}
                videoRef={null}
                userId={"0xchetan"}
                walletAvatar={`${Avatar}`}
                isCameraOn={true}
              />
            </div>
            <div className="flex items-center justify-center mt-[20px]">
              <Menu userJoined={false} />
            </div>
          </div>
          <div className="relative  w-full flex items-center justify-center space-y-[10px] flex-col rounded-[10px] overflow-hidden ">
            <div className="max-w-[400px]">
              <p className="text-[28px] font-bold opacity-90 ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  GM Buildoors
                </span>{" "}
                <span>🌞</span>
              </p>
              <p className="mt-[10px] opacity-70 text-[14px]">
                Lets make sure youre not having a bad hair day 💇‍♂️ or
                broadcasting a messy house 🏠 to the world 🌎 - do a quick hair
                check and tidy up any evidence of your untidy lifestyle 🧹.
              </p>
              <form onSubmit={handleDisplayNameSubmit}>
                <label htmlFor="name">Display Name:</label>
                <input
                  placeholder="Enter display name ..."
                  type="text"
                  id="name"
                  value={displayName}
                  onChange={handleNameChange}
                  className="mt-[26px] rounded-[10px] w-full px-[20px] py-[10px] text-16px bg-white/5 border border-white/10 outline-none"
                />
                <button
                  className="w-full rounded-[10px] py-[10px] bg-cyan-600 mt-[20px] flex items-center justify-center space-x-[10px] duration-300 hover:bg-cyan-700"
                  type="submit"
                >
                  <Pencil />

                  <span>Set Display Name</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
