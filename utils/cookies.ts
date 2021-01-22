import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/constants/app.constant';

export const getTokenCookie = (): string => Cookies.get(TOKEN_KEY) as string;
export const setTokenCookie = (token: string): string | undefined => Cookies.set(TOKEN_KEY, token, { expires: 1 });
export const removeTokenCookie = (): void => Cookies.remove(TOKEN_KEY);
