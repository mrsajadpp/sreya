# Sreya

Sreya is a lightweight npm package for storing and managing data using JSON files as collections. It provides simple and efficient CRUD (Create, Read, Update, Delete) operations for working with collections stored locally on your file system.

## Installation

You can install Sreya via npm:

```bash
npm install sreya
```

## Usage

### Importing the Package

```typescript
import * as sreya from 'sreya';
```

### Connecting to a Database

Before using any CRUD operations, you need to connect to a database. This operation creates a directory for your database if it doesn't exist and retrieves a list of existing collections.

```typescript
await sreya.connect('mydatabase');
```

### Creating a Collection

You can create a new collection using the `create` function. If the collection already exists, this function will return a message indicating that the collection already exists.

```typescript
sreya.collection.create('mycollection');
```

### Finding Data in a Collection

You can retrieve the data stored in a collection using the `find` function. This function returns an array of objects representing the data in the collection.

```typescript
const data = sreya.collection.find('mycollection');
```

### Inserting Data into a Collection

To add new data to a collection, use the `insert` function. This function automatically generates a unique `_id` for the new data before insertion.

```typescript
const newData = { name: 'John', age: 30 };
await sreya.collection.insert('mycollection', newData);
```

### Updating Data in a Collection

You can update existing data in a collection using the `update` function. Provide a key-value pair to match the item to update and the new data.

```typescript
const newData = { name: 'Jane', age: 25 };
await sreya.collection.update('mycollection', { key: 'name', value: 'John' }, newData);
```

### Removing Data from a Collection

To remove an item from a collection based on a key-value pair, use the `remove` function.

```typescript
await sreya.collection.remove('mycollection', { key: 'name', value: 'John' });
```

### Destroying a Collection

You can delete a collection and its associated JSON file using the `destroy` function.

```typescript
await sreya.collection.destroy('mycollection');
```

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all contributors who have helped to improve and maintain this project.

---

This documentation provides an overview of the main functionalities of Sreya. For more detailed usage instructions and examples, refer to the API documentation or explore the source code.

If you have any questions or need further assistance, don't hesitate to reach out!