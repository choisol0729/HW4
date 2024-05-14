import { Cell } from "./EQ"

/* 
Data interface to pass in data from the parent component. This would have different type of questions.
*/
interface DataProps {
    cell: Cell;
    setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
}

const AnswerType = ({cell, setCells}: DataProps) => {

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCells((prev) => prev.map((v) =>{
            if(v.id === cell.id){
                return {
                    ...v,
                    value: e.target.value
                }
            }
            return v;
        }));
    }

    /* 
    In this part, I was kind of proud to find multiple option ternaries because without the
    multiple option ternary, I would not be able to produce such HTML elements. Maybe there is 
    a way to produce such without using ternary, but I am still proud of myself for doing this. :)
    */
    return (
        <div>
            {cell.type === "Number" ? <input type="number" onChange={changeValue} required></input> :
            cell.type === "Boolean" ? 
            <div>
                <input name={"boolean" + cell.id} required value="true" type="radio" onChange={changeValue}/> True
                <input name={"boolean" + cell.id} required value="false" style={{marginLeft: "50px"}} type="radio" onChange={changeValue}/> False 
            </div> :
            cell.type === "Text" ? 
            <input type="text" onChange={changeValue} required></input> :
            <div>
                {cell.options.map((opt, idx) => (
                    <div key={`${cell.id}-${idx}`}><input name={"mc" + cell.id} required style={{marginRight: "5px"}} type="radio" value={opt} onChange={changeValue}/>{opt}</div>
                ))}
            </div>}
        </div>
    )
}

export default AnswerType