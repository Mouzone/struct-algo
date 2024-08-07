export class LinkedList {
    constructor() {
        this.dummy_head = new Node()
        this.tail_node = this.dummy_head
        this.length = 0
    }

    append(value) {
        this.tail_node.next = new Node(value)
        this.tail_node = this.tail_node.next

        this.length++
    }

    prepend(value) {
        const new_node = new Node(value)
        const temp = this.dummy_head.next
        this.dummy_head.next = new_node
        new_node.next = temp

        this.length++
    }

    size() {
        return this.length
    }

    head() {
        return this.dummy_head.next
    }

    tail() {
        return this.tail_node
    }

    at(index) {
        let iterator = this.dummy_head.next
        for (let i = 0; i < index; i++) {
            iterator = iterator.next
        }
        return iterator
    }

    pop() {
        this.fast = this.dummy_head.next
        this.slow = this.dummy_head
        while (this.fast && this.fast.next) {
            this.fast = this.fast.next
            this.slow = this.slow.next
        }
        this.tail_node = this.slow
        this.tail_node.next = null

        this.length--
    }

    contains(value) {
        let iterator = this.dummy_head.next
        while (iterator) {
            if (iterator.value === value) {
                return true
            }
            iterator = iterator.next
        }
        return false
    }

    toString() {
        let iterator = this.dummy_head.next
        let result = ""
        while (iterator) {
            result += ` ( ${iterator.value} ) ->`
            iterator = iterator.next
        }
        result += ` ${null} `
        return result
    }

    insertAt(value, index) {
        let iterator = this.dummy_head
        while (index > 0) {
            index--
            iterator = iterator.next
        }
        const new_node = new Node(value)
        new_node.next = iterator.next.next
        iterator.next = new_node

        this.length++
    }

    removeAt(index) {
        let iterator = this.dummy_head
        while (index > 0) {
            index--
            iterator = iterator.next
        }
        iterator.next = iterator.next.next

        this.length--
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value
        this.next = next
    }
}