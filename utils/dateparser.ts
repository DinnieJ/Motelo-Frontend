export const getDateFromString = (s: string) :any => {
    let matches: any = s.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/)
    return new Date(Date.UTC(matches[1], parseInt(matches[2]) - 1, matches[3], matches[4], matches[5], matches[6]));
}

export const diffTime = (a: Date, b:Date): number => {
    let diff = (b.getTime() - a.getTime()) / 1000;
    diff /= 3600;
    return Math.abs(Math.round(diff));
}