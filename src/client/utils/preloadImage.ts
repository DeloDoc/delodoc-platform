export const preloadImage = (src?: string) => {
    return new Promise((resolve, reject) => {
        if (!src) reject(new Error('No src provided'));

        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = (error) => {
            reject(error);
        };

        if (src) img.src = src;
    });
};
