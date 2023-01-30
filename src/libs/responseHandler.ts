import { Request, Response } from 'express';
import _ from 'lodash';
import logger from '../providers/logger';

const ResponseHandler = (
    req: Request,
    res: Response,
    data?: any,
    error?: any
) => {
    let success = _.get(data, 'success', true);
    let message = _.get(data, 'message', '');

    if (error instanceof Error) {
        message = req.t(_.get(error, 'message')) || 'error.somethingWentWrong';
        logger.error(message);

        success = false;
    }

    return res.json({
        ...data,
        success,
        message: req.t(message),
    });
};

export default ResponseHandler;
