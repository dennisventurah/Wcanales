
import {round} from './mathUtils.js'


/*
class Dialog{
    constructor(content) {
        a = '<div id="modal-%content%" class="modal"><div class="dialog" style="left: 358px; top: 260px;"></div>'
    }
}

document.getElementById('close-dialog').addEventListener("click", function () {
    document.getElementById("dialog-window").style = "display: none;";
});

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


CanvasRenderingContext2D.prototype.fillPolygon = function (pointsArray, fillColor, strokeColor, lineWidth) {
    if (pointsArray.length <= 0) return;
    this.beginPath()
    this.setLineDash([]);
    this.moveTo(pointsArray[0].x, pointsArray[0].y);
    for (var i = 0; i < pointsArray.length; i++) {
        this.lineTo(pointsArray[i].x, pointsArray[i].y);
    }
    this.closePath();
    if (lineWidth != null && lineWidth != undefined){
        this.lineWidth = lineWidth;
    }
    
    if (strokeColor != null && strokeColor != undefined){
        this.strokeStyle = strokeColor;
        this.stroke();
    }

    if (fillColor != null && fillColor != undefined) {
        this.fillStyle = fillColor;
        this.fill();
    }
}

*/
// TABS

function tabs(){
    const liTabs = document.querySelectorAll(".tabTitle")
    const bloque = document.querySelectorAll(".bloqueContent")
    liTabs.forEach((item, i) => {

        item.addEventListener("click", () =>{
            liTabs.forEach((item, j) => {
                liTabs[j].classList.remove('activeTab');
                bloque[j].classList.remove('activeBlock');
            })
            liTabs[i].classList.add('activeTab');
            bloque[i].classList.add('activeBlock');
        })
    })
}

