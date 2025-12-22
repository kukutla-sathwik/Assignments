import {
  Card,
  Tag,
  Rate,
  Skeleton,
  Descriptions,
  Image,
  Button,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  return (
    <Card title={data.title} style={{ margin: 24 }}>
      <Button onClick={() => navigate(-1)}>← Back</Button>

      <Image
        src={data.thumbnail}
        width={300}
        style={{ margin: "16px 0" }}
      />

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">
          {data.description}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          ₹ {data.price}
        </Descriptions.Item>
        <Descriptions.Item label="Discount">
          {data.discountPercentage} %
        </Descriptions.Item>
        <Descriptions.Item label="Rating">
          <Rate disabled allowHalf defaultValue={data.rating} />
        </Descriptions.Item>
        <Descriptions.Item label="Stock">
          {data.stock}
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          {data.brand}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <Tag color="blue">{data.category}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
