/**
 * Provides haptic feedback on supported devices
 */
export const triggerHaptic = (type: 'success' | 'error' | 'light' = 'success') => {
  if ('vibrate' in navigator) {
    switch (type) {
      case 'success':
        navigator.vibrate([50, 30, 50]); // Short-pause-short pattern
        break;
      case 'error':
        navigator.vibrate([100]); // Single longer vibration
        break;
      case 'light':
        navigator.vibrate(10); // Very light tap
        break;
    }
  }
};

/**
 * Plays a subtle beep sound for scan success
 */
export const playBeep = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800; // 800Hz tone
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};