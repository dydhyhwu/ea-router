class View {

    /**
     * 视图组件的路径
     * @type {string}
     * @private
     */
    _path = '';

    /**
     * 路径分割之后的信息
     * @type {Array}
     * @private
     */
    _infos = [];

    /**
     * 对应的组件
     * @private
     */
    _component;

    /**
     * 当前视图的深度
     * @return {number}
     * @constructor
     */
    get Deep() {
        return this._infos.length;
    }

    /**
     * 由分割信息组成的路由路径
     * @return {string}
     * @constructor
     */
    get Path() {
        return `${this._infos.join('/')}`;
    }

    /**
     * 获取路由元信息中的最后一个
     * @return {*}
     * @constructor
     */
    get LastInfo() {
        return this._infos[this.Deep - 1].replace('.vue', '');
    }

    /**
     * 是否是布局文件
     * @return {boolean}
     * @constructor
     */
    get IsLayout() {
        return this.Is('layout');
    }

    /**
     * 是否为首页
     * @return {boolean}
     * @constructor
     */
    get IsIndex() {
        return this.Is('index');
    }

    /**
     * 对应的组件
     * @return {Object}
     * @constructor
     */
    get Component() {
        return this._component;
    }

    constructor(path, component) {
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
    static create(path, component) {
        return new View(path, component);
    }

    /**
     * 解析视图组件的路径
     * @param path
     * @return {Array}
     * @private
     */
    _parsePath(path) {
        let result = [];
        path = path.split('/');

        for (let index in path) {
            if(path[index].length > 0) {
                result.push(path[index].toLowerCase());
            }
        }

        return result;
    }

    Is(fileName) {
        return this.LastInfo === `${fileName}`;
    }
}

export default View;
