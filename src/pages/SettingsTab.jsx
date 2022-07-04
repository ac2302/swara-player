import { InputWrapper, Select, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

const notationsList = ["hindi", "english", "punjabi", "swarlipi"];

function SettingsTab({ appSettings, setAppSettings }) {
	const [notations, setNotations] = useState(appSettings.notations);
	

	useEffect(() => {
		setAppSettings({ notations });
	}, [notations]);

	return (
		<div>
			<InputWrapper
				id="notations-input"
				label="Notations"
				description="The notations that will be displayed while composing"
				size="md"
			>
				<Select
					id="notations-input"
					value={notations}
					onChange={setNotations}
					data={notationsList}
				/>
			</InputWrapper>
		</div>
	);
}

export default SettingsTab;
