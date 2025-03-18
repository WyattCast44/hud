export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function normalizeHeading(heading: number): number {
  heading = ((heading - 1) % 360) + 1;
  if (heading < 1) heading += 360;
  return heading;
}

export function formatPitchLabel(degree: number): string {
  const absValue = Math.abs(degree).toString().padStart(2, ' ');
  return degree < 0 ? `-${absValue}` : ` ${absValue}`;
} 