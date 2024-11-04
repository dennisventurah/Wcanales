import {max, round, letF, letFC} from './mathUtils.js'
import { trapez, parab, circ, canalcomp, meh, smih, trapCri, paraCri, circCri, resalto_rec, resalto_trap, resalto_circ, resalto_para, backm} from './hidUtils.js'
/*

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

*/

let showHelp = function(id, message){
    document.getElementById(id).addEventListener("mouseover", function(e){
        let help = document.getElementById("f-help");
        help.innerHTML = message
    });
    document.getElementById(id).addEventListener("mouseout", function(e){
        let help = document.getElementById("f-help");
        help.innerHTML = "Presione F1 para abrir la ayuda"
    });
}

let f_inicio = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales"
    
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">                <legend style="color: blue"> <b>Tirante Normal</b></legend>                      <div class="field-row">                    <button id="btn_trap_n" style="width: 30%; background-image: linear-gradient(0, #ffffb5 0, #ffffbd 7.14%, #e9ffc6 14.29%, #cfffcd 21.43%, #b5ffd4 28.57%, #9bffd8 35.71%, #82ffd9 42.86%, #6bfbd7 50%, #58e8d3 57.14%, #4bd8ce 64.29%, #42cbcb 71.43%, #3ec0c8 78.57%, #3db7c7 85.71%, #40b1c8 92.86%, #45adca 100%);">                <img src="static/img/c_n_trap.png" alt="" style="width: 50%;">                              </button>              <span style="width: 5%;"></span>              <button id="btn_para_n" style="width: 30%; background-image: linear-gradient(0, #ffffb5 0, #ffffbd 7.14%, #e9ffc6 14.29%, #cfffcd 21.43%, #b5ffd4 28.57%, #9bffd8 35.71%, #82ffd9 42.86%, #6bfbd7 50%, #58e8d3 57.14%, #4bd8ce 64.29%, #42cbcb 71.43%, #3ec0c8 78.57%, #3db7c7 85.71%, #40b1c8 92.86%, #45adca 100%);">                <img src="static/img/c_para.png" alt="" style="width: 50%;">                              </button>              <span style="width: 5%;"></span>              <button id="btn_circ_n" style="width: 30%; background-image: linear-gradient(0, #ffffb5 0, #ffffbd 7.14%, #e9ffc6 14.29%, #cfffcd 21.43%, #b5ffd4 28.57%, #9bffd8 35.71%, #82ffd9 42.86%, #6bfbd7 50%, #58e8d3 57.14%, #4bd8ce 64.29%, #42cbcb 71.43%, #3ec0c8 78.57%, #3db7c7 85.71%, #40b1c8 92.86%, #45adca 100%);">                <img src="static/img/c_circ.png" alt="" style="width: 50%;">                              </button>    <span style="width: 5%;"></span>              <button id="btn_caco_n" style="width: 30%; background-image: linear-gradient(0, #ffffb5 0, #ffffbd 7.14%, #e9ffc6 14.29%, #cfffcd 21.43%, #b5ffd4 28.57%, #9bffd8 35.71%, #82ffd9 42.86%, #6bfbd7 50%, #58e8d3 57.14%, #4bd8ce 64.29%, #42cbcb 71.43%, #3ec0c8 78.57%, #3db7c7 85.71%, #40b1c8 92.86%, #45adca 100%);">                <img src="static/img/c_com.png" alt="" style="width: 50%;">                              </button>          </div>                                             </fieldset>          <fieldset style="margin: 5px;">                <legend style="color: red"> <b>Tirante crítico</b></legend>                      <div class="field-row">                    <button id="btn_trap_c" style="width: 30%; background-image: linear-gradient(0, #fff5a2 0, #ffeaa5 8.33%, #ffdda8 16.67%, #ffcfa9 25%, #ffbfa8 33.33%, #ffafa5 41.67%, #f99e9e 50%, #dd8e96 58.33%, #c4818e 66.67%, #af7686 75%, #9d6e80 83.33%, #8e677b 91.67%, #836378 100%);">                <img src="static/img/c_n_trap.png" alt="" style="width: 50%;">                              </button>              <span style="width: 5%;"></span>              <button id="btn_para_c" style="width: 30%; background-image: linear-gradient(0, #fff5a2 0, #ffeaa5 8.33%, #ffdda8 16.67%, #ffcfa9 25%, #ffbfa8 33.33%, #ffafa5 41.67%, #f99e9e 50%, #dd8e96 58.33%, #c4818e 66.67%, #af7686 75%, #9d6e80 83.33%, #8e677b 91.67%, #836378 100%);">                <img src="static/img/c_para.png" alt="" style="width: 50%;">                              </button>              <span style="width: 5%;"></span>              <button id="btn_circ_c" style="width: 30%; background-image: linear-gradient(0, #fff5a2 0, #ffeaa5 8.33%, #ffdda8 16.67%, #ffcfa9 25%, #ffbfa8 33.33%, #ffafa5 41.67%, #f99e9e 50%, #dd8e96 58.33%, #c4818e 66.67%, #af7686 75%, #9d6e80 83.33%, #8e677b 91.67%, #836378 100%);">                <img src="static/img/c_circ.png" alt="" style="width: 50%;">                              </button>            </div>                                             </fieldset>'
    
    win_body.innerHTML = data;
    document.getElementById("btn_trap_n").addEventListener("click", f_trapez);
    showHelp("btn_trap_n", "Tirante normal - Sección trapezoidal");
    
    document.getElementById("btn_para_n").addEventListener("click", f_parab);
    showHelp("btn_para_n", "Tirante normal - Sección parabólico");
    document.getElementById("btn_circ_n").addEventListener("click", f_circ);
    showHelp("btn_circ_n", "Tirante normal - Sección circular");
    document.getElementById("btn_caco_n").addEventListener("click", f_caco);
    showHelp("btn_caco_n", "Tirante normal - Sección compuesta");
    
    document.getElementById("btn_trap_c").addEventListener("click", f_tc_trap);
    showHelp("btn_trap_c", "Tirante crítico - Sección trapezoidal");
    document.getElementById("btn_para_c").addEventListener("click", f_tc_parab);
    showHelp("btn_para_c", "Tirante crítico - Sección parabólico");
    document.getElementById("btn_circ_c").addEventListener("click", f_tc_circ);
    showHelp("btn_circ_c", "Tirante crítico - Sección circular");

}

