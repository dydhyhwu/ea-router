import { Adapter } from './base';
import {AutoRouteConfigProperty} from "../RouteConfig";

export class VueRouterAdapter extends Adapter {
    convertDirectories(directories) {
        let result = [];
        for (let index in directories) {
            let directory = directories[index];
            let route = this.convertDirectory(directory);
            result.push(route);
        }
        return result;
    }

    convertDirectory(directory) {
        let layout = directory.getLayoutView();
        let route = this.convertView(layout);
        route.path = directory.getPath();
        route.children = route.children.concat(
            this.convertChildrenRoutes(directory)
        );

        return route;
    }

    convertView(view) {
        let instance = view.Component;
        let route = {
            path: view.IsIndex ? '' : view.LastInfo,
            name: instance.name,
            component: instance,
            children: [],
        };
        if(instance[AutoRouteConfigProperty]) {
            let config = instance[AutoRouteConfigProperty];
            route.name = config.name ?? route.name;
        }
        return route;
    }

    /**
     * 获取当前目录对应下的子路由，分为两个部分
     * 1. 当前层的视图
     * 2. 子目录
     * @return {Array}
     * @private
     */
    convertChildrenRoutes(directory) {
        let routes = [];
        for (let index in directory.Views) {
            let view = directory.Views[index];
            if (view.IsLayout) continue;
            routes.push(this.convertView(view));
        }

        for (let index in directory.SubDirectories) {
            let subDirectory = directory.SubDirectories[index];
            let subRoute = this.convertDirectory(subDirectory);
            routes.push(subRoute);
        }
        return routes;
    }
}
