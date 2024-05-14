import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import DataCell from "./DataCell";
import axios from "axios";
import "../app.css";

export interface Response {
    id: number;
    question: number;
    response: string;
    date: string;
}

const VD = () => {
    const [response, setResponse] = useState<Response[]>([]);
    const [date, setDate] = useState(new Date());
    var dateObj = new Date().getDate();

    /* 
    dateLeft and dateRight modifies the date that user wants the data to be stored in.
    I learned that new Date() can be instantiated with a parameter "date," which inherits
    the original date. After doing so, it made date modification much easier. Also, going
    past future does not make sense, so I have implemented blocker in dateRight (dateAdd).
    */
    const dateLeft = () => {
        var newDate = new Date(date);

        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const dateRight = () => {
        if (
            date.getDate() < dateObj ||
            date.getMonth() < new Date().getMonth() ||
            date.getFullYear() < new Date().getFullYear()
        ) {
            var newDate = new Date(date);

            newDate.setDate(date.getDate() + 1);
            setDate(newDate);
        } else console.log("Future time impossible");
    };
    
    useEffect(() => {
        axios.get<Response[]>("http://localhost:2424/api/responses")
            .then((res) => {
                setResponse(res.data);
            })
    }, [])

    return (
        <div className="container">
            <br />
            <h2
                className="date"
                style={{
                    marginBlock: "15px",
                    paddingInline: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <a onClick={dateLeft}>
                    <ArrowLeft size={25} />
                </a>
                <p id="datetime">
                    {date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()}
                </p>
                <a onClick={dateRight}>
                    <ArrowRight size={25} />
                </a>
            </h2>
            <div>
                {response.map((r) => (
                    (r.date.replace(/-0+/g, '-')) === (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
                ) ? <DataCell key={r.id} response={r} /> : null)}
            </div>

        </div>
    )
}

export default VD