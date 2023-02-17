import Mock, { Random } from "mockjs";

const image = Random.image("235x175");
const address = "0x" + Random.string("lower", 9) + Random.string("number", 9);

Mock.mock("http://localhost/test/nftlist", "get", {
  "data|20": [
    {
      id: "@id",
      address: address,
      img: image,
      price: "@float(0,2,3,18)",
      "unit|1": ["TUT", "BNB"],
      time: "@date('yyyy-MM-dd hh:mm:ss')",
      "quality|1": ["1", "0"],
      amount: "@integer(1,10)",
      isSale: "@boolean(1,9,true)",
    },
  ],
});

Mock.mock("http://localhost/test/nftitem", "get", {
  id: "@id",
  address: address,
  img: image,
  price: "@float(0,2,3,18)",
  "unit|1": ["TUT", "BNB"],
  time: "@date('yyyy-MM-dd hh:mm:ss')",
  description: "@sentence(20,50)",
  head: "Diamond",
  abdomen: "Diamond",
  back: "Diamond",
  fin: "Diamond",
  tail: "Diamond",
  "quality|1": ["1", "0"],
  level: "@integer(1,5)",
  "transaction|5": [
    {
      blockchain: "BSC",
      token: "TUT",
      price: "@float(0,2,3,18)",
      from: address,
      to: address,
      date: "@date('yyyy-MM-dd hh:mm:ss')",
    },
  ],
});
