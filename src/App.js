import 'bootstrap/dist/css/bootstrap.min.css';
import React  from "react";



function App(){
  const tasks = ["Faires des courses","Etudier React","Appeler un ami"];
  const tasks2 = [];
  let message = ""; //create a variable that might change 
  var globalMessage ="this is the variable";

  if(true){
    globalMessage = "this is overriding the var variable value";
  }


  if(tasks2.length <= 0 && tasks <=0){
    message = "aucune tache a accomplir"; 
  }else{
    message = `vous avez ${tasks.length} taches a faire`;//template string
  }


  return (
    <>
    {/* first div*/}
    <div>
      <h1>To-Do App</h1>
      <h2>{message}</h2> {/*template string assigned */}
      <h2>{globalMessage}</h2>
      <ul>
        {
          tasks.map((task,index) => (
            <li key={index}>{task}</li>
          ))
        }
      </ul>
    </div>
    {/* second div*/}
    <div>
      <div class="p-3 mb-2 bg-info text-white">
      use "const" : for values that will not change like -objects- -fixed strings- -arrays-
      </div>
    </div>
    
    </>

  );
}

export default App;