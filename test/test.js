const { connect, collection } = require('../dist/index');

let collections = connect('sreya');
console.log(collections);
 
collection.create('user')
collection.create('admin')