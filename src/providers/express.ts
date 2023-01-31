import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { i18n } from 'i18next';
import { RequestLogger } from '../app/http/middleware/RequestLogger';
import env from '../env';
import router from '../routes/api/api';

const Express = () => {
    const app = express();

    const initializeApp = () => {
        app.use(
            cors({
                origin: env.cors.urls,
                methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
            })
        );
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(env.app.root_dir + '/public'));
        app.use(
            env.api.user_uploaded_content_path,
            express.static(env.app.root_dir + '/storage/uploads/')
        );
        app.use(helmet());
        app.use(compression());
        app.disable('x-powered-by');

        const port = env.app.port;
        app.set('port', port);
    };

    const configureViews = () => {
        app.set('view engine', 'hbs');
        app.set('views', env.app.root_dir + '/views/');
        app.use(`${env.api.api_prefix}`, RequestLogger, router);
    };

    const configureLocale = (middleware: any, i18next: i18n) => {
        app.use(middleware.handle(i18next));
    };

    return {
        app,
        initializeApp,
        configureViews,
        configureLocale,
    };
};

export default Express;
