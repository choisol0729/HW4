import { useEffect, useState } from "react";
import { Response } from "./VD"
import axios from "axios";
import "../app.css"

interface DataProps {
    response: Response;
}

const DataCell = ({response} : DataProps) => {
    const [question, setQuestion] = useState("");

    const getQuestion = (id : number) => {
        axios.get("http://localhost:2424/getQuestion?id=" + id)
            .then((res) => {
                setQuestion(res.data[0].text);
            })
    }

    useEffect(() => {
        getQuestion(response.question);
    }, [])

    return (
        <div className="cell">
            <div style={{fontWeight: "bold"}}>Question - {question}</div>
            <div>Answer: {response.response}</div>
        </div>
    )
}

export default DataCell