<?php 
	if($_SERVER['REQUEST_METHOD']=='POST'){
		//Getting values 
		$id = $_POST['id'];
		$task = $_POST['task'];
		$description = $_POST['description'];
		
		//importing database connection script 
		require_once('dbConnect.php');
		
		//Creating sql query 
		$sql = "UPDATE tasks SET task = '$task', description = '$description' WHERE id = $id;";
		
		//Updating database table 
		if(mysqli_query($con,$sql)){
			echo 'Task Updated Successfully';
		}else{
			echo 'Could Not Update Task Try Again';
		}
		
		//closing connection 
		mysqli_close($con);
	}
?>