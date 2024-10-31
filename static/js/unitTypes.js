const DEGREE_TO_METER = 111319.49079327358;
const FEET_TO_METER = 0.3048;
const NMILE_TO_METER = 1852.0;
const KILOMETER_TO_METER = 1000.0;
const CENTIMETERS_TO_METER = 0.01;
const MILLIMETERS_TO_METER = 0.001;
const YARDS_TO_METER = 0.9144;
const YARDS_TO_FEET = 3.0;
const MILES_TO_METER = 1609.344;

export function fromUnitToUnitFactor(p, fromUnit, toUnit){
    switch(fromUnit){
        case p.DistanceMeters:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return 1.0;
                    case p.DistanceKilometers:
                        return 1.0 / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return 1.0 / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return 1.0 / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return 1.0 / FEET_TO_METER;
                    case p.DistanceYards:
                        return 1.0 / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return 1.0 / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return 1.0 / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return 1.0 / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceKilometers:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return KILOMETER_TO_METER;
                    case p.DistanceKilometers:
                        return 1.0;
                    case p.DistanceMillimeters:
                        return KILOMETER_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return KILOMETER_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return KILOMETER_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return KILOMETER_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return KILOMETER_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return KILOMETER_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return KILOMETER_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceMillimeters:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return MILLIMETERS_TO_METER;
                    case p.DistanceKilometers:
                        return MILLIMETERS_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return 1.0;
                    case p.DistanceCentimeters:
                        return MILLIMETERS_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return MILLIMETERS_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return MILLIMETERS_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return MILLIMETERS_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return MILLIMETERS_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return MILLIMETERS_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceCentimeters:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return CENTIMETERS_TO_METER;
                    case p.DistanceKilometers:
                        return CENTIMETERS_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return CENTIMETERS_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return 1.0;
                    case p.DistanceFeet:
                        return CENTIMETERS_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return CENTIMETERS_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return CENTIMETERS_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return CENTIMETERS_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return CENTIMETERS_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceFeet:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return FEET_TO_METER;
                    case p.DistanceKilometers:
                        return FEET_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return FEET_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return FEET_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return 1.0;
                    case p.DistanceYards:
                        return 1.0 / YARDS_TO_FEET;
                    case p.DistanceMiles:
                        return FEET_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return FEET_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return FEET_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceYards:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return YARDS_TO_METER;
                    case p.DistanceKilometers:
                        return YARDS_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return YARDS_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return YARDS_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return YARDS_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return 1.0;
                    case p.DistanceMiles:
                        return YARDS_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return YARDS_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return YARDS_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceMiles:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return MILES_TO_METER;
                    case p.DistanceKilometers:
                        return MILES_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return MILES_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return MILES_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return MILES_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return MILES_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return 1.0;
                    case p.DistanceDegrees:
                        return MILES_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return MILES_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceDegrees:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return DEGREE_TO_METER;
                    case p.DistanceKilometers:
                        return DEGREE_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return DEGREE_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return DEGREE_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return DEGREE_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return DEGREE_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return DEGREE_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return 1.0;
                    case p.DistanceNauticalMiles:
                        return DEGREE_TO_METER / NMILE_TO_METER;
                }
                break;
            }
        case p.DistanceNauticalMiles:
            {
                switch(toUnit){
                    case p.DistanceMeters:
                        return NMILE_TO_METER;
                    case p.DistanceKilometers:
                        return NMILE_TO_METER / KILOMETER_TO_METER;
                    case p.DistanceMillimeters:
                        return NMILE_TO_METER / MILLIMETERS_TO_METER;
                    case p.DistanceCentimeters:
                        return NMILE_TO_METER / CENTIMETERS_TO_METER;
                    case p.DistanceFeet:
                        return NMILE_TO_METER / FEET_TO_METER;
                    case p.DistanceYards:
                        return NMILE_TO_METER / YARDS_TO_METER;
                    case p.DistanceMiles:
                        return NMILE_TO_METER / MILES_TO_METER;
                    case p.DistanceDegrees:
                        return NMILE_TO_METER / DEGREE_TO_METER;
                    case p.DistanceNauticalMiles:
                        return 1.0;
                }
                break;
            }
    }

}


export class UnitTypes {
    DistanceMeters = 1;
    DistanceFeet = 2;
    DistanceMiles = 3;
    DistanceKilometers = 4;
    DistanceYards = 5;
    DistanceCentimeters = 6;
    DistanceMillimeters = 7;
    DistanceNauticalMiles = 8;
    DistanceDegrees = 9;    
}