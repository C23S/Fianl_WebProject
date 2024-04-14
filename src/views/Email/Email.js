import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Select,
  Form,
  Table,
} from "antd";

const { Header, Content } = Layout;
const { Option } = Select;

const Email = () => {
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([]);

  const onFinish = (values) => {
    console.log("Email Data:", values);
    form.resetFields();
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const columns = [
    {
      title: "发件人",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "主题",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <Layout>
      <Header style={{ background: "#fff", textAlign: "center" }}></Header>
      <Content style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form form={form} onFinish={onFinish}>
              <Form.Item name="to" label="收件人" rules={[{ required: true }]}>
                <Input placeholder="收件人" />
              </Form.Item>
              <Form.Item
                name="subject"
                label="主题"
                rules={[{ required: true }]}
              >
                <Input placeholder="主题" />
              </Form.Item>
              <Form.Item
                name="content"
                label="邮件内容"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={10} placeholder="邮件内容" />
              </Form.Item>
              <Form.Item name="attachment" label="附件">
                <Upload customRequest={dummyRequest} showUploadList={false}>
                  <Button>选择附件</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="template" label="模板">
                <Select placeholder="选择模板">
                  <Option value="template1">模板1</Option>
                  <Option value="template2">模板2</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  发送
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <h2>收件箱</h2>
            <Table dataSource={emails} columns={columns} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Email;
