import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col, Select, Typography } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const SearchRole = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  // 模拟账户数据
  const accountData = [
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      phone: "1234567890",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      phone: "9876543210",
    },
  ];

  // 查询账户
  const handleSearch = (values) => {
    const results = accountData.filter(
      (account) =>
        account.username.includes(values.searchText) ||
        account.email.includes(values.searchText) ||
        account.phone.includes(values.searchText)
    );
    setSearchResults(results);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="查询账户" style={{ marginBottom: 24 }}>
        <Form form={form} layout="inline" onFinish={handleSearch}>
          <Form.Item name="searchText" label="查询条件">
            <Input
              prefix={<SearchOutlined />}
              placeholder="请输入用户名、邮箱或手机号"
              style={{ width: 300 }}
            />
          </Form.Item>
          <Form.Item name="filter" label="筛选条件">
            <Select style={{ width: 150 }} placeholder="选择筛选条件">
              <Option value="active">活跃账户</Option>
              <Option value="inactive">非活跃账户</Option>
              <Option value="inactive">管理员</Option>
              <Option value="inactive">非管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Title level={3} style={{ marginBottom: 16 }}>
        查询结果
      </Title>
      <Row gutter={16}>
        {searchResults.map((account) => (
          <Col key={account.id} xs={24} sm={12} md={16} lg={200}>
            <Card
              title={account.username}
              style={{ marginBottom: 16 }}
              actions={[
                <Button
                  style={{ marginLeft: 2, marginRight: 2, marginBottom: 8 }}
                  icon={<UserOutlined />}
                  key="username"
                >
                  {account.username}
                </Button>,
                <Button
                  style={{ marginRight: 2, marginBottom: 8 }}
                  icon={<MailOutlined />}
                  key="email"
                >
                  {account.email}
                </Button>,
                <Button
                  style={{ marginLeft: 70, marginRight: 2, marginBottom: 8 }}
                  icon={<PhoneOutlined />}
                  key="phone"
                >
                  {account.phone}
                </Button>,
              ]}
            >
              <p>账户ID:{account.id}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchRole;
