import _request from "./request";
import {API_DOMAIN, API_PORT} from "../config/constants";

export default function request(options: any) {
    options.hostname = API_DOMAIN;
    options.port = API_PORT;

    options.headers = options.headers || {};

    return _request(options);
}