let f_trapez = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal Sección trapezoidal"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-base" style="width: 20%;"> Ancho de fondo: </label>        <input id="d-base" type="number" style="width: 60%;">        <label for="d-base" style="width: 20%;"> m </label>              </div>      <div class="field-row">               <label for="d-z1" style="width: 20%;"> Talud Izquierdo: </label>        <input id="d-z1" type="number" style="width: 60%;">        <label for="d-z1" style="width: 20%;">  </label>             </div>      <div class="field-row" style="flex: content;">        <label for="d-z2" style="width: 20%;"> Talud Derecho: </label>        <input id="d-z2" type="number" style="width: 60%;">        <label for="d-z2" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Rugosidad: </label>        <input id="d-n" type="number" style="width: 60%;">        <label for="d-n" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-s" style="width: 20%;"> Pendiente: </label>        <input id="d-s" type="number" style="width: 60%;">        <label for="d-s" style="width: 20%;"> m/m </label>      </div>    </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ea" style="width: 10%;"> Espejo de agua (T): </label>      <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">      <label for="res-ea" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    <div class="field-row">           <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>      <input readonly= "readonly"  id="res-tf" type="text" style="width: 35%;">                     </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {
        f_inicio();
    })
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-base", "Ingrese el valor del ancho de base B");
    showHelp("d-z1", "Ingrese el valor del talud margen izquierda");
    showHelp("d-z2", "Ingrese el valor del talud margen derecha");
    showHelp("d-n", "Ingrese el valor del coeficiente de Manning");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const b = parseFloat(document.getElementById("d-base").value);
        const z1 = parseFloat(document.getElementById("d-z1").value);
        const z2 = parseFloat(document.getElementById("d-z2").value);
        const n = parseFloat(document.getElementById("d-n").value);
        const s = parseFloat(document.getElementById("d-s").value);
        const res = trapez(q, b, z1, z2, n, s, document.getElementById('sb-progress'));
        
        const canvas = document.getElementById('graph-ui');
        const cx = res.cx.map((num) => round(num, 4));
        const cy = res.cy.map((num) => round(num, 4));
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        
        var trace1 = {
            x: cx,
            y: cy,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
          
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        if(round(res.fr,4)<1){
            document.getElementById('res-tf').value="Flujo Sub-crítico"
        }
        else if(round(res.fr)==1){
            document.getElementById('res-tf').value="Flujo Crítico"
        }
        else if(round(res.fr,4)>1){
            document.getElementById('res-tf').value="Flujo Super-crítico"
        }
    })
}

let f_parab = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal - Sección parabólica"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-ea" style="width: 20%;"> Espejo de Agua: </label>        <input id="d-ea" type="number" style="width: 60%;">        <label for="d-base" style="width: 20%;"> m </label>              </div>            <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Rugosidad: </label>        <input id="d-n" type="number" style="width: 60%;">        <label for="d-n" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-s" style="width: 20%;"> Pendiente: </label>        <input id="d-s" type="number" style="width: 60%;">        <label for="d-s" style="width: 20%;"> m/m </label>      </div>    </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ym" style="width: 10%;"> Foco: </label>      <input readonly= "readonly" id="res-ym" type="number" style="width: 25%;">      <label for="res-ym" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    <div class="field-row">           <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>      <input readonly= "readonly"  id="res-tf" type="text" style="width: 35%;">                     </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button>  <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-ea", "Ingrese el valor del espejo de agua T");
    showHelp("d-n", "Ingrese el valor del coeficiente de Manning");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const t = parseFloat(document.getElementById("d-ea").value);
        const n = parseFloat(document.getElementById("d-n").value);
        const s = parseFloat(document.getElementById("d-s").value);
        const res = parab(q, t, n, s, 0.0000001, 20);
        const cxy = letF(res.fc, res.y);
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        var trace1 = {
            x: cxy.x,
            y: cxy.y,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ym').value=round(res.fc,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        if(round(res.fr,4)<1){
            document.getElementById('res-tf').value="Flujo Sub-crítico"
        }
        else if(round(res.fr)==1){
            document.getElementById('res-tf').value="Flujo Crítico"
        }
        else if(round(res.fr,4)>1){
            document.getElementById('res-tf').value="Flujo Super-crítico"
        }
    })

}

let f_circ = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal - Sección circular"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-dia" style="width: 20%;"> Diámetro: </label>        <input id="d-dia" type="number" style="width: 60%;">        <label for="d-dia" style="width: 20%;"> m </label>              </div>            <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Rugosidad: </label>        <input id="d-n" type="number" style="width: 60%;">        <label for="d-n" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-s" style="width: 20%;"> Pendiente: </label>        <input id="d-s" type="number" style="width: 60%;">        <label for="d-s" style="width: 20%;"> m/m </label>      </div>    </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ea" style="width: 10%;"> Espejo de agua: </label>      <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">      <label for="res-ea" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    <div class="field-row">           <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>      <input readonly= "readonly"  id="res-tf" type="text" style="width: 35%;">                     </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function(){f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-dia", "Ingrese el valor del diámetro del canal");
    showHelp("d-n", "Ingrese el valor del coeficiente de Manning");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const d = parseFloat(document.getElementById("d-dia").value);
        const n = parseFloat(document.getElementById("d-n").value);
        const s = parseFloat(document.getElementById("d-s").value);
        const res = circ(q, d, n, s, 0.0000001, 20);
        if (res =="Error"){
            alert("Hay un error");
            return 0;
        }
        const cxy = letFC(d, -1);
        const cxy1 = letFC(d, 1);
        
        var trace1 = {
            x: cxy.x,
            y: cxy.y,
            type: 'scatter'
        };
        var trace2 = {
            x: cxy1.x,
            y: cxy1.y,
            type: 'scatter'
        };  
        var trace3 = {
            x: res.cx1,
            y: res.cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2, trace3];      
          var layout = {
            xaxis: { range: [-d/2-0.1, d/2+0.1], zeroline: false },
            yaxis: { range: [-0.1, d+0.1] },
            width: 400,
            height: 300,
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        if(round(res.fr,4)<1){
            document.getElementById('res-tf').value="Flujo Sub-crítico"
        }
        else if(round(res.fr)==1){
            document.getElementById('res-tf').value="Flujo Crítico"
        }
        else if(round(res.fr,4)>1){
            document.getElementById('res-tf').value="Flujo Super-crítico"
        }
    })

}

