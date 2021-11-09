import * as React from "react";

import { subscribe, unsubscribe, Store } from "@/store";

export type ProxyStoreContextProps = Store | null;

export const ProxyStoreContext =
  React.createContext<ProxyStoreContextProps | null>(null);

type ProxyStoreProviderProps = {
  store: Store;
  children: React.ReactNode;
};

export function ProxyStoreProvider({
  store,
  children,
}: ProxyStoreProviderProps) {
  return (
    <ProxyStoreContext.Provider value={store}>
      {children}
    </ProxyStoreContext.Provider>
  );
}

type ProxyStoreConsumerProps = {
  children: (context: ProxyStoreContextProps) => React.ReactNode;
};

export function ProxyStoreConsumer({ children }: ProxyStoreConsumerProps) {
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const context = React.useContext(ProxyStoreContext);

  React.useEffect(() => {
    const subscriberId = subscribe(forceUpdate);

    return () => {
      unsubscribe(subscriberId);
    };
  }, [forceUpdate]);

  return <>{children(context)}</>;
}
