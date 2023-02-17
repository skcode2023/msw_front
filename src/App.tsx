import Router from "./pages/Router";
import "./assets/style/theme.less";
import Web3ReactProvider from "@utils/web3/Web3ReactProvider";
import { Provider } from "react-redux";
import store from "./ar/store";
import { Spin } from "antd";
import { useAppSelector } from "@ar/hooks";

export default function App() {
  return (
    <Provider store={store}>
      <Spining>
        <Web3ReactProvider>
          <Router />
        </Web3ReactProvider>
      </Spining>
    </Provider>
  );
}

function Spining({ children }: { children: JSX.Element }) {
  const spining = useAppSelector((state) => state.state.spining);
  return (
    <Spin spinning={!!spining} delay={300}>
      {children}
    </Spin>
  );
}
