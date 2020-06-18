/**
 * php::base64编码器
 * Create at: 2020/06/18 14:53:00
 */

'use strict';

/*
* @param  {String} pwd   连接密码
* @param  {Array}  data  编码器处理前的 payload 数组
* @return {Array}  data  编码器处理后的 payload 数组
*/
module.exports = (pwd, data, ext={}) => {

  data[pwd] = Buffer.from(data['_']).toString('base64');

  data[pwd] = data[pwd].split('').reverse().join('');

  delete data['_'];
  // 返回编码器处理后的 payload 数组
  return data;
}