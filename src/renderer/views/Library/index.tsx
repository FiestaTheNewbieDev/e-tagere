import './style.scss';

interface IProps {
	label: 'ALL' | 'LAST_READS' | 'FAVORITES';
}

export default function Library({ label }: IProps) {
	return <main className="library"></main>;
}
