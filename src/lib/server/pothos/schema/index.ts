import { version } from '$app/environment';
import { builder } from '../builder';

builder.queryType({});

builder.queryField('version', (t) =>
	t.string({
		description: 'Application version',
		resolve: () => version
	})
);

builder.mutationType({});

import './Scalars';
import './posts';
import './users';

export const Schema = builder.toSchema();
