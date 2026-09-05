/** Descent speed in seconds per line */
export type DescentSpeed = number;

export function calcFallSpeed(level: number): DescentSpeed {
    return Math.pow(0.8 - ((level - 1) * 0.007), level - 1);
}

export function calcSoftDropSpeed(level: number): DescentSpeed {
    return 20 * calcFallSpeed(level);
}

export function calcHardDropSpeed(): DescentSpeed {
    return 0.0001;
}
