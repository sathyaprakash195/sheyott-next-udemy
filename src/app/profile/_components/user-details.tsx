import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import React from "react";

function UserDetails() {
  const { loggedInUserData }: IUsersGlobalStore =
    useUsersGlobalStore() as IUsersGlobalStore;
  if (!loggedInUserData) return null;
  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold text-sm">{label}</span>
        <span className="text-sm text-gray-600">{value}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {renderUserProperty("ID", loggedInUserData?._id)}
      {renderUserProperty("Name", loggedInUserData?.username)}
      {renderUserProperty("Email", loggedInUserData?.email)}
      {renderUserProperty("Role", loggedInUserData?.isAdmin ? "Admin" : "User")}
      {renderUserProperty("Clerk User Id", loggedInUserData?.clerkUserId)}
      {renderUserProperty(
        "Created At",
        getDateTimeFormat(loggedInUserData?.createdAt)
      )}
    </div>
  );
}

export default UserDetails;
