import { Either } from "@/shared/Either";

describe("Either", () => {
  it("should create a left instance with the correct value", () => {
    const leftValue = "Error";
    const either = Either.left<string, number>(leftValue);

    expect(either.isLeft()).toBe(true);
    expect(either.isRight()).toBe(false);
    expect(either.getLeft()).toBe(leftValue);
    expect(either.getRight()).toBeUndefined();
  });

  it("should create a right instance with the correct value", () => {
    const rightValue = 42;
    const either = Either.right<string, number>(rightValue);

    expect(either.isRight()).toBe(true);
    expect(either.isLeft()).toBe(false);
    expect(either.getRight()).toBe(rightValue);
    expect(either.getLeft()).toBeUndefined();
  });

  it("should return undefined for getLeft on a right instance", () => {
    const rightValue = 42;
    const either = Either.right<string, number>(rightValue);

    expect(either.getLeft()).toBeUndefined();
  });

  it("should return undefined for getRight on a left instance", () => {
    const leftValue = "Error";
    const either = Either.left<string, number>(leftValue);

    expect(either.getRight()).toBeUndefined();
  });

  it("should handle complex types in left and right", () => {
    const leftValue = { error: "Not Found" };
    const rightValue = { data: [1, 2, 3] };

    const leftEither = Either.left<typeof leftValue, typeof rightValue>(leftValue);
    const rightEither = Either.right<typeof leftValue, typeof rightValue>(rightValue);

    expect(leftEither.isLeft()).toBe(true);
    expect(leftEither.getLeft()).toEqual(leftValue);
    expect(leftEither.getRight()).toBeUndefined();

    expect(rightEither.isRight()).toBe(true);
    expect(rightEither.getRight()).toEqual(rightValue);
    expect(rightEither.getLeft()).toBeUndefined();
  });
});
