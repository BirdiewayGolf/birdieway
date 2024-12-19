import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, MapPin, Clock } from 'lucide-react';
import '../styles.scss';

interface TournamentForm {
  name: string;
  league: string;
  date: string;
  price: string;
  location: string;
  maxParticipants: string;
  description: string;
  startTime: string;
}

const CreateTournament: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TournamentForm>({
    name: '',
    league: '',
    date: '',
    price: '',
    location: '',
    maxParticipants: '',
    description: '',
    startTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the tournament
    console.log('Tournament data:', formData);
    
    // Redirect to tournaments list after creation
    navigate('/admin/tournaments');
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form-content">
        <h1>Create Tournament</h1>

        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter tournament name"
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
                  placeholder="0.00"
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
                  min="1"
                  placeholder="Enter max participants"
                />
              </div>
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
                placeholder="Enter tournament location"
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
              placeholder="Enter tournament description"
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/tournaments')} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;