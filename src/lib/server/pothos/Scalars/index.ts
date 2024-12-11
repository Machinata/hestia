import type { Dayjs } from 'dayjs';

export * from './Date';

export type Scalars = {
	Date: {
		Input: Dayjs;
		Output: Dayjs;
	};
};