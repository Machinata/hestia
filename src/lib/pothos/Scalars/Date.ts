import dayjs from 'dayjs';
import { builder } from '../builder';

export const Date = builder.scalarType('Date', {
	description: 'Date Scalar in ISO format',
	serialize: (t) => {
		return t.toISOString();
	},
	parseValue: (date) => {
		if (typeof date !== 'string') {
			throw new Error('Cyka blyat');
		}
		return dayjs(date);
	}
});