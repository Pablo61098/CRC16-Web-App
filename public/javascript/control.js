function turnBinaryToString(binaryString){
    let message = '';
    let counter = binaryString.length-1;
    
    remainder = binaryString.slice(-16,)

    let byte= '';
    let counter2 = 1
    while(counter>=0){

        if(counter2 == 9){
            message =  String.fromCharCode(parseInt(byte,2)) + message;
            byte = '';
            counter2 = 1;
        }else{
            byte = binaryString[counter] + byte;
            counter2 += 1;
            counter -= 1;
        }
        console.log("*: " + byte);
        
    }

    console.log("*: " + byte);
    message =  String.fromCharCode(parseInt(byte,2)) + message;

    console.log("**: " + message);
    return [message,remainder];
}

// 10100000101000001
// 101000001010000010010000011111111

function init(){

    // buttonCalculate = document.getElementById("calculate");
    // buttonCheck =document.getElementById("check");

    buttons = document.getElementsByClassName("tab-link");

    for(let i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click", function(){

            for(let j=0; j<buttons.length; j++){
                buttons[j].classList.remove("active");
            }

            buttons[i].classList.add("active");

        });
    }

    labelBinaryTransformed = document.getElementById("tx-transformado");
    remainderLabel = document.getElementById("rx");

    textarea = document.getElementById("mensaje-tx");
    textarea.addEventListener('keydown', (e) => {
        // if(e.key == '0' || e.key == '1' || e.key == 'Backspace' || e.key == 'Shift' || e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Home' || e.key == 'End' || e.key == 'PageUp' || e.key == 'PageDown'){
        if(true){
            textarea = document.getElementById("mensaje-tx");
            if(!e.repeat){
                console.log(`Key "${e.key}" pressed  [event: keydown]`);
                // labelBinaryTransformed.innerHTML = turnBinaryToString(textarea.value);
            }else{
                console.log(`Key "${e.key}" repeating  [event: keydown]`);
                // labelBinaryTransformed.innerHTML = turnBinaryToString(textarea.value);
            }
        }else{
            e.preventDefault();
        }
    });
    textarea.addEventListener('keyup', (e) => {
        labelBinaryTransformed.innerHTML = turnBinaryToString(textarea.value)[0];
        remainderLabel.innerHTML = turnBinaryToString(textarea.value)[1];
    });

}

init();