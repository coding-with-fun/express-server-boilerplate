import { i18n } from 'i18next';
import middleware from 'i18next-http-middleware';
import cronSetup from './providers/cron';
import Express from './providers/express';
import initializeLocales from './providers/locale';
import logger from './providers/logger';
import Server from './providers/server';

const express = Express();
const {
    i18Middleware,
    i18next,
}: {
    i18Middleware: typeof middleware;
    i18next: i18n;
} = initializeLocales();

Promise.all([
    express.initializeApp(),
    express.configureViews(),
    express.configureLocale(i18Middleware, i18next),
]).then(async () => {
    const app = express.app;

    const httpServer = Server(app);
    await httpServer.start();
    await cronSetup();
});

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('SIGTERM', async () => {
    logger.debug('SIGTERM signal received: closing HTTP server');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});
