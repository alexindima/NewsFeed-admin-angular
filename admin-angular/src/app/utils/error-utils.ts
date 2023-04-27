import { ErrorData } from "../interfaces";

export function joinErrorMessages(errorMessage: ErrorData[]): string {
  return Object.values(errorMessage[0]).flatMap(arr => arr).join(", ");
}
