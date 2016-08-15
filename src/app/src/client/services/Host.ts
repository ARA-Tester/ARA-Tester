export function Host(): string {
    let host: string = global['appHost'];
    return host !== undefined ? host : window.location.host;
}
