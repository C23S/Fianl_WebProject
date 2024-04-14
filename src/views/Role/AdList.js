import React, { useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function AdList() {
  const [searchText, setSearchText] = useState("");
  const dataSource = [
    {
      key: "1",
      name: "张三",
      ID: "0001",
      phone: "15544445555",
    },
    {
      key: "2",
      name: "李四",
      ID: "0002",
      phone: "122233336666",
    },
  ];

  const columns = [
    {
      title: "管理员姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "管理员编号",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredDataSource = dataSource.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="请输入管理员姓名搜索"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearchInputChange}
        style={{ marginBottom: "16px", width: "200px" }}
      />
      <Table size="small" dataSource={filteredDataSource} columns={columns} />
    </>
  );
}
