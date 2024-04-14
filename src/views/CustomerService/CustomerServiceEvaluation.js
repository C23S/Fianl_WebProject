import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Rate } from "antd";

const CustomerServiceEvaluation = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const mockData = [
    {
      id: 1,
      customerName: "张三",
      serviceID: "001",
      rating: 4,
      feedback: "客服很耐心，服务很好。",
    },
  ];

  useEffect(() => {
    setData(mockData);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "客户姓名",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "客服编号",
      dataIndex: "serviceID",
      key: "serviceName",
    },
    {
      title: "评分",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "反馈",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑回复</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleSave = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="编辑回复"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            保存
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="客户姓名" name="customerName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="客服姓名" name="serviceName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="评分" name="rating">
            <Rate disabled />
          </Form.Item>
          <Form.Item label="反馈" name="feedback">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerServiceEvaluation;
