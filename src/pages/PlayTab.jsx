import * as Tone from "tone";
import { Button } from "@mantine/core";

const westernNotes = [
	"C1",
	"C#1",
	"D1",
	"D#1",
	"E1",
	"F1",
	"F#1",
	"G1",
	"G#1",
	"A1",
	"A#1",
	"B1",
	"C2",
	"C#2",
	"D2",
	"D#2",
	"E2",
	"F2",
	"F#2",
	"G2",
	"G#2",
	"A2",
	"A#2",
	"B2",
	"C3",
	"C#3",
	"D3",
	"D#3",
	"E3",
	"F3",
	"F#3",
	"G3",
	"G#3",
	"A3",
	"A#3",
	"B3",
	"C4",
	"C#4",
	"D4",
	"D#4",
	"E4",
	"F4",
	"F#4",
	"G4",
	"G#4",
	"A4",
	"A#4",
	"B4",
	"C5",
	"C#5",
	"D5",
	"D#5",
	"E5",
	"F5",
	"F#5",
	"G5",
	"G#5",
	"A5",
	"A#5",
	"B5",
	"C6",
	"C#6",
	"D6",
	"D#6",
	"E6",
	"F6",
	"F#6",
	"G6",
	"G#6",
	"A6",
	"A#6",
	"B6",
	"C7",
	"C#7",
	"D7",
	"D#7",
	"E7",
	"F7",
	"F#7",
	"G7",
	"G#7",
	"A7",
	"A#7",
	"B7",
	"C8",
	"C#8",
	"D8",
	"D#8",
	"E8",
	"F8",
	"F#8",
	"G8",
	"G#8",
	"A8",
	"A#8",
	"B8",
];

const offset = {
	sl: -12,
	Rl: -11,
	rl: -10,
	Gl: -9,
	gl: -8,
	ml: -7,
	Ml: -6,
	pl: -5,
	Dl: -4,
	dl: -3,
	Nl: -2,
	nl: -1,
	s: 0,
	R: 1,
	r: 2,
	G: 3,
	g: 4,
	m: 5,
	M: 6,
	p: 7,
	D: 8,
	d: 9,
	N: 10,
	n: 11,
	su: 12,
	Ru: 13,
	ru: 14,
	Gu: 15,
	gu: 16,
	mu: 17,
	Mu: 18,
	pu: 19,
	Du: 20,
	du: 21,
	Nu: 22,
	nu: 23,
};

function PlayTab({
	appSettings,
	bpm,
	scale,
	notes,
	attack,
	attackCurve,
	decay,
	decayCurve,
	sustain,
	release,
	releaseCurve,
}) {
	return (
		<>
			<Button
				onClick={() => {
					const saIndex = westernNotes.indexOf(scale);
					// westernNotes[saIndex + offset[note.value]]
					const schedule = [];
					const noteLength = 60 / bpm;
					let time = 0;
					notes.forEach((note) => {
						if (note.value != "-") {
							schedule.push({
								value: westernNotes[
									saIndex + offset[note.value]
								],
								start: time,
								duration: note.duration * noteLength,
							});
						}
						time += note.duration * noteLength;
					});

					console.log(schedule);
					console.log({
						envelope: {
							attack: attack * noteLength,
							attackCurve: attackCurve,
							decay: decay * noteLength,
							decayCurve: decayCurve,
							sustain: sustain,
							release: release * noteLength,
							releaseCurve: releaseCurve,
						},
					});

					const synth = new Tone.Synth({
						envelope: {
							attack: attack,
							attackCurve: attackCurve,
							decay: decay,
							decayCurve: decayCurve,
							sustain: sustain,
							release: release,
							releaseCurve: releaseCurve,
						},
					}).toDestination();
					const now = Tone.now();

					schedule.forEach((note) => {
						synth.triggerAttackRelease(
							note.value,
							note.duration,
							now + note.start
						);
					});
				}}
			>
				Play
			</Button>
		</>
	);
}

export default PlayTab;
