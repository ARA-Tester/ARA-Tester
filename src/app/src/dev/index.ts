import AraTesterAxisConfig from '../share/AraTesterAxisConfig';
import { AraTesterAxis } from './ara-tester-axis';

let axisConfig: AraTesterAxisConfig = {
    pulseWidth: 50,
    tMax: 5000000,
    tMin: 50000,
    tDelta: 1000,
    configured: 6400
};

let axis: AraTesterAxis = new AraTesterAxis(0, axisConfig);
axis.movment({
    direction: false,
    distance: 20
}).then((count: number) => {
    console.log("Counter: " + count);
    axis.release();
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));

