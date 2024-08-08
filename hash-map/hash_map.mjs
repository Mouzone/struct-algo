export class HashMap {
    constructor() {
        this.buckets = []
        this.capacity = 16

        this.num_keys = 0
        this.load_factor = .75
    }

    set(key, value) {
        const hashed_key = hash(key, this.capacity)
        this.num_keys++
        if (!this.buckets[hashed_key]) {
            this.buckets[hashed_key] = new Node(key, value)
        } else {
            let iterator = this.buckets[hashed_key]
            while (iterator) {
                if (iterator.key === key) {
                    iterator.value = value
                    return
                }
                if (!iterator.next) break
                iterator = iterator.next
            }
            iterator.next = new Node(key, value)
        }

        if (this.num_keys > this.load_factor * this.capacity) {
            this.capacity *= 2
            const new_buckets = []
            this.buckets.forEach(node => {
                while (node) {
                    const new_hashed_key = hash(node.key, this.capacity)
                    const new_node = new Node(node.key, node.value)
                    if (!new_buckets[new_hashed_key]) {
                        new_buckets[new_hashed_key] = new_node
                    } else {
                        let iterator = new_buckets[new_hashed_key]
                        while (iterator.next) {
                            iterator = iterator.next
                        }
                        iterator.next = new_node
                    }
                    node = node.next
                }
            })
            this.buckets = new_buckets
        }
    }

    get(key) {
        const hashed_key = hash(key, this.capacity)
        let iterator = this.buckets[hashed_key]
        while (iterator) {
            if (iterator.key === key) {
                return iterator.value
            }
            iterator = iterator.next
        }
        return null
    }

    has(key) {
        const hashed_key = hash(key, this.capacity)
        let iterator = this.buckets[hashed_key]
        while (iterator) {
            if (iterator.key === key) {
                return true
            }
            iterator = iterator.next
        }
        return false
    }

    remove(key) {
        const hashed_key = hash(key, this.capacity)
        let iterator = this.buckets[hashed_key]
        let previous = null
        while (iterator) {
            if (iterator.key === key) {
                if (previous) {
                    previous.next = iterator.next
                } else {
                    this.buckets[hashed_key] = iterator.next
                }
                this.num_keys--
                return true
            }
            previous = iterator
            iterator = iterator.next
        }

        return false
    }

    length() {
        return this.num_keys
    }

    clear() {
        this.buckets = []
        this.num_keys = 0
        this.capacity = 16
    }

    keys() {
        const result = []
        this.buckets.forEach(node => {
            while (node) {
                result.push(node.key)
                node = node.next
            }
        })
        return result
    }

    results() {
        const result = []
        this.buckets.forEach(node => {
            while (node) {
                result.push(node.value)
                node = node.next
            }
        })
        return result
    }

    entries() {
        const result = []
        this.buckets.forEach(node => {
            while (node) {
                result.push([node.key, node.value])
                node = node.next
            }
        })
        return result
    }
}

class Node {
    constructor(key, value, next= null) {
        this.key = key
        this.value = value
        this.next = next
    }
}

function hash(key, capacity) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity
    }

    return hashCode
}