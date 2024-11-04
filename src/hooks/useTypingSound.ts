import { useCallback } from 'react';

const useTypingSound = (soundFile = '/audio/keyDown.mp3') => {
  const playSound = useCallback(() => {
    const audio = new Audio(soundFile);
    audio.volume = 0.5; 
    audio.play();
  }, [soundFile]);

  return playSound;
};

export default useTypingSound;
