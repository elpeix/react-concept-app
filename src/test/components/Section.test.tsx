import { render, screen } from "@testing-library/react"
import Section from "../../components/Section";

test("renders Section basic", () => {
    const children = "any value"
	render(
        <Section>
            <div>{children}</div>
        </Section>
    )
	const element = screen.getByText(children)
	expect(element).toBeInTheDocument()
});
