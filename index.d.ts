declare module 'ea-router' {
    export default class RouteGenerate {
        constructor(dir: any);
        setDefaultLayout(layout: any): void;
        setNotFoundPage(layout: any): void;
        generate(): Array<any>;
    }
    export function RouteName(name: string): any;
    export function Context(...params: string[]): any;
    export function EnableProp(): any;
    export function Alias(alias: string): any;
    export function Meta(data: any): any;
}
