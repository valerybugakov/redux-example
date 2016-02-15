import React from 'react'

const Button = ({ onIncrement, onDecrement }) => (
  <div>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

export default Button
