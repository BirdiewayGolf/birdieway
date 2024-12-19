import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [standingsOpen, setStandingsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleTournaments = () => setTournamentsOpen(!tournamentsOpen);
  const toggleStandings = () => setStandingsOpen(!standingsOpen);

  return (
    <nav className="bg-[#2A5A3B] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Birdieway Golf
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Tournaments Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleTournaments}
                className="flex items-center space-x-1 hover:text-[#C5A572]"
              >
                <span>Tournaments</span>
                <span className="text-xs">▼</span>
              </button>
              {tournamentsOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <Link to="/tournaments/business" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Business League</Link>
                    <Link to="/tournaments/junior" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Junior League</Link>
                    <Link to="/tournaments/longday" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Long Day Tournament</Link>
                    <Link to="/tournaments/fundraisers" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Fundraisers</Link>
                    <Link to="/host-league" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Host a League</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standings Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleStandings}
                className="flex items-center space-x-1 hover:text-[#C5A572]"
              >
                <span>Standings</span>
                <span className="text-xs">▼</span>
              </button>
              {standingsOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <Link to="/standings/business" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Business Standings</Link>
                    <Link to="/standings/junior" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Junior Standings</Link>
                    <Link to="/standings/private" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Private League Standings</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-[#C5A572]">About</Link>
            <Link to="/contact" className="hover:text-[#C5A572]">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNav}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-[#C5A572]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={toggleTournaments}
              className="w-full text-left px-3 py-2 hover:text-[#C5A572]"
            >
              Tournaments
            </button>
            {tournamentsOpen && (
              <div className="pl-6 space-y-1">
                <Link to="/tournaments/business" className="block px-3 py-2 hover:text-[#C5A572]">Business League</Link>
                <Link to="/tournaments/junior" className="block px-3 py-2 hover:text-[#C5A572]">Junior League</Link>
                <Link to="/tournaments/longday" className="block px-3 py-2 hover:text-[#C5A572]">Long Day Tournament</Link>
                <Link to="/tournaments/fundraisers" className="block px-3 py-2 hover:text-[#C5A572]">Fundraisers</Link>
                <Link to="/host-league" className="block px-3 py-2 hover:text-[#C5A572]">Host a League</Link>
              </div>
            )}

            <button
              onClick={toggleStandings}
              className="w-full text-left px-3 py-2 hover:text-[#C5A572]"
            >
              Standings
            </button>
            {standingsOpen && (
              <div className="pl-6 space-y-1">
                <Link to="/standings/business" className="block px-3 py-2 hover:text-[#C5A572]">Business Standings</Link>
                <Link to="/standings/junior" className="block px-3 py-2 hover:text-[#C5A572]">Junior Standings</Link>
                <Link to="/standings/private" className="block px-3 py-2 hover:text-[#C5A572]">Private League Standings</Link>
              </div>
            )}

            <Link to="/about" className="block px-3 py-2 hover:text-[#C5A572]">About</Link>
            <Link to="/contact" className="block px-3 py-2 hover:text-[#C5A572]">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;