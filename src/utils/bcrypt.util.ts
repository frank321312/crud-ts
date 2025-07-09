import bcrypt from 'bcrypt';

export const encryptString = (str: string) => bcrypt.hash(str, 10);

export const compareString = (str: string, hash: string) =>
    bcrypt.compare(str, hash);
