'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _directory = require('./directory');

var _directory2 = _interopRequireDefault(_directory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteProvider = function () {

    /**
     * 路由对象数组
     * @type {Array}
     * @private
     */


    /**
     * 自动生成路由的目录
     * @type {Array}
     * @private
     */
    function RouteProvider(dir) {
        _classCallCheck(this, RouteProvider);

        this._views = [];
        this._routes = [];

        this._dir = dir;
        this._views = this._getViews(this._dir);
        this._directory = new _directory2.default('.');
        this._generateDirectory();
    }

    /**
     * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
     * @return {Array}
     */


    /**
     * 根目录对象
     * @private
     */


    /**
     * 视图数组
     * @type {RouteProvider}
     * @private
     */


    _createClass(RouteProvider, [{
        key: 'generate',
        value: function generate() {
            return this._directory.toRouter();
        }

        /**
         * 解析目录，还原目录结构
         * @param dir
         * @return {this}
         * @private
         */

    }, {
        key: '_getViews',
        value: function _getViews(dir) {
            var views = [];

            var keys = dir.keys();
            for (var index in keys) {
                var path = keys[index];
                var component = dir(path);
                views.push(_view2.default.create(path, component.default || component));
            }
            views = views.sort(function (x, y) {
                return x.Deep > y.Deep ? 1 : -1;
            });
            return views;
        }

        /**
         * 解析views,生成对应的目录结构
         * @private
         */

    }, {
        key: '_generateDirectory',
        value: function _generateDirectory() {
            for (var index in this._views) {
                var view = this._views[index];
                this._directory.addView(view);
            }
        }
    }]);

    return RouteProvider;
}();

exports.default = RouteProvider;