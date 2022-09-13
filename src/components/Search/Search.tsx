import React from 'react';
import {
	OutlinedInput,
	InputLabel,
	InputAdornment,
	IconButton,
	Paper,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	placeholderText?: string;
	handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	searchTerm?: string;
};

const SearchField = ({
	handleSearchChange,
	handleClear,
	searchTerm,
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
						background: 'transparent',
					},
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
						background: 'transparent',
					},
				}}
			>
				<SearchIcon fontSize="small" />
			</IconButton>
		);

	return (
		<Paper elevation={4} sx={{ p: 2, m: 1, px: 3, width: '100%' }}>
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
				onChange={handleSearchChange}
				inputProps={{
					'aria-label': 'search',
				}}
				placeholder="SEARCH"
				endAdornment={
					<InputAdornment position="end">{clearSearchIcon}</InputAdornment>
				}
			/>
		</Paper>
	);
};

export default SearchField;
