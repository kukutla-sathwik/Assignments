import { Table, Skeleton, Empty, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function ProductTable({ search, categories, startDate, endDate }) {
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", search, categories, startDate, endDate],
    queryFn: () => fetchProducts({ search, categories, startDate, endDate }),
    staleTime: 1000 * 60 * 60,
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
  console.log(error);

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;
  if (isError) return <Alert type="error" message="Failed to load products" />;
  if (data.length === 0) return <Empty description="No products found" />;

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
