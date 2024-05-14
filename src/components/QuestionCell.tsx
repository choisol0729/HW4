import { Trash3 } from "react-bootstrap-icons"
import { Cell } from "./EQ"
import MultipleQuestions from "./MultipleQuestions"
import "../app.css"

const MAX_CELL_VALUE = 1000000;

/* 
To pass the information from EQ component, I needed to create interface that has
multiple variables and one method. The method was to define remove method that
EQ has, and it did not need to be implemented within the questionCell component,
but I just wanted to make sure that many information can be passed through
parents component to child and vice versa.
*/
interface CellProps {
    cell: Cell,
    cells: Cell[],
    setCells: React.Dispatch<React.SetStateAction<Cell[]>>,
}

export const QuestionCell = ({cell, cells, setCells}: CellProps) => {

    const removeFn = () => {
        setCells((prev) => prev.map((v) => {
            if(v.id === cell.id){
                return {
                    ...v,
                    deleted: true
                }
            }
            return v;
        }))
    }

    const changeType = (e : React.ChangeEvent<HTMLSelectElement>) => {
        var newCells = cells;
        var targetIdx = -1;
        var originalID = -1;
        var originalType = "";

        for(let i = 0; i < newCells.length; i++){
            if(newCells[i].id === cell.id) {
                targetIdx = i;
                originalID = newCells[i].id;
                originalType = newCells[i].type;
                newCells[i] = {
                    ...newCells[i],
                    id : parseInt((Math.random() * MAX_CELL_VALUE).toPrecision(16)),
                    type : e.target.value,
                    options: e.target.value === "Multiple Choice" ? ["Ok day", "Bad day", "Great day"] : [],
                }
            }
        }

        setCells([...newCells, {
            ...newCells[targetIdx],
            id : originalID,
            type : originalType,
            options : [],
            deleted : true
        }])
    }

    const changeQuestion = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCells((prev) => prev.map((v) => {
            if(v.id === cell.id){
                return {
                    ...v,
                    question : e.target.value
                }
            }
            return v;
        }))

        // var newCells = cells;
        // var targetIdx = -1;
        // var originalID = -1; 
        // var originalQuestion = "";

        // for(let i = 0; i < newCells.length; i++){
        //     if(newCells[i].id === cell.id) {
        //         targetIdx = i;
        //         originalID = newCells[i].id;
        //         originalQuestion = newCells[i].question;
        //         newCells[i] = {
        //             ...newCells[i],
        //             id : parseInt((Math.random() * MAX_CELL_VALUE).toPrecision(16)),
        //             question : e.target.value
        //         }
        //     }
        // }

        // setCells([...newCells, {
        //     ...newCells[targetIdx],
        //     id: originalID,
        //     question: originalQuestion,
        //     deleted : true
        // }])
    }

    /* 
    Again, the organizing HTML part is easier compared to the logic part in EQ.
    However, it was intersting to know that ternary works in the HTML rendering part.
    Knowing that some ternary works in HTML elements, I could easily implement the
    reactive multiple questions representation inside the HTML rendering. 
    */
    return (
        <div className='cell'>
            <section>
                <input value={cell.question} onChange={changeQuestion} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
            </section>
            <section style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <select className="interactive" value={cell.type} onChange={changeType}>
                    <option value="Number">Number</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Text">Text</option>
                    <option value="Multiple Choice">Multiple Choice</option>
                </select>
                <a onClick={removeFn}><Trash3 size={25} /></a>
            </section>
            <section>
                {cell.type == "Multiple Choice" ? <MultipleQuestions key={cell.id} cell={cell} setCells={setCells}/> : null}
            </section>
        </div>
    )
}

export default QuestionCell