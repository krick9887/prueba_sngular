import React from 'react';

export const Card = ({ personaje, onClick, onToggleFavorite, isFavorite }) => {
	const handleFavoriteClick = (e) => {
		e.stopPropagation();
		onToggleFavorite(personaje.id);
	};

	return (
		<article
			className="bg-white rounded shadow p-3 mb-4"
			onClick={() => onClick(personaje)}
			role="button"
			aria-label={`View details for ${personaje.name}`}
		>
			<img
				src={personaje.image}
				alt={personaje.name}
				className="img-fluid rounded mb-3 d-block mx-auto"
			/>
			<div className="d-flex justify-content-between align-items-center">
				<h2 className="h5 mb-0 fw-bold">{personaje.name}</h2>
				<div
					className={`favorite-star ${isFavorite ? 'is-favorite' : ''}`}
					onClick={handleFavoriteClick}
					role="button"
					aria-label="Toggle favorite"
				>
					★
				</div>
			</div>
		</article>
	);
};
