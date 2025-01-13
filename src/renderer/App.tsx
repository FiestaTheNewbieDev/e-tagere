import DefaultLayout from '@components/layouts/DefaultLayout';
import StoreProvider from '@renderer/components/StoreProvider';
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
								<Library />
							</DefaultLayout>
						}
					/>
					<Route
						path="/last-reads"
						element={
							<DefaultLayout>
								<Library />
							</DefaultLayout>
						}
					/>
					<Route
						path="/favorites"
						element={
							<DefaultLayout>
								<Library />
							</DefaultLayout>
						}
					/>
					<Route path="/reader" element={<Reader />} />
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
