import { useState } from 'react';

export function Button({ title, onClick }) {
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount(count + 1);
    onClick();
  };
  return <button onClick={handleClick}>{title}</button>;
}
