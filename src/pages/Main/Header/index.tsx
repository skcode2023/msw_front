import Style from "./Style";
import Menu, { PhoneMenu } from "./Menu";
import { useLocation, useNavigate } from "react-router-dom";
import Account from "./Account";
import { useAppSelector } from "@ar/hooks";

/**菜单栏 */
export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const headerVisible = useAppSelector((state) => state.state.headerVisible);

  /**跳转页面 */
  function goPage(path: string) {
    if (pathname === path) {
      //相同网址不跳
      return;
    }
    navigate(path);
  }

  if (headerVisible) {
    return (
      <Style>
        <div
          className="left"
          onClick={() => {
            goPage("/");
          }}
        >
          <div className="icon"></div>
        </div>
        <div className="middle">
          {window.isPhone ? (
            <PhoneMenu goPage={goPage} />
          ) : (
            <Menu goPage={goPage} />
          )}
        </div>
        <div className="right">
          <Account goPage={goPage} />
        </div>
      </Style>
    );
  } else {
    return null;
  }
}