let f_caco = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal - Sección compuesta"
    const win_body = document.getElementById("win-body");    
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>    <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">      <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>    <div class="field-row">      <label for="t-tramo" style="width: 10%;"> Tramo: </label>      <input id="t-tramo" type="text" style="width: 40%;">      <label for="t-rev" style="width: 10%;"> Revestimiento: </label>      <input id="t-rev" type="text" style="width: 40%;">          </div>            </fieldset>    <div style="display: flex; flex-direction: row;">        <fieldset style="margin: 5px; width: 25%;">            <legend> Datos </legend>              <div class="field-row">                  <label for="d-flow" style="width: 20%;"> Caudal: </label>                  <input id="d-flow" type="number" style="width: 60%;">                  <label for="d-flow" style="width: 20%;"> m3/s </label>                      </div>             <div class="field-row" style="flex: content;">                  <label for="d-s" style="width: 20%;"> Pendiente: </label>                  <input id="d-s" type="number" style="width: 60%;">                  <label for="d-s" style="width: 20%;"> m/m </label>              </div>        <div class="field-row" style="flex: content;">                  <label for="d-ecn" style="width: 30%;"> Modelo de Rugosidad Equivalente: </label>                  <select id="d-ecn">     <option>1 - Horton y Einstein </option>    <option>2 - Mühlhofer</option>     <option>3 - Lotter</option>      </select>              </div>   </fieldset>    <fieldset style="margin: 5px; width: 35%;">            <legend> Tabla de Datos</legend>             <div class="field-row">                  <span style="width: 7%;"></span>            <label for="dt-x" style="width: 31%; text-align: center;"> X </label>                            <label for="dt-y" style="width: 31%;text-align: center;"> Y </label>                  <label for="dt-n" style="width: 31%;text-align: center;"> n </label>          </div>        <div class="has-scrollbar" style="height: 100px; width: 100%; overflow: auto;">                  <div id="dt_table" style="padding-top: 5px;">                                  </div>                  </div>        <div class="field-row">          <button id="btn-addRow"> + </button>            <button id="btn-deleteRow"> - </button>   <button id="btn-paste"> Pegar datos </button>        </div>    </fieldset>    <fieldset style="margin: 5px; width: 40%;">            <legend> Gráfica</legend>            <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>    </div>        <fieldset style="margin: 5px;">          <legend> Resultados </legend>              <div class="field-row">              <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>              <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">              <label for="res-yn" style="width: 5%;"> m </label>              <span style="width: 10%;"></span>              <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>              <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">              <label for="res-pm" style="width: 5%;"> m </label>                      </div>          <div class="field-row">                                <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>              <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">              <label for="res-ah" style="width: 5%;"> m2 </label>              <span style="width: 10%;"></span>              <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>              <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">              <label for="res-rh" style="width: 5%;"> m </label>          </div>          <div class="field-row">                                <label for="res-ea" style="width: 10%;"> Espejo de Agua: </label>              <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">              <label for="res-ea" style="width: 5%;"> m </label>              <span style="width: 10%;"></span>              <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>              <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">              <label for="res-ve" style="width: 5%;"> m/s </label>                </div>    <div class="field-row">                   <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>              <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">              <label for="res-fr" style="width: 5%;"> m </label>              <span style="width: 10%;"></span>              <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>              <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">              <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>               </div>          <div class="field-row">                   <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>              <input readonly= "readonly"  id="res-tf" type="text" style="width: 30%;">         <span style="width: 10%;"></span>                <label for="res-nn" style="width: 10%;"> Rugosidad ponderada: </label>              <input readonly= "readonly"  id="res-nn" type="text" style="width: 25%;">   <label style="width: 5%;"> </label>   </div>      </fieldset>    <fieldset style="margin: 5px;">        <button id="btn-calcular"> Calcular</button>  <button id="btn-inicio"> Inicio</button>  </fieldset>'
    win_body.innerHTML = data;
    document.getElementById("btn-inicio").addEventListener("click", function(e){f_inicio();});
    var contador = 1;
    let addRow = function(e, dr){
        
        console.log(contador);
        const div_table = document.getElementById("dt_table");
        
        let div = document.createElement("div");
        div.className = "field-row";
        div.id = "dt_row_" + contador;
        
        let num = document.createElement("label");
        num.textContent = contador;
        
        num.style = "width:7%;";
        let inX = document.createElement("input");
        dr? inX.value = dr[0]:"";
        inX.id = "dt_x_" + contador
        inX.type="number" 
        inX.style="width: 31%; margin: 0; padding: 0"
        let inY = document.createElement("input");
        dr? inY.value = dr[1]:"";
        inY.id = "dt_y_" + contador
        inY.type="number" 
        inY.style="width: 31%; margin: 0; padding: 0"
        
        let inN = document.createElement("input");
        inN.id = "dt_n_" + contador
        dr?inN.value = dr[2]: "";
        inN.type="number" 
        inN.style="width: 31%; margin: 0; padding: 0"
        if(contador==1){
            inN.readOnly = "readonly"
        }
        div.appendChild(num);
        div.appendChild(inX);
        div.appendChild(inY);
        div.appendChild(inN);
        div_table.appendChild(div);
        
        contador++;
    };
    document.getElementById("btn-paste").addEventListener("click", function(e){
        async function readClipboard () {
            if (!navigator.clipboard) {
              // Clipboard API not available
              return
            }
          
            try {
              const text = await navigator.clipboard.readText();
              return text;
            } catch (err) {
              console.error('Failed to copy!', err)
            }
          }
        let texto = readClipboard();
        let n_m=[];
        texto.then((r)=>{
            let lista = r.split("\n");
            lista.pop();
            lista.forEach((x)=>{
                addRow(e, x.split("\t"));
            })
        });
        
    });
    document.getElementById("btn-addRow").addEventListener("click", addRow);
    document.getElementById("btn-deleteRow").addEventListener("click", function(e){
        if (contador > 1){
            const div_table = document.getElementById("dt_table");
            contador--;
            div_table.removeChild(document.getElementById("dt_row_"+contador)); 
        }
    });

    function getDataOfTable(){
        var cx = [];
        var cy = [];
        var cn = [];
        for(let i=1; i<contador;i++){

            cx.push(parseFloat(document.getElementById("dt_x_" + i).value));
            cy.push(parseFloat(document.getElementById("dt_y_" + i).value));
            if(i>1){
                cn.push(parseFloat(document.getElementById("dt_n_" + i).value))
            }
        }
        return {x:cx, y:cy, n:cn};
    }
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById("btn-calcular").addEventListener("click", function(e){
        const q = parseFloat(document.getElementById("d-flow").value);
        
        const s = parseFloat(document.getElementById("d-s").value);
        const eq = document.getElementById("d-ecn").selectedIndex+1;
        const dataTable = getDataOfTable();
        if (dataTable.x.length>2){
            const res = canalcomp(dataTable.x, dataTable.y, q, dataTable.n, s, eq);
            document.getElementById('res-yn').value=round(res.y,6).toString();
            document.getElementById('res-ah').value=round(res.a,6).toString();
            document.getElementById('res-pm').value=round(res.p,6).toString();
            document.getElementById('res-rh').value=round(res.rh,6).toString();
            document.getElementById('res-ea').value=round(res.t,6).toString();
            document.getElementById('res-ve').value=round(res.v,6).toString();
            document.getElementById('res-fr').value=round(res.fr,6).toString();
            document.getElementById('res-ee').value=round(res.e,6).toString();
            document.getElementById('res-nn').value=round(res.n,6).toString();
            if(round(res.fr,4)<1){
                document.getElementById('res-tf').value="Flujo Sub-crítico"
            }
            else if(round(res.fr,4)==1){
                document.getElementById('res-tf').value="Flujo Crítico"
            }
            else if(round(res.fr,4)>1){
                document.getElementById('res-tf').value="Flujo Super-crítico"
            }
        
            var trace1 = {
                x: res.px,
                y: res.py,
                type: 'scatter',
                fill: 'toself',
                marker: {size: 1}
            };
            var trace2 = {
                x: dataTable.x,
                y: dataTable.y,
                type: 'scatter',
                marker: {size: 4}
            };
            
            var data = [trace1, trace2];      
            var layout = {
                
                showlegend: false,

                margin:{
                    l:60,
                    r:60,
                    b:20,
                    t:10,
                    pad:2
                }
            };
            Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
            }
    })
}

