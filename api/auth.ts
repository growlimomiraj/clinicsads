import { handleAuthApi } from '../server/inquiriesService';

export default async function handler(req: any, res: any) {
  return handleAuthApi(req, res);
}
