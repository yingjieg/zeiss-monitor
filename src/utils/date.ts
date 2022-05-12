import dayjs from 'dayjs';

export function formatDate(date: string, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format).toString();
}
