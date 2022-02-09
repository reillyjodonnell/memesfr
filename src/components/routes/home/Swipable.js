import React, { useState, useRef, useEffect } from 'react';
import '../../../css-components/routes/home/Swipable.css';
import SideCrownContainer from '../../mobile/SideCrownContainer';
import { ReactComponent as User } from '../../../assets/svg/user.svg';
export default function Swipable({ setActiveVideoURL }) {
  const [pressed, setPressed] = useState(false);
  const [startingPosition, setStartingPosition] = useState({ x: 0, y: 0 });

  const ref = useRef(null);
  const [startingYPosition, setStartingYPosition] = useState(0);
  const [movingYPosition, setMovingYPosition] = useState(0);
  const [yDifference, setYDifference] = useState(0);
  const [touching, setTouching] = useState(false);

  //   const slider = document.getElementById('slider');

  //   function handleGesture() {
  //     if (touchendY < touchstartY) alert('swiped up!');
  //     if (touchendY > touchstartY) alert('swiped down!');

  //     dif = touchstartY - touchendY;
  //   }

  //   slider.addEventListener('touchstart', (e) => {
  //     touchstartY = e.changedTouches[0].screenX;
  //   });

  //   slider.addEventListener('touchend', (e) => {
  //     touchendY = e.changedTouches[0].screenX;
  //     handleGesture();
  //   });

  // Monitor changes to position state and update DOM
  //   useEffect(() => {
  //     if (ref.current) {
  //       console.log('translating now');

  //       ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
  //     }
  //   }, [position]);

  //   //   Update the current position if mouse is down
  //   const onTouchStart = (event) => {
  //     console.log(event);
  //     console.log(event.changedTouches[0].clientX);
  //     setStartingPosition({
  //       x: startingPosition.x + event.changedTouches[0].clientX,
  //       y: startingPosition.y + event.changedTouches[0].clientY,
  //     });
  //   };
  //   const onTouchEnd= (event) => {
  //     setEndPosition({
  //       x: endPosition.x + event.changedTouches[0].clientX,
  //       y: endPosition.y + event.changedTouches[0].clientY,
  //     });
  //   };
  useEffect(() => {
    setYDifference(movingYPosition - startingYPosition);
  }, [movingYPosition]);

  useEffect(() => {
    console.log(yDifference);
    console.log(height / 2);
    if (!touching) {
      if (yDifference >= +(height - 20 / 2)) {
        //   console.log(yDifference);
        //   console.log(height / 2);
        console.log('now moving to next underneat');
        ref.current.style.transform = 'translate3d(0px,763px, 0px)';
      } else if (yDifference <= -(height - 20 / 2)) {
        console.log(yDifference);
        console.log(height / 2);
        console.log('Swiping up to next above');
        ref.current.style.transform = 'translate3d(0px,-763px, 0px)';
      } else {
        // ref.current.style.transform('translate3d(0px,0px, 0px)');
        ref.current.style.transform = 'translate3d(0px,0px, 0px)';
      }
    }
  }, [yDifference, touching]);

  const handleStart = (e) => {
    setTouching(true);
    setStartingYPosition(e.changedTouches[0].clientY);
  };

  const handleMove = (e) => {
    setTouching(true);
    setMovingYPosition(e.changedTouches[0].clientY);
  };
  const handleEnd = (e) => {
    setTouching(false);
    // setMovingYPosition(e.changedTouches[0].clientY);
  };

  const sampleData = [{}];

  const height = 763;

  return (
    <div className="home-content-data">
      <div className="home-content-swiper-container">
        <div
          // onTouchStart={(e) => onTouchStart(e)}
          //   onTouchEnd={(e) => onTouchEnd(e)}
          ref={ref}
          onTouchStart={(e) => handleStart(e)}
          onTouchMove={(e) => handleMove(e)}
          onTouchEnd={(e) => handleEnd(e)}
          style={{ transform: `translate3d(0px,${yDifference}px, 0px)` }}
          className="swiper-wrapper"
          on
          //   style={{ transform: `translate3d(0px, ${dif}px, 0px)` }}
        >
          {/* Here we map over all of the data */}
          <div
            data-index="0"
            className="swiper-active home-content-data-container
            "
            style={{ width: '100vw', height: '763px' }}
          >
            <SideCrownContainer />
            <div className="swiper-image-preview-container">
              <div
                className="swiper-image-preview"
                style={{ backgroundColor: 'yellow' }}
              />
            </div>
            {/* <video src="https://ifunny.co/video/9OTKSIuC9?s=cl" /> */}
            <div className="home-content-user-information">
              <div className="home-content-username-and-title">
                <span className="home-content-username">@Reilly</span>
                <span className="home-content-title">This is a sample 😂</span>
              </div>
              <div className="home-content-avatar">
                <User className="home-content-avatar-image" />
              </div>
            </div>
          </div>
          <div
            className="home-content-data-container"
            data-index="1"
            style={{ width: '100vw', height: '763px' }}
          >
            <SideCrownContainer />
            <div className="swiper-image-preview-container">
              <div
                className="swiper-image-preview"
                style={{ backgroundColor: 'purple', display: 'block' }}
              />
            </div>
            {/* <video src="https://ifunny.co/video/9OTKSIuC9?s=cl" /> */}
            <div className="home-content-user-information">
              <div className="home-content-username-and-title">
                <span className="home-content-username">@Reilly</span>
                <span className="home-content-title">This is a sample 😂</span>
              </div>
              <div className="home-content-avatar">
                <User className="home-content-avatar-image" />
              </div>
            </div>
          </div>
          <div data-index="2" style={{ width: '100vw', height: '763px' }}></div>
          <div data-index="3" style={{ width: '100vw', height: '763px' }}></div>
          <div data-index="4" style={{ width: '100vw', height: '763px' }}></div>
          <div data-index="5" style={{ width: '100vw', height: '763px' }}></div>
          <div data-index="6" style={{ width: '100vw', height: '763px' }}></div>
        </div>
      </div>
    </div>
  );
}
