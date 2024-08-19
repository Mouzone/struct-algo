import {Tree} from "./binary_search_tree.mjs";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(tree.root)
console.log(tree.isBalanced())

const preOrderValues = []
tree.preOrder(node => preOrderValues.push(node.value))
console.log('Pre-Order:', preOrderValues.join(' '))

const postOrderValues = []
tree.postOrder(node => postOrderValues.push(node.value))
console.log('Post-Order:', postOrderValues.join(' '))

const inOrderValues = []
tree.inOrder(node => inOrderValues.push(node.value))
console.log('In-Order:', inOrderValues.join(' '))

tree.insert(101)
tree.insert(102)
tree.insert(103)
tree.insert(104)
prettyPrint(tree.root)
console.log(tree.isBalanced())

tree.rebalance()
prettyPrint(tree.root)
console.log(tree.isBalanced())