import _request from "./request";
import {ClientConfiguration} from "../api/clientConfiguration";

/**
 * Function to send request to the API
 *
 * @param options options for http request object
 *
 * @param clientConfiguration client configuration
 * @returns promise response object
 */

export default function request(options: any, clientConfiguration: ClientConfiguration) {
    const baseUrl = clientConfiguration.baseUrl;
    options.hostname = baseUrl.hostname;
    options.port = baseUrl.port;
    options.protocol = baseUrl.protocol;

    options.headers = options.headers || {};

    return _request(options);
}