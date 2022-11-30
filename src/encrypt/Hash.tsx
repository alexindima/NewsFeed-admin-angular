import {sha1,sha256,sha384,sha512} from 'crypto-hash';

export const calculateHash = async (value:string, algorithm = 'sha256') => {
    let result = '';
    if (algorithm == 'sha1') {
        result = await sha1(value);
    } else if (algorithm === 'sha256') {
        result = await sha256(value);
    } else if (algorithm === 'sha384') {
        result = await sha384(value);
    } else if (algorithm === 'sha512') {
        result = await sha512(value);
    }
    return  result
}