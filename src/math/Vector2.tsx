/**
 * A 2-dimensional vector.
 */
export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  setX(x: number): this {
    this.x = x;
    return this;
  }

  setY(y: number): this {
    this.y = y;
    return this;
  }

  /** Return a copy of this vector. */
  clone() {
    return new Vector2(this.x, this.y);
  }

  /** Return true if two vectors are equal. */
  equals(other: Vector2): boolean {
    return this.x == other.x && this.y == other.y;
  }

  /** Return the sum of two vectors. */
  add(other: Vector2): this {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  addScalar(other: number): this {
    this.x += other;
    this.y += other;
    return this;
  }

  /** Return the component-wise product of two vectors. */
  multiply(other: Vector2): this {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }

  multiplyScalar(other: number): this {
    this.x *= other;
    this.y *= other;
    return this;
  }

  divide(other: Vector2): this {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }

  divideScalar(other: number): this {
    return this.multiplyScalar(1 / other);
  }

  /** Return the dot product of two vectors. */
  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  /** Return the squared length of the vector. */
  lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /** Return the length of the vector. */
  length(): number {
    return Math.sqrt(this.lengthSq());
  }

  /** Clamp this vector to a min and max vector. */
  clamp(min: Vector2, max: Vector2): this {
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    return this;
  }

  /** Return this vector rounded to integers. */
  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  normalize(): this {
    return this.divideScalar(this.length() || 1);
  }

  static fromArray(array: Array<number>): Vector2 {
    return new Vector2(array[0], array[1]);
  }

  static random() {
    return new Vector2(Math.random(), Math.random());
  }
}
