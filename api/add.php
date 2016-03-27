<?php 
	if($_SERVER['REQUEST_METHOD']=='POST'){
		
		//Getting values
		$task = $_POST['task'];
		$description = $_POST['description'];
		
		//Creating an sql query
		$sql = "INSERT INTO tasks (task, description) VALUES ('$task', '$description')";
		
		//Importing our db connection script
		require_once('dbConnect.php');
		
		//Executing query to database
		if(mysqli_query($con,$sql)){
			echo 'Task Added Successfully';
		}else{
			echo 'Could Not Add Task';
		}
		
		//Closing the database 
		mysqli_close($con);
	}
?>