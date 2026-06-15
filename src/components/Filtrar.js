import React from 'react';
import searchIcon from '../assets/buscar.png';

export const Filtrar = ({ filter, setFilter }) => {
	const handleInput = ({ target }) => {
		setFilter(target.value);
	};

	return (
		<div className="search-wrapper">
			<img src={searchIcon} alt="Buscar" className="search-icon" />
			<input
				type="text"
				className="form-control"
				placeholder="Buscar"
				name="buscar"
				onChange={handleInput}
				value={filter}
			/>
		</div>
	);
};
