const Event = require('./model/event');

module.exports = {
  event: {
    create: (datum) => {
      return new Promise((resolve, reject) => {
        new Event(datum).save((err, doc) => {
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
    }
  }
}
