// public/script.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Global variables
let firebaseApp;
let db;

// Initialize Firebase and return a promise
async function initializeFirebase() {
  try {
    const response = await fetch('/firebase-config');
    const firebaseConfig = await response.json();
    
    // Initialize Firebase with v9 SDK
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
}

// Function to get the "nome" property of document "1" in the "users" collection
async function getUserNome() {
  try {
    // Make sure Firebase is initialized first
    if (!db) {
      const initialized = await initializeFirebase();
      if (!initialized) {
        console.error("Failed to initialize Firebase");
        return;
      }
    }
    
    // Now we can safely use Firestore
    const userDocRef = doc(db, "users", "1");
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("User nome:", userDocSnap.data().nome);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

// Initialize Firebase when the page loads
window.onload = async function() {
  await initializeFirebase();
  getUserNome();
};

// Make function available globally
window.getUserNome = getUserNome;
window.onload = function () {
    getUserNome();
    //TODO:CONTAS E RESOLVER NAN E ERROS MAIS BONITOS 
    var ectsArray = [];
    var notasArray = [];
    var ectsFinal = [];
    var notasFinal = [];
    var resultado = [];
    var table = document.getElementById('tabela');
    let savedData = []; 
    var counter = 0
    var removeadd 
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
        localStorage.setItem("counter", counter)
        localStorage.setItem("tableData", JSON.stringify(tableData));
    
        return tableData;
    }

    function repopulateTable() {
        console.log("repopulateTable");
        let tbody = document.getElementById("bodytabela");
        tbody.innerHTML = "";  
    
        let savedData = JSON.parse(localStorage.getItem("tableData")) || [];
        let counter = parseInt(localStorage.getItem("counter")) || 0;
        console.log(counter)
        for (let i = 0; i < counter; i++) {
            let row = document.createElement("tr");
            console.log(counter)
            
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
    
    
    
    

    //function reset() {
       // document.getElementById("cabecalho").style.display = "none"
       // document.getElementById("botoes").style.display = "none"
       // document.getElementById("adicionar2texto").style.display = "none"
       // document.getElementById("media").style.display = "none"
       // document.getElementById("media").style.display = "none"
       // document.getElementById("adicionar1").style.display = "flex"
       // document.getElementById("cadeiras").style.display = "flex"
       // document.getElementById("botao").style.display = ""
       // document.getElementById("bodytabela").innerHTML = ""
       //  counter = 0
   // }


    document.getElementById("cabecalho").style.display = "none"
    document.getElementById("botoes").style.display = "none"
    document.getElementById("adicionar2texto").style.display = "none"
    document.getElementById("adicionar2botao").style.display = "none"
    document.getElementById("media").style.display = "none"
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
        repopulateTable();
    }

    document.getElementById("botao").onclick = function () {
        document.getElementById("preenche").style.display = ""
        if (document.getElementById("cadeiras").value === "") {
            document.getElementById("preenche").style.display = "none"
            var myModal2 = new bootstrap.Modal(document.getElementById('modalErros'));
            myModal2.show();
        } else if ((parseInt(document.getElementById("cadeiras").value) != document.getElementById("cadeiras").value) || (document.getElementById("cadeiras").value < 0)){
            document.getElementById("preenche").style.display = "none"
            console.log(parseInt(document.getElementById("cadeiras").value))
            console.log(document.getElementById("cadeiras").value)
            document.getElementById("modalErrosTexto").innerHTML = "Só podes inserir números positivos inteiros!"   
            var myModal2 = new bootstrap.Modal(document.getElementById('modalErros'));
            myModal2.show();
        } else  {
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
        if (ectsArray.includes("") || notasArray.includes("")) {
            document.getElementById("modalErrosTexto").innerHTML = "Um dos campos está vazio. Por favor preenche todos os campos!"   
            var myModal2 = new bootstrap.Modal(document.getElementById('modalErros'));
            myModal2.show();
        } else if (ectsArray.some(number => number < 0 || number.toString().includes(".") || number.toString().includes(",")) || notasArray.some(number => number < 0 || number.toString().includes(".") || number.toString().includes(","))) {
            document.getElementById("modalErrosTexto").innerHTML = "Só podes inserir números positivos inteiros! Suporte para números decimais brevemente!"    
            var myModal2 = new bootstrap.Modal(document.getElementById('modalErros'));
            myModal2.show();
        } else {
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
        removeadd = "add"
        if (counter === 0) {
            counter = parseInt(localStorage.getItem("counter"))
        }
        console.log(counter)
        document.getElementById("adicionar2botao").innerHTML = "<button class=\"btn btn-lg btn-success\" id=\"adicionar2botao\">Adicionar</button>"
        document.getElementById("adicionar2texto").innerHTML = '<h3 class="text-white fw-semibold mt-5">Quantas cadeiras queres adicionar?</h3>';
        document.getElementById("adicionarinput").style.display = "flex"
        document.getElementById("adicionar2botao").style.display = ""
        document.getElementById("adicionar2texto").style.display = "flex"
        console.log(document.getElementById("adicionarinput").value)
        window.location.href = "#adicionar2botao";

    }

    document.getElementById("remover").onclick = function () {
        removeadd = "remove"
        if (counter === 0) {
            counter = parseInt(localStorage.getItem("counter"))
        }
        console.log(counter)
        document.getElementById("adicionarinput").style.display = "flex"
        document.getElementById("adicionar2botao").innerHTML = "<button class=\"btn btn-lg btn-danger\" id=\"adicionar2botao\">Remover</button>"
        document.getElementById("adicionar2botao").style.display = ""
        document.getElementById("adicionar2texto").innerHTML = '<h3 class="text-white fw-semibold mt-5">Quantas cadeiras queres remover?</h3>';
        document.getElementById("adicionar2texto").style.display = "flex";
        console.log(document.getElementById("adicionarinput").value)
        window.location.href = "#adicionar2botao";
    }

    document.getElementById("adicionar2botao").onclick = function () {
        if (removeadd === "add") { 
            for (var x = 0; x < parseInt(document.getElementById("adicionarinput").value); x++) {
                console.log(x + "YEEE")
                console.log(document.getElementById("adicionarinput").value + "hhh")
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
            document.getElementById("adicionarinput").value = ""

        } else {
            for (var x = 0; x < document.getElementById("adicionarinput").value; x = x + 1) {
        
                console.log("entrou2")
                counter = counter - 1
                console.log(counter)
                saveTableData()

                document.getElementById("botoes").style.display = "flex"
                repopulateTable()
                console.log(counter)
                document.getElementById("adicionarinput").style.display = "none"
                document.getElementById("adicionar2botao").style.display = "none"
                document.getElementById("adicionar2texto").style.display = "none"
            }
            document.getElementById("adicionarinput").value = ""
        }
    
    }



    
}

