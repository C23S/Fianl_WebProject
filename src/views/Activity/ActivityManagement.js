import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, message, Tag } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const ActivityManagement = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "双11促销活动",
      type: "促销活动",
      startTime: "2023-11-11 00:00:00",
      endTime: "2023-11-11 23:59:59",
    },
    {
      id: 2,
      name: "新年大折扣",
      type: "促销活动",
      startTime: "2023-01-01 00:00:00",
      endTime: "2023-01-03 23:59:59",
    },
    {
      id: 3,
      name: "会员专享活动",
      type: "会员活动",
      startTime: "2023-03-15 00:00:00",
      endTime: "2023-03-18 23:59:59",
    },
  ]);

  const [loading, setLoading] = useState(false); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedActivities, setSearchedActivities] = useState([]); // 搜索后的活动列表数据
  const [isModalVisible, setIsModalVisible] = useState(false); // 添加/编辑活动模态框显示状态
  const [selectedActivity, setSelectedActivity] = useState(null); // 当前选中的活动信息

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    startTime: "",
    endTime: "",
  });

  // 活动列表表格列配置
  const activitiesColumns = [
    {
      title: "活动名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "活动类型",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "促销活动" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "操作",
      key: "action",
      render: (_, activity) => (
        <Space size="middle">
          <a onClick={() => handleEditActivity(activity)}>编辑</a>
          <a onClick={() => handleDeleteActivity(activity.id)}>删除</a>
        </Space>
      ),
    },
  ];

  // 处理搜索输入变化
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // 处理搜索
  const handleSearch = () => {
    const filteredActivities = activities.filter((activity) =>
      activity.name.includes(searchText)
    );
    setSearchedActivities(filteredActivities);
  };

  // 处理编辑活动信息
  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  // 处理保存编辑活动信息
  const handleSaveEdit = (values) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === selectedActivity.id
        ? { ...activity, ...values }
        : activity
    );
    setActivities(updatedActivities);
    setIsModalVisible(false);
    message.success("活动信息已保存！");
  };

  // 处理添加活动按钮点击事件
  const handleAddActivityClick = () => {
    setIsModalVisible(true);
    setFormData({
      id: "",
      name: "",
      type: "",
      startTime: "",
      endTime: "",
    });
  };

  // 处理取消添加/编辑活动
  const handleCancelAddActivity = () => {
    setIsModalVisible(false);
  };

  // 处理保存添加/编辑活动
  const handleSaveAddActivity = (values) => {
    const newActivity = {
      ...values,
      id: activities.length + 1,
    };
    setActivities([...activities, newActivity]);
    setIsModalVisible(false);
    message.success("活动添加成功！");
  };

  // 处理删除活动
  const handleDeleteActivity = (activityId) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除活动编号为 ${activityId} 的活动吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const updatedActivities = activities.filter(
          (activity) => activity.id !== activityId
        );
        setActivities(updatedActivities);
        message.success("活动删除成功！");
      },
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>活动管理</h2>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="请输入关键词搜索活动"
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
          onClick={handleAddActivityClick}
        >
          添加活动
        </Button>
      </div>
      <Table
        columns={activitiesColumns}
        dataSource={
          searchedActivities.length > 0 ? searchedActivities : activities
        }
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 5,
          total: activities.length,
          onChange: setCurrentPage,
        }}
      />

      <Modal
        title={selectedActivity ? "编辑活动" : "添加活动"}
        visible={isModalVisible}
        onCancel={handleCancelAddActivity}
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={formData}
          onFinish={selectedActivity ? handleSaveEdit : handleSaveAddActivity}
        >
          <Form.Item
            label="活动编号"
            name="id"
            rules={[{ required: true, message: "请输入活动编号" }]}
          >
            <Input disabled={selectedActivity ? true : false} />
          </Form.Item>
          <Form.Item
            label="活动名称"
            name="name"
            rules={[{ required: true, message: "请输入活动名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="活动类型"
            name="type"
            rules={[{ required: true, message: "请输入活动类型" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="startTime"
            rules={[{ required: true, message: "请输入活动开始时间" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            rules={[{ required: true, message: "请输入活动结束时间" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              {selectedActivity ? "保存" : "添加"}
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={handleCancelAddActivity}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ActivityManagement;
