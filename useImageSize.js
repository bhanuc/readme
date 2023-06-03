import { useState, useEffect } from 'react';
import { Image } from 'react-native';

export default function useImageSize(imgUri) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    Image.getSize(
      imgUri,
      (width, height) => setSize({ width, height }),
      setError
    );
  }, []);
  return [size, error];
}