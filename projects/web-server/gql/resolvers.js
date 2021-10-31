const { randomStr } = require("../lib/util"),
  { EventEmitter } = require('events'),
  { on } = require('events-to-async');

module.exports = {
  query: {
    hello: () => 'Hello World!',
    users: () => generateUsers(20)
  },
  subscription: {
    users: subUsers
  },
};

const usersEvent = new EventEmitter();
setInterval(() => {
  usersEvent.emit('updated', generateUsers(2))
}, 1000)

async function* subUsers() {
  const usersIterator = on((handler) => {
    usersEvent.on("updated", handler);
    return () => { usersEvent.off("updated", handler) }
  });

  for await (const data of usersIterator) {
    // console.log(data[0]);
    yield { users: data[0] }
  }
}

function generateUsers(len) {
  return [...new Array(len)]
    .map(_ => Math.floor(Math.random() * 30))
    .map(id => ({
      id,
      name: randomStr(4),
      email: `${randomStr(5)}@mail.com`,
      score: (Math.random() * 500).toFixed(2),
    }))
}