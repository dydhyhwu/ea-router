'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 目录类
 */
var Directory = function () {
    _createClass(Directory, [{
        key: 'PathInfos',


        /**
         * 文件路径分隔后的数组
         * @return {never|string[]}
         * @constructor
         */
        get: function get() {
            return this._path.split('/');
        }

        /**
         * 目录路径
         * @private
         */


        /**
         * 当前目录下所有视图
         * @type {Array}
         * @private
         */


        /**
         * 子目录
         * @type {Array}
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
        key: 'addView',
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

        /**
         * 转换成 vue-router 的route对象
         */

    }, {
        key: 'toRouter',
        value: function toRouter() {
            var layout = this._getLayout();
            return {
                path: this._getPath(),
                name: layout.Component.name,
                component: layout.Component,
                children: this._getChildrenRoutes()
            };
        }
    }, {
        key: 'isCurrentDirectoryView',
        value: function isCurrentDirectoryView(view) {
            var tailPathInfos = view.Path.replace('' + this._path, '').replace(/^\//, '').split('/');

            return this._isStartWith(view.Path, this._path) && tailPathInfos.length === 1;
        }

        /**
         * 是否是在当前目录下
         * @param view
         */

    }, {
        key: 'containView',
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
        key: '_isStartWith',
        value: function _isStartWith(target, source) {
            var reg = new RegExp('^' + source);
            return reg.test(target);
        }

        /**
         * 是否是在子目录下
         * @param view
         * @return {boolean}
         * @private
         */

    }, {
        key: '_isInSubDirectory',
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
        key: '_addInSubDirectory',
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
        key: '_getSubDirectory',
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
        key: '_createSubDirectory',
        value: function _createSubDirectory(view) {
            var path = view.Path.replace('' + this._path, '').replace(/^\//, '').split('/')[0];
            return new Directory(this._path + '/' + path);
        }

        /**
         * 获取layout视图
         * @return {View}
         * @private
         */

    }, {
        key: '_getLayout',
        value: function _getLayout() {
            for (var index in this._views) {
                var view = this._views[index];
                if (view.IsLayout) return view;
            }
            throw Error(this._path + ' \u76EE\u5F55\u4E0B\u6CA1\u6709Layout\u7EC4\u4EF6.');
        }

        /**
         * 获取当前目录对应的路由路径
         * @return {string}
         * @private
         */

    }, {
        key: '_getPath',
        value: function _getPath() {
            if (this._path === '.') return '/';
            return this.PathInfos[this.PathInfos.length - 1];
        }

        /**
         * 获取当前目录对应下的子路由，分为两个部分
         * 1. 当前层的视图
         * 2. 子目录
         * @return {Array}
         * @private
         */

    }, {
        key: '_getChildrenRoutes',
        value: function _getChildrenRoutes() {
            var routes = [];
            for (var index in this._views) {
                var view = this._views[index];
                if (view.IsLayout) continue;
                routes.push(this._parseView(view));
            }

            for (var _index in this._subDirectory) {
                var subRoute = this._subDirectory[_index].toRouter();
                routes.push(subRoute);
            }
            return routes;
        }

        /**
         * 解析view, 转换成route
         * @param view
         * @return {Object}
         * @private
         */

    }, {
        key: '_parseView',
        value: function _parseView(view) {
            return {
                path: view.IsIndex ? '' : view.LastInfo,
                name: view.Component.name,
                component: view.Component
            };
        }
    }]);

    return Directory;
}();

exports.default = Directory;