class CRC16 {
    constructor(message){
        this.message = message ;
        this.binaryMessage='';
        this.binaryDivisor = '10001000000100001';
        this.binaryMessageArray = [];
        this.binaryDivisorArray = [];
    }

    fullMessage(){
        return this.message;
    }

    setBinaryMessage(){
        let binaryMessage='';
        for(let i=0; i< this.message.length ; i++){
            let binaryLetter = this.message[i].charCodeAt().toString(2); 
            console.log(binaryLetter.length);
            if(binaryLetter.length < 8){
                console.log("heyyy");
                let dif = 8 - binaryLetter.length;
                for(let i=0; i< dif; i++){
                    binaryLetter = '0'+binaryLetter;
                }
            }
            binaryMessage += binaryLetter + "";   
        }
        for(let i=0; i<16; i++){
            binaryMessage = binaryMessage + "0";
        }
        this.binaryMessage = binaryMessage;
    }

    getBinaryArray(cadena){
        let counterOnes=0;
        let counterZeros=0;
        let array = [];
        for(let i=cadena.length-1; i>=0; i--){
            if(cadena[i] == '1'){   
                counterOnes += 1;
                array.push(1);
            }else{
                counterZeros += 1;
                array.push(0);
            }
        }
        console.log("Number Ones: " + counterOnes);
        console.log("Number Ones: " + counterZeros);
        console.log("Array: " + array);
        return array;
    }

    getRemainder(calculate){

        if(calculate){
            this.setBinaryMessage();
            this.binaryMessageArray = this.getBinaryArray(this.binaryMessage);
        }else{
            this.binaryMessageArray = this.getBinaryArray(this.binaryMessage);
        }
        
        this.binaryDivisorArray = this.getBinaryArray(this.binaryDivisor);
        
        let residuo = Object.assign([], this.binaryMessageArray);
        console.log("Residuo: " + residuo);
        let firstOneDivisor = this.findFirstOne(this.binaryDivisorArray);
        let firstOneMessage = this.findFirstOne(residuo);

        console.log(firstOneDivisor);
        console.log(firstOneMessage);

        
        let dif = firstOneMessage - firstOneDivisor; 
        let indices = this.indexesOfOnesInDivisor(this.binaryDivisorArray, dif);
        let onesDivisor = this.indexesOfOnesInDivisor(this.binaryDivisorArray, 0);
        // console.log("Indices " + indices);
        // console.log("// "  + dif);
        let diferencias = [];
        let residuos = [];
        let lastIndexes = [];
        let lastIndexesResiduo = [];
        let listaIndices = []; 

        // console.log("/ " + Math.min(this.findLastOne(residuo)));
        // console.log("/ " + Math.min(...indices));
        let x = this.findLastOne(residuo);
        lastIndexes.push( Math.min(x, Math.min(...indices)) );
        lastIndexesResiduo.push(x);
        diferencias.push(dif);
        listaIndices.push(indices);

        let counter=1;
        residuos.push(residuo.slice(0,this.findFirstOne(residuo)+1));
        while(dif>=0){
            
            for(let i=0; i<firstOneMessage+1;i++){
                // console.log("/ " + String(i));
                if(residuo[i] == 0 && indices.includes(i)==false){
                    residuo[i] = 0;
                }else if(residuo[i] == 0 && indices.includes(i)==true){
                    residuo[i] = 1;
                }else if(residuo[i] == 1 && indices.includes(i)==false){
                    residuo[i] = 1;
                }else if(residuo[i] == 1 && indices.includes(i)==true){
                    residuo[i] = 0;
                }else{
                    console.log("No esta entrando a nada");
                }
            }
            
            residuos.push(residuo.slice(0,this.findFirstOne(residuo)+1));
            console.log("\n#" + residuo);
            firstOneMessage = this.findFirstOne(residuo);
            dif = firstOneMessage - firstOneDivisor;
            indices = this.indexesOfOnesInDivisor(this.binaryDivisorArray, dif);
            console.log("##" + firstOneDivisor);
            console.log("###" + firstOneMessage);
            console.log("####" + indices);
            console.log("#####" + dif);
            listaIndices.push(indices);
            let x = this.findLastOne(residuo);
            lastIndexes.push( Math.min(x, Math.min(...indices)) );
            lastIndexesResiduo.push(x);
            diferencias.push(dif);
            counter += 1;
        }
        
        // console.log(diferencias);
        // console.log(counter);
        if(calculate){
            return {"remainders": residuos, "listaIndices":listaIndices, "counter":counter, "lastIndexes": lastIndexes.slice(0,counter), "lastIndexesResiduo": lastIndexesResiduo, "diferencias": diferencias, "binaryMessage": this.binaryMessage };
        }else{
            return {"remainder": residuos[residuos.length-1]};
        }
        
    }

    findFirstOne(array){
        for(let i=array.length-1; i>=0; i--){
            if(array[i] == 1){
                return (i);
            }
        }
        return 0;
    }

    findLastOne(array){
        console.log("**" + array);
        for(let i=0; i<array.length; i++){
            if(array[i] == 1){
                return (i);
            }
        }
        return 0;
    }

    indexesOfOnesInDivisor(divisor, dif){
        let indices = [];
        for(let i=0; i<divisor.length; i++){
            if(divisor[i]==1){
                indices.push(i+dif);
            }
        }
        return indices;
    }

}

module.exports = CRC16;
// 100000100101011000000000
// 00000000 00000000 10000100 10010110 00010010
// 00000000 00000000 10000100 10010110 00010010


// mensaje = new CRC16("hola como estas soy yo tu pana del alma mijin que diceeees peees ademas que me puedes decir acerca del numero de caracteres que estoy ponie!");
// console.log(mensaje.message);
// console.log(mensaje.setBinaryMessage());
// console.log(mensaje.binaryMessage);
// mensaje.getRemainder();

