export function convertBigNumbersToString(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            convertBigNumbersToString(obj[key]);
        } else if (typeof obj[key] === 'function' && obj[key].toString().startsWith('BN')) {
            obj[key] = obj[key].toString();
        }
    }
}