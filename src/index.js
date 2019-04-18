// @flow strict
/**
 * Vector.js
 *
 * A small 3D Vector class written in ES6+Flow
 *
 * Based on original implementation by Evan Wallace
 * @see https://evanw.github.io/lightgl.js/docs/vector.html
 * @see https://github.com/evanw
*/


module.exports = class Vector {
  x: number
  y: number
  z: number

  constructor( x: number, y: number, z?: number ) {
    Object.assign( this, {
      x: x || 0,
      y: y || 0,
      z: z || 0
    })
  }

  /** Vector operations */

  static add( a: Vector, b: Vector, c: Vector = new Vector( 0,0,0 )) {
    if ( b instanceof Vector ) {
      c.x = a.x + b.x
      c.y = a.y + b.y
      c.z = a.z + b.z
    }
    else {
      c.x = a.x + b
      c.y = a.y + b
      c.z = a.z + b
    }
    return c
  }

  static subtract( a: Vector, b: Vector, c: Vector = new Vector( 0,0,0 )) {
    if ( b instanceof Vector ) {
      c.x = a.x - b.x
      c.y = a.y - b.y
      c.z = a.z - b.z
    }
    else {
      c.x = a.x - b
      c.y = a.y - b
      c.z = a.z - b
    }
    return c
  }

  static multiply( a: Vector, b: Vector | number, c: Vector = new Vector( 0,0,0 )) {
    if ( b instanceof Vector ) {
      c.x = a.x * b.x
      c.y = a.y * b.y
      c.z = a.z * b.z
    }
    else {
      c.x = a.x * b
      c.y = a.y * b
      c.z = a.z * b
    }
    return c
  }

  static divide( a: Vector, b: Vector, c: Vector = new Vector( 0,0,0 )) {
    if ( b instanceof Vector ) {
      c.x = a.x / b.x
      c.y = a.y / b.y
      c.z = a.z / b.z
    }
    else {
      c.x = a.x / b
      c.y = a.y / b
      c.z = a.z / b
    }
    return c
  }

  static cross( a: Vector, b: Vector, c: Vector = new Vector( 0,0,0 )) {
    c.x = a.y * b.z - a.z * b.y
    c.y = a.z * b.x - a.x * b.z
    c.z = a.x * b.y - a.y * b.x
    return c
  }

  // Return a vector comprising of the largest of A and B's components.
  static max( a: Vector, b: Vector ) {
    return new Vector(
      Math.max( a.x, b.x ),
      Math.max( a.y, b.y ),
      Math.max( a.z, b.z ),
    )
  }

  // Return a vector comprising of the smallest of A and B's components.
  static min( a: Vector, b: Vector ) {
    return new Vector(
      Math.min( a.x, b.x ),
      Math.min( a.y, b.y ),
      Math.min( a.z, b.z ),
    )
  }

  static negative( a: Vector, b: Vector = new Vector( 0,0,0 )) {
    b.x = -a.x; b.y = -a.y; b.z = -a.z
    return b
  }

  static unit( a: Vector, b: Vector = new Vector( 0,0,0 )) {
    const length = a.length()
    b.x = a.x / length
    b.y = a.y / length
    b.z = a.z / length
    return b
  }


  /** Scalar operations */

  // Calculate the angle between two vectors.
  static angleBetween( a: Vector, b: Vector ) {
    return a.angleTo( b )
  }

  // Calculate the angle needed to point in the direction of another angle.
  static angleTo( a: Vector, b: Vector ) {
    return Math.acos( a.dot( b ) / ( a.length() * b.length()))
  }

  // Algebraically, the dot product is the sum of the products
  // of the corresponding entries of two vectors.
  // Geometrically, it's the product of the Euclidean magnitudes
  // of two vectors and the cosine of the angle between them.
  // It allows us insight into the similarity between the components of
  // two vectors. The dot product of two normalized vectors is the length
  // of one vector projected onto the other.
  static dot( a: Vector, b: Vector ) {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }

  static length = this.magnitude

  // Linearly interpolate between two vectors using the ratio `0 <= t <= 1`
  static lerp( a: Vector, b: Vector, t: number ) {
    return a.multiply( 1 - t ).add( b.multiply( t ))
  }

  // Size / length / Euclidean norm
  static magnitude( a: Vector ) {
    return Math.sqrt( a.dot( a ))
  }


  /** Comparisons */

  static equals( a: Vector, b: Vector ) {
    return a.x === b.x && a.y === b.y && a.z === b.z
  }


  /** Constructors */

  // Create vector from a vector array in the form of `[x,y,z]`
  static fromArray( a: number[]) {
    return new Vector( a[0], a[1], a[2])
  }

  // Create vector from a set of spherical coordinate angles.
  static fromPhiTheta( phi: number, theta: number ) {
    return new Vector(
      Math.cos( phi ) * Math.cos( theta ),
      Math.sin( phi ),
      Math.cos( phi ) * Math.sin( theta ),
    )
  }

  // Create vector from a vector object in the form of `{x,y,z}`
  static fromVector( v: Vector ): Vector {
    /* $FlowFixMe nullish */
    return new Vector( v.x || 0, v.y || 0, v.z || 0 )
  }

  // Returns a vector with a length of 1 and a statistically uniform direction.
  static randomDirection() {
    return Vector.fromPhiTheta(
      Math.asin( Math.random() * 2 - 1 ),
      Math.random() * Math.PI * 2,
    )
  }


  /** Vector operations */

  add( v: Vector | number ) {
    if ( v instanceof Vector )
      return new Vector( this.x + v.x, this.y + v.y, this.z + v.z )
    else
      return new Vector( this.x + v, this.y + v, this.z + v )
  }

  subtract( v: Vector | number ) {
    if ( v instanceof Vector )
      return new Vector( this.x - v.x, this.y - v.y, this.z - v.z )
    else
      return new Vector( this.x - v, this.y - v, this.z - v )
  }

  multiply( v: Vector | number ) {
    if ( v instanceof Vector )
      return new Vector( this.x * v.x, this.y * v.y, this.z * v.z )
    else
      return new Vector( this.x * v, this.y * v, this.z * v )
  }

  divide( v: Vector | number ) {
    if ( v instanceof Vector )
      return new Vector( this.x / v.x, this.y / v.y, this.z / v.z )
    else
      return new Vector( this.x / v, this.y / v, this.z / v )
  }

  cross( v: Vector ) {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }

  negative() {
    return new Vector( -this.x, -this.y, -this.z )
  }

  unit() {
    return this.divide( this.length())
  }


  /** Scalar operations */

  angleTo( a: Vector ) {
    return Math.acos( this.dot( a ) / ( this.length() * a.length()))
  }

  dot( v: Vector ) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  length = this.magnitude

  magnitude() {
    return Math.sqrt( this.dot( this ))
  }

  // Returns largest component
  max() {
    return Math.max( Math.max( this.x, this.y ), this.z )
  }

  // Returns smallest component
  min() {
    return Math.min( Math.min( this.x, this.y ), this.z )
  }


  /** Comparisons */

  equals( v: Vector ) {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }


  /** Constructors */

  clone() {
    return new Vector( this.x, this.y, this.z )
  }

  init( x: number, y: number, z: number ) {
    this.x = x; this.y = y; this.z = z
    return this
  }

  /** Conversion */

  // @see https://en.wikipedia.org/wiki/Spherical_coordinate_system#Coordinate_system_conversions
  toPhiTheta() {
    return {
      phi: Math.asin( this.y / this.length()),
      theta: Math.atan2( this.z, this.x )
    }
  }

  toArray( n: number ): number[] {
    // Return an array containing n=[0,3] coordinates
    return [ this.x, this.y, this.z ].slice( 0, n || 3 )
  }
}
