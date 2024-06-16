import PageTitle from "@/components/page-title";
import React from "react";
import ShowForm from "../_common/show-form";

function AddShow() {
  return (
    <div>
      <PageTitle title="Add Show" />

      <div className="mt-7">
        <ShowForm />
      </div>
    </div>
  );
}

export default AddShow;
