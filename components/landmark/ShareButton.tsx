"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

const ShareButton = ({
  landmarkId,
  name,
}: {
  landmarkId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/landmark/${landmarkId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full text-white font-bold cursor-pointer dark:bg-amber-600 hover:dark:bg-amber-700">
          <Share2 className="text-white" /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col md:flex-row gap-y-4 items-center justify-between  gap-x-2"
        align="end"
        side="bottom"
      >
        <FacebookShareButton url={shareLink} name={name}>
          <FacebookIcon className="rounded-full" size={"36px"} />
        </FacebookShareButton>
        <TwitterShareButton url={shareLink} name={name}>
          <TwitterIcon size={"36px"} className="rounded-full" />
        </TwitterShareButton>
        <LineShareButton url={shareLink} name={name}>
          <LineIcon size={"36px"} className="rounded-full" />
        </LineShareButton>
        <FacebookMessengerShareButton appId="" url={shareLink} name={name}>
          <FacebookMessengerIcon size={"36px"} className="rounded-full" />
        </FacebookMessengerShareButton>
      </PopoverContent>
    </Popover>
  );
};
export default ShareButton;
