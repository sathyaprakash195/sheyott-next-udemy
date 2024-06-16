import PageTitle from "@/components/page-title";
import React from "react";
import LinkButton from "@/components/link-button";
import { getAllShows } from "@/server-actions/shows";
import ShowsTable from "./_common/shows-table";

async function ShowsList() {
  const showsResponse = await getAllShows('');
  const shows = showsResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Shows" />
        <LinkButton title="Add Show" path="/admin/shows/add" />
      </div>

      <ShowsTable shows={shows} />
    </div>
  );
}

export default ShowsList;
