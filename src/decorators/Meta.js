import {ensureConfigProperty} from "../utils";
import {AutoRouteConfigProperty} from "../RouteConfig";

export function Meta(meta) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].meta = meta;
    }
}
