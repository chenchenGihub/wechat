/*
 * @Description: 微信配置项
 * @Author: chenchen
 * @Date: 2019-06-03 21:48:12
 * @LastEditTime: 2019-06-04 23:50:21
 */
module.exports = class Config {

    static appId = 'wx1c2156e87f9f1056';
    static AppSecret = '748ed9f66147fe632c187577e08eda32';
    static token = '5cb085f3abbf3dfc8d65ee475ce9561';
    static api = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.appId}&secret=${Config.AppSecret}`

}


