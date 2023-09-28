import React from "react";

const TrailerFrame = ({ trailerData }) => {
    const embedUrl = `https://www.youtube.com/embed/${trailerData.key}`;

    return (
        <div className="iframe-container">
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                title={trailerData.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default TrailerFrame;
