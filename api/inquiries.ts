import { handleInquiriesApi } from '../server/inquiriesService';

export default async function handler(req: any, res: any) {
  return handleInquiriesApi(req, res);
}
