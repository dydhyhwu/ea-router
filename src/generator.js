import View from './view';
import Directory from './directory';
import { VueRouterAdapter } from './adapter/VueRouterAdapter';
import minimatch from 'minimatch';

const EMPTY_ROUTE_PATH = '';
const ALL_ROUTE_PATH = '*';

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

    _notFoundPage = null;

    _ignorePatterns = [];

    constructor(dir) {
        this._dir = dir;
    }

    setDefaultLayout(component) {
        this._defaultLayout = View.create(
            EMPTY_ROUTE_PATH,
            component.default || component
        );
        return this;
    }

    setNotFoundPage(component) {
        this._notFoundPage = View.create(
            ALL_ROUTE_PATH,
            component.default || component
        );
        return this;
    }

    ignore(...patterns) {
        this._ignorePatterns.push(...patterns)
        return this;
    }

    /**
     * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
     * @return {Array}
     */
    generate() {
        this._parseDir();
        let adapter = new VueRouterAdapter();
        let config = {
            defaultLayout: this._defaultLayout,
            notFoundPage: this._notFoundPage,
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
        keys = this._getAvailableFiles(keys);

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

    _getAvailableFiles(keys) {
        let result = [];
        for (const key of keys) {
            if(this._isIgnore(key)) continue;
            result.push(key);
        }
        return result;
    }

    _isIgnore(key) {
        for (const ignorePattern of this._ignorePatterns) {
            const isMatch = minimatch(key, ignorePattern);
            if(isMatch) return true;
        }
        return false;
    }

    _parseDir() {
        this._views = this._getViews(this._dir);
        this._directory = new Directory('.');
        this._generateDirectory();
    }
}

export default RouteProvider;
