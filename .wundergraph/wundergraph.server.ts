import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import type { HooksConfig } from './.wundergraph/generated/wundergraph.hooks';
import type { InternalClient } from './.wundergraph/generated/wundergraph.internal.client';

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
	hooks: {
    global: {},
		queries: {},
		mutations: {},
	},
	graphqlServers: [],
}));
