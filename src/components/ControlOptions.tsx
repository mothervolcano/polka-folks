import { SegmentedControl, Text } from "@mantine/core";
import { useState } from "react";
import { OnValueChange, NumberFormatValues } from 'react-number-format';

const validateValue = (value: NumberFormatValues): boolean => {
	if (value.floatValue) {
		return true;
	} else {
		return false;
	}
}

const ControlOptions = (props: any) => {

	const {id, mode, param, onValueChange, color } = props;

	const [value, setValue] = useState(param.options[0].value);

	return (
		<>
			<SegmentedControl
				id={param.id}
				name={param.id}
				onChange={(value) => {
					onValueChange(value, id);
					setValue(value)
				}}
				data={param.options}
				value={value}
				size="xs"
				color={color}
			/>
		</>
	);
};

export default ControlOptions;

