import {useState, useEffect} from "react";

const getStorageValue = (key: string, defaultValue: string | null = null) => {
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultValue;
};

export const useLocalStorage = (
    key: string,
    defaultValue: string | null = null
) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        if (value != null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else localStorage.removeItem(key);
    }, [key, value]);

    return [value, setValue];
};
