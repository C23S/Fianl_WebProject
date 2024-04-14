import React from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const ReturnExchange = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  const columns = [
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "商品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "退货/换货原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{ marginLeft: "10px" }}
          >
            删除
          </Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      orderNumber: "2022001",
      productName: "商品A",
      reason: "尺寸不合适",
      status: "处理中",
    },
    {
      key: "2",
      orderNumber: "2022002",
      productName: "商品B",
      reason: "质量问题",
      status: "已完成",
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (key) => {};

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);

      setVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: "16px" }}
      >
        新建退货/换货申请
      </Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="退货/换货申请"
        visible={visible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="订单号"
            name="orderNumber"
            rules={[{ required: true, message: "请输入订单号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="productName"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="退货/换货原因"
            name="reason"
            rules={[{ required: true, message: "请选择退货/换货原因" }]}
          >
            <Select>
              <Option value="尺寸不合适">尺寸不合适</Option>
              <Option value="质量问题">质量问题</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select>
              <Option value="处理中">处理中</Option>
              <Option value="已完成">已完成</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label="申请日期"
            name="date"
            rules={[{ required: true, message: "请选择申请日期" }]}
          >
            <DatePicker />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      </Modal>
    </div>
  );
};

export default ReturnExchange;
