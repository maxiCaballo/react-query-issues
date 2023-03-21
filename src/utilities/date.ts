export function daysPassedSince(date: string): Number {
  const oldDate = new Date(date);
  const today = new Date();
  console.log(today);

  const msInOneDay = 1000 * 60 * 60 * 24;
  const differenceInMs = today.getTime() - oldDate.getTime();

  return Math.floor(differenceInMs / msInOneDay);
}
