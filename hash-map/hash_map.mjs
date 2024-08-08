export class HashMap {
    constructor() {
        this.buckets = []
        this.capacity = 16

        this.curr_keys = []
        this.num_keys = 0
        this.load_factor = .75
    }

    set(key, value) {
        const hashed_key = hash(key, this.capacity)
        if (!this.curr_keys[hashed_key] || this.curr_keys[hashed_key] === key) {
            if (!this.curr_keys[hashed_key]) {
                this.num_keys++
            }
            this.buckets[hashed_key] = value
        }

        if (this.num_keys > this.load_factor * this.capacity) {
            const old_capacity = this.capacity
            const new_buckets = []
            const new_curr_keys = []
            this.capacity *= 2
            this.num_keys.forEach(key => {
                const old_hashed_key = hash(key, old_capacity)
                const new_hashed_key = hash(key, this.capacity)
                new_curr_keys[new_hashed_key] = key
                new_buckets[new_hashed_key] = this.buckets[old_hashed_key]
            })
            this.buckets = new_buckets
            this.curr_keys = new_curr_keys
        }
    }

    get(key) {
        const hashed_key = hash(key, this.capacity)
        if (this.curr_keys[hashed_key] === key) {
            return this.buckets[hashed_key]
        } else {
            return null
        }
    }

    has(key) {
        const hashed_key = hash(key, this.capacity)
        return this.curr_keys[hashed_key] === key
    }

    remove(key) {
        const hashed_key = hash(key, this.capacity)
        if (this.curr_keys[hashed_key] === key) {
            this.curr_keys[hashed_key] = null
            this.buckets[hashed_key] = null
            this.num_keys--
            return true
        }
        return false
    }

    length() {
        return this.num_keys
    }

    clear() {
        this.buckets = []
        this.curr_keys = []
    }

    keys() {
        const result = []
        self.curr_keys.forEach(key => {
            if (key) {
                result.push(key)
            }
        })
        return result
    }

    results() {
        const result = []
        self.buckets.forEach(bucket => {
            if (bucket) {
                result.push(bucket)
            }
        })
        return result
    }

    entries() {
        const result = []
        self.curr_keys.forEach(key => {
            if (key) {
                const curr_hash = hash(key)
                result.push([key, self.buckets[curr_hash]])
            }
        })
        return result
    }
}

function hash(key, capacity) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 31; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCode.at(i)) % capacity
    }

    return hashCode
}