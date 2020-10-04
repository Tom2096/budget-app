import React from "react"

function LegendItem(props) {

    return (
        <div className="legend-item">

            <div className="item label">
                <div 
                    className="label-color"
                    style={{
                        backgroundColor: props.color
                    }}
                />
                {props.label}
            </div>

            <div className="item amount">
                {" $" + Math.abs(Math.round(props.data * 100) / 100).toFixed(2)}
            </div>

            <div className="item percent">
                {Math.round(props.percent * 100) + "%"}
            </div>


            
            
            
            
        </div>
    )
}

function Legend(props) {

    const showLegends = []

    for (var i=0; i<props.labels.length; i++){
        showLegends.push(
        <LegendItem 
            key={props.labels[i]}
            label={props.labels[i]}
            data={props.data[i]}
            color={props.colors[i]}
            percent={props.data[i]/props.total}
        />
        )
    }

    return (
        <div className="my-legend"
            style={{
                paddingTop: props.top
            }}
        >
            {showLegends}
        </div>
    )
}

export default Legend