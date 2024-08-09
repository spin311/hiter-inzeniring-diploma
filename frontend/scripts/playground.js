let stopExecution = false;
let codeHasError = true;
let timeoutId = null;
let maxTokens = 500;
const tasks = [
    {id: 1, text: "Napiši program, ki prebere stavek iz več besed in vrne isti stavek, z obratnim vrstnim redom črk posamezne besede.", chatAllowed: false, difficulty: 1, vhod: "Danes je lep dan", izhod: "senaD ej pel nad"},
    {id: 2, text: "Napiši funkcijo, ki sprejme dva seznama in vrne nov seznam, ki vsebuje samo elemente, ki se pojavijo v obeh seznamih.", chatAllowed: true, difficulty: 1, vhod: "[1, 2, 3, 4, 5], [3, 4, 5, 6, 7]", izhod: "[3, 4, 5]"},
    {id: 3, text: "Napišite program, ki prebere števili a in b in izpiše poštevanko števila a s faktorji od 1 do " +
            "vključno b.", chatAllowed: false, difficulty: 1, vhod: "5 6", izhod: "5 * 1 = 5\n" +
            "5 * 2 = 10\n" +
            "5 * 3 = 15\n" +
            "5 * 4 = 20\n" +
            "5 * 5 = 25\n" +
            "5 * 6 = 30"},
    {id: 4, text: "Napiši funkcijo, ki odstrani prvih n znakov niza. Če je dolzina niza manjša od n, naj funkcija vrne niz \"ERROR!\"", chatAllowed: true, difficulty: 1, vhod: "programiranje 5", izhod: "iranje"},
    {id: 5, text: "Napišite program, ki prebere seznam celih števil in izpiše RAZLICNI, če so vsi elementi\n" +
            "v njem medsebojno različni. V nasprotnem primeru naj izpiše najmanjše število, ki v\n" +
            "zaporedju nastopa najmanj dvakrat.", chatAllowed: true, difficulty: 2, vhod: "[1, 2, 3, 4, 4, 2, 3]", izhod: "2"},
    {id: 6, text: "Napiši funkcijo, ki prešteje število besed v povedi", chatAllowed: true, difficulty: 1, vhod: "Danes je lep dan", izhod: "4"},
    {id: 7, text: "Napišite funkcijo v Pythonu, ki sprejme seznam kot vhod in vrne nov seznam z obrnjenimi elementi (brez uporabe vgrajene funkcije reverse()\n", chatAllowed: false, difficulty: 3, vhod: "[1, 2, 3, 4, 5]", izhod: "[5, 4, 3, 2, 1]"},
    {id: 8, text: "Napiši program, ki 2d seznam naredi v navaden seznam", chatAllowed: true, difficulty: 3, vhod: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]", izhod: "[1, 2, 3, 4, 5, 6, 7, 8, 9]"},
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

let currentTask = 0;
let currentCode = "";

window.onload = function() {
    shuffleArray(tasks);
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
function changeOutputText(text="", htmlElement= document.getElementById("output")) {
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

function runit() {
    stopExecution = false;
    changeOutputColor("white");
    const prog = editor.getDoc().getValue();
    if (prog === "") return;
    changeOutputText();
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
    myPromise.then(function() {
            codeHasError = false;
            correctCount++;
            console.log('success');
        },
        function(err) {
            errorCount++;
            let interrupt = "Execution interrupted";
            if(err === interrupt) {
                changeOutputText(interrupt);
            }
            else {
                codeHasError = true;
                let lineNumber = extractLineNumber(err.toString());
                while (isLineEmpty(lineNumber)) {
                    lineNumber--;
                }
                highlightLine(lineNumber);
                displayError(lineNumber, editor.getLine(lineNumber), err.toString());
            }
        }).finally(
        function () {
            clearTimeout(timeoutId);
            if (currentTask === 0 || prog.trim() === "" || currentCode === prog) return;
            currentCode = prog;
            fillPythonLogRequestDTO(pythonLogRequestDTO, false);
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
    toggleChat();
    editor.getDoc().setValue("");
    document.getElementById("navodila").innerHTML = tasks[currentTask - 1].text;
    changeProgressBar();
    clearTimeout(timeoutId);
    logCodeTimer = 5000;
    logCodeTimerInterval = 1000;
    setLogTimeout();

    function changeProgressBar() {
        document.getElementById("progress").innerHTML = currentTask.toString();
        document.getElementById("progress-bar").style.width = (currentTask * 12.5).toString() + "%";
    }
}

function resetOutputAndVariables() {
    let textArea = document.getElementById("text-area");
    changeOutputText();
    removeChildren(textArea);
    codeHasError = true;
}

function nextCode() {
    resetOutputAndVariables();
    if(currentTask < tasks.length) {
        currentTask++;
        switchAndSaveCode();
    }
}
function toggleChat() {
    let isChatAllowed = tasks[currentTask - 1].chatAllowed;

    if (isChatAllowed === true) {
        document.getElementById('chatGPT-input').disabled = false;
        document.getElementById('submitChat').disabled = false;
        document.getElementById('chatGPT-input').value = "";
    } else {
        document.getElementById('chatGPT-input').value = "Za to nalogo uporaba chatGPT ni dovoljena.";
        document.getElementById('chatGPT-input').disabled = true;
        document.getElementById('submitChat').disabled = true;
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
async function getChat(){
    const chatInput = document.getElementById('chatGPT-input').value;
    if(currentTask > 0) {
        if(tasks[currentTask - 1].chatAllowed === false || chatInput.length === 0) {
            return;
        }
    }
    const questionPre = document.createElement('pre');



    const chatWindow = document.getElementById('text-area');
    questionPre.classList.add('question');
    questionPre.innerHTML = chatInput;
    chatWindow.appendChild(questionPre);


    const answerPre = document.createElement('pre');
    answerPre.classList.add('answer');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
        }, //TODO
        body: JSON.stringify({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    "role": "user",
                    "content": chatInput.trim()
                }],
            max_tokens: maxTokens
        })
    });
    const data = await response.json();
    let chatAnswer;
    if(data.choices && data.choices.length > 0) {
        chatAnswer = data.choices[0].message.content;

    }
    else {
        chatAnswer = "ChatGPT trenutno ni na voljo.";
    }

    answerPre.innerHTML = chatAnswer;
    chatWindow.appendChild(answerPre);
    smoothScrollToBottom(chatWindow);
    disableButtonForTime('submitChat',5000);
}

function disableButtonForTime(buttonId, time) {
    let button = document.getElementById(buttonId);
    let previousText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = "Počakajte...";
    setTimeout(() => {
        button.innerHTML = previousText;
        button.disabled = false;
    }, time);

}

function smoothScrollToBottom(element) {
    const scrollHeight = element.scrollHeight;
    const speed = 30;
    let scrollPosition = element.scrollTop;
    let difference = scrollHeight - scrollPosition;

    function step() {
        difference = scrollHeight - scrollPosition;
        scrollPosition += difference / speed;
        element.scrollTop = scrollPosition;

        if (difference > 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function infoModal() {
    let myModal = new bootstrap.Modal(document.getElementById('navodilaModal'), {});
    if (currentTask >= 1) {
        document.getElementById('navodilaModalVhod').innerHTML = tasks[currentTask - 1].vhod;
        document.getElementById('navodilaModalIzhod').innerHTML = tasks[currentTask - 1].izhod;

    }
    myModal.show();

}

function submitPyCode() {
    if (currentTask !== 0 && currentCode.trim() === "") {
        let myModal = new bootstrap.Modal(document.getElementById('warningModal'), {});
        document.getElementById('warningModalBody').innerHTML = "Vaša koda je prazna. Napišite kodo in poskusite znova.";
        myModal.show();
        return;
    }
    if (codeHasError || document.getElementById("output").innerHTML === "") {
        let myModal = new bootstrap.Modal(document.getElementById('warningModal'), {});
        document.getElementById('warningModalBody').innerHTML = "Vaša koda vsebuje napake ali nima izpisa. Popravite napake in jo zaženite ter poskusite znova.";
        myModal.show();
    }
    else {
        let myModal = new bootstrap.Modal(document.getElementById('confirmSubmitModal'), {});
        myModal.show();
    }

}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function clearCode() {
    editor.getDoc().setValue("");

}




