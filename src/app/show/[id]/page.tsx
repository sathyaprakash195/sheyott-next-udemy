import LinkButton from "@/components/link-button";
import { IShow } from "@/interfaces/shows";
import { getShowById } from "@/server-actions/shows";
import dayjs from "dayjs";
import React from "react";
import ActionButtons from "./_components/action-buttons";

async function ShowInfo({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const showResponse = await getShowById(params.id);

  if (!showResponse.success) {
    return <div>Something went wrong</div>;
  }

  const show: IShow = showResponse.data;

  const releaseYear = dayjs(show.theraticalReleaseDate).format("YYYY");

  const renderShowProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="font-bold">{label}</span>
        <span className="capitalize">{value}</span>
      </div>
    );
  };

  return (
    <div>
      <LinkButton path="/" title="Back to Home" />
      <div className="flex flex-col lg:flex-row gap-10 mt-7">
        <div className="flex flex-col lg:w-1/3 rounded ">
          <img
            src={show.bannerImage}
            alt={show.mainImage}
            className="object-cover h-[300px]"
          />
          <ActionButtons show={show} />
        </div>

        <div className="flex flex-col gap-5 flex-1">
          <h1 className="text-3xl font-bold">
            {show.title} ({releaseYear})
          </h1>
          <p className="text-sm text-gray-700">{show.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            <div>{renderShowProperty("Genre", show.genre)}</div>
            <div>{renderShowProperty("Type", show.type)}</div>
            <div>
              {renderShowProperty("OTT Release Date", show.ottReleaseDate)}
            </div>
          </div>

          <hr />

          <h1 className="text-lg font-semibold text-gray-500">Cast & Crew</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {show.castAndCrew?.map((person) =>
              renderShowProperty(person.role, person.name)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowInfo;
