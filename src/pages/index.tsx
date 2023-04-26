import React, { useRef, useState } from "react";
import { Ghost, Outdent } from "lucide-react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import { Address } from "wagmi";

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
import Button from "../components/Button";
import Header from "../components/Header";
import VideoCard from "../components/Modals/VideoCard";
import Menu from "../components/Menu";
import { Avatar } from "connectkit";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { state, send } = useMeetingMachine();

  const [roomId, setRoomId] = useState("");
  const [displayNameText, setDisplayNameText] = useState("Guest");
  const [projectId, setProjectId] = useState("");

  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  const { isInitialized } = useHuddle01();

  const { peers } = usePeers();

  const {
    startRecording,
    stopRecording,
    error,
    data: recordingData,
  } = useRecording();

  const { setDisplayName, error: displayNameError } = useDisplayName();

  useEventListener("room:joined", () => {
    console.log("room:joined");
  });
  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  return (
    <div className="relative overflow-hidden pb-[40px]">
      <Header />

      <div className="asbolute ">
        <div className="gradient2"></div>

        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mx-auto h-full mt-[30px] z-50 relative">
        <div className="flex space-x-[20px] h-[400px]">
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard
              text={"lorejncsjdnchnd"}
              videoRef={null}
              userId={"0xchetan"}
              walletAvatar={`${Avatar}`}
              isCameraOn={true}
            />
          </div>
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard
              text={"lorejncsjdnchnd"}
              videoRef={null}
              userId={"0xchirag"}
              walletAvatar={`${Avatar}`}
              isCameraOn={false}
            />
          </div>
        </div>

        <div className=" mt-[25px] w-full flex items-center justify-center">
          <Menu userJoined={false} />
        </div>

        <div className="flex border mt-[25px] rounded-[10px] border-white/10">
          <div className="border-r w-1/2 border-white/10 p-[20px] ">
            <div className="text-[18px] border-b pb-2 border-white/10 opacity-90 flex ">
              <p className="flex space-x-[7px]">
                <span>
                  <Ghost />
                </span>
                <span>Transcribe</span>
              </p>
            </div>
            <p className="opacity-70 flex mt-[15px] font-extralight	">
              <span className="font-normal">peerId: </span>
              <span className="pl-[10px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt.
              </span>
            </p>

            <p className="opacity-70 flex mt-[10px] font-extralight	">
              <span className="font-normal">peerId: </span>
              <span className="pl-[10px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt.
              </span>
            </p>
          </div>
          <div className=" p-[20px] w-1/2">
            <div className="text-[18px] border-b pb-2 border-white/10 opacity-90 flex ">
              <p className="flex space-x-[7px]">
                <span>
                  <Outdent />
                </span>
                <span>Transcribe</span>
              </p>
            </div>
            <p className="opacity-70 flex mt-[15px] font-extralight">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem sed repudiandae a officia libero deserunt. Possimus
                sapiente et vero consequatur corporis cum, maiores ipsam
                tenetur. Iusto aliquid possimus iste ut?
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="">
        <div>
          <h1 className="text-6xl font-bold">
            Welcome to{" "}
            <a className="text-blue-600" href="https://huddle01.com">
              Huddle01 SDK!
            </a>
          </h1>

          <h2 className="text-2xl">Room State</h2>
          <h3 className="break-words">{JSON.stringify(state.value)}</h3>

          <h2 className="text-2xl">Me Id</h2>
          <div className="break-words">
            {JSON.stringify(state.context.peerId)}
          </div>
          <h2 className="text-2xl">DisplayName</h2>
          <div className="break-words">
            {JSON.stringify(state.context.displayName)}
          </div>
          <h2 className="text-2xl">Recording Data</h2>
          <div className="break-words">{JSON.stringify(recordingData)}</div>

          <h2 className="text-2xl">Error</h2>
          <div className="break-words text-red-500">
            {JSON.stringify(state.context.error)}
          </div>
          <h2 className="text-2xl">Peers</h2>
          <div className="break-words">{JSON.stringify(peers)}</div>
          <h2 className="text-2xl">Consumers</h2>
          <div className="break-words">
            {JSON.stringify(state.context.consumers)}
          </div>

          <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
          <input
            type="text"
            placeholder="Your Project Id"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
          />
          <Button
            disabled={!initialize.isCallable}
            onClick={() => {
              initialize(projectId);
            }}
          >
            INIT
          </Button>

          <br />
          <br />
          <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
          <input
            type="text"
            placeholder="Your Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
          />
          <Button
            disabled={!joinLobby.isCallable}
            onClick={() => {
              joinLobby(roomId);
            }}
          >
            JOIN_LOBBY
          </Button>
          <br />
          <br />
          <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Your Room Id"
              value={displayNameText}
              onChange={(e) => setDisplayNameText(e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
            />
            <Button
              disabled={!setDisplayName.isCallable}
              onClick={() => {
                setDisplayName(displayNameText);
              }}
            >
              {`SET_DISPLAY_NAME error: ${displayNameError}`}
            </Button>
            <Button
              disabled={!fetchVideoStream.isCallable}
              onClick={fetchVideoStream}
            >
              FETCH_VIDEO_STREAM
            </Button>

            <Button
              disabled={!fetchAudioStream.isCallable}
              onClick={fetchAudioStream}
            >
              FETCH_AUDIO_STREAM
            </Button>

            <Button disabled={!joinRoom.isCallable} onClick={joinRoom}>
              JOIN_ROOM
            </Button>

            <Button
              disabled={!state.matches("Initialized.JoinedLobby")}
              onClick={() => send("LEAVE_LOBBY")}
            >
              LEAVE_LOBBY
            </Button>

            <Button
              disabled={!stopVideoStream.isCallable}
              onClick={stopVideoStream}
            >
              STOP_VIDEO_STREAM
            </Button>
            <Button
              disabled={!stopAudioStream.isCallable}
              onClick={stopAudioStream}
            >
              STOP_AUDIO_STREAM
            </Button>
          </div>
          <br />
          <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              disabled={!produceAudio.isCallable}
              onClick={() => produceAudio(micStream)}
            >
              PRODUCE_MIC
            </Button>

            <Button
              disabled={!produceVideo.isCallable}
              onClick={() => produceVideo(camStream)}
            >
              PRODUCE_CAM
            </Button>

            <Button
              disabled={!stopProducingAudio.isCallable}
              onClick={() => stopProducingAudio()}
            >
              STOP_PRODUCING_MIC
            </Button>

            <Button
              disabled={!stopProducingVideo.isCallable}
              onClick={() => stopProducingVideo()}
            >
              STOP_PRODUCING_CAM
            </Button>


            <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
              LEAVE_ROOM
            </Button>
          </div>
        </div>
        <div className="border">
          Me Video:
          <video
            className="border w-full"
            ref={videoRef}
            autoPlay
            muted
          ></video>
          <div>
            {Object.values(peers)
              .filter((peer) => peer.cam)
              .map((peer) => (
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                  debug
                />
              ))}
            {Object.values(peers)
              .filter((peer) => peer.mic)
              .map((peer) => (
                <Audio
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.mic}
                />
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default App;
