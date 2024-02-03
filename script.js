window.onload = function () {
    //TODO:TRATAR DO PRIMEIRO INPUT E ADICIONAR CADEIRAS COM IPLEMENTAÇÃO DE LOCAL STORAGE
    var ectsArray = [];
    var notasArray = [];
    var ectsFinal = [];
    var notasFinal = [];
    var resultado = [];
    var table = document.getElementById('tabela');
    var somaTudo;
    var somaEcts;
    var final;

    function reset() {
        document.getElementById("cabecalho").style.display = "none"
        document.getElementById("botoes").style.display = "none"
        document.getElementById("adicionar2").style.display = "none"
        document.getElementById("media").style.display = "none"
        document.getElementById("media").style.display = "none"
        document.getElementById("adicionar1").style.display = "flex"
        document.getElementById("cadeiras").style.display = "flex"
        document.getElementById("botao").style.display = ""
        document.getElementById("bodytabela").innerHTML = ""
        counter = 0
    }


    document.getElementById("cabecalho").style.display = "none"
    document.getElementById("botoes").style.display = "none"
    document.getElementById("adicionar2").style.display = "none"
    document.getElementById("vazio").style.display = "none"
    document.getElementById("vazio2").style.display = "none"
    document.getElementById("adicionar2").style.display = "none"
    document.getElementById("media").style.display = "none"
    document.getElementById("cadeirasvazio").style.display = "none"
    document.getElementById("cadeiraserro").style.display = "none"



    var counter = 0

    document.getElementById("botao").onclick = function () {
        if (document.getElementById("cadeiras").value === "") {
            document.getElementById("cadeirasvazio").style.display = "flex"
        } else if ((parseInt(document.getElementById("cadeiras").value) != document.getElementById("cadeiras").value) || (document.getElementById("cadeiras").value < 0)){
            console.log(parseInt(document.getElementById("cadeiras").value))
            console.log(document.getElementById("cadeiras").value)
            document.getElementById("cadeiraserro").style.display = "flex"
            document.getElementById("cadeirasvazio").style.display = "none"
        } else  {
            document.getElementById("cabecalho").style.display = "block"
            document.getElementById("adicionar1").style.display = "none"
            document.getElementById("cadeiras").style.display = "none"
            document.getElementById("botao").style.display = "none"
            document.getElementById("cadeirasvazio").style.display = "none"
            document.getElementById("cadeiraserro").style.display = "none"
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
    }

    document.getElementById("reset").onclick = function () {
        reset()
    }

    document.getElementById("calcular").onclick = function () {
        ectsArray = []
        notasArray = []
        resultado = []
        for (var i = 1; i <= counter; i++) {
            var ectsValores = table.rows[i].cells[1].innerText;
            ectsArray.push(ectsValores);
            var notasValores = table.rows[i].cells[2].innerText;
            notasArray.push(notasValores);
            ectsFinal = ectsArray.map(item => item.replace(/,/g, '.'));
            notasFinal = notasArray.map(item => item.replace(/,/g, '.'));
            resultado.push(ectsFinal[i - 1] * notasFinal[i - 1]);
            var somaEcts = ectsFinal.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
            var somaTudo = resultado.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
            final = somaTudo / somaEcts
        }
        if (ectsArray.includes("")) {
            console.log("vazios")
            document.getElementById("media").style.display = "none"
            document.getElementById("vazio").style.display = "flex"
            document.getElementById("vazio2").style.display = "flex"
        } else if (notasArray.includes("")) {
            console.log("vazios")
            document.getElementById("media").style.display = "none"
            document.getElementById("vazio").style.display = "flex"
            document.getElementById("vazio2").style.display = "flex"
        } else if ((ectsArray.some(number => number < 0)) || (notasArray.some(number => number < 0)))  {
            console.log("letra")
            console.log(parseInt(final))
            console.log(final)
            document.getElementById("vazio").style.display = "none"
            document.getElementById("vazio2").style.display = "none"
            document.getElementById("media").style.display = ""
            document.getElementById("media").innerHTML = "Só podes inserir números positivos inteiros!"

        } else {
            document.getElementById("vazio").style.display = "none"
            document.getElementById("vazio2").style.display = "none"
            console.log(ectsArray)
            console.log(ectsFinal)
            console.log(somaTudo)
            console.log(somaEcts)
            console.log(final)
            document.getElementById("media").style.display = ""
            document.getElementById("media").innerHTML = "A tua média é " + final
            }
        }







}

