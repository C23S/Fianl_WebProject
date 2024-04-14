import React, { useState } from "react";
import { Table, Tag, Button, Modal, Form, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ActivityAudit = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "双11促销活动",
      type: "促销活动",
      startTime: "2023-11-11 00:00:00",
      endTime: "2023-11-11 23:59:59",
      status: "待审核",
    },
    {
      id: 2,
      name: "新年大折扣",
      type: "促销活动",
      startTime: "2023-01-01 00:00:00",
      endTime: "2023-01-03 23:59:59",
      status: "待审核",
    },
    {
      id: 3,
      name: "会员专享活动",
      type: "会员活动",
      startTime: "2023-03-15 00:00:00",
      endTime: "2023-03-18 23:59:59",
      status: "待审核",
    },
  ]);

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleAudit = (status) => {
    setIsModalVisible(false);
    const updatedActivities = activities.map((activity) =>
      activity.id === selectedActivity.id
        ? { ...activity, status: status }
        : activity
    );
    setActivities(updatedActivities);
    setSelectedActivity(null);
    message.success("审核完成！");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedActivity(null);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    // 模拟搜索功能
    const filteredActivities = activities.filter((activity) =>
      activity.name.includes(searchText)
    );
    setActivities(filteredActivities);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setActivities([
      {
        id: 1,
        name: "双11促销活动",
        type: "促销活动",
        startTime: "2023-11-11 00:00:00",
        endTime: "2023-11-11 23:59:59",
        status: "待审核",
      },
      {
        id: 2,
        name: "新年大折扣",
        type: "促销活动",
        startTime: "2023-01-01 00:00:00",
        endTime: "2023-01-03 23:59:59",
        status: "待审核",
      },
      {
        id: 3,
        name: "会员专享活动",
        type: "会员活动",
        startTime: "2023-03-15 00:00:00",
        endTime: "2023-03-18 23:59:59",
        status: "待审核",
      },
    ]);
  };

  const columns = [
    { title: "活动名称", dataIndex: "name", key: "name" },
    { title: "活动类型", dataIndex: "type", key: "type" },
    { title: "开始时间", dataIndex: "startTime", key: "startTime" },
    { title: "结束时间", dataIndex: "endTime", key: "endTime" },
    {
      title: "审核状态",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "待审核"
              ? "orange"
              : status === "审核通过"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewDetails(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="请输入活动名称搜索"
          value={searchText}
          onChange={handleSearchInputChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          搜索
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          onClick={handleClearSearch}
        >
          清除搜索结果
        </Button>
      </div>
      <Table columns={columns} dataSource={activities} />

      <Modal
        title="活动详情"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="reject" onClick={() => handleAudit("已驳回")}>
            驳回
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => handleAudit("审核通过")}
          >
            审核通过
          </Button>,
        ]}
      >
        {selectedActivity && (
          <div>
            <p>活动名称：{selectedActivity.name}</p>
            <p>活动类型：{selectedActivity.type}</p>
            <p>开始时间：{selectedActivity.startTime}</p>
            <p>结束时间：{selectedActivity.endTime}</p>
            <p>活动内容：{selectedActivity.content}</p>
            <p>活动图片：{selectedActivity.image}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivityAudit;
