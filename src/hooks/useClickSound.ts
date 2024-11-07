
import { useCallback, useEffect } from 'react';

const useClickSound = (soundFile = '/audio/clickSound.wav') => {
  const playSound = useCallback(() => {
    const audio = new Audio(soundFile);
    audio.volume = 0.5; 
    audio.play();
  }, [soundFile]);

  return playSound;
};

export default useClickSound;
