import React from "react"

function NavBar(props) {

    const imgSrc = "https://img2.pngio.com/money-cash-svg-png-icon-free-download-518831-onlinewebfontscom-cash-symbol-png-980_814.png"

    function setState(name) {
        return (props.displayState.get(name) ? " selected" : "")    
    }

    return (
        <div className="nav-bar">
            <div className="nav-logo">
                <img className="logo-img" src={imgSrc} alt="money" />
            </div>
            <div className="nav-buttons">
                <button 
                    className={"nav-button" + setState("Overview")}
                    onClick={() => props.handleDisplay("Overview")}
                >Overview</button>
                <button 
                    className={"nav-button" + setState("Search")}
                    onClick={() => props.handleDisplay("Search")}
                >Search</button>
            </div>
        </div>
    )
}

export default NavBar
