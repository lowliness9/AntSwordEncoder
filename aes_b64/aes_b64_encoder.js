/**
 * php::base64编码器
 * Create at: 2020/06/19 13:23:25
 */

'use strict';

/*
* @param  {String} pwd   连接密码
* @param  {Array}  data  编码器处理前的 payload 数组
* @return {Array}  data  编码器处理后的 payload 数组
*/
module.exports = (pwd, data, ext={}) => {
	function encryption(payload) {
	const crypto = require('crypto');
	let key = '7b7a53e239400a13';
	let iv = '1012132405963708';
	// let padding = AES_conf.padding;
	var cipherChunks = [];
	var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	cipher.setAutoPadding(true);
	cipherChunks.push(cipher.update(payload, 'utf8', 'base64'));
	cipherChunks.push(cipher.final('base64'));
	return cipherChunks.join('');
}

	let payload = encryption(Buffer.from(data['_']).toString());
	data[pwd] = payload;

	delete data['_'];
	// 返回编码器处理后的 payload 数组
	return data;
}