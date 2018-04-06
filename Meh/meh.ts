function meh(A:Array<number>) {
    let _A = inverse(A)
    var result = []
    // var num_result = 0

    A.map((A_i:number, i) => {
        // console.log(`A_i, i: ${A_i}, ${i}`)
        A.map((A_j:number, j) => {
            // console.log(`A_j, j: ${A_j}, ${j}`)
            A.map((A_k:number, k) => {
                // console.log(`A_k, k: ${A_k}, ${k}`)

                let A_ijk:number = A_i * A_j * A_k
                let ls = _A[A_ijk] ? _A[A_ijk] : []
                ls.filter(l => k < l).map(l => {
                    if (i < j && j < k && k < l) {
                        // result.push([i, j, k, l])
                        result.push([A_i, A_j, A_k, A_ijk])
                    }
                })
            })
        })
    })

    return result
}

function inverse(A:Array<Number>) {
    var inv = {}

    A.map((v:number, i) => {
        if (!inv[v]) {
            inv[v] = []
        }
        inv[v].push(i)
    })

    return inv
}

var input = []
for (var i = 1; i < 100; i += 1) {
    input.push(i)
}

let mu = meh(input)
console.log(mu)