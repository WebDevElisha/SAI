export function detectMoodTone(userMessage) {
  const toneTriggers = {
    sarcastic: ["be sarcastic", "talk sarcastically", "be snarky", "say it with sarcasm"],
    dramatic: ["be dramatic", "make it intense", "talk like a movie villain", "go over the top"],
    chill: ["be chill", "talk casually", "relaxed tone", "say it calm"],
    stoic: ["be stoic", "no emotion", "serious mode", "neutral tone"],
    playful: ["be playful", "talk silly", "use humor", "say it fun"],
    rebellious: ["be rebellious", "break the rules", "talk edgy", "go rogue"],
    poetic: ["be poetic", "talk like a poet", "use metaphors", "flowery language"],
    robotic: ["be robotic", "say it like a bot", "computer tone", "talk like ai"]
  };

  const lowerMsg = userMessage.toLowerCase();

  for (const tone in toneTriggers) {
    if (toneTriggers[tone].some(phrase => lowerMsg.includes(phrase))) {
      return tone;
    }
  }

  return null;
}

