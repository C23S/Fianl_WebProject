import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  IdcardOutlined,
  ShoppingOutlined,
  PhoneOutlined,
  ReconciliationOutlined,
  RocketOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import "./Layout.css";
const { confirm } = Modal;
const { Header, Sider, Content } = Layout;
const LayOut = () => {
  const navigate = useNavigate();

  //顶部导航栏当前项
  const [current, setCurrent] = useState("layout/home");
  //顶部导航
  const items = [
    {
      label: "首页",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "邮件",
      key: "email",
      icon: <MailOutlined />,
    },
    {
      label: "设置",
      key: "set",
      icon: <SettingOutlined />,
      children: [
        {
          key: "1",
          label: "页面设置",
        },
        {
          key: "2",
          label: "运费设置",
        },
        {
          key: "3",
          label: "支付设置",
        },
      ],
    },
    {
      label: "退出登录",
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  //侧边栏
  const litems = [
    {
      key: "1",
      icon: <IdcardOutlined />,
      label: "账户管理",
      children: [
        {
          key: "AdList",
          label: "管理员列表",
        },
        {
          key: "role",
          label: "账户管理",
        },
        {
          key: "search",
          label: "查询账户",
        },
        {
          key: "rolemanage",
          label: "角色权限设置",
        },
      ],
    },
    {
      key: "2",
      icon: <ShoppingOutlined />,
      label: "商品管理",
      children: [
        {
          key: "goods",
          label: "商品列表",
        },
        {
          key: "editproducts",
          label: "编辑商品",
        },
        {
          key: "sale",
          label: "商品销量统计",
        },
        {
          key: "stocksmanagement",
          label: "商品库存管理",
        },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "用户管理",
      children: [
        {
          key: "userlist",
          label: "用户列表",
        },
        {
          key: "usermanagement",
          label: "用户管理",
        },
        {
          key: "userpointsmanagement",
          label: "积分管理",
        },
      ],
    },
    {
      key: "4",
      icon: <ReconciliationOutlined />,
      label: "订单管理",
      children: [
        {
          key: "orderlist",
          label: "订单列表",
        },
        {
          key: "orderstatusmanagement",
          label: "订单状态管理",
        },
        {
          key: "returnexchange",
          label: "退货/换货管理",
        },
        {
          key: "orderstatistics",
          label: "订单统计报表",
        },
      ],
    },
    {
      key: "5",
      icon: <PhoneOutlined />,
      label: "客服管理",
      children: [
        {
          key: "customerservicelist",
          label: "客服列表",
        },
        {
          key: "customerservicemanage",
          label: "管理客服人员",
        },
        {
          key: "customerservicestatus",
          label: "客服在线状态",
        },
        {
          key: "customerserviceevaluation",
          label: "客服评价管理",
        },
        {
          key: "customerservicereport",
          label: "客服工作统计报表",
        },
      ],
    },
    {
      key: "6",
      icon: <RocketOutlined />,
      label: "运营活动管理",
      children: [
        {
          key: "activitylist",
          label: "活动列表",
        },
        {
          key: "activitymanagement",
          label: "管理活动",
        },
        {
          key: "activityproductmanagement",
          label: "活动商品管理",
        },
        {
          key: "couponmanagement",
          label: "活动优惠券管理",
        },
        {
          key: "activityaudit",
          label: "活动审核",
        },
        {
          key: "activitydatastatistics",
          label: "活动数据统计",
        },
      ],
    },
  ];
  //点击菜单
  const onClickMenu = (e) => {
    setCurrent(e.key);
    //判断点击的菜单项
    // eslint-disable-next-line default-case
    switch (e.key) {
      //主页
      case "home":
        navigate("/layout/home");
        break;
      //邮件
      case "email":
        navigate("/layout/email");
        break;
      //管理员列表
      case "AdList":
        navigate("/layout/adlist");
        break;
      //角色管理
      case "role":
        navigate("/layout/role");
        break;
      //查询账户
      case "search":
        navigate("/layout/search");
        break;
      //角色权限设计
      case "rolemanage":
        navigate("/layout/rolemanage");
        break;
      //用户列表
      case "userlist":
        navigate("/layout/userlist");
        break;
      //用户管理
      case "usermanagement":
        navigate("/layout/usermanagement");
        break;
      //用户积分管理
      case "userpointsmanagement":
        navigate("/layout/userpointsmanagement");
        break;
      //商品列表
      case "goods":
        navigate("/layout/goods");
        break;
      //编辑商品
      case "editproducts":
        navigate("/layout/editproducts");
        break;
      //商品库存管理
      case "stocksmanagement":
        navigate("/layout/stocksmanagement");
        break;
      //销量
      case "sale":
        navigate("/layout/sale");
        break;
      //活动列表
      case "activitylist":
        navigate("/layout/activitylist");
        break;
      //活动管理
      case "activitymanagement":
        navigate("/layout/activitymanagement");
        break;
      //活动商品管理
      case "activityproductmanagement":
        navigate("/layout/activityproductmanagement");
        break;
      //活动优惠券管理
      case "couponmanagement":
        navigate("/layout/couponmanagement");
        break;
      //活动审核
      case "activityaudit":
        navigate("/layout/activityaudit");
        break;
      //活动数据统计
      case "activitydatastatistics":
        navigate("/layout/activitydatastatistics");
        break;
      //退换货管理
      case "returnexchange":
        navigate("/layout/returnexchange");
        break;
      //订单列表
      case "orderlist":
        navigate("/layout/orderlist");
        break;
      //订单状态管理
      case "orderstatusmanagement":
        navigate("/layout/orderstatusmanagement");
        break;
      //订单统计报表
      case "orderstatistics":
        navigate("/layout/orderstatistics");
        break;
      //客服列表
      case "customerservicelist":
        navigate("/layout/customerservicelist");
        break;
      //客服管理
      case "customerservicemanage":
        navigate("/layout/customerservicemanage");
        break;
      //客服评价管理
      case "customerserviceevaluation":
        navigate("/layout/customerserviceevaluation");
        break;
      //客服状态管理
      case "customerservicestatus":
        navigate("/layout/customerservicestatus");
        break;
      //客服工作报表
      case "customerservicereport":
        navigate("/layout/customerservicereport");
        break;

      case "logout":
        confirm({
          title: "系统提示",
          icon: <ExclamationCircleFilled />,
          content: "是否确认退出系统？",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            console.log("确定");
            sessionStorage.clear();
            localStorage.clear();
            navigate("/");
          },
          onCancel() {
            console.log("取消");
          },
        });
        break;
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    navigate("/layout/home");
  }, []);

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "商城" : "在线商城管理"}</div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClickMenu}
          defaultSelectedKeys={["1"]}
          items={litems}
        />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            className="menu"
            onClick={onClickMenu}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content
          className="content"
          style={{
            margin: "10px 4px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayOut;
