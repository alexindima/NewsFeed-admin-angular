import * as bcrypt from "bcryptjs";

export function hashString(value: string | null): string {
  if(value){
    const salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(value, salt);
  }
  else {
    return ''
  }
}
