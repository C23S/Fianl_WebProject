import React, { useState } from "react";
import { Table, Button, Drawer, Form, Input, Popconfirm, message } from "antd";

export default function Role() {
  const [roleID, setRoleID] = useState(0);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  //添加角色
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  //删除角色
  const confirm = (e) => {
    console.log(e);
    message.success("删除成功！");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("取消删除！");
  };
  //编辑角色
  const edit = (roleID) => {
    setOpen(true);
    setRoleID(roleID);
  };

  const dataSource = [
    {
      key: "1",
      roleID: "0001",
      name: "张三",
      age: 32,
      address: "青山湖区湖底公园1号",
      type: "管理员",
    },
    {
      key: "2",
      roleID: "0002",
      name: "李四",
      age: 42,
      address: "青山湖区湖底公园1号",
      type: "普通用户",
    },
  ];

  const columns = [
    {
      title: "角色编号",
      dataIndex: "roleID",
      key: "roleID",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "角色类别",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      key: "action",
      render: (ret) => (
        <>
          <Button
            style={{ borderColor: "orange", color: "orange" }}
            size="small"
            onClick={() => {
              edit(ret.roleID);
            }}
          >
            编辑
          </Button>

          <Popconfirm
            title="提示"
            description="确定删除吗?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{ marginLeft: "5px" }} danger size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search">
        <Button
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          添加
        </Button>
      </div>
      <Table size="small" dataSource={dataSource} columns={columns} />
      <Drawer
        title="角色"
        width={500}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="角色编号"
            name="roleID"
            rules={[
              {
                required: true,
                message: "请输入角色编号！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: "请输入年龄！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="住址"
            name="address"
            rules={[
              {
                required: true,
                message: "请输入住址！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色类别"
            name="type"
            rules={[
              {
                required: true,
                message: "请输入角色类别！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "50px" }}
            >
              添加
            </Button>
            <Button style={{ marginLeft: "40px" }}>取消</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
