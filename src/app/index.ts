
import { AraTesterAxisConfig } from './ara-tester-axis-config';
import { AraTesterAxis } from './ara-tester-axis';

let axisConfig: AraTesterAxisConfig = {
    id: 0,
    pulse_width: 50,
    t_max: 5000000,
    t_min: 50000,
    t_delta: 1000,
    configured: 6400
};

/*let axisConfig: AraTesterAxisConfig = {
    id: 0,
    pulse_width: 10,
    t_max: 2,
    t_min: 1,
    t_delta: 1,
    configured: 20
};*/

let axis: AraTesterAxis = new AraTesterAxis(axisConfig);
axis.movment(false, 20).then((count: number) => {
    console.log("Counter: " + count);
    axis.release();
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));

/*let axisConfig: AraTesterAxisConfig = {
    id: 0,
    pulse_width: 10,
    t_max: 12,
    t_min: 1,
    t_delta: 1,
    configured: 36
};

let axis: AraTesterAxis = new AraTesterAxis(axisConfig);
axis.movment(false, 1).then((count: number) => {
    console.log("Counter: " + count);
    axis.movment(true, 1).then((count2: number) => {
        console.log("Counter: " + count2);
        axis.release();
    }).catch((err2: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err2)));
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));
*/
