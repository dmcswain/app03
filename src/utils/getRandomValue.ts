export default function getRandomValue(values: string[]): string {
   return values[Math.floor(Math.random() * values.length)];
}
