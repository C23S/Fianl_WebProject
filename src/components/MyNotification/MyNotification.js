import React, { useEffect } from "react";
import { notification } from "antd";

export default function MyNotification({ notiMsg }) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (notiMsg.type) {
      api[notiMsg.type]({
        message: "系统提示",
        description: notiMsg.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notiMsg.type]);
  return <>{contextHolder}</>;
}
