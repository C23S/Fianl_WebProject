import React, { useState } from "react";
import { Select, Checkbox, Button, Row, Col, Modal, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const RoleManage = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "管理员" },
    { id: 2, name: "普通用户" },
    { id: 3, name: "访客" },
  ]);

  const [selectedRole, setSelectedRole] = useState(null);

  const permissionsData = [
    { id: 1, name: "查看用户列表", checked: false },
    { id: 2, name: "编辑用户信息", checked: false },
    { id: 3, name: "删除用户", checked: false },
    { id: 4, name: "查看订单列表", checked: false },
    { id: 5, name: "编辑订单信息", checked: false },
    { id: 6, name: "删除订单", checked: false },
  ];

  const [permissions, setPermissions] = useState([]);

  const handleSelectRole = (roleId) => {
    const selectedRole = roles.find((role) => role.id === roleId);
    setSelectedRole(selectedRole);
    setPermissions(permissionsData.map((p) => ({ ...p, checked: false })));
  };

  const handlePermissionChange = (permissionId, checked) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((p) =>
        p.id === permissionId ? { ...p, checked } : p
      )
    );
  };

  const handleSaveRolePermissions = () => {
    confirm({
      title: `确认保存 ${selectedRole.name} 角色的权限设置吗？`,
      onOk() {
        console.log("保存角色权限:", selectedRole, permissions);
        message.success("角色权限已保存成功！");
      },
      onCancel() {},
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16} justify="center">
        <Col span={8}>
          <h2 style={{ color: "#1890ff" }}>角色权限管理</h2>
          <Select
            style={{ width: "100%" }}
            value={selectedRole ? selectedRole.id : ""}
            onChange={(value) => handleSelectRole(value)}
          >
            <Option value="">请选择角色</Option>
            {roles.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      {selectedRole && (
        <Row gutter={16} justify="center">
          <Col span={8}>
            <h3 style={{ color: "#1890ff" }}>角色权限</h3>
            {permissions.map((permission) => (
              <div key={permission.id}>
                <Checkbox
                  checked={permission.checked}
                  onChange={(e) =>
                    handlePermissionChange(permission.id, e.target.checked)
                  }
                >
                  {permission.name}
                </Checkbox>
              </div>
            ))}
            <Button
              type="primary"
              onClick={handleSaveRolePermissions}
              style={{ marginTop: 16 }}
            >
              <SaveOutlined /> 保存权限设置
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default RoleManage;
