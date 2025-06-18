import Link from "next/link";
import { Button } from "../ui/button";
import { FileX2 } from "lucide-react"; // ต้องติดตั้ง lucide-react ก่อน

const EmptyList = ({
  headding = "no items",
  message = "Please try again",
  btnText = "back home",
}: {
  headding?: string;
  message?: string;
  btnText?: string;
}) => {
  return (
    <div className="flex flex-col items-center mt-6  animate-pulse justify-center min-h-[400px] space-y-4 text-center p-8 rounded-lg border border-dashed border-gray-800 bg-gray-300/">
      <FileX2 className="w-16 h-16 text-gray-400 animate-bounce " />
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-700">{headding}</h2>
        <p className="text-gray-500">{message}</p>
      </div>

      <Button 
        className="mt-4 capitalize hover:scale-105 transition-transform duration-200 dark:bg-gray-700/50 text-white" 
        variant="default"
        asChild
      >
        <Link href={'/'}>{btnText}</Link>
      </Button>
    </div>
  );
};

export default EmptyList;
