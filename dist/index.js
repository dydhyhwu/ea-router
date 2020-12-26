"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RouteName", {
  enumerable: true,
  get: function get() {
    return _RouteName.RouteName;
  }
});
Object.defineProperty(exports, "Context", {
  enumerable: true,
  get: function get() {
    return _Context.Context;
  }
});
Object.defineProperty(exports, "EnableProp", {
  enumerable: true,
  get: function get() {
    return _Context.EnableProp;
  }
});
Object.defineProperty(exports, "Alias", {
  enumerable: true,
  get: function get() {
    return _Alias.Alias;
  }
});
Object.defineProperty(exports, "Meta", {
  enumerable: true,
  get: function get() {
    return _Meta.Meta;
  }
});
exports["default"] = void 0;

var _generator = _interopRequireDefault(require("./generator"));

var _RouteName = require("./decorators/RouteName");

var _Context = require("./decorators/Context");

var _Alias = require("./decorators/Alias");

var _Meta = require("./decorators/Meta");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _generator["default"];
exports["default"] = _default;