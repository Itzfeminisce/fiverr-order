export const formatMoney = (value: string) => {
    const intl = new Intl.NumberFormat("en-US", {
        currency: "USD",
        compactDisplay: "short",
        currencySign: "standard",
        maximumSignificantDigits: 2,
    })

    return intl.format(parseInt(value))
}



export const parseHash = (hashString: string): ParsedHash => {
    // Remove the leading # if it exists
    const cleanedHashString = hashString.startsWith('#') ? hashString.substring(1) : hashString;

    // Split the hash into its path and query components
    const [path, queryString] = cleanedHashString.split('?');

    // Extract query parameters
    const queryParams: Record<string, string> = {};
    if (queryString) {
        const searchParams = new URLSearchParams(queryString);
        for (const [key, value] of searchParams.entries()) {
            queryParams[key] = value;
        }
    }

    // Return the parsed object
    return {
        path,
        queryParams
    };
}

export const inLocalStorage = <T>(key: string, value?: object | string): T | void => {
    if (!value) return JSON.parse(btoa(window.localStorage.getItem(key) as string))

    if (value) {
        if (typeof value === 'object') {
            window.localStorage.setItem(key, atob(JSON.stringify(value)))
        } else if (typeof value === "string") {
            window.localStorage.setItem(key, atob(value))
        }
    }
}