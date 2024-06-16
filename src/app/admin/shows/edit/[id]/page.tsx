import PageTitle from "@/components/page-title";
import React from "react";
import ShowForm from "../../_common/show-form";
import { getShowById } from "@/server-actions/shows";

async function EditShow({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const showResponse = await getShowById(params.id);
  if (!showResponse.success) {
    return <div>{showResponse.message}</div>;
  }
  const show: any = showResponse.data;
  return (
    <div>
      <PageTitle title="Edit Show" />
      <div className="mt-7">
        <ShowForm type="edit" initialValues={show} />
      </div>
    </div>
  );
}

export default EditShow;
