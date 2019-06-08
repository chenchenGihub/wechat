/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-04 22:45:24
 * @LastEditTime: 2019-06-07 21:53:19
 */
const fs = require('fs');
const util = require('util');
const { parseString } = require('xml2js');

exports.readFileAync = util.promisify(fs.readFile)
exports.writeFileAync = util.promisify(fs.writeFile)
exports.parseStringAync = util.promisify(parseString)
exports.xml2obj = (obj) => {

    let object = {};
    
    for (let [key, value] of Object.entries(obj)) {

      object[key] = value[0]
    }
    return object
}

// exports.uploadMedia = 
