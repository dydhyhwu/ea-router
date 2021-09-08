import { ensureConfigProperty } from '../utils';
import { AutoRouteConfigProperty } from '../RouteConfig';

export function RedirectByName(name) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].redirect = {
            name: name
        };
    }
}

export function Redirect(path) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].redirect = {
            path: path
        };
    }
}
