import { randomBytes } from 'crypto';


export function errorLogger(text: string) {
  console.log('\x1b[31m', `Error: ${text}`, '\x1b[0m');
}

export function situationLogger(text: string) {
  console.log('\x1b[34m', `Doing: ${text}...`, '\x1b[0m');
}

export function id_generator(input_id: string | undefined = undefined) {
  if (input_id == undefined) {
    return randomBytes(12).toString('hex');
  } else {
    if (input_id.length >= 12) {
      return input_id;
    } else return randomBytes(12).toString('hex');
  }
}


