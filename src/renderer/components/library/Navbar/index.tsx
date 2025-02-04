import { Button } from '@components/Button';
import { useLibraryCtx } from '@contexts/LibraryContext';
import LibraryActions from '@store/library/actions';
// import { useLayout } from '@contexts/LayoutContext';
import { Plus } from 'lucide-react';
import './style.scss';

export default function Navbar() {
	const { tab } = useLibraryCtx();
	// const layout = useLayout();

	const handleAddBooks = () => LibraryActions.addBooks(tab!);
	// const handleAddFolder = async () =>
	// 	await window.electronAPI.dialog.importFolder();

	return (
		<nav className="navbar">
			<div className="left">
				<Button onClick={handleAddBooks} variant="primary">
					<Plus />
					<span>Add books</span>
				</Button>
				{/* <Button onClick={handleAddFolder} variant="primary">
					<Folder />
					<span>Add folder</span>
				</Button> */}
			</div>
			<div className="right">
				{/* <Button variant="secondary-outline">
					<Filter />
				</Button>
				<div className="display-modes">
					<Button
						variant={
							layout.library.display === 'grid'
								? 'primary'
								: 'secondary-outline'
						}
						onClick={() => layout.library.setDisplay('grid')}
					>
						<Grid2X2 />
					</Button>
					<Button
						variant={
							layout.library.display === 'list'
								? 'primary'
								: 'secondary-outline'
						}
						onClick={() => layout.library.setDisplay('list')}
					>
						<List />
					</Button>
				</div> */}
			</div>
		</nav>
	);
}
