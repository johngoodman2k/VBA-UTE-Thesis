export const shortCutText = (text?: string): string => {
    if (!text) return ""
    if (text.length <= 15) {
        return text
    }
    return text.slice(0, 300) + "..."
}