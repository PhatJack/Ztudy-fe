"use client";
import React from "react";

interface SpotifyEmbedProps {
  url: string; // the Spotify embed URL
  height?: 152 | 352; // default height is 352px, but can be changed to 152px
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ url, height = 352 }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <iframe
        style={{ borderRadius: 12 }}
        src={url}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
				title="Spotify Embed"
      />
    </div>
  );
};

export default SpotifyEmbed;
