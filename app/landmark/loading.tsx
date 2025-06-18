import { TentTree } from "lucide-react";

const loading = () => {
  return (
    <div className="  w-full h-screen flex items-center justify-center  animate-pulse py-8">
      <div className="flex gap-4 items-center justify-center">
        <TentTree className="w-24 h-24" />
        <p className="text-5xl">loading...</p>
      </div>
    </div>
  );
};
export default loading;
