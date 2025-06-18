"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader, RotateCw } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className: string;
  text: string;
  size: btnSize;
};

export const SubmitButton = ({ className, text, size }: SubmitButtonProps) => {
  //code

  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      size={size}
      className={`${className} capitalize w-full`}
    >
      {pending ? (
        <>
          <Loader className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
};

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button className="bg-red-500/70 cursor-pointer">
        <Heart className="text-white" />
      </Button>
    </SignInButton>
  );
};

export const CardsubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      size="icon" 
      className={`cursor-pointer transition-all duration-300 ease-in-out
      ${isFavorite 
        ? 'bg-pink-100 hover:bg-pink-200' 
        : 'bg-white/80 hover:bg-gray-100'
      }
      shadow-sm hover:shadow-md
      rounded-full
      transform hover:scale-105
      `}
    >
      {pending ? (
      <RotateCw className="animate-spin  text-red-500" />
      ) : isFavorite ? (
      <Heart className="text-red-500 hover:text-gray-600 transition-colors" fill="currentColor" />
      ) : (
      <Heart className="text-gray-600 hover:text-red-500 transition-colors" />
      )}
    </Button>
  );
};
