import { long, area, areagauss, perimetro, talud, pendiente, cutAry, max, min, Fback } from "./mathUtils.js";

const G = 9.81; // GRAVITY
const G2 = 19.62; // 2*9.81

export function new_rap(f, xo, ...args){
    let xf = xo+1;
    let delta = 1e-10;
    let cont = 1;

    while (true){
        xf = xo - delta * f(xo, ...args)/(f(xo+delta, ...args)-f(xo, ...args));
        if (Math.abs(xf-xo)<delta | cont>5){
            break;
        }
        cont += 1;
        xo = xf;
    }
    return xf;
}
export function secante(f, xo){
    const delta = 1e-7;
    var x1 = xo+delta*1000
    var x2=0;
    let cont = 1;
    while(true){
        
        x2 = x1 - f(x1)*(x1-xo)/(f(x1)-f(xo));
        if (Math.abs(x2-x1)<delta | cont>20){
            break;
        }
        cont +=1;
        x1 = xo;
        xo = x2;
    }
    return x2;
}

export function trapez(q, b, z1, z2, n, s, show){
    function area(y){
        return b * y + z1*y*y/2 + z2*y*y/2;
    }
    function per(y){
        return b + y * Math.sqrt(z1 * z1 + 1) + y * Math.sqrt(z2 * z2 + 1);
    }
    function manning(y){
        const con = q * n / Math.sqrt(s);
        return Math.pow(area(y), 5/3) * Math.pow(per(y), -2/3) - con;
    }
    var yo = 0.1;
    show?show.innerHTML = "Progreso: 0%":0; 
    const yf = new_rap(manning, yo);
    show?show.innerHTML = "Progreso: 100%":0;
    const t = b + yf*(z1+z2);
    const a = area(yf);
    const p = per(yf);
    const v = q/area(yf);
    const fr = v/Math.sqrt(G*a/t);
    const en = yf+Math.pow(v,2)/G2;
    return {y:yf, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr, cx:[0, z1*1.25*yf,z1*1.25*yf+b,z1*1.25*yf+b+z2*1.25*yf], cy:[1.25*yf, 0, 0, 1.25*yf], cx1:[0.25*yf*z1, 1.25*yf*z1+b+yf*z2], cy1:[yf, yf]};
}

export function circ(q, d, n, s, show) {
    
    let yo = 0.6*d; // Estimación inicial para el tirante
    let r = d/2;
    function area(y) {
        // Área mojada del canal circular para un tirante dado
        return (r * r * Math.acos((r - y) / r)) - ((r - y) * Math.sqrt(2 * r * y - y * y));
    }
    
    function per(y) {
        // Perímetro mojado del canal circular para un tirante dado
        return r * 2 * Math.acos((r - y) / r);
    }

    function manning(y){
        const con = q * n / Math.sqrt(s);
        return Math.pow(area(y), 5/3) * Math.pow(per(y), -2/3) - con;
    }

    function tiranteAgua(y){
        return 2 * Math.sqrt(y*(d-y));
    }

    const y = new_rap(manning, yo);

    const t = tiranteAgua(y);

    const v = q/area(y);
    const fr = v/Math.sqrt(G*area(y)/t);
    const en = y+Math.pow(v,2)/G2;
    return {y:y, a:area(y), p:per(y), rh:area(y)/per(y), t:t, v:v, e:en, fr:fr, cx1:[-t/2, t/2], cy1:[y, y]};
}

