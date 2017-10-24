const Event = require('./model/event');

module.exports = {
  event: {
    create: (item) => {
      return new Promise((resolve, reject) => {
        new Event(item).save((err, doc) => {
          err ? reject(err) : resolve(doc);
        });
      });
    },
    read: (comparator) => {
      return new Promise((resolve, reject) => {
        Event.find(comparator, (err, docs) => {
          err ? reject(err) : resolve(docs);
        });
      });
    },
    count: () => {    // TODO could cache this? increment on save?
      return new Promise((resolve, reject) => {
        Event.count({}, (err, count) => {
          err ? reject(err) : resolve(count);
        });
      });
    }
  }
}
