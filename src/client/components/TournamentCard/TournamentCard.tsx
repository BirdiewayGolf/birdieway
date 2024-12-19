import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentCardProps } from '../../types/tournament';
import './styles.scss';

const TournamentCard: React.FC<TournamentCardProps> = ({ type, title, description, link }) => {
  return (
    <div className={`tournament-card ${type}`}>
      <div className="tournament-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="view-button">
          View Tournaments
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;