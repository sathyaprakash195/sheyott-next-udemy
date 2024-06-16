"use client";
import React from "react";
import Header from "./header";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import Spinner from "@/components/spinner";
import { getSubscriptionByUserId } from "@/server-actions/subscriptions";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { setLoggedInUserData, loggedInUserData }: IUsersGlobalStore =
    useUsersGlobalStore() as IUsersGlobalStore;

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        const userSubscriptionResponse = await getSubscriptionByUserId(
          response.data._id
        );
        if (userSubscriptionResponse.success) {
          response.data.currentSubscription = userSubscriptionResponse.data;
        }
        setLoggedInUserData(response.data);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isAuthRoute && !loggedInUserData) {
      getLoggedInUser();
    }
  }, [pathname]);

  if (isAuthRoute) {
    return <div>{children}</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (loggedInUserData && !loggedInUserData.isAdmin && isAdminRoute) {
    return (
      <div>
        <Header loggedInUser={loggedInUserData!} />
        <div className="mt-7 text-sm p-5">
          You are not authorized to access this page
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header loggedInUser={loggedInUserData!} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
