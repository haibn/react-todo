import { useRef, useEffect } from "react";
import styles from "./InputWithLabel.module.css"
import PropTypes from "prop-types";

function InputWithLabel({todoTitle, handleTitleChange, children}) {
    
    const inputRef = useRef();
    useEffect(() => inputRef.current.focus());

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} ref={inputRef} className={styles.inputBar}></input>
        </>
    )
}

InputWithLabel.propTypes = {
    todoTitle : PropTypes.string.isRequired,
    handleTitleChange : PropTypes.func,
    children : PropTypes.node.isRequired
}

export default InputWithLabel