// 引入axios
import axios from 'axios'
// 请求端口地址
axios.defaults.baseURL = 'http://127.0.0.1:5000';

export var login = (account, password) => axios.post('/users/checkLogin', { account, password })


// 验证token
export var checktoken = (token) => axios.get('/users/checktoken', { params: { token } })
// --------------------------------------账号-----------------------------------------------//

// 添加账号
export var addUser = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })

// 获取账号列表
export var getUserList = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })

// 删除账号
export var delUser = (id) => axios.get('/users/del', { params: { id } })

// 批量删除
export var allDel = (ids) => axios.get('/users/batchdel', { params: { ids } })


// 账号编辑
export var editAccount = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })


// 检查旧密码是否正确
export var checkpass = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })

// 修改密码
export var editpass = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })


// 获取个人信息
export var getAccount = (id) => axios.get('/users/accountinfo', { params: { id } })


// ------------------------------商品-----------------------------------------------//


// 获取商品分类列表
export var getCate = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })


// 查询所有分类
export var allCate = () => axios.get('/goods/categories', { params: {} })
// 添加商品分类
export var addCate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })
// 修改分类
export var editCate = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })

// 删除商品分类
export var delCate = (id) => axios.get('/goods/delcate', { params: { id } })

// 获取商品列表
export var getshopList = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })

// 删除商品
export var delshop = (id) => axios.get('/goods/del', { params: { id } })

// 修改商品
export var editshop = (name, category, price, imgUrl, goodsDesc, id) => axios.post('/goods/edit', { name, category, price, imgUrl, goodsDesc, id })

// 添加商品
export var addShop = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })


// ------------------------------订单-----------------------------------------------//

// 获取订单列表
export var getOrder = (params) => axios.get('/order/list', { params })

// 修改订单
export var editOrder = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

// 查询订单
export var searchOrder = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// ------------------------------店铺-----------------------------------------------//

// 获取店铺详情
export var getShopMsg = () => axios.get('/shop/info',)


// 修改店铺内容
export var editShopMsg = (params) => axios.post('/shop/edit', params)

// ------------------------------首页-----------------------------------------------//


// 首页报表
export var getHomeMsg = () => axios.get('/order/totaldata',)

// 订单报表
export var getOrderMsg = (date) => axios.get('/order/ordertotal', { params: { date } })
