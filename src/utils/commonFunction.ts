import axios from "axios";

/**格式化地址为 默认前6后4的格式 */
export function formatAddress(address: string, start?: number, end?: number) {
  start = start ? start : 6;
  end = end ? end : 4;
  if (address.length < start + end) {
    return address;
  }
  return (
    address.substring(0, start) +
    "..." +
    address.substring(address.length - end, address.length)
  );
}

/**bsc链 读取事件 */
export const readGetPastEventsBSC = (
  avaxUrl: string, //bsc链读取数据api地址
  address: string, //事件合约地址
  topic0: any, //web3.utils.sha3 对事件函数进行编译之后的数据
  apikey: string //JJJ37IHZKYU6AX25IQ27CN6UZY1HZYFW5H
) => {
  return new Promise((reslove, reject) => {
    axios
      .get(avaxUrl, {
        params: {
          module: "logs",
          action: "getLogs",
          fromBlock: 0,
          address,
          topic0,
          apikey,
        },
      })
      .then((data: any) => {
        let result = data.data.result;
        if (result !== undefined && result instanceof Array) {
          reslove(result);
        } else {
          reslove([]);
        }
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

/**合约读取事件 */
export const readGetPastEvents = (
  contract: any, //合约地址
  events: string, //事件名
  blockNumber: number, //区块高度
  filter?: object
) => {
  return new Promise((reslove, reject) => {
    contract.getPastEvents(
      events,
      { fromBlock: blockNumber, toBlock: "latest", filter: { ...filter } },
      function (error: any, event: any) {
        if (event instanceof Array) {
          reslove({ data: event, error: null });
        } else {
          // console.log('events', events)
          // console.log('error', error)
          reslove({ data: [], error });
        }
      }
    );
  });
};
