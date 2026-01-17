import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCronFromLocalTime=(timeStr,userTimezone=UTC)=>{
    const [hours,minutes]=timeStr.split(':');

    const localTime=dayjs.tz(userTimezone).set('hour',hours).set('minute',minutes);

    const utcTime=localTime.utc();

    return `${utcTime.minute()} ${utcTime.hour()} * * *`;
}