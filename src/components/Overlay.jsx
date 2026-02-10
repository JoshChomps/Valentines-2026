import React, { useState, useEffect, useRef } from 'react';
import './Overlay.css';

const Overlay = ({ accepted, onYes }) => {
    const [yesScale, setYesScale] = useState(1);
    const [noStyle, setNoStyle] = useState({
        left: '58%',
        top: '70%',
        position: 'absolute'
    });
    const [yesStyle, setYesStyle] = useState({
        left: '42%',
        top: '70%',
        position: 'absolute'
    });
    const [hasStarted, setHasStarted] = useState(false);

    // Carousel Logic
    const scrollRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || !accepted) return;

        let animationFrameId;

        const scroll = () => {
            if (!isHovering) {
                scrollContainer.scrollLeft += 1; // Adjust speed here
                // Reset to 0 when we reach the halfway point (end of first set)
                // Note: This assumes the content is duplicated exactly once
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovering, accepted]);

    const handleNoHover = () => {
        if (!hasStarted) {
            setHasStarted(true);
            setYesStyle({
                left: '50%',
                top: '70%',
                position: 'absolute'
            });
        }

        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;

        setNoStyle({
            left: `${x}%`,
            top: `${y}%`,
            position: 'absolute'
        });

        setYesScale(prev => prev + 0.15);
    };

    const handleYesClick = () => {
        onYes();
    };

    if (accepted) {
        // Generate array of 13 photos
        const photos = Array.from({ length: 13 }, (_, i) => i + 1);

        return (
            <div className="overlay-container success-mode">
                {/* Hidden Hover Messages */}
                <div className="hidden-msg top-left">Forever and Always</div>
                <div className="hidden-msg top-right">I love you Infinity+1</div>

                <div className="title-container">
                    <h1 className="main-title">I love you Bethy Bee</h1>
                    <p className="subtitle">I knew you'd say yes :)</p>
                </div>

                {/* Infinite Photo Carousel */}
                <div
                    className="carousel-container"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="carousel-track" ref={scrollRef}>
                        {/* Original Set */}
                        {photos.map((num) => (
                            <div key={num} className="carousel-item">
                                <img
                                    src={`photos/photo${num}.jpg`}
                                    alt={`Memory ${num}`}
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = `Add photo${num}.jpg`; }}
                                />
                            </div>
                        ))}
                        {/* Duplicate Set for Infinite Loop */}
                        {photos.map((num) => (
                            <div key={`dup-${num}`} className="carousel-item">
                                <img
                                    src={`photos/photo${num}.jpg`}
                                    alt={`Memory ${num}`}
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = `Add photo${num}.jpg`; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overlay-container">
            <div className="title-container">
                <h1 className="main-title">Will you be my Valentine?</h1>
                <p className="subtitle">To Bethy</p>
            </div>

            <div className="interactions-layer">
                <button
                    className="btn yes-btn"
                    onClick={handleYesClick}
                    style={{
                        ...yesStyle,
                        transform: `translate(-50%, -50%) scale(${yesScale})`
                    }}
                >
                    Yes
                </button>
                <button
                    className="btn no-btn"
                    onMouseEnter={handleNoHover}
                    style={{
                        ...noStyle,
                        transform: `translate(-50%, -50%)`
                    }}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default Overlay;
