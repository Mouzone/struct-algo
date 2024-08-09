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
        }

        const middle = Math.floor(array.length / 2)
        const root = new Node(array[middle])

        root.left = this.buildTree(array.slice(0, middle))
        root.right = this.buildTree(array.slice(middle+1))

        return root
    }

    insert(value) {
        // assume this.root will always have at least one node
        // assume value is not duplicate of value already in
        const new_node = new Node(value)
        let iterator = this.root
        while (iterator) {
            if (value > iterator.value) {
                if (!iterator.right) {
                    iterator.right = new_node
                    return
                }
                iterator = iterator.right
            } else {
                if (!iterator.left) {
                    iterator.left = new_node
                    return
                }
                iterator = iterator.left
            }
        }
    }

    delete(value) {
        let iterator = this.root
        while (iterator) {
            if (iterator.value === value) {
                this.root = this.delete_helper(iterator)
                return true
            } else if (iterator.left && iterator.left.value === value) {
                iterator.left = this.delete_helper(iterator.left)
                return true
            } else if (iterator.right && iterator.right.value === value) {
                iterator.right = this.delete_helper(iterator.right)
                return true
            }

            if (value > iterator.value) {

                iterator = iterator.right

            } else if (value < iterator.value) {

                iterator = iterator.left

            }
        }
        return false
    }

    delete_helper(node_to_remove) {
        if (!node_to_remove.left && !node_to_remove.right) {

            return null

        } else if (!node_to_remove.left) {

            return node_to_remove.right

        } else if (!node_to_remove.right) {

            return node_to_remove.left

        } else {
            // node_to_remove has both children
            let iterator = node_to_remove.right
            let prev = node_to_remove
            while (iterator) {
                if (!iterator.left) {
                    // arrived at the replacement node
                    // set its child_node as its replacement
                    // if prev is node_to_remove then its right become iterator's right
                    // --> which then iterator.right becomes its old right branch
                    if (node_to_remove === prev) {
                        node_to_remove.right = iterator.right
                    } else {
                        prev.left = iterator.right
                    }

                    iterator.left = node_to_remove.left
                    iterator.right = node_to_remove.right
                    
                    break
                }
                prev = iterator
                iterator = iterator.left
            }

            return iterator
        }
    }
}


class Node {
    constructor (value = null, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}