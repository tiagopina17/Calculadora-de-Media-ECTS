window.onload = function () {
    //TODO: ADICIONAR MAIS BOTOES PARA DAR RESET OU METER CADEIRAS NOVAS E LIMPAR O ARRAY E ADICIONAR EXCEÇÃO PARA NEGATIVOS OU VAZIOS
    var ectsArray = [];
    var notasArray = [];
    var resultado = [];
    var table = document.getElementById('tabela');
    var somaTudo;
    var somaEcts;
    var final;

    function reset(){
        document.getElementById("cabecalho").style.display = "none"
        document.getElementById("botoes").style.display = "none"
        document.getElementById("adicionar2").style.display = "none"
        document.getElementById("media").style.display = "none"
        document.getElementById("vazio").style.display = "none"
        document.getElementById("vazio2").style.display = "none"
        document.getElementById("vazio3").style.display = "none"
        document.getElementById("adicionar2").style.display = "none"
        document.getElementById("media").style.display = "none"
        document.getElementById("adicionar1").style.display = "flex"
        document.getElementById("cadeiras").style.display = "flex"
        document.getElementById("botao").style.display = ""
        document.getElementById("bodytabela").innerHTML = ""
        resetvalores()
    }




    document.getElementById("cabecalho").style.display = "none"
    document.getElementById("botoes").style.display = "none"
    document.getElementById("adicionar2").style.display = "none"
    document.getElementById("vazio").style.display = "none"
    document.getElementById("vazio2").style.display = "none"
    document.getElementById("vazio3").style.display = "none"
    document.getElementById("adicionar2").style.display = "none"
    document.getElementById("media").style.display = "none"

    var counter = 0

    document.getElementById("botao").onclick = function () {
        document.getElementById("cabecalho").style.display = "block"
        document.getElementById("adicionar1").style.display = "none"
        document.getElementById("cadeiras").style.display = "none"
        document.getElementById("botao").style.display = "none"
        for (var x = 0; x < document.getElementById("cadeiras").value; x = x + 1) {
            counter = counter + 1
            document.getElementById("botoes").style.display = "flex"

            document.getElementById("bodytabela").innerHTML = document.getElementById("bodytabela").innerHTML + "        <tr>\n" +
                "            <td class=\"col-4\"><div contenteditable></div></td>\n" +
                "            <td class=\"col-4\" id=\"ects" + counter + "\"><div contenteditable></div></td>\n" +
                "            <td class=\"col-4\" id=\"nota" + counter + "\"><div contenteditable></div></td>\n" +
                "        </tr>"
        }
    }

    document.getElementById("reset").onclick = function (){
        reset()
    }

    document.getElementById("calcular").onclick = function () {
        ectsArray =[]
        notasArray =[]
        resultado = []
        for (var i = 1; i <= counter; i++) {
            var ectsValores = table.rows[i].cells[1].innerText;
            ectsArray.push(ectsValores);
            var notasValores = table.rows[i].cells[2].innerText;
            notasArray.push(notasValores);
            resultado.push(ectsArray[i-1] * notasArray[i-1]);
        }
        //TODO FAZER O MESMO COM AS NOTAS NA LINHA ABAIXO
        if (ectsArray.includes("")){
            console.log("vazios")
            document.getElementById("media").style.display = "none"
            document.getElementById("vazio").style.display = "flex"
            document.getElementById("vazio2").style.display = "flex"
            document.getElementById("vazio3").style.display = "flex"
        } else {
            console.log("cheios")
            document.getElementById("vazio").style.display = "none"
            document.getElementById("vazio2").style.display = "none"
            document.getElementById("vazio3").style.display = "none"
            var somaEcts = ectsArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
            var somaTudo = resultado.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
            console.log(somaTudo)
            console.log(somaEcts)
            final = somaTudo/somaEcts
            console.log(final)
            document.getElementById("media").style.display = "block"
            document.getElementById("media").innerHTML = "A tua média é " + final;
        }

    }







}

