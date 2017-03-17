function countOnes(num) {
    let b = num.toString(2).split("")
    return b.reduce((acc, val) => +acc + +val, 0)
}

function sameCountOfOnes(a, b) {
    return countOnes(a) === countOnes(b)
}

function possibleSubtractions(d) {
    var i = 1
    var k = []
    while (i < d) {
        k.push(i)
        i *= 2
    }
    return k
}

function validMoves(d) {
    var moves = possibleSubtractions(d)
    var results = moves.map(s => (d - s))
    var validMoves = moves.filter((m, i) => sameCountOfOnes(d, results[i]))
    return validMoves
}

function iterationToPlayer(i) {
    let players = ["Pat", "Mat"]
    return players[i % 2]
}

function play(d, i) {
    // console.log(`Current digit is ${d}.`)
    var vms  = validMoves(d)

    if (vms.length === 0) {
        // console.log(`Player ${iterationToPlayer(i)} has no valid moves and loses.`)
        console.log(`Winner: ${iterationToPlayer(i + 1)}`)
        return (i + 1)
    }

    var winner = null

    vms.map(vm => {
        if (winner === null) {
            winner = play(d - vm, i + 1)
        }
        // console.log(`Player ${iterationToPlayer(i)} plays ${vm}.`)
    })
}

inputs = []

for (var i = 1; i < 10; i += 1) {
    inputs.push(i)
}

inputs.map(N => {
    d = N
    console.log(d)
    play(d, 0)
    console.log("---")
})