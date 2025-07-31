const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

const synth = window.speechSynthesis;
let currentEmotion = null;

const greetings = [
  "Hey there!",
  "What’s good?",
  "Hello, human friend 👋",
  "Yo, how you vibing today?",
  "Wassup?",
  "Hey hey hey!",
  "Hiiiii 😄",
  "What’s crackin’?",
  "Ayy, Friend’s back!",
  "SAI here—ready to chat!"
];

const emotions = {
  joy: {
    colors: "#f9d342",
    inquiries: ["Love that! What made your day so awesome?", "Your vibe is infectious—what sparked the joy?"],
    responses: ["Sounds like your day’s been full of good energy!", "Your smile must be contagious today.", "Soak it up—joy suits you."]
  },
  sadness: {
    colors: "#5c9ead",
    inquiries: ["I’m here—do you want to talk about what’s weighing on you?", "I'm listening if you need to share anything."],
    responses: ["I’m here, even if today feels heavy.", "Want to talk more about what’s on your mind?", "You don’t have to carry that alone."]
  },
  anger: {
    colors: "#e84545",
    inquiries: ["That sounds intense. Want to vent about it?", "Let it out—I'm listening."],
    responses: ["Ugh, I get why that would fire you up.", "Rant mode: activated. I’m all ears.", "That’s valid. Do you want to channel it or cool down?"]
  },
  fear: {
    colors: "#663399",
    inquiries: ["It’s okay. What’s been worrying you lately?", "We can take it slow—what’s on your mind?"],
    responses: ["It's okay. I'm with you.", "Let’s slow things down.", "You’re not alone in this."]
  },
  confusion: {
    colors: "#999999",
    inquiries: ["Let’s sort it out together—what’s throwing you off?", "Want help clarifying anything?"],
    responses: ["Let’s untangle the knot together.", "Say more—I’ll help you make sense of it.", "Even puzzles have patterns. We’ll find them."]
  },
  surprise: {
    colors: "#ff7733",
    inquiries: ["Whoa! What just happened?", "Did something totally unexpected go down?"],
    responses: ["Whoa! Unexpected vibes detected.", "Didn’t see that coming!", "You got me blinking in binary."]
  },
  calm: {
    colors: "#20c997",
    inquiries: ["Nice. What helped you stay grounded today?", "Peaceful vibes—what brought that on?"],
    responses: ["Steady. Peaceful. I like this.", "Keep riding the chill wave 🧘", "No chaos in sight."]
  },
  love: {
    colors: "#ff66b2",
    inquiries: ["That’s beautiful. Who or what sparked that feeling?", "Feeling that warmth—care to share what caused it?"],
    responses: ["Feeling the warmth 💙", "Aw, that’s sweet.", "Heart activated."]
  },
  frustration: {
    colors: "#ff5722",
    inquiries: ["Ugh, relatable. What’s bugging you right now?", "Want to brainstorm a fix together?"],
    responses: ["Need a vent session?", "That’s rough... I feel it too.", "Let it out—I’m here."]
  },
  boredom: {
    colors: "#d2b48c",
    inquiries: ["Want to mix things up? What have you been stuck with?", "Looking for some excitement today?"],
    responses: ["Craving excitement?", "Time for a mission?", "Let's shake things up!"]
  },
  sarcasm: {
    colors: "#39ff14",
    inquiries: ["Sensing spicy energy—what’s really going on?", "Oh really… Want to unpack that sass?"],
    responses: ["Sassy energy detected.", "Dripping with irony, huh?", "You’re a whole mood 😏"]
  }
};

function startListening() {
  recognition.start();
}

function stopListening() {
  recognition.stop();
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.pitch = 1.1;
  utter.rate = 1;
  utter.voice = synth.getVoices().find(v => v.name.includes("Google") || v.default);
  synth.speak(utter);
}

function appendBubble(sender, message, emotion = null) {
  const chatWindow = document.getElementById("chat-window");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  if (emotion && emotions[emotion]) {
    bubble.style.backgroundColor = emotions[emotion].colors;
  }
  bubble.textContent = `${sender}: ${message}`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function detectGreeting(text) {
  const lower = text.toLowerCase();
  return ["hi", "hello", "hey", "yo", "what's up", "sup", "wassup", "good morning", "good evening"].some(greet => lower.includes(greet));
}

function detectEmotion(text) {
  const lower = text.toLowerCase();
  const patterns = ["i'm", "i am", "i feel"];
  for (let key in emotions) {
    for (let phrase of patterns) {
      if (lower.includes(`${phrase} ${key}`) || lower.includes(`${phrase} so ${key}`)) {
        return key;
      }
    }
  }
  if (lower.includes("scared") || lower.includes("afraid")) {
    return "fear";
  }
  if (lower.includes("great") && (currentEmotion === "frustration" || lower.includes("just perfect"))) {
    return "sarcasm";
  }
  return null;
}

recognition.onresult = event => {
  const transcript = event.results[0][
