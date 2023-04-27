import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { Ghost, Outdent } from "lucide-react";

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
              sapiente et vero consequatur corporis cum, maiores ipsam tenetur.
              Iusto aliquid possimus iste ut?
            </span>
          </p>
        </div>
      </div>

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