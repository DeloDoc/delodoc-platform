export const hoursToMs = (hours: number) => hours * 60 * 60 * 100;
export const daysToMs = (days: number) => days * hoursToMs(24);
