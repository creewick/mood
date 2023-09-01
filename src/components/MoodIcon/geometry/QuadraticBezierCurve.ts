import Point from "./Point";

export default class QuadraticBezierCurve {
    public path: string = '';
    private lastPoint: Point;

    public constructor(point: Point) {
        this.path = `M ${point.x},${point.y} `;
        this.lastPoint = point;
    }

    public static fromPoints(points: Point[], shift: number): QuadraticBezierCurve {
        const curve = new QuadraticBezierCurve(points[points.length - 1]);
        points.forEach(point => curve.addPoint(point, shift));

        return curve;
    }

    public addPoint(point: Point, shift: number): QuadraticBezierCurve {
        const controlPoint = this.getControlPoint(this.lastPoint, point, shift);
        this.path += `Q ${controlPoint.x},${controlPoint.y} ${point.x},${point.y} `;
        this.lastPoint = point;

        return this;
    }

    public getControlPoint(start: Point, end: Point, value: number): Point {
        const midpoint: Point = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };

        const delta: Point = {
            x: start.y - end.y,
            y: end.x - start.x
        };

        const length = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        
        const normal: Point = {
            x: delta.x / length,
            y: delta.y / length
        };

        return {
            x: midpoint.x - value * normal.x,
            y: midpoint.y - value * normal.y
        };
    }
}