let f_meh = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal - Sección de máxima eficiencia hidráulica"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>               <div class="field-row">               <label for="d-z1" style="width: 20%;"> Talud Izquierdo: </label>        <input id="d-z1" type="number" style="width: 60%;">        <label for="d-z1" style="width: 20%;">  </label>             </div>      <div class="field-row" style="flex: content;">        <label for="d-z2" style="width: 20%;"> Talud Derecho: </label>        <input id="d-z2" type="number" style="width: 60%;">        <label for="d-z2" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Rugosidad: </label>        <input id="d-n" type="number" style="width: 60%;">        <label for="d-n" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-s" style="width: 20%;"> Pendiente: </label>        <input id="d-s" type="number" style="width: 60%;">        <label for="d-s" style="width: 20%;"> m/m </label>      </div>    </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ea" style="width: 10%;"> Espejo de agua (T): </label>      <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">      <label for="res-ea" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    <div class="field-row">           <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>      <input readonly= "readonly"  id="res-tf" type="text" style="width: 35%;">                     </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button>  </fieldset>'
    
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-z1", "Ingrese el valor del talud margen izquierda");
    showHelp("d-z2", "Ingrese el valor del talud margen derecha");
    showHelp("d-n", "Ingrese el valor del coeficiente de Manning");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const z1 = parseFloat(document.getElementById("d-z1").value);
        const z2 = parseFloat(document.getElementById("d-z2").value);
        const n = parseFloat(document.getElementById("d-n").value);
        const s = parseFloat(document.getElementById("d-s").value);
        const res = meh(q, z1, z2, n, s, 0.0001, 20, document.getElementById('sb-progress'));
        
        const canvas = document.getElementById('graph-ui');
        const cx = res.cx.map((num) => round(num, 4));
        const cy = res.cy.map((num) => round(num, 4));
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        
        var trace1 = {
            x: cx,
            y: cy,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
          
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        if(round(res.fr,4)<1){
            document.getElementById('res-tf').value="Flujo Sub-crítico"
        }
        else if(round(res.fr)==1){
            document.getElementById('res-tf').value="Flujo Crítico"
        }
        else if(round(res.fr,4)>1){
            document.getElementById('res-tf').value="Flujo Super-crítico"
        }
    })

}

