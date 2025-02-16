export function formatNumber(number, type = "default") {
  if (type === "sol") {
    if (number < 10) return number.toFixed(2);
    if (number < 100) return number.toFixed(1);
    return Math.round(number);
  }

  if (type === "usd") {
    if (number < 1000) return `$${number.toFixed(2)}`;
    if (number < 1000000) return `$${(number / 1000).toFixed(1)}K`;
    return `$${(number / 1000000).toFixed(1)}M`;
  }

  if (type === "entry") {
    if (number < 1000) return `$${number.toFixed(0)}`;
    if (number < 1000000) return `$${(number / 1000).toFixed(0)}K`;
    if (number < 1000000000) return `$${(number / 1000000).toFixed(1)}M`;
    return `$${(number / 1000000000).toFixed(1)}B`;
  }

  return number.toString();
}

export function formatDuration(minutes) {
  if (minutes < 240) return `${minutes}m`
  return `${Math.round(minutes / 60)}h`;
}

