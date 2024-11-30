
// Initialize CodeMirror instances
const htmlEditor = CodeMirror(document.getElementById('htmlEditor'), {
    mode: 'htmlMixed',
    theme: 'dracula',
    lineNumbers: true,
    tabSize: 2,
    placeholder: 'Write HTML code here...',
    autoCloseTags: true,
});

const cssEditor = CodeMirror(document.getElementById('cssEditor'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
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


document.getElementById('downloadAll').addEventListener('click', () => {
    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    downloadFile('index.html', htmlEditor.getValue());
    downloadFile('styles.css', cssEditor.getValue());
    downloadFile('script.js', jsEditor.getValue());
});


window.onerror = function (message, source, lineno, colno, error) {
    console.error('Unhandled error:', { message, source, lineno, colno, error });
};
