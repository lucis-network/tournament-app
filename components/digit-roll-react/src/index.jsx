import React, { PureComponent } from 'react'
import Slice from './Slice'
import { formatDigit } from './util'
import s from './default.module.css'
// import './default.css'

export default class DigitRoll extends PureComponent {
  render() {
    const { num, length, height, width, divider = '', rollingDuration, oneRoundDuration, className } = this.props
    const numArr = formatDigit(num, length, divider)
    const validDivider = divider !== undefined && (typeof divider === 'string' || typeof divider === 'number')

    return (
      <div className={s.DigitRoll__Out} style={{ display: 'flex' }}>
        <div className={`${s.DigitRoll} ${className}`} style={{ height: height + 'rem' }}>
          {numArr.map((d, index) => {
            if (validDivider && index % 4 === 3) {
              return <Divider key={index} divider={divider} height={height} />
            }
            return (
              <Slice
                key={index}
                height={height} width={width}
                digit={d}
                rollingDuration={rollingDuration}
                oneRoundDuration={oneRoundDuration}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

DigitRoll.defaultProps = {
  num: '000000',
  height: 3,
  width: 2,
  rollingDuration: 5000,  // all rolling duration
  oneRoundDuration: 1000, // rolling duration per ten digit: 0-9
  className: '',
}

const Divider = ({ divider, height }) => (
  <div style={{ height: height + 'rem' }} className={s.DigitRoll__Divider}>
    {divider}
  </div>
)
