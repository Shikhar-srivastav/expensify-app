const book = {
    title: 'Wheel of Time',
    author: 'Robert Jordan',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mPrice] = item;
console.log(`A medium ${itemName} costs ${mPrice}`);