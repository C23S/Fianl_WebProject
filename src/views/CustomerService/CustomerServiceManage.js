import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const CustomerServiceManage = () => {
  const [customerServices, setCustomerServices] = useState([
    {
      key: "1",
      id: "CS001",
      name: "张三",
      department: "客服部",
      email: "zhangsan@example.com",
    },
    {
      key: "2",
      id: "CS002",
      name: "李四",
      department: "客服部",
      email: "lisi@example.com",
    },
  ]);

  const [loading, setLoading] = useState(false); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedCustomerServices, setSearchedCustomerServices] = useState([]); // 搜索后的客服列表数据
  const [isModalVisible, setIsModalVisible] = useState(false); // 添加/编辑客服模态框显示状态
  const [selectedCustomerService, setSelectedCustomerService] = useState(null); // 当前选中的客服信息

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    email: "",
  });

  // 处理搜索输入变化
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // 处理搜索
  const handleSearch = () => {
    const filteredCustomerServices = customerServices.filter((service) =>
      service.name.includes(searchText)
    );
    setSearchedCustomerServices(filteredCustomerServices);
  };

  //处理编辑客服信息
  const handleEditCustomerService = (service) => {
    setSelectedCustomerService(service);
    setIsModalVisible(true);
  };

  // 处理保存编辑客服信息
  const handleSaveEdit = (values) => {
    const updatedCustomerServices = customerServices.map((service) =>
      service.id === selectedCustomerService.id
        ? { ...service, ...values }
        : service
    );
    setCustomerServices(updatedCustomerServices);
    setIsModalVisible(false);
    message.success("客服信息已保存！");
  };

  // 处理添加客服按钮点击事件
  const handleAddCustomerServiceClick = () => {
    setIsModalVisible(true);
    setFormData({
      id: "",
      name: "",
      department: "",
      email: "",
    });
  };

  // 处理取消添加/编辑客服
  const handleCancelAddCustomerService = () => {
    setIsModalVisible(false);
  };

  // 处理保存添加/编辑客服
  const handleSaveAddCustomerService = (values) => {
    const newCustomerService = {
      ...values,
      key: String(customerServices.length + 1),
    };
    setCustomerServices([...customerServices, newCustomerService]);
    setIsModalVisible(false);
    message.success("客服添加成功！");
  };

  // 处理删除客服
  const handleDeleteCustomerService = (customerId) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除客服编号为 ${customerId} 的客服吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const updatedCustomerServices = customerServices.filter(
          (service) => service.id !== customerId
        );
        setCustomerServices(updatedCustomerServices);
        message.success("客服删除成功！");
      },
    });
  };

  // 表格列配置
  const columns = [
    { title: "客服编号", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "所属部门", dataIndex: "department", key: "department" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    {
      title: "操作",
      key: "action",
      render: (_, service) => (
        <Space>
          <Button
            primary
            onClick={() => handleEditCustomerService(service)}
            style={{ marginRight: "8px" }}
          >
            编辑
          </Button>
          <Button
            danger
            onClick={() => handleDeleteCustomerService(service.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>客服列表</h2>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="请输入关键词搜索客服"
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
          onClick={handleAddCustomerServiceClick}
        >
          添加客服
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? searchedCustomerServices : customerServices}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 5,
          total: searchText
            ? searchedCustomerServices.length
            : customerServices.length,
          onChange: setCurrentPage,
        }}
      />

      <Modal
        title={selectedCustomerService ? "编辑客服" : "添加客服"}
        visible={isModalVisible}
        onCancel={handleCancelAddCustomerService}
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={formData}
          onFinish={
            selectedCustomerService
              ? handleSaveEdit
              : handleSaveAddCustomerService
          }
        >
          <Form.Item
            label="客服编号"
            name="id"
            rules={[{ required: true, message: "请输入客服编号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入客服姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="所属部门"
            name="department"
            rules={[{ required: true, message: "请输入客服所属部门" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入客服邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              {selectedCustomerService ? "保存" : "添加"}
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={handleCancelAddCustomerService}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerServiceManage;
