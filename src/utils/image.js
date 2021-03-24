const loadImage = (img, canceler = {}) => new Promise((resolve, reject) => {
    const errorHandler = (e) => {
        reject(e)
    };

    if (typeof img == "string") { //url
        const shadowImg = new Image();

        canceler.cancel = () => {
            shadowImg.src = "";
            resolve();
            delete canceler.cancel;
        }

        shadowImg.onload = () => resolve(img);

        shadowImg.onerror = errorHandler;
        shadowImg.onabort = errorHandler;
        shadowImg.onemptied = errorHandler;
        shadowImg.onstalled = errorHandler;
        shadowImg.onsuspend = errorHandler;

        shadowImg.src = img;
    } else if (img instanceof File) { //file
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = errorHandler;
        reader.onabort = errorHandler;

        reader.readAsDataURL(img);
    }
});


export {
    loadImage
}