let f_mi = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Normal - Sección de mínima infiltración"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>               <div class="field-row">               <label for="d-z1" style="width: 20%;"> Talud Izquierdo: </label>        <input id="d-z1" type="number" style="width: 60%;">        <label for="d-z1" style="width: 20%;">  </label>             </div>      <div class="field-row" style="flex: content;">        <label for="d-z2" style="width: 20%;"> Talud Derecho: </label>        <input id="d-z2" type="number" style="width: 60%;">        <label for="d-z2" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Rugosidad: </label>        <input id="d-n" type="number" style="width: 60%;">        <label for="d-n" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-s" style="width: 20%;"> Pendiente: </label>        <input id="d-s" type="number" style="width: 60%;">        <label for="d-s" style="width: 20%;"> m/m </label>      </div>    </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ea" style="width: 10%;"> Espejo de agua (T): </label>      <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">      <label for="res-ea" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    <div class="field-row">           <label for="res-tf" style="width: 10%;"> Tipo de flujo: </label>      <input readonly= "readonly"  id="res-tf" type="text" style="width: 35%;">                     </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button>  </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () { f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-z1", "Ingrese el valor del talud margen izquierda");
    showHelp("d-z2", "Ingrese el valor del talud margen derecha");
    showHelp("d-n", "Ingrese el valor del coeficiente de Manning");
    showHelp("d-s", "Ingrese el valor de la pendiente del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const z1 = parseFloat(document.getElementById("d-z1").value);
        const z2 = parseFloat(document.getElementById("d-z2").value);
        const n = parseFloat(document.getElementById("d-n").value);
        const s = parseFloat(document.getElementById("d-s").value);
        const res = smih(q, z1, z2, n, s, 0.0001, 20, document.getElementById('sb-progress'));
        
        const canvas = document.getElementById('graph-ui');
        const cx = res.cx.map((num) => round(num, 4));
        const cy = res.cy.map((num) => round(num, 4));
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        
        var trace1 = {
            x: cx,
            y: cy,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
          
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        if(round(res.fr,4)<1){
            document.getElementById('res-tf').value="Flujo Sub-crítico"
        }
        else if(round(res.fr)==1){
            document.getElementById('res-tf').value="Flujo Crítico"
        }
        else if(round(res.fr,4)>1){
            document.getElementById('res-tf').value="Flujo Super-crítico"
        }
    })

}

let f_tc_trap = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante Crítico - Sección Trapezoidal"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">                 <legend> Información del Proyecto </legend>                       <div class="field-row">                     <label for="t-lugar" style="width: 10%;"> Lugar: </label>                     <input id="t-lugar" type="text" style="width: 40%;">                         <label for="t-name" style="width: 10%;"> Proyecto: </label>                     <input id="t-name" type="text"  style="width: 40%;">                 </div>                           <div class="field-row">                       <label for="t-tramo" style="width: 10%;"> Tramo: </label>                       <input id="t-tramo" type="text" style="width: 40%;">                               <label for="t-rev" style="width: 10%;"> Revestimiento: </label>                       <input id="t-rev" type="text" style="width: 40%;">                   </div>                     </fieldset>             <div style="display: flex; flex-direction: row;">                 <fieldset style="margin: 5px; width: 50%;">                     <legend> Datos</legend>                     <div class="field-row">                         <label for="d-flow" style="width: 20%;"> Caudal: </label>                         <input id="d-flow" type="number" style="width: 60%;">                         <label for="d-flow" style="width: 20%;"> m3/s </label>                             </div>           <div class="field-row">                                             <label for="d-base" style="width: 20%;"> Ancho de fondo: </label>                         <input id="d-base" type="number" style="width: 60%;">                         <label for="d-base" style="width: 20%;"> m </label>                             </div>      <div class="field-row">                                <label for="d-z1" style="width: 20%;"> Talud Izquierdo: </label>                         <input id="d-z1" type="number" style="width: 60%;">                         <label for="d-z1" style="width: 20%;">  </label>                            </div>                     <div class="field-row" style="flex: content;">                         <label for="d-z2" style="width: 20%;"> Talud Derecho: </label>                         <input id="d-z2" type="number" style="width: 60%;">                         <label for="d-z2" style="width: 20%;">  </label>                     </div>                                     </fieldset>                 <fieldset style="margin: 5px; width: 50%;">                     <legend> Gráfica</legend>                     <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>                 </fieldset>             </div>               <fieldset style="margin: 5px;">                 <legend> Resultados </legend>                     <div class="field-row">                     <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>                     <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">                     <label for="res-yn" style="width: 5%;"> m </label>                     <span style="width: 10%;"></span>                     <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>                     <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">                     <label for="res-pm" style="width: 5%;"> m </label>                             </div>                 <div class="field-row">                                       <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>                     <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">                     <label for="res-ah" style="width: 5%;"> m2 </label>                     <span style="width: 10%;"></span>                     <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>                     <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">                     <label for="res-rh" style="width: 5%;"> m </label>                 </div>                 <div class="field-row">                                       <label for="res-ea" style="width: 10%;"> Espejo de agua (T): </label>                     <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">                     <label for="res-ea" style="width: 5%;"> m </label>                     <span style="width: 10%;"></span>                     <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>                     <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">                     <label for="res-ve" style="width: 5%;"> m/s </label>                       </div>                 <div class="field-row">                          <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>                     <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">                     <label for="res-fr" style="width: 5%;"> m </label>                     <span style="width: 10%;"></span>                     <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>                     <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">                     <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>                      </div>                   </fieldset>             <fieldset style="margin: 5px;">                 <button id="btn-calcular"> Calcular</button>  <button id="btn-inicio"> Inicio</button>            </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () { f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-base", "Ingrese el valor del ancho de base B");
    showHelp("d-z1", "Ingrese el valor del talud margen izquierda");
    showHelp("d-z2", "Ingrese el valor del talud margen derecha");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const z1 = parseFloat(document.getElementById("d-z1").value);
        const z2 = parseFloat(document.getElementById("d-z2").value);
        const b = parseFloat(document.getElementById("d-base").value);
        const res = trapCri(q, b, z1, z2, document.getElementById('sb-progress'));
        
        const canvas = document.getElementById('graph-ui');
        const cx = res.cx.map((num) => round(num, 4));
        const cy = res.cy.map((num) => round(num, 4));
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        
        var trace1 = {
            x: cx,
            y: cy,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
          
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
    })

}

