import { errorLogger } from './handlers';

interface Result {
  is_success: boolean;
  log: any;
}

export default async function check_pass(
  obj: any,
  schema: any,
): Promise<Result> {
  const result: Result = {
    is_success: false,
    log: 'Every thing is ok!',
  };

  try {
    await schema.validateAsync(obj).then(() => {
      result.is_success = true;
    });
  } catch (error) {
    result.log = error;
    errorLogger(error);
  }

  return result;
}
