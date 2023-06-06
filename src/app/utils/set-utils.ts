export function trimmedNonEmptySet(data: string[]): Set<string> {
  return new Set<string>(
    data
      .map(item => item ? item.trim() : '')
      .filter(item => item != '')
  );
}
