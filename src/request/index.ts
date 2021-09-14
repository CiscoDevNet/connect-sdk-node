import _request from "./request";
import {API_DOMAIN, API_PORT} from "../config/constants";

/**
 * Function to send request to the API
 *
 * @param options options for http request object
 *
 * @returns promise response object
 */

export default function request(options: any) {
    options.hostname = API_DOMAIN;
    options.port = API_PORT;

    options.headers = options.headers || {};

    return _request(options);
}