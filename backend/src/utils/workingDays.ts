export function getWorkingDays(
    month: number,
    year: number
): number {

    const totalDays =
        new Date(
            year,
            month,
            0
        ).getDate();

    let sundays = 0;

    for (

        let day = 1;

        day <= totalDays;

        day++

    ) {

        const currentDay =
            new Date(
                year,
                month - 1,
                day
            ).getDay();

        if (

            currentDay === 0

        ) {

            sundays++;

        }

    }

    return totalDays - sundays;

}