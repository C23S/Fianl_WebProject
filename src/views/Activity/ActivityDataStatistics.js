import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  EyeOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ActivityDataStatistics = () => {
  // 模拟活动数据
  const activityData = [
    {
      date: "2023-07-01",
      participants: 200,
      views: 500,
      conversionRate: 20,
      likedCount: 1000,
      reportedCount: 400,
    },
    {
      date: "2023-07-02",
      participants: 350,
      views: 700,
      conversionRate: 22,
      likedCount: 900,
      reportedCount: 210,
    },
    {
      date: "2023-07-03",
      participants: 400,
      views: 800,
      conversionRate: 25,
      likedCount: 780,
      reportedCount: 90,
    },
    {
      date: "2023-07-04",
      participants: 300,
      views: 600,
      conversionRate: 18,
      likedCount: 880,
      reportedCount: 300,
    },
    {
      date: "2023-07-05",
      participants: 500,
      views: 900,
      conversionRate: 30,
      likedCount: 500,
      reportedCount: 50,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>活动数据统计</h2>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="活动参与人数"
              value={activityData[activityData.length - 1].participants}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="活动浏览量"
              value={activityData[activityData.length - 1].views}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="活动转化率"
              value={activityData[activityData.length - 1].conversionRate}
              suffix="%"
              prefix={<PercentageOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card>
            <h3>活动参与人数趋势</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h3>活动浏览量趋势</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card>
            <h3>活动转化率趋势</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="conversionRate"
                  stroke="#ffc658"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h3>活动点赞与举报趋势</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="likedCount"
                  stroke="#ff7f0e"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="reportedCount"
                  stroke="#e41a1c"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityDataStatistics;
