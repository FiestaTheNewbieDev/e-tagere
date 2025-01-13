import { Button } from '@components/Button';
import LibraryActions from '@store/library/actions';
import { Folder, Plus } from 'lucide-react';
import './style.scss';

export default function Navbar() {
	const handleAddBooks = async () =>
		await window.electronAPI.dialog
			.importBooks()
			.then(() => LibraryActions.fetchLibrary());

	const handleAddFolder = async () =>
		await window.electronAPI.dialog
			.importFolder()
			.then(() => LibraryActions.fetchLibrary());

	return (
		<nav className="navbar">
			<Button onClick={handleAddBooks} variant="primary">
				<Plus />
				<span>Add books</span>
			</Button>
			<Button onClick={handleAddFolder} variant="primary">
				<Folder />
				<span>Add folder</span>
			</Button>
		</nav>
	);
}
