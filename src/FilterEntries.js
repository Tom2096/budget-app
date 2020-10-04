function FilterEntries(entries, filters) {
    let groupedEntries = new Map()

    entries.forEach(entry => {
        const tmpDate = new Date(entry.date.seconds * 1000)

        if (filters.date && (new Date() - tmpDate) > filters.date) {
            return
        }

        if (filters.type) {
            if (filters.type > 0 && entry.amount < 0) {
                return
            }
            if (filters.type < 0 && entry.amount > 0) {
                return
            }
        }

        const year = tmpDate.getFullYear()
        const month = tmpDate.getMonth()

        if (!groupedEntries.has(year)) {
            groupedEntries.set(year, new Map())
        }

        if (!groupedEntries.get(year).has(month)) {
            groupedEntries.get(year).set(month, [])
        }

        const tmpData = groupedEntries.get(year).get(month)
        tmpData.push(entry) 
        groupedEntries.get(year).set(month, tmpData)
    })

    return groupedEntries;
}

export default FilterEntries