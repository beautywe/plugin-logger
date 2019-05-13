import { BtApp } from '@beautywe/core';
import test from 'ava';
import logger from '../src/plugin';

function newAppUseingPlugin(options) {
    const app = new BtApp();
    let plugin;

    return Promise
        .resolve()
        .then(() => {
            plugin = logger(options);
            app.use(plugin);
            app.onLaunch();
        })
        .then(() => app.onLaunch())
        .then(() => ({ app, plugin }));
}

test('use plugin', t => Promise
    .resolve()
    .then(() => newAppUseingPlugin({
        prefix: 'test',
        level: 'debug',
    }))
    .then(({ app, plugin }) => {
        t.is(app._btPlugin.plugins[0].name, plugin.name);
        t.truthy(app[`${plugin.name}`]);
        return { app };
    }));

test('unsupport level', t => t.throwsAsync(newAppUseingPlugin({ level: 'abc' })).then((error) => {
    t.is(error.message, 'level abc are not support');
}));

test('unsupport level on use', t => Promise
    .resolve()
    .then(() => newAppUseingPlugin())
    .then(({ app }) => {
        const error = t.throws(() => app.logger.log('abc'));
        t.is(error.message, 'level abc are not support');
    }));

test('listen log', (t) => {
    const marks = {};
    return Promise
        .resolve()
        .then(() => newAppUseingPlugin({
            onError: () => { marks.error = true; },
            onWarn: () => { marks.warn = true; },
            onInfo: () => { marks.info = true; },
            onDebug: () => { marks.debug = true; },
        }))
        .then(({ app }) => {
            app.logger.info('this is info');
            app.logger.warn('this is warn');
            app.logger.error('this is error');
            app.logger.debug('this is debug');

            t.truthy(marks.error);
            t.truthy(marks.warn);
            t.truthy(marks.info);
            t.truthy(marks.debug);
        });
});
