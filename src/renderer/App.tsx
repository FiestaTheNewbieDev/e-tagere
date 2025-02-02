import StoreProvider from '@renderer/components/StoreProvider';
import DefaultLayout from '@renderer/layouts/DefaultLayout';
import LibraryLayout from '@renderer/layouts/LibraryLayout';
import ReaderLayout from '@renderer/layouts/ReaderLayout';
import About from '@views/About';
import Library from '@views/Library';
import Reader from '@views/Reader';
import Settings from '@views/Settings';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<StoreProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<DefaultLayout>
								<LibraryLayout>
									<Library />
								</LibraryLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/last-reads"
						element={
							<DefaultLayout>
								<LibraryLayout>
									<Library tab="LAST_READS" />
								</LibraryLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/favorites"
						element={
							<DefaultLayout>
								<LibraryLayout>
									<Library tab="FAVORITES" />
								</LibraryLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/reader"
						element={
							<ReaderLayout>
								<Reader />
							</ReaderLayout>
						}
					/>
					<Route
						path="/settings"
						element={
							<DefaultLayout>
								<Settings />
							</DefaultLayout>
						}
					/>
					<Route
						path="/about"
						element={
							<DefaultLayout>
								<About />
							</DefaultLayout>
						}
					/>
				</Routes>
			</Router>
		</StoreProvider>
	);
}
