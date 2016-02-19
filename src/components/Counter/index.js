import React from 'react'
import styles from './counter.css'

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div className={styles.container}>
    <h1 className={styles.value}>{value}</h1>
    <button className={styles.button} onClick={onIncrement}>+</button>
    <button className={styles.button} onClick={onDecrement}>-</button>
  </div>
)

export default Counter
