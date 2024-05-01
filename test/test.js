const { connect, collection } = require('../dist/index');

async function clal() {
    let collections = await connect('sreya');
    console.log(collections);
    collection.create('user')

    let col = await collection.find('user');
    console.log(col);

    collection.insert('user', {
        name: 'hi'
    })

}
clal()