import { Request, Response } from 'express';
import ResponseHandler from '../../../../libs/responseHandler';
import logger from '../../../../providers/logger';

const PingController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        logger.debug('Server Pinged');

        return ResponseHandler(req, res, {
            message: 'Pong',
        });
    } catch (error) {
        return ResponseHandler(req, res, null, error);
    }
};

export default PingController;
