import React from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import TournamentCard from '../../components/TournamentCard/TournamentCard';
import { TournamentType, TournamentCardProps } from '../../types/tournament';

const Home: React.FC = () => {
  const tournaments: TournamentCardProps[] = [
    {
      type: 'business',
      title: 'Business League',
      description: 'Join our competitive business league tournaments.',
      link: '/tournaments/business'
    },
    {
      type: 'junior',
      title: 'Junior League',
      description: 'Develop young talent in our junior programs.',
      link: '/tournaments/junior'
    },
    {
      type: 'longday',
      title: 'Long Day Tournament',
      description: 'Test your endurance in our signature tournament.',
      link: '/tournaments/longday'
    }
  ];

  return (
    <div className="home">
      <HeroSlider />
      <div className="tournament-section">
        <div className="container">
          <h2>Our Tournaments</h2>
          <div className="tournament-grid">
            {tournaments.map((tournament, index) => (
              <TournamentCard
                key={index}
                {...tournament}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;