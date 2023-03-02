import {
    configureWunderGraphApplication,
    cors,
    EnvironmentVariable,
    introspect,
    templates,
} from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const apiIntegrations: any[] = [];

apiIntegrations.push(
    introspect.graphql({
        url: 'https://horizon-api.www.coggles.com/graphql',
        apiNamespace: 'horizon',
        customIntScalars: ['SKU']
    })
);

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
    apis: apiIntegrations,
    server,
    operations,
    codeGenerators: [
        {
            templates: [
                // use all the typescript react templates to generate a client
                ...templates.typescript.all,
                templates.typescript.operations,
                templates.typescript.linkBuilder,
            ],
            // create-react-app expects all code to be inside /src
            // path: "../frontend/src/generated",
        },
    ],
    cors: {
        ...cors.allowAll,
        allowedOrigins:
            process.env.NODE_ENV === 'production'
                ? [
                      // change this before deploying to production to the actual domain where you're deploying your app
                      process.env.APP_URL || 'http://localhost:3000',
                  ]
                : [
                      process.env.APP_URL || 'http://localhost:3000',
                      new EnvironmentVariable('WG_ALLOWED_ORIGIN'),
                  ],
    },
    dotGraphQLConfig: {
        hasDotWunderGraphDirectory: false,
    },
    security: {
        enableGraphQLEndpoint:
            process.env.NODE_ENV !== 'production' ||
            process.env.GITPOD_WORKSPACE_ID !== undefined,
    },
});
