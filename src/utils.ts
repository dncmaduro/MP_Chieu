export function normalize(value: unknown) {
    if (value === null || value === undefined || value === "") return "";
    if (typeof value === "number") return value;
    if (value instanceof Date) return value.getTime();
    return String(value).toLowerCase();
};