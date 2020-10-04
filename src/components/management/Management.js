import React, {useEffect, useState} from "react"
import ManagementHeader from "./ManagementHeader.js"
import ManagementBody from "./ManagementBody.js"
import firebase from "../../firebase"

function Management() {

    const [input, setInput] = useState("")
    const [entriesData, setEntriesData] = useState([])
    const [results, setResult] = useState([])

    useEffect(() => {
        firebase.firestore().collection("entries")
            .orderBy("action", "desc")
                .onSnapshot(snapshot => {
                    const entries = snapshot.docs.map(entry => {
                        return {
                            id: entry.id,
                            ...entry.data()
                        }
                    })
                    setEntriesData(entries)
                    if (input) {
                        const regex = new RegExp('^'+input, 'i')
                        setResult(entries.filter(entry => regex.test(entry.action)))
                    }
                    else {
                        setResult(entries)
                    }
                })
    }, [input])

    return (
        <div className="management">
            <ManagementHeader entries={entriesData} input={input} handleChange={setInput} />
            <ManagementBody results={results}/>
        </div>

    )
}

export default Management