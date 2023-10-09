import paper from 'paper';



export class Point {
    
    private point!: paper.Point;

    constructor(...args: any[]) {
        
        if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {

            this.point = new paper.Point(args[0], args[1]);

        } else if (args.length === 1) {

            if (typeof args[0] === 'number') {

                this.point = new paper.Point(args[0], args[0]);

            } else if (Array.isArray(args[0]) && args[0].length === 2) {

                this.point = new paper.Point(args[0][0], args[0][1]);

            } else if (typeof args[0] === 'object') {

                const { angle, length, x = 0, y = 0 } = args[0];

                if (angle !== undefined && length !== undefined) {

                    this.point = new paper.Point({ angle, length });

                } else {

                    this.point = new paper.Point(x, y);
                }
            }

        } else {

            throw new Error('Invalid arguments for Point');
        }
    }

    // Getter for x property
    get x(): number {
        
        return this.point.x;
    }

    get y(): number {
        
        return this.point.y;
    }

    set length( value: number ) {
        
        this.point.length = value;
    }

    get length(): number {
        
        return this.point.length;
    }

    set angle( value ) {
       
        this.point.angle = value;
    }

    get angle(): number {
       
        return this.point.angle;
    }

    get angleInRadians(): number {
        
        return this.point.angleInRadians;
    }

    isZero(): boolean {

        return this.point.isZero();
    }

    clone(): paper.Point {
        
        return new paper.Point(this.point);
    }

    getDistance(point: paper.PointLike, squared?: boolean): number {
        
        return this.point.getDistance(point, squared);
    }

    normalize(length?: number) {
        
        return this.point.normalize(length);
    }

    rotate(angle: number, center: paper.PointLike) {
        
        return this.point.rotate(angle, center);
    }

    add(value: number | paper.PointLike) {
        
        if (typeof value === 'number') {

            return this.point.add(value);

        } else {

            return this.point.add(value);
        }
    }

    subtract(value: number | paper.PointLike ) {
        
        if (typeof value === 'number') {
            
            return this.point.subtract(value);

        } else {

            return this.point.subtract(value);
        }
    }

    multiply(value: number | paper.PointLike) {
        
        if (typeof value === 'number') {

            return this.point.multiply(value);

        } else {

            return this.point.multiply(value);
        }
    }

    divide(value: number | paper.PointLike) {
        
        if (typeof value === 'number') {
            return this.point.divide(value);
        } else {
            return this.point.divide(value);
        }
    }

    modulo(value: number | paper.PointLike) {
        
        if (typeof value === 'number') {
            return this.point.modulo(value);
        } else {
            return this.point.modulo(value);
        }
    }

}


export class Segment {
    
    private segment: paper.Segment;

    constructor(point?: paper.PointLike, handleIn?: paper.PointLike, handleOut?: paper.PointLike) {
        
        this.segment = new paper.Segment(point, handleIn, handleOut);
    }

    // Getter for point property
    get point() {
        return this.segment.point;
    }

    // Setter for point property
    set point(value: paper.Point) {
        this.segment.point = value;
    }

    // Getter for handleIn property
    get handleIn() {
        return this.segment.handleIn;
    }

    // Setter for handleIn property
    set handleIn(value: paper.Point) {
        this.segment.handleIn = value;
    }

    // Getter for handleOut property
    get handleOut() {
        return this.segment.handleOut;
    }

    // Setter for handleOut property
    set handleOut(value: paper.Point) {
        this.segment.handleOut = value;
    }

    // Getter for selected property
    get selected(): boolean {
        return this.segment.selected;
    }

    // Setter for selected property
    set selected(value: boolean) {
        this.segment.selected = value;
    }

    // Getter for index property
    get index(): number {
        return this.segment.index;
    }

    // Getter for path property
    get path() {
        return this.segment.path;
    }

    // Getter for curve property
    get curve() {
        return this.segment.curve;
    }

    // Getter for location property
    get location() {
        return this.segment.location;
    }

    // Getter for next property
    get next() {
        return this.segment.next;
    }

    // Getter for previous property
    get previous() {
        return this.segment.previous;
    }

    // Method to check if the segment has any curve handles set
    hasHandles(): boolean {
        return this.segment.hasHandles();
    }

    // Method to check if the segment is smooth
    isSmooth(): boolean {
        return this.segment.isSmooth();
    }

    // Method to clear the segment's handles
    clearHandles(): void {
        this.segment.clearHandles();
    }

    // Method to smooth the segment
    smooth(options?: object): void {
        this.segment.smooth(options);
    }

    // Method to check if this is the first segment
    isFirst(): boolean {
        return this.segment.isFirst();
    }

    // Method to check if this is the last segment
    isLast(): boolean {
        return this.segment.isLast();
    }

    // Method to reverse the segment
    reverse() {
        return this.segment.reverse();
    }

    // Method to get the reversed segment
    reversed() {
        return this.segment.reversed();
    }

    // Method to remove the segment from the path
    remove(): boolean {
        return this.segment.remove();
    }

    // Method to clone the segment
    clone() {
        return this.segment.clone();
    }

    // Method to get a string representation of the segment
    toString(): string {
        return this.segment.toString();
    }

    // // Method to transform the segment by a matrix
    // transform(matrix: Matrix): void {
    //     this.segment.transform(matrix);
    // }

