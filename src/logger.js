function defaultTitleTemplate({ prefix, levelName }) {
    return prefix ? `[${prefix}:${levelName}]` : `[${levelName}]`;
}

function upperFirestChar(string) {
    return `on${string.substr(0, 1).toUpperCase()}${string.substr(1)}`;
}

/** Class representing a logger. */
class Logger {
    /**
     * Create a logger.
     * @param {string} prefix - prefix name
     * @param {string} level - name of level
     * @param {function} titleTemplate - custom title info
     * @param {function} onError - get warn args
     * @param {function} onWarn - get warn args
     * @param {function} onInfo - get warn args
     * @param {function} onDebug - get warn args
     */
    constructor(options = {}) {
        const {
            prefix,
            level = 'info',
            titleTemplate = defaultTitleTemplate,
        } = options;
        if (!Logger.LEVEL[level]) throw new Error(`level ${level} are not support`);
        this.prefix = prefix;
        this.level = level;
        this.titleTemplate = titleTemplate;

        // dynamic defind onXXX function
        Object.keys(Logger.LEVEL).forEach((levelName) => {
            const onFunName = upperFirestChar(levelName);
            this[onFunName] = options[onFunName];
        });
    }

    log(level, ...args) {
        const curLevelId = Logger.LEVEL[level];
        const confLevelId = Logger.LEVEL[this.level];
        if (!curLevelId) throw new Error(`level ${level} are not support`);

        if (curLevelId <= confLevelId) {
            const title = this.titleTemplate({ prefix: this.prefix, levelName: level });
            // eslint-disable-next-line no-console
            console[level](title, ...args);
        }
    }
}

Logger.LEVEL = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
};

Object.keys(Logger.LEVEL).forEach((levelName) => {
    // dynamic defind log function
    Logger.prototype[levelName] = function logForLevel(...args) {
        const onFunName = upperFirestChar(levelName);
        if (typeof this[onFunName] === 'function') {
            this[onFunName](...args);
        }
        return this.log(levelName, ...args);
    };
});

// export default Logger;
module.exports = Logger;
