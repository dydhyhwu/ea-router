import {ensureConfigProperty} from "../utils";
import {AutoRouteConfigProperty} from "../RouteConfig";

export function Alias(alias) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].alias = alias;
    };
}