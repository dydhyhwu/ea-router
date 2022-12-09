import { Adapter } from './base';
import { AutoRouteConfigProperty } from '../RouteConfig';

const CONTEXT_SPLIT_CHAR = ':';
const PATH_SPLIT_CHAR = '/';

export class VueRouterAdapter extends Adapter {
    convertDirectories(directories, options) {
        let result = [];
        for (let index in directories) {
            let directory = directories[index];
            let route = this.convertDirectory(directory, options);
            result.push(route);
        }

        if (options.notFoundPage) {
            let notFoundPageRoute = this.convertView(options.notFoundPage);
            result.push(notFoundPageRoute);
        }

        return result;
    }

    convertDirectory(directory, options) {
        let layout = this.getLayoutView(directory, options);
        let route = this.convertView(layout, true);
        route.path = directory.getPath();
        route.children = route.children.concat(
            this.convertChildrenRoutes(directory, options)
        );

        return route;
    }

    getLayoutView(directory, options) {
        if (directory.existedLayoutView()) {
            return directory.getLayoutView();
        }
        if (options.defaultLayout) {
            return options.defaultLayout;
        }
        throw Error(`[${directory.Path}]: 目录下没有Layout组件.`);
    }

    convertView(view, ignorePath) {
        let instance = view.Component;
        let route = {
            path: '',
            name: instance.name,
            component: instance,
            children: [],
            componentPath: view.Path,
        };
        if (!ignorePath) {
            route.path = view.IsIndex ? '' : view.LastInfo;
        }
        route = this.convertConfig(instance, route);
        return route;
    }

    convertConfig(instance, route) {
        if (!instance[AutoRouteConfigProperty]) {
            return route;
        }
        let config = instance[AutoRouteConfigProperty];
        route.name = config.name ?? route.name;

        if (config.alias) route.alias = config.alias;
        route.props = config.useProp;
        route.meta = config.meta;
        route.redirect = config.redirect;

        if (config.context.length > 0) {
            route.path = this.combinePathWithContext(
                route.path,
                config.context
            );

            route.alias = route.alias
                ? this.combinePathWithContext(route.alias, config.context)
                : route.alias;
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
    convertChildrenRoutes(directory, options) {
        let routes = [];
        for (let index in directory.Views) {
            let view = directory.Views[index];
            if (view.IsLayout) continue;
            routes.push(this.convertView(view));
        }

        for (let index in directory.SubDirectories) {
            let subDirectory = directory.SubDirectories[index];
            let subRoute = this.convertDirectory(subDirectory, options);
            routes.push(subRoute);
        }
        return routes;
    }

    combinePathWithContext(path, context) {
        let result = path;
        context = context
            .map((x) => `${CONTEXT_SPLIT_CHAR}${x}`)
            .join(PATH_SPLIT_CHAR);
        if (path.lastIndexOf(0) !== PATH_SPLIT_CHAR) {
            result = `${path}${PATH_SPLIT_CHAR}`;
        }
        result = `${result}${context}`;
        return result;
    }
}
