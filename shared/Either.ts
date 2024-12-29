/**
 * La clase `Either` es una implementación de un tipo algebraico que puede contener
 * un valor de tipo izquierdo (`L`) o derecho (`R`). Se utiliza principalmente
 * para manejar casos en los que una operación puede fallar (con el valor izquierdo)
 * o tener éxito (con el valor derecho).
 * 
 * @template L - Tipo de valor izquierdo, generalmente usado para representar errores.
 * @template R - Tipo de valor derecho, generalmente usado para representar valores exitosos.
 */
export class Either<L, R> {
    // Almacena el valor de la izquierda (si existe)
    private constructor(private leftValue?: L, private rightValue?: R) {}
  
    /**
   * Crea un `Either` con un valor de tipo izquierdo.
   * 
   * @param value - El valor que representa el error o el caso de fallo.
   * @returns Una instancia de `Either` con el valor izquierdo.
   */
    static left<L, R>(value: L): Either<L, R> {
      return new Either<L, R>(value, undefined);
    }
  
    /**
   * Crea un `Either` con un valor de tipo derecho.
   * 
   * @param value - El valor que representa el resultado exitoso.
   * @returns Una instancia de `Either` con el valor derecho.
   */
    static right<L, R>(value: R): Either<L, R> {
      return new Either<L, R>(undefined, value);
    }
  
    /**
   * Verifica si el valor almacenado es de tipo izquierdo.
   * 
   * @returns `true` si el valor es izquierdo, `false` si es derecho.
   */
    isLeft(): boolean {
      return this.leftValue !== undefined;
    }
  
    /**
   * Verifica si el valor almacenado es de tipo derecho.
   * 
   * @returns `true` si el valor es derecho, `false` si es izquierdo.
   */
    isRight(): boolean {
      return this.rightValue !== undefined;
    }
  
    /**
   * Obtiene el valor izquierdo si existe.
   * 
   * @returns El valor izquierdo o `undefined` si no existe.
   */
    getLeft(): L | undefined {
      return this.leftValue;
    }
  
    /**
   * Obtiene el valor derecho si existe.
   * 
   * @returns El valor derecho o `undefined` si no existe.
   */
    getRight(): R | undefined {
      return this.rightValue;
    }
  }
  