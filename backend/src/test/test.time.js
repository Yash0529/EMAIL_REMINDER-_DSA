import dayjs from 'dayjs';

const now = dayjs();

const nowFormat=now.format();

console.log("Local ISO:", nowFormat); 



console.log(nowFormat.slice(11,16));