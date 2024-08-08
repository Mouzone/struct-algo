export class Tree {
    constructor(initial_values) {
        const set = new Set(initial_values)
        const array = Array.from(set)
        array.sort((a, b) => a - b)
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        if (array.length === 0) {
            return null
        } else if (array.length === 1) {
            return new Node(array[0])
        }

        const middle = Math.floor(array.length / 2)
        const root = new Node(array[middle])

        root.left = this.buildTree(array.slice(0, middle))
        root.right = this.buildTree(array.slice(middle+1))

        return root
    }
}


class Node {
    constructor (value = null, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}