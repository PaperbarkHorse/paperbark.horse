export class Site {
    isFestive(): boolean {
        const params = new URLSearchParams(location.search);
        const now = new Date();

        let isFestivePeriod = now.getMonth() === 11 || (now.getMonth() === 10 && now.getDate() >= 14);

        return !params.has("scrooge") && (params.has("jolly") || isFestivePeriod);
    }
}

export const site = new Site();
