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
        if (aiWidget.classList.contains('open')) {
            if (!aiWidget.contains(event.target) && event.target !== aiBtn) {
                aiWidget.classList.remove('open');
            }
        }
    });
}

// AI Assistant Send Message (with OpenAI API demo)
const aiInput = document.querySelector('.ai-input-row input');
const aiSend = document.querySelector('.ai-input-row button');
const aiMessages = document.querySelector('.ai-messages');
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // <-- Replace with your key for demo only!
async function fetchOpenAIReply(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful AI assistant for a portfolio website." },
                { role: "user", content: message }
            ]
        })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
}
if (aiInput && aiSend && aiMessages) {
    function sendMessage() {
        const msg = aiInput.value.trim();
        if (msg) {
            const userMsg = document.createElement('div');
            userMsg.className = 'ai-message user';
            userMsg.textContent = msg;
            aiMessages.appendChild(userMsg);
            aiInput.value = '';
            aiMessages.scrollTop = aiMessages.scrollHeight;
            // AI-style reply with portfolio info
            const aiReply = document.createElement('div');
            aiReply.className = 'ai-message ai';
            aiReply.innerHTML = getAIReply(msg);
            aiMessages.appendChild(aiReply);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }
    }
    function getAIReply(userMsg) {
        // Improved AI-style response logic
        const lower = userMsg.toLowerCase();
        if (lower.includes('name') || lower.includes('who are you')) {
            return "Greetings, human! 🤖 My name is Harsh Kumar, your friendly AI-powered portfolio assistant. How can I help you today?";
        } else if (lower.includes('skills')) {
            return "As an AI assistant for Harsh Kumar, I can tell you he excels at HTML, CSS, JavaScript, AI Integration, and UI/UX Design. Would you like to know more about any of these?";
        } else if (lower.includes('project')) {
            return "Here are some of Harsh Kumar's top projects:<ul style='margin:0 0 0 18px;'><li><b>AI Chatbot:</b> A conversational AI assistant for websites.</li><li><b>Smart Portfolio:</b> A portfolio with AI-powered recommendations and analytics.</li><li><b>Modern UI Kit:</b> Beautiful, reusable UI components for fast web development.</li></ul> Curious about the tech behind any of these?";
        } else if (lower.includes('contact') || lower.includes('email')) {
            return "You can contact Harsh Kumar using the form below, or send an email to <b>your@email.com</b>. I'm always here to assist!";
        } else if (lower.includes('about')) {
            return "I'm an AI assistant here to help you explore Harsh Kumar's portfolio. He's passionate about blending creativity, code, and intelligence to deliver next-gen web experiences.";
        } else if (lower.includes('hello') || lower.includes('hi')) {
            return "Hello! 👋 I'm your AI portfolio guide. Ask me anything about Harsh Kumar's skills, projects, or how to get in touch.";
        } else if (lower.includes('ai')) {
            return "Yes, I'm powered by AI! I can answer questions about Harsh Kumar, his work, and more. What would you like to know?";
        } else {
            return "I'm Harsh Kumar's AI assistant 🤖. Ask me about skills, projects, or how to contact Harsh!";
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
