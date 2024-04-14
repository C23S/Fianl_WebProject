import React, { useState, useEffect } from "react";
import { Table, Button, message, Modal, Form, Input } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const UserPointsManagement = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const mockUserData = [
      { id: 1, username: "User1", points: 100 },
      { id: 2, username: "User2", points: 200 },
      { id: 3, username: "User3", points: 50 },
    ];
    setUserData(mockUserData);
  }, []);

  const handleEditPoints = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSavePoints = (values) => {
    const updatedUserData = userData.map((user) =>
      user.id === selectedUser.id ? { ...user, points: values.points } : user
    );
    setUserData(updatedUserData);
    setIsModalVisible(false);
    message.success("积分已更新！");
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

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "用户名", dataIndex: "username", key: "username" },
    { title: "积分", dataIndex: "points", key: "points" },
    {
      title: "操作",
      key: "action",
      render: (_, user) => (
        <>
          <Button
            icon={<SaveOutlined />}
            onClick={() => handleEditPoints(user)}
            style={{ marginRight: 8 }}
          >
            编辑积分
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(user)}
          >
            删除用户
          </Button>
        </>
      ),
    },
  ];

  const pointsForm = (
    <Modal
      title="编辑积分"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ points: selectedUser?.points }}
        onFinish={handleSavePoints}
      >
        <Form.Item
          label="用户名"
          name="username"
          initialValue={selectedUser?.username}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="积分"
          name="points"
          rules={[{ required: true, message: "请输入积分" }]}
        >
          <Input type="number" />
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
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2>用户积分管理</h2>
      <Table columns={columns} dataSource={userData} rowKey="id" />
      {pointsForm}
    </div>
  );
};

export default UserPointsManagement;
