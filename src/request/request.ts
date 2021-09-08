const https = require('https');

export default function _request(options: any) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res: any) => {
            let data = '';

            res.on('data', (chunk: string) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (err: any) => {
            reject(err);
        });

        req.end();
    })
}