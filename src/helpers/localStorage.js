export const setToStorage = (key, value) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.setItem(key, value);
    }
};

export const getFromStorage = (key) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
};