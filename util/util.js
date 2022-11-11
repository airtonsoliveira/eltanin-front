export function formatDateExtended(yearMonth) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const year = parseInt(yearMonth / 100)
    const monthNumber = yearMonth - 100 * year
    return monthNames[monthNumber - 1] + ' ' + year
}