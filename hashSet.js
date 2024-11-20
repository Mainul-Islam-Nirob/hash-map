class HashSet {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
      this.capacity = initialCapacity; // The size of the bucket array
      this.loadFactor = loadFactor;   // Maximum load factor before resizing
      this.size = 0;                  // Number of keys in the set
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
  
    // Hash function to calculate the bucket index for a given key
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
  
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
  
      return hashCode;
    }
  
    // Resize the buckets when the load factor is exceeded
    resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        for (const key of bucket) {
          this.add(key); // Rehash and reinsert keys
        }
      }
    }
  
    // Add a key to the set
    add(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      // Check if the key already exists
      for (const existingKey of bucket) {
        if (existingKey === key) {
          return; // Key already exists; do nothing
        }
      }
  
      // Add the new key
      bucket.push(key);
      this.size++;
  
      // Resize if load factor is exceeded
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  
    // Check if a key exists in the set
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (const existingKey of bucket) {
        if (existingKey === key) {
          return true;
        }
      }
  
      return false;
    }
  
    // Remove a key from the set
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i] === key) {
          bucket.splice(i, 1); // Remove the key
          this.size--;
          return true;
        }
      }
  
      return false; // Key not found
    }
  
    // Get the number of keys in the set
    size() {
      return this.size;
    }
  
    // Clear all keys from the set
    clear() {
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    // Get all keys in the set
    keys() {
      const keys = [];
      for (const bucket of this.buckets) {
        for (const key of bucket) {
          keys.push(key);
        }
      }
      return keys;
    }
  
    // Get all entries in the set (keys only, as a single-item array)
    entries() {
      return this.keys().map(key => [key]);
    }
  }
  
  // Example Usage
  const set = new HashSet();
  set.add("apple");
  set.add("banana");
  set.add("cherry");
  console.log(set.has("banana")); // true
  console.log(set.has("grape"));  // false
  set.remove("banana");
  console.log(set.has("banana")); // false
  console.log(set.keys());        // ["apple", "cherry"]
  set.clear();
  console.log(set.keys());        // []
  