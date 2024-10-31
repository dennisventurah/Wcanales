function matInverse(a) {
    let A = a.slice();
    const B = A.length;
    if (B != A[0].length)
        throw "Se requiere una matriz cuadrada para calcular la inversa";
    const C = new Array(B)
      , D = new Array(B)
      , E = new Array(B);
    var F, G, H, I, J, K;
    for (H = B; --H >= 0; )
        E[H] = H;
    for (G = 0; G < B; ++G) {
        I = G;
        F = A[G];
        K = F[G];
        for (H = G + 1; H < B; ++H) {
            const L = F[H];
            if (Math.abs(L) > Math.abs(K)) {
                I = H;
                K = L
            }
        }
        if (Math.abs(K) < 1e-12) {
            return null
        }
        K = 1.0 / K;
        for (H = 0; H < B; ++H) {
            D[H] = A[H][I];
            A[H][I] = A[H][G];
            A[H][G] = -D[H] * K;
            A[G][H] *= K;
            C[H] = A[G][H]
        }
        A[G][G] = K;
        H = E[G];
        E[G] = E[I];
        E[I] = H;
        for (H = 0; H < B; ++H) {
            if (H != G) {
                const M = D[H]
                  , N = A[H];
                for (I = B; --I >= 0; ) {
                    if (I != G)
                        N[I] -= C[I] * M
                }
            }
        }
    }
    for (G = B; --G >= 0; ) {
        I = E[G];
        while (G != I) {
            F = A[G];
            A[G] = A[I];
            A[I] = F;
            J = E[G];
            E[G] = E[I];
            E[I] = J;
            I = E[G]
        }
    }
    return A
}

function rang(A, B) {
    var C, D, E, F, G, H, I, J, K, L;
    const M = A[0].length
      , N = A.length
      , O = N < M ? N : M;
    if (B == null)
        B = 1e-8;
    J = 0;
    for (C = 0; C < N; ++C) {
        K = A[C];
        for (E = 0; E < M; ++E) {
            H = Math.abs(K[E]);
            if (H > J)
                J = H
        }
    }
    if (J === 0)
        return 0;
    B *= J;
    for (C = 0; C < O; ++C) {
        F = C;
        G = C;
        H = Math.abs(A[C][C]);
        for (D = C; D < N; ++D) {
            L = A[D];
            for (E = C; E < M; ++E) {
                if (Math.abs(L[E]) > H) {
                    F = D;
                    G = E;
                    H = Math.abs(L[E])
                }
            }
        }
        if (H <= B)
            break;
        if (C != F) {
            K = A[C];
            A[C] = A[F];
            A[F] = K
        }
        if (C != G) {
            for (D = 0; D < N; ++D) {
                H = A[D][G];
                A[D][G] = A[D][C];
                A[D][C] = H
            }
        }
        K = A[C];
        I = 1.0 / K[C];
        for (D = C + 1; D < N; ++D) {
            L = A[D];
            if (L[C] !== 0.0) {
                const P = L[C] * I;
                for (E = C; E < M; ++E)
                    L[E] -= K[E] * P
            }
        }
    }
    return C
}

function determinante(a, B) {
    let A = a.slice();
    const C = A.length;
    var D, E, F, G, H = 1.0, I, J;
    if (B == null)
        B = 1e-10;
    for (F = 0; F < C - 1; ++F) {
        I = 0.0;
        G = F;
        for (D = F; D < C; ++D)
            if (Math.abs(A[D][F]) > I) {
                I = Math.abs(A[D][F]);
                G = D
            }
        if (I < B)
            return 0.0;
        if (G != F) {
            J = A[F];
            A[F] = A[G];
            A[G] = J;
            H = -H
        }
        J = A[F];
        for (D = F + 1; D < C; ++D) {
            const K = A[D]
              , L = K[F] / J[F];
            if (L !== 0.0)
                for (E = F + 1; E < C; ++E)
                    K[E] -= L * J[E];
            K[F] = 0.0
        }
    }
    for (D = 0; D < C; ++D)
        H *= A[D][D];
    return H
}

export function zeros(F, C){
    var zeroM = Array(F);
    for(let i=0;i<F;i++){
        var row = Array();
        for(let j=0; j<C; j++){
            row.push(0.0);
        }
        zeroM[i] = row;
    }
    return new Matrix(zeroM);
}

