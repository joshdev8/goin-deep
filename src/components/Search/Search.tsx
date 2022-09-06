import React from 'react';
import {
	OutlinedInput,
	InputLabel,
	InputAdornment,
	IconButton,
	Box
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	placeholderText?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	searchTerm?: string;
};

const SearchField = ({
	handleChange,
	handleClear,
	searchTerm
}: Props): JSX.Element => {

	const clearSearchIcon =
		searchTerm && searchTerm.length > 0 ? (
			<IconButton
				onClick={handleClear}
				edge="end"
				aria-label="clear"
				size="large"
				sx={{
					'&:hover': {
						background: 'transparent'
					}
				}}
			>
				<ClearIcon fontSize="small" />
			</IconButton>
		) : (
			<IconButton
				edge="end"
				aria-label="clear"
				size="large"
				sx={{
					'&:hover': {
						background: 'transparent'
					}
				}}
			>
				<SearchIcon fontSize="small" />
			</IconButton>
		);

	return (
		<Box sx={theme => ({ p: theme.spacing(1, 2), width: '100%' })}>
			<InputLabel htmlFor="search" />
			<OutlinedInput
				autoFocus
				className="input-field"
				aria-describedby="search"
				size="small"
				required
				id="search"
				fullWidth
				value={searchTerm}
				onChange={handleChange}
				inputProps={{
					'aria-label': 'search'
				}}
				placeholder='SEARCH'
				endAdornment={
					<InputAdornment position="end">{clearSearchIcon}</InputAdornment>
				}
			/>
		</Box>
	);
};

export default SearchField;
