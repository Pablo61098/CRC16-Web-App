

function turnBinaryToString(binaryString){
    let message = '';
    let counter = binaryString.length-17;
    
    remainder = binaryString.slice(-16,);
    

    let byte= '';
    let counter2 = 1
    let flag = 1;
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
        flag = 0;
    }

    if(flag==0){
        console.log("*: " + byte);
        message =  String.fromCharCode(parseInt(byte,2)) + message;
    }

    console.log("**: " + message);
    return [message,remainder];
}

// 10100000101000001
// 101000001010000010010000011111111
// 101000001010000011010100101010101
// KK
// 01001011010010111101010101010101
// 0100100001101001001000010011000111111101


function init(){

    var ctrlKey = false;
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
        if(e.key == '0' || e.key == '1' || e.key == 'Backspace' || e.key == 'Shift' || e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Home' || e.key == 'End' || e.key == 'PageUp' || e.key == 'PageDown' || (ctrlKey && e.key == 'v') || (ctrlKey && e.key == 'c')){
        // if(true){
            textarea = document.getElementById("mensaje-tx");
            if(!e.repeat){
                console.log(`Key "${e.key}" pressed  [event: keydown]`);
                // labelBinaryTransformed.innerHTML = turnBinaryToString(textarea.value);
            }else{
                console.log(`Key "${e.key}" repeating  [event: keydown]`);
                // labelBinaryTransformed.innerHTML = turnBinaryToString(textarea.value);
            }
        }else if(e.key == 'Control'){
            // if(e.keyCode == 'v'){
            //     console.log("Que mass ve");
            // }
            ctrlKey = true;
            console.log("pprrrr");
        }else{
            e.preventDefault();
        }
        
    });
    // textarea.addEventListener('keydown', (event) => {
    //     if(){
    //         console.log("Que mass ve");
    //     }
    // });
    textarea.addEventListener('keyup', (e) => {
        let mensaje = String(textarea.value);
        let mensaje2 = String(textarea.value);
        for(let i=0; i<mensaje.length; i++){
            if(mensaje[i] != '1' && mensaje[i] != '0' && mensaje[i] != ' ' && mensaje[i] != '\n'){

                textarea.value = '';
                console.log(mensaje[i]);
                // console.log(mensaje);
            }
        }

        textarea.value = textarea.value.split('\n').join('');
        textarea.value = textarea.value.split(' ').join('');

        calculated = turnBinaryToString(textarea.value);
        labelBinaryTransformed.value = calculated[0];
        remainderLabel.value = calculated[1];
        if(e.key == 'Control'){
            ctrlKey = false;
            console.log("heyyyyyy");
        }
    });

}

init();