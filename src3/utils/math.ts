function normalizeHeading(heading: number) {
    heading = ((heading - 1) % 360) + 1;

    if (heading < 1) heading += 360;

    return heading;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = degreesToRadians(angleInDegrees);

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function degreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180.0;
}

function keasToKtas(keas: number, altitude: number) {
    // TODO: implement this
    return keas;
}

function ktasToKeas(ktas: number, altitude: number) {
    // TODO: implement this
    return ktas;
}

function ktasToMach(ktas: number, altitude: number) {
    // TODO: implement this
    return ktas;
}

function machToKtas(mach: number, altitude: number) {
    // TODO: implement this
    return mach;
}

export { normalizeHeading, polarToCartesian, degreesToRadians, keasToKtas, ktasToKeas, ktasToMach, machToKtas };