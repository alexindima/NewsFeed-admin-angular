import * as bcrypt from "bcryptjs";

// А шифрование точно на фронте надо делать? Мне казалось это задача бекенда
export function hashString(value: string | null): string {
  if(value){
    const salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(value, salt);
  }
  else {
    return ''
  }
}
