import React from "react"
import Result from "./Result.js"
import SimpleBarReact from "simplebar-react"

const ResultsPlaceholder = (
    <div className="results-placeholder">
        Your search came up empty ... 
    </div>
)

function ManagementBody(props) {

    const DisplayResults = props.results.map(result => <Result 
        bundle={result} 
        key={result.id}
    />)

    return (
        <div className="management-body">
            <SimpleBarReact style={{ maxHeight: "75vh", maxWidth: "100%" }}>
                <div className="results">
                    {props.results.length ? DisplayResults : ResultsPlaceholder}
                </div>
            </SimpleBarReact>
        </div>
    )
}

export default ManagementBody