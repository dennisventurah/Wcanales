
export function max(aarray){ 
    return aarray.reduce(function(a,b){return Math.max(a,b)})
}

export function min(aarray){ 
    return aarray.reduce(function(a,b){return Math.min(a,b)})
}

export function round(number, decimals){
    const a = Math.round(number*Math.pow(10, decimals))/Math.pow(10, decimals);
    return a;
}

export function areagauss(x, y){
    var sum = 0.0, sum2=0.0;
    for (let i=0; i<x.length-1; i++){
        sum += x[i]*y[i+1];
        sum2 += x[i+1]*y[i];
    }
    sum += x[x.length-1]*y[0];
    sum2 += x[0]*y[y.length-1];
    return Math.abs(sum-sum2)/2;
}

export function pendiente(x1, y1, x2, y2){
    return (y2-y1)/(x2-x1);
}

export function talud(x1, y1, x2, y2){
    return (x2-x1)/(y2-y1);
}

export function long(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

export function perimetro(x, y){
    var sum=0.0;
    for (let i=0; i<x.length-1;i++){
        sum+=long(x[i], y[i], x[i+1], y[i+1]);
    }
    return sum;
}

export function area(x1, y1, x2, y2, ym){
    
    return ( ym-y1 + ym-y2 )*(x2-x1)/2;
}

export function cutAry(x, y, yn, n){
    var ny = new Array();
    var nx = new Array();
    
    const isN = typeof n == undefined || typeof n == null;
    if (isN){
        var nn = new Array();
    }
    if (max(y)<yn){
        return "Error"
    }
    for(let i=0; i<x.length; i++){
        if (y[i]<=yn){
            if(i>0){
                if(y[i-1]>yn){
                    nx.push(x[i-1]+talud(x[i-1], y[i-1], x[i], y[i])*(yn-y[i-1]));
                    ny.push(yn);
                    isN? nn.push(n[i-1]):0;
                }
                ny.push(y[i]);
                nx.push(x[i]);
                isN? nn.push(n[i-1]):0;
            }
        }
        else {
            if(i>0){
                if(y[i-1]<=yn){
                    nx.push(x[i-1]+talud(x[i-1], y[i-1], x[i], y[i])*(yn-y[i-1]));
                    ny.push(yn);
                    isN? nn.push(n[i-1]):0;
                }
            }
        }
    }
    
    isN? nn.shift():0;
    if(isN){
        return {x:nx, y:ny, n:nn};
    }else{
        return {x:nx, y:ny, n:n};
    }
    
    
}

function range(start, end, step){
    var range = [];
    const typeofstart = typeof start;
    const typeofend = typeof end;
    const typeofstep = typeof step;
    if (end < start){
        step = -step;
    }
    while (step>0 ? end>= start : end <= start){
        range.push(start);
        start += step;
    }
    return range;
}

export function letF(p, yf){
    const x1 = -Math.sqrt(5*p*yf);
    const x2 = Math.sqrt(5*p*yf);
    const x = range(x1,x2,(x2-x1)/100);
    const y = x.map( function(i) {
        return i*i/(4*p);
    })
    return {x:x, y:y};
}

export function letFC(d,c){
    
    const x = range(-d/2,d/2,(d)/200);
    x.push(d/2);
    const y = x.map( function(i) {
        return Math.sqrt(d*d/4-i*i)*c+d/2;
    })
    return {x:x, y:y};
}

export function lerch(z, s, a){
    let suma = 0;
    for(let i=0; i<100; i++){
        suma += Math.pow(z, i)/Math.pow(a+i, s);
    }
    return suma;
}

var g = 7;
var p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
];

var g_ln = 607/128;
var p_ln = [
    0.99999999999999709182,
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.21743961811521264320e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.26190838401581408670e-4,
    0.36899182659531622704e-5
];

// Spouge approximation (suitable for large arguments)
function lngamma(z) {

    if(z < 0) return Number('0/0');
    var x = p_ln[0];
    for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
    var t = z + g_ln + 0.5;
    return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z);
}

export function gamma (z) {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    else if(z > 100) return Math.exp(lngamma(z));
    else {
        z -= 1;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (z + i);
        }
        var t = z + g + 0.5;

        return Math.sqrt(2 * Math.PI)
            * Math.pow(t, z + 0.5)
            * Math.exp(-t)
            * x
        ;
    }
};

export function Fback(u, N){
    if(u<1){
        //return (u*lerch(Math.pow(u, N), 1, 1/N)*gamma(1/N))/(N*N*gamma(1+1/N));
        return u*lerch(Math.pow(u,N), 1, 1/N)/N;
    }
    else if(u==1){
        return NaN;
    }
    else{
        let fbakh = 0;
        for(let i=1; i<100;i++){
            fbakh += 1/((i*N-1)*Math.pow(u, i*N-1));
        }
        return fbakh;
    }
    
}