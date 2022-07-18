import { useEffect } from 'react';

export default function useAsyncEffect(asyncEffect, deps) {
  useEffect(() => {
    asyncEffect && asyncEffect();
  }, deps);
}
