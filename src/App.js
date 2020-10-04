import React, {useState, useEffect} from 'react'
import FilterEntries from "./FilterEntries.js"
import NavBar from "./components/navbar/NavBar.js"
import Overview from "./components/overview/Overview.js"
import Management from "./components/management/Management.js"
import Display from "./components/display/Display.js"
import { CSSTransition } from "react-transition-group"
import firebase from "./firebase"

const initDefault = new Map()
initDefault.set("Overview", true)
initDefault.set("Search", false)

function App() {
    const [entries, setEntries] = useState([])
    const [displayState, setDisplayState] = useState(initDefault)

    const [filters, setFilters] = useState({
      date: 0,
      type: 0 })
    const [sortBy, setSortBy] = useState({ 
      column: "date", 
      order: "desc" })


    useEffect(() => {
      firebase.firestore().collection("entries")
        .orderBy(sortBy.column, sortBy.order)
            .onSnapshot(snapshot => {
                const sortedEntries = snapshot.docs.map(entry => {
                    return {
                        id: entry.id,
                        ...entry.data()
                    }
                })
                setEntries(FilterEntries(sortedEntries, filters))
            })
    }, [filters, sortBy])

    function setFilterDate(value) {
      const tmp = {...filters}
      tmp.date = value
      setFilters(tmp)
    }

    function setFilterType(value) {
      const tmp = {...filters}
      tmp.type = value
      setFilters(tmp)
    }

    function setDisplay(value) {
      const tmp = new Map()
      for (let key of displayState.keys()) {
        tmp.set(key, false)
      }
      tmp.set(value, true)
      setDisplayState(tmp)
    }

    const DisplayOverview = <Overview 
      sortBy={sortBy} 
      handleSortBy={setSortBy}
      filters={filters}
      handleFilterDate={setFilterDate}
      handleFilterType={setFilterType}
      entries={entries}
    /> 

    return (
      <div className="app">
        
        <NavBar 
          displayState={displayState} 
          handleDisplay={setDisplay}
        />

        <CSSTransition 
          in={displayState.get("Overview")} 
          timeout={500} 
          classNames="slide"
          appear={true}
          unmountOnExit={true}
        >{DisplayOverview}
        </CSSTransition>

        <CSSTransition 
          in={displayState.get("Search")} 
          timeout={500} 
          classNames="slide"
          unmountOnExit={true}
        ><Management />
        </CSSTransition>

        <Display filter={filters.type} entries={entries}/>

      </div>
    );
  }

  export default App;