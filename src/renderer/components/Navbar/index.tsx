import { Button } from '@components/Button';
import { Folder, Plus } from 'lucide-react';
import './style.scss';

export default function Navbar() {
	async function handleAddBooks() {
		const files: string[] = await window.electronAPI.dialog
			.importBooks()
			.catch(() => []);
		console.log(files);
	}

	async function handleAddFolder() {
		const folder: string | null = await window.electronAPI.dialog
			.importFolder()
			.catch(() => null);
		console.log(folder);
	}

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
