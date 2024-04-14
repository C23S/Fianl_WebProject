import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CustomerServiceList = () => {
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

  // 表格列配置
  const columns = [
    { title: "客服编号", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "所属部门", dataIndex: "department", key: "department" },
    { title: "邮箱", dataIndex: "email", key: "email" },
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
    </div>
  );
};

export default CustomerServiceList;
