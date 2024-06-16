"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IShow } from "@/interfaces/shows";
import { Button, Table, message } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteShowById } from "@/server-actions/shows";

function ShowsTable({ shows }: { shows: IShow[] }) {
  const [loading = false, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const deleteShow = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteShowById(id);
      if (response.success) {
        message.success("Show deleted successfully");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete show");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => type.toUpperCase(),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (genre: string) => genre.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_: any, record: IShow) => (
        <div className="flex gap-5">
          <Button size="small" onClick={() => deleteShow(record._id)}>
            <Trash2 size={12} />
          </Button>
          <Button
            size="small"
            onClick={() => router.push(`/admin/shows/edit/${record._id}`)}
          >
            <Pencil size={12} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={shows} columns={columns} loading={loading} />
    </div>
  );
}

export default ShowsTable;
