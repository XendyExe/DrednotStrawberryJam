const singleTypes = {
    "C0": null,
    "C2": false,
    "C3": true
}
const singleTypeInverse = {
    "null": "C0",
    "false": "C2",
    "true": "C3"
}
const toBinString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');


 window.dredpackDecode = (rawData) => {
    const array = new Uint8Array(rawData);
    const data = array.slice(0, array.length - 32);
    const salt = array.slice(array.length - 32, array.length);
    console.log(salt, btoa(toBinString(salt)));
}