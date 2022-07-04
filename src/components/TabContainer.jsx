import React from "react";
import { Container, ScrollArea, Space } from "@mantine/core";

function TabContainer({ children }) {
	return (
		<Container>
			<ScrollArea
				style={{ height: "calc(100vh - 50px)" }}
				scrollbarSize={12}
			>
				{children}
				<Space h="md" />
			</ScrollArea>
		</Container>
	);
}

export default TabContainer;
