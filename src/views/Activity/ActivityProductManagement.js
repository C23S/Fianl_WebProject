import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Select,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const ActivityProductManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [activityProducts, setActivityProducts] = useState([
    {
      id: 1,
      name: "商品A",
      price: 100,
      stock: 50,
      startDate: "2023-07-20",
      endDate: "2023-07-25",
      status: "进行中",
    },
    {
      id: 2,
      name: "商品B",
      price: 150,
      stock: 30,
      startDate: "2023-07-22",
      endDate: "2023-07-30",
      status: "未开始",
    },
  ]);

  const [searchText, setSearchText] = useState(""); // 搜索关键词
  const [searchedProducts, setSearchedProducts] = useState([]); // 搜索后的活动商品列表数据

  const handleEdit = (record) => {
    setFormData(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除商品ID为 ${id} 的商品吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const updatedProducts = activityProducts.filter(
          (product) => product.id !== id
        );
        setActivityProducts(updatedProducts);
        message.success("商品删除成功！");
      },
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    const updatedProducts = activityProducts.map((product) =>
      product.id === formData.id ? { ...product, ...formData } : product
    );
    setActivityProducts(updatedProducts);
    setFormData({});
    message.success("商品信息已保存！");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFormData({});
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filteredProducts = activityProducts.filter((product) =>
      product.name.includes(searchText)
    );
    setSearchedProducts(filteredProducts);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchedProducts([]);
  };

  const columns = [
    {
      title: "活动商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "活动开始日期",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "活动结束日期",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
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
          placeholder="请输入商品名称搜索"
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
          添加活动商品
        </Button>
        {searchedProducts.length > 0 && (
          <Button type="link" onClick={handleClearSearch}>
            清除搜索结果
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={
          searchedProducts.length > 0 ? searchedProducts : activityProducts
        }
      />
      <Modal
        title="编辑活动商品"
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
            label="活动商品名称"
            name="name"
            rules={[{ required: true, message: "请输入活动商品名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: "请输入价格" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            label="库存"
            name="stock"
            rules={[{ required: true, message: "请输入库存" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            label="活动开始日期"
            name="startDate"
            rules={[{ required: true, message: "请输入活动开始日期" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="活动结束日期"
            name="endDate"
            rules={[{ required: true, message: "请输入活动结束日期" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select>
              <Select.Option value="未开始">未开始</Select.Option>
              <Select.Option value="进行中">进行中</Select.Option>
              <Select.Option value="已结束">已结束</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ActivityProductManagement;
