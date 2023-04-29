import { ErrorData } from "../interfaces";

// какая-то очень неуниверсальная функция получилась, сильно зависит от внутренностей параметров, которых может и не быть в общем случае
export function joinErrorMessages(errorMessage: ErrorData[]): string {
  return Object.values(errorMessage[0]).flatMap(arr => arr).join(", ");
}
