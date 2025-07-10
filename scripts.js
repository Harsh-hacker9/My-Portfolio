document.addEventListener("DOMContentLoaded", () => {
  // ===== Skill Bars Animation on Scroll =====
  const skillsSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skill-bar");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function animateSkills() {
    if (isInViewport(skillsSection)) {
      skillBars.forEach(bar => {
        const value = bar.getAttribute("data-value");
        bar.style.width = value + "%";
      });
      window.removeEventListener("scroll", animateSkills);
    }
  }

  window.addEventListener("scroll", animateSkills);
  animateSkills();

  // ===== AI Assistant Widget Toggle =====
  const aiBtn = document.getElementById("ai-assistant-btn");
  const aiWidget = document.getElementById("ai-assistant-widget");
  const aiCloseBtn = document.getElementById("ai-assistant-close");
  const aiMessages = aiWidget.querySelector(".ai-messages");
  const aiInput = aiWidget.querySelector("input");
  const aiSendBtn = aiWidget.querySelector("button");

  aiBtn.addEventListener("click", () => {
    aiWidget.classList.add("open");
    aiInput.disabled = false;
    aiSendBtn.disabled = false;
    aiInput.focus();
  });

  aiCloseBtn.addEventListener("click", closeAIWidget);

  function closeAIWidget() {
    aiWidget.classList.remove("open");
    aiInput.value = "";
    aiInput.disabled = true;
    aiSendBtn.disabled = true;
    aiMessages.innerHTML = "";
  }

  // ===== Close AI Assistant when clicking outside =====
  document.addEventListener("click", (e) => {
    const isClickInsideWidget = aiWidget.contains(e.target);
    const isClickOnButton = aiBtn.contains(e.target);
    if (!isClickInsideWidget && !isClickOnButton && aiWidget.classList.contains("open")) {
      closeAIWidget();
    }
  });

  // ===== AI Assistant Logic (Frontend-Only, Custom Replies) =====
  function getMockReply(message) {
    const lower = message.toLowerCase();

    // Personalized replies
    if (lower.includes("who are you") || lower.includes("your name")) {
      return "I'm Harsh Kumar's personal AI assistant. How can I help?";
    }
if(lower.includes("hi")||
lower.includes("hello")||
lower.includes("hi,Harsh")||
lower.includes("hello,Harsh")){
    return "Hello! How can I help you today?";
}
    if (
      lower.includes("harsh") ||
      lower.includes("about you") ||
      lower.includes("tell me about yourself")
    ) {
      return "Harsh Kumar is an AI-driven web developer passionate about building intelligent, beautiful web experiences.";
    }

    if (
      lower.includes("what do you do") ||
      lower.includes("what can you do") ||
      lower.includes("your work")
    ) {
      return "Harsh creates smart, user-friendly websites with modern tech and AI integration.";
    }

    if (
      lower.includes("skills") ||
      lower.includes("what are your skills")
    ) {
      return "Harsh is skilled in HTML, CSS, JavaScript, AI integration, and UI/UX design.";
    }

    if (
      lower.includes("projects") ||
      lower.includes("what are your projects")
    ) {
      return "Harsh has built an AI chatbot, a smart portfolio, and a reusable UI kit for developers.";
    }

    if (
      lower.includes("contact") ||
      lower.includes("how can i contact") ||
      lower.includes("give me contact")
    ) {
      return "You can reach Harsh Kumar through the contact form at the bottom of this page.";
    }

    if (
      lower.includes("resume") ||
      lower.includes("cv")
    ) {
      return "Harsh's resume is available on request. Please leave your email in the contact form.";
    }

    // Fallback replies
    const fallbackReplies = [
      "That's interesting! Tell me more.",
      "I'm just a frontend demo, but I'm happy to chat!",
      "Cool! Anything else you'd like to ask?",
      "Frontend magic makes me run!",
      "Ask me about Harsh Kumar’s skills or projects!"
    ];

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }

  async function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    aiInput.value = "";
    aiInput.disabled = true;
    aiSendBtn.disabled = true;

    setTimeout(() => {
      const aiReply = getMockReply(message);
      appendMessage("ai", aiReply);
      aiInput.disabled = false;
      aiSendBtn.disabled = false;
      aiInput.focus();
    }, 1000);
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("ai-message", sender === "ai" ? "ai" : "user");
    msgDiv.textContent = text;
    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  aiSendBtn.addEventListener("click", sendMessage);
  aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ===== Contact Form =====
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! Harsh will get back to you soon.");
      contactForm.reset();
    });
  }
});
