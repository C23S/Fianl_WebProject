import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

const data = [
  {
    key: "1",
    name: "商品1",
    price: 100,
    quantity: 50,
  },
  {
    key: "2",
    name: "商品2",
    price: 200,
    quantity: 100,
  },
];

const StockManagement = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedProduct, setEditedProduct] = useState(null);

  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "库存数量",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleEdit(record)}>
          编辑
        </Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditedProduct(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      quantity: record.quantity,
    });
    setVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) =>
        item.key === editedProduct.key
          ? {
              ...item,
              name: values.name,
              price: values.price,
              quantity: values.quantity,
            }
          : item
      );

      data(updatedData);
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="编辑商品"
        visible={visible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="价格"
            rules={[{ required: true, message: "请输入商品价格" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="库存数量"
            rules={[{ required: true, message: "请输入库存数量" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StockManagement;
