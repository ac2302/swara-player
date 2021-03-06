import { setupIonicReact } from "@ionic/react";

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
import { PlayerPlay, Music, Settings, DeviceFloppy } from "tabler-icons-react";

import ComposeTab from "./pages/ComposeTab";
import PlayTab from "./pages/PlayTab";
import TabContainer from "./components/TabContainer";
import SettingsTab from "./pages/SettingsTab";
import SaveTab from "./pages/SaveTab";

setupIonicReact();

const App = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [appSettings, setAppSettings] = useState({
		notations: "hindi",
	});

	const [swarInputTextbox, setSwarInputTextbox] = useState(false);

	const [bpm, setBpm] = useState(120);
	const [scale, setScale] = useState("E4");
	const [notes, setNotes] = useState([]);

	const [attack, setAttack] = useState(0.2);
	const [attackCurve, setAttackCurve] = useState("exponential");
	const [decay, setDecay] = useState(0.1);
	const [decayCurve, setDecayCurve] = useState("exponential");
	const [sustain, setSustain] = useState(1);
	const [release, setRelease] = useState(0.2);
	const [releaseCurve, setReleaseCurve] = useState("exponential");

	return (
		<MantineProvider
			theme={{ colorScheme: "dark" }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Tabs active={activeTab} onTabChange={setActiveTab}>
				<Tabs.Tab icon={<PlayerPlay size={20} />}>
					<TabContainer>
						<PlayTab
							appSettings={appSettings}
							bpm={bpm}
							scale={scale}
							notes={notes}
							attack={attack}
							attackCurve={attackCurve}
							decay={decay}
							decayCurve={decayCurve}
							sustain={sustain}
							release={release}
							releaseCurve={releaseCurve}
						/>
					</TabContainer>
				</Tabs.Tab>
				<Tabs.Tab icon={<Music size={20} />}>
					<TabContainer>
						<ComposeTab
							appSettings={appSettings}
							swarInputTextbox={swarInputTextbox}
							setSwarInputTextbox={setSwarInputTextbox}
							bpm={bpm}
							setBpm={setBpm}
							scale={scale}
							setScale={setScale}
							notes={notes}
							setNotes={setNotes}
							attack={attack}
							setAttack={setAttack}
							attackCurve={attackCurve}
							setAttackCurve={setAttackCurve}
							decay={decay}
							setDecay={setDecay}
							decayCurve={decayCurve}
							setDecayCurve={setDecayCurve}
							sustain={sustain}
							setSustain={setSustain}
							release={release}
							setRelease={setRelease}
							releaseCurve={releaseCurve}
							setReleaseCurve={setReleaseCurve}
						/>
					</TabContainer>
				</Tabs.Tab>
				<Tabs.Tab icon={<DeviceFloppy size={20} />}>
					<TabContainer>
						<SaveTab
							appSettings={appSettings}
							setAppSettings={setAppSettings}
						/>
					</TabContainer>
				</Tabs.Tab>
				<Tabs.Tab icon={<Settings size={20} />}>
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
