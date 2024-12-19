import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  Filter,
  Search,
  Trophy,
  PlusCircle
} from 'lucide-react';
import '../styles.scss';

// Example tournament type
interface Tournament {
  id: string;
  name: string;
  league: string;
  date: string;
  location: string;
  registeredPlayers: number;
  maxParticipants: number;
  status: 'upcoming' | 'in-progress' | 'completed';
}

const TournamentList: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Example data - replace with actual API call
  const tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Spring Business Classic',
      league: 'business',
      date: '2025-04-15',
      location: 'Pine Valley Golf Club',
      registeredPlayers: 24,
      maxParticipants: 36,
      status: 'upcoming'
    },
    // Add more sample tournaments as needed
  ];

  const handleDelete = (id: string) => {
    // Add delete confirmation and API call
    console.log('Delete tournament:', id);
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesFilter = filter === 'all' || tournament.league === filter;
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-tournament-list">
      <div className="list-header">
        <h1>Tournaments</h1>
        <Link to="/admin/tournaments/create" className="create-button">
          <PlusCircle size={20} />
          New Tournament
        </Link>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <Filter size={20} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Leagues</option>
            <option value="business">Business League</option>
            <option value="junior">Junior League</option>
            <option value="longday">Long Day Tournament</option>
            <option value="fundraiser">Fundraisers</option>
          </select>
        </div>
      </div>

      <div className="tournament-grid">
        {filteredTournaments.map(tournament => (
          <div key={tournament.id} className="tournament-card">
            <div className="card-header">
              <h3>{tournament.name}</h3>
              <span className={`status-badge ${tournament.status}`}>
                {tournament.status}
              </span>
            </div>

            <div className="card-details">
              <div className="detail-item">
                <Clock size={16} />
                <span>{new Date(tournament.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <Users size={16} />
                <span>{tournament.registeredPlayers}/{tournament.maxParticipants}</span>
              </div>
            </div>

            <div className="card-actions">
              <Link 
                to={`/admin/tournaments/${tournament.id}/leaderboard`}
                className="action-button leaderboard"
              >
                <Trophy size={16} />
                Leaderboard
              </Link>
              <Link 
                to={`/admin/tournaments/${tournament.id}/edit`}
                className="action-button edit"
              >
                <Edit size={16} />
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(tournament.id)}
                className="action-button delete"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentList;