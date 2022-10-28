import { render, screen } from "@testing-library/react"
import Refresh from "../../components/Refresh"

test("renders Refresh", () => {
    const title = "Refresh"
	render(
        <Refresh title={title} onClick={() => ""} />
    )
	const element = screen.getByTitle(title)
	expect(element).toBeInTheDocument()
});
