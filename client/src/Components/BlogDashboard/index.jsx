import React from 'react';
import Sidebar from '../Sidebar';

const BlogDashboard = () => {
  const cards = [
    // ... array of card objects
  ];

  return (
    <div className="flex">
      {/* Sidebar goes here */}
      <Sidebar />
      {/* Content area for cards */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img className="w-full" src={card.imageUrl} alt="Blog post" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
                <p className="text-gray-700 text-base">{card.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {card.avatar && (
                  <img src={card.avatar} alt="Avatar" className="w-20 rounded-full" />
                )}
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {card.author}
                    </span>
                  </div>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {card.date}
                  </span>
                </div>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {card.readTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
