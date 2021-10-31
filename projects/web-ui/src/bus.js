import { createClient } from 'graphql-ws';



const client = createClient({
    url: `ws://${location.host}/graphql`,
});

function Query(gql) {
    return new Promise((resolve, reject) => {
        let result;
        client.subscribe(
            {
                query: gql,
            },
            {
                next: (data) => (result = data),
                error: reject,
                complete: () => {
                    console.log('Query', result)
                    resolve(result)
                },
            },
        );
    })
};

async function Subscribe(gql, onData) {
    if (!onData) return;

    const onNext = function (data) {
        console.log('Subscribe', data)
        onData(data)
    };

    const onError = function (error) {
        unsubscribe()
        console.log('Lost Connection to Server', error)
        // alert('Lost Connection to Server')
        setTimeout(sub, 3 * 1000);
    }

    let unsubscribe = () => { };

    const sub = () => new Promise((resolve, reject) => {
        unsubscribe = client.subscribe(
            {
                query: gql,
            },
            {
                next: onNext,
                error: onError,
                complete: resolve,
            },
        );
    }).catch(onError);

    sub()
}

export { Query, Subscribe }


