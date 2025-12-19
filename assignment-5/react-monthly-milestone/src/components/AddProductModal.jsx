import { Modal, Form, Input, InputNumber, Button } from "antd";

export default function AddProductModal({ open, onClose, onSubmit }) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);   // go to confirm page
          form.resetFields();
        }}
      >
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
