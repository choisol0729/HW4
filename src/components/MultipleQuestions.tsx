import { Cell } from "./EQ"
import '../app.css'

interface CellProps {
    cell: Cell,
    setCells: React.Dispatch<React.SetStateAction<Cell[]>>,
}

/* 
No surprise, it is another interface to pass options data from the parents component.
*/

export const MultipleQuestions = ({cell, setCells} : CellProps) => {

    /* 
    In order to use onChange and use defaultValue of the input elements,
    I needed to make a handler that callbacks when onChange triggers. 
    */
    const handleChange = (idx: number, value: string) => {
        setCells((prev) => prev.map((v) => {
            if(v.id === cell.id){
                return {
                    ...v,
                    options: cell.options.map((option, i) => {
                        if(i === idx){
                            return value;
                        }
                        return option;
                    })
                }
            }
            return v
        }))
    }

    // No surprise, easily made HTML tag. 
    return (
        <ul >
            {
                [0, 1, 2].map((idx) =>
                    <div key={`${cell.id}-${idx}`}>
                        <input type='radio' className='interactive' disabled/>
                        <input type="text" className='bottomInput' onChange={(e) => handleChange(idx, e.target.value)} value={cell.options[idx]} required/>
                    </div>
                )
            }
        </ul>
    )
}

export default MultipleQuestions