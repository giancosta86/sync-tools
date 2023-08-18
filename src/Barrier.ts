export type Barrier = Promise<void>;

export type BarrierBody = (
  addToken: () => void,
  reject: (reason?: unknown) => void
) => void;

export function createBarrier(
  requiredTokens: number,
  barrierBody: BarrierBody
): Barrier {
  if (requiredTokens <= 0 || !Number.isInteger(requiredTokens)) {
    throw new Error("The required number of tokens must be integer and >= 1");
  }

  return new Promise<void>((resolve, reject) => {
    let tokens = 0;

    const addToken = () => {
      if (++tokens == requiredTokens) {
        resolve();
      }
    };

    barrierBody(addToken, reject);
  });
}
