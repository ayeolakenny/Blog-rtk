import { parseISO, formatDistanceToNow } from "date-fns"

interface TimeAgoInterface {
	timestamp: string
}

export const TimeAgo = ({ timestamp }: TimeAgoInterface) => {
	let timeAgo = ''
	if (timestamp) {
		const date = parseISO(timestamp);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `${timePeriod} ago`
	}
	return (
		<span title={timestamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	)
}
