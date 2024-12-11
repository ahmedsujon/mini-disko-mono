export const saveToLocalStorage = (
    key: string,
    data: object | string | null
) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        if (
            error instanceof DOMException &&
            error.name === "QuotaExceededError"
        ) {
            console.error("Storage quota exceeded");
            localStorage.clear();
        } else {
            console.error(
                "An error occurred while accessing local storage:",
                error
            );
        }
    }
};

export const loadFromLocalStorage = (key: string) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) || "");
    } else return undefined;
};
