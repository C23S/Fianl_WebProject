import React from "react";
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Input, Divider, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import "./Home.css";

const { Title } = Typography;

const data = [
  {
    name: "2023-07-01",
    users: 100,
    sessions: 70,
    pageviews: 500,
    pagesPerSession: 2.5,
  },
  {
    name: "2023-07-02",
    users: 150,
    sessions: 125,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-03",
    users: 150,
    sessions: 150,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-04",
    users: 150,
    sessions: 180,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-05",
    users: 150,
    sessions: 230,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
];

const order = [
  {
    name: "2023-07-01",
    users: 100,
    sessions: 300,
    pageviews: 500,
    pagesPerSession: 2.5,
  },
  {
    name: "2023-07-02",
    users: 150,
    sessions: 280,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-03",
    users: 150,
    sessions: 265,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-04",
    users: 150,
    sessions: 230,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
  {
    name: "2023-07-05",
    users: 150,
    sessions: 195,
    pageviews: 600,
    pagesPerSession: 2.0,
  },
];

export default function Home() {
  return (
    <>
      <div className="main" style={{ display: "flex", minHeight: "45px" }}>
        <Input.Group compact className="ml-3">
          <Input
            prefix={<SearchOutlined />}
            className="search"
            placeholder="搜索..."
            aria-label="Search"
          />
        </Input.Group>
      </div>
      <div>
        <Card>
          <h2>OVERVIEW Analytics</h2>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="USERS" value={data[data.length - 1].users} />
            </Col>
            <Col span={6}>
              <Statistic
                title="SESSIONS"
                value={data[data.length - 1].sessions}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="PAGEVIEWS"
                value={data[data.length - 1].pageviews}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="PAGES/SESSION"
                value={data[data.length - 1].pagesPerSession}
                precision={1}
              />
            </Col>
          </Row>
          <Divider />
        </Card>
      </div>
      <div style={{ padding: "20px" }}>
        <Title level={3}>销售报告</Title>
        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={23500}
                prefix="￥"
                precision={2}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card>
              <Statistic
                title="订单数"
                value={120}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card>
              <Statistic
                title="客户数"
                value={80}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card>
              <Statistic
                title="退款数"
                value={5}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>销售额趋势</span>
                <ArrowUpOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
              </div>
              {/* 在这里添加销售额趋势的图表组件 */}
            </Card>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>订单数趋势</span>
                <ArrowDownOutlined
                  style={{ fontSize: "24px", color: "#f5222d" }}
                />
              </div>
              {/* 在这里添加订单数趋势的图表组件 */}
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <h3 style={{ marginLeft: "250px" }}>销售额趋势</h3>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <h3 style={{ marginLeft: "250px" }}>销售总额</h3>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#8884d8" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </div>

      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <h3 style={{ marginLeft: "250px" }}>订单额趋势</h3>
              <LineChart
                width={600}
                height={300}
                data={order}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#1890ff"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <h3 style={{ marginLeft: "250px" }}>订单总额</h3>
              <BarChart
                width={600}
                height={300}
                data={order}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#1890ff" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
