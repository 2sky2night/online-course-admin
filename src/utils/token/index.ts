/**
 * localStorage管理token，存储字段为token
 */
export class Token {
  /**
   * 存储token的字段
   */
  static key = "token";
  /**
   * 获取token
   * @returns token令牌或null
   */
  static getToken() {
    return window.localStorage.getItem(Token.key);
  }
  /**
   * 将token保存在本地中
   * @param token token令牌
   * @returns
   */
  static setToken(token: string) {
    return window.localStorage.setItem(Token.key, token);
  }
  /**
   * 移除本地token
   */
  static removeToken() {
    window.localStorage.removeItem(Token.key);
  }
}
