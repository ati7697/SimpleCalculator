function getHistory(){
    return document.getElementById("history_value").innerText;
}
function printHistory(number){
    document.getElementById("history_value").innerText = number;
}
function getOutput(){
    return document.getElementById("output_value").innerText;
}
function printOutput(number){
    if(number === ""){
        document.getElementById("output_value").innerText = number;
    }
    else{
        document.getElementById("output_value").innerText=formatToNumber(number);
    }
}
function showHistory(number){
    return document.getElementById("history").innerText = number;
}

function formatToNumber(number){
    if(number === "-"){
        return "";
    }
    let n = Number(number);
    return n.toLocaleString("en");
}
function replaceFormat(number){
    return Number(number.replace(/,/g,''));
}



let operator = document.getElementsByClassName("operator");
for(let i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function (){
        if(this.id === "clear"){
            printHistory("");
            printOutput("");
            showHistory("");
        }
        else if(this.id === "backspace"){
            let output = replaceFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else if(this.id === "minus"){
            printOutput(getOutput() * (-1))
        }

        else{
            let output = getOutput();
            let history = getHistory();
            if(output === "" && history !== ""){
                if(isNaN(history[history.length - 1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output !== "" || history !== ""){
                output= output === ""?output:replaceFormat(output);
                history = history + output;


                if(this.id === "="){
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");

                    const key = history;
                    const value = result;
                    if (key && value){
                        localStorage.setItem(key, value);
                        show_history.innerHTML += key + " = " + value + "<br/>";
                    }
                }
                else{
                    history = history +this.id;
                    printHistory(history);
                    printOutput("");

                }
            }
        }

    });
}


let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click',function(){
        let output = replaceFormat(getOutput());
        if(!isNaN(output)){
            output += this.id;
            printOutput(output);
        }
    });
}

let show_history = document.getElementById("history");
let backToCal = document.getElementById("back");
let convertingToArray= Object.entries(localStorage);
let show10th = convertingToArray.slice(convertingToArray.length - 10)

 for (let  i = 0; i < show10th.length ; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    document.getElementById("btn_show_history").addEventListener('click', function () {
        document.getElementById("keyboard").style.display = "none";
         show_history.innerHTML += key + " = " + value + "<br/>";
        if (backToCal.style.display === 'none') {
            return backToCal.style.display = 'block';
        }
        backToCal.addEventListener('click', function () {
            location.reload()
        })
    })
 }


