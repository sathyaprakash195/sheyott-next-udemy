"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { ISubscription } from "@/interfaces/subscriptions";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: ISubscription[];
}) {
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      render: (user: any) => user.username,
    },
    {
      title: "Plan",
      dataIndex: "planName",
    },
    {
      title: "Amount",
      dataIndex: "price",
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
    },
    {
      title: "Purchased On",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      render: (expiryDate: string) => dayjs(expiryDate).format("MMM DD, YYYY"),
    },
  ];
  return <Table columns={columns} dataSource={subscriptions} />;
}

export default SubscriptionsTable;
