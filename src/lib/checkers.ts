import { CheckResult } from '../interface/checkResult';
import { errorLogger } from './handlers';



export default async function check_pass(
  obj: any,
  schema: any,
): Promise<CheckResult> {
  const result: CheckResult = {
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
