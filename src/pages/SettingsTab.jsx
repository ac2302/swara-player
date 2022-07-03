import { InputWrapper, Select, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

function SettingsTab({ appSettings, setAppSettings }) {
	const [notations, setNotations] = useState(appSettings.notations);

	useEffect(() => {
		setAppSettings({ notations });
	}, [notations]);

	return (
		<div>
			<InputWrapper
				id="input-demo"
				label="Notations"
				description="The notations that will be displayed while composing"
				size="md"
			>
				<Select
					value={notations}
					onChange={setNotations}
					data={["hindi", "english"]}
				/>
			</InputWrapper>
		</div>
	);
}

export default SettingsTab;
