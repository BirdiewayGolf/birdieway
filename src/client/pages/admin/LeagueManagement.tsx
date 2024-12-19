import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './styles.scss';

interface LeagueStanding {
  teamName: string;
  points: number;
  wins: number;
  losses: number;
  ties: number;
}

interface League {
  id: string;
  name: string;
  type: string;
  standings: LeagueStanding[];
}

const LeagueManagement: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleStandingUpdate = (index: number, field: keyof LeagueStanding, value: number | string) => {
    if (!selectedLeague) return;

    const newStandings = [...selectedLeague.standings];
    newStandings[index] = {
      ...newStandings[index],
      [field]: field === 'teamName' ? value : Number(value)
    };

    setSelectedLeague({
      ...selectedLeague,
      standings: newStandings
    });
  };

  const handleSaveStandings = async () => {
    if (!selectedLeague) return;

    try {
      // API call to save standings
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to save standings:', error);
    }
  };

  return (
    <div className="league-management">
      <div className="league-management__header">
        <h1>League Management</h1>
        <Link to="/admin/leagues/create" className="button button--primary">
          <Plus size={20} />
          Create New League
        </Link>
      </div>

      <div className="league-management__content">
        <div className="league-management__sidebar">
          <h2>Leagues</h2>
          <div className="league-list">
            {leagues.map(league => (
              <button
                key={league.id}
                className={`league-button ${selectedLeague?.id === league.id ? 'active' : ''}`}
                onClick={() => setSelectedLeague(league)}
              >
                {league.name}
              </button>
            ))}
          </div>
        </div>

        {selectedLeague && (
          <div className="league-management__main">
            <div className="league-management__controls">
              <h2>{selectedLeague.name} Standings</h2>
              <div className="button-group">
                {isEditMode ? (
                  <>
                    <button 
                      onClick={handleSaveStandings}
                      className="button button--primary"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditMode(false)}
                      className="button button--secondary"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditMode(true)}
                    className="button button--primary"
                  >
                    <Edit2 size={20} />
                    Edit Standings
                  </button>
                )}
              </div>
            </div>

            <div className="standings-table">
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Team Name</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Ties</th>
                    {isEditMode && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {selectedLeague.standings.map((standing, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={standing.teamName}
                            onChange={(e) => handleStandingUpdate(index, 'teamName', e.target.value)}
                          />
                        ) : (
                          standing.teamName
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={standing.points}
                            onChange={(e) => handleStandingUpdate(index, 'points', e.target.value)}
                          />
                        ) : (
                          standing.points
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={standing.wins}
                            onChange={(e) => handleStandingUpdate(index, 'wins', e.target.value)}
                          />
                        ) : (
                          standing.wins
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={standing.losses}
                            onChange={(e) => handleStandingUpdate(index, 'losses', e.target.value)}
                          />
                        ) : (
                          standing.losses
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            value={standing.ties}
                            onChange={(e) => handleStandingUpdate(index, 'ties', e.target.value)}
                          />
                        ) : (
                          standing.ties
                        )}
                      </td>
                      {isEditMode && (
                        <td>
                          <button 
                            className="button button--danger"
                            onClick={() => {
                              const newStandings = selectedLeague.standings.filter((_, i) => i !== index);
                              setSelectedLeague({
                                ...selectedLeague,
                                standings: newStandings
                              });
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueManagement;