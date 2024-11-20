class HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        this.capacity = initialCapacity; 
        this.loadFactor = loadFactor;   
        this.size = 0;  
        this.buckets = new Array(this.capacity).fill(null).map(() => []);                
    }

    hash(key){
        let hashCode = 0;            
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
        for (const [key, value] of bucket) {
            this.set(key, value);
        }
        }
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
    
        for (const pair of bucket) {
          if (pair[0] === key) {
            pair[1] = value; // Update existing value
            return;
          }
        }
    
        bucket.push([key, value]);
        this.size++;
    
        if (this.size / this.capacity > this.loadFactor) {
          this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
    
        for (const pair of bucket) {
          if (pair[0] === key) {
            return pair[1];
          }
        }
    
        return null; // Key not found
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
    
        for (const pair of bucket) {
          if (pair[0] === key) {
            return true;
          }
        }
    
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
    
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i][0] === key) {
            bucket.splice(i, 1); // Remove the pair
            this.size--;
            return true;
          }
        }
    
        return false; // Key not found
    }
    
    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
          for (const pair of bucket) {
            keys.push(pair[0]);
          }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.buckets) {
          for (const pair of bucket) {
            values.push(pair[1]);
          }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
          for (const pair of bucket) {
            entries.push(pair);
          }
        }
        return entries;
    }
}


const map = new HashMap();
map.set("name", "Mainul");
map.set("age", 22);
map.set("location", "Bangladesh");
console.log(map.get("name")); 
console.log(map.has("age")); 
console.log(map.keys());     
console.log(map.values());   
console.log(map.entries());  
map.remove("age");
console.log(map.has("age")); 
map.clear();
console.log(map.length());  



