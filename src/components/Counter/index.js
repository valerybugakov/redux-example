import React from 'react'
import { connect } from 'react-redux'
import { onIncrement, onDecrement } from 'actions/counter'
import styles from './counter.css'

const Counter = ({
  index,
  value,
  removeItem,
  onIncrementClick,
  onDecrementClick
}) => {
  const onDeleteClick = () => removeItem(index)

  return (
    <div className={styles.container}>
      <h1 className={styles.value}>{value}</h1>
      <button className={styles.button} onClick={onIncrementClick}>+</button>
      <button className={styles.button} onClick={onDecrementClick}>-</button>
      <button className={styles.button} onClick={onDeleteClick}>Delete</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onIncrementClick: () => {
    dispatch(onIncrement(ownProps.index))
  },
  onDecrementClick: () => {
    dispatch(onDecrement(ownProps.index))
  },
})

export default connect(null, mapDispatchToProps)(Counter)
