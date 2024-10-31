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
    var nn = new Array();
    if (Math.max(y)<yn){
        return "Error"
    }
    for(let i=0; i<x.length-1; i++){
        if (y[i]<yn){
            ny.push(y[i]);
            nx.push(x[i]);
            nn.push(n[i]);
        }
    }
    const ci = x.indexOf(nx[0]);
    const cf = x.lastIndexOf(nx[nx.length-1]);
    nx.unshift(nx[0] + talud(x[ci-1],y[ci-1], x[ci], y[ci]) * (-y[ci]+yn));
    ny.unshift(yn);
    nn.unshift(n[ci-1])
    nx.push(nx[nx.length-1] + talud(x[cf], y[cf], x[cf+1], y[cf+1]) * (yn-y[cf]));
    ny.push(yn);
    return {x:nx, y:ny, n:nn};
}