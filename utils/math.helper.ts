import BN, { BigNumber } from "bignumber.js";

export class KMath {
  public static toString(num: number) {
    return num.toLocaleString("fullwide", { useGrouping: false });
  }

  public static getBN(t: string | number | BigNumber) {
    if (typeof t == "object") {
      return new BN(t.toString());
    }
    return new BN(t);
  }

  public static toNumber(t?: string | number | BigNumber) {
    if (t == null) {
      return 0;
    }
    return (
      typeof t === "string" ? new BN(t) : new BN(t.toString())
    ).toNumber();
  }

  public static isPositive(t: any) {
    const b = typeof t === "string" ? this.getBN(t) : t;
    return !b.isZero() && b.isPositive();
  }

  public static isLessThan(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.isLessThan(bnB);
  }

  public static mul(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.multipliedBy(bnB);
  }
  public static div(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.dividedBy(bnB);
  }

  public static pow(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.pow(bnB);
  }

  public static plus(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.plus(bnB);
  }

  public static minus(
    numberA: string | number | BigNumber,
    numberB: string | number | BigNumber
  ) {
    const bnA = this.getBN(numberA);
    const bnB = this.getBN(numberB);
    return bnA.minus(bnB);
  }
}
