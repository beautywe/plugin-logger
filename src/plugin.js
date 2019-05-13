import Logger from './logger';

/**
 * @param {string} prefix - prefix name
 * @param {string} level - name of level
 * @param {function} titleTemplate - custom title info
 * @param {function} onError - get warn args
 * @param {function} onWarn - get warn args
 * @param {function} onInfo - get warn args
 * @param {function} onDebug - get warn args
 */
module.exports = function plugin(options) {
    // 这里可以通过 options 做可配置化逻辑。
    const pluginName = 'logger';
    const logger = new Logger(options);

    return {
        // 插件名
        name: pluginName,

        // 插件初始化方法，会在宿主启动的时候执行
        initialize({ theHost }) {
            theHost[pluginName] = logger;
        },
    };
};
