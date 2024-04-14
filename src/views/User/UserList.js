import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Modal, Form, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const UserList = () => {
  const [userData, setUserData] = useState([]); // 用户数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [isModalVisible, setIsModalVisible] = useState(false); // 编辑模态框显示状态
  const [selectedUser, setSelectedUser] = useState(null); // 当前选中的用户信息

  const mockUserData = [
    {
      id: 1,
      username: "User1",
      email: "user1@example.com",
      phone: "123456789",
    },
    {
      id: 2,
      username: "User2",
      email: "user2@example.com",
      phone: "987654321",
    },
  ];

  const fetchUserDataFromBackend = () => {
    setLoading(true);

    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 1000);
  };

  // 初始化加载用户数据
  useEffect(() => {
    fetchUserDataFromBackend();
  }, []);

  // 处理页码变化
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 处理搜索输入变化
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // 处理搜索
  const handleSearch = () => {
    const filteredData = mockUserData.filter(
      (user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phone.includes(searchText)
    );
    setUserData(filteredData);
  };

  // 处理保存编辑
  const handleSaveEdit = (values) => {
    const updatedUserData = mockUserData.map((user) =>
      user.id === selectedUser.id ? { ...user, ...values } : user
    );
    setUserData(updatedUserData);
    setIsModalVisible(false);
    message.success("用户信息已保存！");
  };

  // 表格列配置
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "用户名", dataIndex: "username", key: "username" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "电话号码", dataIndex: "phone", key: "phone" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>用户列表</h2>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="请输入关键词搜索用户"
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
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 5,
          total: userData.length,
          onChange: handlePageChange,
        }}
      />

      <Modal
        title="编辑用户信息"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={selectedUser}
          onFinish={handleSaveEdit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="电话号码" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => setIsModalVisible(false)}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
