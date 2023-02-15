// ты изобрёл new Set() в джаваскрипте, уже есть такое
export class UniqueArray<T> extends Array<T> {
  add(value: T) {
    if (!this.includes(value)) {
      this.push(value);
    }
  }
}
