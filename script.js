// List of CSS properties and values for suggestions (A to Z)
const demoHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to the Online Editor</h1>
    <p>This is a demo page to show HTML, CSS, and JavaScript in action.</p>
</body>
</html>
`;

const demoCSS = `
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

h1 {
    color: #2c3e50;
}

p {
    font-size: 16px;
    color: #555;
}
`;

const cssSuggestions = {
    "align-items": ["flex-start", "flex-end", "center", "stretch", "baseline"],
    "align-self": ["auto", "flex-start", "flex-end", "center", "stretch", "baseline"],
    "background": ["#ffffff", "#000000", "red", "blue", "green", "yellow", "transparent", "url(image.jpg)"],
    "background-color": ["#ffffff", "#000000", "red", "blue", "green", "yellow", "transparent", "rgba(0, 0, 0, 0.1)"],
    "border": ["none", "1px solid black", "2px dashed red", "3px dotted blue", "5px solid #333"],
    "border-radius": ["0", "5px", "10px", "50%"],
    "box-shadow": ["none", "2px 2px 5px rgba(0, 0, 0, 0.2)", "0px 4px 10px rgba(0, 0, 0, 0.1)", "inset 0px 4px 6px rgba(0, 0, 0, 0.1)"],
    "bottom": ["0", "10px", "20px", "50%", "10%"],
    "color": ["red", "blue", "green", "yellow", "black", "white", "#ffffff", "#000000", "rgba(255, 0, 0, 0.5)", "transparent"],
    "cursor": ["auto", "pointer", "move", "wait", "crosshair"],
    "display": ["block", "inline", "inline-block", "flex", "grid", "none", "initial", "inherit"],
    "font-family": ["Arial", "Helvetica", "sans-serif", "Times New Roman", "Courier New", "Georgia", "Monospace"],
    "font-size": ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "1em", "1.5em"],
    "font-weight": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700"],
    "height": ["100px", "50%", "auto", "max-content", "min-content", "inherit", "initial"],
    "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
    "left": ["0", "10px", "20px", "50%", "10%"],
    "line-height": ["normal", "1.2", "1.5", "2"],
    "list-style": ["none", "disc", "circle", "square"],
    "margin": ["0px", "5px", "10px", "15px", "20px", "30px", "50px", "auto"],
    "max-height": ["100%", "200px", "auto"],
    "max-width": ["100%", "200px", "auto"],
    "min-height": ["100px", "auto"],
    "min-width": ["100px", "auto"],
    "opacity": ["1", "0.5", "0.2", "0"],
    "overflow": ["visible", "hidden", "scroll", "auto"],
    "padding": ["0px", "5px", "10px", "15px", "20px", "30px", "50px"],
    "position": ["static", "relative", "absolute", "fixed", "sticky"],
    "right": ["0", "10px", "20px", "50%", "10%"],
    "top": ["0", "10px", "20px", "50%", "10%"],
    "text-align": ["left", "right", "center", "justify"],
    "text-decoration": ["none", "underline", "line-through", "overline"],
    "text-shadow": ["none", "2px 2px 5px rgba(0, 0, 0, 0.2)", "1px 1px 2px rgba(255, 255, 255, 0.7)"],
    "text-transform": ["uppercase", "lowercase", "capitalize", "none"],
    "top": ["0", "10px", "20px", "50%", "10%"],
    "transform": ["rotate(0deg)", "rotate(45deg)", "translateX(10px)", "translateY(20px)", "scale(1)", "scale(1.5)"],
    "transition": ["all 0.3s ease", "background-color 0.5s ease", "opacity 1s linear"],
    "visibility": ["visible", "hidden", "collapse"],
    "width": ["100px", "50%", "auto", "max-content", "min-content", "inherit", "initial"],
    "z-index": ["1", "2", "3", "10", "100"]
};

// Initialize CodeMirror instances
const htmlEditor = CodeMirror(document.getElementById('htmlEditor'), {
    mode: 'html',
    theme: 'dracula',
    lineNumbers: true,
    value: demoHTML,
    tabSize: 2,
    placeholder: 'Write HTML code here...',
});

const cssEditor = CodeMirror(document.getElementById('cssEditor'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
     value: demoCSS,
    tabSize: 2,
    placeholder: 'Write CSS code here...',
});

const jsEditor = CodeMirror(document.getElementById('jsEditor'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    tabSize: 2,
    placeholder: 'Write JavaScript code here...',
});

let autocompleteContainer = null;

document.addEventListener("DOMContentLoaded", function () {
    const htmlBtn = document.getElementById("htmlBtn");
    const cssBtn = document.getElementById("cssBtn");
    const jsBtn = document.getElementById("jsBtn");

    const liveCodeCheckbox = document.getElementById("liveCodeCheckbox");
    const htmlEditor = document.getElementById("htmlEditor");
    const cssEditor = document.getElementById("cssEditor");
    const jsEditor = document.getElementById("jsEditor");

    const editors = [htmlEditor, cssEditor, jsEditor];
    const buttons = [htmlBtn, cssBtn, jsBtn];


    // active tab***********************
    function resetActive() {
        // Remove active class from all buttons
        buttons.forEach(button => button.classList.remove("active"));

        // Hide all editors
        editors.forEach(editor => editor.style.display = "none");
    }

    htmlBtn.addEventListener("click", function () {
        resetActive();
        htmlEditor.style.display = "block";
        htmlBtn.classList.add("active");
    });

    cssBtn.addEventListener("click", function () {
        resetActive();
        cssEditor.style.display = "block";
        cssBtn.classList.add("active");
    });

    jsBtn.addEventListener("click", function () {
        resetActive();
        jsEditor.style.display = "block";
        jsBtn.classList.add("active");
    });

    // Initially, display HTML editor and make the HTML button active
    htmlBtn.click();
});

document.getElementById('runBtn').addEventListener('click', () => {
    runCode();
});

// Switch editors visibility
function toggleEditors(editor) {
    document.getElementById('htmlEditor').style.display = 'none';
    document.getElementById('cssEditor').style.display = 'none';
    document.getElementById('jsEditor').style.display = 'none';

    if (editor === 'html') document.getElementById('htmlEditor').style.display = 'block';
    if (editor === 'css') document.getElementById('cssEditor').style.display = 'block';
    if (editor === 'js') document.getElementById('jsEditor').style.display = 'block';
}

// Update iframe with current editor content
function updateOutput() {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>${jsEditor.getValue()}<\/script>`;

    const iframeDoc = outputIframe.contentDocument || outputIframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`${html}${css}${js}`);
    iframeDoc.close();
}

