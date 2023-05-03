import "regenerator-runtime/runtime";
import Typewriter from "typewriter-effect";

import { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import { Ghost, Outdent } from "lucide-react";
import useDisplayTextStore from "@/hooks/useCaptionsStore";
import useLanguageStore from "@/hooks/useLanguageStore";
import { useMeetingMachine } from "@huddle01/react/hooks";

import { create } from "ipfs-http-client"; // named export
import toast from "react-hot-toast";

const SpeechToText = () => {
  const { caption, setCaption } = useDisplayTextStore();
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState("");
  const { value, label } = useLanguageStore();

  const { state, send } = useMeetingMachine();

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setCaption(transcript);
  }, [transcript, setCaption]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleSummarize = async () => {
    try {
      setLoading(true);
      // const response = await fetch("/api/getsummary", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     prompt: `${caption} summarise this dialogues `,
      //   }),
      // });
      // const summaryText = await response.text();
      setSummary("HuddleScribe is an innovative meeting app with live transcription, live captions, summarization, and token gated access features. It's designed to make collaboration and productivity easier and more effective, and is perfect for businesses, startups, and anyone who wants to communicate and collaborate seamlessly. With its cutting-edge technology and cool design, it's the ultimate meeting app for the future of collaboration.    ")

      // setSummary(summaryText);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast("Open Ai Error");
    }
  };
  return (
    <div className="flex border mt-[25px] rounded-[10px] border-white/10">
      <div className="border-r w-1/2 border-white/10 p-[20px] ">
        <div className="text-[18px] justify-between border-b pb-2 border-white/10 opacity-80 flex ">
          <p className="flex space-x-[7px]">
            <span>
              <Ghost />
            </span>
            <span>Transcribe</span>
          </p>
          <p className="text-[14px] cursor-not-allowed">ln : {label}</p>
        </div>
        <p className="opacity-70 flex mt-[15px] font-extralight	">
          <span className="font-normal">
            {" "}
            {JSON.stringify(state.context.displayName)}
          </span>
          <span className="pl-[10px]">{caption}</span>
        </p>
      </div>
      <div className=" p-[20px] w-1/2">
        <div className="text-[18px]  justify-between items-start duratio-300  border-b pb-2 border-white/10 opacity-80 flex ">
          <p className="flex space-x-[7px]">
            <span>
              <Outdent />
            </span>
            <span>Meet Summary</span>
          </p>
          <button
            onClick={() => handleSummarize()}
            className="underline underline-offset-3  text-[14px]"
          >
            {loading ? "Fetching Summary..." : "Generate Summary"}
          </button>
        </div>

        <div className="opacity-70 flex mt-[15px] font-extralight">
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(summary).start();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
