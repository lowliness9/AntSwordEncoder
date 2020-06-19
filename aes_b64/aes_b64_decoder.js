/**
 * php::base64解码器
 * Create at: 2020/06/19 13:46:56
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
	$iv = '1012132405963708';
	$key = '7b7a53e239400a13';
	$padding = 16 - (strlen($out) % 16);
	$out.= str_repeat(chr($padding), $padding);
	$encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $out, MCRYPT_MODE_CBC, $iv);
	return base64_encode($encrypted);
}`.replace(/\n\s+/g, '');
  },
  /**
   * 解码 Buffer
   * @param {string} data 要被解码的 Buffer
   * @returns {string} 解码后的 Buffer
   */
  decode_buff: (data, ext={}) => {
	function decryption(payload){
		const crypto = require('crypto');
		let key = '7b7a53e239400a13';
		let iv = '1012132405963708';
		// let padding = AES_conf.padding;
		var cipherChunks = [];
		var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
		decipher.setAutoPadding(true);
		cipherChunks.push(decipher.update(payload, 'base64', 'utf8'));
		cipherChunks.push(decipher.final('utf8'));
		return cipherChunks.join('');
}

	let v = Buffer.from(data).toString();
	let y = decryption(v);
	return Buffer.from(y);
  }
}



