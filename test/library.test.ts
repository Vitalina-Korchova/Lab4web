import { strict as assert } from 'assert'; // Importing assert from Node's built-in module
import { Library } from '../src/library';

describe('Library', () => {
  let library: Library<number>;

  beforeEach(() => {
    library = new Library<number>();
  });

  it('should add an item', () => {
    library.addItem(1);
    const items = library.getAllItems();
    assert.strictEqual(items.length, 1);
    assert.strictEqual(items[0], 1);
  });

  it('should remove an item', () => {
    library.addItem(1);
    library.addItem(2);
    library.removeItem(item => item === 1);
    const items = library.getAllItems();
    assert.strictEqual(items.length, 1);
    assert.strictEqual(items[0], 2);
  });

  it('should find an item', () => {
    library.addItem(1);
    library.addItem(2);
    const foundItem = library.findItem(item => item === 2);
    assert.strictEqual(foundItem, 2);
  });

  it('should clear all items', () => {
    library.addItem(1);
    library.addItem(2);
    library.clear();
    const items = library.getAllItems();
    assert.strictEqual(items.length, 0);
  });
});
