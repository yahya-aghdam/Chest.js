import { randomBytes } from 'crypto';
import prisma from './prisma';
import { User } from '@prisma/client';

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

export async function userChatsUpdater(
  unique_id: string,
  chat_id: string,
  add: boolean = true,
) {
  const user: User = (await prisma.user.findUnique({
    where: {
      unique_id: unique_id,
    },
  })) as User;

  const userChats: string[] = JSON.parse(user.chats.replace(/'/g, '"'));

  if (add) {
    userChats.push(chat_id);
  } else {
    const chat_id_index = userChats.indexOf(chat_id);
    userChats.splice(chat_id_index, 1);
  }

  await prisma.user.update({
    where: {
      unique_id: unique_id,
    },
    data: {
      chats: `${userChats}`,
    },
  });
}
