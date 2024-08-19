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

    find(value) {
        let iterator = this.root
        while (iterator) {
            if (value === iterator.value) {

                return iterator

            } else if (value < iterator.value) {

                iterator = iterator.left

            } else {

                iterator = iterator.right

            }
        }
        return null
    }

    levelOrder(callback) {
        const queue = [this.root]
        while (queue.length) {
            const curr_node = queue.shift()

            callback(curr_node)
            if (curr_node.left) {
                queue.push(curr_node.left)
            } else if (curr_node.right) {
                queue.push(curr_node.right)
            }
        }
    }

    inOrder(callback) {
        const stack = []
        let current = this.root

        while (1) {
            if (current) {
                stack.push(current)
                current = current.left
            } else if (stack.length) {
                current = stack.pop()
                callback(current)

                current = current.right
            } else {
                break
            }
        }
    }

    preOrder(callback) {
        const stack = [this.root]

        // todo: fix
        while (stack.length) {
           const curr_node = stack.pop()
           callback(curr_node)
           if (curr_node.right) {
               stack.push(curr_node.right)
           }
           if (curr_node.left) {
               stack.push(curr_node.left)
           }
       }
    }

    postOrder(callback) {
        const stack = [];
        let curr_node = this.root;
        let last_node_visited = null;

        while (stack.length || curr_node) {
            if (curr_node) {
                stack.push(curr_node);
                curr_node = curr_node.left;
            } else {
                let peek_node = stack[stack.length - 1];
                if (peek_node.right && last_node_visited !== peek_node.right) {
                    curr_node = peek_node.right;
                } else {
                    callback(peek_node);
                    last_node_visited = stack.pop();
                }
            }
        }
    }

    height(node){
        if (!node) return -1;  // Base case

        const left_height = this.height(node.left);
        const right_height = this.height(node.right);

        return Math.max(left_height, right_height) + 1;
    }

    depth(node) {
        let current = this.root;
        let depth = 0;

        while (current) {
            if (current === node) {
                return depth;
            } else if (node.value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }
    }

    isBalanced() {
        function check(node) {
            if (!node.left && !node.right) {
                return [true, 0]
            }

            let left_result = [true, -1]
            if (node.left) {
                left_result = check(node.left)
            }

            let right_result = [true, -1]
            if (node.right) {
                right_result = check(node.right)
            }

            return [left_result[0] && right_result[0] && Math.abs(left_result[1] - right_result[1]) <= 1
                , Math.max(left_result[1], right_result[1]) + 1]
        }

        return check(this.root)[0]
    }

    rebalance() {
        const stack = []
        const numbers = []
        let current = this.root

        while (1) {
            if (current) {
                stack.push(current)
                current = current.left
            } else if (stack.length) {
                current = stack.pop()
                numbers.push(current.value)

                current = current.right
            } else {
                break
            }
        }

        this.root = this.buildTree(numbers)
    }
}


class Node {
    constructor (value = null, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}