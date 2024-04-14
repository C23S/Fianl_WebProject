import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button, Form, Input } from "antd";
import MyNotification from "../../components/MyNotification/MyNotification";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/layout");
    }
  }, [navigate]);

  // 通知框
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // 表单
  let [form] = Form.useForm();

  const onFinish = (values) => {
    // Simulate login success
    if (values.loginId === "admin" && values.loginPwd === "password") {
      setNotiMsg({ type: "success", description: "登录成功" });
      // 跳转到首页
      navigate("/layout");
    } else {
      setNotiMsg({ type: "error", description: "账号或密码错误" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="text">
        <h2>
          <UserOutlined style={{ marginRight: "10px" }} /> 在线商城管理系统
        </h2>
        <Form
          className="form-wrapper"
          name="basic"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            loginId: "",
            loginPwd: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="form-item"
            label="账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <div className="form-actions">
              <Button className="submit-btn" type="primary" htmlType="submit">
                登录
              </Button>
              <Button
                className="cancel-btn"
                onClick={() => {
                  form.resetFields();
                }}
              >
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <MyNotification notiMsg={notiMsg} />
    </div>
  );
}
