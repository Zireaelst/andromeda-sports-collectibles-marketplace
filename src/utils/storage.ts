export const setSessionStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
        if (value === undefined) {
            window.sessionStorage.removeItem(key);
        }
        else {
            window.sessionStorage.setItem(key, value);
        }
    } catch (error) {
        console.warn('SessionStorage not available:', error);
    }
}

export const getSessionStorage = <T = any>(key: string): T | undefined => {
    if (typeof window === 'undefined') return undefined;
    try {
        return window.sessionStorage.getItem(key) as T;
    } catch (error) {
        console.warn('SessionStorage not available:', error);
        return undefined;
    }
}

export enum SESSION_KEYS {
    CONFIG_URI = 'CONFIG_URI_0.1.0'
}