<?php

	$servername = 'localhost';
	$user 		= 'root';
	$pass 		= '';
	$db 		= 'socialMedia_db';
	$conn 		= mysqli_connect($servername, $user, $pass, $db);
	
	if(!$conn){
		die("").'<br>';
	}
?>