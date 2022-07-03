import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useEffect, useState } from "react";
import { MantineProvider, Tabs } from "@mantine/core";
import { PlayerPlay, Music, Settings } from "tabler-icons-react";

import ComposeTab from "./pages/ComposeTab";
import PlayTab from "./pages/PlayTab";
import TabContainer from "./components/TabContainer";
import SettingsTab from "./pages/SettingsTab";

setupIonicReact();

const App = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [appSettings, setAppSettings] = useState({
		notations: "hindi",
	});

	return (
		<MantineProvider
			theme={{ colorScheme: "dark" }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Tabs active={activeTab} onTabChange={setActiveTab}>
				<Tabs.Tab label="Play" icon={<PlayerPlay size={17} />}>
					<TabContainer>
						<PlayTab />
					</TabContainer>
				</Tabs.Tab>
				<Tabs.Tab label="Compose" icon={<Music size={17} />}>
					<TabContainer>
						<ComposeTab />
					</TabContainer>
				</Tabs.Tab>
				<Tabs.Tab label="Settings" icon={<Settings size={17} />}>
					<TabContainer>
						<SettingsTab
							appSettings={appSettings}
							setAppSettings={setAppSettings}
						/>
					</TabContainer>
				</Tabs.Tab>
			</Tabs>
		</MantineProvider>
	);
};

export default App;
