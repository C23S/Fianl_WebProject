import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout/Layout";
import Login from "./views/Login/Login";
import Role from "./views/Role/Role";
import AdList from "./views/Role/AdList";
import UserManagement from "./views/User/UserManagement";
import UserList from "./views/User/UserList";
import Goods from "./views/Products/Products";
import Home from "./views/Home/Home";
import Sale from "./views/Products/Sale";
import SearchRole from "./views/Role/SearchRole";
import RoleManage from "./views/Role/RoleManage";
import EditProduct from "./views/Products/EditProduct";
import StockManagement from "./views/Products/StockManagement";
import ActivityList from "./views/Activity/ActivityList";
import Email from "./views/Email/Email";
import ReturnExchange from "./views/Orders/ReturnExchange";
import OrderStatistics from "./views/Orders/OrderStatistics";
import CustomerServiceEvaluation from "./views/CustomerService/CustomerServiceEvaluation";
import OrderStatusManagement from "./views/Orders/OrderStatusManagement";
import CustomerServiceReport from "./views/CustomerService/CustomerServiceReport";
import CustomerServiceStatus from "./views/CustomerService/CustomerServiceStatus";
import ActivityProductManagement from "./views/Activity/ActivityProductManagement";
import ActivityDataStatistics from "./views/Activity/ActivityDataStatistics";
import ActivityManagement from "./views/Activity/ActivityManagement";
import CouponManagement from "./views/Activity/CouponManagement";
import ActivityAudit from "./views/Activity/ActivityAudit";
import UserPointsManagement from "./views/User/UserPointsManagement";
import OrderList from "./views/Orders/OrderList";
import CustomerServiceList from "./views/CustomerService/CustomerServiceList";
import CustomerServiceManage from "./views/CustomerService/CustomerServiceManage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layout" element={<Layout />}>
          <Route path="role" element={<Role />} />
          <Route path="adlist" element={<AdList />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="goods" element={<Goods />} />
          <Route path="home" element={<Home />} />
          <Route path="sale" element={<Sale />} />
          <Route path="search" element={<SearchRole />} />
          <Route path="rolemanage" element={<RoleManage />} />
          <Route path="editproducts" element={<EditProduct />} />
          <Route path="stocksmanagement" element={<StockManagement />} />
          <Route path="activitylist" element={<ActivityList />} />
          <Route path="activitymanagement" element={<ActivityManagement />} />
          <Route path="couponmanagement" element={<CouponManagement />} />
          <Route path="email" element={<Email />} />
          <Route path="returnexchange" element={<ReturnExchange />} />
          <Route path="orderstatistics" element={<OrderStatistics />} />
          <Route path="orderlist" element={<OrderList />} />
          <Route
            path="customerserviceevaluation"
            element={<CustomerServiceEvaluation />}
          />
          <Route
            path="orderstatusmanagement"
            element={<OrderStatusManagement />}
          />
          <Route
            path="customerservicereport"
            element={<CustomerServiceReport />}
          />
          <Route
            path="customerservicestatus"
            element={<CustomerServiceStatus />}
          />
          <Route path="customerservicelist" element={<CustomerServiceList />} />
          <Route
            path="customerservicemanage"
            element={<CustomerServiceManage />}
          />
          <Route
            path="activityproductmanagement"
            element={<ActivityProductManagement />}
          />
          <Route
            path="activitydatastatistics"
            element={<ActivityDataStatistics />}
          />
          <Route path="activityaudit" element={<ActivityAudit />} />
          <Route
            path="userpointsmanagement"
            element={<UserPointsManagement />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