// Toggle live updates
liveCodeCheckbox.addEventListener("change", () => {
    if (liveCodeCheckbox.checked) {
        htmlEditor.on("change", updateOutput);
        cssEditor.on("change", updateOutput);
        jsEditor.on("change", updateOutput);
        updateOutput();
    } else {
        htmlEditor.off("change", updateOutput);
        cssEditor.off("change", updateOutput);
        jsEditor.off("change", updateOutput);
    }
});

// Manual run button
runBtn.addEventListener("click", updateOutput);


// Custom Autocomplete logic for CSS
cssEditor.on("keyup", function (cm, event) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    const token = cm.getTokenAt(cursor);

    if (token.string === '') return;  // Don't show suggestions when there's no input

    const start = token.string[0];
    if (start && start !== ':') {
        const matchedProperties = Object.keys(cssSuggestions).filter(property => property.startsWith(start));
        showSuggestions(matchedProperties, cursor);
    }
});

function showSuggestions(properties, cursor) {
    if (autocompleteContainer) {
        autocompleteContainer.remove(); // Remove previous suggestions if any
    }

    if (properties.length === 0) return;

    autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    document.body.appendChild(autocompleteContainer);

    properties.forEach(property => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = property;
        item.addEventListener('click', () => {
            insertTextAtCursor(property);
        });
        autocompleteContainer.appendChild(item);
    });

    // Position the suggestion container near the cursor
    const coords = cssEditor.cursorCoords(cursor);
    autocompleteContainer.style.top = `${coords.top + 20}px`;
    autocompleteContainer.style.left = `${coords.left}px`;
}

function insertTextAtCursor(text) {
    const cursor = cssEditor.getCursor();
    cssEditor.replaceRange(text, cursor);
    autocompleteContainer.remove(); // Remove suggestions after selection
}
