import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Cell } from "./EQ";
import AnswerCell from "./AnswerCell";
import axios from "axios";
import "../app.css";

/* 
As if I have done in EQ component, I have randomly set max cell value because
I thought nobody would like to create more than million questions, and this value
can be increased "if" someone tries to increase questions more than a million.
*/
const MAX_CELL_VALUE = 1000000;

/* 
restoreData method literally restores the initial data if there are some initial data
left behind. If there is no data to be retrieved, the method creates initial data
for the users. The initial data is following the content of assignment 2 rubric. 
The data is stored in sessionStorage because it is the data storage that keeps data
temporarily until the browser window is closed. However, for some reason, it did not
remove the data after the browser is closed. I am thinking that it is because we have
opened our own server with vite. Therefore, I have manually cleared the session storage
after closing the tab and refreshing the tab (beforeunload). 
*/

const LD = () => {
    const nv = useNavigate();
    var dateObj = new Date().getDate();

    const [date, setDate] = useState(new Date());
    const [cells, setCells] = useState<Cell[]>([]);

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

    const navigateTo = () => {
        let path = "../VD";
        nv(path);
    }

    /* 
    In this part, we might be adding some submit feature in future.
    */
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var responseData = cells.map((value) => {
            var rnd = parseInt((Math.random() * MAX_CELL_VALUE).toPrecision(16));
            return {
                id: rnd,
                question: value.id,
                response: value.value,
                date: "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            }
        })

        console.log("Response:", responseData);

        var query = "http://localhost:2424/saveLogData?data=" + JSON.stringify(responseData);
        axios.post(query);

        navigateTo();
    };

    /* 
    Because I have set the dependency array as an empty array, the useEffect is only
    called when the LD component is loaded for the first time. Whenever the LD component is
    loaded, we want to find data stored in sessionStorage and retrieve the data from it.
    I, then, create new cells array to set the data into the cell and render into HTML elements.
    */
    useEffect(() => {
        axios.get<Cell[]>("http://localhost:2424/api/questions")
            .then((res) => {
                setCells(res.data);
            })
    }, []);

    /* 
    Easily rendering everything as if I did in EQ component.
    The logic is mostly similar to that of EQ component.
    */
    return (
        <div className="container">
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
                    {date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()}{" "}
                </p>
                <a onClick={dateRight}>
                    <ArrowRight size={25} />
                </a>
            </h2>

            <form onSubmit={submit}>
                {cells.map((obj) => (
                    <AnswerCell key={obj.id} cell={obj} setCells={setCells} />
                ))}
                <button type="submit" className="saveBtn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LD;