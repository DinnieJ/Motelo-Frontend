import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/app.constant';

export const getTokenCookie = (): string => Cookies.get(COOKIES.TOKEN) as string;
export const setTokenCookie = (token: string): string | undefined => Cookies.set(COOKIES.TOKEN, token, { expires: 1 });
export const removeTokenCookie = (): void => Cookies.remove(COOKIES.TOKEN);
