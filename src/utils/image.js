const loadImage = url => new Promise((resolve, reject) => {
    const shadowImg = new Image();

    shadowImg.onload = () => resolve(url);
    const errorHandler = (e) => {
        console.error(e);
        reject(e)
    };

    shadowImg.onerror = errorHandler;
    shadowImg.onabort = errorHandler;
    shadowImg.onemptied = errorHandler;
    shadowImg.onstalled = errorHandler;
    shadowImg.onsuspend = errorHandler;

    shadowImg.src = url;
})

export {
    loadImage
}
