import { useState, useCallback } from "react";
import { DatePicker, Input, Button, Space, Typography } from "antd";
import dayjs from "dayjs";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function ProductsPage() {
  const navigate = useNavigate();

  const [dates, setDates] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // PERFORMANCE: stable callback
  const handleSubmit = useCallback(
    (data) => {
      navigate("/confirm", { state: data });
    },
    [navigate]
  );

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 24 }}>
      <Title level={3}>Products</Title>

      <Space>
        <DatePicker.RangePicker
          value={dates}
          onChange={setDates}
          disabledDate={(current) =>
            current && current.isAfter(dayjs(), "day")
          }
        />

        <Input.Search
          placeholder="Search product"
          onSearch={setSearch}
          allowClear
          style={{ width: 200 }}
        />

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </Space>

      <ProductTable search={search} />

      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Space>
  );
}
