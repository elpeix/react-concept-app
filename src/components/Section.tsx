import ListItemPlaceHolder from "./ListItemPlaceHolder";
import Refresh from "./Refresh";
import styles from "./Section.module.scss";

interface PropsType {
	simple?: boolean,
	children?: JSX.Element | JSX.Element[];
}

interface PropsHeaderType extends PropsType {
	title?: string;
	refreshTitle?: string
	refreshAction?: () => void;
}
interface PropsBodyType extends PropsType {
	syncing?: boolean;
	error?: { message?: string };
	smallLoad?: boolean;
	className?: string;
	breath?: boolean;
}

const Section = ({ simple = false, children }: PropsType) => {
	const className = `${simple ? styles.simpleContent : styles.content}`
	return <section className={className}>{children}</section>;
};

const SectionHeader = ({ title, refreshTitle, refreshAction, children }: PropsHeaderType) => {
	return (
		<header>
			{refreshAction && <Refresh title={refreshTitle} onClick={() => refreshAction()} />}
			{title && <h5>{title}</h5>}
			{children && children}
		</header>
	);
};

const SectionBody = ({ syncing, error, smallLoad = false, breath = false, children }: PropsBodyType) => {
    const className = (
        `${styles.body} ${breath ? styles.breath : ""}`
    )
	return (
		<div className={className}>
			{syncing && <ListItemPlaceHolder smallLoad={smallLoad} />}
			{error && error.message && <div>{error.message}</div>}
			{children && children}
		</div>
	);
};

const SectionFooter = ({ children }: PropsType) => {
	return <footer>{children && children}</footer>;
};

export default Section;
export { SectionHeader, SectionBody, SectionFooter };
