import { ReactNode, createContext, useCallback } from "react";
import { notification } from "antd";
import { TWithChildren } from "../props";

export type Status = "success" | "error" | "info";

type TNotificationContext = {
  notify: (_text: ReactNode, _status?: Status, _seconds?: number) => void;
};

export const NotificationsContext = createContext<TNotificationContext>({
  notify: () => null,
});

export const NotificationsProvider = ({ children }: TWithChildren) => {
  const [api, context] = notification.useNotification();

  const notify = useCallback(
    (text: ReactNode, status?: Status, seconds?: number) => {
      const method = status || "info";
      api[method]({
        placement: "topRight",
        message: text,
        duration: seconds || 5,
      });
    },
    [api]
  );
  return (
    <>
      {context}
      <NotificationsContext.Provider value={{ notify }}>
        {children}
      </NotificationsContext.Provider>
    </>
  );
};
