import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/app.constant';

export const getTokenCookie = (): string => Cookies.get(COOKIES.TOKEN) as string;
export const setTokenCookie = (token: string): string | undefined => Cookies.set(COOKIES.TOKEN, token, { expires: 1 });
export const removeTokenCookie = (): void => Cookies.remove(COOKIES.TOKEN);

export const getRoleCookie = (): string => Cookies.get(COOKIES.ROLE) as string;
export const setRoleCookie = (role: string): string | undefined => Cookies.set(COOKIES.ROLE, role, { expires: 1});
export const removeRoleCookie = (): void => Cookies.remove(COOKIES.ROLE);
