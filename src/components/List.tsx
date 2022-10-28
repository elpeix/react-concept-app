import { FormEvent, useContext, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { LanguageContext } from "../hooks/useLanguage";
import { ListType as ListType } from "../models/models";
import Section, { SectionBody, SectionFooter, SectionHeader } from "./Section";

const List = ({
	data,
	onEdit,
}: {
	data: ListType;
	onEdit: (data: ListType) => void;
}) => {
	const { language } = useContext(LanguageContext);

	const [state, setState] = useState({
		edit: false,
		data: data,
	});

	const toggleEdit = () => {
		setState({
			edit: !state.edit,
			data: {
				id: state.data.id,
				name: state.data.name,
				description: state.data.description,
			},
		});
	};

	const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setState((prev) => ({
			...prev,
			data: { ...prev.data, [name]: value },
		}));
	};

	const save = (e: FormEvent) => {
		e.preventDefault();
		onEdit(state.data);
		setState({
			edit: false,
			data: { ...state.data },
		});
	};

	return (
		<>
			{!state.edit && (
				<Section simple>
                    <div className="icon-link float-end" onClick={toggleEdit} title={language.ln.edit}>
                        <Pencil size={20} />
                    </div>
					<span>{state.data.group?.name}</span>
					<h4>{state.data.name}</h4>
					<span>{state.data.description}</span>
				</Section>
			)}

			{state.edit && (
                
				<Section>
					<SectionHeader title={language.ln.edit} />
					<Form onSubmit={save}>
						<SectionBody breath>
							<Form.Group className="mb-3" controlId="firstName">
								<Form.Label>{language.ln.name}</Form.Label>
								<Form.Control
									type="text"
									placeholder={language.ln.list_name}
									name="name"
									value={state.data.name}
									onChange={handleChange}
									autoFocus
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="lastName">
								<Form.Label>{language.ln.description}</Form.Label>
								<Form.Control
									as="textarea"
									placeholder=""
									name={language.ln.description}
									value={state.data.description}
									style={{ height: "100px" }}
									onChange={handleChange}
								/>
							</Form.Group>
						</SectionBody>
                        <SectionFooter>
                            <Stack direction="horizontal" gap={3}>
                                <Button variant="primary" type="submit">{language.ln.save}</Button>
                                <Button variant="secondary" type="reset" onClick={toggleEdit}>{language.ln.cancel}</Button>
                            </Stack>
                        </SectionFooter>
					</Form>
				</Section>
			) // sc - create component
            }
		</>
	);
};

export default List;
