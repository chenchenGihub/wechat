/*
 * @Description: 验证中间件
 * @Author: chenchen
 * @Date: 2019-06-05 00:53:22
 * @LastEditTime: 2019-06-07 18:18:58
 */
const getRawBody = require('raw-body');
const sha1 = require('sha1');
const { parseStringAync, xml2obj } = require('../util/util')
const Config = require('../config');
const Wechat = require('../wechat/wechat');


module.exports = () => {

    const wechat = new Wechat();

    return async (ctx, next) => {

        try {

            let accessToken = await wechat.getAccessToken();



            let { signature, echostr, timestamp, nonce } = ctx.query;
            let token = Config.token
            let str = [token, nonce, timestamp].sort().join('');
            let sha = sha1(str);

            if (sha === signature) {
                ctx.body = `${echostr}`;
            } else {
                ctx.body = "token is wrong"
            }


            if (ctx.method === "POST") {

                var body = await getRawBody(ctx.req, {
                    encoding: true
                })




                let { xml } = await parseStringAync(body, { trim: true });



                let data = xml2obj(xml)

                console.log('xml', xml);



                if (data.MsgType === 'event') {
                    if (data.Event === 'subscribe') {

                        if (data.EventKey) {

                            ctx.body = '你扫了二维码'
                        }

                        ctx.status = 200;
                        ctx.type = 'application/xml';
                        ctx.body = `
                     <xml>
                        <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                        <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                        <CreateTime>${Date.now()}</CreateTime>
                        <MsgType><![CDATA[text]]></MsgType>
                        <Content><![CDATA[${'谢谢关注'}]]></Content>
                        <MsgId>${Date.now()}</MsgId>
                      </xml>`
                    }

                    if (data.Event === 'unsubscribe') {
                        console.log('取消关注了');

                    }

                    if (data.Event === 'CLICK') {
                        console.log('click');

                    }

                    if (data.Event === 'VIEW') {
                        console.log('VIEW');

                    }


                }

                if (data.MsgType === 'text') {
                    switch (data.Content) {
                        case '1':
                            console.log(data.Content);

                            ctx.status = 200;
                            ctx.type = "appliction/xml"
                            ctx.body = `
                         <xml>
                            <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                            <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                            <CreateTime>${Date.now()}</CreateTime>
                            <MsgType><![CDATA[text]]></MsgType>
                            <Content><![CDATA[${'http://h5blog.chenes.top/'}]]></Content>
                            <MsgId>${Date.now()}</MsgId>
                          </xml>`

                            break;
                        case '2':
                            //     console.log(data.Content);
                            //     let reply = {
                            //         title:"微信公众号",
                            //         description:"微信公众号出太阳",
                            //         url:"http://h5blog.chenes.top/article?id=5cf77c05e5e00a63dc568efe&user_id=5ce956b104e43b395c1632c3",
                            //         pic:"https://blog-cc-oss.oss-cn-hangzhou.aliyuncs.com/upload/A98D9C3420B79846CC9CCEB79587A21B.png",
                            //     }
                            //     ctx.status = 200;
                            //     ctx.type = "appliction/xml"
                            //     ctx.body = `
                            //  <xml>
                            //     <ToUserName><![CDATA[${
                            //         data.FromUserName
                            //         }]]></ToUserName>
                            //     <FromUserName><![CDATA[${
                            //         data.ToUserName
                            //         }]]></FromUserName>
                            //     <CreateTime>${
                            //         Date.now()
                            //         }</CreateTime>
                            //     <MsgType><![CDATA[news]]></MsgType>
                            //     <ArticleCount>1</ArticleCount>
                            //     <Articles>
                            //      <item>
                            //             <Title><![CDATA[${reply.title}]]></Title>
                            //             <Description><![CDATA[${reply.description}]]></Description>
                            //             <PicUrl><![CDATA[${
                            //                 reply.pic
                            //         }]]></PicUrl>
                            //             <Url><![CDATA[${
                            //                 reply.url
                            //             }]]></Url>
                            //           </item>
                            //     </Articles>
                            //   </xml>`

                            break;



                        default:

                            console.log(data.Content);
                            let reply = {
                                title: "个人博客",
                                description: "主要分享技术以及开发过程中遇见的坑",
                                url: "http://h5blog.chenes.top",
                                pic: "https://blog-cc-oss.oss-cn-hangzhou.aliyuncs.com/upload/A98D9C3420B79846CC9CCEB79587A21B.png",
                            }
                            ctx.status = 200;
                            ctx.type = "appliction/xml"
                            ctx.body = `
                             <xml>
                                <ToUserName><![CDATA[${
                                data.FromUserName
                                }]]></ToUserName>
                                <FromUserName><![CDATA[${
                                data.ToUserName
                                }]]></FromUserName>
                                <CreateTime>${
                                Date.now()
                                }</CreateTime>
                                <MsgType><![CDATA[news]]></MsgType>
                                <ArticleCount>1</ArticleCount>
                                <Articles>
                                 <item>
                                        <Title><![CDATA[${reply.title}]]></Title>
                                        <Description><![CDATA[${reply.description}]]></Description>
                                        <PicUrl><![CDATA[${
                                reply.pic
                                }]]></PicUrl>
                                        <Url><![CDATA[${
                                reply.url
                                }]]></Url>
                                      </item>
                                </Articles>
                              </xml>`

                            break;
                    }
                }

                if (data.MsgType === 'image') {
                    ctx.body = `
                    <xml>
                    <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                    <CreateTime>${
                        Date.now()
                    }</CreateTime>
                    <MsgType><![CDATA[image]]></MsgType>
                    <Image>
                    <MediaId><![CDATA[${data.MediaId}]]></MediaId>
                    </Image>
                    </xml>
                    `

                }
                if (data.MsgType === 'voice') {

                }
                if (data.MsgType === 'video') {

                }
                if (data.MsgType === 'link') {

                }
                if (data.MsgType === 'location') {
                    console.log('location');

                }






            }

        } catch (error) {
            console.log(error);

        }

        // await next();
    }


}