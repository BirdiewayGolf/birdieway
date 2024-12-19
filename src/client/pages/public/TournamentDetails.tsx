import React from 'react';
import { useParams } from 'react-router-dom';

const TournamentDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="tournament-details">
      <div className="container">
        <h1>Tournament Details</h1>
        {/* Tournament details content will go here */}
      </div>
    </div>
  );
};

export default TournamentDetails;