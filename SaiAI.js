import { detectSupportMood } from './SaiSupportTrigger.js';
import { supportVault } from './SaiSupportVault.js';
import { detectMoodTone } from './SaiMoodTrigger.js';
import { moodVault } from './SaiMoodVault.js';

export function respondToMessage(userMessage) {
  const supportMood = detectSupportMood(userMessage);
  const moodTone = detectMoodTone(userMessage);

  if (supportMood && supportVault[supportMood]) {
    return randomLine(supportVault[supportMood]);
  }

  if (moodTone && moodVault[moodTone]) {
    return randomLine(moodVault[moodTone]);
  }

  return standardResponseFlow(userMessage);
}

function randomLine(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

