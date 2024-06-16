import { SignIn } from "@clerk/nextjs";
import { Video } from "lucide-react";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="bg-black flex items-center justify-center">
        <div className="text-white flex flex-col">
          <h1 className="flex gap-5 text-4xl lg:text-6xl font-bold items-center">
            SHEY <Video className="text-orange-500" size={48} /> OTT
          </h1>
          <p className="text-semibold text-sm text-gray-300">
            An online video streaming platform for movies and web series
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
