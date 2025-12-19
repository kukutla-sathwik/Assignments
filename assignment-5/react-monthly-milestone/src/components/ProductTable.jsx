import React from "react";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useMemo } from "react";

function ProductTable({ search }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
  });

  const columns = useMemo(
    () => [
      { title: "Title", dataIndex: "title" },
      { title: "Category", dataIndex: "category" },
      { title: "Price", dataIndex: "price" },
      { title: "Rating", dataIndex: "rating" },
    ],
    []
  );

  return (
    <Table
      loading={isLoading}
      dataSource={data}
      columns={columns}
      rowKey="id"
    />
  );
}

export default React.memo(ProductTable);
