/**
 * Format a duration in milliseconds into a time span string
 * of the format "HH:MM:SS", conditionally hiding hours when empty.
 */
export function formatTimeSpan(duration: number): string {
  var delta = new Date(0);
  delta.setMilliseconds(duration);

  const hours = delta.getUTCHours();
  const minutes = delta.getUTCMinutes().toString().padStart(2, "0");
  const seconds = delta.getUTCSeconds().toString().padStart(2, "0");
  return `${hours ? hours.toString() + ":" : ""}${minutes}:${seconds}`;
}
