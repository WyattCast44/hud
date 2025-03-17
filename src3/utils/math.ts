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

export { normalizeHeading, polarToCartesian, degreesToRadians };