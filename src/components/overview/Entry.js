import React from "react"

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
]

function Entry(props) {
    const date = new Date(props.bundle.date.seconds*1000)

    return (
        <div className="entry">
            <div className="box action">
                <p>{props.bundle.action}</p>
            </div>
            <div className="box amount">
                <p>
                    {(props.bundle.amount > 0) ? "" : "-"} 
                    {" $" + Math.abs(Math.round(props.bundle.amount * 100) / 100).toFixed(2)}
                </p>
            </div>
            <div className="box date">
                <p>{months[date.getMonth()] + ", " + date.getDate()}</p>
            </div>
        </div>    
    )
}

export default Entry