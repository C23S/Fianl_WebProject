import React, { useState } from "react";
import { Table, DatePicker, Button, Select, Input } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderStatisticsPage = () => {
  const [data, setData] = useState([
    {
      key: "1",
      orderNumber: "2023001",
      productName: "商品A",
      sales: 1000,
      orderDate: "2023-01-01",
    },
    {
      key: "2",
      orderNumber: "2023002",
      productName: "商品B",
      sales: 1500,
      orderDate: "2023-01-02",
    },
    {
      key: "3",
      orderNumber: "2023003",
      productName: "商品C",
      sales: 800,
      orderDate: "2023-01-03",
    },
    {
      key: "4",
      orderNumber: "2023004",
      productName: "商品D",
      sales: 1200,
      orderDate: "2023-01-04",
    },
    {
      key: "5",
      orderNumber: "2023005",
      productName: "商品E",
      sales: 2000,
      orderDate: "2023-01-05",
    },
  ]);

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedOrder, setSortedOrder] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const columns = [
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
      sortOrder: sortedColumn === "orderNumber" && sortedOrder,
    },
    {
      title: "商品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "销售额",
      dataIndex: "sales",
      key: "sales",
      sorter: (a, b) => a.sales - b.sales,
      sortOrder: sortedColumn === "sales" && sortedOrder,
    },
    {
      title: "订单日期",
      dataIndex: "orderDate",
      key: "orderDate",
    },
  ];

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected date range:", dateStrings);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedColumn(sorter.field);
    setSortedOrder(sorter.order);
  };

  const handleSearch = () => {};

  return (
    <div>
      <RangePicker onChange={handleDateChange} />
      <Button type="primary" style={{ marginLeft: "16px" }}>
        导出报表
      </Button>
      <Input
        style={{ width: "200px", marginLeft: "16px" }}
        placeholder="订单号/商品名称"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button type="primary" onClick={handleSearch}>
        查询
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "16px" }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default OrderStatisticsPage;
