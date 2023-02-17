import { Layout } from "antd";
import styled from "styled-components";
import Bg from "@img/home/bg.png";
import BgPhone from "@img/phone/bg-phone.png";
import BotBg from "@img/home/bot-bg.png";
import Active from "@img/home/active.png";
import Default from "@img/home/default.png";
import TimeBg from "@img/home/timeBg.png";
import TeamBg from "@img/home/teamBg.png";
import partner from "@img/home/partner.png";
import partnerPhone from "@img/home/partner-phone.png";

export default styled(Layout)`
  .mainContent {
    background-image: url(${Bg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    @media only screen and (max-width: 768px) {
      background-image: url(${BgPhone});
      background-position: 0px -300px;
      background-size: 100% auto;
    }
  }
  .timeMain {
    width: 100%;
    background-image: url(${TimeBg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .timeLine {
      &.p_meanfe {
        width: 60%;
        @media (max-width: 768px) {
          width: 95%;
        }
      }
      padding: 7.5rem 0 3.75rem 0;
      margin: 0 auto;

      @media (min-width: 1200px) {
        width: 1170px;
      }
      @media (min-width: 992px) {
        width: 970px;
      }
      @media (min-width: 768px) {
        width: 750px;
      }
      @media (max-width: 768px) {
        padding: 5.625rem 0 2.5rem 0;
      }
      .mainContent1 {
        .timeLineTop {
          display: flex;
          justify-content: space-between;
          @media (max-width: 768px) {
            flex-wrap: wrap;
          }
        }
        .timeLineBottom {
          display: flex;
          justify-content: center;
          @media (max-width: 768px) {
            flex-wrap: wrap;
            justify-content: left;
          }
        }
        .item {
          display: flex;
          height: 13.125rem;
          @media (max-width: 768px) {
            height: auto;
          }
          @media (max-width: 768px) {
            margin-top: 1.875rem;
          }
          &.bot {
            margin-top: 2.5rem;
            @media (max-width: 768px) {
              margin-top: 1.875rem;
            }
            &.q3 {
              margin-left: 3.75rem;
              @media (max-width: 768px) {
                margin-left: 0;
              }
            }
          }
          .line {
            margin-right: 1.25rem;
          }
          .time {
            font-size: 1.875rem;
            color: white;
            font-family: "ErasITC-Bold";
          }
          .timeDetail {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
            span {
              color: #a8a8a8;
            }
          }
        }
        .left,
        .right {
          width: 50%;
          @media (max-width: 768px) {
            width: 100%;
          }
        }
      }
    }
  }

  .teamMain {
    width: 100%;
    background-image: url(${TeamBg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .teamContent {
      &.p_meanfe1 {
        width: 60%;
        @media (max-width: 768px) {
          width: 95%;
        }
      }
      padding: 6.25rem 0 3.75rem 0;
      margin: 0 auto;

      @media (min-width: 1200px) {
        width: 1170px;
      }
      @media (min-width: 992px) {
        width: 970px;
      }
      @media (min-width: 768px) {
        width: 750px;
      }
      @media (max-width: 768px) {
        padding: 7.5rem 0 2.5rem 0;
      }
      .team {
        img {
          width: 9.5rem;
        }
      }

      .mainContent2 {
        margin-top: 2.875rem;
        .contentItem {
          display: flex;
          margin-bottom: 2.5rem;
          .img {
            width: auto;
            height: 6.25rem;
            margin-right: 1.75rem;
            @media (max-width: 768px) {
              width: auto;
              height: 100%;
            }
            img {
              display: block;
              max-width: 100%;
              height: auto;
            }
          }
          .info {
            flex: 1;
            .name {
              margin-bottom: 0.625rem;
              font-size: 1.125rem;
              color: #ffffff;
              font-weight: 600;
              @media (max-width: 768px) {
                margin-bottom: 1rem;
              }
            }
            .topic {
              color: white;
              font-size: 0.875rem;
              margin-bottom: 0.625rem;
              @media (max-width: 768px) {
                margin-bottom: 1rem;
              }
            }
            .description {
              font-size: 0.875rem;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
  }

  .botPart {
    background-image: url(${BotBg});
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .topContent {
    width: 100%;
    text-align: center;
    position: relative;
    video {
      width: 100%;
      height: 100%;
    }
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 95%;
        animation: fadenum 0.1s;
        @keyframes fadenum {
          0% {
            transform: scale(0, 0);
          }
          100% {
            transform: scale(1, 1);
          }
        }
      }
    }

    .video-hide {
      position: absolute;
      top: -6250rem;
      left: -6250rem;
    }
  }
  .middleContent {
    max-width: 75rem;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
      padding: 0 1.25rem;
    }
    .des {
      width: 21.625rem;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.5);
    }
    .topicImg {
      max-width: 90%;
    }
    .firstPart {
      margin-top: 16.25rem;
      @media only screen and (max-width: 768px) {
        margin-top: 3.75rem;
      }
      .firstDes {
        margin: 2.3125rem 0 0 2.6875rem;
        @media only screen and (max-width: 768px) {
          width: 100%;
          padding: 2.3125rem 2.6875rem 0 2.6875rem;
          margin: 0;
        }
      }
      .infoChange {
        margin: 2.3125rem 0 0 2.6875rem;
        display: flex;
        align-items: center;
        .left,
        .right,
        .dot {
          cursor: pointer;
        }
        .dot {
          margin: 0 0.625rem;
          img:not(:first-child) {
            margin-left: 0.3125rem;
          }
        }
      }
    }
    .secondPart {
      text-align: right;
      margin: 45.3125rem 0 14.0625rem 0;
      @media only screen and (max-width: 768px) {
        margin: 7.375rem 0 8.5rem 0;
      }
      .secondDes {
        display: flex;
        justify-content: end;
        text-align: right;

        .des {
          margin: 1.5rem 2.0625rem 0 0;
          @media only screen and (max-width: 768px) {
            width: 100%;
            padding: 2.3125rem 2.6875rem 0 2.6875rem;
            margin: 0;
          }
        }
        &.bu {
          margin-top: 42px;
          @media only screen and (max-width: 768px) {
            justify-content: center;
          }
        }
        &.bu1 {
          margin-top: 20px;
          @media only screen and (max-width: 768px) {
            justify-content: center;
          }
        }
      }
      .blind {
        width: 290px;
        height: 65px;
        line-height: 65px;
        text-align: center;
        cursor: pointer;
        background-image: url(${Default});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-family: "ArialMT";
        font-size: 18px;
        color: #d6d6d6;
        &:hover {
          background-image: url(${Active});
          transform: scale(1.01, 1.01);
        }
      }
    }
  }

  .partner {
    max-width: 75rem;
    margin: 13.5625rem auto 6.25rem auto;
    position: relative;
    @media only screen and (max-width: 768px) {
      width: calc(100% - 2.5rem);
      margin: 2.5rem 1.25rem 1.25rem 1.25rem;
    }
    .partner-img {
      width: 100%;
    }
    .topic {
      position: absolute;
      top: -0.9375rem;
      @media only screen and (max-width: 768px) {
        width: 17.6875rem;
        top: -0.3125rem;
      }
    }
    .main {
      padding: 5rem 2.375rem 0 2.375rem;
      display: flex;
      flex-wrap: wrap;
      background-image: url(${partner});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      @media only screen and (max-width: 768px) {
        padding: 3.75rem 2.375rem 0 2.375rem;
        background-image: url(${partnerPhone});
      }
      .blank {
        width: 20%;
      }
      .mainItem {
        cursor: pointer;
        width: 20%;
        text-align: center;
        margin-bottom: 1.25rem;
        @media only screen and (max-width: 768px) {
          width: 100%;
        }
        .p_anlefe {
          margin: 0 auto;
        }
        &:hover {
          transform: scale(1.01, 1.01);
        }
        img {
          vertical-align: middle;
          width: 100%;
          height: 100%;
          &.img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }
`;
