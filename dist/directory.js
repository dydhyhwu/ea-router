"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 目录类
 */
var Directory = /*#__PURE__*/function () {
  _createClass(Directory, [{
    key: "Views",

    /**
     * 当前目录下所有视图
     * @type {Array}
     * @private
     */
    get: function get() {
      return this._views;
    }
  }, {
    key: "SubDirectories",
    get: function get() {
      return this._subDirectory;
    }
    /**
     * 文件路径分隔后的数组
     * @return {never|string[]}
     * @constructor
     */

  }, {
    key: "PathInfos",
    get: function get() {
      return this._path.split('/');
    }
  }, {
    key: "Path",
    get: function get() {
      return this._path;
    }
    /**
     * 目录路径
     * @private
     */

  }]);

  function Directory(path) {
    _classCallCheck(this, Directory);

    this._views = [];
    this._subDirectory = [];
    this._path = path;
  }

  _createClass(Directory, [{
    key: "addView",
    value: function addView(view) {
      if (this.isCurrentDirectoryView(view)) {
        this._views.push(view);
      } else if (this._isInSubDirectory(view)) {
        this._addInSubDirectory(view);
      } else {
        var newSubDirectory = this._createSubDirectory(view);

        newSubDirectory.addView(view);

        this._subDirectory.push(newSubDirectory);
      }
    }
  }, {
    key: "isCurrentDirectoryView",
    value: function isCurrentDirectoryView(view) {
      var tailPathInfos = view.Path.replace("".concat(this._path), '').replace(/^\//, '').split('/');
      return this._isStartWith(view.Path, this._path) && tailPathInfos.length === 1;
    }
    /**
     * 是否是在当前目录下
     * @param view
     */

  }, {
    key: "containView",
    value: function containView(view) {
      return this._isStartWith(view.Path, this._path);
    }
    /**
     * 判断target 是否是以 source开头的.
     * @param target
     * @param source
     * @return {boolean}
     * @private
     */

  }, {
    key: "_isStartWith",
    value: function _isStartWith(target, source) {
      var reg = new RegExp("^".concat(source));
      return reg.test(target);
    }
    /**
     * 是否是在子目录下
     * @param view
     * @return {boolean}
     * @private
     */

  }, {
    key: "_isInSubDirectory",
    value: function _isInSubDirectory(view) {
      for (var index in this._subDirectory) {
        var directory = this._subDirectory[index];
        if (directory.containView(view)) return true;
      }

      return false;
    }
    /**
     * 添加到子目录下
     * @param view
     * @private
     */

  }, {
    key: "_addInSubDirectory",
    value: function _addInSubDirectory(view) {
      var directory = this._getSubDirectory(view);

      directory.addView(view);
    }
    /**
     * 获取视图所在的目录
     * @param view
     * @return {null|*}
     * @private
     */

  }, {
    key: "_getSubDirectory",
    value: function _getSubDirectory(view) {
      for (var index in this._subDirectory) {
        var directory = this._subDirectory[index];
        if (directory.containView(view)) return directory;
      }

      return null;
    }
    /**
     * 新建一个子目录
     * @param view
     * @private
     */

  }, {
    key: "_createSubDirectory",
    value: function _createSubDirectory(view) {
      var path = view.Path.replace("".concat(this._path), '').replace(/^\//, '').split('/')[0];
      return new Directory("".concat(this._path, "/").concat(path));
    }
    /**
     * 获取layout视图
     * @return {View}
     * @private
     */

  }, {
    key: "getLayoutView",
    value: function getLayoutView() {
      for (var index in this._views) {
        var view = this._views[index];
        if (view.IsLayout) return view;
      }

      throw Error("".concat(this._path, " \u76EE\u5F55\u4E0B\u6CA1\u6709Layout\u7EC4\u4EF6."));
    }
  }, {
    key: "existedLayoutView",
    value: function existedLayoutView() {
      return this._views.some(function (view) {
        return view.IsLayout;
      });
    }
    /**
     * 获取当前目录对应的路由路径
     * @return {string}
     * @private
     */

  }, {
    key: "getPath",
    value: function getPath() {
      if (this._path === '.') return '/';
      return this.PathInfos[this.PathInfos.length - 1];
    }
  }]);

  return Directory;
}();

var _default = Directory;
exports["default"] = _default;