import Reader from '@/app/Reader';
import Home from '@app/Home';
import Settings from '@app/Settings';
import DefaultLayout from '@components/layouts/DefaultLayout';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<DefaultLayout>
							<Home />
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
			</Routes>
		</Router>
	);
}
