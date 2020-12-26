"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  _createClass(View, [{
    key: "Deep",

    /**
     * 视图组件的路径
     * @type {string}
     * @private
     */

    /**
     * 路径分割之后的信息
     * @type {Array}
     * @private
     */

    /**
     * 对应的组件
     * @private
     */

    /**
     * 当前视图的深度
     * @return {number}
     * @constructor
     */
    get: function get() {
      return this._infos.length;
    }
    /**
     * 由分割信息组成的路由路径
     * @return {string}
     * @constructor
     */

  }, {
    key: "Path",
    get: function get() {
      return "".concat(this._infos.join('/'));
    }
    /**
     * 获取路由元信息中的最后一个
     * @return {*}
     * @constructor
     */

  }, {
    key: "LastInfo",
    get: function get() {
      return this._infos[this.Deep - 1].replace('.vue', '');
    }
    /**
     * 是否是布局文件
     * @return {boolean}
     * @constructor
     */

  }, {
    key: "IsLayout",
    get: function get() {
      return this.Is('layout');
    }
    /**
     * 是否为首页
     * @return {boolean}
     * @constructor
     */

  }, {
    key: "IsIndex",
    get: function get() {
      return this.Is('index');
    }
    /**
     * 对应的组件
     * @return {Object}
     * @constructor
     */

  }, {
    key: "Component",
    get: function get() {
      return this._component;
    }
  }]);

  function View(path, component) {
    _classCallCheck(this, View);

    this._path = '';
    this._infos = [];
    this._path = path;
    this._component = component;
    this._infos = this._parsePath(this._path);
  }
  /**
   * 静态工厂方法
   * @param path
   * @param component
   * @return {View}
   */


  _createClass(View, [{
    key: "_parsePath",

    /**
     * 解析视图组件的路径
     * @param path
     * @return {Array}
     * @private
     */
    value: function _parsePath(path) {
      var result = [];
      path = path.split('/');

      for (var index in path) {
        if (path[index].length > 0) {
          result.push(path[index].toLowerCase());
        }
      }

      return result;
    }
  }, {
    key: "Is",
    value: function Is(fileName) {
      return this.LastInfo === "".concat(fileName);
    }
  }], [{
    key: "create",
    value: function create(path, component) {
      return new View(path, component);
    }
  }]);

  return View;
}();

var _default = View;
exports["default"] = _default;