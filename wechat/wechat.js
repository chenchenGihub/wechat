/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-03 23:30:07
 * @LastEditTime: 2019-06-05 20:27:20
 */
const Config = require('../config');
const axios = require('axios')
const path = require('path')
const { readFileAync, writeFileAync } = require('../util/util')

module.exports = class Wechat extends Config {
    constructor() {
        super();
        this.appId = Config.appId;
        this.AppSecret = Config.AppSecret;

    }

    async  getAccessToken() {

        try {
            let res = await readFileAync(path.join(__dirname, '../wechat.txt'));
            this.accessToken = JSON.parse(res)
           
           

        } catch (error) {

            await this.updateAccessToken();
        }


        console.log(this.isValidAccessToken(this.accessToken));
        
        if (this.isValidAccessToken(this.accessToken)) {
            return this.accessToken
        } else {
            await this.updateAccessToken();
        }

        return this.accessToken
    }

    set setAccessToken(token) {
        this.accessToken = token;
    }

    async updateAccessToken() {

        let url = Config.api;

        try {
            let res = await axios.get(url);

            this.accessToken = res.data;
            this.accessToken.now = Date.now();
            await writeFileAync(path.join(__dirname, '../wechat.txt'), JSON.stringify(this.accessToken))

        } catch (error) {

        }
    }

    isValidAccessToken(data) {

       
        

        if (!data || !data.access_token || !data.expires_in || Date.now() > data.now) return false;

        return true
    }
}