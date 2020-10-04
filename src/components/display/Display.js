import React, { useState, useEffect } from "react"
import Legend from "./Legend.js"
import { Doughnut } from "react-chartjs-2"

const iColors = [
    null,
    "#00eb00",
    "#00d100",
    "#00b800",
    "#009e00",
    "#008500"
]

const eColors = [
    null,
    "#fa0000",
    "#e00000",
    "#c70000",
    "#ad0000",
    "#940000"
]

var resizeTimer

function Display(props) {

    const [currentHeight, setHeight] = useState(0)

    const Income = new Map()
    const Expenditure = new Map()
    
    window.onresize = function() {
        resizeTimer = setInterval(getHeight, 10)
    }

    function getHeight() {
        const ele = document.querySelector(".chartjs-render-monitor")
        const height = ele ? ele.style.height : null
        setHeight(height)
    }
    
    useEffect(() => {
        getHeight()
    }, [])

    for (let months of props.entries.values()) {
        for (let entries of months.values()) {
            entries.forEach(entry => {
                const pointer = ((entry.amount > 0) ? Income : Expenditure)
                const tmp = (pointer.has(entry.action) ? pointer.get(entry.action) : 0)
                pointer.set(entry.action, (tmp + Math.abs(entry.amount)))
            });     
        }
    }

    var labels = []
    var data = []
    var colors = []
    var total = 0
    var text = ""

    if (!props.filter) {
        labels = ["Income", "Expenditure"]
        data = [0, 0]
        for (let amount of Income.values()) {
            data[0] += amount
            total += amount
        }
        for (let amount of Expenditure.values()) {
            data[1] += amount
            total -= amount
        }
        colors = ["#00eb00", "#f50000"]
    }

    else {
        const pointer = ((props.filter > 0) ? Income : Expenditure)
        const colorData = ((props.filter > 0) ? iColors : eColors)
        var sortedMap = new Map([...pointer.entries()].sort((a, b) => b[1] - a[1])) 
        var others = 0

        for (let [label, amount] of sortedMap) {
            total += amount
            if (labels.length < 5) {
                labels.push(label)
                data.push(amount)
                colors.push(colorData[labels.length])
                continue
            }
            others += amount
        }

        if (others) {
            labels.push("Others")
            data.push(others)
            colors.push("grey")
        }
    }

    if (props.filter) {
        text = (props.filter > 0) ? "Income" : "Expenditure"
    }
    else {
        text = "Balance"
    }

    const showChart = <>
        <Doughnut 
            className="my-chart"
            data={{
                labels: labels,
                datasets: [{
                    label: "Amount",
                    data: data,
                    backgroundColor: colors
                }]
            }}
            options={{
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            }}
        />
        <div 
            className="container-text"
            style={{height: currentHeight}}
        >
            <p className="text-middle">
                {total < 0 ? "-" : ""}
                {" $" + Math.abs(Math.round(total * 100) / 100).toFixed(2)}
            </p>
            <p className="text-middle" style={{fontSize: "1.4rem"}}>{text}</p>
        </div>
        <Legend 
            labels={labels}
            data={data}
            colors={colors}
            total={total}
            top={currentHeight}
        />
    </>
    
    const placeholder = <p className="display-placeholder">
        No data to show here ... 
    </p>

    return (
        <div className="display">
            {labels.length ? showChart : placeholder}
        </div>
    )
}

export default Display