/*
                   
   

var plota = new plotUI(canvas); // plota, Clase que 
document.getElementById("property-bar").style = "left: {0}px;".replace("{0}", window.innerWidth-213);
document.getElementById("help-bar").style = "top: {0}px;".replace("{0}", window.innerHeight-30);

window.addEventListener('resize', function(e) {
    canvas.width = window.innerWidth-305;
    canvas.height = window.innerHeight-110;
    document.getElementById("help-bar").style = "top: {0}px;".replace("{0}", window.innerHeight-30);
    document.getElementById("property-bar").style = "left: {0}px;".replace("{0}", window.innerWidth-213);
    

    plota.mapCanvas.resizeEvent();
})



document.getElementById("colorItem").addEventListener("input", function(e) {
    msettings.colorItemCurrent = this.value;
    plota.mapCanvas.refresh();
}, false)
*/
/*
// EJEMPLO
var emb1 = new Embalse(plota.mapCanvas, new PointXY(0, 300));
plota.mapCanvas.addItem(emb1);
emb1.id = "E-1";

var node1 = new Node(plota.mapCanvas, new PointXY(500, 300));
node1.color = msettings.colorItemCurrent;
node1.demand = 60;
plota.mapCanvas.addItem(node1);
node1.id = "N-1";

var node2 = new Node(plota.mapCanvas, new PointXY(900, 300));
node2.color = msettings.colorItemCurrent;
node2.demand = 40;
plota.mapCanvas.addItem(node2);
node2.id = "N-2";

var node3 = new Node(plota.mapCanvas, new PointXY(900, 100));
node3.color = msettings.colorItemCurrent;
node3.demand = 30;
plota.mapCanvas.addItem(node3);
node3.id = "N-3";

var node4 = new Node(plota.mapCanvas, new PointXY(500, 100));
node4.color = msettings.colorItemCurrent;
node4.demand = 30;
plota.mapCanvas.addItem(node4);
node4.id = "N-4";

var node5 = new Node(plota.mapCanvas, new PointXY(  0, 0));
node5.color = msettings.colorItemCurrent;
node5.demand = 40;
plota.mapCanvas.addItem(node5);
node5.id = "N-5";

var pipe1 = new Pipe(plota.mapCanvas, emb1, node1);
pipe1.diam = 250;
pipe1.longitud = 500;
plota.mapCanvas.addItem(pipe1);

var pipe2 = new Pipe(plota.mapCanvas, node1, node2);
pipe2.diam = 150;
pipe2.longitud = 400;
pipe2.kl = 10;
plota.mapCanvas.addItem(pipe2);

var pipe3 = new Pipe(plota.mapCanvas, node3, node2);
pipe3.diam = 100;
pipe3.longitud = 200;
plota.mapCanvas.addItem(pipe3);

var pipe4 = new Pipe(plota.mapCanvas, node4, node3);
pipe4.diam = 150;
pipe4.longitud = 400;
plota.mapCanvas.addItem(pipe4);

var pipe5 = new Pipe(plota.mapCanvas, node1, node4);
pipe5.diam = 100;
pipe5.longitud = 200;
plota.mapCanvas.addItem(pipe5);

var pipe6 = new Pipe(plota.mapCanvas, node5, node4);
pipe6.diam = 200;
pipe6.longitud = 600;
plota.mapCanvas.addItem(pipe6);

var pipe7 = new Pipe(plota.mapCanvas, emb1, node5);
pipe7.diam = 250;
pipe7.longitud = 300;
plota.mapCanvas.addItem(pipe7);

plota.mapCanvas.refresh();
// TERMINA EJEMPLO */
/*
document.getElementById("posTextEsc").value = msettings.scale;

function buttonTool(tool) {
    msettings.mapTool = tool;
    msettings.isPipeDraw = false;
    plota.mapCanvas.refresh();
}

const list_buttons = [document.getElementById("Node"), document.getElementById("Pipe"), document.getElementById("Pan"), document.getElementById("Sel"), document.getElementById("Emb"),document.getElementById("Extent"), document.getElementById("ZoomIn"), document.getElementById("ZoomOut"), document.getElementById("Calculate")];

const list_tooltip = [document.getElementById("tooltip-node"), document.getElementById("tooltip-pipe"), document.getElementById("tooltip-pan"), document.getElementById("tooltip-sel"), document.getElementById("tooltip-emb"), document.getElementById("tooltip-extent"), document.getElementById("tooltip-zoomin"), document.getElementById("tooltip-zoomout"), document.getElementById("tooltip-calc")];
*/
/*
let e=document.querySelectorAll("#menuTools>li>label");

for(var t=0;t<e.length;t++){
    e[t].addEventListener("click",(e=>{
        e.stopPropagation(),
        e.preventDefault(),
        document.getElementById("menuTools").classList.toggle("active-menu");
        
        const t=e=>{
            (document.getElementById("menuTools").classList.remove("active-menu"),
            document.removeEventListener("click",t,!1))
        };
        document.addEventListener("click",t,!1)
        }
    ),!0)
};*/
/*
list_buttons.forEach( button => {
    var index = list_buttons.indexOf(button);
    button.addEventListener("mouseover", function(event){
        
        for(let i=0; i<list_tooltip.length; i++){
            if(i==index){
                list_tooltip[i].classList.add('active-tooltip');
            } 
        }
    })
    button.addEventListener("mouseout", function(event){
        for(let i=0; i<list_tooltip.length; i++){
            list_tooltip[i].classList.remove('active-tooltip');
        }
    })
    
})

document.getElementById("Node").addEventListener("click", function(e) {
    buttonTool("node");
    this.classList.add('active');
    this.classList.remove('inactive');
    document.getElementById("Pipe").classList.add('inactive');
    document.getElementById("Pan").classList.add('inactive');
    document.getElementById("Sel").classList.add('inactive');
    document.getElementById("Emb").classList.add('inactive');
    msettings.isPipeDraw = false;
})

document.getElementById("Pipe").addEventListener("click", function(e) {
    this.classList.add('active');
    this.classList.remove('inactive');
    document.getElementById("Node").classList.add('inactive');
    document.getElementById("Pan").classList.add('inactive');
    document.getElementById("Sel").classList.add('inactive');
    document.getElementById("Emb").classList.add('inactive');
    buttonTool("pipe");
})

document.getElementById("Pan").addEventListener("click", function(e) {
    buttonTool("pan");
    this.classList.add('active');
    this.classList.remove('inactive');
    document.getElementById("Pipe").classList.add('inactive');
    document.getElementById("Node").classList.add('inactive');
    document.getElementById("Sel").classList.add('inactive');
    document.getElementById("Emb").classList.add('inactive');
    msettings.isPipeDraw = false;
    document.getElementById("plotUI").style.cursor = "move"
})

document.getElementById("Sel").addEventListener("click", function(e) {
    buttonTool("sel");
    this.classList.add('active');
    this.classList.remove('inactive');
    document.getElementById("Pipe").classList.add('inactive');
    document.getElementById("Pan").classList.add('inactive');
    document.getElementById("Node").classList.add('inactive');
    document.getElementById("Emb").classList.add('inactive');
    document.getElementById("plotUI").style.cursor = "default"
    msettings.isPipeDraw = false;
})

document.getElementById("Emb").addEventListener("click", function(e) {
    buttonTool("emb");
    this.classList.add('active');
    this.classList.remove('inactive');
    document.getElementById("Pipe").classList.add('inactive');
    document.getElementById("Pan").classList.add('inactive');
    document.getElementById("Sel").classList.add('inactive');
    document.getElementById("Node").classList.add('inactive');
    msettings.isPipeDraw = false;
})

document.getElementById("Extent").addEventListener("click", function(e){
    plota.mapCanvas.zoomToFullExtent();
    document.getElementById("posTextEsc").value = msettings.scale;
})

document.getElementById("ZoomIn").addEventListener("click", function(e){
    plota.mapCanvas.zoomIn();
    document.getElementById("posTextEsc").value = msettings.scale;
})

document.getElementById("ZoomOut").addEventListener("click", function(e){
    plota.mapCanvas.zoomOut();
    document.getElementById("posTextEsc").value = msettings.scale;
})

document.getElementById("Calculate").addEventListener("click", function(e){
    plota.calculate();
})

// ACCIONES ARCHIVO
document.getElementById("file-new").addEventListener("click", function(e){
    plota.new();
})

const pickerOpts = {
    types: [
      {
        description: 'Hid file',
        accept: {
          'text/plain': ['.hid']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

const pickerOptsSave = {
    types: [{
      description: 'Hid file',
      accept: {'text/plain': ['.hid']},
    }],
  };

async function getFile(fileHandle) {
    // open file picker, destructure the one element returned array
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const content = await file.text();
    plota.open(content);
}

async function writeFile(data) {
    // open file picker, destructure the one element returned array
    try {
        const newHandle = await window.showSaveFilePicker(pickerOpts);
        const writable = await newHandle.createWritable();
        data = data.replace("{22}", newHandle.name);
        await writable.write(data);
        await writable.close();
    }
    catch (DOMException) {
        return 0;
    }
}
*/

