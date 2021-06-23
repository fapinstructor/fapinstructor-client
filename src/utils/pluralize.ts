export function pluralize(singular: string, count: number, plural?: string) {
  if (count === 1) {
    return singular;
  }
  return plural || `${singular}s`;
}
