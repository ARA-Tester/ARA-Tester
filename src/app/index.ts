
import { AraTesterAxisConfig } from './ara-tester-axis-config';
import { AraTesterAxis } from './ara-tester-axis';

let axisConfig: AraTesterAxisConfig = {
    id: 0,
    pulse_width: 5000,
    t_max: 1000000,
    t_min: 40000,
    t_delta: 50,
    configured: 4000000
};

let axis: AraTesterAxis = new AraTesterAxis(axisConfig);
let exec: Promise<number> = axis.movment(true, 100);
exec.then((count: number) => {
    console.log("Counter: " + count);
    axis.release();
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));

/*setTimeout(() => {
    axis.stop();
    setTimeout(() => {
        axis.resume();
    }, 3000)
}, 12000);*/
