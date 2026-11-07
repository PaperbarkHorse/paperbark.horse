export class Site {
    isFestive(): boolean {
        const params = new URLSearchParams(location.search);
        return !params.has("scrooge") && (new Date().getMonth() === 11 || params.has("jolly"));
    }
}

export const site = new Site();