export function parab(q, t, n, s){
    function area(y){
        return 2* t * y/3;
    }
    function per(y){
        if (y/t<=0.25){
            return p = t+8*y*y/(3*t);
        }
        else{
            let x = 4*y/t;
            return  0.5 * t * (Math.sqrt(1 + x * x)+Math.log(x + Math.sqrt(1+x*x))/x);
        }
    }
    function manning(y){
        const con = q * n / Math.sqrt(s);
        return Math.pow(area(y), 5/3) * Math.pow(per(y), -2/3) - con;
    }
    let yo = t/3;
    const yf = new_rap(manning, yo);
    const a = area(yf);
    const p = per(yf);
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = yf+Math.pow(v,2)/G2;
    const foco = 0.25*(t*t)/(4*yf);
    return {y:yf, a:a, p:p, rh:a/p, fc:foco, v:v, e:en, fr:fr, cx1:[-Math.sqrt(4*foco*yf), Math.sqrt(4*foco*yf)], cy1:[yf, yf]};
}

function horton(x, y, n){
    var sum=0.0, pt=0.0;
    
    for (let i=0; i<x.length-1; i++){
        pt += long(x[i],y[i],x[i+1],y[i+1]);
        sum += long(x[i],y[i],x[i+1],y[i+1]) * Math.pow(n[i], 3/2);
    }
    return Math.pow(sum/pt, 2/3);
}

