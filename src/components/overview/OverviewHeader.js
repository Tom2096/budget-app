import React from "react"
import {Dropdown} from "semantic-ui-react"

const filterDateOptions = [
    {
        key: "Past 7 Days",
        text: "Past 7 Days",
        value: 604800000
    },
    {
        key: "Past 30 Days",
        text: "Past 30 Days",
        value: 2592000000
    },
    {
        key: "All Time",
        text: "All Time",
        value: 0
    }
]

const sortOptions = [
    {
        key: "Oldest",
        text: "Oldest",
        value: {
            column: "date",
            order: "asc"
        }
    },
    {
        key: "Most Recent",
        text: "Most Recent",
        value: {
            column: "date",
            order: "desc"
        }
    }
]

const filterText = {
    "0": "All",
    "1": "Income",
    "-1": "Expenditure",
}

function OverviewHeader(props) {
    
    function setState(value) {
        return (value === props.filters.type ? " selected" : "")    
    }

    return (
        <div className="overview-header">
            <div className="header-dropdowns">
                <div className="filter">
                    <Dropdown 
                        inline
                        options={filterDateOptions}
                        value={props.filters.date}
                        onChange={(event, data) => props.handleFilterDate(data.value)}
                    />
                </div>
                <div className="sort">
                    <Dropdown 
                        inline
                        options={sortOptions}
                        value={props.sortBy}
                        onChange={(event, data) => props.handleSortBy(data.value)}
                    />
            </div>
                <p className="filter-text">
                    <i className="sitemap icon"></i>
                    {" "}Showing{" "}
                    {filterText[props.filters.type]}
                </p>
            </div>

            <div className="header-tabs">
                <button 
                    className={"tab all" + setState(0)}
                    onClick={() => props.handleFilterType(0)}
                ><i className="dollar sign icon"></i></button>
                <button 
                    className={"tab income" + setState(1)}
                    onClick={() => props.handleFilterType(1)}    
                ><i className="money bill alternate outline icon"></i></button>
                <button 
                    className={"tab expenditure" + setState(-1)}
                    onClick={() => props.handleFilterType(-1)}
                ><i className="credit card outline icon"></i></button>
            </div>
        </div>
    )
}

export default OverviewHeader