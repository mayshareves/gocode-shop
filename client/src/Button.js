import { useState } from "react"

function Button() {
    const [text, setText] = useState("hello");
    const [apeare, setAppeare] = useState(true);
    return (
        <div>
            {apeare && text}
            <button onClick={() => { setAppeare(!apeare)}}>click me</button>
        </div>
    )
}

export default Button;