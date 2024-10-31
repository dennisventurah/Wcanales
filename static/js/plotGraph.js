
import {PointXY} from './pointXY.js'
import {Rectangle} from './rectangle.js'
import {fromScale, MapToPixel} from './mapToPixel.js'
import {ScaleCalculator} from './scaleCalculator.js'

const LINE_DASH = {".":[1, 1], "-":[], "- -":[10, 10], "--.":[10,10, 10, 3, 3, 3]}

CanvasRenderingContext2D.prototype.fillPolygon = function (c, fillColor, strokeColor, lineWidth) {
    if (pointsArray.length <= 0) return;
    this.beginPath()
    this.setLineDash([]);
    this.moveTo(c[0].x, c[0].y);
    for (var i = 0; i < c.length; i++) {
        this.lineTo(c[i].x, c[i].y);
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

export class plotGraph{
    constructor (c){
        this.c = c;
        this.ctx = this.c.getContext("2d");
        this.extent = null;
        this.scale = 0.0;
        this.mMapUnitsPerPixel = 0.0;
        this.dpi = 96;
        this.unitType = 1;
        console.log("Calculará l extensión");
        this.calculateExtent();
        
        
    }

    calculateExtent(){
        const p1 = new PointXY(0,0);
        const p2 = new PointXY(this.c.width, this.c.height);
        this.extent = new Rectangle(p1, p2); 
    }

    xyCoordinates(p){ // Emite una señal cuando se mueve el Cursor.
        /*var mtp = new MapToPixel(this.set.mMapUnitsPerPixel, this);
        mtp.mValid = true;*/
        var pc = this.mapToPixel().toMapCoordinates(p.x, p.y);
        this.set.lastMousePos = pc;
        /*var pt = this.mapToPixel().toMapPoint(pc);*/
        
    }
    
    // Funciones Set
    setExtent(extent){
        var current = this.extent;
        if(extent.equal(current)){
            return 0;
        }
        else {
            this.extent = extent;
        }
        this.updateScale();
    }

    setCenter(point){
        const c = typeof point !== 'undefined'? true:false;
        var yMin, xMin;
        const r = this.extent;
        if (c){
            yMin = point.y;
            xMin = point.x;
        } else {
            xMin = this.center.x - r.width() / 2.0;
            yMin = this.center.y - r.height() / 2.0;
        }
        
        const rect = new Rectangle(PointXY(xMin, yMin), PointXY(xMin + r.width, yMin + r.height));
        this.setExtent(rect);
    }

    newPlot(cxy, color, width, dash){
        console.log("Va a plotear");
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        
        for (var i = 0; i < cxyn.length; i++) {
            this.ctx.lineTo(cxyn[i].x, cxyn[i].y);
        }

        
        if (width != null && width != undefined){
            this.ctx.lineWidth = width;
        }
        if(dash != null && dash != undefined){
            this.ctx.setLineDash(LINE_DASH[dash])
        }
        if(color != null && color != undefined){
            this.ctx.strokeStyle = color;
        }

        this.ctx.stroke();
    }

    mapUnits(){
        return this.unitType;
    }


    mapToPixel(){
        return fromScale(this.scale, this.mapUnits(), this, this.dpi)
        
    }

    updateScale(){
        this.scale = new ScaleCalculator(this.dpi, this.unitType).calculate(this.extent, this.c.width);
        const mtp = this.mapToPixel();
        this.mMapUnitsPerPixel = mtp.mMapUnitsPerPixel;
    }
}