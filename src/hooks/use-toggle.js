import { useState } from 'react';

export default function useToggle(initialValue) {
  const [value, setValue] = useState(!!initialValue);
  return [value, (newForcedValue) => setValue(newForcedValue ?? ((currentValue) => !currentValue))];
}
