class HashMap {
    constructor(size) {
        this.table = new Array(size);
        this.size = size;
    }

    hash(key){
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.size;
    }

    set(key, value) {
        const index = this.hash(key);
        this.table[index] = value;
        
    }

    get(key) {
        const index = this.hash(key);
        return this.table[index];
    }

    remove(key) {
        const index = this.hash(key);
        return this.table[index] = undefined;

    }
    
    display() {
        for(let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, this.table[i]);
            }
        }
    }

}


const table = new HashMap(50);

// table.set("name", "Mainul");
// table.set("age", "22");
// table.display();

// console.log(table.get('name'));

table.set('mane', "ridoy");
// table.display();
table.set('name', "nirobb");
table.display();
