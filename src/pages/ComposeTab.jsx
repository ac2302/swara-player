import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {
	Container,
	InputWrapper,
	NumberInput,
	ScrollArea,
	Space,
	Title,
	Button,
	Select,
	Modal,
	ActionIcon,
	Center,
	SegmentedControl,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Edit, Plus, Trash, Clock } from "tabler-icons-react";
import "./ComposeTab.css";

const swaras = [
	"-",
	"sl",
	"Rl",
	"rl",
	"Gl",
	"gl",
	"ml",
	"Ml",
	"pl",
	"Dl",
	"dl",
	"Nl",
	"nl",
	"s",
	"R",
	"r",
	"G",
	"g",
	"m",
	"M",
	"p",
	"D",
	"d",
	"N",
	"n",
	"su",
	"Ru",
	"ru",
	"Gu",
	"gu",
	"mu",
	"Mu",
	"pu",
	"Du",
	"du",
	"Nu",
	"nu",
];

const scales = [
	"C4",
	"C#4",
	"D4",
	"D#4",
	"E4",
	"F4",
	"F#4",
	"G4",
	"G#4",
	"A5",
	"A#5",
	"B5",
	"C5",
	"C#5",
	"D5",
	"D#5",
	"E5",
	"F5",
	"F#5",
];

const ComposeTab = ({
	appSettings,
	bpm,
	setBpm,
	scale,
	setScale,
	notes,
	setNotes,
}) => {
	useEffect(() => {
		console.log(notes);
	}, [bpm, scale, notes]);

	return (
		<>
			<InputWrapper id="bpm-input" label="BPM" size="md">
				<NumberInput id="bpm-input" value={bpm} onChange={setBpm} />
			</InputWrapper>
			<Space h="sm" />
			<InputWrapper id="scale-input" label="Scale" size="md">
				<ScrollArea
					offsetScrollbars
					scrollbarSize={4}
					style={{ width: "calc(100vw - 35px)" }}
				>
					<SegmentedControl
						id="scale-input"
						value={scale}
						onChange={setScale}
						data={scales.map((scale) => ({
							label: scale,
							value: scale,
						}))}
					/>
				</ScrollArea>
			</InputWrapper>

			<Space h="md" />

			<Title order={3}>Notes</Title>

			<Space h="sm" />

			<div className="notes-container"></div>
			{notes.map((note, i) => (
				<Note
					value={note.value}
					duration={note.duration}
					id={i}
					appSettings={appSettings}
					setNotes={setNotes}
					notes={notes}
					key={i}
				/>
			))}

			<Button
				fullWidth
				leftIcon={<Plus />}
				onClick={() => {
					setNotes((prevState) => [...prevState, {}]);
				}}
			>
				Add Note
			</Button>
		</>
	);
};

function Note({ value, duration, id, setNotes, notes, appSettings }) {
	const [opened, setOpened] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value ? value : "-");
	const [selectedDuration, setSelectedDuration] = useState(1);
	const [time, setTime] = useState(0);

	useEffect(() => {
		setNotes((prevState) =>
			prevState.map((note, i) => {
				if (i != id) return note;

				return { value: selectedValue, duration: selectedDuration };
			})
		);
	}, [selectedValue, selectedDuration]);

	useEffect(() => {
		let counter = 0;
		for (let i = 0; i < id; i++) counter += notes[i].duration;
		setTime(counter);
	}, [notes]);

	useEffect(() => {
		const styles = document.createElement("style");
		styles.innerHTML = `
			.mantine-Select-item {
				font-family: "ome_bhatkhande_${appSettings.notations}";
			}
			.mantine-Select-input {
				font-family: "ome_bhatkhande_${appSettings.notations}";
			}
		`;
		const stylesContainer = document.getElementById("style-container");
		stylesContainer.innerHTML = "";
		stylesContainer.appendChild(styles);
	}, []);

	return (
		<>
			<div id="style-container" />
			<div className="note-display">
				<Modal
					opened={opened}
					// centered
					onClose={() => {
						setOpened(false);
					}}
					title="Edit Note"
					overlayBlur={3}
				>
					<InputWrapper
						id={`swar-input-${id}`}
						label="Swara"
						size="md"
					>
						<Select
							id={`swar-input-${id}`}
							value={selectedValue}
							onChange={setSelectedValue}
							data={swaras}
							searchable
							size="md"
						/>
					</InputWrapper>
					<Space h="md" />
					<InputWrapper
						id={`duration-input-${id}`}
						label="Duration"
						size="md"
					>
						<NumberInput
							id={`duration-input-${id}`}
							value={selectedDuration}
							onChange={setSelectedDuration}
							min={0}
							precision={2}
							step={0.25}
							size="md"
						/>
					</InputWrapper>
				</Modal>
				<span className="note-info-container">
					<span className="time">{time} ]</span>
					<span className={`swara-${appSettings.notations} note`}>
						{value}
					</span>
					<span className="length">{duration}</span>
				</span>
				<span className="button-container">
					<Center>
						<ActionIcon
							color="red"
							variant="filled"
							onClick={() =>
								setNotes((prevState) =>
									prevState.filter((_, i) => i != id)
								)
							}
						>
							<Trash />
						</ActionIcon>
						<Button
							size="xs"
							rightIcon={
								<Edit
									size={17}
									onClick={() => {
										setOpened(true);
									}}
								/>
							}
						>
							Edit
						</Button>
					</Center>
				</span>
			</div>
			<Space h="sm" />
		</>
	);
}

export default ComposeTab;
