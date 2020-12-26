"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("./view"));

var _directory = _interopRequireDefault(require("./directory"));

var _VueRouterAdapter = require("./adapter/VueRouterAdapter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EMPTY_ROUTE_PATH = '';
var ALL_ROUTE_PATH = '*';

var RouteProvider = /*#__PURE__*/function () {
  /**
   * 自动生成路由的目录
   * @type {Array}
   * @private
   */

  /**
   * 视图数组
   * @type {RouteProvider}
   * @private
   */

  /**
   * 路由对象数组
   * @type {Array}
   * @private
   */

  /**
   * 根目录对象
   * @private
   */
  function RouteProvider(dir) {
    _classCallCheck(this, RouteProvider);

    this._views = [];
    this._routes = [];
    this._defaultLayout = null;
    this._notFoundPage = null;
    this._dir = dir;
    this._views = this._getViews(this._dir);
    this._directory = new _directory["default"]('.');

    this._generateDirectory();
  }

  _createClass(RouteProvider, [{
    key: "setDefaultLayout",
    value: function setDefaultLayout(component) {
      this._defaultLayout = _view["default"].create(EMPTY_ROUTE_PATH, component["default"] || component);
      return this;
    }
  }, {
    key: "setNotFoundPage",
    value: function setNotFoundPage(component) {
      this._notFoundPage = _view["default"].create(ALL_ROUTE_PATH, component["default"] || component);
      return this;
    }
    /**
     * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
     * @return {Array}
     */

  }, {
    key: "generate",
    value: function generate() {
      var adapter = new _VueRouterAdapter.VueRouterAdapter();
      var config = {
        defaultLayout: this._defaultLayout,
        notFoundPage: this._notFoundPage
      };
      return adapter.convertDirectories([this._directory], config);
    }
    /**
     * 解析目录，还原目录结构
     * @param dir
     * @return {this}
     * @private
     */

  }, {
    key: "_getViews",
    value: function _getViews(dir) {
      var views = [];
      var keys = dir.keys();

      for (var index in keys) {
        var path = keys[index];
        var component = dir(path);
        views.push(_view["default"].create(path, component["default"] || component));
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
    key: "_generateDirectory",
    value: function _generateDirectory() {
      for (var index in this._views) {
        var view = this._views[index];

        this._directory.addView(view);
      }
    }
  }]);

  return RouteProvider;
}();

var _default = RouteProvider;
exports["default"] = _default;