let f_tc_parab = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante crítico - Sección parabólica"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-ea" style="width: 20%;"> Espejo de Agua: </label>        <input id="d-ea" type="number" style="width: 60%;">        <label for="d-base" style="width: 20%;"> m </label>              </div></fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ym" style="width: 10%;"> Foco: </label>      <input readonly= "readonly" id="res-ym" type="number" style="width: 25%;">      <label for="res-ym" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>    </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () { f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-ea", "Ingrese el valor del espejo de agua T");
    
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const t = parseFloat(document.getElementById("d-ea").value);
        const res = paraCri(q, t, document.getElementById('sb-progress'));
        const cxy = letF(res.fc, res.y);
        const cx1 = res.cx1.map((num) => round(num, 4));
        const cy1 = res.cy1.map((num) => round(num, 4));
        var trace1 = {
            x: cxy.x,
            y: cxy.y,
            type: 'scatter'
        };
          
        var trace2 = {
            x: cx1,
            y: cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2];      
          var layout = {
            
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ym').value=round(res.fc,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();

    })

}

let f_tc_circ = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Tirante crítico - Sección circular"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-dia" style="width: 20%;"> Diámetro: </label>        <input id="d-dia" type="number" style="width: 60%;">        <label for="d-dia" style="width: 20%;"> m </label>              </div>           </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Normal (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-pm" style="width: 10%;"> Perímetro (p): </label>      <input readonly= "readonly" id="res-pm" type="number" style="width: 25%;">      <label for="res-pm" style="width: 5%;"> m </label>                </div>    <div class="field-row">                        <label for="res-ah" style="width: 10%;"> Area Hidráulica (A): </label>      <input readonly= "readonly" id="res-ah" type="number" style="width: 25%;">      <label for="res-ah" style="width: 5%;"> m2 </label>      <span style="width: 10%;"></span>      <label for="res-rh" style="width: 10%;"> Radio hidráulico (R): </label>      <input readonly= "readonly" id="res-rh" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-ea" style="width: 10%;"> Espejo de agua: </label>      <input readonly= "readonly" id="res-ea" type="number" style="width: 25%;">      <label for="res-ea" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ve" style="width: 10%;"> Velocidad (v): </label>      <input readonly= "readonly" id="res-ve" type="number" style="width: 25%;">      <label for="res-ve" style="width: 5%;"> m/s </label>          </div>    <div class="field-row">           <label for="res-fr" style="width: 10%;"> Número de Froude (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-ee" style="width: 10%;"> Energía Específica (v): </label>      <input readonly= "readonly" id="res-ee" type="number" style="width: 25%;">      <label for="res-ee" style="width: 5%;"> m.Kg/Kg </label>         </div>     </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () { f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-dia", "Ingrese el valor del diámetro del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const d = parseFloat(document.getElementById("d-dia").value);
        
        
        const res = circCri(q, d, document.getElementById('sb-progress'));
        if (res =="Error"){
            alert("Hay un error");
            return 0;
        }
        const cxy = letFC(d, -1);
        const cxy1 = letFC(d, 1);
        
        var trace1 = {
            x: cxy.x,
            y: cxy.y,
            type: 'scatter'
        };
        var trace2 = {
            x: cxy1.x,
            y: cxy1.y,
            type: 'scatter'
        };  
        var trace3 = {
            x: res.cx1,
            y: res.cy1,
            type: 'scatter'
        };
          
        var data = [trace1, trace2, trace3];      
          var layout = {
            xaxis: { range: [-d/2-0.1, d/2+0.1], zeroline: false },
            yaxis: { range: [-0.1, d+0.1] },
            width: 400,
            height: 300,
            showlegend: false,

            margin:{
                l:60,
                r:60,
                b:20,
                t:10,
                pad:2
            }
        };
        Plotly.newPlot('graph-ui', data, layout, {staticPlot: true});
        document.getElementById('res-yn').value=round(res.y,6).toString();
        document.getElementById('res-ah').value=round(res.a,6).toString();
        document.getElementById('res-pm').value=round(res.p,6).toString();
        document.getElementById('res-rh').value=round(res.rh,6).toString();
        document.getElementById('res-ea').value=round(res.t,6).toString();
        document.getElementById('res-ve').value=round(res.v,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-ee').value=round(res.e,6).toString();
        
    })

}

let f_rs_rect = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Resalto hidráulico - Sección rectangular"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-base" style="width: 20%;"> Ancho de fondo: </label>        <input id="d-base" type="number" style="width: 60%;">        <label for="d-base" style="width: 20%;"> m </label>              </div>        <div class="field-row" style="flex: content;">        <label for="d-y" style="width: 20%;"> Tirante y: </label>        <input id="d-y" type="number" style="width: 60%;">        <label for="d-y" style="width: 20%;"> m </label>      </div>       </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>        <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Conjugado (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>       <label for="res-fr" style="width: 10%;"> Número de Froude Conjugado (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-hr" style="width: 10%;"> Altura de resalto (h): </label>      <input readonly= "readonly" id="res-hr" type="number" style="width: 25%;">      <label for="res-hr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-lr" style="width: 10%;"> Longitud de resalto (L): </label>      <input readonly= "readonly" id="res-lr" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-de" style="width: 10%;"> Pérdida de energía en el resalto: </label>      <input readonly= "readonly" id="res-de" type="number" style="width: 25%;">      <label for="res-de" style="width: 5%;"> m </label>   </div>   </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();})
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-y", "Ingrese el valor del calado inicial");
    showHelp("d-base", "Ingrese el valor del ancho del canal");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const y = parseFloat(document.getElementById("d-y").value);
        const b = parseFloat(document.getElementById("d-base").value);
        const res = resalto_rec(q, b, y);
          
        document.getElementById('res-yn').value=round(res.y1,6).toString();
        document.getElementById('res-lr').value=round(res.L,6).toString();
        document.getElementById('res-de').value=round(res.dE,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-hr').value=round(res.hr,6).toString();
    })
}

