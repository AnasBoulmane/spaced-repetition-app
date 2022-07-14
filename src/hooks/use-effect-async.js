import { useEffect } from 'react';

export default function useEffectAsync(asyncEffect, deps) {
  useEffect(() => {
    asyncEffect && asyncEffect();
  }, deps);
}
