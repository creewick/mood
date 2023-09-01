import Point from "./Point";

export default class Circle {
    private center: Point;
    private radius: number;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    public static getPoints(center: Point, radius: number, pointsCount: number): Point[] {
        const circle = new Circle(center, radius);

        return new Array(pointsCount)
            .fill(0)
            .map((_, i) => circle.getPoint((i / pointsCount) * Math.PI * 2));
    }

    public getPoint(radians: number): Point {
        return {
            x: this.center.x + this.radius * Math.cos(radians),
            y: this.center.y + this.radius * Math.sin(radians)
        };
    }
}
