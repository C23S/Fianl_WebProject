import React, { useState } from "react";
import { Table, Tag, Button, Modal, Form, Input, message, Space } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const CouponManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name: "双11促销券",
      type: "促销券",
      amount: 50,
      condition: "满100使用",
      startTime: "2023-11-01 00:00:00",
      endTime: "2023-11-11 23:59:59",
    },
    {
      id: 2,
      name: "新年折扣券",
      type: "折扣券",
      amount: 0.8,
      condition: "无使用条件",
      startTime: "2023-01-01 00:00:00",
      endTime: "2023-01-03 23:59:59",
    },
    {
      id: 3,
      name: "会员专享券",
      type: "会员券",
      amount: 20,
      condition: "仅限会员使用",
      startTime: "2023-03-15 00:00:00",
      endTime: "2023-03-18 23:59:59",
    },
  ]);

  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedCoupons, setSearchedCoupons] = useState([]); // 搜索后的优惠券列表数据

  const handleEdit = (record) => {
    setFormData(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除活动ID为 ${id} 的活动吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const updatedCoupons = coupons.filter((coupon) => coupon.id !== id);
        setCoupons(updatedCoupons);
        message.success("优惠券删除成功！");
      },
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === formData.id ? { ...coupon, ...formData } : coupon
    );
    setCoupons(updatedCoupons);
    setFormData({});
    message.success("优惠券信息已保存！");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFormData({});
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filteredCoupons = coupons.filter((coupon) =>
      coupon.name.includes(searchText)
    );
    setSearchedCoupons(filteredCoupons);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchedCoupons([]);
  };

  const columns = [
    {
      title: "优惠券名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "优惠券类型",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          color={
            type === "促销券" ? "blue" : type === "折扣券" ? "green" : "gold"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "优惠金额/折扣",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) =>
        record.type === "折扣券"
          ? (amount * 10).toFixed(1) + "折"
          : "￥" + amount.toFixed(2),
    },
    {
      title: "使用条件",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="请输入优惠券名称搜索"
          value={searchText}
          onChange={handleSearchInputChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button
          style={{ marginRight: "5px" }}
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          搜索
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          添加优惠券
        </Button>
        {searchedCoupons.length > 0 && (
          <Button type="link" onClick={handleClearSearch}>
            清除搜索结果
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={searchedCoupons.length > 0 ? searchedCoupons : coupons}
      />
      <Modal
        title="编辑优惠券"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={formData}
          onValuesChange={(changedValues) =>
            setFormData({ ...formData, ...changedValues })
          }
        >
          <Form.Item
            label="优惠券名称"
            name="name"
            rules={[{ required: true, message: "请输入优惠券名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="优惠金额"
            name="amount"
            rules={[{ required: true, message: "请输入优惠金额" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            label="使用条件"
            name="condition"
            rules={[{ required: true, message: "请输入使用条件" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="startTime"
            rules={[{ required: true, message: "请输入开始时间" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            rules={[{ required: true, message: "请输入结束时间" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
