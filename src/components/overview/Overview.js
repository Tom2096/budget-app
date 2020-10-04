import React from "react"
import OverviewHeader from './OverviewHeader.js'
import OverviewBody from "./OverviewBody.js"

function Overview(props) {

    return (
        <div className="overview">
            <OverviewHeader 
                sortBy={props.sortBy}
                handleSortBy={props.handleSortBy}
                filters={props.filters} 
                handleFilterDate={props.handleFilterDate}
                handleFilterType={props.handleFilterType} 
            />  
            <OverviewBody entries={props.entries}/>
        </div>
    )
}

export default Overview