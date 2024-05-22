import { useEffect, useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import QuestionCell from "./QuestionCell";
import axios from "axios";
import "../app.css";

const MAX_CELL_VALUE = 1000000;

export interface Cell {
    id: number;
    question: string;
    type: string;
    options: string[];
    date: string;
    deleted: boolean;
    value?: any;
}

interface UserProp {
    name : string;
}

const EQ = ({ name } : UserProp) => {
    const [cells, setCells] = useState<Cell[]>([]);
    const nv = useNavigate();

    const navigateTo = () => {
        let path = "./LD";
        nv(path);
    }

    const createCell = () => {
        var date = new Date();
        var rnd = parseInt((Math.random() * MAX_CELL_VALUE).toPrecision(16));
        setCells([
            ...cells,
            {
                id: rnd,
                question: "What questions will you be asking?",
                type: "Number",
                options: [],
                date: "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                deleted: false,
            },
        ]);
    };

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios.post("http://localhost:2424/swapNotDeleted")
        var query = "http://localhost:2424/saveEditQuestion?data=" + JSON.stringify(cells);
        axios.post(query)

        navigateTo();
    };

    useEffect(() => {
        axios.get<Cell[]>("http://localhost:2424/api/questions")
            .then((res) => {
                setCells(res.data);
            })
            
    }, [])

    return (
        <div className="container">
            <div
                style={{
                    marginBlock: "15px",
                    paddingInline: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h2 style={{ marginInline: "10px" }}>{name}'s Questions:</h2>
                <a onClick={createCell}>
                    <PlusCircle className="bi bi-plus-circle" size={25} />
                </a>
            </div>

            <form onSubmit={save}>
                {cells.map((obj) => (!obj.deleted ?
                    <QuestionCell key={obj.id} cell={obj} cells={cells} setCells={setCells} /> : null
                ))}
                <button type="submit" className="saveBtn">
                    Save!
                </button>
            </form>
        </div>
    );
};

export default EQ;