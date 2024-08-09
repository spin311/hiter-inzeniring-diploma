let PythonLogRequestDTO = {
    id: null,
    pythonCode: null,
    errorMessage: null,
    taskNumber: null

}


let stopExecution = false;
let studentId = null;
const tasks = [
    {id: 1, text: "Napišite funkcijo v Pythonu, ki sprejme seznam števil kot vhod in vrne vsoto vseh sodih števil v seznamu."},
    {id: 2, text: "Implementirajte funkcijo v Pythonu, ki sprejme seznam števil kot vhod in vrne največji element v seznamu."},
    {id: 3, text: "Napišite funkcijo v Pythonu, ki sprejme seznam kot vhod in vrne nov seznam z obrnjenimi elementi (brez uporabe vgrajene funkcije reverse())."},
    {id: 4, text: "Ustvarite funkcijo v Pythonu, ki sprejme seznam števil in ciljno število kot vhod ter vrne število pojavitev ciljnega števila v seznamu."},
    {id: 5, text: "Implementirajte funkcijo v Pythonu, ki sprejme seznam kot vhod in vrne nov seznam brez podvojenih elementov, pri tem pa ohranja izvirni red elementov."},
    {id: 6, text: "Napišite funkcijo v Pythonu, ki sprejme niz kot vhod in vrne niz v obratnem vrstnem redu."},
    {id: 7, text: "Implementirajte funkcijo v Pythonu, ki sprejme seznam nizov kot vhod in vrne nov seznam, ki vsebuje samo nize, ki se začnejo s črko 'a'."},
    {id: 8, text: "Ustvarite funkcijo v Pythonu, ki sprejme dve števili kot vhod in vrne njun produkt. Če je produkt večji od 1000, potem vrne njuno vsoto."},
    {id: 9, text: "Razvijte funkcijo v Pythonu, ki sprejme seznam števil kot vhod in vrne nov seznam, ki vsebuje samo sode številke."},
    {id: 10, text: "Oblikujte funkcijo v Pythonu, ki sprejme niz kot vhod in vrne slovar, kjer so ključi znaki v nizu in vrednosti so število pojavitev vsakega znaka."},
];
const themes = [
    'default',
    'monokai',
    'lucario',
    'paraiso-light',
    'ayu-mirage',
    'eclipse',
    'rubyblue',
    'dracula',
    'ambiance',
    'panda-syntax',
    'the-matrix',
    'abbott',
    'abcdef',
    'base16-dark',
    'lesser-dark',
    'liquibyte',
    '3024-night',
    'isotope',
];

let currentTask = 1;
let codes = ["", "", "", "", "", "", "", "", "", ""];

window.onload = function() {
    fetch('http://localhost:8080/student/getId')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            studentId = data;
            document.getElementById("studentId").innerHTML = studentId;
                            })
        .catch((error) => {
            console.error('Error:', error);
        });
    const dropdownMenu = document.querySelector('.dropdown-menu');

    themes.forEach(theme => {
        const dropdownItem = document.createElement('li');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.textContent = theme;
        dropdownMenu.appendChild(dropdownItem);
    });

// Add an event listener to the dropdown menu
    dropdownMenu.addEventListener('click', event => {
        event.preventDefault();
        const selectedTheme = event.target.textContent;
        editor.setOption('theme', selectedTheme);
    });

    // Get the fa-square-minus icon
    const icon = document.getElementById('hide-nav');

// Get the navigation section
    const nav = document.getElementById('navigation');

// Add an event listener to the icon
    icon.addEventListener('click', () => {
        // Check if the icon is fa-square-minus
        if (icon.classList.contains('fa-square-minus')) {
            // Hide the navigation section
            nav.style.display = 'none';

            // Change the icon to fa-square-plus
            icon.classList.remove('fa-square-minus');
            icon.classList.add('fa-square-plus');
        } else {
            // Show the navigation section
            nav.style.display = 'block';

            // Change the icon to fa-square-minus
            icon.classList.remove('fa-square-plus');
            icon.classList.add('fa-square-minus');
        }
    });
}

function stop() {
    stopExecution = true;
}

