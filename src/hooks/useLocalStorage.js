import React, { useEffect, useState } from 'react'

const useLocalStorage = () => {
    const KEYS = {
        accessToken: "reddit-access-token",
        expiryDate: "reddit-token-expiry-date",
        refreshToken: "reddit-refresh-token",
        colorScheme: "picroll-default-color-scheme",
        nsfw: "picroll-is-nsfw-enabled",
        disableGoogleAnalytics: "picroll-google-analytics-disabled-preference",
    }

    const [accessToken, setAccessToken] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [colorScheme, setColorScheme] = useState("");
    const [isNsfwEnabled, setNsfw] = useState("");
    const [analyticsPref, setAnalyticsPref] = useState(true);

    useEffect(() => {
        if (localStorage.getItem(KEYS.nsfw) === null) {
            localStorage.setItem(KEYS.nsfw, "1")
        }
        if (localStorage.getItem(KEYS.disableGoogleAnalytics) === undefined) {
            localStorage.setItem(KEYS.disableGoogleAnalytics, 1);
        }
    }, [KEYS.nsfw, KEYS.disableGoogleAnalytics])

    useEffect(() => {
        setAccessToken(() => localStorage.getItem(KEYS.accessToken));
        setExpiryDate(() => localStorage.getItem(KEYS.expiryDate));
        setRefreshToken(() => localStorage.getItem(KEYS.refreshToken));
        setColorScheme(() => localStorage.getItem(KEYS.colorScheme));
        setNsfw(() => localStorage.getItem(KEYS.nsfw) === "1" ? true : false);
        setAnalyticsPref(localStorage.getItem(KEYS.disableGoogleAnalytics) === 1 ? true : false);

        const handleStorageChange = (event) => {
            if (event.storageArea === localStorage) {
                switch (event.key) {
                    case KEYS.accessToken:
                        setAccessToken(() => localStorage.getItem(KEYS.accessToken));
                        break;
                    case KEYS.expiryDate:
                        setExpiryDate(() => localStorage.getItem(KEYS.expiryDate));
                        break;
                    case KEYS.refreshToken:
                        setRefreshToken(() => localStorage.getItem(KEYS.refreshToken));
                        break;
                    case KEYS.colorScheme:
                        setColorScheme(() => localStorage.getItem(KEYS.colorScheme));
                        break;
                    case KEYS.nsfw:
                        setNsfw(localStorage.getItem(KEYS.nsfw) === "1" ? true : false );
                        break;
                    case KEYS.disableGoogleAnalytics:
                        setAnalyticsPref(localStorage.getItem(KEYS.disableGoogleAnalytics) === 1 ? true : false);
                        break;
                    default:
                        break;
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const setItem = (key, value) => {
        window.localStorage.setItem(key, value);
    }

    const clearItem = (key) => {
        window.localStorage.clearItem(key);
    }

    return {
        KEYS,
        accessToken,
        expiryDate,
        refreshToken,
        colorScheme,
        isNsfwEnabled,
        analyticsPref,
        setItem,
        clearItem
    }

}

export default useLocalStorage