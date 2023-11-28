import { RegexPattern } from "../../../nursery-api/types"

export const validate = (value: string, pattern: RegexPattern): boolean => {
    const regex = new RegExp(pattern)
    return regex.test(value)
}