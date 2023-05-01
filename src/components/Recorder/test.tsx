import React, { useState } from "react";
import {
  ReactMediaRecorderHookProps,
  useReactMediaRecorder,
} from "react-media-recorder";
import { useVideoStore } from "@/hooks/useVideoStore";
import { NFTStorage } from "nft.storage";

const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxRWZEYkU4MTU1RTQ0Y2NEOWNhNkIwNDBjYTc5MzJmOWNlRjdmNzciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4Mjg0MDM1NTc4NSwibmFtZSI6Imh1ZGRsZXNjcmliZSJ9.n3C82t_ZQvoK0ju4SpbkL2Z6rJK_qsD0R2BMlEaPK_w" });

function App(): JSX.Element {
  const { setVideoSrc, videoSrc } = useVideoStore();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      screen: true,
      onStop: (blobUrl) => {
        setVideoSrc(blobUrl);
      },
    });

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startRecording();
  };

  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stopRecording();
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("saving")

    try {
      const metadata = await client.store({
        name: "My Awesome Video",
        description:
          "This is a video uploaded to the Filecoin network using nft.storage.",
        image: new File(
          [
            /* thumbnail data */
          ],
          "thumbnail.png",
          { type: "image/png" }
        ),
        video: new File(
          [
            /* video data */
          ],
          "recording.webm",
          { type: "video/webm" }
        ),
      });

      setVideoSrc(metadata.url);

      console.log(metadata)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleStart} disabled={status === "recording"}>
          start
        </button>
        <button onClick={handleStop} disabled={status === "stopped"}>
          stop
        </button>
        <button onClick={handleSave} disabled={!mediaBlobUrl}>
          save to Filecoin
        </button>
      </header>
    </div>
  );
}

export default App;

