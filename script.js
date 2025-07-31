// script.js

// Voice Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

// Speech Output
function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.pitch = 1.1;
  utter.rate = 1;
  utter.voice = synth.getVoices().find(v => v.name.includes("Google") || v.default);
  synth.speak(utter);
}

// Voice Activation
function startListening() {
  recognition.start();
}

// Chat Display
function appendBubble(sender, message) {
  const chatWindow = document.getElementById("chat-window");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = `${sender}: ${message}`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// SAI Logic
function getSAIResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes("hello")) return "Hey Friend! What’s the mission today?";
  if (lower.includes("sad")) return "Hmm, I sense a frown. Let's change that.";
  if (lower.includes("angry")) return "Deep breath. Smash a pillow. You're safe here.";
  if (lower.includes("happy")) return "Yes! Joy levels detected. Carry on!";
  if (lower.includes("who are you")) return "I'm SAI. Your Emotional companion.";
  return "Interesting... I'm listening.";
}

// Response Trigger
recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;
  appendBubble("You", transcript);
  const response = getSAIResponse(transcript);
  speak(response);
  appendBubble("SAI", response);
};

recognition.onerror = event => {
  console.error("Speech recognition error:", event.error);
};
