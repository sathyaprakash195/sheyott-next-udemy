import PageTitle from "@/components/page-title";
import { getAllSubscriptions } from "@/server-actions/admin";
import React from "react";
import SubscriptionsTable from "./_components/subscriptions-table";

async function SubscriptionsPurchased() {
  const subscriptionsResponse = await getAllSubscriptions();
  const subscriptions: any[] = subscriptionsResponse.data;
  return (
    <div>
      <PageTitle title="Subscriptions Purchased" />
      <SubscriptionsTable subscriptions={subscriptions} />
    </div>
  );
}

export default SubscriptionsPurchased;
