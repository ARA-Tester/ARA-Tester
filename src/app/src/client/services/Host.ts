export default function Host(): string {
    const { appHost } = global;
    return appHost !== undefined ? appHost: window.location.host;
}
