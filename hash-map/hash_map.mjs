class HashMap {
    constructor() {
        this.buckets = []
        this.bucket_size = 100

        this.curr_keys = []
        this.num_keys = 0
    }

    set(key, value) {
        const hashed_key = hash(key, this.bucket_size)
        if (!this.curr_keys[hashed_key] || this.curr_keys[hashed_key] === key) {
            if (!this.curr_keys[hashed_key]) {
                this.num_keys++
            }
            this.buckets[hashed_key] = value
        }
        // todo: figure out colliision scenario
    }

    get(key) {
        const hashed_key = hash(key, this.bucket_size)
        if (this.curr_keys[hashed_key] === key) {
            return this.buckets[hashed_key]
        } else {
            return null
        }
    }

    has(key) {
        const hashed_key = hash(key, this.bucket_size)
        return this.curr_keys[hashed_key] === key
    }

    remove(key) {
        const hashed_key = hash(key, this.bucket_size)
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

function hash(key, bucket_size) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 31; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCode.at(i)) % bucket_size
    }

    return hashCode
}