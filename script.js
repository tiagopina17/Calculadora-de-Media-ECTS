window.onload = function () {
    //TODO:CONTAS GOOGLE E UM BREAK PARA PUXAR A PAGINA PARA O ADICIONAR CADEIRAS QUANDO ELE ACONTECE
    var ectsArray = [];
    var notasArray = [];
    var ectsFinal = [];
    var notasFinal = [];
    var resultado = [];
    var table = document.getElementById('tabela');
    let savedData = []; 
    var counter = 0

    var final;

    function saveTableData() {
        let tableData = [];
        let rows = document.querySelectorAll("#bodytabela tr");
    
        rows.forEach(row => {
            let columns = row.querySelectorAll("td");
            let rowData = {
                nome: columns[0].innerText,
                ects: columns[1].innerText,
                nota: columns[2].innerText
            };
            tableData.push(rowData);
        });

        localStorage.setItem("tableData", JSON.stringify(tableData));
    
        return tableData;
    }

    function repopulateTable() {
        console.log("repopulateTable");
    
        let tbody = document.getElementById("bodytabela");
        tbody.innerHTML = "";  
    
        let savedData = JSON.parse(localStorage.getItem("tableData")) || [];
        let counter = parseInt(localStorage.getItem("counter")) || 0;
    
        for (let i = 0; i < counter; i++) {
            let row = document.createElement("tr");
    
            // Dynamically create names for ects and nota columns
            let nomeCell = document.createElement("td");
            nomeCell.textContent = savedData[i]?.nome || ""; 
            nomeCell.contentEditable = "true";  
    
            let ectsCell = document.createElement("td");
            ectsCell.textContent = savedData[i]?.ects || "";
            ectsCell.contentEditable = "true";
            ectsCell.id = `ects${i + 1}`;  // Set ID for each ECTS field (ects1, ects2, etc.)
    
            let notaCell = document.createElement("td");
            notaCell.textContent = savedData[i]?.nota || "";
            notaCell.contentEditable = "true";
            notaCell.id = `nota${i + 1}`;  // Set ID for each Nota field (nota1, nota2, etc.)
    
            row.appendChild(nomeCell);
            row.appendChild(ectsCell);
            row.appendChild(notaCell);
            tbody.appendChild(row);
        }
    }
    
    
    
    

    function reset() {
        document.getElementById("cabecalho").style.display = "none"
        document.getElementById("botoes").style.display = "none"
        document.getElementById("adicionar2texto").style.display = "none"
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
    document.getElementById("adicionar2texto").style.display = "none"
    document.getElementById("vazio").style.display = "none"
    document.getElementById("vazio2").style.display = "none"
    document.getElementById("adicionar2botao").style.display = "none"
    document.getElementById("media").style.display = "none"
    document.getElementById("cadeirasvazio").style.display = "none"
    document.getElementById("cadeiraserro").style.display = "none"
    document.getElementById("adicionarinput").style.display = "none"
    document.getElementById("preenche").style.display = "none"




   

    if (localStorage.getItem("dataCheck") === "true") {
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    }

    document.getElementById("simModal").onclick = function () {
        document.getElementById("botoes").style.display = "flex"
        document.getElementById("preenche").style.display = ""
        document.getElementById("cabecalho").style.display = "block"
        document.getElementById("adicionar1").style.display = "none"
        document.getElementById("cadeiras").style.display = "none"
        document.getElementById("botao").style.display = "none"
        document.getElementById("cadeirasvazio").style.display = "none"
        document.getElementById("cadeiraserro").style.display = "none"
        repopulateTable();
    }

    document.getElementById("botao").onclick = function () {
        document.getElementById("preenche").style.display = ""
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
        console.log(counter)
        if (counter === 0) {
            counter = parseInt(localStorage.getItem("counter"))
        }
        console.log(counter)
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
            console.log(counter)
            console.log(ectsArray)
            console.log(ectsFinal)
            console.log(somaTudo)
            console.log(somaEcts)
            console.log(final)
            document.getElementById("media").style.display = ""
            document.getElementById("media").innerHTML = "A tua média é " + final
            localStorage.setItem("dataCheck", true)
            localStorage.setItem("counter", counter)
            saveTableData()
            }
        }

    document.getElementById("adicionar").onclick = function () {
        console.log(counter)
        document.getElementById("adicionarinput").style.display = "flex"
        document.getElementById("adicionar2botao").style.display = ""
        document.getElementById("adicionar2texto").style.display = "flex"
        console.log(document.getElementById("adicionarinput").value)
        
    }

    document.getElementById("adicionar2botao").onclick = function () {
        for (var x = 0; x < document.getElementById("adicionarinput").value; x = x + 1) {
        
            console.log("entrou")
            counter = counter + 1
            document.getElementById("botoes").style.display = "flex"

            document.getElementById("bodytabela").innerHTML = document.getElementById("bodytabela").innerHTML + "        <tr>\n" +
                "            <td class=\"col-4\"><div contenteditable></div></td>\n" +
                "            <td class=\"col-4\" id=\"ects" + counter + "\"><div contenteditable></div></td>\n" +
                "            <td class=\"col-4\" id=\"nota" + counter + "\"><div contenteditable></div></td>\n" +
                "        </tr>"
            console.log(counter)
            document.getElementById("adicionarinput").style.display = "none"
            document.getElementById("adicionar2botao").style.display = "none"
            document.getElementById("adicionar2texto").style.display = "none"
        }
    }



    
}

