import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // split the transcript into an array of words
  const words = transcript.split(" ");

  // group words into lines of up to 20 characters
  const lines: string[] = words.reduce((acc: string[], curr: string) => {
    const lastLine = acc[acc.length - 1];
    if (lastLine && lastLine.length + curr.length + 1 <= 20) {
      acc[acc.length - 1] = `${lastLine} ${curr}`;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  // map each line to a <div> element
  const displayLines = lines.map((line, index) => (
    <div key={index}>{line}</div>
  ));

  return (
    <>
      <div className="container">
        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {displayLines}
        </div>

        <div className="btn-style">
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
