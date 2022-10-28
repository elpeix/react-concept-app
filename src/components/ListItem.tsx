import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

interface dataType {
	id: number;
	name: string;
	description?: string;
}

const ListItem = ({ data, link }: { data: dataType; link?: string }) => {
	const description = data.description || "";

	const content = (
		<>
			<div className="fw-bold">{data.name}</div>
			<small dangerouslySetInnerHTML={{ __html: description }}></small>
		</>
	);

	if (link) {
		return (
			<Link to={`${link}`} key={data.id} className="list-group-item list-group-item-action">
				{content}
			</Link>
		);
	} else {
		return (
			<ListGroupItem key={data.id}>
				{content}
			</ListGroupItem>
		);
	}
};

export default ListItem;
