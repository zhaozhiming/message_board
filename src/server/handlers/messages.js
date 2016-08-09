import PouchDB from 'pouchdb';

const db = new PouchDB('./db');

export default [
  {
    method: ['PUT'],
    path: '/api/message/add',
    config: {
      handler(request, reply) {
        const message = JSON.parse(request.payload);
        db.put(message, (err) => {
          if (!err) {
            return reply('Success add message');
          }
          return reply(`add message error: ${err}`);
        });
      },
    },
  },
  {
    method: ['GET'],
    path: '/api/message/all',
    config: {
      handler(request, reply) {
        db.allDocs({
          include_docs: true,
          descending: true,
        }, (err, result) => {
          if (!err) {
            return reply(result.rows);
          }
          return reply(`fetch all messages error: ${err}`);
        });
      },
    },
  },
];
