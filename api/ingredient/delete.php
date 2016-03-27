<?php 
	//Getting Id
	$id = $_GET['id'];
	
	//Importing database
	require_once('dbConnect.php');
	
	//Creating sql query
	$sql = "DELETE FROM tasks WHERE id=$id;";
	
	//Deleting record in database 
	if(mysqli_query($con,$sql)){
		echo 'Task Deleted Successfully';
	}else{
		echo 'Could Not Delete Task Try Again';
	}
	
	//closing connection 
	mysqli_close($con);
?>