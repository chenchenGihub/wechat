/*
 * @Description: koa入口文件
 * @Author: chenchen
 * @Date: 2019-06-03 21:12:59
 * @LastEditTime: 2019-06-05 16:08:26
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const checkWcToken = require('./middlewares/checkWcToken');
app.use(bodyParser());
app.use(checkWcToken())
app.listen(4000);

console.log(`server is running at ${'localhost'}:4000`);
