import os
import sys
import time
# 将项目的根目录添加到path
sys.path.append(os.path.realpath(os.path.dirname(os.path.dirname(__file__))))
from common import common
from module import Market
from module import Token
from module import Props
from module import Cards
from module import Box
from module import Store

meAddress = common.account('me', 'address').value
ownerAddress = common.account('owner', 'address').value
fiveAddress = common.account('five', 'address').value

meKey = common.account('me', 'key').value
ownerKey = common.account('owner', 'key').value
fiveKey = common.account('five', 'key').value

StoreAddress = common.readOne('contract', 'Store')
BoxAddress = common.readOne('contract', 'Box')
CardsAddress = common.readOne('contract', 'Cards')
MarketAddress = common.readOne('contract', 'Market')

TokenAddress = common.readOne('currency', 'Token')
Zeroddress = common.readOne('currency', 'zero')

# 查询用户NFTtokenid/市场NFTtokenid
def NFTs(fromAddress):
  NFTnum = Cards.balanceOf(fromAddress)
  if NFTnum == 0:
    print(fromAddress + ": 无NFT")
    return
  NFTs = Cards.ownedTokens(fromAddress, 0, NFTnum)
  return NFTs

# 查询拥有NFT和道具
def ownedNFT(fromAddress):
  NFTs(fromAddress)
  Props.balanceOf(fromAddress, 1) # 查询用户拥有Box数量
  Props.balanceOf(fromAddress, 2) # 查询用户拥有Guild Card数量

# 购买道具
def purchaseProp(fromAddress, fromKey):
  # boxSupply: box供应量, boxPrice: box单价, cardSupply: Guild Card供应量, cardPrice: Guild Card单价, 
  boxSupply = Store.propStores()[0][0]
  boxPrice = Store.propStores()[0][1]
  cardSupply = Store.propStores()[1][0]
  cardPrice = Store.propStores()[1][1]
  
  prop = int(input("请输入购买道具类型(1: Box, 2: Guild Card): "))
  amount = int(input("请输入购买道具数量: "))

  balanceBefore = Token.balanceOf(meAddress)  # 查询用户购买前的代币余额
  Props.balanceOf(fromAddress, prop)  # 查询用户购买前的道具数量

  if prop == 1:
    cardNum = Props.balanceOf(fromAddress, 2) # 查询用户是否拥有Guild Card, 拥有1个及以上购买Box只需要支付80%
    if boxSupply < amount:
      print("Box供应量不足")
      return

  if cardSupply < amount:
      print("Guild Card供应量不足")
      return

  # 用户拥有Guild Card购买Box, 只需要支付80%
  if prop == 1 and cardNum > 0:
    if balanceBefore < boxPrice * amount * 0.8: # 判断用户Token余额是否足够购买80%价格Box
      print("{0} Token余额不足".format(fromAddress))
      return

    Token.approve(fromAddress, fromKey, StoreAddress, 100)
    Store.purchase(fromAddress, fromKey, prop, amount)
    balanceAfter = Token.balanceOf(meAddress)  # 查询用户购买后的代币余额
    print("{0} 购买了 {1} 的Box, 共消耗 {2} Token".format(fromAddress, amount, balanceBefore-balanceAfter))
    Props.balanceOf(fromAddress, prop)  # 查询用户购买后的道具数量
    return

  # prop == 1: 用户未拥有Guild Card购买Box/prop == 2: 用户购买Guild Card
  elif prop == 1 and cardNum <= 0:
    if balanceBefore < boxPrice * amount: # 判断用户Token余额是否足够原价购买Box
        print("{0} Token余额不足".format(fromAddress))
        return

  if balanceBefore < cardPrice * amount: # 判断用户Token余额是否足够购买Guild Card
        print("{0} Token余额不足".format(fromAddress))
        return

  Token.approve(fromAddress, fromKey, StoreAddress, 200)
  Store.purchase(fromAddress, fromKey, prop, amount)
  balanceAfter = Token.balanceOf(meAddress)
  print("{0} 购买了 {1} 的Box, 共消耗 {2} Token".format(fromAddress, amount, balanceBefore-balanceAfter))
  Props.balanceOf(fromAddress, prop)

# 开盲盒
def openBox(fromAddress, fromKey):
  boxNum = Props.balanceOf(fromAddress, 1)  # 查询用户拥有Box数量
  amount = int(input("请输入开Box的数量: "))

  if amount > boxNum: # 判断用户开Box数量是否足够
    print("{0}用户Box数量不足{1}".format(fromAddress, amount))
    return

  if Props.isApprovedForAll(fromAddress, BoxAddress) == False:  # 判断是否授权
    Props.setApprovalForAll(fromAddress, fromKey, BoxAddress, True)

  for i in range(amount): # 循环开Box
    Box.open(fromAddress, fromKey)

  NFTs(fromAddress) # 查询用户NFTtokenid

# 上架NFT
def addNFT(fromAddress, fromKey):
  NFTs(fromAddress) # 查询用户NFTtokenid

  collectionId = int(input("请输入上架的NFT tokenid: "))
  tokenid = int(input("请输入上架的代币(0: 原生币, 1: 代币): "))
  price = int(input("请输入上架的价格: "))

  if tokenid == 0:  # 0代表原生币
    token = Zeroddress
  elif tokenid == 1:  # 1代表代币
    token = TokenAddress

  if Cards.isApprovedForAll(fromAddress, MarketAddress) == False: # 判断是否授权
    Cards.setApprovalForAll(fromAddress, fromKey, MarketAddress, True)
  
  Market.addGoods(fromAddress, fromKey, CardsAddress, collectionId, 1, token, price)  # collectionId、token、price通过键入方式读取, amount固定为1(erc721)

  NFTs(MarketAddress)

# 下架NFT
def removeNFT(fromAddress, fromKey, index):
  NFTs(MarketAddress) # 查询市场NFTtokenid
  
  if Cards.isApprovedForAll(fromAddress, MarketAddress) == False: # 判断是否授权
    Cards.setApprovalForAll(fromAddress, fromKey, MarketAddress, True)

  Market.removeGoods(fromAddress, fromKey, index)

  NFTs(MarketAddress)

# 购买NFT
def purchaseNFT(fromAddress, fromKey, index):
  # Market.getGoodsAdded()
  NFTs(MarketAddress)

  if Cards.isApprovedForAll(fromAddress, MarketAddress) == False:
    Cards.setApprovalForAll(fromAddress, fromKey, MarketAddress, True)

  Token.approve(fromAddress, fromKey, MarketAddress, 1000)
  Market.purchase(fromAddress, fromKey, index)

  NFTs(fromAddress)

def test():
  fruits = ['mango', 'apple', 'orange', 'cherry', 'grapes'] 
  print(list(filter(lambda fruit: 'g' in fruit, fruits)))

if __name__ == '__main__':  
  pass

  # 购买道具(1: Box, 2: Guild Card)
  # purchaseProp(meAddress, meKey)

  # 开盲盒
  # openBox(meAddress, meKey)

  # 上架NFT
  # addNFT(meAddress, meKey)

  # 下架NFT
  # removeNFT(meAddress, meKey, 0)

  # 购买NFT
  # purchaseNFT(fiveAddress, fiveKey, 1)

  # 查询用户拥有NFT和道具
  # ownedNFT(meAddress)

  # 查询市场拥有NFT
  # NFTs(MarketAddress)
