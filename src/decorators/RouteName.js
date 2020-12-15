import { AutoRouteConfigProperty, RouteConfig } from '../RouteConfig';
import { ensureConfigProperty } from '../utils';

export function RouteName(name) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].name = name;
    };
}
