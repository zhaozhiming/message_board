import PouchDB from 'pouchdb';

const db = new PouchDB('./db');

export default [
  {
    method: ['PUT', 'POST'],
    path: '/api/message/save',
    config: {
      handler(request, reply) {
        const message = JSON.parse(request.payload);
        db.put(message, (err) => {
          if (!err) {
            return reply('save message success');
          }
          return reply(`save message error: ${err}`);
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
  {
    method: ['GET'],
    path: '/api/message/{id}',
    config: {
      handler(request, reply) {
        db.get(request.params.id)
        .then(message => reply(message))
        .catch(err => reply(`find message error: ${err}`));
      },
    },
  },
];
