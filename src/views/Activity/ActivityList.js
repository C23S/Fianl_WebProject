import React, { useState } from "react";
import { Table, Tag, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ActivityList = () => {
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

  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedActivities, setSearchedActivities] = useState([]); // 搜索后的活动列表数据

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filteredActivities = activities.filter((activity) =>
      activity.name.includes(searchText)
    );
    setSearchedActivities(filteredActivities);
  };

  const columns = [
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
      </div>
      <Table columns={columns} dataSource={activities} />
    </div>
  );
};

export default ActivityList;
