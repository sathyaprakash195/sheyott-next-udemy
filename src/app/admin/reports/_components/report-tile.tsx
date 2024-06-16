import { getReportsForAdmin } from "@/server-actions/admin";
import React from "react";

function ReportTile({
  name,
  description,
  value,
  isCurrency,
}: {
  name: string;
  description: string;
  value: string;
  isCurrency: boolean;
}) {

  return (
    <div className="border p-5 border-solid border-black flex flex-col">
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <span className="text-sm text-gray-500 font-semibold">
          {description}
        </span>
      </div>
      <h1 className="mt-5 text-5xl font-bold">
        {isCurrency ? "$" : ""}
        {value}
      </h1>
    </div>
  );
}

export default ReportTile;
