import { useDispatch } from "react-redux"
import { FillFlagI, FillFlagO } from "../redux/action/flagAction"

export const ChooseTypeService=()=>{
    let mydispach=useDispatch()
    const owner=()=>{
        mydispach(FillFlagO(true))
        mydispach(FillFlagI(false))


    }
    const invite=()=>{
        mydispach(FillFlagI(true))
        mydispach(FillFlagO(false))
        
    }
    return <div>
        <button onClick={()=>invite()}>כניסה כמוזמן</button>
        <br></br>
        <button onClick={()=>owner()}>כניסה כמזמין</button>
    </div>
}