import { createBarrier } from "./Barrier";

describe("Barrier", () => {
  describe("when passing zero required tokens", () => {
    it("should throw", () => {
      expect(() => createBarrier(0, () => {})).toThrow(
        "The required number of tokens must be integer and >= 1"
      );
    });
  });

  describe("when passing a negative number of required tokens", () => {
    it("should throw", () => {
      expect(() => createBarrier(-7, () => {})).toThrow(
        "The required number of tokens must be integer and >= 1"
      );
    });
  });

  describe("when passing a non-integer number of required tokens", () => {
    it("should throw", () => {
      expect(() => createBarrier(3.5, () => {})).toThrow(
        "The required number of tokens must be integer and >= 1"
      );
    });
  });

  describe("when passing the requested number of tokens", () => {
    it("should resolve", () =>
      createBarrier(3, addToken => {
        addToken();
        addToken();
        addToken();
      }));
  });

  describe("when rejecting with a constant value within the barrier's body", () => {
    it("should reject", () => {
      const errorMessage = "This is my test error message";

      const barrier = createBarrier(3, (addToken, reject) => {
        addToken();
        addToken();
        reject(errorMessage);
      });

      return expect(barrier).rejects.toBe(errorMessage);
    });
  });

  describe("when throwing within the barrier's body", () => {
    it("should reject", () => {
      const errorMessage = "This is my test error";

      const barrier = createBarrier(3, addToken => {
        addToken();
        addToken();
        throw new Error(errorMessage);
      });

      return expect(barrier).rejects.toThrow(errorMessage);
    });
  });
});
