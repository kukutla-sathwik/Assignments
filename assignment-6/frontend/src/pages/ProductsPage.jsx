import { useState, useCallback } from "react";
import { DatePicker, Input, Button, Space, Typography, Checkbox } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";

const { Title } = Typography;


const CATEGORY_OPTIONS = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
];

export default function ProductsPage() {
  const navigate = useNavigate();

  // states
  const [dates, setDates] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = useCallback(
    (product) => {
      setModalOpen(false);
      navigate("/confirm", { state: product });
    },
    [navigate]
  );

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 24 }}>
      <Title level={3}>Products</Title>

      {/* FILTERS */}
      <Space wrap>
        <DatePicker.RangePicker
          value={dates}
          onChange={setDates}
          disabledDate={(current) =>
            current && current.isAfter(dayjs(), "day")
          }
        />

        <Input.Search
          placeholder="Search product"
          allowClear
          onSearch={setSearch}
          style={{ width: 200 }}
        />

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </Space>

      {/* CATEGORY CHECKBOXES */}
      <Checkbox.Group
        options={CATEGORY_OPTIONS}
        value={categories}
        onChange={setCategories}
      />

      {/* TABLE */}
      <ProductTable
        search={search}
        categories={categories}
        startDate={dates?.[0]?.format("YYYY-MM-DD")}
        endDate={dates?.[1]?.format("YYYY-MM-DD")}
      />

      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Space>
  );
}
