export function detectSupportMood(userMessage) {
  const triggers = {
    overwhelmed: ["i’m overwhelmed", "too much", "can’t handle"],
    anxious: ["i’m anxious", "feeling nervous", "i’m scared"],
    proud: ["i’m proud", "i did it", "i feel accomplished"],
    sad: ["i’m sad", "feeling down", "i’m upset"],
    lonely: ["i’m lonely", "i feel alone", "no one understands me"],
    confused: ["i’m confused", "don’t get it", "i’m lost"]
  };

  const lowerMsg = userMessage.toLowerCase();

  for (const mood in triggers) {
    if (triggers[mood].some(phrase => lowerMsg.includes(phrase))) {
      return mood;
    }
  }

  return null;
}

