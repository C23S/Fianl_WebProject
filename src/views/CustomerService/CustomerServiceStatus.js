import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  message,
  Modal,
  Select,
  Table,
  Switch,
} from "antd";

const { Option } = Select;

const CustomerServiceStatus = () => {
  // 模拟客服数据
  const customerServiceList = [
    { id: 1, name: "客服A" },
    { id: 2, name: "客服B" },
    { id: 3, name: "客服C" },
  ];

  // 当前选择的客服ID
  const [selectedService, setSelectedService] = useState(1);

  // 模拟客服在线状态
  const [customerServiceStatus, setCustomerServiceStatus] = useState({
    1: {
      online: false,
      workingHours: 0,
      logs: [],
    },
    2: {
      online: true,
      workingHours: 5,
      logs: [
        {
          date: "2023-07-22",
          customerCount: 10,
          problemCount: 3,
          likedCount: 5,
          reportedCount: 1,
        },
      ],
    },
    3: {
      online: false,
      workingHours: 8,
      logs: [
        {
          date: "2023-07-21",
          customerCount: 8,
          problemCount: 2,
          likedCount: 3,
          reportedCount: 0,
        },
      ],
    },
  });

  // 控制工作日志弹窗显示
  const [visible, setVisible] = useState(false);

  // 表单
  const [form] = Form.useForm();

  // 切换选择客服
  const handleServiceSelect = (value) => {
    setSelectedService(value);
  };

  // 切换在线状态
  const handleOnlineChange = (checked) => {
    setCustomerServiceStatus({
      ...customerServiceStatus,
      [selectedService]: {
        ...customerServiceStatus[selectedService],
        online: checked,
      },
    });
  };

  // 记录工作日志
  const handleLogRecord = (checked) => {
    setVisible(checked);
  };

  // 提交工作日志
  const handleLogSubmit = () => {
    form.validateFields().then((values) => {
      setCustomerServiceStatus({
        ...customerServiceStatus,
        [selectedService]: {
          ...customerServiceStatus[selectedService],
          logs: [...customerServiceStatus[selectedService].logs, values],
        },
      });
      form.resetFields();
      setVisible(false);
      message.success("工作日志记录成功！");
    });
  };

  // 工作日志表格列配置
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
    },
    {
      title: "客户数量",
      dataIndex: "customerCount",
    },
    {
      title: "问题数量",
      dataIndex: "problemCount",
    },
    {
      title: "被赞赏数",
      dataIndex: "likedCount",
    },
    {
      title: "被举报数",
      dataIndex: "reportedCount",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>客服在线状态管理</h2>
      <div style={{ marginTop: "20px" }}>
        <span style={{ marginRight: "10px" }}>选择客服：</span>
        <Select
          value={selectedService}
          style={{ width: 200 }}
          onChange={handleServiceSelect}
        >
          {customerServiceList.map((service) => (
            <Option key={service.id} value={service.id}>
              {service.name}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <span style={{ marginRight: "10px" }}>在线状态：</span>
        <Switch
          checked={customerServiceStatus[selectedService]?.online}
          onChange={handleOnlineChange}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={handleLogRecord}>
          记录工作日志
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Table
          columns={columns}
          dataSource={customerServiceStatus[selectedService]?.logs}
        />
      </div>

      {/* 工作日志弹窗 */}
      <Modal
        title="工作日志记录"
        visible={visible}
        onOk={handleLogSubmit}
        onCancel={() => setVisible(false)}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          {/* 省略表单项 */}
        </Form>
        <Form form={form} layout="vertical">
          <Form.Item label="日期" name="date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="客户数量"
            name="customerCount"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="问题数量"
            name="problemCount"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="被赞赏数"
            name="likedCount"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="被举报数"
            name="reportedCount"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerServiceStatus;
