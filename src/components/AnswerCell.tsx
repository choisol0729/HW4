import "../app.css"
import AnswerType from "./AnswerType"
import { Cell } from "./EQ"

/* 
An interface to pass the data from the parents component.
*/
interface CellProps {
    cell: Cell;
    setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
}

/* 
Simply, modulize the cell as if I did in EQ component and QuestionCell component.
*/
const AnswerCell = ({cell, setCells}: CellProps) => {
  return (
    <div className='cell'>
        <div style={{marginBottom: "10px"}}>{cell.question}</div>
        <AnswerType key={cell.id} cell={cell} setCells={setCells}/>
    </div>
  )
}

export default AnswerCell