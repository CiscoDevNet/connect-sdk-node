import {request as requestHttps} from 'https';
import {request as requestHttp} from 'http';

/**
 * Function to send request to api
 *
 * @param options options for http request object
 *
 * @returns promise response object
 */

export default function _request(options: any) {
    const reqOptions = {
        hostname: options.hostname,
        port: options.port,
        path: options.path,
        method: options.method,
        headers: options.headers
    }

    const returnRes = {
        statusCode: undefined,
        body: undefined,
        error: undefined,
        headers: {}
    }

    const request = (options.protocol && options.protocol === "https:") ? requestHttps : requestHttp;

    const payload = JSON.stringify(options.payload) || undefined;

    return new Promise<object>((resolve, reject) => {
        // @ts-ignore
        const req = request(reqOptions, (res: any) => {
            let data = '';

            res.on('data', (chunk: string) => {
                data += chunk;
            });

            res.on('end', () => {
                // @ts-ignore
                returnRes.body = data;
                returnRes.headers = res.headers;

                resolve(returnRes);
            });
        });

        req.on('response', res => {
            // @ts-ignore
            returnRes.statusCode = res.statusCode;
        })

        req.on('error', (err: any) => {
            returnRes.error = err;
            reject(returnRes);
        });

        if(payload !== undefined) {
            req.write(payload);
        }

        req.end();
    })
}