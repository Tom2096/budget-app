import React from "react"
import EntriesBlock from "./EntriesBlock.js"
import SimpleBarReact from "simplebar-react"

const monthsToStr = [
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
]

function OverviewBody(props) { 

    const DisplayBlocks = []
    const wrapper = <SimpleBarReact style={{ maxHeight: "70vh", maxWidth: "100%" }}>
        {DisplayBlocks}
    </SimpleBarReact>
    const placeholder = <p className="overview-placeholder">
        Nothing to show here ... 
    </p>

    for (let [year, months] of props.entries) {
        for (let [month, entries] of months) {
            DisplayBlocks.push(<EntriesBlock 
                key={month+"/"+year} 
                blockName={monthsToStr[month] + ", " + year} 
                entries={entries} 
            />)
        }
    }

    return (
        <div className="overview-body">
            {props.entries.size ? wrapper : placeholder}
        </div>
    )
}

export default OverviewBody


















