import { ensureConfigProperty } from '../utils';
import { AutoRouteConfigProperty } from '../RouteConfig';

export function Redirect(path) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].redirect = {
            path: path
        };
    }
}

export function RedirectByName(name) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].redirect = {
            name: name
        };
    }
}
