import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import env from '../env';
import logger from './logger';

const initializeLocales = () => {
    i18next
        .use(middleware.LanguageDetector)
        .use(Backend)
        .init({
            preload: ['en'],
            supportedLngs: ['en'],
            lng: 'en',
            saveMissing: true,
            nonExplicitSupportedLngs: false,
            // debug: env.node !== 'production' ? true : false,
            backend: {
                loadPath: env.app.root_dir + '/locales/{{lng}}/{{ns}}.json',
                addPath:
                    env.app.root_dir + '/locales/{{lng}}/{{ns}}.missing.json',
            },
            fallbackLng: 'en',
        });

    logger.info('LOGGER INITIALIZED');

    return {
        i18next: i18next,
        i18Middleware: middleware,
    };
};

export default initializeLocales;
