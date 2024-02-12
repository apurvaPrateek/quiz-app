var score = 0;
var quesNo=0;
var quesBank = [];

async function createDB(){
    var response = await fetch("https://opentdb.com/api.php?amount=10");
    
    var data = await response.json();
    // console.log(data);
    

    var results;
    if(data.results==undefined) results= data.result;
    else results = data.results;
    for(var i=0;i<results.length;i++){
        var Q=results[i];
        var corr_option = Math.floor(Math.random()*4);
        var option_arr=[];
        var k=0;
        for(var j=0;j<4;j++){
            if(j==corr_option) option_arr.push(Q.correct_answer);
            else{
                option_arr.push(Q.incorrect_answers[k++]);
            }
        }
        var newQues = {
            "question": Q.question,
            "answer": Q.correct_answer,
            "options": option_arr
        }
        quesBank.push(newQues);
    }
    startGame();

}
createDB();






    // {
    //     "question": "Which is the smallest (in area) of the following Union Territories?",
    //     "answer": "Lakshadweep",
    //     "options":["Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep"]
    // },
    // {
    //     "question": "The Sundarbans or the ‘Mangrove’ forests are found in:",
    //     "answer": "Deltaic West Bengal",
    //     "options":[" Kutch Peninsula",
    //     "Western Ghats",
    //     "Konkan Coast",
    //     "Deltaic West Bengal"]
    // },
    // {
    //     "question": "On which river has the Hirakud Dam been built?",
    //     "answer": "Mahanadi",
    //     "options":["Mahanadi",
    //     "Godavari",
    //     "Cauvery",
    //     "Periyar"]
    // },
    // {
    //     "question": "Which among the following integrated iron installation does not come under the management of SAIL (Steel Authority of India Limited)?",
    //     "answer": "Jamshedpur",
    //     "options":["Bhilai",
    //     "Durgapur",
    //     "Rourkela",
    //     "Jamshedpur"]
    // },

function startGame(){
updateContent(quesNo);

var options = document.querySelectorAll("li");

for(var i=0; i<options.length;i++){
 
    var li = options[i];
    
   
    li.addEventListener("click", (e)=>{
        
        if(quesBank[quesNo].answer === (e.currentTarget).textContent){
            
            score++;
            console.log("correct");
            console.log(score);
        }
        else{
            
            console.log("wrong");
            console.log(score);
            (e.currentTarget).classList.add("wrong");
        }

        for (var j=0;j<options.length;j++){
            if(options[j].textContent === quesBank[quesNo].answer){
                options[j].classList.add("correct");
            }
        }

        

        quesNo++;
            makeUnclickable();
            document.querySelector(".action").style.display = "block";
    })
}

var btn = document.querySelector("button");


btn.addEventListener("click",()=>{
    updateContent(quesNo);
});

function makeUnclickable(){
    var options = document.querySelectorAll(".options li");
    for(var i=0;i<options.length;i++){
        var li = options[i];
        li.classList.toggle("unclickable");
    }
}

function updateContent(quesNo){
    var content = quesBank;
    // console.log(`content: ${content}`);
    // console.log(`quesBank: ${quesBank}`);
    if(quesNo < content.length){
        document.querySelector(".question").textContent = `${quesNo+1}. ${content[quesNo].question}`;
        var arr = document.querySelectorAll("li");
        for(var i=0;i<arr.length;i++){
            arr[i].textContent = content[quesNo].options[i];
            arr[i].classList.remove("unclickable");
            arr[i].classList.remove("wrong");
            arr[i].classList.remove("correct");
            
        }
        document.querySelector(".action").style.display = "none";


    }

    else{
        var result = document.querySelector(".score");
        result.style.display="block";
        result.textContent = `Your score is ${score} out of ${content.length}!.`;
        var content = document.querySelector(".content");
        content.style.display = "none";
        var btn = document.querySelector("button");
        btn.textContent = "Play Again";

        btn.addEventListener("click",()=>{
            location.reload();
        })
        
    }
}}

