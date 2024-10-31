import { long, area, areagauss, perimetro, talud, pendiente, cutAry } from "./mathUtils";

const G = 9.81 // GRAVITY
const G2 = 19.62 // 2*9.81

export function trapez(q, b, z1, z2, n, s, e, imax){

    var a=0.0, p=0.0, da=0.0, dp=0.0, f=0.0, df=0.0;
    const con = q * n / Math.sqrt(s);
    var yi = 1.0;
    var yf = 2.0;
    var c = 1;
    while (Math.abs(yi-yf) > e) {
        yi = yf;
        a = b * yi + z1*yi*yi/2 + z2*yi*yi/2;
        p = b + yi * Math.sqrt(z1 * z1 + 1) + yi * Math.sqrt(z2 * z2 + 1);
        f = Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
        da = b + yi * (z1 + z2);
        dp = Math.sqrt(z1 * z1 + 1) + Math.sqrt(z2 * z2 + 1);
        df = 5 * Math.pow(a, 2/3) / Math.pow(p, 2/3) * da / 3 - 2 * Math.pow(a, 5/3) / Math.pow(p, 5/3) * dp / 3;
        yf = yi - f / df;
        c++;
        if (c >= imax){
            break;
        } 
    }
    const t = b + yf*(z1+z2);
    a = b * yf + z1*yf*yf/2 + z2*yf*yf/2;
    p = b + yf * Math.sqrt(z1 * z1 + 1) + yf * Math.sqrt(z2 * z2 + 1);
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = yf+Math.pow(v,2)/G2;
    return {y:yf, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr};
}

export function circ(q, d, n, s, e, imax){

    var a=0.0, p=0.0, da=0.0, dp=0.0, f=0.0, df=0.0;
    const con = q * n / Math.sqrt(s);
    var yi = 1.0;
    var yf = 2.0;
    var c = 1;
    if (q > d/2){
        yi = Math.PI * 1.95 - 0.01;
        yf = Math.PI * 1.95;
    }

    while (Math.abs(yi-yf) > e) {
        yi = yf;
        a = d*d*(yi-Math.sin(yi))/8;
        p = yi*d/2;
        f = Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
        da = d*d*(1-Math.cos(yi))/8;
        dp = d/2;
        df = 5 * Math.pow(a, 2/3) / Math.pow(p, 2/3) * da / 3 - 2 * Math.pow(a, 5/3) / Math.pow(p, 5/3) * dp / 3;
        yf = yi - f / df;
        c++;
        if (c >= imax || a>(Math.PI*d*d/4)){
            break;
        } 
    }
    if (a <= Math.PI*d*d/4){
        const h = d*(1-Math.cos(yf/2))/2;
        const t = d*Math.sin(yf/2);
        a = d*d*(yf-Math.sin(yf))/8;
        p = yf*d/2;
        const v = q/a;
        const fr = v/Math.sqrt(G*a/t);
        const en = h+Math.pow(v,2)/G2;
        return {y:h, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr};
    }
    else {
        return "Error"
    }
    
}


export function parab(q, t, n, s, e, imax){

    var a=0.0, p=0.0, da=0.0, dp=0.0, f=0.0, df=0.0, x=0.0, dx=0.0;
    const con = q * n / Math.sqrt(s);
    var yi = 1.0;
    var yf = 2.0;
    var c = 1;
    while (Math.abs(yi-yf) > e) {
        yi = yf;
        a = 2*t*yi/3;
        da = 2*t/3;
        if (yi/t<=0.25){
            p = t+8*yi*yi/(3*t);
            dp = 16*yi/(3*t);
        }
        else if(yi/t>0.25){
            x = 4*yi/t;
            dx = 4/t;
            p = 0.5 * t * (Math.sqrt(1 + x * x)+Math.log(x + Math.sqrt(1+x*x))/x);
            dp = 0.5*t*(x/Math.sqrt(1+x*x)+1/(x*Math.sqrt(1+x*x))-Math.log(x+Math.sqrt(1+x*x))/(x*x))*dx;
        }
        f = Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
        df = 5 * Math.pow(a, 2/3) / Math.pow(p, 2/3) * da / 3 - 2 * Math.pow(a, 5/3) / Math.pow(p, 5/3) * dp / 3;
        yf = yi - f / df;
        c++;
        if (c >= imax){
            break;
        } 
    }
    
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = yf+Math.pow(v,2)/G2;
    return {y:yf, a:a, p:p, rh:a/p, ym:a/t, v:v, e:en, fr:fr};
}

