function mergeSort(list) {
    if (list.length === 0 || list.length === 1) {
        return list
    }

    const split_index = Math.floor(list.length / 2)
    const list1 = mergeSort(list.slice(0, split_index))
    const list2 = mergeSort(list.slice(split_index))

    const result = []
    while (list1.length && list2.length) {
        if (list1[0] <= list2[0]) {
            result.push(list1.shift())
        } else {
            result.push(list2.shift())
        }
    }

    if (list1.length) {
        result.concat(list1)
    } else if (list2.length) {
        result.concat(list2)
    }

    return result
}

console.log(mergeSort([]))
console.log(mergeSort([0]))
console.log(mergeSort([0, 1]))
console.log(mergeSort([0, 1, 2]))
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
// console.log(mergeSort([79, 100, 105, 110]))