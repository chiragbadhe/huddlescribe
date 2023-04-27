import "regenerator-runtime/runtime";

import { useSpeechRecognition } from "react-speech-recognition";
import { useEffect } from "react";
import { Ghost, Outdent } from "lucide-react";
import useDisplayTextStore from "@/hooks/useCaptionsStore";

import useLanguageStore from "@/hooks/UseLanguageStore";

const SpeechToText = () => {
  const { caption, setCaption } = useDisplayTextStore();

  const { value, label } = useLanguageStore();

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setCaption(transcript);
  }, [transcript, setCaption]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

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
          <p className="text-[14px] cursor-not-allowed">lg : {label}</p>
        </div>
        <p className="opacity-70 flex mt-[15px] font-extralight	">
          <span className="font-normal">peerId: </span>
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
          <button className="underline underline-offset-3  text-[14px]">
            Generate Summary
          </button>
        </div>
        <p className="opacity-70 flex mt-[15px] font-extralight">
          <span>
            Say goodbye to boring call summaries! Our system uses OpenAI tech to
            process call captions and generate a comprehensive summary. Never
            struggle to remember details again. Let our system do the work for
            you. Its the coolest thing since sliced bread!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SpeechToText;
