// import { ArrangeHttpMethod} from `_common/util`
import http from '_common/http'

/* * * * * * * *   Register   * * * * * * * */
/**
 * Send verification code
 * @param params
 * @returns {*}
 * @constructor
 */
export function UserVericode(params) {
  return http.httpPost(`/user/vericode`, params)
}

/**
 * Check user exist or not
 * @param params
 * @returns {*}
 * @constructor
 */
export function UserRegisterCheckuser(params) {
  return http.httpPost(`/user/register/checkuser`, params)
}

/**
 * Register new user
 * @param params
 * @returns {*}
 * @constructor
 */
export function UserRegisterAdd(params) {
  return http.httpPost(`/user/register/add`, params)
}

/* * * * * * * *   Login   * * * * * * * */

/**
 * Login
 * @param params
 * @returns {*}
 * @constructor
 */
export function UserLogin(params) {
  return http.httpPost(`/user/login`, params)
}

/**
 * Update user`s profile
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserUpdate(params) {
  return http.httpPost(`/user/update`, params)
}

/**
 * Logout
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserLogout(params) {
  return http.httpPost(`/user/logout`, params)
}

/**
 * Forget password, and reset password
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserResetPassword(params) {
  return http.httpPost(`/user/reset_password`, params)
}

/**
 * Change password
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserUpdatePassword(params) {
  return http.httpPost(`/user/update_password`, params)
}

/**
 * Verify password
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserVerifyPassword(params) {
  return http.httpPost(`/user/verify_password`, params)
}

/**
 * Set Huobi
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserUpdateHuobi(params) {
  return http.httpPost(`/user/update_huobi`, params)
}

/**
 * Get Huobi
 * @param params
 * @returns {*|Promise|Promise<any>}
 * @constructor
 */
export function UserGetHuobi(params) {
  return http.httpGet(`/user/get_huobi`, params)
}

/**
 * Get User Profile
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserProfile(params) {
  return http.httpGet(`/user/profile`, params)
}

/**
 * Get Wallet Balance
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserWallet(params) {
  return http.httpGet(`/user/wallet`, params)
}

/**
 * Apply Partner
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserApplyPartner(params) {
  return http.httpGet(`/user/apply_partner`, params)
}

/**
 * Is Partner?
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function UserIsPartner(params) {
  return http.httpGet(`/user/is_partner`, params)
}

/**
 * Get price
 * @param params
 * @param pair
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function PairPrice(params, pair) {
  return http.httpGet(`/price/get/${pair}`, params)
}

/**
 * Get the remaining amount at phoase X
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketRqp(params) {
  return http.httpGet(`/market/rqp`, params)
}

/**
 * Get FRP
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketFrp(params) {
  return http.httpGet(`/market/frp`, params)
}

/**
 * Get Discount
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketDiscount(params) {
  return http.httpGet(`/market/discount`, params)
}

/**
 * buy package
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketBuy(params) {
  return http.httpPost(`/market/buy`, params)
}

/**
 * Make order
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketMakeOrder(params) {
  return http.httpPost(`/market/make_order`, params)
}

/**
 * Get order list
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketOrders(params) {
  return http.httpGet(`/market/get_orders`, params)
}

/**
 * Bid an Order
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function MarketBidOrder(params) {
  return http.httpPost(`/market/bid_order`, params)
}

/**
 * Get transaction history list
 * @param params
 * @param type
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function TradeHistory(params, type) {
  return http.httpGet(`/trade/history/${type}`, params)
}

/**
 * Get Notice list
 * @param params
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function AdsNotice(params) {
  return http.httpGet(`/ads/notice`, params)
}

/**
 * Set Notice list
 * @param params
 * @param type
 * @returns {*|Promise<any>|Window.Promise}
 * @constructor
 */
export function AdsNoticeSet(params, type) {
  return http.httpGet(`/ads/notice/${type}`, params)
}

/**
 *
 * @param params
 * @returns {*|Promise<any>|Promise|Window.Promise}
 * @constructor
 */
export function AdsImgs(params) {
  return http.httpGet(`ads/imgs`, params)
}
