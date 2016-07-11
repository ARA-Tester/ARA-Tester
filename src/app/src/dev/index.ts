import { AraTesterAxisConfig } from './ara-tester-axis-config';
import { AraTesterAxis } from './ara-tester-axis';

let axisConfig: AraTesterAxisConfig = {
    pulse_width: 50,
    t_max: 5000000,
    t_min: 50000,
    t_delta: 1000,
    configured: 6400
};

let axis: AraTesterAxis = new AraTesterAxis(0, axisConfig);
axis.movment(false, 20).then((count: number) => {
    console.log("Counter: " + count);
    axis.release();
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));

