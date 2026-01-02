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

document.querySelectorAll('.config-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

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

const installationSection = document.getElementById('installation');
if (installationSection) {
    observer.observe(installationSection);
}

function copyToClipboard(button) {
    const configItem = button.closest('.config-item');
    const codeElement = configItem.querySelector('code');
    const textToCopy = codeElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#00ff88';
        button.style.color = '#1a1a1a';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        button.textContent = 'Failed';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
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