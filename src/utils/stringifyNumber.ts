export const stringifyNumber = (n: number) => {
  const special = [
    "zeroth",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
  ];
  const deca = [
    "twent",
    "thirt",
    "fort",
    "fift",
    "sixt",
    "sevent",
    "eight",
    "ninet",
  ];

  if (n < 0 || n >= 100) {
    throw new Error(
      `Invalid argument '${n}' was provided to 'stringifyNumber'. Expected: 0 <= n < 100`
    );
  }
  if (n < 20) {
    return special[n];
  }
  if (n % 10 === 0) {
    return deca[Math.floor(n / 10) - 2] + "ieth";
  }
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
};

export const numberOrderingSufix = (n: number) => {
  const a = stringifyNumber(n);
  return a.substring(a.length - 2); // :)
};

export const numberOrdering = (n: number) => `${n}${numberOrderingSufix(n)}`;
