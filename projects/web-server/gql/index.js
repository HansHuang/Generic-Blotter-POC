const { makeBehavior } = require('graphql-ws/lib/use/uWebSockets'),
    resolvers = require('./resolvers'),
    schema = require('./schema')


module.exports = () => {
    return makeBehavior({
        schema,
        roots: resolvers,
        // onConnect: (ctx) => {
        //     console.log(`${new Date().toLocaleString()} Connect`, ctx);
        // },
        // onSubscribe: (ctx, msg) => {
        //     console.log(`${new Date().toLocaleString()} Subscribe`, { ctx, msg });
        // },
        // onNext: (ctx, msg, args, result) => {
        //   console.debug('Next', { ctx, msg, args, result });
        // },
        onError: (ctx, msg, errors) => {
            console.error(`${new Date().toLocaleString()} Error`, { ctx, msg, errors });
        },
        // onComplete: (ctx, msg) => {
        //     console.log(`${new Date().toLocaleString()} Complete`, { ctx, msg });
        // }
    })
}