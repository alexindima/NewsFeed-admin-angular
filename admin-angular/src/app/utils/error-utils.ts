import {ErrorData} from "../entities/response.interface";

export function joinErrorMessages(errorMessage: ErrorData): string {
  return Object.values(errorMessage).flatMap(arr => arr).join(", ");
}