export function identity(N){
    let newM = zeros(N, N);
    for(var i=0; i<N; i++){
        newM.m[i][i] = 1.0;
    }
    return newM;
}

function transpose(A) {
    let newM = zeros(A.col, A.row);

    for (let i = 0; i < newM.row; i++){
        for (let j = 0; j < newM.col; j++){
            newM.m[i][j] = A.m[j][i];
        }
    }
    return newM;
}

export class Matrix{
    constructor (array){
        this.m = array;
        this.row = array.length;
        this.col = array[0].length;

    }

    get det(){
        
        return determinante(this.m);
    }

    get inverse(){          
        return new Matrix(matInverse(this.m));
        
    }
}

Matrix.prototype.dot = function(other){
    let newM = zeros(this.row, this.col);
    for(let i=0; i<newM.row; i++){
        for(let j=0; j<newM.col; j++){
            newM.m[i][j] = this.m[i][j] * other;
        }
    }
    return newM;
}

Matrix.prototype.by = function (other){

    if(this.col == other.row){
        let suma, i, j, k;
        let newM = zeros(this.row, other.col);
        for(i=0; i<newM.row; i++){
            
            for(j=0; j<newM.col; j++){
                suma = 0;
                for (k=0; k<this.col; k++){
                    suma += this.m[i][k] * other.m[k][j]; 
                }
                newM.m[i][j] = suma;
            }
        }
        return newM;
    }
    else{
        throw "No se pudo multiplicar";
    }
    
}

Matrix.prototype.add = function(other){
    if(other == null){
        throw "Se requiere una matriz o un numero";
    }
    else if(other.constructor.name == "Matrix"){
        
        if(this.row == other.row && this.col == other.col){
            let newM = zeros(this.row, this.col);
            for(let i=0; i<this.row; i++){
                for(let j=0; j<this.col; j++){
                    newM.m[i][j] = this.m[i][j] + other.m[i][j];
                }
            }
            return newM;
        }
        
    }
    else if(other.constructor.name == "Number"){
        let newM = zeros(this.row, this.col);
        for(var i=0; i<this.row; i++){
            for(var j=0; j<this.col; j++){
                newM.m[i][j] = this.m[i][j] + other;
            }
        }
        return newM;
    }
}

Matrix.prototype.negative = function(){
    let newM = zeros(this.row, this.col);
    for(var i=0; i<this.row; i++){
        for(var j=0; j<this.col; j++){
            newM.m[i][j] = this.m[i][j] * -1;
        }
    }
    return newM;
}

Matrix.prototype.abs = function(){
    let newM = zeros(this.row, this.col);
    for(var i=0; i<this.row; i++){
        for(var j=0; j<this.col; j++){
            newM.m[i][j] = Math.abs(this.m[i][j]);
        }
    }
    return newM;
}

Matrix.prototype.T = function(){
    return transpose(this);
}

Matrix.prototype.getRow = function(rows){
    const l_r = typeof rows == 'number' ? [rows]: rows;
    let newM = [];
    l_r.forEach(n => {
        newM.push(this.m[n]);
    })
    return new Matrix(newM);
}

Matrix.prototype.delRow = function(rows){
    const l_r = typeof rows == 'number' ? [rows]: rows;
    let n_rows = [];
    for(var i=0; i<this.row; i++){
        if(l_r.indexOf(i) == -1){
            n_rows.push(i);
        }
        
    }
    return this.getRow(n_rows);
}

Matrix.prototype.getCol = function(cols){
    const l_c = typeof cols == 'number' ? [cols]: cols;
    let newM = zeros(this.row, l_c.length);
    for(var i=0; i<this.row; i++){
        for(var j=0; j<l_c.length; j++){
            newM.m[i][j] = this.m[i][l_c[j]];
        }
    }
    return newM;
}

Matrix.prototype.delRow = function(cols){
    const l_c = typeof cols == 'number' ? [cols]: cols;
    var n_cols = [];
    for(var i=0; i<this.col; i++){
        if(l_c.indexOf(i) == -1){
            n_cols.push(i);
        }
        
    }
    return this.getCol(n_cols);
}

Matrix.prototype.norm = function(){
    let norma=0;
    for(let i=0;i<this.row; i++){
        
        for(let j=0;j<this.col; j++){
            norma += this.m[i][j] * this.m[i][j];
        }
    }
    return Math.sqrt(norma);
}
