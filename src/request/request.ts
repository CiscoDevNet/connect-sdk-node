import {request} from 'http';

export default function _request(options: any) {
    const reqOptions = {
        hostname: options.hostname,
        port: options.port,
        path: options.path,
        method: options.method,
        headers: options.headers
    }

    const payload = JSON.stringify(options.payload) || undefined;

    return new Promise((resolve, reject) => {
        // @ts-ignore
        const req = request(reqOptions, (res: any) => {
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

        if(payload !== undefined) {
            req.write(payload);
        }

        req.end();
    })
}