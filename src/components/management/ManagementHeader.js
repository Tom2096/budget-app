import React, {useState} from "react"
import {Modal} from "semantic-ui-react"
import DatePicker from "react-datepicker"
import { useAlert } from "react-alert";
import firebase from "../../firebase"

const ModalButton = (
    <button className="add-new-button">
        {"New "}
        <i className="plus square outline icon"></i>
    </button>
)

function ManagementHeader(props) {

    const [isOpen, setIsOpen] = useState(false)
    const [action, setAction] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState(new Date())
    const [isAlerted, setIsAlerted] = useState(false)

    const alert = useAlert()

    function handleSubmit() {
        if((!action) || (!amount)) {
            setIsAlerted(true)
            return alert.error("Invalid Inputs")
        }

        firebase.firestore().collection("entries").add({
            action: action,
            amount: parseFloat(amount),
            date: date,
        })
        .then(() => {
            setAction("")
            setAmount("")
        })
        alert.success("Item Added")
        setIsAlerted(false)
    }

    return (
        <div className="management-header">
            <div className="search-bar">
                <i className="search icon"></i>
                <input
                    className={"search-input" + (props.input ? " selected" : "")} 
                    type="text"
                    value={props.input}
                    onChange={event => props.handleChange(event.target.value)}
                />
                <label className="search-label">Search...</label>
            </div>
            <div className="add-new">
                <Modal
                    open={isOpen}
                    closeIcon
                    size="small"
                    onClose={() => setIsOpen(false)}
                    onOpen={() => setIsOpen(true)}
                    trigger={ModalButton}
                >
                    <Modal.Header>
                        Add A New Item
                    </Modal.Header>

                    <Modal.Content>
                        <div className="inputs">
                            <i className={"edit outline icon" + 
                                ((isAlerted && !action) ? " alerted" : "")} 
                            />
                            <input
                                className="input action"
                                type="text"
                                placeholder="Label"
                                value={action}
                                onChange={event => {
                                    setAction(event.target.value)
                                    setIsAlerted(false)
                                }}
                            />
                            <input 
                                className="input amount"
                                type="text"
                                placeholder="0.00"
                                value={amount}
                                onChange={event => {
                                    const value = event.target.value
                                    if ((!value==="-") && isNaN(value)) {
                                        return
                                    }
                                    setAmount(event.target.value)
                                    setIsAlerted(false)
                                }}
                            />
                            <i className={"dollar sign icon" +
                                ((isAlerted && !amount) ? " alerted" : "")}
                            />
                        </div>
                        <div className="input-date">
                            <i className="calendar alternate outline icon" />
                            <DatePicker 
                                selected={date} 
                                onChange={selectedDate => setDate(selectedDate)}
                            />
                        </div>
                    </Modal.Content>
                
                    <Modal.Actions>
                        <button 
                            className="positive ui button"
                            onClick={() => handleSubmit()}
                        >Add Item</button>
                    </Modal.Actions>

                </Modal>
            </div>
        </div>
    )
}

export default ManagementHeader