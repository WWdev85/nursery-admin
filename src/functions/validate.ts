import { RegexPattern } from "../types"

export const validate = (value: string, pattern: RegexPattern | string): boolean => {
    if (!Object.values(RegexPattern).includes(pattern as RegexPattern)) {
        return value === pattern;
    }
    else {
        const regex = new RegExp(pattern)
        return regex.test(value)
    }

}