import Style from "./Style";
import FirstTitle from "@img/home/firstTitle.png";
import SecondTitle from "@img/home/secondTitle.png";
import PartnerTitle from "@img/home/partnerTitle.png";
import { firstDesList, partnerList } from "@utils/commom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@ar/hooks";
import { setHeaderVisible } from "@ar/state";
import Line from "@img/line.png";
import TeamImg from "@img/team.png";
import { personList } from "@utils/commom";
import Tline from "@img/home/tline.png";
import Tline1 from "@img/home/tline1.png";
import PartnerTop from "@img/home/parteners-top.png";
import PartnerBottom from "@img/home/parteners-bottom.png";
import PartnerTop1 from "@img/home/longTop.png";
import PartnerBottom1 from "@img/home/longBottom.png";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [current] = useState(0);
  const [play, setPlay] = useState(true);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const RootDom = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);

  useEffect(() => {
    if (RootDom.current) {
      RootDom.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    playVideo();
    dispatch(setHeaderVisible(false));
  }, [dispatch]);

  useEffect(() => {
    let w = window.innerWidth;
    setWidth(w);
    window.addEventListener("resize", resizeUpdate);

    return () => {
      window.removeEventListener("resize", resizeUpdate);
    };
  }, []);

  const resizeUpdate = (e: any) => {
    let w = e.target.innerWidth;
    setWidth(w);
  };

  const onEnded = (e: string) => {
    setPlay(false);
    setTimeout(() => {
      dispatch(setHeaderVisible(true));
    }, 2000);
    const videoId: any = document.getElementById("video1");
    videoId.play();
  };

  const playVideo = () => {
    const videoId: any = document.getElementById("video");
    const videoId1: any = document.getElementById("video1");
    videoId.play();
    videoId1.addEventListener(
      "canplay",
      (e: any) => {
        e.target.pause();
      },
      { once: true }
    );
  };

  return (
    <Style>
      <div className="mainContent">
        <div className="topContent" style={{ height: (1080 / 1920) * width }}>
          <video
            id="video"
            className={
              play ? "banner-inner-video" : "banner-inner-video video-hide"
            }
            src={require("../../assets/home.mp4")}
            onEnded={() => onEnded("video")}
            autoPlay
            muted
          ></video>
          <video
            id="video1"
            className={
              play ? "banner-inner-video video-hide" : "banner-inner-video"
            }
            src={require("../../assets/home1.mp4")}
            onEnded={() => onEnded("video1")}
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div className="middleContent">
          <div className="firstPart">
            <img src={FirstTitle} alt="" className="topicImg" />
            <div className="firstDes des">
              {i18n.language === "en"
                ? firstDesList[current].info
                : firstDesList[current].zhInfo}
            </div>
            <div className="secondPart">
              <img src={SecondTitle} alt="" className="topicImg" />
              <div className="secondDes bu">
                <div className="blind">
                  <div
                    className="text"
                    onClick={() => {
                      navigate("/box");
                    }}
                  >
                    {t("header.box")}
                  </div>
                </div>
              </div>
              <div className="secondDes bu1">
                <div className="blind">
                  <div
                    className="text"
                    onClick={() => {
                      navigate("/market");
                    }}
                  >
                    {t("header.market")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="timeMain">
        <div className="timeLine p_meanfe">
          <div className="mainContent1">
            <div className="timeLineTop">
              <div className="item">
                <div className="line">
                  <img src={Line} alt="" />
                </div>
                <div className="detail">
                  <div className="time">{t("home.2022.2")}</div>
                  <div className="timeDetail">
                    <span>·</span> {t("home.2022.1.1")} <br />
                    <span>·</span> {t("home.2022.1.2")}
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="line">
                  <img src={Line} alt="" />
                </div>
                <div className="detail">
                  <div className="time">{t("home.2022.4")}</div>
                  <div className="timeDetail">
                    <span>·</span> {t("home.2022.4.1")}
                    <br />
                    <span>·</span> {t("home.2022.4.2")}
                    <br />
                    <span>·</span> {t("home.2022.4.3")}
                    <br />
                    <span>·</span> {t("home.2022.4.4")} <br />
                    <span>·</span> {t("home.2022.4.5")}
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="line">
                  <img src={Line} alt="" />
                </div>
                <div className="detail">
                  <div className="time">{t("home.2023.2")}</div>
                  <div className="timeDetail">
                    <span>·</span> {t("home.2023.2.1")}
                    <br />
                    <span>·</span> {t("home.2023.2.2")}
                  </div>
                </div>
              </div>
            </div>
            <div className="timeLineBottom">
              <div className="item bot">
                <div className="line">
                  <img src={Line} alt="" />
                </div>
                <div className="detail">
                  <div className="time">{t("home.2022.3")}</div>
                  <div className="timeDetail">
                    <span>·</span> {t("home.2022.3.1")}
                    <br />
                    <span>·</span> {t("home.2022.3.2")}
                    <br />
                    <span>·</span> {t("home.2022.3.3")}
                    <br />
                    <span>·</span> {t("home.2022.3.4")}
                  </div>
                </div>
              </div>
              <div className="item bot q3">
                <div className="line">
                  <img src={Line} alt="" />
                </div>
                <div className="detail">
                  <div className="time">{t("home.2023.1")}</div>
                  <div className="timeDetail">
                    <span>·</span> {t("home.2023.1.1")} <br />
                    <span>·</span> {t("home.2023.1.2")} <br />
                    <span>·</span> {t("home.2023.1.3")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="teamMain">
        <div className="teamContent p_meanfe1">
          <div className="team">
            <img src={TeamImg} alt="" />
          </div>
          <div className="mainContent2">
            {personList.map((item, index) => {
              return (
                <div className="contentItem" key={index}>
                  <div className="img">
                    <img src={Tline} alt="" />
                  </div>
                  <div className="info">
                    <div className="name">
                      {i18n.language === "en" ? item.name : item.zhName}
                    </div>
                    <div className="topic">
                      {i18n.language === "en" ? item.topic : item.zhTopic}
                    </div>
                    <div className="description">
                      {i18n.language === "en"
                        ? item.description
                        : item.zhDescription}
                    </div>
                  </div>
                </div>
              );
            })}
            {!window.isPhone && (
              <div className="img">
                <img src={Tline1} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="botPart">
        <div className="partner">
          <img src={PartnerTitle} className="topic" alt="" />
          <img
            className="partner-img"
            src={window.isPhone ? PartnerTop : PartnerTop1}
            alt=""
          />
          <div className="main">
            {partnerList.map((item, index) => {
              return (
                <div key={index} className="mainItem">
                  <div className="p_anlefe">
                    <img
                      src={item}
                      alt=""
                      className="img-responsive"
                      style={{ height: "auto" }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="blank" />
            <div className="blank" />
            <div className="blank" />
            <div className="blank" />
            <div className="blank" />
          </div>
          <img
            className="partner-img"
            src={window.isPhone ? PartnerBottom : PartnerBottom1}
            alt=""
          />
        </div>
      </div>
    </Style>
  );
}
