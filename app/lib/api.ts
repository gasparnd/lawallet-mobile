import {create} from 'apisauce';
import {IDENTITY_API_ENDPOINT, LAWALLET_API_ENDPOINT} from '@env';

export const laWalletApi = create({
  baseURL: LAWALLET_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const identityApi = create({
  baseURL: IDENTITY_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
