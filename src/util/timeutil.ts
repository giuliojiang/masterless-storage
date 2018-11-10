var sleep = async function(durationMillis: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        setTimeout(function() {
            resolve();
        }, durationMillis);
    });
};

export {sleep}