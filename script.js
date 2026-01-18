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


const installationSection = document.getElementById('installation');
if (installationSection) {
    observer.observe(installationSection);
}

// Copy button functionality
function copyToClipboard(button) {
    const configItem = button.closest('.config-item');
    const codeElement = configItem.querySelector('code');
    const textToCopy = codeElement.textContent;

    // Update button state to loading
    button.classList.add('copying');
    button.querySelector('.copy-text').textContent = 'Copying...';

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Success state
        button.classList.remove('copying', 'error');
        button.classList.add('copied');
        button.querySelector('.copy-text').textContent = 'Copied!';

        // Update screen reader status
        if (srStatus) srStatus.textContent = 'Configuration copied to clipboard';

        // Reset after delay
        setTimeout(() => {
            button.classList.remove('copied');
            button.querySelector('.copy-text').textContent = 'Copy';
            if (srStatus) srStatus.textContent = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);

        // Error state
        button.classList.remove('copying', 'copied');
        button.classList.add('error');
        button.querySelector('.copy-text').textContent = 'Failed';

        // Update screen reader status
        if (srStatus) srStatus.textContent = 'Copy failed';

        // Reset after delay
        setTimeout(() => {
            button.classList.remove('error');
            button.querySelector('.copy-text').textContent = 'Copy';
            if (srStatus) srStatus.textContent = '';
        }, 2000);
    });
}

// Initialize copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.setAttribute('aria-label', 'Copy configuration');
    btn.setAttribute('title', 'Copy configuration');
});

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

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNavOverlay = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Close mobile menu when clicking outside
mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
        toggleMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
        toggleMobileMenu();
    }
});