import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Style from "./Style";

/**主结构 包含菜单和底部链接 */
export default function Main() {
  return (
    <Style>
      <Layout.Header className="head">
        <Header />
      </Layout.Header>
      <Outlet />
      <Layout.Footer className="footer">
        <Footer />
      </Layout.Footer>
    </Style>
  );
}
