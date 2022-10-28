import { ListGroup, ListGroupItem, Placeholder } from "react-bootstrap";

const ListItemPlaceHolder = ({ smallLoad = false }: { smallLoad?: boolean }) => {
	const printItems = () => {
		const randValue = Math.floor(Math.random() * 3 + 1);
		const items = [];
		for (let i = 0; i < randValue; i++) {
			items.push(
				<ListGroupItem key={i}>
					<Placeholder as="div" animation="glow">
						<Placeholder xs={5} />
					</Placeholder>
					{!smallLoad && (
						<Placeholder as="small" animation="glow">
							<Placeholder xs={8} />
						</Placeholder>
					)}
				</ListGroupItem>
			);
		}
		return items;
	};

	return <ListGroup>{printItems()}</ListGroup>;
};

export default ListItemPlaceHolder;
