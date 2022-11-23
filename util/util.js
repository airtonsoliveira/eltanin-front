export function formatDateExtended(yearMonth) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const year = parseInt(yearMonth / 100)
    const monthNumber = yearMonth - 100 * year
    return monthNames[monthNumber - 1] + ' ' + year
}

export function getLastYearMonths(n) {
    const currentYearMonth = getCurrentYearMonth()
    const yearMonths = [currentYearMonth]
    for(let i = 0; i < n - 1; i++) {
        yearMonths.push(getPreviousYearMonth(yearMonths[i]))
    }
    return yearMonths
}

export function getPreviousYearMonth(current) {
    if(current % 100 === 1) {
        return current - 100 + 11
    }
    return current - 1
}

export function getCurrentYearMonth() {
    const date = new Date()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return Number(year + month)
}

export function getNextYearMonth(current) {
    if(current % 100 === 12) {
        return current + 100 - 11
    }
    return current + 1
}
