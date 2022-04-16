import numeral from 'numeral'
import {isClientDevMode} from "./Env";

type NumberFormatOption = {
  // whether to show +/- sign before formatter number
  sign?: boolean
  separator?: string
  // trim non-meaningful zero character
  zero_trim?: boolean
  // no round: Eg: in case of decimal = 2  ==>  0.129 will not be rounded to 0.13
  no_round?: boolean
}

export function currency(num: number, decimal = 0): string {
  return format(num, decimal)
}

export function format(num: number, decimal = 0, option?: NumberFormatOption): string {
  // format with thousand separator
  let format = '0,0';
  if (decimal > 0) {
    // 0,0.00
    format += '.'.padEnd(decimal + 1, '0')
  }

  if (option?.no_round) {
    throw new Error("option.no_round was not implemented")
  }

  let s = numeral(num).format(format);

  if (option) {
    if (option.zero_trim) {
      s = s.replace(/0+$/, '')
    }

    if (option.separator) {
      s = s.replace(/,/g, option.separator)
    }

    // remove redundant 0 character
    if (option.sign && num > 0) {
      s = '+' + s
    }
  }

  return s
}


if (isClientDevMode) {
  const test_cases: {
    input: {
      num?: number,
      decimal?: number,
      option?: NumberFormatOption,
    },
    expected: string,
    msg: string,
  }[] = [
    {
      msg: 'Can format regular case',
      input: {
        num: 12345678.12600,
        decimal: 2,
      },
      expected: '12,345,678.13',
    },
    {
      msg: 'Can show sign and separator',
      input: {
        num: 12345678.12999,
        decimal: 3,
        option: {sign: true, separator: '_'},
      },
      expected: '+12_345_678.130',
    },
    {
      msg: 'Can show sign with negative number',
      input: {
        num: -12345678.12999,
        decimal: 3,
        option: {sign: true, separator: '_'},
      },
      expected: '-12_345_678.130',
    },
    {
      msg: 'No round up',
      input: {
        num: 12345678.12999,
        decimal: 3,
        option: {sign: true, separator: '_', no_round: true},
      },
      expected: '+12_345_678.129',
    },
    {
      msg: 'Can trim non-meaningful 0',
      input: {
        num: 12345678.12600012312,
        decimal: 5,
        option: {zero_trim: true},
      },
      expected: '12,345,678.126',
    },
  ]

  // @ts-ignore
  window.tmp__Number_format_test = function test() {
    for (let i = 0, c = test_cases.length; i < c; i++) {
      const test_case = test_cases[i];
      let actual;
      try {
        // @ts-ignore
        actual = format(...Object.values(test_case.input))
      } catch (e) {
        console.error(e)
      }

      if (actual === test_case.expected) {
        // pass
        console.info('%cPASS: ', 'color: green', {
          ...test_case,
          actual,
        });
      } else {
        // fail
        console.error('%cFAILED: ', 'color: red', {
          ...test_case,
          actual,
        });
      }
    }
  }
}
