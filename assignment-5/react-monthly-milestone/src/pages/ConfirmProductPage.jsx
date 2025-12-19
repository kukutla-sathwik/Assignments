import {
  Card,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  message,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function ConfirmProductPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  if (!state) {
    return <p>No product data found</p>;
  }

  const createProduct = async (product) => {
    const res = await axios.post("https://dummyjson.com/products/add", product);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Product created successfully!");
      navigate("/");
    },
  });

  return (
    <Card title="Confirm Product" style={{ margin: 24 }}>
      <Form
        layout="vertical"
        initialValues={state}
        onFinish={() => mutation.mutate(state)}
      >
        <Form.Item label="Product Title" name="title">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          >
            I confirm that the above details are correct
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!confirmed}
            loading={mutation.isLoading}
          >
            Confirm & Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
