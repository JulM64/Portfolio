import { useState, useEffect, useRef, useCallback } from 'react';

interface LoadingGate {
  isLoaded: boolean;
  reportReady: () => void;
}

export function useLoadingGate(minimumDelay = 1500): LoadingGate {
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesLoadedRef = useRef(false);
  const sceneReadyRef = useRef(false);
  const timerDoneRef = useRef(false);
  const hasResolved = useRef(false);

  const checkAllReady = useCallback(() => {
    if (hasResolved.current) return;
    if (imagesLoadedRef.current && sceneReadyRef.current && timerDoneRef.current) {
      hasResolved.current = true;
      setIsLoaded(true);
    }
  }, []);

  const reportReady = useCallback(() => {
    sceneReadyRef.current = true;
    checkAllReady();
  }, [checkAllReady]);

  useEffect(() => {
    // Timer
    const timer = setTimeout(() => {
      timerDoneRef.current = true;
      checkAllReady();
    }, minimumDelay);

    // Images check
    const images = document.querySelectorAll('img');
    if (images.length === 0) {
      imagesLoadedRef.current = true;
      checkAllReady();
    } else {
      let loaded = 0;
      const total = images.length;
      const onLoad = () => {
        loaded++;
        if (loaded >= total) {
          imagesLoadedRef.current = true;
          checkAllReady();
        }
      };
      images.forEach((img) => {
        if (img.complete) {
          onLoad();
        } else {
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onLoad);
        }
      });
    }

    return () => clearTimeout(timer);
  }, [minimumDelay, checkAllReady]);

  return { isLoaded, reportReady };
}
