import View from './view';
import Directory from './directory';
import { VueRouterAdapter } from './adapter/VueRouterAdapter';

const EMPTY_ROUTE_PATH = '';

class RouteProvider {
    /**
     * 自动生成路由的目录
     * @type {Array}
     * @private
     */
    _dir;

    /**
     * 视图数组
     * @type {RouteProvider}
     * @private
     */
    _views = [];

    /**
     * 路由对象数组
     * @type {Array}
     * @private
     */
    _routes = [];

    /**
     * 根目录对象
     * @private
     */
    _directory;

    _defaultLayout = null;

    constructor(dir) {
        this._dir = dir;
        this._views = this._getViews(this._dir);
        this._directory = new Directory('.');
        this._generateDirectory();
    }

    setDefaultLayout(component) {
        this._defaultLayout = View.create(
            EMPTY_ROUTE_PATH,
            component.default || component
        );
    }

    /**
     * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
     * @return {Array}
     */
    generate() {
        let adapter = new VueRouterAdapter();
        let config = {
            defaultLayout: this._defaultLayout,
        };
        return adapter.convertDirectories([this._directory], config);
    }

    /**
     * 解析目录，还原目录结构
     * @param dir
     * @return {this}
     * @private
     */
    _getViews(dir) {
        let views = [];

        let keys = dir.keys();
        for (let index in keys) {
            let path = keys[index];
            let component = dir(path);
            views.push(View.create(path, component.default || component));
        }
        views = views.sort((x, y) => {
            return x.Deep > y.Deep ? 1 : -1;
        });
        return views;
    }

    /**
     * 解析views,生成对应的目录结构
     * @private
     */
    _generateDirectory() {
        for (let index in this._views) {
            let view = this._views[index];
            this._directory.addView(view);
        }
    }
}

export default RouteProvider;
