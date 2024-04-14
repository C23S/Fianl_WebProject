import React, { useState } from "react";
import { Input, Button, Form, message, Modal, Select } from "antd";

const { Option } = Select;

const EditProductPage = () => {
  // 模拟商品列表数据
  const productList = [
    {
      id: 1,
      name: "商品A",
      price: 100,
      stock: 50,
      description: "这是商品A的描述信息。",
    },
    {
      id: 2,
      name: "商品B",
      price: 150,
      stock: 30,
      description: "这是商品B的描述信息。",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!selectedProduct) {
      message.error("请选择要编辑的商品！");
      return;
    }
    setIsModalVisible(true);
  };

  const handleProductSelect = (productId) => {
    const product = productList.find((item) => item.id === productId);
    setSelectedProduct(product);
  };

  const handleConfirmSave = () => {
    message.success("商品信息已保存！");
    setIsModalVisible(false);
  };

  const handleCancelSave = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>编辑商品</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="选择商品" name="productId">
          <Select onChange={handleProductSelect} placeholder="请选择商品">
            {productList.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedProduct && (
          <>
            <Form.Item
              label="商品名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入商品名称",
                },
              ]}
              initialValue={selectedProduct.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="商品价格"
              name="price"
              rules={[
                {
                  required: true,
                  message: "请输入商品价格",
                },
              ]}
              initialValue={selectedProduct.price}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="商品库存"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "请输入商品库存",
                },
              ]}
              initialValue={selectedProduct.stock}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="商品描述"
              name="description"
              rules={[
                {
                  required: true,
                  message: "请输入商品描述",
                },
              ]}
              initialValue={selectedProduct.description}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </>
        )}

        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form>

      <Modal
        title="确认保存"
        visible={isModalVisible}
        onOk={handleConfirmSave}
        onCancel={handleCancelSave}
        okText="确定"
        cancelText="取消"
      >
        <p>确定保存修改后的商品信息吗？</p>
      </Modal>
    </div>
  );
};

export default EditProductPage;
