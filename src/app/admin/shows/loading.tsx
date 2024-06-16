import Spinner from "@/components/spinner";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center mt-56">
      <Spinner />
    </div>
  );
}

export default Loading;
