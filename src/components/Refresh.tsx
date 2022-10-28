import { FormEvent } from "react"
import { ArrowClockwise } from "react-bootstrap-icons"

interface RefreshType {
    title?: string,
    onClick: (e: FormEvent) => void
}

const Refresh = ({title, onClick}: RefreshType) => {

    return (
        <div className="icon-link float-end" onClick={onClick} title={title}>
            <ArrowClockwise size={28} />
        </div>
    )
}

export default Refresh