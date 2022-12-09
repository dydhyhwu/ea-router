import { ensureConfigProperty } from '../utils';
import { AutoRouteConfigProperty } from '../RouteConfig';

export function Context(...contextList) {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].context = target[
            AutoRouteConfigProperty
        ].context.concat(contextList);
    };
}

export function EnableProp() {
    return (target) => {
        ensureConfigProperty(target);
        target[AutoRouteConfigProperty].useProp = true;
    };
}
