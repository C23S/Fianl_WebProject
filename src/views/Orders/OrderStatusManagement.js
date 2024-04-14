import React, { useState } from "react";
import { Table, Select, Button, Space, Modal, Form, message } from "antd";

const { Option } = Select;

const OrderStatusManagement = () => {
  // 模拟订单数据
  const [orders, setOrders] = useState([
    { id: 1, orderNo: "2022001", status: "待支付" },
    { id: 2, orderNo: "2022002", status: "已支付" },
    { id: 3, orderNo: "2022003", status: "已发货" },
    { id: 4, orderNo: "2022004", status: "已完成" },
    { id: 5, orderNo: "2022005", status: "已取消" },
  ]);

  // 可选的订单状态列表
  const orderStatusList = ["待支付", "已支付", "已发货", "已完成", "已取消"];

  // 弹窗状态
  const [visible, setVisible] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [form] = Form.useForm();

  // 切换订单状态
  const handleChangeStatus = (orderId, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    message.success("订单状态已更新！");
  };

  // 打开编辑弹窗
  const handleOpenEditModal = (orderId, currentStatus) => {
    setVisible(true);
    setEditingOrderId(orderId);
    form.setFieldsValue({ status: currentStatus });
  };

  // 关闭编辑弹窗
  const handleCloseEditModal = () => {
    setVisible(false);
  };

  // 确认编辑订单状态
  const handleConfirmEditStatus = () => {
    form
      .validateFields()
      .then((values) => {
        handleChangeStatus(editingOrderId, values.status);
        setVisible(false);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  // 表格列配置
  const columns = [
    {
      title: "订单编号",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "订单状态",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Space>
          <span>{status}</span>
          <Button
            style={{ marginLeft: "40px" }}
            danger
            size="small"
            onClick={() => handleOpenEditModal(record.id, status)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>订单状态管理</h2>
      <Table dataSource={orders} columns={columns} rowKey="id" />

      <Modal
        title="编辑订单状态"
        visible={visible}
        onCancel={handleCloseEditModal}
        onOk={handleConfirmEditStatus}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="订单状态"
            name="status"
            rules={[
              {
                required: true,
                message: "请选择订单状态",
              },
            ]}
          >
            <Select>
              {orderStatusList.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderStatusManagement;