const editor = CodeMirror.fromTextArea(document.getElementById("yourcode"), {
    mode: "python",
    lineNumbers: true,
    indentUnit: 4,
    theme: "monokai",
    indentWithTabs: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-/": "toggleComment",
        "Cmd-/": "toggleComment",
        "Tab": "indentMore",
        "Shift-Tab": "indentLess"
    }
});
function outf(text) {
    const mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
function displayError(linenumber, lineText, errorText) {
    const mypre = document.getElementById("output");
    let displayText = errorText + "\n" + "line " + (linenumber + 1) + ": " + lineText;
    changeOutputText(displayText, mypre);
    changeOutputColor("#ef2f2f");

}
function changeOutputText(text, htmlElement= document.getElementById("output")) {
    htmlElement.innerHTML = text;
}

function changeOutputColor(color, htmlElement= document.getElementById("output")) {
    htmlElement.style.backgroundColor = color;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
    stopExecution = false;
    changeOutputColor("white");
    const prog = editor.getDoc().getValue();
    const mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({
        output:outf,
        read:builtinRead,
        execLimit: 7500,
        inputTakesPrompt: true,
        timeoutMsg: () => { throw new Error("Your program timed out"); },
        killableWhile: true,
        killableFor: true,
        __future__: Sk.python3
    });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    const myPromise = Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, prog, true), {
        "*": () => {
            if (stopExecution){
                console.log("execution interrupted");
                throw "Execution interrupted"
            }
        }
    });
    let pythonLogRequestDTO = Object.create(PythonLogRequestDTO);
    myPromise.then(function() {
            console.log('success');
        },
        function(err) {
            pythonLogRequestDTO.errorMessage = err.toString();
        let interrupt = "Execution interrupted";
        if(err === interrupt) {
            changeOutputText(interrupt);
        }
        else {
            let lineNumber = extractLineNumber(err.toString());
            while (isLineEmpty(lineNumber)) {
                lineNumber--;
            }
            highlightLine(lineNumber);
            displayError(lineNumber, editor.getLine(lineNumber), err.toString());
            console.log(err.toString());
        }

    }).finally(
        function () {
            pythonLogRequestDTO.pythonCode = prog;
            pythonLogRequestDTO.id = studentId;
            pythonLogRequestDTO.taskNumber = currentTask;
        let jsonData = JSON.stringify(pythonLogRequestDTO);
        console.log('logging error' + jsonData);
        fetch('http://localhost:8080/python/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }).then( r =>console.log(r));
        }

    );
}

function extractLineNumber(errorString) {
    // Extract line number from error message
    const match = errorString.match(/line (\d+)/);
    return match ? parseInt(match[1], 10) - 1 : null;
}

function highlightLine(lineNumber) {
    if (lineNumber !== null && lineNumber >= 0) {
        editor.markText({line: lineNumber, ch: 0}, {line: lineNumber + 1, ch: 0}, {className: "highlighted-error"});
    }
}

function switchAndSaveCode() {
    editor.getDoc().setValue(codes[currentTask - 1]);
    document.getElementById("navodila").innerHTML = tasks[currentTask - 1].text;
    document.getElementById("progress").innerHTML = currentTask.toString();
    document.getElementById("progress-bar").style.width = (currentTask * 10).toString() + "%";
}

function previousCode() {
    if (currentTask > 1){
        codes[currentTask - 1] = editor.getValue();
        currentTask--;
        switchAndSaveCode();
    }


}

function nextCode() {
    if(currentTask < tasks.length) {
        codes[currentTask - 1] = editor.getValue();
        currentTask++;
        switchAndSaveCode();
    }

}

editor.on('change', function() {
    editor.getAllMarks().forEach(function(mark) {
        mark.clear();
    });
});

function isLineEmpty(lineNumber) {
    const lineContent = editor.getLine(lineNumber);
    return !lineContent || !lineContent.trim();
}

function copyId() {
    navigator.clipboard.writeText(studentId);
}
// Prevent closing the window with unsaved code
// window.addEventListener('beforeunload', function (e) {
//     // Cancel the event
//     e.preventDefault();
//     // Chrome requires returnValue to be set
//     e.returnValue = '';
// });