    // Method to interpolate between two segments
    interpolate(from: paper.Segment, to: paper.Segment, factor: number): void {
        this.segment.interpolate(from, to, factor);
    }
}


export class Path extends paper.Item {
    
    private path: paper.Path;

    constructor(...args: any[]) {

        super();

        this.path = new paper.Path(...args);
    }

    // Getter for segments property
    get segments() {

        return this.path.segments;
    }

    // Getter for firstSegment property
    get firstSegment() {

        return this.path.firstSegment;
    }

    // Getter for lastSegment property
    get lastSegment() {

        return this.path.lastSegment;
    }

    // Getter for curves property
    get curves() {

        return this.path.curves;
    }

    // Getter for firstCurve property
    get firstCurve(){

        return this.path.firstCurve;
    }

    // Getter for lastCurve property
    get lastCurve() {

        return this.path.lastCurve;
    }

    // Getter for closed property
    get closed(): boolean {

        return this.path.closed;
    }

    // Setter for closed property
    set closed(value: boolean) {

        this.path.closed = value;
    }

    // Getter for length property
    get length(): number {

        return this.path.length;
    }

    // Getter for area property
    get area(): number {

        return this.path.area;
    }

    // Getter for fullySelected property
    get fullySelected(): boolean {

        return this.path.fullySelected;
    }

    // Setter for fullySelected property
    set fullySelected(value: boolean) {

        this.path.fullySelected = value;
    }

    // Add other getters and setters for properties as needed

    // Method to add segments
    add(...segment: ( paper.Segment | paper.PointLike | number[])[]) {
        return this.path.add(...segment);
    }

    // Method to insert a segment
    insert(index: number, segment: paper.Segment | paper.PointLike) {
        return this.path.insert(index, segment);
    }

    // Method to add segments
    addSegments(segments: paper.Segment[]): paper.Segment[] {
        return this.path.addSegments(segments);
    }

    // Method to insert segments
    insertSegments(index: number, segments: paper.Segment[]) {
        return this.path.insertSegments(index, segments);
    }

    // Method to remove a segment
    removeSegment(index: number) {
        return this.path.removeSegment(index);
    }

    // Method to remove segments
    removeSegments(from: number, to?: number) {

        return this.path.removeSegments(from, to);
    }

    // Method to check if any curves have handles
    hasHandles(): boolean {
        return this.path.hasHandles();
    }

    // Method to clear handles
    clearHandles(): void {
        this.path.clearHandles();
    }

    // Method to divide the path at a location
    divideAt(location: number | paper.CurveLocation) {
        return this.path.divideAt(location);
    }

    // Method to split the path at a location
    splitAt(location: number | paper.CurveLocation) {
        
        const newPath = this.path.splitAt(location);
        return new paper.Path(newPath);
    }

    // Method to join this path with another
    join(path: paper.Path, tolerance?: number): void {
        
        this.path.join(path, tolerance);
    }

    // Method to reduce the path
    reduce(options: any) {
        
        const reducedPath = this.path.reduce(options);
        return new paper.Path(reducedPath);
    }

    // // Method to create a shape from the path
    // toShape(insert?: boolean): Shape {
    //     return this.path.toShape(insert);
    // }

    // Method to get the location of a point on the path
    getLocationOf(point: paper.PointLike) {
        
        return this.path.getLocationOf(point);
    }

    // Method to get the offset of a point on the path
    getOffsetOf(point: paper.PointLike): number {
        return this.path.getOffsetOf(point);
    }

    // Method to get the location at a specific offset on the path
    getLocationAt(offset: number) {
        return this.path.getLocationAt(offset);
    }

    // Method to get a point at a specific offset on the path
    getPointAt(offset: number) {
        return this.path.getPointAt(offset);
    }

    // Method to get the tangent at a specific offset on the path
    getTangentAt(offset: number) {
        return this.path.getTangentAt(offset);
    }

    // Method to get the normal at a specific offset on the path
    getNormalAt(offset: number) {
        return this.path.getNormalAt(offset);
    }

    // Method to get the weighted tangent at a specific offset on the path
    getWeightedTangentAt(offset: number) {
        return this.path.getWeightedTangentAt(offset);
    }

    // Method to get the weighted normal at a specific offset on the path
    getWeightedNormalAt(offset: number) {
        return this.path.getWeightedNormalAt(offset);
    }

    // Method to get the curvature at a specific offset on the path
    getCurvatureAt(offset: number): number {
        return this.path.getCurvatureAt(offset);
    }

    // Method to get offsets with a given tangent
    getOffsetsWithTangent(tangent: paper.PointLike) {
        return this.path.getOffsetsWithTangent(tangent);
    }
}


export class Circle {
    
    private path: paper.Path;

    constructor(...args: any[]) {

        this.path = new paper.Path.Circle(args);
    }
}


export class Ellipse {
    
    private path: paper.Path;

    constructor(...args: any[]) {
        
        this.path = new paper.Path.Circle(args);
    }
}


export class Group extends paper.Item {
    
    private group: paper.Group;

    constructor(...args: any[]) {
        
        let children: paper.Item[] = [];

        if (args.length === 1) {
            
            if (args[0] instanceof Array) {

                children = args[0];

            } else if (args[0] instanceof Object && args[0].children instanceof Array) {

                children = args[0].children;
            }
        }

        super();

        this.group = new paper.Group(children)
    }

    addChildren( children: paper.Item[] ) {

        return this.group.addChildren(children)
    }
}


