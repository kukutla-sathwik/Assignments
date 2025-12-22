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
import { createProduct } from "../api/products";
import { useState } from "react";

export default function ConfirmProductPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Product created successfully!");
      navigate("/");
    },
  });

  if (!state) return <p>No product data found.</p>;

  return (
    <Card title="Confirm Product" style={{ margin: 24 }}>
      <Form
        layout="vertical"
        initialValues={state}
        onFinish={() => mutation.mutate(state)}
      >
        <Form.Item label="Title" name="title">
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
            I confirm the above details
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={!confirmed}
          loading={mutation.isLoading}
        >
          Confirm & Submit
        </Button>
      </Form>
    </Card>
  );
}
