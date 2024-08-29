
export const formatDate = (d: Date) => d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric"
})

export const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result! as string);
    reader.onerror = reject;
});