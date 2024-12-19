import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  league?: string;
  type?: 'tournaments' | 'standings';
}

const TournamentList: React.FC<Props> = ({ league, type = 'tournaments' }) => {
  return (
    <div className="tournament-list">
      <div className="container">
        <h1>{league ? `${league} ${type}` : 'All Tournaments'}</h1>
        {/* Tournament list content will go here */}
      </div>
    </div>
  );
};

export default TournamentList;