import { Col, Row } from "antd";
import Style from "./Style";
import FooterLogo from "@img/home/footerLogo.png";
import dis from "@img/home/mes.png";
import tel from "@img/home/telegram.png";
import tw from "@img/home/twitter.png";
import net from "@img/home/discord.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const RootDom = useRef<HTMLElement | null>(null);

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);
  const navigate = useNavigate();

  return (
    <Style>
      <div className="main">
        <Row>
          <Col xl={7} xs={24}>
            <div
              className="icon"
              onClick={() => {
                const href = window.location.href.split("#/");
                if (href[1]) {
                  navigate("/");
                } else {
                  if (RootDom.current) {
                    RootDom.current.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }
              }}
            >
              <img src={FooterLogo} alt="" />
            </div>
          </Col>
          <Col xl={6} xs={24}>
            <div className="introduction">
              <div className="title">{t("footer.topic1")}</div>
              <div className="content">
                <a
                  href="https://mountainseaworld.gitbook.io/whitepaper/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>·</span> {t("footer.topic1.1")}
                </a>
              </div>
            </div>
          </Col>
          <Col xl={4} xs={24}>
            <div className="services">
              <div className="title sec">{t("footer.topic2")}</div>
              <div
                className="content"
                onClick={() => {
                  navigate("/store");
                }}
              >
                <span>·</span> {t("footer.topic2.1")}
              </div>
              <div
                className="content"
                onClick={() => {
                  navigate("/box");
                }}
              >
                <span>·</span> {t("footer.topic2.2")}
              </div>
              <div
                className="content"
                onClick={() => {
                  navigate("/market");
                }}
              >
                <span>·</span> {t("footer.topic2.3")}
              </div>
            </div>
          </Col>
          <Col xl={7} xs={24}>
            <div className="services link">
              <div className="content">
                <img src={dis} alt="" />
                <a href="info@mountainseaworld.io" target="_blank">
                  info@mountainseaworld.io
                </a>
              </div>
              <div className="content">
                <img src={tel} alt="" />
                <a href=" http://t.me/mountainandseaworld" target="_blank">
                  http://t.me/mountainandseaworld
                </a>
              </div>
              <div className="content">
                <img src={tw} alt="" />
                <a href="@mountainsea2022" target="_blank">
                  {" "}
                  @mountainsea2022
                </a>
              </div>
              <div className="content">
                <img src={net} alt="" />
                <a href=" https://discord.gg/mountainseaworld" target="_blank">
                  https://discord.gg/mountainseaworld
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Style>
  );
}
