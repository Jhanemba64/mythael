"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export function AmbientPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambiance.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    setMounted(true);
    const wantsMusic = localStorage.getItem("mythael-music") !== "off";

    function startPlayback() {
      audio.play().then(() => {
        setPlaying(true);
        setShowHint(false);
      }).catch(() => {});
    }

    function autoPlay() {
      if (localStorage.getItem("mythael-music") === "off") return;
      startPlayback();
      cleanup();
    }

    function cleanup() {
      window.removeEventListener("click", autoPlay);
      window.removeEventListener("touchstart", autoPlay);
    }

    if (wantsMusic) {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — show hint & wait for interaction
        setShowHint(true);
        window.addEventListener("click", autoPlay);
        window.addEventListener("touchstart", autoPlay);
      });
    }

    return () => {
      audio.pause();
      audio.src = "";
      cleanup();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      setShowHint(false);
      localStorage.setItem("mythael-music", "off");
    } else {
      audio.play().then(() => {
        setPlaying(true);
        setShowHint(false);
      }).catch(() => {});
      localStorage.setItem("mythael-music", "on");
    }
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {/* Hint bubble */}
      {showHint && (
        <div className="animate-fade-in flex items-center gap-2 rounded-full border border-primary/30 bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          <Music className="h-3.5 w-3.5 animate-pulse text-primary" />
          <span className="text-xs text-muted-foreground">
            Click anywhere for ambiance
          </span>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
        aria-label={playing ? "Mute" : "Play ambient music"}
        title={playing ? "Mute" : "Play ambient music"}
      >
        {playing ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
