export default function Message({ text, isCompleted }) {
    return (
        <div className="message-text" >
            {!isCompleted ? <div>{text}</div> : <div>&#127881;{text}&#127881;</div>}
        </div >

    )
}