# Token-代币合约

## 读取函数

##### 获取代币名称

```
function name() public view virtual override returns (string memory)
function symbol() public view virtual override returns (string memory)
```

##### 获取代币精度

```
function decimals() public view virtual override returns (uint8)
```

##### 获取用户的代币余额

```
# address account  钱包地址
function balanceOf(address account) public view virtual override returns (uint256)
```

##### 查看授权金额

```
# address owner 授权人
# address spender 操作者
function allowance(address owner, address spender) public view virtual override returns (uint256)
```

## 操作函数

##### 授权

```
# address spender 操作者
# uint256 amount 操作数量
function approve(address spender, uint256 amount) public virtual override returns (bool)
```

# Props-道具合约

## 读取函数

##### 道具定义
```
uint256 public constant BOX = 1; 盲盒TokenId
uint256 public constant CARD = 2;公会卡TokenId
```

##### 获取道具uri地址

```
# uint256 道具tokenId
function uri(uint256) public view virtual override returns (string memory)
```

##### 获取指定道具余额

```
# address account 钱包地址
# uint256 id  道具Id
function balanceOf(address account, uint256 id) public view virtual override returns (uint256)
```

##### 获取批量道具余额

```
# address[] memory accounts 数组钱包
# uint256[] memory ids 数组道具
function balanceOfBatch(address[] memory accounts, uint256[] memory ids)public view virtual override returns (uint256[] memory)
```

##### 检查是否授权

```
# address account 钱包地址
# address operator 操作地址
function isApprovedForAll(address account, address operator) public view virtual override returns (bool)
```

## 操作函数

##### 授权

```
# address operator 操作者
# bool approved 授权
function setApprovalForAll(address operator, bool approved) public virtual override
```

# Cards-卡片合约(神兽鲲)

## 读取函数

##### 神兽信息

```
# uint256 tokenId 卡片ID

# uint256 looks 外貌(4位一组，共5个部位，从头到尾)
# uint256 quality 品质
# uint256 level 等级
# uint256 score 得分
function characters(uint256 tokenId) external view returns (uint256 looks, uint256 quality, uint256 level,uint256 score)
```

##### 我的背包

```
# address account 钱包地址
# uint256 startIndex 开始索引
# uint256 endIndex 结束索引
function ownedTokens(address account, uint256 startIndex, uint256 endIndex ) public view returns (uint256[] memory)
```

##### 拥有卡片数量

```
#address owner 钱包地址
function balanceOf(address owner) public view virtual override returns (uint256)
```

##### 查询是否授权

```
# address owner 钱包地址
# address operator 操作地址
function isApprovedForAll(address owner, address operator) public view virtual override returns (bool)
```

## 写函数

##### 授权

```
# address operator 操作地址
# bool approved 授权
function setApprovalForAll(address operator, bool approved) public virtual override
```

# Market-交易合约

```
struct Good {
        address seller; # 出售者
        address collection; # 连接NFT地址(卡片合约地址)
        uint256 collectionId; //NFTId
        uint256 amount; # 出售数量
        address token; # 代币地址
        uint256 price; # 出售价格
    }

event GoodsAdded(address indexed seller, address indexed collection, uint256 collectionId, uint256 amount, address token, uint256 price);

event GoodsRemoved(address indexed seller,address indexed collection, uint256 collectionId,uint256 index);

event Purchased(address indexed buyer, address indexed collection,uint256 index, uint256 collectionId, uint256 amount,uint256 price);

```
```
# 查询交易税 = 交易税占比 / 交易税总数
fee() //交易税占比
feeDenominator() //交易税总数
```

```
addGoods(address collection, uint256 collectionId, uint256 amount, address token, uint256 price) //售卖

# uint256 index 出售索引
removeGoods(uint256 index)//撤回

# uint256 index 出售索引
purchase(uint256 index)//购买
```

# Store-商店合约

## 读取函数

##### 商品详情
```
# uint256 prop 道具

# uint256 supply 供应量
# uint256 price 价格
function propStores(uint256 prop) external returns(uint256 supply,uint256 price)
```

## 写函数

##### 购买道具

```
# uint256 prop 道具
# uint256 amount 数量
function purchase(uint256 prop,uint256 amount) external
```

# Box-盲盒合约

## 写函数

##### 开启盲盒

```
function open() external whenNotPaused nonReentrant()

# address account 开启账户
# uint256 tokenId 获得tokenId
event Opened(address indexed account, uint256 tokenId);
```

