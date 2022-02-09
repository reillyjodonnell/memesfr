import React from 'react';
import '../css-components/TrendingTopics.css';
export default function TrendingTopics() {
  const trendingTopics = [
    { title: 'Political' },
    { title: 'JoeExotic' },
    { title: 'Dank' },
    { title: 'Cheetos' },
    { title: 'ElonMusk' },
    { title: 'SoDankItHurts' },
    { title: 'MemeLordship' },
    { title: 'Ouch' },
    { title: 'Doge' },
  ];

  return (
    <div className="trendingtopics-section">
      <div className="trendingtopics-text-container">
        {trendingTopics.map((topic, index) => {
          return (
            <div key={index} className="trendingtopics-text">
              <span className="trendingtopics-text-hashtag">#</span>
              <span className="trendingtopics-text-topic">{topic.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
