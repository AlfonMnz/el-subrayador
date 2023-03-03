module.exports = {
    setItem: (key, value) => {
        return new Promise(async (resolve, reject) => {
            try {
                const objectToSet = {};
                objectToSet[key] = value
                await chrome.storage.sync.set(objectToSet);
                resolve();
            } catch (error) {
                reject(error);
            }

        });
        
    },
    getItem: (key) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await chrome.storage.sync.get([`${key}`]);
                resolve(result[key]);
            } catch (error) {
                reject(error);
            }
        });
    }
}