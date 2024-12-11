import { builder } from '../builder';

export const DateScalar = builder.scalarType('Date', {
	description: 'Date Scalar in ISO format',
	serialize: (date) => {
		return date.toISOString();
	},
	parseValue: (date) => {
		if (typeof date !== 'string') {
			throw new Error('Cyka blyat');
		}
		return new Date(date);
	}
});