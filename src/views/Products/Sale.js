import React from "react";
import { Table } from "antd";

const SalesReportTable = () => {
  // 模拟销售数据
  const salesData = [
    { date: "2023-07-01", productName: "产品A", quantity: 50, unitPrice: 20 },
    { date: "2023-07-01", productName: "产品B", quantity: 30, unitPrice: 25 },
    { date: "2023-07-02", productName: "产品C", quantity: 20, unitPrice: 30 },
    { date: "2023-07-02", productName: "产品D", quantity: 40, unitPrice: 18 },
  ];

  // 表格列配置
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "销售数量",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "单价（元）",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "销售总额（元）",
      key: "totalAmount",
      render: (_, record) => record.quantity * record.unitPrice,
    },
  ];

  return <Table dataSource={salesData} columns={columns} />;
};

export default SalesReportTable;
