import { Autocomplete, Slider, TextField, Typography } from '@mui/material'
import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import { modelOptions, tokensMarks } from '../utils/optionsAndMarks'
import { ChatContext } from './ChatProvider'

const ModelSettings = () => {
	const {
		temperatureValue,
		setTemperatureValue,
		maxTokensValue,
		setMaxTokensValue,
		modelValue,
		setModelValue,
	} = useContext(ChatContext)

	const [localTemperature, setLocalTemperature] = useState(temperatureValue)
	const [localMaxTokens, setLocalMaxTokens] = useState(maxTokensValue)

	const debouncedSetTemperature = useCallback(
		debounce(value => setTemperatureValue(value), 300),
		[setTemperatureValue]
	)

	const debouncedSetMaxTokens = useCallback(
		debounce(value => setMaxTokensValue(value), 300),
		[setMaxTokensValue]
	)

	useEffect(() => {
		setLocalTemperature(temperatureValue)
	}, [temperatureValue])

	useEffect(() => {
		setLocalMaxTokens(maxTokensValue)
	}, [maxTokensValue])

	const handleTemperatureChange = (_, value) => {
		setLocalTemperature(value)
		debouncedSetTemperature(value)
	}

	const handleMaxTokensChange = (_, value) => {
		setLocalMaxTokens(value)
		debouncedSetMaxTokens(value)
	}

	const handleModelChange = useCallback(
		(_, value) => {
			setModelValue(value)
		},
		[setModelValue]
	)

	return (
		<>
			<Typography sx={{ mt: 4 }}>Temperature: {localTemperature}</Typography>
			<Slider
				aria-label='Temperature'
				value={localTemperature}
				onChange={handleTemperatureChange}
				valueLabelDisplay='auto'
				step={0.1}
				marks={[
					{ value: 0, label: '0, min' },
					{ value: 2, label: '2, max' },
				]}
				min={0}
				max={2}
				sx={{ mt: 2, mx: 2 }}
			/>

			<Typography sx={{ mt: 4 }}>Maximum tokens: {localMaxTokens}</Typography>
			<Slider
				aria-label='Maximum tokens'
				value={localMaxTokens}
				onChange={handleMaxTokensChange}
				valueLabelDisplay='auto'
				step={128}
				marks={tokensMarks}
				min={0}
				max={8192}
				sx={{ mt: 2, mx: 2 }}
			/>

			<Autocomplete
				disablePortal
				id='combo-box-demo'
				disableClearable
				isOptionEqualToValue={(a, b) => a.id === b.id}
				options={modelOptions}
				value={modelValue}
				onChange={handleModelChange}
				sx={{ width: 300, mt: 4 }}
				renderInput={params => <TextField {...params} label='Model' />}
			/>
		</>
	)
}

export default ModelSettings
