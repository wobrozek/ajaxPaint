
<?php

        if($_SERVER["REQUEST_METHOD"] == 'POST'){
                if(isset($_REQUEST['q'])){
                $input = file_get_contents('php://input');

                $name ="userDirecory/".$_REQUEST['q'].".json";
                $fp = fopen($name,"w");
                $isSave=false;

                // semafor odczytu
                while(!$isSave){
                        if(flock($fp,LOCK_EX)){                                
                                fwrite($fp,$input);
                                $isSave=true;
                                flock($fp,LOCK_UN);
                        }else {
                                sleep(1);
                        }
                }

                fclose($fp);
                
                }
                else{
                        throw new Error("brak parametru q");
                }
        }



        if($_SERVER['REQUEST_METHOD'] == 'GET'){
                if(isset($_REQUEST['q'])){
                        # return json for file
                        $title=$_REQUEST['q'];
                        $name ="userDirecory/".$title.".json";

                        $data = file_get_contents($name);

                        if(filesize($name) != 0){
                                $data =[$data];
                                echo json_encode($data);
                                exit();
                        }else{
                                echo '';
                                exit();
                        }       
                }
                #display all title
                $allFlies = scandir("userDirecory");
                $allFlies = array_diff($allFlies,array('..','.'));
                $score=[];
                foreach ($allFlies as $name) {
                        array_push($score,substr($name,0,-5));
                }

                echo json_encode($score);
        }

?>