document.getElementById("tn-trapez").addEventListener("click", function(e){
    const win_body = document.getElementById("win-body");
    var data = '<p> TRAPEZOIDAL </p>'
    win_body.innerHTML = data;
})

/*

document.getElementById("file-save").addEventListener("click", function(e){
    const data = plota.save();
    writeFile(data);
    
})

document.getElementById("file-pref").addEventListener("click", function(e){
    console.log("Preferencias");
    const dialog = document.getElementById('dialog-content');
    const diag = document.getElementById("dialog-window")
    diag.style = "display: flex;";
    var data = '<div class="tab--container">    <ul class="tabList">        <li class="tabTitle activeTab">General</li>        <li class="tabTitle">Formato</li>            </ul>    <div class="tabContent">        <div class="bloqueContent activeBlock">            <label class="checkTab">Fuentes en negrita <input id="textBold" type="checkbox" BB><span class="checkmark"></span></label>            <label class="checkTab">Confirmar Borrado <input id="PNode" type="checkbox" BB><span class="checkmark"></span></label>        </div>        <div class="bloqueContent">                    </div>            </div></div><div class="dialog--buttons">    <button id="acceptDialog" class="dialog--button">Aceptar</button>    <button id="cancelDialog" class="dialog--button">Cancelar</button></div>';
    dialog.innerHTML = data;
    document.getElementById('dialog-title').innerHTML = "Preferencias";
    document.getElementById('acceptDialog').addEventListener("click", function () {
        
        
        document.getElementById("dialog-window").style = "display: none;";
    });

    document.getElementById('cancelDialog').addEventListener("click", function () {
        document.getElementById("dialog-window").style = "display: none;";
    });
    
    tabs();
})


document.getElementById('view-dim').addEventListener("click", function(e){
    plota.setDimensions();
})

document.getElementById('view-move').addEventListener("click", function(e){
    buttonTool("pan");
    document.getElementById("Pan").classList.add('active');
    document.getElementById("Pan").classList.remove('inactive');
    document.getElementById("Pipe").classList.add('inactive');
    document.getElementById("Node").classList.add('inactive');
    document.getElementById("Sel").classList.add('inactive');
    document.getElementById("Emb").classList.add('inactive');
    msettings.isPipeDraw = false;
})

document.getElementById('view-zoomin').addEventListener("click", function(e){
    plota.mapCanvas.zoomIn();
    document.getElementById("posTextEsc").value = msettings.scale;
})

document.getElementById('view-zoomout').addEventListener("click", function(e){
    plota.mapCanvas.zoomOut();
    document.getElementById("posTextEsc").value = msettings.scale;
})

document.getElementById('view-extent').addEventListener("click", function(e){
    plota.mapCanvas.zoomToFullExtent();
    document.getElementById("posTextEsc").value = msettings.scale
})
*/
/*
document.getElementById('view-options').addEventListener("click", function(e){
    const dialog = document.getElementById('dialog-content');
    const diag = document.getElementById("dialog-window")
    diag.style = "display: flex;";
    var data = '<div class="tab--container"><ul class="tabList"><li class="tabTitle activeTab">Nudos</li><li class="tabTitle">Tuberias</li><li class="tabTitle">Etiquetas</li><li class="tabTitle">Flechas</li><li class="tabTitle">Fondo</li></ul><div class="tabContent"><div class="bloqueContent activeBlock"><label class="spin">Tamaño de Nudo: <input type="number" value="AA" step="1" min="1" max="10" name="NodeWidth"></label><label class="checkTab">Proporsional al valor <input id="PNode" type="checkbox" BB><span class="checkmark"></span></label></div><div class="bloqueContent"><label class="spin">Tamaño de Linea: <input type="number" value="CC" step="1" name="PipeWidth"></label><label class="checkTab">Proporsional al valor<input type="checkbox" id="PPipe" DD><span class="checkmark"></span></label></div><div class="bloqueContent"><label class="checkTab">Mostrar ID Nudos<input id="showNode" type="checkbox" EE><span class="checkmark"></span></label><label class="checkTab">Mostrar Valor Nudos <input id="showValueNode" type="checkbox" FF><span class="checkmark"></span></label><label class="checkTab">Mostrar ID Tuberias <input  id="showPipe" type="checkbox" GG><span class="checkmark"></span></label><label class="checkTab">Mostrar Valor Tuberias <input id="showValuePipe" type="checkbox" HH><span class="checkmark"></span></label><label class="spin">Tamaño de Texto: <input type="number" value="II" step="1" name="textWidth"></label></div><div class="bloqueContent"><label class="checkTab">Mostrar Flechas <input  id="showArrow" type="checkbox" JJ><span class="checkmark"></span></label><label class="spin">Tamaño de Flecha: <input type="number" value="KK" step="1" name="ArrowWidth"></label></div><div class="bloqueContent"><label class="spin">Color de Fondo: <input id="colorBack" type="color" value="LL"></label></div> </div></div><div class="dialog--buttons"><button id="acceptDialog" class="dialog--button">Aceptar</button><button id="cancelDialog" class="dialog--button">Cancelar</button></div>'.replace("AA",msettings.wNode).replace("BB",msettings.pNode?'checked="checked"':"").replace("CC", msettings.wPipe).replace("DD",msettings.pPipe?'checked="checked"':"").replace("EE",msettings.showNode?'checked="checked"':"").replace("FF",msettings.showValueNode?'checked="checked"':"").replace("GG",msettings.showPipe?'checked="checked"':"").replace("HH",msettings.showValuePipe?'checked="checked"':"").replace("II",msettings.textWidth).replace("JJ",msettings.showArrow?'checked="checked"':"").replace("KK",msettings.arrowWidth).replace("LL",msettings.background);
    
    dialog.innerHTML = data;
    document.getElementById('dialog-title').innerHTML = "Opciones del Plano";
    document.getElementById('acceptDialog').addEventListener("click", function () {
        
        plota.setOptions({
            wNode: document.getElementsByName("NodeWidth")[0].value,
            pNode: document.getElementById("PNode").checked, 
            wPipe: document.getElementsByName("PipeWidth")[0].value, 
            pPipe: document.getElementById("PPipe").checked, 
            showNode: document.getElementById("showNode").checked,
            showValueNode: document.getElementById("showValueNode").checked,
            showPipe: document.getElementById("showPipe").checked,
            showValuePipe: document.getElementById("showValuePipe").checked,
            textWidth: document.getElementsByName("textWidth")[0].value,
            showArrow: document.getElementById("showArrow").checked,
            arrowWidth: document.getElementsByName("ArrowWidth")[0].value,
            background: document.getElementById("colorBack").value
        });
        document.getElementById("dialog-window").style = "display: none;";
    });

    document.getElementById('cancelDialog').addEventListener("click", function () {
        document.getElementById("dialog-window").style = "display: none;";
    });

    


    tabs();
    
    
})


//ACCIONES PROYECTO

document.getElementById('project-summary').addEventListener("click", function(e){
    plota.drawSummary();
})

document.getElementById('project-default').addEventListener("click", function(e){
    plota.drawSummary();
})

document.getElementById('project-calcOp').addEventListener("click", function(e){
    plota.setOptionsCalc();
})

document.getElementById('project-calculate').addEventListener("click", function(e){
    plota.calculate();
})

// ACCIONES INFORME

document.getElementById('report-state').addEventListener("click", function(e){
    plota.reportState();
})

document.getElementById('report-complete').addEventListener("click", function(e){
    plota.reportComplete();
})

document.getElementById('report-graph').addEventListener("click", function(e){
    plota.showGraph();
})

document.getElementById('report-table').addEventListener("click", function(e){
    plota.showTable();
})

// ACCIONES AYUDA

document.getElementById('help-units').addEventListener("click", function(e){
    plota.showUnits();
})

document.getElementById('help-about').addEventListener("click", function(e){
    plota.showAbout();
})
/*
// Evento Scroll
canvas.addEventListener('mousewheel', function(event){
    var pos = getMousePos(canvas, event);
    
    var delta = event.deltaY;
    plota.mapCanvas.scaleChanged(pos, delta);
    plota.mapCanvas.xyCoordinates(pos);
    document.getElementById("posTextEsc").value = msettings.scale;
    document.getElementById("posTextXY").value = "X,Y="+String(round(msettings.lastMousePos.x, 5)) + ", " + String(round(msettings.lastMousePos.y, 5)); 
}, false);

// Evento movimiento del cursor
canvas.addEventListener('mousemove', function(event){
    var pos = getMousePos(canvas, event);
    
    plota.mapCanvas.xyCoordinates(pos);

    plota.mapCanvas.mouseMoveEvent(pos);
    
    document.getElementById("posTextXY").value = "X,Y="+String(round(msettings.lastMousePos.x, 5)) + ", " + String(round(msettings.lastMousePos.y, 5)); 
})

// Evento Click del raton
canvas.addEventListener('mousedown', function(event){
    
    var pos = getMousePos(canvas, event);
    
    plota.mapCanvas.mousePressEvent(pos);

 
})

// Evento click release del raton
canvas.addEventListener('mouseup', function(event){
    var pos = getMousePos(canvas, event);
    plota.mapCanvas.mouseReleaseEvent(pos);
})

window.addEventListener('keypress', function(e){
    plota.mapCanvas.keyPressed(e);
}, false)
*/