
const Util = require('util');
const IgniteClient = require('apache-ignite-client');
const { ObjectType, CacheConfiguration, SqlFieldsQuery, SqlQuery, IgniteClientConfiguration, ComplexObjectType, QueryEntity, QueryField } = require('apache-ignite-client');

const { randomStr } = require('../web-server/lib/util')

const ENDPOINT = 'ip172-18-0-23-c5vilifnjsv000f3fs60-47100.direct.labs.play-with-docker.com';

const USERS_CACHE_NAME = 'SqlQueryDemo_Users';

class User {
    constructor(name = null, email = null, phoneNumber = null) {
        this.id = User.generateId();
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    static generateId() {
        if (!User.id) {
            User.id = 0;
        }
        const id = User.id;
        User.id++;
        return id;
    }
}

class SqlQueryEntriesDemo {
    constructor() {
        this._cache = null;
    }

    async start() {
        const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
        try {
            console.log(`connecting... %s`, ENDPOINT)
            await igniteClient.connect(new IgniteClientConfiguration(ENDPOINT));
            console.log(`connected %s`, ENDPOINT)

            const cacheCfg = new CacheConfiguration().
                setQueryEntities(
                    new QueryEntity().
                        setValueTypeName('User').
                        setFields([
                            new QueryField('id', 'java.lang.Integer'),
                            new QueryField('name', 'java.lang.String'),
                            new QueryField('email', 'java.lang.String'),
                            new QueryField('score', 'java.lang.Double')
                        ]));
            this._cache = (await igniteClient.getOrCreateCache(USERS_CACHE_NAME, cacheCfg)).
                setKeyType(ObjectType.PRIMITIVE_TYPE.INTEGER).
                setValueType(new ComplexObjectType(new User()).
                    setFieldType('id', ObjectType.PRIMITIVE_TYPE.INTEGER));

            await this.generateUsers(20);

            const sqlCursor = await this._cache.query(
                new SqlQuery('User', 'score > ? and score <= ?').
                    setArgs(300, 500));

            console.log('SqlQuery results (score between 300 and 500):');
            let user;
            do {
                user = (await sqlCursor.getValue()).getValue();
                console.log(Util.format('  name: %s %s, salary: %d', user.name, user.email, user.score));
            } while (sqlCursor.hasMore());

            await igniteClient.destroyCache(USERS_CACHE_NAME);
        }
        catch (err) {
            console.log('ERROR: ' + err.message);
        }
        finally {
            igniteClient.disconnect();
        }
    }

    async generateUsers(len) {
        while (len-- > 0) {
            let user = new User(randomStr(4), `${randomStr(5)}@mail.com`, (Math.random() * 500).toFixed(2));
            await this._cache.put(user.id, user);
        }
        console.log(`${len} users created`);
    }

    onStateChanged(state, reason) {
        if (state === IgniteClient.STATE.CONNECTED) {
            console.log('Client is started');
        }
        else if (state === IgniteClient.STATE.DISCONNECTED) {
            console.log('Client is stopped');
            if (reason) {
                console.log(reason);
            }
        }
    }
}

const demo = new SqlQueryEntriesDemo();
demo.start();


// https://github.com/apache/ignite-nodejs-thin-client/blob/master/examples/SqlQueryEntriesExample.js