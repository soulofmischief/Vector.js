const o = require( 'ospec' )
const Vector = require( '../src')

const
  v1 = new Vector( 1, 2, 3 ),
  v2 = new Vector( 4, 5, 6 )

o.spec( 'Instance methods', function () {
  o( 'addition', function () {
    o( v1.add( 1 ).equals( new Vector( 2, 3, 4 )))
      .equals( true ) `Scalar addition`

    o( v1.add( v2 ).equals( new Vector( 5, 7, 9 )))
      .equals( true ) `Vector addition`
  })

  o( 'subtraction', function () {
    o( v1.subtract( 1 ).equals( new Vector( 0, 1, 2 )))
      .equals( true ) `Scalar subtraction`

    o( v1.subtract( v2 ).equals( new Vector( -3, -3, -3 )))
      .equals( true ) `Vector subtraction`
  })
})


o.spec( 'Static methods', function () {
  o( 'addition', function () {
    o( Vector.add( v1, 1 ).equals( new Vector( 2, 3, 4 )))
      .equals( true ) `Scalar addition`

    o( Vector.add( v1, v2 ).equals( new Vector( 5, 7, 9 )))
      .equals( true ) `Vector addition`
  })

  o( 'subtraction', function () {
    o( Vector.subtract( v1, 1 ).equals( new Vector( 0, 1, 2 )))
      .equals( true ) `Scalar subtraction`

    o( Vector.subtract( v1, v2 ).equals( new Vector( -3, -3, -3 )))
      .equals( true ) `Vector subtraction`
  })
})
