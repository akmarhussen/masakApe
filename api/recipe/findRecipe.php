<?php
include 'dbConnect.php';

// $q = urldecode(mysql_real_escape_string($_GET['q']));
$q= array("0"=>"Lime leaves", "1"=>"Coconut milk", "2"=>"Red Chilli");
$parameter = explode ('$',$q);
$var = 0;
echo $parameter;
foreach($parameter as $ing){
    $sql = "SELECT id FROM ingredients WHERE ingredient='".$ing."'";
    $result = mysql_query($con,$sql) or exit('Wrong 1');
    $row = mysql_fetch_array($result);
    $arr_id[$var] = $row['id'];
    $var++;
}

$sql = "SELECT r.id FROM recipes r, recipe_ingredient ri WHERE r.id = ri.recipe_id ";

foreach($arr_id as $id){
    $sql .= "AND ri.ingredient_id =".$id . " ";
}

$result = mysql_query($con,$sql) or exit('Wrong 2');
$rec;
$r = array();
while($row = mysql_fetch_array($result)){
                 //echo "test";
                 // $_GET['id'] = $row['recipes_id'];
                 // $rec= include('get_recipe_byID.php');
    array_push($r,array(
        "recipe_id"=>$row['id']
    ));

}

//Displaying the array in json format 
echo json_encode($r);

mysqli_close($con);
//print_r(mysql_fetch_array($result));
// if (count($arr_id) == 0)
//     {
//         echo '{"Data":null,"Message":null,"Code":404}';
//         die();
//     }

?>