export const formatDateYear = date => {
    const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];
    const newDate = new Date(date);
    const y = newDate.getFullYear().toString().substr(2);
    const d = newDate.getDate();
    const m = months[newDate.getMonth()];
    return `${m}/${d}/${y}`;
};

export const formatDate = date => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = months[newDate.getMonth()];
    return [m, d];
};