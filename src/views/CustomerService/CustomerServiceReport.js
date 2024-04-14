import React from "react";
import { Card, Row, Col } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const data = [
  {
    name: "周一",
    客户数量: 10,
    问题数量: 6,
    平均解决时长: 15,
    被赞赏数: 8,
    被举报数: 1,
  },
  {
    name: "周二",
    客户数量: 12,
    问题数量: 8,
    平均解决时长: 18,
    被赞赏数: 10,
    被举报数: 0,
  },
  {
    name: "周三",
    客户数量: 8,
    问题数量: 4,
    平均解决时长: 12,
    被赞赏数: 5,
    被举报数: 2,
  },
  {
    name: "周四",
    客户数量: 15,
    问题数量: 10,
    平均解决时长: 20,
    被赞赏数: 12,
    被举报数: 0,
  },
  {
    name: "周五",
    客户数量: 20,
    问题数量: 12,
    平均解决时长: 22,
    被赞赏数: 15,
    被举报数: 1,
  },
];

const CustomerServiceReport = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>客服工作统计报表</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="客户数量统计">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="客户数量"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="问题数量统计">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="问题数量" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="被赞赏数统计">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="被赞赏数" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="被举报数统计">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="被举报数" fill="#ff0000" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Card title="平均解决时长统计">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="平均解决时长" fill="#52c41a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default CustomerServiceReport;
