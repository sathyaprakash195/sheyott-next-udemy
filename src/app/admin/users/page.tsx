import PageTitle from "@/components/page-title";
import { getAllUsers } from "@/server-actions/admin";
import React from "react";
import UsersTable from "./_components/users-table";

async function UsersList() {
  const usersResponse = await getAllUsers();
  const users: any[] = usersResponse.data;
  return (
    <div>
      <PageTitle title="Users" />
      <UsersTable users={users} />
    </div>
  );
}

export default UsersList;
