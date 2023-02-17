import { Layout } from "antd";
import styled from "styled-components";
import StakingBG from "@img/market-banner.png";
import StakingTitle from "@img/staking-title.png";
import StoreTitlePhone from "@img/phone/store-title-phone.png";
import StakingMain from "@img/staking-bg.png"
import Tabon from "@img/tab_on.png";
import Taboff from "@img/tab_off.png";
import Btndefault from "@img/button-normal-default-disabled.png"
import TabDivider from "@img/tab-divider.png"
import cardBg from "@img/card-bg.png"
import nftbg from "@img/nft-img-back-green.png"


export default styled(Layout)`

  background-image: url(${StakingBG});

  background-size: auto 39.1875rem;
  background-position: center top;
  align-items: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  .title {
    width: 29.25rem;
    height: 6.9375rem;
    margin-top: 11.125rem;
    background-image: url(${StakingTitle});
    background-size: 100% 100%;
    @media only screen and (max-width: 768px) {
      width: 19.5rem;
      height: 4.5625rem;
      background-image: url(${StoreTitlePhone});
      margin-top: 6.875rem;
    }
  }
  .staking-content{
        height: 20.5rem;
        margin-top: 5.375rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-image: url(${StakingMain});
        background-size: 100% 100%;
        width:var(--content-width);
        .reward{
            display: flex;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            .label{
                font-size: 1.125rem;
                color: white;
                line-height: 3.5rem;
                font-weight: bold;
            }
            .value{
                font-size: 1.125rem;
                color: white;
                line-height: 3.5rem;
                font-weight: bold;
                .unit{
                      font-size: 0.875rem;
                      font-weight: 400;
                }
            }
      }
      .early{
          display: flex;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
          .label{
              font-size: 1.125rem;
              color: white;
              line-height: 3.5rem;
              font-weight: bold;
          }
          .value{
              font-size: 1.75rem;
              color: white;
              line-height: 3.5rem;
              font-weight: bold;
          }
          .btn{
              width: 10.5rem;
              margin-top: 0.625rem;
          }
          .record{
              font-size: 0.875rem;
              color: white;
              text-decoration: underline;
              opacity: 0.5;
              cursor: pointer;
          }
      }
      .tips{
          display: flex;
          justify-content: space-evenly;
          -webkit-box-align: center;
          align-items: center;
          .tip{
                text-align: center;
                .icon{
                      display: inline-block;
                      width: 1.8125rem;
                      height: 1.75rem;
                      background-size: 100% 100%;
                }
                .icon.green{
                      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAAAXNSR0IArs4c6QAACQtJREFUSEuFlnuMXVd5xX/7cc655947c++dOzOesSdjiDFUxClIlAactDEOjiAWfxQSwqOkVZSKCqhUpDQEBZWEpDSiokAFhARoSiQEmEIIjxgMUkISYopD65S4SbDHsWU7M/Y87tzXee+9q3MnuDRS6ZbOH0fnsfb37fWttQT/z/rRfXdNf/P+7+64/6GDb7hg06Y3NMfHZpSSnrWOKE3iM0vnFlY6nZ9d+6Zdj/3p3t1P7nnvzd3f9UvxWw+rN//5O6Yvv+J1Af2UYZ7Znx48VD95bn2vRF4ppdo2Vq9P+57WSkqsA2MM/eEwW1peWUrS+GknefBVL5l/+O1X7Y4HRSH+6Stf7T186Mg5wP4GZwR46aWvGPvFL45fVw2868NK0M4L4xpj427z1JRqNcabm6en6+1mSyoE1lqwAoRDegoEDIZDlpaXzfFTZ3qLy8u9JE1c+Wocp49vmp7+x2MnTx4GXIk1AvzB3XdefN1Nf/fV1W7/Yk9r5mdm2L51nqn2BI1qHW01LnekUcogGpLkGVpq6mGN6liIriqUL4myhKXlFZ557jjHT50hTtO43Wx9e3ay/dGnjh1bOA944EufuPSdN97+zW4/mt2xfRsXvWwbk40mNoXOUpelzjJn8zXSeo5pGaw2kAjUusbremzyW8zPzTI+VQct6PV6LJw5zeFnfk2SZL25mdm7663GnUeOHFkbVfj9z9yx8z0fuXOfVnrLay++iNmpKWQqef7UCkcHz5H9QU64M8Df6qH88guHEwITOZKjOfFPY/R/KLaOb2Hr9s0IH4ZxzLFTp3nq6DHCSnBibnL6pnBi4jsjwO98+mOXvPf2T33L13rL9rl5mn6DlbUup6cWCd7tU39lAIXBZQ6sGZ1DCYiWyEABkvVHhnTu6bONOWZfOokRhjhJOHbqFItrnWLz5NQDE7XaLeLWW2+V3vLpK35y6Mn7Vtc7MzIWo1b2fz+i8b4a4YykWM8wUQHFi/imHMITqJpGj/t0jySs3NZh3s3S2FTFSUeSZjx94iRI8fzs9Mxt4p8//uGpfT946O+l9t+9drZTWTq5Qn6hYfLDDSovkZhOih0aMCUjNULIUUUIi3Ml2w1IixpT6HbA+iMRvU8OuSDchK4LhBScWVnhzPJK0m5MPCA+e+P7X3/P/fvvdYhXyKFkOVtn/H1Vmm+qUnQSTC9HoBGqgpABUnoIoUZgzuU4m2FdhhM5XlOhQp/Fe7p431eMT1RxviNOUk6fW3Y4nhVv+ePX3fHvR379/ppfbU5XJll7aY/qjR5SG/JOCrlAqRCha0hdReoQyom0FmsTbBFjiwhrEkRQoNs+yUnH6t92mTJNMq/ckGVlvccgidfE1W+8/HsH//NXV+pM++2xFuZqR/AWgR0kmIEBfJSqo/0GIhhDenWk0JQHak2MSfrYvIcphlhSdEMiqgFnP9Yh+KVGhBZ8QW8Y0+kPY/Geq9744wMHn7hcR8ILG1VqN1fxd4DtJ7jYgaiigia60kKFjRGw1BWszTBZHxN3KJL1Eagthshx0JNVVr/QJ7s/RXkCAojTjPXBMBZ/tnfPgf2P/nxXkPre2GSVym0het5ieikuBlQNz2+iwgl02EZXmygvxBQZJulSxKsjUJN1KErAukW3K/S/kZF8LcYZi/UdaV7QHQ5j8a437z7w4CMHd40VoTe9pYW4xUdckI8AKQFlFV1WGE6gwha60vyfCpMeJl6jSErA9VFbZc2iJ0OG38hI96VkaUbhWbLCMoiiWLz9yssPPPjov+1qUPUunJ8l/0swO1JMP4WobGkF6Y2jgwY6bCC9MYTycK7AZgNM0qNIy3b2cSZCjIFqh8RfzLD7c3pJRK4MubEMk2QorrrsD/c/fOjJKwKnvc3jbcJrK8i3CcwwxfZycBqpaiOyqKA+YqoQGofFFQkmG2LzAdYMQaSopgIvIP1EQfpEStdEOFlWWBAl6Vmx97JLPvfQE4evw1BvuBpzO6cQN0lskGM7GS4rh9tDqipChUjlI6TGObcxg0UENsaRQUUg2x4saPikY+n0GqnIKP0zyTIXpdlh8aHrr33zl7/9w7sGUbS1KWts27IF74aAwWUDbDfD9Qswpb35IP3RSDghEaWAu2I0/LgCPAtNjQh86vuqFA8WnOguYkZ6KEbtTPLiPvFXN7x1bv8Pf/7ZxeWVvaH2ddtr8rLXzDP4i5j+XB+3nkMpbXkp8xLhSll7wb9FKR4OPIcbl8iaT+tXDYL7NMcWTjOwEVpJsiJnfRAtJFl+s7jmmmuU6i7/yf7HD31eSTnlC81Mtc3v7bmQtat7rE6tYgc5bmgQZXs3NrzhFqWsemBqAh1UmD4xwewDbY4ePsnxzhm0Viil6A6GcTeK77XW3n7enq7/6D98Swu1peJ7mNyxfXqe7a+Z58wfnWV5e4eikiNSi80szpTsHfEJESjqRZ25Y7PMPNbmmcPHeXb5OYyzeEoTZblb7fUO53n+18CjGwZ8z507r/ubO/bh5JaJsRq5KZBWMVubYrxVQbxKUttZZ73ZpRgzOA9kIQiTkHa3yfRCC/eU5b8WFnhm8QQWi680mTEsd3vPx0nyceBeIBoB/utnPrL9hls+dVeUpLummg0VBv6IhdZYtFFM11pc+PJ5ztlV2ptbbN48M8o4MlLIjuP4iVM8u3iCbtZHColWmrQoWOv1VgZR/AXg08Dq+UzzxN13e7s/+ME9vSi6KQyC17fqNb8WBiPvK1OaMKCEJk9yQj+gNT5Omuf00xiDJbc5FoPn6RFgnKZubTA8O4ziLwOfB57/XzHxhRsPuEQp+YFK4O9p1GrNQHvSU4rSc4uidI5RttgYejviJ04KpCivjc0N4yTtRsOn0yz/F+BrQJlLz6/fDsIbvIf5Wi18ay0I3pak2SullLWxSuCV8VHKciTkhtOX0bRMHNaR58YleRYPk2QlyfKfWGu/DjwODF+cwl8M+Jvn1alm8+WDeLA7y8xureUOpfSUViqQUqpRiEI4a01eGNvPi+KUKYrHLPwYOPjCeZ1P27+rwhdvaEJrXm0LudNiLxJCbEXQxpWyQ885twgcBX4J/Aw4vhFy/u/130xAg4hsSGLlAAAAAElFTkSuQmCC);
                }
                .label{
                  font-size: 0.875rem;
                      color: white;
                      line-height: 2.5rem;
                }
                .value{
                  font-size: 0.875rem;
                      color: white;
                      line-height: 2.5rem;
                      opacity: 0.5;
                }
                .icon.blue{
                  background-image: url(data:image/png;base64,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);
                }
          }

      }
      .action
  }
  .jqPWEm{
        background-image: url(data:image/png;base64,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);
        width: 100%;
        height: 40px;
        min-width: 6.75rem;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.5);
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        background-size: 100% 100%;
        cursor: pointer;
        pointer-events: auto;
  }
  .actions{
        display: flex;
        width: var(--content-width);
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        margin-top: 3.9375rem;
        margin-bottom: 2.5rem;
        position: relative;
        .tabs{
              display: flex;
              -webkit-box-pack: start;
              justify-content: flex-start;
              -webkit-box-align: center;
              align-items: center;
              margin-left: 2.5rem;
              .tabs-item.on {
                  width: 10.75rem;
                  height: 4.4375rem;
                  line-height: 4.4375rem;
                  background-image: url(${Tabon});
              }
              .tabs-item.off {
                  width: 10.75rem;
                  height: 3.75rem;
                  line-height: 3.75rem;
                  background-image: url(${Taboff});
                  color: rgba(255, 255, 255, 0.5);
              }
              .tabs-item {
                  background-size: 100% 100%;
                  cursor: pointer;
                  color: rgb(255, 255, 255);
                  text-align: center;
                  margin-right: 0.625rem;
              }
        },

        .confirm > span {
            color: white;
            margin-right: 1rem;
        }
        .confirm > div {
            width: 10.5rem;
        }
        .yVfNx {
            background-image: url(${Btndefault});
            filter: grayscale(1);
            width: 100%;
            height: 40px;
            min-width: 6.75rem;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.5);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            background-size: 100% 100%;
            cursor: not-allowed;
            pointer-events: none;
        }
  }
  .actions::before {
      content: "";
      display: block;
      position: absolute;
      width: 111.42%;
      height: 4.375rem;
      background-image: url(${TabDivider});
      background-size: 100% 100%;
      bottom: -0.375rem;
      left: -5.71%;
      pointer-events: none;
  }
  .actions>.confirm{
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                margin-right: 1.25rem;
                position: relative;

  }
 .list{
   margin-bottom:50px;
   width: var(--content-width);
 }





`;
