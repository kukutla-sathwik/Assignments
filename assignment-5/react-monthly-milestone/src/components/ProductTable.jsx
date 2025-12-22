import { Table, Skeleton, Empty, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function ProductTable({ search }) {
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  if (isError) {
    return <Alert type="error" message="Failed to load products" />;
  }

  if (data.length === 0) {
    return <Empty description="No products found" />;
  }

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate(`/products/${record.id}`),
      })}
    />
  );
}

export default ProductTable;
