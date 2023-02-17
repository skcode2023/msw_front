import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MenuBody } from "../Style";
import Style from "./Style";

/**
 * 操作项
 * - goPage：跳转页面
 */
export default function Menu({ goPage }: { goPage: (path: string) => void }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Style>
      <div
        className={
          "menu-item" + (pathname === "/" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/");
        }}
      >
        <span className="menu-txt">{t("header.home")}</span>
      </div>
      <div
        className={
          "menu-item" + (pathname === "/store" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/store");
        }}
      >
        <span className="menu-txt">{t("header.store")}</span>
      </div>
      <div
        className={
          "menu-item" + (pathname === "/box" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/box");
        }}
      >
        <span className="menu-txt">{t("header.box")}</span>
      </div>
	  <div
	    className={
	      "menu-item" + (pathname === "/stake" ? " on" : " animation-button")
	    }
	    onClick={() => {
	      goPage("/stake");
	    }}
	  >
	    <span className="menu-txt">{t("header.stake")}</span>
	  </div>
      <div
        className={
          "menu-item" + (pathname === "/market" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/market");
        }}
      >
        <span className="menu-txt">{t("header.market")}</span>
      </div>
    </Style>
  );
}

export function PhoneMenu({ goPage }: { goPage: (path: string) => void }) {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState(t("header.home") || "");

  useEffect(() => {
    switch (pathname) {
      case "/store":
        setMenu(t("header.store") || "");
        break;
      case "/box":
        setMenu(t("header.box1") || "");
        break;
      case "/market":
        setMenu(t("header.market1") || "");
        break;
      case "/personal":
        setMenu(t("header.personal") || "");
        break;
      default:
        setMenu(t("header.home") || "");
        break;
    }
  }, [pathname, i18n.language, t]);

  return (
    <>
      <Dropdown
        trigger={["click"]}
        overlay={
          <MenuBody
            items={[
              {
                key: "home",
                label: t("header.home"),
                onClick: () => goPage("/"),
              },
              {
                key: "store",
                label: t("header.store"),
                onClick: () => goPage("/store"),
              },
              {
                key: "box",
                label: t("header.box1"),
                onClick: () => goPage("/box"),
              },
              {
                key: "market",
                label: t("header.market1"),
                onClick: () => goPage("/market"),
              },
            ]}
          />
        }
        placement="bottom"
      >
        <div className="menu menu-txt">
          {menu}
          <div className="icon">
            <svg viewBox="0 0 12 8">
              <path d="M 0 0 L 12 0 L 6 8 z" fill="#8081a6" />
            </svg>
          </div>
        </div>
      </Dropdown>
    </>
  );
}
