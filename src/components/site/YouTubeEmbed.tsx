import { useState } from "react";

export function YouTubeEmbed({
  id,
  title,
  className = "",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [thumbnail, setThumbnail] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={`relative aspect-video overflow-hidden border border-border bg-ink shadow-cinematic ${className}`}>
      {loaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${src}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full text-left"
          aria-label={`Play ${title}`}
        >
          <img
            src={thumbnail}
            alt=""
            aria-hidden="true"
            onError={() => setThumbnail(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold transition-transform duration-300 hover:scale-110">
              <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-current" />
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="font-display text-xl text-white">{title}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-white/60">Play video</div>
          </div>
        </button>
      )}
    </div>
  );
}
