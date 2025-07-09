// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animated skill bars
function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });
}

window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        animateSkillBars();
    }
});

// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        modeToggle.classList.toggle('active');
    });
}

// AI Assistant Chat Widget (UI only)
const aiBtn = document.getElementById('ai-assistant-btn');
const aiWidget = document.getElementById('ai-assistant-widget');
const aiClose = document.getElementById('ai-assistant-close');

if (aiBtn && aiWidget && aiClose) {
    aiBtn.addEventListener('click', () => {
        aiWidget.classList.add('open');
    });
    aiClose.addEventListener('click', () => {
        aiWidget.classList.remove('open');
    });
}

// Hide AI assistant widget when clicking outside
if (aiWidget) {
    document.addEventListener('mousedown', function(event) {
        if (aiWidget.classList.contains('open') && !aiWidget.contains(event.target) && event.target !== aiBtn) {
            aiWidget.classList.remove('open');
        }
    });
}

// Local AI Assistant Chat (no API)
const aiInput = document.querySelector('.ai-input-row input');
const aiSend = document.querySelector('.ai-input-row button');
const aiMessages = document.querySelector('.ai-messages');

if (aiInput && aiSend && aiMessages) {
    function sendMessage() {
        const msg = aiInput.value.trim();
        if (msg) {
            // Show user's message
            const userMsg = document.createElement('div');
            userMsg.className = 'ai-message user';
            userMsg.textContent = msg;
            aiMessages.appendChild(userMsg);
            aiInput.value = '';
            aiMessages.scrollTop = aiMessages.scrollHeight;

            // Simulate AI reply
            const aiReply = document.createElement('div');
            aiReply.className = 'ai-message ai';
            aiReply.innerHTML = getAIReply(msg);
            aiMessages.appendChild(aiReply);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }
    }

    function getAIReply(userMsg) {
        const lower = userMsg.toLowerCase();

        if (lower.includes('name') || lower.includes('who are you')) {
            return "Greetings, human! 🤖 My name is Harsh Kumar, your friendly AI-powered portfolio assistant. How can I help you today?";
        } else if (lower.includes('skills')) {
            return "Harsh Kumar excels at HTML, CSS, JavaScript, AI Integration, and UI/UX Design. Want to dive deeper into any of these?";
        } else if (lower.includes('project')) {
            return `Here are some of Harsh Kumar's top projects:
                <ul style='margin:0 0 0 18px;'>
                    <li><b>AI Chatbot:</b> A conversational AI assistant for websites.</li>
                    <li><b>Smart Portfolio:</b> AI-powered recommendations and analytics.</li>
                    <li><b>Modern UI Kit:</b> Reusable components for modern interfaces.</li>
                </ul>`;
        } else if (lower.includes('contact') || lower.includes('email')) {
            return "You can contact Harsh Kumar using the form below or send an email to <b>your@email.com</b>. I'm always here to help!";
        } else if (lower.includes('about')) {
            return "I'm here to guide you through Harsh Kumar's portfolio. He’s passionate about blending creativity, code, and intelligence!";
        } else if (lower.includes('hello') || lower.includes('hi')) {
            return "Hello! 👋 I'm your AI guide. Ask me anything about Harsh Kumar's work, skills, or projects.";
        } else if (lower.includes('ai')) {
            return "Yes, I'm powered by AI logic built into this site! Ask me about Harsh Kumar and his work.";
        } else {
            return "I'm Harsh Kumar's AI assistant 🤖. You can ask me about skills, projects, or how to contact him!";
        }
    }

    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    }
      
