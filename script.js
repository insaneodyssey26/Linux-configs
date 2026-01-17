const terminalOutput = document.querySelector('.output');
const terminalBody = document.querySelector('.terminal-body');
const originalContent = terminalOutput.innerHTML;
terminalOutput.innerHTML = '';

let lineIndex = 0;
let charIndex = 0;
const lines = originalContent.split('<br>').map(line => line.replace(/<[^>]*>/g, '').trim()).filter(line => line);

function typeTerminal() {
    if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
            terminalOutput.innerHTML += currentLine.charAt(charIndex);
            charIndex++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(typeTerminal, 30);
        } else {
            terminalOutput.innerHTML += '<br>';
            lineIndex++;
            charIndex = 0;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(typeTerminal, 200);
        }
    }
}

window.addEventListener('load', () => {
    setTimeout(typeTerminal, 500);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Removed JS-based hover scaling to avoid jumpy interactions; CSS :hover now handles subtle motion

let srStatus = document.getElementById('sr-status');
if (!srStatus) {
    srStatus = document.createElement('div');
    srStatus.id = 'sr-status';
    srStatus.setAttribute('aria-live', 'polite');
    srStatus.className = 'sr-only';
    document.body.appendChild(srStatus);
} 

const commandLines = document.querySelectorAll('.command-line .command');
let commandIndex = 0;

function executeCommand() {
    if (commandIndex < commandLines.length) {
        const command = commandLines[commandIndex];
        command.style.opacity = '0.5';
        setTimeout(() => {
            command.style.opacity = '1';
            commandIndex++;
            setTimeout(executeCommand, 1000);
        }, 500);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            executeCommand();
            observer.unobserve(entry.target);
        }
    });
});

// Accessibility: add aria-label and title to copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.setAttribute('aria-label', 'Copy configuration');
    btn.setAttribute('title', 'Copy configuration');
});

const installationSection = document.getElementById('installation');
if (installationSection) {
    observer.observe(installationSection);
}

function copyToClipboard(button) {
    const configItem = button.closest('.config-item');
    const codeElement = configItem.querySelector('code');
    const textToCopy = codeElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // show subtle check badge without changing text to avoid layout shift
        button.classList.remove('error');
        button.classList.add('copied');
        if (srStatus) srStatus.textContent = 'Configuration copied to clipboard';
        setTimeout(() => {
            button.classList.remove('copied');
            if (srStatus) srStatus.textContent = '';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        button.classList.remove('copied');
        button.classList.add('error');
        if (srStatus) srStatus.textContent = 'Copy failed';
        setTimeout(() => {
            button.classList.remove('error');
            if (srStatus) srStatus.textContent = '';
        }, 1800);
    });
}

const cursor = document.createElement('span');
cursor.className = 'cursor';
cursor.textContent = '█';
cursor.style.color = '#00ff88';
cursor.style.animation = 'blink 1s infinite';

setTimeout(() => {
    terminalBody.appendChild(cursor);
}, 3000);

const style = document.createElement('style');
style.textContent = `
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
.cursor {
    animation: blink 1s infinite;
}
`;
document.head.appendChild(style);