/**
 * php::base64解码器
 * Create at: 2020/06/18 15:00:16
 */

'use strict';

module.exports = {
  /**
   * @returns {string} asenc 将返回数据base64编码
   * 自定义输出函数名称必须为 asenc
   * 该函数使用的语法需要和shell保持一致
   */
  asoutput: () => {
    return `function asenc($out){
      return @strrev(base64_encode($out));
    }
    `.replace(/\n\s+/g, '');
  },
  /**
   * 解码 Buffer
   * @param {string} data 要被解码的 Buffer
   * @returns {string} 解码后的 Buffer
   */
  decode_buff: (data, ext={}) => {
    let v = Buffer.from(data).toString();
    let y = v.split('').reverse().join('');
    return Buffer.from(y, 'base64');
  }
}



