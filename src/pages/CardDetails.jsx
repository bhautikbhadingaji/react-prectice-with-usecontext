import { useParams } from "react-router-dom"

export const CardDetails = () => {
    const {id} = useParams()
    return <h1>Card Details {id}</h1>
}