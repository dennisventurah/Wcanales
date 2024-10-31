import {fromUnitToUnitFactor, UnitTypes} from './unitTypes.js';
import {PointXY} from './pointXY.js';

export function fromScale(scale, mapUnits, parent, dpi=96){
    const mettersPerPixel = 25.4 / dpi / 1000.0;
    const ut = new UnitTypes();
    const mapUnitPerPixel = mettersPerPixel * fromUnitToUnitFactor(ut, ut.DistanceMeters, mapUnits);
    const mtp = new MapToPixel(mapUnitPerPixel * scale, parent);
    
    mtp.mValid = true;
    return mtp;
}

export class MapToPixel {
    constructor(mapUnitPerPixel, parent){
        this.mValid = false;
        this.mMapUnitsPerPixel = mapUnitPerPixel;
        this.mWidth = 0;
        this.mHeight = 0;
        this.parent = parent;
    }

    get mapHeight() {
        return this.mHeight;
    }
    
    get mapUnitPerPixel() {
        return this.mMapUnitsPerPixel;
    }

    get mapWidth() {
        return this.mWidth;
    }

    setMapUnitPerPixel(mapUnitPerPixel) {
        this.mMapUnitPerPixel = mapUnitPerPixel;
    }

    setParameters(mapUnitPerPixel, widthPixel, heightPixel) {
        this.mMapUnitsPerPixel = mapUnitPerPixel;
        this.mHeight = heightPixel;
        this.mWidth = widthPixel;
        this.parent.mMapUnitPerPixel = mapUnitPerPixel;
        this.isValid = true;
    }

    updateParameters(scale, mapUnits, dpi=96){
        const mettersPerPixel = 25.4 / dpi / 1000.0
        const ut = new UnitTypes();
        this.mMapUnitsPerPixel = scale * mettersPerPixel * fromUnitToUnitFactor(ut, ut.DistanceMeters, mapUnits);
        this.mHeight = this.parent.extent.height / this.mapUnitPerPixel;
        this.mWidth = this.parent.extent.width / this.mapUnitPerPixel;
        this.parent.mMapUnitPerPixel = this.mMapUnitPerPixel;
        this.isValid = true;
    }

    toMapCoordinates(x, y) {
        if (this.mValid){
            var mx, my;
            const extent = this.parent.extent;
            mx = x * this.mMapUnitsPerPixel + extent.xMinimum;
            my = -y * this.mMapUnitsPerPixel + extent.yMaximum;
            return new PointXY(mx, my);
        }
        return null;    
    }

    toMapArray(cxy){
        var ncxy = [];
        for (let i=0;i<cxy.length;i++){
            ncxy.push(this.toMapPoint(cxy[i]));
        }
        return ncxy;
    }

    toMapPoint(px, y) {
        if (this.mValid){
            var mx, my;
            const extent = this.parent.extent;
            
            if(typeof y !== 'undefined'){
                mx = px;
                my = y;
            } else {
                mx = px.x;
                my = px.y;
            }
            console.log(extent);
            return {x: (mx-extent.xMinimum)/this.mMapUnitsPerPixel, y: (extent.yMaximum-my)/this.mMapUnitsPerPixel}
        }
        return null;
    }

}