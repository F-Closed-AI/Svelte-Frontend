import type { RemainingTime } from "$lib/types";

export function calculateRemainingTime(endTime: number) {
    const difference: number = (endTime - new Date().getTime()) * -1;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(difference % (1000 * 60) / 1000)
    } 
}

export function formatRemainingTime(remainingTime: RemainingTime, format: "default" | "short" | "other" = "default") {
    switch (format) {
        case "short":
            return getShortTime(remainingTime);
        case "other":
            return getOtherTime(remainingTime);
        default:
            return getDefaultTime(remainingTime);
    }
}

export function addS(value: number, unit: string) {
    return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
};

function getShortTime(remainingTime: RemainingTime) {
    const { days, hours, minutes, seconds } = remainingTime;
    
    if (days > 0) {
        return addS(days, "day");
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

function getOtherTime(remainingTime: RemainingTime) {
    const { days, hours, minutes, seconds } = remainingTime;

    if (days > 0) {
        return addS(days, "day");
    } else if (hours > 0) {
        return addS(hours, "hour");
    } else if (minutes > 0) {
        return addS(minutes, "minute");
    } else {
        return addS(seconds, "second");
    }
}

function getDefaultTime(remainingTime: RemainingTime) {
    const { days, hours, minutes, seconds } = remainingTime;

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}