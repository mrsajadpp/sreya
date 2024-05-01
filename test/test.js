const { connect, collection } = require('../dist/index');

async function clal() {
    let collections = await connect('sreya');
    console.log(collections);
    // collection.create('user')
    // collection.create('admin')

}
clal()