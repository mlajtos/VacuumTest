function meh(A) {
    var _A = inverse(A);
    var result = [];
    // var num_result = 0
    A.map(function (A_i, i) {
        // console.log(`A_i, i: ${A_i}, ${i}`)
        A.map(function (A_j, j) {
            // console.log(`A_j, j: ${A_j}, ${j}`)
            A.map(function (A_k, k) {
                // console.log(`A_k, k: ${A_k}, ${k}`)
                var A_ijk = A_i * A_j * A_k;
                var ls = _A[A_ijk] ? _A[A_ijk] : [];
                ls.filter(function (l) { return k < l; }).map(function (l) {
                    if (i < j && j < k && k < l) {
                        // result.push([i, j, k, l])
                        result.push([A_i, A_j, A_k, A_ijk]);
                    }
                });
            });
        });
    });
    return result;
}
function inverse(A) {
    var inv = {};
    A.map(function (v, i) {
        if (!inv[v]) {
            inv[v] = [];
        }
        inv[v].push(i);
    });
    return inv;
}
var input = [];
for (var i = 1; i < 100; i += 1) {
    input.push(i);
}
var mu = meh(input);
console.log(mu);
