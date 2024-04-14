import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, message } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      key: "1",
      orderId: "10001",
      customerName: "张三",
      product: "手机",
      amount: 2,
    },
    {
      key: "2",
      orderId: "10002",
      customerName: "李四",
      product: "电视",
      amount: 1,
    },
  ]);

  const [loading, setLoading] = useState(false); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedOrders, setSearchedOrders] = useState([]); // 搜索后的订单列表数据
  const [isModalVisible, setIsModalVisible] = useState(false); // 添加订单模态框显示状态
  const [selectedOrder, setSelectedOrder] = useState(null); // 当前选中的订单信息
  const [form] = Form.useForm(); // 订单表单

  // 处理搜索输入变化
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // 处理搜索
  const handleSearch = () => {
    const filteredOrders = orders.filter((order) =>
      order.customerName.includes(searchText)
    );
    setSearchedOrders(filteredOrders);
  };

  //处理编辑订单
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // 处理保存编辑订单
  const handleSaveEdit = (values) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === selectedOrder.orderId ? { ...order, ...values } : order
    );
    setOrders(updatedOrders);
    setIsModalVisible(false);
    message.success("订单信息已保存！");
  };

  // 处理添加订单按钮点击事件
  const handleAddOrderClick = () => {
    setIsModalVisible(true);
    setSelectedOrder(null); // 设置selectedOrder为null表示添加订单，而不是编辑订单
    form.resetFields(); // 重置表单字段
  };

  // 处理取消添加订单
  const handleCancelAddOrder = () => {
    setIsModalVisible(false);
    form.resetFields(); // 重置表单字段
  };

  // 处理保存添加订单
  const handleSaveAddOrder = (values) => {
    const newOrder = {
      ...values,
      key: String(orders.length + 1),
    };
    setOrders([...orders, newOrder]);
    setIsModalVisible(false);
    message.success("订单添加成功！");
  };

  // 处理删除订单
  const handleDeleteOrder = (orderId) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除订单编号为 ${orderId} 的订单吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        console.log("正在删除订单:", orderId);

        const updatedOrders = orders.filter(
          (order) => order.orderId !== orderId
        );
        setOrders(updatedOrders);
        message.success("订单删除成功！");
      },
    });
  };

  // 自定义校验规则，检查输入值是否大于等于1
  const validateAmount = (_, value) => {
    if (value >= 1) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("数量必须大于等于1"));
  };

  // 表格列配置
  const columns = [
    { title: "订单编号", dataIndex: "orderId", key: "orderId" },
    { title: "客户姓名", dataIndex: "customerName", key: "customerName" },
    { title: "商品名称", dataIndex: "product", key: "product" },
    { title: "数量", dataIndex: "amount", key: "amount" },
    {
      title: "操作",
      key: "action",
      render: (_, order) => (
        <Space>
          <Button
            primary
            onClick={() => handleEditOrder(order)}
            style={{ marginRight: "8px" }}
          >
            编辑
          </Button>
          <Button danger onClick={() => handleDeleteOrder(order.orderId)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>订单列表</h2>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="请输入关键词搜索订单"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearchInputChange}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginLeft: "10px" }}
        >
          搜索
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
          onClick={handleAddOrderClick}
        >
          添加订单
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? searchedOrders : orders}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 5,
          total: orders.length,
          onChange: setCurrentPage,
        }}
      />

      <Modal
        title={selectedOrder ? "编辑订单" : "添加订单"}
        visible={isModalVisible}
        onCancel={handleCancelAddOrder}
        footer={[
          <Button key="cancel" onClick={handleCancelAddOrder}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={() => form.submit()}>
            保存
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={
            selectedOrder || {
              orderId: "",
              customerName: "",
              product: "",
              amount: 0,
            }
          }
          onFinish={selectedOrder ? handleSaveEdit : handleSaveAddOrder}
          form={form}
        >
          <Form.Item
            label="订单编号"
            name="orderId"
            rules={[{ required: true, message: "请输入订单编号" }]}
          >
            <Input disabled={selectedOrder ? true : false} />
          </Form.Item>
          <Form.Item
            label="客户姓名"
            name="customerName"
            rules={[{ required: true, message: "请输入客户姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="product"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="数量"
            name="amount"
            rules={[
              { required: true, message: "请输入商品数量" },
              { validator: validateAmount },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderList;
