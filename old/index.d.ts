declare module 'ea-router' {
    export default class RouteGenerate {
        constructor(dir: any);
        setDefaultLayout(layout: any): RouteGenerate;
        setNotFoundPage(layout: any): RouteGenerate;
        ignore(...patterns: string[]): RouteGenerate
        generate(): Array<any>;
    }
    export function RouteName(name: string): any;
    export function Context(...params: string[]): any;
    export function EnableProp(): any;
    export function Alias(alias: string): any;
    export function Meta(data: any): any;
    export function Redirect(path: string): any;
    export function RedirectByName(name: string): any;
}