let f_rs_trap = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Resalto hidráulico - Sección trapezoidal"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-base" style="width: 20%;"> Ancho de fondo: </label>        <input id="d-base" type="number" style="width: 60%;">        <label for="d-base" style="width: 20%;"> m </label>              </div>      <div class="field-row">               <label for="d-z1" style="width: 20%;"> Talud Izquierdo: </label>        <input id="d-z1" type="number" style="width: 60%;">        <label for="d-z1" style="width: 20%;">  </label>             </div>      <div class="field-row" style="flex: content;">        <label for="d-z2" style="width: 20%;"> Talud Derecho: </label>        <input id="d-z2" type="number" style="width: 60%;">        <label for="d-z2" style="width: 20%;">  </label>      </div>      <div class="field-row" style="flex: content;">        <label for="d-n" style="width: 20%;"> Tirante (Y): </label>        <input id="d-y" type="number" style="width: 60%;">        <label for="d-y" style="width: 20%;"> m </label>      </div>        </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>       <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Conjugado (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>       <label for="res-fr" style="width: 10%;"> Número de Froude Conjugado (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-hr" style="width: 10%;"> Altura de resalto (h): </label>      <input readonly= "readonly" id="res-hr" type="number" style="width: 25%;">      <label for="res-hr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-lr" style="width: 10%;"> Longitud de resalto (L): </label>      <input readonly= "readonly" id="res-lr" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-de" style="width: 10%;"> Pérdida de energía en el resalto: </label>      <input readonly= "readonly" id="res-de" type="number" style="width: 25%;">      <label for="res-de" style="width: 5%;"> m </label> <span style="width: 10%;"></span>      <label for="res-j" style="width: 10%;"> Valor de J: </label>      <input readonly= "readonly" id="res-j" type="number" style="width: 25%;">      <label for="res-j" style="width: 5%;">  </label>   </div>       </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();});
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-base", "Ingrese el valor del ancho de base B");
    showHelp("d-z1", "Ingrese el valor del talud margen izquierda");
    showHelp("d-z2", "Ingrese el valor del talud margen derecha");
    showHelp("d-y", "Ingrese el valor del calado inicial");
    
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const y = parseFloat(document.getElementById("d-y").value);
        const b = parseFloat(document.getElementById("d-base").value);
        const z1 = parseFloat(document.getElementById("d-z1").value);
        const z2 = parseFloat(document.getElementById("d-z2").value);
        
        const res = resalto_trap(q, b, z1, z2, y);
          
        document.getElementById('res-yn').value=round(res.y1,6).toString();
        document.getElementById('res-lr').value=round(res.L,6).toString();
        document.getElementById('res-de').value=round(res.dE,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-hr').value=round(res.hr,6).toString();
        document.getElementById('res-j').value=round(res.j,6).toString();
    })
}

let f_rs_para = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Resalto hidráulico - Sección parabólico"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-ea" style="width: 20%;"> Espejo de agua: </label>        <input id="d-ea" type="number" style="width: 60%;">        <label for="d-ea" style="width: 20%;"> m </label>              </div>                 <div class="field-row" style="flex: content;">        <label for="d-y" style="width: 20%;"> Tirante (Y): </label>        <input id="d-y" type="number" style="width: 60%;">        <label for="d-y" style="width: 20%;"> m </label>      </div>        </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>       <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Conjugado (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>       <label for="res-fr" style="width: 10%;"> Número de Froude Conjugado (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-hr" style="width: 10%;"> Altura de resalto (h): </label>      <input readonly= "readonly" id="res-hr" type="number" style="width: 25%;">      <label for="res-hr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>      <label for="res-lr" style="width: 10%;"> Longitud de resalto (L): </label>      <input readonly= "readonly" id="res-lr" type="number" style="width: 25%;">      <label for="res-rh" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-de" style="width: 10%;"> Pérdida de energía en el resalto: </label>      <input readonly= "readonly" id="res-de" type="number" style="width: 25%;">      <label for="res-de" style="width: 5%;"> m </label> <span style="width: 10%;"></span>      <label for="res-j" style="width: 10%;"> Valor de J: </label>      <input readonly= "readonly" id="res-j" type="number" style="width: 25%;">      <label for="res-j" style="width: 5%;">  </label>   </div>  <div class="field-row">                        <label for="res-fc" style="width: 10%;"> Longitud de foco: </label>      <input readonly= "readonly" id="res-fc" type="number" style="width: 25%;">      <label for="res-fc" style="width: 5%;"> m </label> <span style="width: 10%;"></span>         </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();})
    showHelp("d-flow", "Ingrese el valor del caudal Q");
    showHelp("d-ea", "Ingrese el valor del espejo de agua");
    showHelp("d-y", "Ingrese el valor del calado inicial");
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const y = parseFloat(document.getElementById("d-y").value);
        const t = parseFloat(document.getElementById("d-ea").value);
        
        const res = resalto_para(q, t, y);
          
        document.getElementById('res-yn').value=round(res.y1,6).toString();
        document.getElementById('res-lr').value=round(res.L,6).toString();
        document.getElementById('res-de').value=round(res.dE,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-hr').value=round(res.hr,6).toString();
        document.getElementById('res-j').value=round(res.j,6).toString();
        document.getElementById('res-fc').value=round(res.fc,6).toString();
    })
}

