import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import {
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState(""); // 搜索关键词

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

  // 初始化加载用户数据
  useState(() => {
    setUserData(mockUserData);
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSaveUser = (values) => {
    if (selectedUser) {
      // 编辑用户
      const updatedUserData = userData.map((user) =>
        user.id === selectedUser.id ? { ...user, ...values } : user
      );
      setUserData(updatedUserData);
      setSelectedUser(null);
      message.success("用户信息已更新！");
    } else {
      // 添加用户
      const newUser = {
        id: userData.length + 1,
        ...values,
      };
      setUserData([...userData, newUser]);
      message.success("用户添加成功！");
    }
    setIsModalVisible(false);
  };

  const handleDeleteUser = (user) => {
    confirm({
      title: `确认删除用户 ${user.username} 吗？`,
      onOk() {
        const updatedUserData = userData.filter((u) => u.id !== user.id);
        setUserData(updatedUserData);
        message.success("用户删除成功！");
      },
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filteredUserData = mockUserData.filter((user) =>
      user.username.includes(searchText)
    );
    setUserData(filteredUserData);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setUserData(mockUserData);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "用户名", dataIndex: "username", key: "username" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "电话号码", dataIndex: "phone", key: "phone" },
    {
      title: "操作",
      key: "action",
      render: (_, user) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(user)}
            style={{ marginRight: 8 }}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(user)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const userForm = (
    <Modal
      title={selectedUser ? "编辑用户" : "添加用户"}
      visible={isModalVisible}
      onCancel={() => {
        setSelectedUser(null);
        setIsModalVisible(false);
      }}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={selectedUser}
        onFinish={handleSaveUser}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "请输入用户ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "邮箱格式不正确" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="电话号码"
          name="phonenumber"
          rules={[{ required: true, message: "请输入电话号码" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            <SaveOutlined /> 保存
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setSelectedUser(null);
              setIsModalVisible(false);
            }}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2>用户管理</h2>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="请输入用户名搜索"
          value={searchText}
          onChange={handleSearchInputChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          搜索
        </Button>
        {searchText && (
          <Button type="link" onClick={handleClearSearch}>
            清除搜索结果
          </Button>
        )}
        <Button
          style={{ marginLeft: "10px" }}
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setSelectedUser(null);
            setIsModalVisible(true);
          }}
        >
          添加用户
        </Button>
      </div>

      <Table columns={columns} dataSource={userData} rowKey="id" />
      {userForm}
    </div>
  );
};

export default UserManagement;
