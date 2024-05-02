const { connect, collection } = require('../dist/index');

async function clal() {
    let collections = await connect('sreya');
    console.log(collections);
    // collection.create('user')

    collection.insert('user', {
        name: 'hi'
    })

    let col = await collection.find('user');
    console.log(col);

    // collection.destroy('user')

    // collection.remove('user', { key: 'name', value: 'hi' })
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error));

    collection.update('user', { key: '_id', value: 'lvot0o72hbtd8' }, {
        name: 'hello'
    })


}
clal()

// let data = [
//     { name: 'hi', _id: 'lvosf5m010pbs' },
//     { name: 'hi', _id: 'lvosf732940sd' },
//     { name: 'hi', _id: 'lvosgl8jihfzd' },
//     { name: 'hi', _id: 'lvosi3334xwbx' },
//     { name: 'hi', _id: 'lvosihllrfz18' },
//     { name: 'hi', _id: 'lvosj10iwcw8r' },
//     { name: 'hi', _id: 'lvosmjm9ghjh8' },
//     { name: 'hi', _id: 'lvosn4cu85gtg' },
//     { name: 'hi', _id: 'lvosne0kicoxu' }
// ];

// data.forEach(item => {
//     console.log(item["name"]);
// });
