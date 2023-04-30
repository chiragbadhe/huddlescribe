import React, { useState } from "react";
import {
  ReactMediaRecorderHookProps,
  useReactMediaRecorder,
} from "react-media-recorder";
import { useVideoStore } from "@/hooks/useVideoStore";

interface RecorderOptions extends ReactMediaRecorderHookProps {
  worker?: boolean;
}

function App(): JSX.Element {
  const { setVideoSrc, videoSrc } = useVideoStore();
  const [isBrowser, setIsBrowser] = useState(false); // add a state variable to track whether the code is running in a browser environment

  React.useEffect(() => {
    setIsBrowser(true); // set the state variable to true when the component mounts (i.e., when it's running in a browser environment)
  }, []);

  // create a new options object with the worker option set to true if the code is running in a browser environment
  const options: RecorderOptions = isBrowser ? { video: true, screen: true, onStop: (blobUrl) => {
    setVideoSrc(blobUrl);
  }, worker: true } : { video: true, screen: true, onStop: (blobUrl) => {
    setVideoSrc(blobUrl);
  }};

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder(options); // pass the options object to the hook

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startRecording();
  };

  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stopRecording();
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const a = document.createElement("a");
    a.href = mediaBlobUrl?.toString() ?? "";
    a.download = "recording.webm";
    a.click();
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
          save
        </button>
      </header>
    </div>
  );
}

export default App;
