const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Numeral romano de 1 a 10 (rótulos das seções); fora disso devolve o número como texto. */
export function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}
