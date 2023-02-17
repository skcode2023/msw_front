import Style from "./Style";

import cardbg from "@img/card-bg.png";
import { message } from "antd";
import { useWeb3React } from "@web3-react/core";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import { useEffect, useRef, useState } from "react";
import { useBoolean, useDebounceFn, useToggle } from "ahooks";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { useAppDispatch, useAppSelector } from "@ar/hooks";

import config from "@utils/web3/config";
import { useMemoizedFn } from "ahooks";
import useApi from "@utils/useApi";
import { useTranslation } from "react-i18next";

import CardStake, { TemCard } from "@com/CardStake";
import Button from "@com/Button";

export default function Stake() {

  const { active, account } = useWeb3React();
  const web3Object = useWeb3Object();

  const dispatch = useAppDispatch();
  const { toNativeWei, fromWei } = useWeb3Utils();
  const RootDom = useRef<HTMLElement | null>(null);
  const list = useAppSelector((state) => state.web3Info.myNftList);
  const stakeList = useAppSelector((state) => state.web3Info.myStakeNftList);
  const { getMyNftList,getMyStakeNftList } = useApi();
  const [userStakedNft, setUserStakedNft] = useState([]);
  const [viewList, setViewList] = useState<NFTCard[]>([]);
  const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageIndex: 1 });
  const [tabCheck,setTabCheck] = useState(true);
  const [updateFlag,setUpdateFlag] = useState(false);
  const [userEarn,setUserEarn] = useState(0);

  let [selectStakeNft,setselectStakeNft] = useState(['']);


  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);


  // 获取当前代币奖励数量
   async function getUserEarnAmount(){
     if (!active || !web3Object || !account) {
       dispatch(setLoginVisible(true));
       return;
     }

     const result = await web3Object.ContractMine.methods
     .earned(account).call().then((num:number)=>{
       let numto_fix = Number(fromWei(num));
       setUserEarn(numto_fix)

     })

   }
  function getInitData(){
    if (account && web3Object) {
      getMyNftList(account);
      getMyStakeNftList(account)
      getUserEarnAmount()
    }
  }

  useEffect(() => {
      getInitData()
  }, [getMyNftList, account, web3Object,list,getMyStakeNftList]);

  useEffect(() => {
      tabViewList()
    }, [list,pageInfo,stakeList,tabCheck]);


  function tabViewList(){
    const start = (pageInfo.pageIndex - 1) * pageInfo.pageSize;
    const end = pageInfo.pageIndex * pageInfo.pageSize;
    if(tabCheck){
      setViewList(list.slice(start, end));
    }else{
      setViewList(stakeList.slice(start, end));
    }
  }

 const selectBurl = useMemoizedFn((item: NFTCard) => {
    let nftid = item.id;
    let oldselectStakeNft = selectStakeNft;
    if (oldselectStakeNft.indexOf(nftid) > -1){
      oldselectStakeNft = oldselectStakeNft.filter(x=>x != nftid);
    }else{
      oldselectStakeNft.push(nftid);
    }
    setselectStakeNft(oldselectStakeNft)
    console.log(oldselectStakeNft,nftid)
  });

  // 质押
  async function stakeSend(){
    if (!active || !web3Object || !account) {
      dispatch(setLoginVisible(true));
      return;
    }
    dispatch(addSpining());
    let nftids = selectStakeNft.filter(x=>x!= '')
    if(nftids.length == 0){
      message.error('please select nft');
      dispatch(delSpining());
      return;
    }
    //检查是否授权
    const isApprove = await web3Object.ContractCards.methods
      .isApprovedForAll(account, config.MineAddress)
      .call();
    if (!isApprove) {
      //如果没授权，则授权
      await web3Object.ContractCards.methods
        .setApprovalForAll(config.MineAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {
          console.log("stake", hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log("stake", receipt);
        })
        .on("error", function (error: any) {
          console.log("stake", error);
          message.error(error.message);
        });
    }
    await web3Object.ContractMine.methods.stake(nftids).send({
        from: account
    }).on("transactionHash", function (hash: any) {
        console.log("stake", hash);
    }).on("receipt", async (receipt: any) => {
        getInitData()
    }).finally(() => {
        dispatch(delSpining());
        setUpdateFlag(!updateFlag)
      });
  }

  // 赎回
  async function withdraw(){

    if (!active || !web3Object || !account) {
       dispatch(setLoginVisible(true));
       return;
     }
     let nftids = selectStakeNft.filter(x=>x!= '')
     if(nftids.length == 0){
       message.error('please select nft');
       dispatch(delSpining());
       return;
     }
     dispatch(addSpining());
     const result = await web3Object.ContractMine.methods
     .withdraw(nftids).send({from: account})
     .on("transactionHash", function (hash: any) {
        console.log("withdraw", hash);
      }).on("receipt", async (receipt: any) => {
      }).on("error", function (error: any) {
        console.log("withdraw", error);
        message.error(error.message);
      }).finally(() => {
        dispatch(delSpining());
        setUpdateFlag(!updateFlag)
      });
  }
 // 领取奖励：
 async function getClaim(){
   if (!active || !web3Object || !account) {
     dispatch(setLoginVisible(true));
     return;
   }
   
   dispatch(addSpining());
   const result = await web3Object.ContractMine.methods
   .claim().send({from: account}).then((res:any)=>{
       console.log(res)
   }).finally(() => {
      dispatch(delSpining());
      setUpdateFlag(!updateFlag)
   });
 }


  function selectTabs(){
   setTabCheck(true)
  }
  function selectTabs2(){
    setTabCheck(false)
  }

  return (
    <Style>
      <div className='title'></div>
      <div className="staking-content">
        <div className="reward">
          <div className="label">Reward</div>
          <div className="value">
            0 MSW <span className="unit">/ DAY</span>
          </div>
        </div>
        <div className="early">
          <div className="label">Earned</div>
          <div className="value">{userEarn} MSW</div>
          <div className="btn"><div className="sc-bcXHqe jqPWEm animation-button" onClick={getClaim} >Get</div></div>
          <div className="record">Record</div>
        </div>
        <div className="tips">
          <div className="tip">
            <div className="icon green"></div>
            <div className="label">Green</div>
            <div className="value">20MSW / DAY</div>
          </div>
          <div className="tip">
            <div className="icon blue"></div>
            <div className="label">Blue</div>
            <div className="value">110MSW / DAY</div>
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="tabs">
          <div className={tabCheck ? "tabs-item on" :"tabs-item off"} onClick={selectTabs} >STAKE</div>
          <div className={tabCheck ? "tabs-item off" :"tabs-item on"} onClick={selectTabs2}>STAKED</div>
        </div>
        <div className="confirm">
          <span>Selected:0/5</span>
          <Button size="small"
                        callbackData={''}
                        onClick={tabCheck ? stakeSend : withdraw} >{tabCheck ? 'STAKE': 'WITHDRAW'}</Button>
        </div>
      </div>
      <div className="sc-gikAfH ddPraQ">
      	<div className="list">
          {viewList.map((item) => {
            return (
              <CardStake
                key={item.id}
                data={item}
                onClick={() => {
                  selectBurl(item);
                }} />
            );
          })}
        </div>
      	<div className="paging"></div>
      </div>
    </Style>
  )

}
