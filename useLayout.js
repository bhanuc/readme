import { useCallback, useState } from 'react';

const defaultInitVal = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default function useLayout(
  initialVal
){
  initialVal = initialVal || {};
  const [size, setSize] = useState({
    ...defaultInitVal,
    ...initialVal,
  } );

  const onLayout = useCallback((e) => {
    const layout = e.nativeEvent.layout;
    setSize(layout);
  }, []);
  return [size, onLayout];
}