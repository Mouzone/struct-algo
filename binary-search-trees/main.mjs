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
// tree.insert(10)
// prettyPrint(tree.root)
// tree.insert(0)
// prettyPrint(tree.root)

// tree.delete(0)
// prettyPrint(tree.root)
// tree.delete(9)
// prettyPrint(tree.root)
// tree.delete(4)
// prettyPrint(tree.root)
// tree.delete(8)
// prettyPrint(tree.root)
// tree.delete(67)
// tree.delete(6345)
// prettyPrint(tree.root)
// tree.delete(9)
// prettyPrint(tree.root)