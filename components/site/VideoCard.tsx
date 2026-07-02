import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

type Video = {
  id: string;
  title: string;
  type: string;
  description: string;
};

export function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  return (
    <article
      className={cn(
        "premium-panel group overflow-hidden rounded-3xl ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50",
        featured && "lg:grid lg:grid-cols-12",
      )}
    >
      <div
        className={cn(
          "aspect-video bg-ink ring-1 ring-inset ring-white/5",
          featured && "lg:col-span-7",
        )}
      >
        <iframe
          loading="lazy"
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div
        className={cn(
          "p-6 md:p-7",
          featured && "lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:p-10",
        )}
      >
        <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
          <Play className="size-3.5" />
          {video.type}
        </div>
        <h3
          className={cn(
            "text-balance font-display text-2xl font-light leading-tight",
            featured && "md:text-4xl",
          )}
        >
          {video.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-foreground/62 md:text-base">
          {video.description}
        </p>
      </div>
    </article>
  );
}

export function VideoGrid({
  videos,
  featuredFirst = false,
}: {
  videos: readonly Video[];
  featuredFirst?: boolean;
}) {
  const [first, ...rest] = videos;

  if (featuredFirst && first) {
    return (
      <div className="grid gap-6">
        <VideoCard video={first} featured />
        {rest.length > 0 && (
          <div className={cn("grid gap-6 md:grid-cols-2", rest.length > 2 && "lg:grid-cols-3")}>
            {rest.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