function horton(x, y, n){
    var sum=0.0, pt=0.0;
    for (let i=0; i<x.length-1; i++){
        pt += long(x[i],y[i],x[i+1],y[i+1]);
        sum += long(x[i],y[i],x[i+1],y[i+1]) * Math.pow(n[i], 3/2);
    }
    return Math.pow(sum/pt, 2/3)
}

function pavlovsky(x, y, n){
    var sum=0.0, pt=0.0;
    for (let i=0; i<x.length-1; i++){
        pt += long(x[i],y[i],x[i+1],y[i+1]);
        sum += long(x[i],y[i],x[i+1],y[i+1]) * Math.pow(n[i], 2);
    }
    return Math.sqrt(sum/pt)
}

function letter(x, y, n){
    const ym = y[0];
    var sum=0.0, pt=0.0, at=0.0;
    for (let i=0; i<x.length-1; i++){
        pt += long(x[i],y[i],x[i+1],y[i+1]);
        at += area(x[i],y[i],x[i+1],y[i+1], ym);
        sum += long(x[i],y[i],x[i+1],y[i+1]) * Math.pow(area(x[i],y[i],x[i+1],y[i+1], ym)/long(x[i],y[i],x[i+1],y[i+1]), 5/3)/n[i];
    }
    return pt*Math.pow(at/pt, 5/3)/sum;

}


export function canalcomp(x, y, q, n, s, e, imax, cr){

    var a=0.0, p=0.0, da=0.0, dp=0.0, f=0.0, df=0.0;
    var nx, ny, nnn;
    var con = 0.0;
    var nn = 0.0;
    var yi = 1.0;
    var yf = (Math.max(...y)-Math.min(...y))/2;
    var c = 1;
    while (Math.abs(yi-yf) > e/10) {
        yi = yf;
        nx = cutAry(x,y,yi,n).x;
        ny = cutAry(x,y,yi,n).y;
        nnn = cutAry(x,y,yi,n).n; 
        switch(cr){
            case 1:
                nn = horton(nx, ny, nnn);
                break;
            case 2:
                nn = pavlovsky(nx, ny, nnn);
                break;
            case 3:
                nn = letter(nx, ny, nnn);
                break;
        }
        con = q * nn / Math.sqrt(s);
        a = areagauss(nx, ny);
        p = perimetro(nx, ny);
        f = Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
        da = nx[nx.length-1]-nx[0];
        dp = Math.sqrt(1+Math.pow(talud(nx[0],ny[0],nx[1],ny[1]),2)) + Math.sqrt(Math.pow(talud(nx[nx.length-1], ny[ny.length-1], nx[nx.length-2], ny[ny.length-2]),2) + 1);
        df = 5 * Math.pow(a, 2/3) / Math.pow(p, 2/3) * da / 3 - 2 * Math.pow(a, 5/3) / Math.pow(p, 5/3) * dp / 3;
        yf = yi - f / df;
        c++;
        if (c >= imax+1){
            break;
        }
    }
    const v = q/a;
    const fr = v/Math.sqrt(G*a/da);
    const en = yf+Math.pow(v,2)/G2;
    return {y:yf, a:a, p:p, rh:a/p, t:da, ym:a/da, n:nn, v:v, e:en, fr:fr, px:nx, py:ny};
}