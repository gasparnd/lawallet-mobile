import {identityApi} from '@/lib/api';

type VoucherResponse = {
  ok?: string;
  error?: string;
};

export const requestVoucher = async (
  name: string,
  email: string,
): Promise<VoucherResponse> => {
  return identityApi
    .post('/api/voucher/request', JSON.stringify({name, email}))
    .then((res: any) => res.data)
    .catch(() => {
      return {
        error: 'FAILED_REQUEST_VOUCHER',
      };
    });
};

export const claimVoucher = async (
  name: string,
  code: string,
): Promise<VoucherResponse> => {
  return identityApi
    .post('/api/voucher/claim', JSON.stringify({name, code}))
    .then((res: any) => res.data)
    .catch(() => {
      return {
        error: 'FAILED_REQUEST_VOUCHER',
      };
    });
};
