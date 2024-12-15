import { builder } from '../builder';

builder.queryType({});

builder.queryField('version', (t) =>
	t.string({
		description: 'Application version',
		resolve: (parent, args, context) => context.config.app_version
	})
);

builder.mutationType({});

import './Scalars';
import './posts';
import './users';

export const Schema = builder.toSchema();
