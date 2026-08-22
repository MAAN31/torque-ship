/** 1-indexed calendar quarter for the given date (Jan–Mar = 1 … Oct–Dec = 4). */
export function currentQuarter(date: Date = new Date()): 1 | 2 | 3 | 4 {
  return (Math.floor(date.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
}
