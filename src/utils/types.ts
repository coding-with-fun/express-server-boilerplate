export enum CronEnums {
    EVERY_MINUTE = '* * * * * ',
    EVERY_FIVE_MINUTES = '*/5 * * * * ',
    EVERY_10_MINUTES = '*/10 * * * * ',
    EVERY_15_MINUTES = '*/15 * * * * ',
    EVERY_30_MINUTES = '*/30 * * * *',
    EVERY_HOUR = '0 * * * *',
    EVERYDAY_MIDNIGHT = '0 0 * * *',
    EVERY_YEAR = '0 0 * 11 *',
}
