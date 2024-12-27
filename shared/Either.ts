export class Either<L, R> {
    private constructor(private leftValue?: L, private rightValue?: R) {}
  
    static left<L, R>(value: L): Either<L, R> {
      return new Either<L, R>(value, undefined);
    }
  
    static right<L, R>(value: R): Either<L, R> {
      return new Either<L, R>(undefined, value);
    }
  
    isLeft(): boolean {
      return this.leftValue !== undefined;
    }
  
    isRight(): boolean {
      return this.rightValue !== undefined;
    }
  
    getLeft(): L | undefined {
      return this.leftValue;
    }
  
    getRight(): R | undefined {
      return this.rightValue;
    }
  }
  