let f_rs_circ = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Resalto hidráulico - Sección circular"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-d" style="width: 20%;"> Diámetro: </label>        <input id="d-d" type="number" style="width: 60%;">        <label for="d-d" style="width: 20%;"> m </label>              </div>                 <div class="field-row" style="flex: content;">        <label for="d-y" style="width: 20%;"> Tirante (Y): </label>        <input id="d-y" type="number" style="width: 60%;">        <label for="d-y" style="width: 20%;"> m </label>      </div>        </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>       <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Conjugado (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>       <label for="res-fr" style="width: 10%;"> Número de Froude Conjugado (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-hr" style="width: 10%;"> Altura de resalto (h): </label>      <input readonly= "readonly" id="res-hr" type="number" style="width: 25%;">      <label for="res-hr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span> <label for="res-de" style="width: 10%;"> Pérdida de energía en el resalto: </label>      <input readonly= "readonly" id="res-de" type="number" style="width: 25%;">      <label for="res-de" style="width: 5%;"> m </label>       </div>       </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();})
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const y = parseFloat(document.getElementById("d-y").value);
        const d = parseFloat(document.getElementById("d-d").value);
        
        const res = resalto_circ(q,d, y);
          
        document.getElementById('res-yn').value=round(res.y1,6).toString();
        document.getElementById('res-de').value=round(res.dE,6).toString();
        document.getElementById('res-fr').value=round(res.fr,6).toString();
        document.getElementById('res-hr').value=round(res.hr,6).toString();

    })
}

let f_rm_int_g = function(e){
    document.getElementById("title-bar-text").innerHTML = "WCanales - Curva de remanso - Integración gráfica"
    const win_body = document.getElementById("win-body");
    var data = '<fieldset style="margin: 5px;">    <legend> Información del Proyecto </legend>          <div class="field-row">      <label for="t-lugar" style="width: 10%;"> Lugar: </label>      <input id="t-lugar" type="text" style="width: 40%;">          <label for="t-name" style="width: 10%;"> Proyecto: </label>      <input id="t-name" type="text"  style="width: 40%;">    </div>              <div class="field-row">        <label for="t-tramo" style="width: 10%;"> Tramo: </label>        <input id="t-tramo" type="text" style="width: 40%;">                <label for="t-rev" style="width: 10%;"> Revestimiento: </label>        <input id="t-rev" type="text" style="width: 40%;">      </div>          </fieldset>  <div style="display: flex; flex-direction: row;">    <fieldset style="margin: 5px; width: 50%;">      <legend> Datos</legend>      <div class="field-row">        <label for="d-flow" style="width: 20%;"> Caudal: </label>        <input id="d-flow" type="number" style="width: 60%;">        <label for="d-flow" style="width: 20%;"> m3/s </label>              </div>           <div class="field-row">                            <label for="d-d" style="width: 20%;"> Diámetro: </label>        <input id="d-d" type="number" style="width: 60%;">        <label for="d-d" style="width: 20%;"> m </label>              </div>                 <div class="field-row" style="flex: content;">        <label for="d-y" style="width: 20%;"> Tirante (Y): </label>        <input id="d-y" type="number" style="width: 60%;">        <label for="d-y" style="width: 20%;"> m </label>      </div>        </fieldset>    <fieldset style="margin: 5px; width: 50%;">      <legend> Gráfica</legend>      <div id="graph-ui" style="width: 100%; height: 100%; background-color: rgb(255, 255, 255);"></div>    </fieldset>  </div>    <fieldset style="margin: 5px;">    <legend> Resultados </legend>       <div class="field-row">      <label for="res-yn" style="width: 10%;"> Tirante Conjugado (y): </label>      <input readonly= "readonly" id="res-yn" type="number" style="width: 25%;">      <label for="res-yn" style="width: 5%;"> m </label>      <span style="width: 10%;"></span>       <label for="res-fr" style="width: 10%;"> Número de Froude Conjugado (F): </label>      <input readonly= "readonly" id="res-fr" type="number" style="width: 25%;">      <label for="res-fr" style="width: 5%;"> m </label>    </div>    <div class="field-row">                        <label for="res-hr" style="width: 10%;"> Altura de resalto (h): </label>      <input readonly= "readonly" id="res-hr" type="number" style="width: 25%;">      <label for="res-hr" style="width: 5%;"> m </label>      <span style="width: 10%;"></span> <label for="res-de" style="width: 10%;"> Pérdida de energía en el resalto: </label>      <input readonly= "readonly" id="res-de" type="number" style="width: 25%;">      <label for="res-de" style="width: 5%;"> m </label>       </div>       </div>      </fieldset>  <fieldset style="margin: 5px;">    <button id="btn-calcular"> Calcular</button> <button id="btn-inicio"> Inicio</button> </fieldset>'
    win_body.innerHTML = data;
    document.getElementById('btn-inicio').addEventListener("click", function () {f_inicio();})
    document.getElementById('btn-calcular').addEventListener("click", function () {
        const q = parseFloat(document.getElementById("d-flow").value);
        const y = parseFloat(document.getElementById("d-y").value);
        const d = parseFloat(document.getElementById("d-d").value);
        
        const res = resalto_circ(q,d, y);
          
        document.getElementById('res-yn').value=round(res.y1, 6).toString();
        document.getElementById('res-de').value=round(res.dE, 6).toString();
        document.getElementById('res-fr').value=round(res.fr, 6).toString();
        document.getElementById('res-hr').value=round(res.hr, 6).toString();

    });
}

document.getElementById("tn-trapez").addEventListener("click", f_trapez);

document.getElementById("tn-parab").addEventListener("click", f_parab);

document.getElementById("tn-circ").addEventListener("click", f_circ);

document.getElementById("tn-caco").addEventListener("click", f_caco);

document.getElementById("tn-meh").addEventListener("click", f_meh);

document.getElementById("tn-mi").addEventListener("click", f_mi);

document.getElementById("tc-trap").addEventListener("click", f_tc_trap);

document.getElementById("tc-parab").addEventListener("click", f_tc_parab);

document.getElementById("tc-circ").addEventListener("click", f_tc_circ);

document.getElementById("rh-rect").addEventListener("click", f_rs_rect);

document.getElementById("rh-trap").addEventListener("click", f_rs_trap);

document.getElementById("rh-parab").addEventListener("click", f_rs_para);
document.getElementById("rh-circ").addEventListener("click", f_rs_circ);