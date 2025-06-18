"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLink = () => {

  const handleLogout = () => {
    toast.success("Logout Successfully!");
  };

  return (
    <SignOutButton redirectUrl="/" >
      <button 
      className="cursor-pointer dark:hover:text-green-500 w-full text-left"
      onClick={handleLogout}>Logout</button>
    </SignOutButton>
  );
};
export default SignOutLink;
