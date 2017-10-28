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
    count: (aggregateId) => {
      return new Promise((resolve, reject) => {
        Event.count({ aggregateId: aggregateId }, (err, count) => {
          err ? reject(err) : resolve(count);
        });
      });
    }
  }
}
