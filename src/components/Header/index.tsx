import React from "react";
import Logo from "./Logo";
import { ConnectKitButton } from "connectkit";
import { useMeetingMachine } from "@huddle01/react/hooks";
import { useRoomId } from "@/hooks/useRoomIdStore";

type Props = {};

function Header({}: Props) {
  const { state, send } = useMeetingMachine();
  const { roomId, setRoomId } = useRoomId();

  return (
    <div className=" border-b border-white/10 w-full relative z-10">
      <div className="container mx-auto max-w-[1350px] py-[10px] flex justify-between items-center">
        <div>
          <Logo />
        </div>

        {/* <h3 className="break-words">{JSON.stringify(state.value)}</h3> */}

        <div>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
