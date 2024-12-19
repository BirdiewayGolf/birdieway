import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface TournamentData {
  name: string;
  league: string;
  date: string;
  price: string;
  location: string;
  maxParticipants: string;
  description: string;
  startTime: string;
  registeredPlayers: number;
  status: 'upcoming' | 'in-progress' | 'completed';
}

const EditTournament: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<TournamentData>({
    name: '',
    league: '',
    date: '',
    price: '',
    location: '',
    maxParticipants: '',
    description: '',
    startTime: '',
    registeredPlayers: 0,
    status: 'upcoming'
  });

  // Simulated data fetch - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFormData({
        name: 'Spring Business Classic',
        league: 'business',
        date: '2025-04-15',
        price: '150',
        location: 'Pine Valley Golf Club',
        maxParticipants: '36',
        description: 'Annual spring tournament for business league players.',
        startTime: '08:00',
        registeredPlayers: 24,
        status: 'upcoming'
      });
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to update tournament
    console.log('Updated tournament data:', formData);
    navigate('/admin/tournaments');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="admin-form-container">
      <div className="admin-form-content">
        <div className="form-header">
          <h1>Edit Tournament</h1>
          {formData.registeredPlayers > 0 && (
            <div className="warning-banner">
              <AlertCircle size={20} />
              <span>This tournament has {formData.registeredPlayers} registered players. Some changes may affect their registration.</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>League</label>
            <select
              name="league"
              value={formData.league}
              onChange={handleChange}
              required
            >
              <option value="">Select a league</option>
              <option value="business">Business League</option>
              <option value="junior">Junior League</option>
              <option value="longday">Long Day Tournament</option>
              <option value="fundraiser">Fundraiser</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <div className="input-icon">
                <Calendar size={20} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <div className="input-icon">
                <Clock size={20} />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Entry Fee</label>
              <div className="input-icon">
                <DollarSign size={20} />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Max Participants</label>
              <div className="input-icon">
                <Users size={20} />
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required
                  min={formData.registeredPlayers}
                />
              </div>
              {formData.registeredPlayers > 0 && (
                <span className="field-hint">
                  Cannot be less than current registrations ({formData.registeredPlayers})
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="input-icon">
              <MapPin size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Tournament Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="upcoming">Upcoming</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/tournaments')} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTournament;