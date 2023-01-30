import { CronJob } from 'cron';
import { CronEnums } from '../utils/types';

//IMPORT CRON HERE
import CronPong from '../app/commands/cron/pong';

const cronSetup = async (): Promise<void> => {
    //ADD CRON JOBS HERE
    new CronJob(CronEnums.EVERYDAY_MIDNIGHT, CronPong).start();
};

export default cronSetup;
