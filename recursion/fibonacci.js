// num means the number of fibonacci numbers to generate
function iteration(num){
    if (num === 0) {
        return []
    } else if (num === 1) {
        return [0]
    }

    const answer = [0, 1]
    const iterations = num - 2
    for (let i = 0; i < iterations; i++) {
        answer.push(answer[answer.length-1] + answer[answer.length-2])
    }

    return answer
}

const recurs_answer = []
function recursion(num) {
    if (num === 0){
        return recurs_answer
    }

    if (recurs_answer.length === 0) {
        recurs_answer.push(0)
    }
    else if (recurs_answer.length === 1){
        recurs_answer.push(1)
    } else {
        recurs_answer.push(recurs_answer[recurs_answer.length-1] + recurs_answer[recurs_answer.length-2])
    }
    return recursion(num - 1)
}

function test(num){
    console.log(iteration(num))
    console.log(recursion(num))
}

test(8)
