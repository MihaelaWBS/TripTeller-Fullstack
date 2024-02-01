import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faHotel,
  faUtensils,
  faLandmark,
  // ... other icons you need
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {/* ... other sidebar items */}
          {/* Date Dropdown */}
          <li className="relative">
            <button
              className="flex items-center justify-between w-full p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="w-6 h-6" />
              <span>Date</span>
              <FontAwesomeIcon icon={faChevronDown} className={`${dateDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {dateDropdownOpen && (
              <ul className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-md z-10">
                <li className="px-4 py-2 hover:bg-gray-100">Today</li>
                <li className="px-4 py-2 hover:bg-gray-100">Tomorrow</li>
                <li className="px-4 py-2 hover:bg-gray-100">Next Days</li>
              </ul>
            )}
          </li>

          {/* Type Dropdown */}
          <li className="relative">
            <button
              className="flex items-center justify-between w-full p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
            >
              <span>Type</span>
              <FontAwesomeIcon icon={faChevronDown} className={`${typeDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {typeDropdownOpen && (
              <ul className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-md z-10">
                <li className="px-4 py-2 hover:bg-gray-100">Hotels</li>
                <li className="px-4 py-2 hover:bg-gray-100">Restaurants</li>
                <li className="px-4 py-2 hover:bg-gray-100">Attractions</li>
              </ul>
            )}
          </li>
          {/* ... other sidebar items */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
