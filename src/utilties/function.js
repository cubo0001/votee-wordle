export const isEmpty = (input) => {
    if (typeof input === "undefined" || input === null) {
        return true;
    } else if (typeof input === "object") {
        if (Array.isArray(input) && input.length === 0) {
            return true;
        } else {
            if (Object.keys(input).length === 0) {
                return true;
            }
        }
    } else {
        if (!input) {
            return true;
        }
    }
    return false;
};

export const pad = (str, max) => {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};
