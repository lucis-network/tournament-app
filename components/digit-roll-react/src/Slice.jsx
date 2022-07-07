import React, { PureComponent } from 'react'
import { getArr } from './util'
import s from './default.module.css'

export default class Slice extends PureComponent {
  state = {
    offset: 0,
    isRolling: false,
    prevDigit: 0,
  }

  componentDidMount = () => {
    const { digit, height, canRoll } = this.props

    const offset = canRoll === false ? 0 : -digit * height
    setTimeout(() => {
      this.setState({ offset, isRolling: true })
    }, 100)
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.digit !== this.props.digit) {
      this.reset(this.props.digit)

      const { rollingDuration, oneRoundDuration, canRoll} = this.props;
      const { isRolling } = this.state;

      const extra = Math.floor(rollingDuration / oneRoundDuration);

      //slice move in animation
      let diff = nextProps.digit - this.props.digit
      diff += 10 * extra

      const offset = (!isRolling && canRoll === false) ? 0 : (
        diff > 0
        ? -diff * this.props.height
        : -(diff + 10) * this.props.height
      )

      setTimeout(() => {
        this.setState({ offset, isRolling: true })
      }, 100)
    }
  }

  reset = prevDigit => {
    this.setState({ offset: 0, isRolling: false, prevDigit })
  }
  render() {
    const {
      digit, width, height,
      rollingDuration, oneRoundDuration, rolling: canRoll,
    } = this.props

    const { isRolling } = this.state;

    const extra = Math.floor(rollingDuration / oneRoundDuration);
    const arr = (!isRolling && canRoll === false)
      ? [digit]
      : getArr(this.state.prevDigit, digit, extra);
    //console.log('{Slice} arr: ', arr);

    return (
      <div
        className={s.DigitRoll__Slice}
        style={{
          marginTop: this.state.offset + 'rem',
          transition: isRolling ? `margin ${rollingDuration}ms ease` : '',
        }}
      >
        {arr.map((d, index) => (
          <div
            key={index}
            className={s.DigitRoll__Cell}
            style={{ height: height + 'rem', width: width + 'rem' }}
          >
            {d}
          </div>
        ))}
      </div>
    )
  }
}
