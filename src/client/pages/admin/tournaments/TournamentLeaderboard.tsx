import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Save, 
  Plus, 
  Trash2, 
  Medal,
  Download,
  Upload
} from 'lucide-react';

interface Player {
  id: string;
  position: number;
  name: string;
  scores: number[];
  total: number;
  handicap: number;
  netScore: number;
}

const TournamentLeaderboard: React.FC = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournamentInfo, setTournamentInfo] = useState({
    name: '',
    date: '',
    holeCount: 18,
    status: ''
  });

  // Simulated data fetch - replace with actual API call
  useEffect(() => {
    // Mock data
    setTournamentInfo({
      name: 'Spring Business Classic',
      date: '2025-04-15',
      holeCount: 18,
      status: 'in-progress'
    });

    setPlayers([
      {
        id: '1',
        position: 1,
        name: 'John Smith',
        scores: Array(18).fill(4),
        total: 72,
        handicap: 5,
        netScore: 67
      },
      // Add more sample players
    ]);
  }, [id]);

  const handleScoreUpdate = (playerId: string, holeIndex: number, score: number) => {
    setPlayers(currentPlayers => 
      currentPlayers.map(player => {
        if (player.id === playerId) {
          const newScores = [...player.scores];
          newScores[holeIndex] = score;
          return {
            ...player,
            scores: newScores,
            total: newScores.reduce((a, b) => a + b, 0)
          };
        }
        return player;
      }).sort((a, b) => a.total - b.total)
       .map((player, index) => ({ ...player, position: index + 1 }))
    );
  };

  const addPlayer = () => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      position: players.length + 1,
      name: '',
      scores: Array(tournamentInfo.holeCount).fill(0),
      total: 0,
      handicap: 0,
      netScore: 0
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerId: string) => {
    setPlayers(currentPlayers => 
      currentPlayers.filter(p => p.id !== playerId)
        .map((player, index) => ({ ...player, position: index + 1 }))
    );
  };

  const saveLeaderboard = () => {
    // Add API call to save leaderboard data
    console.log('Saving leaderboard:', players);
  };

  const exportScores = () => {
    // Add export functionality
    console.log('Exporting scores');
  };

  const importScores = () => {
    // Add import functionality
    console.log('Importing scores');
  };

  return (
    <div className="tournament-leaderboard">
      <div className="leaderboard-header">
        <div>
          <h1>{tournamentInfo.name}</h1>
          <p className="tournament-date">{new Date(tournamentInfo.date).toLocaleDateString()}</p>
        </div>

        <div className="header-actions">
          <button onClick={importScores} className="action-button">
            <Upload size={16} />
            Import
          </button>
          <button onClick={exportScores} className="action-button">
            <Download size={16} />
            Export
          </button>
          <button onClick={saveLeaderboard} className="save-button">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Player</th>
              {Array.from({ length: tournamentInfo.holeCount }, (_, i) => (
                <th key={i + 1}>H{i + 1}</th>
              ))}
              <th>Total</th>
              <th>HC</th>
              <th>Net</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id} className={player.position === 1 ? 'leader' : ''}>
                <td className="position-cell">
                  {player.position === 1 && <Medal size={16} className="leader-icon" />}
                  {player.position}
                </td>
                <td>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => {
                      setPlayers(currentPlayers =>
                        currentPlayers.map(p =>
                          p.id === player.id ? { ...p, name: e.target.value } : p
                        )
                      );
                    }}
                    placeholder="Player Name"
                  />
                </td>
                {player.scores.map((score, index) => (
                  <td key={index}>
                    <input
                      type="number"
                      value={score || ''}
                      onChange={(e) => handleScoreUpdate(player.id, index, parseInt(e.target.value) || 0)}
                      className="score-input"
                      min="1"
                    />
                  </td>
                ))}
                <td className="total-cell">{player.total}</td>
                <td>
                  <input
                    type="number"
                    value={player.handicap}
                    onChange={(e) => {
                      setPlayers(currentPlayers =>
                        currentPlayers.map(p =>
                          p.id === player.id ? { ...p, handicap: parseInt(e.target.value) || 0 } : p
                        )
                      );
                    }}
                    className="handicap-input"
                    min="0"
                  />
                </td>
                <td>{player.total - player.handicap}</td>
                <td>
                  <button 
                    onClick={() => removePlayer(player.id)}
                    className="delete-button"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addPlayer} className="add-player-button">
        <Plus size={16} />
        Add Player
      </button>
    </div>
  );
};

export default TournamentLeaderboard;