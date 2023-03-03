
module.exports = {
    executeScript: (tabId, functionToExecute) => {
        return new Promise(async (resolve, reject) => {
            try {
                let [{result}] = await chrome.scripting.executeScript({
                    target: {tabId},
                    function: functionToExecute,
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
            
        });
    },

    getSelection: (tabId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let [{result}] = await chrome.scripting.executeScript({
                    target: {tabId},
                    function: () => getSelection().toString(),
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    },
    getCurrentTab: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
                resolve(tab);
            } catch (e) {
                reject(e);
            }
        });
    },
    
}