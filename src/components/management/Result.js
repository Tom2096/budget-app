import React from "react"
import firebase from "../../firebase"

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

function Result(props) {

    const date = new Date(props.bundle.date.seconds*1000)

    function deleteEntry() {
        firebase.firestore().collection("entries").doc(props.bundle.id).delete()
    }

    return (
        <div className="result">
            <div className="container action">
                <p>{props.bundle.action}</p>
            </div> 
            <div className="container amount">
                <p>
                    {(props.bundle.amount > 0) ? "" : "-"} 
                    {" $" + Math.abs(Math.round(props.bundle.amount * 100) / 100).toFixed(2)}
                </p>
            </div> 
            <div className="container date">
                <p>{months[date.getMonth()] + ", " + date.getDate()}</p>
            </div>
            <div className="container delete">
                <button className="result-delete" onClick={deleteEntry}>
                    <i className="trash alternate outline icon"></i>
                </button>
            </div>
            
        </div>
    )
}

export default Result