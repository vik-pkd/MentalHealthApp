import { Buffer } from 'buffer';

export const base64_to_utf8 = (data: string) => {
    return Buffer.from(data, 'base64').toString('utf-8');
}

