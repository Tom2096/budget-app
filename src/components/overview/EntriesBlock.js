import React from "react"
import Entry from "./Entry.js"

function EntriesBlock(props) {
    const displayEntries = props.entries.map(entry => {
        return (
          <Entry key={entry.id} bundle={entry} />
        )
    })

    return (
        <div className="entries-block">
            <div className="labels">
                <div className="box action">
                    <p>{props.blockName}</p>
                </div>
                <div className="box amount">
                    <p>Amount</p>
                </div>
                <div className="box date">
                    <p>Date</p>
                </div>
            </div>
            <hr />
            <div className="entries">
                {displayEntries}
            </div>
        </div>
    )
}

export default EntriesBlock


