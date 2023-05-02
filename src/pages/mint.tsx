import Header from "@/components/Header";
import React, { useState } from "react";
import Button from "@/components/Button";

import HSB_ABI from "@/utils/hsbabi.json";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import { ChevronLeft, StepBack } from "lucide-react";
import Router from "next/router";
import { toast } from "react-hot-toast";

type Props = {};

function Mint({}: Props) {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [tokenId, setTokenId] = useState<string | undefined>();

  const contract = useContract({
    address: "0x1BC1799Ab899a3bE3C25D18B3Dad36cD63d1DE6C",
    abi: HSB_ABI,
    signerOrProvider: signer,
  });

  const mintNft = async () => {
    try {
      if (contract) {
        contract.mint(address).then((data: any) => {
          console.log(data);
          if (data) {
            data.wait(1).then((data: any) => {
              setTokenId(data.events[0].args.tokenId.toString());
              console.log("after mint", data.events[0].args.tokenId);
              toast(
                `Nft Minted ID : ${data.events[0].args.tokenId.toString()}`
              );
            });
          }
        });
      } else {
        console.error("contract is null");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative overflow-hidden pb-[40px] min-h-screen">
      <Header />
      <div className="asbolute ">
        <div className="gradient2"></div>
        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mt-[50px] mx-auto flex flex-col  items-center justify-center z-50 relative">
        <div>
          <p
            onClick={() => Router.push("/")}
            className="pb-[10px] flex items-center  text-[18px] text-cyan-500 w-[400px] "
          >
            <ChevronLeft />
            <span>Back</span>
          </p>
        </div>
        <div className="bg-white/10 rounded-[10px] w-[400px] p-[20px]">
          <p className="text-[22px] opacity-[60px]">Mint HSB Nft HSB</p>
          <p className="opacity-40">
            By owning this NFT, you can unlock the ability to access
            HuddleScribe. The minting of this NFT is open to everyone as it is a
            demonstration.
          </p>
          <img
            className="rounded-[10px] mt-[20px] h-[400px] w-[400px]"
            src="/nft.png"
            alt=""
          />

          {Number(tokenId) ? (
            <div className="mt-[20px] ">
              <p className="text-[14px]">
                Contract: 0x1BC1799Ab899a3bE3C25D18B3Dad36cD63d1DE6C{" "}
              </p>
              <p className="py-[7px] rounded-[10px] mt-[10px] px-[20px] w-full bg-green-600 text-center">
                Token ID : {tokenId}
              </p>
            </div>
          ) : (
            <Button onClick={() => mintNft()}>Mint NFT</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mint;

// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract MyNFT is ERC721 {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIdCounter;
//     string private _baseTokenURI;

//     constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
//         _baseTokenURI = baseTokenURI;
//     }

//     function mint(address to) public returns (uint256) {
//         _tokenIdCounter.increment();
//         uint256 newTokenId = _tokenIdCounter.current();
//         _safeMint(to, newTokenId);
//         return newTokenId;
//     }

//     function _baseURI() internal view virtual override returns (string memory) {
//         return _baseTokenURI;
//     }

//     function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
//         require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
//         return bytes(_baseURI()).length > 0 ? string(abi.encodePacked(_baseURI(), tokenId)) : "";
//     }

//     // function ownsNFT(address wallet, address nftAddress) public view returns (bool) {
//     //     uint256 balance = balanceOf(wallet);
//     //     for (uint256 i = 0; i < balance; i++) {
//     //         uint256 tokenId = tokenOfOwnerByIndex(wallet, i);
//     //         if (IERC721(nftAddress).ownerOf(tokenId) == wallet) {
//     //             return true;
//     //         }
//     //     }
//     //     return false;
//     // }
// }

// conntractaddress= 0x1BC1799Ab899a3bE3C25D18B3Dad36cD63d1DE6C
