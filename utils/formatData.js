import { formatDistanceToNow } from 'date-fns';

export function formatDate(timestamp) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}