function pavlovsky(x, y, n){
    var sum=0.0, pt=0.0;
    for (let i=0; i<x.length-1; i++){
        pt += long(x[i],y[i],x[i+1],y[i+1]);
        sum += long(x[i],y[i],x[i+1],y[i+1]) * Math.pow(n[i], 2);
    }
    return Math.sqrt(sum/pt);
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

export function canalcomp(cx, cy, q, n, s, cr){
    function geom(y){

        let nx = cutAry(cx, cy, y, n).x;
        let ny = cutAry(cx, cy, y, n).y;
        let nnn = cutAry(cx, cy, y, n).n;
        let nn;
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
        return {nx:nx, ny:ny, a:areagauss(nx, ny), p:perimetro(nx, ny), n:nn};
    }
    function manning(y){
        let geometry = geom(y+min(cy));
        console.log(geometry);
        let a = geometry.a;
        let p = geometry.p;
        let con = q * geometry.n / Math.sqrt(s);
        return Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
    }
    console.log((max(cy)-min(cy))/2);
    const yf = new_rap(manning, (max(cy)-min(cy))/2);
    const geometry = geom(yf+min(cy));
    const a = geometry.a;
    const p = geometry.p;
    const nx= geometry.nx;
    const t = nx[nx.length-1]-nx[0];
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = yf+Math.pow(v,2)/G2;
    return {y:yf, a:a,
        p: p,
        rh: a/p,
        t:t,
        v: v,
        fr:fr,
        n: geometry.n,
        e:en, px:geometry.nx, py:geometry.ny};
}

export function canalcompn(x, y, q, n, s){
    const con = q * n / Math.sqrt(s);
    function geom(yy){
        let nx = cutAry(x, y, yy, n).x;
        let ny = cutAry(x, y, yy, n).y;
        return {a:areagauss(nx, ny), p:perimetro(nx, ny)};
    }
    function manning(yy){
        let a = geom(yy).a;
        let p = geom(yy).p;
        console.log(yy, a, p);
        return Math.pow(a, 5/3) * Math.pow(p, -2/3) - con;
    }
    const yf = new_rap(manning, (max(y)-min(y))/2);
    console.log(yf);

}

export function meh(q, z1, z2, n, s, e, show){
   
    function baseE(y){
        return y*(Math.sqrt(z1**2+1)+Math.sqrt(z2**2+1)-z1-z2);
    }
    function areaM(y, b){
        return b*y + y*y*(z1+z2)/2;
    }
    function perM(y, b){
        return b+y*(Math.sqrt(z1*z1+1)+Math.sqrt(z2*z2+1));
    }
    function fManning(y){
        var b = baseE(y)
        const a = areaM(y, b);
        const p = perM(y, b);
        return Math.pow(a, 5/3) * Math.pow(p, -2/3)*Math.sqrt(s)/n - q; 
    }
    function dFManning(y){
        const dY=1e-10
        return (fManning(y+dY)-fManning(y))/dY;
    }
    var y = 1.0;
    var er = Math.abs(fManning(y));
    while (er>e){
        y = y-fManning(y)/dFManning(y)
        er = Math.abs(fManning(y));
    }
    var b = baseE(y)
    const t = b + y*(z1+z2);
    const a = areaM(y, b)
    const p = perM(y, b);
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = y+Math.pow(v,2)/G2;
    return {y:y, b:b, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr, cx:[0, z1*1.25*y,z1*1.25*y+b,z1*1.25*y+b+z2*1.25*y], cy:[1.25*y, 0, 0, 1.25*y], cx1:[0.25*y*z1, 1.25*y*z1+b+y*z2], cy1:[y, y]};
}

export function smih(q, z1, z2, n, s, e, show){
   
    function base(y){
        return 2*y*(Math.sqrt(z1**2+1)+Math.sqrt(z2**2+1)-z1-z2);
    }
    function area(y){
        return base(y)*y + y*y*(z1+z2)/2;
    }
    function per(y){
        return base(y)+y*(Math.sqrt(z1*z1+1)+Math.sqrt(z2*z2+1));
    }
    function fManning(y){

        return Math.pow(area(y), 5/3) * Math.pow(per(y), -2/3)*Math.sqrt(s)/n - q; 
    }

    var yo = 1;
    const y = new_rap(fManning, yo);
    var b = base(y)
    const t = b + y*(z1+z2);
    const a = area(y)
    const p = per(y);
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = y+Math.pow(v,2)/G2;
    return {y:y, b:b, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr, cx:[0, z1*1.25*y,z1*1.25*y+b,z1*1.25*y+b+z2*1.25*y], cy:[1.25*y, 0, 0, 1.25*y], cx1:[0.25*y*z1, 1.25*y*z1+b+y*z2], cy1:[y, y]};
}

export function trapCri(q, b, z1, z2, show){
    function area(y){
        return b*y+y*y*(z1+z2)/2;
    }

    function eaM(y){
        return b+y*(z1+z2);
    }

    function f(y){
        return q*Math.sqrt(eaM(y))-Math.pow(area(y), 3/2)*Math.sqrt(G);
    }


    var yo = 1;
    const y = new_rap(f, yo);
    const t = eaM(y);
    const a = area(y);
    const p = b+y*(Math.sqrt(z1*z1+1)+Math.sqrt(z2*z2+1));
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = y+Math.pow(v,2)/G2;
    const n = 0.015;
    const s = Math.pow(q*n*Math.pow(p, 2/3)/Math.pow(a, 5/3),2);
    return {y:y, a:a, p:p, rh:a/p, t:t, ym:a/t, v:v, e:en, fr:fr, s:s, cx:[0, z1*1.25*y,z1*1.25*y+b,z1*1.25*y+b+z2*1.25*y], cy:[1.25*y, 0, 0, 1.25*y], cx1:[0.25*y*z1, 1.25*y*z1+b+y*z2], cy1:[y, y]};

}

export function paraCri(q, t, show){
    function area(y){
        return 2*t*y/3;
    }

    function f(y){
        return q*Math.sqrt(t)-Math.pow(area(y), 3/2)*Math.sqrt(G);
    }


    var yo = 1;
    const y = new_rap(f, yo);

    const a = area(y);
    var p=0;
    if (y/t<=0.25){
            p = t+8*y*y/(3*t);
            
        }
    else if(y/t>0.25){
        let x = 4*y/t;
        p = 0.5 * t * (Math.sqrt(1 + x * x)+Math.log(x + Math.sqrt(1+x*x))/x);
    }
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = y+Math.pow(v,2)/G2;
    const foco = 0.25*(t*t)/(4*y);
    return {y:y, a:a, p:p, rh:a/p, fc:foco, v:v, e:en, fr:fr, cx1:[-Math.sqrt(4*foco*y), Math.sqrt(4*foco*y)], cy1:[y, y]};
}

export function circCri(q, d, show){
    const r = d/2;
    function area(y) {
        // Área mojada del canal circular para un tirante dado
        return (r * r * Math.acos((r - y) / r)) - ((r - y) * Math.sqrt(2 * r * y - y * y));
    }
    function per(y) {
        // Perímetro mojado del canal circular para un tirante dado
        return r * 2 * Math.acos((r - y) / r);
    }
    
    function eaM(y){
        return 2 * Math.sqrt(y*(d-y));
    }

    function f(y){
        return q*Math.sqrt(eaM(y))-Math.pow(area(y), 3/2)*Math.sqrt(G);
    }

    var yo = d/2;
    const y = new_rap(f, yo);
    const t = eaM(y);
    const v = q/area(y);
    const fr = v/Math.sqrt(G*area(y)/t);
    const en = y+Math.pow(v,2)/G2;
    return {y:y, a:area(y), p:per(y), rh:area(y)/per(y), t:t, v:v, e:en, fr:fr, cx1:[-t/2, t/2], cy1:[y, y]};
}

export function resalto_rec(q, b, y){
        
    const f2 = q/(b*y*Math.sqrt(G*y));
    const y1 = 0.5*y*(Math.sqrt(8*f2*f2+1)-1);
    const v2 = q/(y1*b);
    const v1 = q/(y*b);
    const L = 5*Math.abs(y-y1);
    
    const dE = Math.abs((y+Math.pow(v1,2)/G2)-(y1+Math.pow(v2,2)/G2));
    const fr = v2/Math.sqrt(G*y1);
    const hr = Math.abs(y1-y);
    return {y1:y1, L:L, dE:dE, fr:fr, hr:hr};
}

export function resalto_trap(q, b, z1, z2, y){
    
    const z = (z1+z2)/2;
    
    const v2 = q/(y*(b+z*y));
    
    const t = b/(z*y);
    const r = v2*v2/(G2*y);
    console.log(t,r)
    function f(j){
        return Math.pow(j, 4)+((5*t+2)/2)*Math.pow(j, 3)+(3*t*t/2+5*t/2+1)*Math.pow(j, 2)+(t*t/2+(t-6*r)*(t+1))*j-6*r*(t+1)*(t+1);
    }
    function fz(z){
        return 2.24927536*Math.pow(z,3)-3.5942029*z*z+7.00724638*z+5.00289855;
    }
    const j = new_rap(f, 10);
    const y1 = y*j;
    const v1 = q/(y1*(b+z*y1));
    const L =  fz(z)*Math.abs(y1-y);

    const dE = Math.abs((y1+Math.pow(v1,2)/G2)-(y+Math.pow(v2,2)/G2));
    const fr = v1/Math.sqrt(G*y1*(b+z*y1)/(b+2*z*y1));
    const hr = Math.abs(y1-y);
    return {y1:y1, L:L, dE:dE, fr:fr, hr:hr, j:j};
}

export function resalto_para(q, t, y){
    const a2 = 2*t*y/3;

    const v2 = q/a2;
    const d2 = 2*y/3;
    const f2 = v2/Math.sqrt(G2*y/3);
    function f(j){
        return Math.pow(j, 3.5)+Math.pow(j, 3)+Math.pow(j, 2.5)+Math.pow(j, 2)+Math.pow(j, 1.5)-5*Math.pow(f2, 2)*j/3-5*f2*f2*Math.sqrt(j)/3-5*f2*f2/3;
    }
    
    let j = new_rap(f, q);
    if (isNaN(j)){
        j = secante(f, q);
        if (isNaN(j)){
            return "Error"
        }
    }
    const y1 = y*j;
    const foco = (t*t)/(8*y);
    const t1 = 2*Math.sqrt(2*y1*foco);
    const a1 = 2*t1*y1/3;
    const v1 = q/a1;
    const f1 = v1/Math.sqrt(G2*y1/3)
    const L =  y1>y?11.7*y*Math.pow(f2-1,0.832):11.7*y1*Math.pow(f1-1,0.832);
    const d1 = 2*y1/3;
    const dE = Math.abs((y1+Math.pow(v1,2)/G2)-(y+Math.pow(v2,2)/G2));
    const fr = v1/Math.sqrt(G*d1);
    const hr = Math.abs(y1-y);
    return {y1:y1, L:L, dE:dE, fr:fr, hr:hr, j:j, fc:foco};

}

export function resalto_circ(q, d, y){
    const r = d/2;
    function area(y1) {
        // Área mojada del canal circular para un tirante dado
        return (r * r * Math.acos((r - y1) / r)) - ((r - y1) * Math.sqrt(2 * r * y1 - y1 * y1));
    }
    function eaM(y){
        return 2 * Math.sqrt(y*(d-y));
    }
    function N(y1){
        return 1/4*Math.acos(1-2*y1/d)-0.5*Math.sqrt(y1/d-Math.pow(y1/d,2))*(1-2*y1/d);
    }
    function K(y1){
        return 1-0.5*d/y1+2*Math.sqrt(y1/d)*Math.pow(1-y1/d, 3/2)/(3*N(y1));
    }
    function f(y1){
        return -(K(y1)*N(y)*N(y1)*y1/y-K(y)*Math.pow(N(y),2))/(Math.pow(y/d,4)*(1-N(y)/N(y1)))+q*q/(G*Math.pow(y,5));
    }
    const yf = new_rap(f, y-0.002);
    const v1 = q/area(yf);
    const v2 = q/area(y);

    const dE = Math.abs((yf+Math.pow(v1,2)/G2)-(y+Math.pow(v2,2)/G2));
    const fr = v1/Math.sqrt(G*area(yf)/eaM(yf));
    const hr = Math.abs(yf-y);
    return {y1:yf, dE:dE, fr:fr, hr:hr};
}

export function integra_gra(q, b, z1, z2, s, nm, y1, y2, n){
    function area(y){
        return b * y + z1*y*y/2 + z2*y*y/2;
    }
    function per(y){
        return b + y * Math.sqrt(z1 * z1 + 1) + y * Math.sqrt(z2 * z2 + 1);
    }
    function ea(y){
        return b+z1*y+z2*y;
    }

    var l_y = new Array();
    let a=y1;
    for (let i=0; i<n; i++){
        l_y.push(a)
        a += (y2-y1)/n;
    }
    l_y.push(y2);
    let l_a = new Array();
    let l_t = new Array();
    let l_R = new Array();
    let l_v = new Array();
    let l_se = new Array();
    let l_c7 = new Array();
    let l_sose = new Array();
    let l_fy = new Array();
    let l_A = new Array();
    let l_dx = new Array();
    let l_p = new Array();
    let ar, eam, see, rh, fy, c7, dx, peri;
    let AA = 0;
    l_y.forEach(item=>{
        ar = area(item);
        eam = ea(item);
        peri = per(item)
        rh = ar/peri;
        see = Math.pow((nm*q/ar)/Math.pow(rh, 2/3),2);
        c7 = 1-q*q*eam/G/Math.pow(ar,3);
        fy = c7/(s-see);
        l_a.push(ar);
        l_t.push(eam);
        l_p.push(peri);
        l_R.push(rh);
        l_v.push(q/ar);
        l_se.push(see);
        l_c7.push(c7);
        l_sose.push(s-see);
        l_fy.push(fy);
    })
    l_dx.push(0.0);
    l_A.push(AA);
    for(let i=1; i<l_y.length; i++){
        dx = Math.abs(l_y[i]-l_y[i-1])*(l_fy[i]+l_fy[i-1])/2;
        l_dx.push(dx);
        AA += Math.abs(dx);
        l_A.push(AA);
    }

    return {c1:l_y, c2:l_a, c3:l_p, c4:l_R, c5:l_t, c6:l_v, c7:l_se, c8:l_c7, c9:l_sose, c10:l_fy, c11:l_dx, c12:l_A};
}

export function backm(q, b, z1, z2, s, n, y1, y2, nt){
    const Z = 0.5*(z1+z2);
    const yn = trapez(q, b, z1, z2, n, s, null).y;
    const yc = trapCri(q, b, z1, z2, null).y;
    const ym = 0.5*(y1+ y2);
    const ypb = ym/b;
    const zypb = Z*ypb;
    const M = (3*Math.pow(1+2*zypb,2)-2*zypb*(1+zypb))/((1+2*zypb)*(1+zypb));
    const N = 10*((1+2*zypb)/(1+zypb))/3-8*((Math.sqrt(1+Z*Z)*ypb)/(1+2*Math.sqrt(1+Z*Z)*ypb))/3;
    const J = N/(N-M+1)
    let l_c1= new Array(), l_c2= new Array(), l_c3= new Array(), l_c4= new Array(), l_c5= new Array(), l_c6= new Array(), l_c7= new Array();
    for(let i=0; i<=nt; i++){
        l_c1.push(y1+i*(y2-y1)/nt);
    }
    let uy, vy, fu, fv, dxy, xy=0;
    for(let i=0; i<l_c1.length;i++){
        console.log(yn);
        uy = l_c1[i]/yn;
        vy = Math.pow(uy, N/J);
        fu = Fback(uy, N);
        fv = Fback(vy, J);
        dxy = yn*(uy-fu+Math.pow(yc/yn, M)*J*fv/N)/s;
        l_c2.push(uy);
        l_c3.push(vy);
        l_c4.push(fu);
        l_c5.push(fv);
        l_c6.push(dxy);
    }
    l_c7.push(xy);
    for(let i=1; i<l_c1.length;i++){
        
        l_c7.push(l_c6[i]-l_c6[i-1]+l_c7[i-1]);
    }
    return {yn: yn, yc:yc, M:M, N:N, J:J, y: l_c1, u:l_c2, v:l_c3, fu:l_c4, fv:l_c5, dx:l_c6, x:l_c7.map((x)=> Math.abs(x))};

}

export function breese(q, b, s, n, y1, y2, nt){
    var yn = trapez(q, b, 0, 0, n, s, null).y;
    var yc = trapCri(q, b, 0, 0, null).y;
    console.log(yn, yc);
    function phiZ(z){
        let cte = 0;
        if (z>=0){
            if(z<=0.999){
                cte = 0.6046;
            } else{
                cte = 0;
            }
        } else {
            if(z>=-0.5){
                cte = 1.8138;
            } else{
                cte = 0;
            }
        }
        return Math.log((z*z+z+1)/Math.pow(z-1,2))/6-Math.atan(Math.sqrt(3)/(2*z+1))/Math.sqrt(3)+cte;
    }

    var l_c1 = [], l_c2 = [], l_c3 = [], l_c4 = [], l_c5 = [], l_c6 = [], l_c7 = [];
    for(let i=0; i<=nt; i++){
        l_c1.push(y1+i*(y2-y1)/nt);
    }
    var z, sx1, phi, sx2, dx, x;
    for(let i=0; i<=nt; i++){
        z = l_c1[i]/yn;
        sx1 = yn/s;
        phi = phiZ(z);
        sx2 = yn*(1/s-Math.pow(Math.pow(l_c1[i],1/6)/n,2)/G);
        dx = z*sx1-sx2*phi;
        l_c2.push(z);
        l_c3.push(sx1);
        l_c4.push(phi);
        l_c5.push(sx2);
        l_c6.push(dx);
        
    }
    var xy =0;
    l_c7.push(xy);
    for(let i=1; i<l_c1.length;i++){
        
        l_c7.push(l_c6[i]-l_c6[i-1]+l_c7[i-1]);
    }
    return {yn: yn, yc:yc, y: l_c1, z:l_c2, sx1:l_c3, phi:l_c4, sx2:l_c5, dx:l_c6, x:l_c7.map((x)=>Math.abs(x))};

}

function trapY(y, q, b, z1, z2){
    function area(y){
        return b * y + z1*y*y/2 + z2*y*y/2;
    }
    function per(y){
        return b + y * Math.sqrt(z1 * z1 + 1) + y * Math.sqrt(z2 * z2 + 1);
    }
    
    const a = area(y);
    const t = b+y*(z1+z2);
    const p = per(y);
    const v = q/a;
    const fr = v/Math.sqrt(G*a/t);
    const en = y+Math.pow(v,2)/G2;

    return {a:a, p:p, rh:a/p, v:v,e:en, fr:fr}
}

export function dire_pt(q, b, z1, z2, s, n, y1, y2, nt){
    
    var l_c1 = [], l_c2 = [], l_c3 = [], l_c4 = [], l_c5 = [], l_c6 = [], l_c7 = [], l_c8 = [], l_c9 = [], l_c10 = [], l_c11 = [], l_c12 = [], l_c13 = [];
    for(let i=0; i<=nt; i++){
        l_c1.push(y1+i*(y2-y1)/nt);
    }
    var geo, yy, rh1, de, se;
    for(let i=0; i<=nt; i++){
        yy = l_c1[i];
        geo = trapY(yy, q, b, z1, z2);
        rh1 = Math.pow(geo.rh,2/3)
        l_c2.push(geo.a);
        l_c3.push(geo.p);
        l_c4.push(geo.rh);
        l_c5.push(rh1);
        l_c6.push(geo.v);
        l_c7.push(geo.e);
        l_c9.push(Math.pow(geo.v*n/rh1,2));
    }
    l_c13.push(0);
    for(let i=1; i<=nt; i++){
        de = l_c7[i]-l_c7[i-1];
        se = (l_c9[i]+l_c9[i-1])/2;
        l_c8.push(de);
        l_c10.push(se);
        l_c11.push(s-se);
        l_c12.push(de/(s-se));
        l_c13.push(de/(s-se)+l_c13[i-1]);
    }
    return {y:l_c1, a:l_c2, p:l_c3, rh:l_c4, rh1:l_c5, v:l_c6, e:l_c7, de:l_c8, se:l_c9, se1:l_c10, ds:l_c11, dx:l_c12, x:l_c13};
}

export function tra_fij(q, b, z1, z2, s, n, y1, nt, dx){
    function area(y){
        return b * y + z1*y*y/2 + z2*y*y/2;
    }
    function per(y){
        return b + y * Math.sqrt(z1 * z1 + 1) + y * Math.sqrt(z2 * z2 + 1);
    }
    function f(y, yi){
        const cte = dx*q*q*n*n/2;
        return y+q*q/(G2*Math.pow(area(y),2))+cte*Math.pow(Math.pow(per(y),2)/Math.pow(area(y),5),2/3)-(s*dx+yi+q*q/(G2*Math.pow(area(yi),2))-cte*Math.pow(Math.pow(per(yi),2)/Math.pow(area(yi),5),2/3));
    }
    var l_cy = [y1];
    var yf;
    var l_cx = [0.0];
    for(let i=1; i<=nt; i++){
        yf = new_rap(f, 1.45, l_cy[i-1]);
        l_cy.push(yf);
        l_cx.push(i*dx);
    }
    return {x:l_cx, y:l_cy};
}

export function compuerta(b, y1, a, cc){
    const cv = 0.96 + 0.079*a/y1;
    const cd = cc*cv/Math.sqrt(1+cc*a/y1);
    const q = cd*b*a*Math.sqrt(G2*y1);
    return {cv:cv, cd:cd, q:q};

}

export function orificio(){
    
}