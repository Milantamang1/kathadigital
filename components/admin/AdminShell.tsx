"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { AboutContentValue } from "@/lib/cms/about-content";
import type { EventValue } from "@/lib/cms/events";
import type { HomeContentValue } from "@/lib/cms/home-content";
import type { NewsPostValue } from "@/lib/cms/news";
import type { PortfolioProjectValue } from "@/lib/cms/portfolio";
import type { ProductionEpisodeValue, ProductionValue } from "@/lib/cms/productions";
import type { ServiceValue } from "@/lib/cms/services";
import {
  Bell,
  Briefcase,
  CalendarDays,
  Edit3,
  FileText,
  Gauge,
  Home,
  ImageIcon,
  Inbox,
  LayoutGrid,
  LogOut,
  Mail,
  Newspaper,
  Palette,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Users,
  Video,
} from "lucide-react";

type SectionKey =
  | "Dashboard"
  | "Home Content"
  | "About Content"
  | "Services"
  | "Portfolio"
  | "Productions"
  | "News"
  | "Events"
  | "Contact Messages"
  | "Booking Inquiries"
  | "Settings";

const menuItems: { label: SectionKey; icon: typeof LayoutGrid }[] = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Home Content", icon: Home },
  { label: "About Content", icon: FileText },
  { label: "Services", icon: Briefcase },
  { label: "Portfolio", icon: ImageIcon },
  { label: "Productions", icon: Video },
  { label: "News", icon: Newspaper },
  { label: "Events", icon: CalendarDays },
  { label: "Contact Messages", icon: Mail },
  { label: "Booking Inquiries", icon: Users },
  { label: "Settings", icon: Settings },
];

const portfolioItems = [
  ["Ride Into Forever", "Wedding Films", "Published"],
  ["Diva Supermodel Finale", "Events", "Published"],
  ["Studio Red", "Portraits", "Draft"],
  ["Mountain Story", "Travel", "Published"],
];

const messages = [
  ["Anjali Sharma", "anjali@example.com", "Wedding film inquiry", "Unread"],
  ["Rajan Maharjan", "rajan@example.com", "Brand video request", "Replied"],
  ["Priya Gurung", "priya@example.com", "Event coverage", "Unread"],
];

const bookings = [
  ["Suman & Riya", "Wedding Cinematography", "Aug 12, 2026", "NPR 180,000"],
  ["Himalaya Events", "Event Coverage", "Sep 05, 2026", "NPR 250,000"],
  ["Studio Launch", "Brand Film", "Oct 18, 2026", "NPR 120,000"],
];

type DashboardStat = {
  label: "Published Pages" | "New Messages" | "Booking Leads" | "Portfolio Items";
  value: string;
  note: string;
};

type DashboardSnapshot = {
  section: SectionKey;
  status: "Published" | "Draft" | "Archived" | "Mixed";
  itemCount: number;
  lastUpdated: string | null;
  href: string;
  publishedCount: number;
  draftCount: number;
  archivedCount: number;
};

type DashboardPendingWork = {
  section: SectionKey;
  href: string;
  draftCount: number;
  archivedCount: number;
};

type DashboardData = {
  stats: DashboardStat[];
  snapshots: DashboardSnapshot[];
  pendingWork: DashboardPendingWork[];
};

type DashboardResponse =
  | {
      ok: true;
      data: DashboardData;
    }
  | {
      ok: false;
      error: {
        message: string;
      };
    };

const dashboardStatIcons = {
  "Published Pages": FileText,
  "New Messages": Inbox,
  "Booking Leads": CalendarDays,
  "Portfolio Items": Gauge,
} satisfies Record<DashboardStat["label"], typeof FileText>;

function sectionFromSearchParam(value: string | null): SectionKey {
  const match = menuItems.find((item) => item.label === value);
  return match?.label ?? "Dashboard";
}

export function AdminShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<SectionKey>(() =>
    sectionFromSearchParam(searchParams.get("section")),
  );
  const activeMeta = useMemo(
    () => menuItems.find((item) => item.label === activeSection) ?? menuItems[0],
    [activeSection],
  );

  useEffect(() => {
    setActiveSection(sectionFromSearchParam(searchParams.get("section")));
  }, [searchParams]);

  function handleSectionSelect(section: SectionKey) {
    setActiveSection(section);

    if (section === "Dashboard") {
      router.push("/admin");
      return;
    }

    router.push(`/admin?section=${encodeURIComponent(section)}`);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-[#f3efe5] text-[#17130d]">
      <aside className="hidden w-72 shrink-0 border-r border-[#2b251b] bg-[#12110c] text-[#f7f0df] lg:block">
        <BrandBlock />
        <SidebarNav activeSection={activeSection} onSelect={handleSectionSelect} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex min-h-24 items-center justify-between gap-4 border-b border-[#ddd6c8] bg-white px-5 md:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#c0912f]">
              Admin Dashboard
            </div>
            <h1 className="mt-2 font-display text-3xl font-light leading-none md:text-4xl">
              {activeSection === "Dashboard" ? "Content Overview" : activeSection}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <label className="hidden items-center gap-2 rounded-lg border border-[#ddd6c8] bg-[#f7f4ec] px-4 py-3 text-sm text-[#80786d] shadow-sm md:flex">
              <Search className="size-4" />
              <input
                aria-label="Search content"
                placeholder={`Search ${activeMeta.label.toLowerCase()}`}
                className="w-36 bg-transparent outline-none lg:w-48"
              />
            </label>
            <button
              type="button"
              aria-label="Notifications"
              className="grid size-11 place-items-center rounded-lg border border-[#ddd6c8] bg-white text-[#6f665c] shadow-sm"
            >
              <Bell className="size-4" />
            </button>
            <div className="grid size-11 place-items-center rounded-lg bg-[#17130d] text-sm font-bold text-[#efbc4a] shadow-sm">
              KD
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              className="grid size-11 place-items-center rounded-lg border border-[#ddd6c8] bg-white text-[#6f665c] shadow-sm transition hover:text-[#17130d]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto px-5 py-8 md:px-8">
          <MobileNav activeSection={activeSection} onSelect={handleSectionSelect} />
          <AdminContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}

function BrandBlock() {
  return (
    <div className="flex h-24 items-center gap-4 border-b border-white/10 px-6">
      <div className="grid size-11 place-items-center rounded-xl bg-[#efbc4a] text-[#17130d] shadow-[0_16px_38px_-22px_rgba(239,188,74,0.9)]">
        <Palette className="size-5" />
      </div>
      <div>
        <div className="font-semibold leading-tight">Katha Digital</div>
        <div className="mt-1 text-sm text-white/48">CMS Admin</div>
      </div>
    </div>
  );
}

function SidebarNav({
  activeSection,
  onSelect,
}: {
  activeSection: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  return (
    <nav className="space-y-2 px-4 py-6">
      {menuItems.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect(item.label)}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
            activeSection === item.label
              ? "bg-[#efbc4a] text-[#17130d]"
              : "text-white/64 hover:bg-white/7 hover:text-white"
          }`}
        >
          <item.icon className="size-4" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function MobileNav({
  activeSection,
  onSelect,
}: {
  activeSection: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">
      {menuItems.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect(item.label)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
            activeSection === item.label
              ? "border-[#d7a33b] bg-[#efbc4a] text-[#17130d]"
              : "border-[#ddd6c8] bg-white text-[#6f665c]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function AdminContent({ activeSection }: { activeSection: SectionKey }) {
  if (activeSection === "Dashboard") return <DashboardSection />;
  if (activeSection === "Home Content") return <HomeContentSection />;
  if (activeSection === "About Content") return <AboutContentSection />;
  if (activeSection === "Services") return <ServicesContentSection />;
  if (activeSection === "Portfolio") return <PortfolioContentSection />;
  if (activeSection === "Productions") return <ProductionsContentSection />;
  if (activeSection === "News") return <NewsContentSection />;
  if (activeSection === "Events") return <EventsContentSection />;
  if (activeSection === "Contact Messages")
    return (
      <DataTableSection
        title="Contact Messages"
        rows={messages}
        columns={["Name", "Email", "Subject", "Status"]}
      />
    );
  if (activeSection === "Booking Inquiries")
    return (
      <DataTableSection
        title="Booking Inquiries"
        rows={bookings}
        columns={["Name", "Service", "Event Date", "Budget"]}
      />
    );
  return <SettingsSection />;
}

function DashboardSection() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/dashboard");
        const payload = (await response.json().catch(() => null)) as DashboardResponse | null;

        if (!payload) {
          throw new Error("Unable to load dashboard data.");
        }

        if (!payload.ok) {
          throw new Error(payload.error.message);
        }

        if (!response.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        if (!cancelled) {
          setData(payload.data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Unable to load dashboard data.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error} />;
  }

  if (!data) {
    return <DashboardEmpty />;
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => {
          const Icon = dashboardStatIcons[stat.label];
          return (
            <article
              key={stat.label}
              className="rounded-lg border border-[#ddd6c8] bg-white p-6 shadow-[0_12px_32px_-24px_rgba(23,19,13,0.42)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-[#746c61]">{stat.label}</div>
                  <div className="mt-4 text-4xl font-bold tracking-tight text-[#0e0c08]">
                    {stat.value}
                  </div>
                </div>
                <div className="grid size-11 place-items-center rounded-lg bg-[#f6e8c8] text-[#b98722]">
                  <Icon className="size-5" />
                </div>
              </div>
              <p className="mt-6 text-sm text-[#8c8479]">{stat.note}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.48fr]">
        <ContentSnapshot snapshots={data.snapshots} />
        <QueueCard pendingWork={data.pendingWork} />
      </section>
    </>
  );
}

function DashboardLoading() {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Published Pages", "New Messages", "Booking Leads", "Portfolio Items"].map((label) => (
          <article
            key={label}
            className="rounded-lg border border-[#ddd6c8] bg-white p-6 shadow-[0_12px_32px_-24px_rgba(23,19,13,0.42)]"
          >
            <div className="h-4 w-32 animate-pulse rounded bg-[#eee7dc]" />
            <div className="mt-5 h-10 w-16 animate-pulse rounded bg-[#eee7dc]" />
            <div className="mt-6 h-4 w-40 animate-pulse rounded bg-[#f4eee4]" />
          </article>
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.48fr]">
        <AdminCard>
          <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
          <div className="mt-6 h-56 animate-pulse rounded-lg bg-[#f4eee4]" />
        </AdminCard>
        <AdminCard>
          <div className="h-7 w-36 animate-pulse rounded bg-[#eee7dc]" />
          <div className="mt-6 h-32 animate-pulse rounded-lg bg-[#f4eee4]" />
        </AdminCard>
      </section>
    </>
  );
}

function DashboardError({ message }: { message: string }) {
  return (
    <AdminCard>
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-light">Dashboard unavailable</h2>
        <p className="mt-3 text-sm leading-6 text-[#746c61]">{message}</p>
      </div>
    </AdminCard>
  );
}

function DashboardEmpty() {
  return (
    <AdminCard>
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-light">No dashboard data yet</h2>
        <p className="mt-3 text-sm leading-6 text-[#746c61]">
          CMS records will appear here after content is available in the database.
        </p>
      </div>
    </AdminCard>
  );
}

function HomeContentSection() {
  const [content, setContent] = useState<HomeContentValue | null>(null);
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHomeContent() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/home-content");
        const payload = (await response.json()) as {
          ok: boolean;
          data?: {
            content: HomeContentValue;
            status: "draft" | "published" | "archived";
            mediaOptions: string[];
          };
          error?: { message: string };
        };

        if (!response.ok || !payload.ok || !payload.data) {
          throw new Error(payload.error?.message ?? "Unable to load home content.");
        }

        if (!cancelled) {
          setContent(payload.data.content);
          setStatus(payload.data.status);
          setMediaOptions(payload.data.mediaOptions);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load home content.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadHomeContent();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateContent(mutator: (draft: HomeContentValue) => void) {
    setContent((current) => {
      if (!current) return current;
      const next = structuredClone(current) as HomeContentValue;
      mutator(next);
      return next;
    });
  }

  async function handleSave() {
    if (!content) return;

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/home-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, content }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { content: HomeContentValue; status: "draft" | "published" | "archived" };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save home content.");
      }

      setContent(payload.data.content);
      setStatus(payload.data.status);
      setMessage("Home content saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save home content.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-52 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-lg bg-[#f4eee4]" />
          ))}
        </div>
      </AdminCard>
    );
  }

  if (error && !content) {
    return (
      <AdminCard>
        <h2 className="font-display text-3xl font-light">Home Content</h2>
        <p className="mt-3 text-sm leading-6 text-[#9b4b35]">{error}</p>
      </AdminCard>
    );
  }

  if (!content) return null;

  return (
    <AdminCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-light">Homepage Content</h2>
          <p className="mt-2 text-sm text-[#746c61]">
            Edit the singleton homepage content used by the public home page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="size-4" />
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {(message || error) && (
        <div
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            error
              ? "border-[#edd8d1] bg-[#fff7f4] text-[#9b4b35]"
              : "border-[#d8c79d] bg-[#fff9eb] text-[#856322]"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <HomeSelect
          label="Status"
          value={status}
          options={["draft", "published", "archived"]}
          onChange={(value) => setStatus(value as "draft" | "published" | "archived")}
        />
        <HomeMediaSelect
          label="Hero Image"
          value={content.heroImg}
          options={mediaOptions}
          onChange={(value) => updateContent((draft) => void (draft.heroImg = value))}
        />
        <HomeInput
          label="Metadata Title"
          value={content.metadata.title}
          onChange={(value) => updateContent((draft) => void (draft.metadata.title = value))}
        />
        <HomeInput
          label="Open Graph Title"
          value={content.metadata.openGraph.title}
          onChange={(value) =>
            updateContent((draft) => void (draft.metadata.openGraph.title = value))
          }
        />
        <HomeTextarea
          label="Metadata Description"
          value={content.metadata.description}
          onChange={(value) => updateContent((draft) => void (draft.metadata.description = value))}
        />
        <HomeTextarea
          label="Open Graph Description"
          value={content.metadata.openGraph.description}
          onChange={(value) =>
            updateContent((draft) => void (draft.metadata.openGraph.description = value))
          }
        />
        <HomeInput
          label="Hero Eyebrow"
          value={content.eyebrow}
          onChange={(value) => updateContent((draft) => void (draft.eyebrow = value))}
        />
        <HomeInput
          label="Hero Alt"
          value={content.heroAlt}
          onChange={(value) => updateContent((draft) => void (draft.heroAlt = value))}
        />
        <HomeTextarea
          label="Hero Title"
          value={content.title}
          onChange={(value) => updateContent((draft) => void (draft.title = value))}
        />
        <HomeTextarea
          label="Hero Subtitle"
          value={content.subtitle}
          onChange={(value) => updateContent((draft) => void (draft.subtitle = value))}
        />
        <HomeInput
          label="Hero Side Label"
          value={content.sideLabel}
          onChange={(value) => updateContent((draft) => void (draft.sideLabel = value))}
        />
        <HomeMediaSelect
          label="Hidden Image"
          value={content.hiddenImage.src}
          options={mediaOptions}
          onChange={(value) => updateContent((draft) => void (draft.hiddenImage.src = value))}
        />
      </div>

      <HomeSubsection title="Hero Actions">
        {content.actions.map((action, index) => (
          <div key={action.variant} className="grid gap-4 md:grid-cols-2">
            <HomeInput
              label={`Action ${index + 1} Label`}
              value={action.label}
              onChange={(value) =>
                updateContent((draft) => void (draft.actions[index].label = value))
              }
            />
            <HomeInput
              label={`Action ${index + 1} Link`}
              value={action.href}
              onChange={(value) =>
                updateContent((draft) => void (draft.actions[index].href = value))
              }
            />
          </div>
        ))}
      </HomeSubsection>

      <HomeSubsection title="Metrics">
        {content.metrics.map((metric, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-2">
            <HomeInput
              label={`Metric ${index + 1} Number`}
              value={metric.n}
              onChange={(value) => updateContent((draft) => void (draft.metrics[index].n = value))}
            />
            <HomeInput
              label={`Metric ${index + 1} Label`}
              value={metric.l}
              onChange={(value) => updateContent((draft) => void (draft.metrics[index].l = value))}
            />
          </div>
        ))}
      </HomeSubsection>

      <HomeSubsection title="Section Copy">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Who We Are Eyebrow"
            value={content.whoWeAre.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.whoWeAre.eyebrow = value))}
          />
          <HomeInput
            label="Who We Are Emphasis"
            value={content.whoWeAre.emphasis}
            onChange={(value) => updateContent((draft) => void (draft.whoWeAre.emphasis = value))}
          />
          <HomeTextarea
            label="Who We Are Title"
            value={content.whoWeAre.title}
            onChange={(value) => updateContent((draft) => void (draft.whoWeAre.title = value))}
          />
          <HomeTextarea
            label="Who We Are Subtitle"
            value={content.whoWeAre.subtitle}
            onChange={(value) => updateContent((draft) => void (draft.whoWeAre.subtitle = value))}
          />
          <HomeSectionFields
            label="Services"
            section={content.servicesSection}
            onChange={(section) => updateContent((draft) => void (draft.servicesSection = section))}
          />
          <HomeSectionFields
            label="Selected Work"
            section={content.selectedWorkSection}
            onChange={(section) =>
              updateContent((draft) => void (draft.selectedWorkSection = section))
            }
          />
          <HomeSectionFields
            label="Productions"
            section={content.productionsSection}
            onChange={(section) =>
              updateContent((draft) => void (draft.productionsSection = section))
            }
          />
          <HomeSectionFields
            label="News"
            section={content.newsSection}
            onChange={(section) => updateContent((draft) => void (draft.newsSection = section))}
          />
        </div>
      </HomeSubsection>

      <HomeSubsection title="YouTube Films">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="YouTube Eyebrow"
            value={content.youtubeSection.eyebrow}
            onChange={(value) =>
              updateContent((draft) => void (draft.youtubeSection.eyebrow = value))
            }
          />
          <HomeInput
            label="YouTube Title"
            value={content.youtubeSection.title}
            onChange={(value) =>
              updateContent((draft) => void (draft.youtubeSection.title = value))
            }
          />
          <HomeInput
            label="YouTube Emphasis"
            value={content.youtubeSection.emphasis}
            onChange={(value) =>
              updateContent((draft) => void (draft.youtubeSection.emphasis = value))
            }
          />
          <HomeInput
            label="YouTube Suffix"
            value={content.youtubeSection.suffix}
            onChange={(value) =>
              updateContent((draft) => void (draft.youtubeSection.suffix = value))
            }
          />
          {content.youtubeSection.videos.map((video, index) => (
            <div key={index} className="grid gap-4 md:col-span-2 md:grid-cols-2">
              <HomeInput
                label={`Video ${index + 1} ID`}
                value={video.id}
                onChange={(value) =>
                  updateContent((draft) => void (draft.youtubeSection.videos[index].id = value))
                }
              />
              <HomeInput
                label={`Video ${index + 1} Title`}
                value={video.title}
                onChange={(value) =>
                  updateContent((draft) => void (draft.youtubeSection.videos[index].title = value))
                }
              />
            </div>
          ))}
        </div>
      </HomeSubsection>

      <HomeSubsection title="Testimonials & CTA">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Testimonials Eyebrow"
            value={content.testimonialsSection.eyebrow}
            onChange={(value) =>
              updateContent((draft) => void (draft.testimonialsSection.eyebrow = value))
            }
          />
          <HomeInput
            label="Testimonials Title"
            value={content.testimonialsSection.title}
            onChange={(value) =>
              updateContent((draft) => void (draft.testimonialsSection.title = value))
            }
          />
          <HomeInput
            label="Testimonials Emphasis"
            value={content.testimonialsSection.emphasis}
            onChange={(value) =>
              updateContent((draft) => void (draft.testimonialsSection.emphasis = value))
            }
          />
          <HomeInput
            label="Testimonials Suffix"
            value={content.testimonialsSection.suffix}
            onChange={(value) =>
              updateContent((draft) => void (draft.testimonialsSection.suffix = value))
            }
          />
          <HomeInput
            label="CTA Eyebrow"
            value={content.cta.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.cta.eyebrow = value))}
          />
          <HomeInput
            label="CTA Button Text"
            value={content.cta.buttonText}
            onChange={(value) => updateContent((draft) => void (draft.cta.buttonText = value))}
          />
          <HomeTextarea
            label="CTA Title"
            value={content.cta.title}
            onChange={(value) => updateContent((draft) => void (draft.cta.title = value))}
          />
          <HomeTextarea
            label="CTA Subtitle"
            value={content.cta.subtitle}
            onChange={(value) => updateContent((draft) => void (draft.cta.subtitle = value))}
          />
        </div>
      </HomeSubsection>

      <HomeSubsection title="Visibility">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(content.sections) as Array<keyof HomeContentValue["sections"]>).map(
            (section) => (
              <HomeCheckbox
                key={section}
                label={section}
                checked={content.sections[section]}
                onChange={(checked) =>
                  updateContent((draft) => void (draft.sections[section] = checked))
                }
              />
            ),
          )}
        </div>
      </HomeSubsection>
    </AdminCard>
  );
}

function HomeSubsection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="mt-8 border-t border-[#e4ded3] pt-6">
      <h3 className="font-display text-2xl font-light">{title}</h3>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

function HomeInput({
  label,
  onChange,
  value,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d68]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-[#ddd6c8] bg-[#faf8f2] px-4 py-3 text-sm text-[#2d271f] outline-none transition focus:border-[#d7a33b]"
      />
    </label>
  );
}

function HomeTextarea({
  label,
  onChange,
  value,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d68]">
        {label}
      </span>
      <textarea
        value={value}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-lg border border-[#ddd6c8] bg-[#faf8f2] px-4 py-3 text-sm text-[#2d271f] outline-none transition focus:border-[#d7a33b]"
      />
    </label>
  );
}

function HomeSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d68]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-[#ddd6c8] bg-[#faf8f2] px-4 py-3 text-sm text-[#2d271f] outline-none transition focus:border-[#d7a33b]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function HomeMediaSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <HomeSelect
      label={label}
      value={value}
      options={options.includes(value) ? options : [value, ...options]}
      onChange={onChange}
    />
  );
}

function HomeCheckbox({
  checked,
  label,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 text-sm font-semibold text-[#3b352c]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[#d7a33b]"
      />
      {label}
    </label>
  );
}

type EditableSection =
  | HomeContentValue["servicesSection"]
  | HomeContentValue["selectedWorkSection"]
  | HomeContentValue["productionsSection"]
  | HomeContentValue["newsSection"];

function HomeSectionFields<T extends EditableSection>({
  label,
  onChange,
  section,
}: {
  label: string;
  section: T;
  onChange: (section: T) => void;
}) {
  function update(key: keyof T, value: string | number) {
    onChange({ ...section, [key]: value } as T);
  }

  return (
    <div className="space-y-4 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 md:col-span-2">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98722]">{label}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <HomeInput
          label={`${label} Eyebrow`}
          value={section.eyebrow}
          onChange={(value) => update("eyebrow", value)}
        />
        <HomeInput
          label={`${label} Title`}
          value={section.title}
          onChange={(value) => update("title", value)}
        />
        <HomeInput
          label={`${label} Emphasis`}
          value={section.emphasis}
          onChange={(value) => update("emphasis", value)}
        />
        <HomeInput
          label={`${label} Suffix`}
          value={section.suffix}
          onChange={(value) => update("suffix", value)}
        />
        {"subtitle" in section && (
          <HomeTextarea
            label={`${label} Subtitle`}
            value={section.subtitle}
            onChange={(value) => update("subtitle" as keyof T, value)}
          />
        )}
        {"cardLinkText" in section && (
          <HomeInput
            label={`${label} Card Link Text`}
            value={section.cardLinkText}
            onChange={(value) => update("cardLinkText" as keyof T, value)}
          />
        )}
        {"linkText" in section && (
          <HomeInput
            label={`${label} Link Text`}
            value={section.linkText}
            onChange={(value) => update("linkText" as keyof T, value)}
          />
        )}
        {"href" in section && (
          <HomeInput
            label={`${label} Link`}
            value={section.href}
            onChange={(value) => update("href" as keyof T, value)}
          />
        )}
        <HomeInput
          label={`${label} Limit`}
          value={section.limit}
          onChange={(value) => update("limit", Number(value))}
        />
      </div>
    </div>
  );
}

function AboutContentSection() {
  const [content, setContent] = useState<AboutContentValue | null>(null);
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAboutContent() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/about-content");
        const payload = (await response.json()) as {
          ok: boolean;
          data?: {
            content: AboutContentValue;
            status: "draft" | "published" | "archived";
            mediaOptions: string[];
          };
          error?: { message: string };
        };

        if (!response.ok || !payload.ok || !payload.data) {
          throw new Error(payload.error?.message ?? "Unable to load about content.");
        }

        if (!cancelled) {
          setContent(payload.data.content);
          setStatus(payload.data.status);
          setMediaOptions(payload.data.mediaOptions);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Unable to load about content.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAboutContent();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateContent(mutator: (draft: AboutContentValue) => void) {
    setContent((current) => {
      if (!current) return current;
      const next = structuredClone(current) as AboutContentValue;
      mutator(next);
      return next;
    });
  }

  async function handleSave() {
    if (!content) return;

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/about-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, content }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { content: AboutContentValue; status: "draft" | "published" | "archived" };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save about content.");
      }

      setContent(payload.data.content);
      setStatus(payload.data.status);
      setMessage("About content saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save about content.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-lg bg-[#f4eee4]" />
          ))}
        </div>
      </AdminCard>
    );
  }

  if (error && !content) {
    return (
      <AdminCard>
        <h2 className="font-display text-3xl font-light">About Content</h2>
        <p className="mt-3 text-sm leading-6 text-[#9b4b35]">{error}</p>
      </AdminCard>
    );
  }

  if (!content) return null;

  return (
    <AdminCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-light">About Content</h2>
          <p className="mt-2 text-sm text-[#746c61]">
            Edit the singleton about page content used by the public About page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="size-4" />
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {(message || error) && (
        <div
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            error
              ? "border-[#edd8d1] bg-[#fff7f4] text-[#9b4b35]"
              : "border-[#d8c79d] bg-[#fff9eb] text-[#856322]"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <HomeSelect
          label="Status"
          value={status}
          options={["draft", "published", "archived"]}
          onChange={(value) => setStatus(value as "draft" | "published" | "archived")}
        />
        <HomeInput
          label="Metadata Title"
          value={content.metadata.title}
          onChange={(value) => updateContent((draft) => void (draft.metadata.title = value))}
        />
        <HomeTextarea
          label="Metadata Description"
          value={content.metadata.description}
          onChange={(value) => updateContent((draft) => void (draft.metadata.description = value))}
        />
        <HomeTextarea
          label="Open Graph Description"
          value={content.metadata.openGraph.description}
          onChange={(value) =>
            updateContent((draft) => void (draft.metadata.openGraph.description = value))
          }
        />
        <HomeInput
          label="Open Graph Title"
          value={content.metadata.openGraph.title}
          onChange={(value) =>
            updateContent((draft) => void (draft.metadata.openGraph.title = value))
          }
        />
      </div>

      <HomeSubsection title="Hero">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Hero Eyebrow"
            value={content.hero.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.hero.eyebrow = value))}
          />
          <HomeInput
            label="Hero Title"
            value={content.hero.title}
            onChange={(value) => updateContent((draft) => void (draft.hero.title = value))}
          />
          <HomeInput
            label="Hero Emphasis"
            value={content.hero.emphasis}
            onChange={(value) => updateContent((draft) => void (draft.hero.emphasis = value))}
          />
          <HomeTextarea
            label="Hero Subtitle"
            value={content.hero.subtitle}
            onChange={(value) => updateContent((draft) => void (draft.hero.subtitle = value))}
          />
        </div>
      </HomeSubsection>

      <HomeSubsection title="Studio">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Studio Eyebrow"
            value={content.studio.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.studio.eyebrow = value))}
          />
          <HomeMediaSelect
            label="Studio Image"
            value={content.studio.image}
            options={mediaOptions}
            onChange={(value) => updateContent((draft) => void (draft.studio.image = value))}
          />
          <HomeTextarea
            label="Studio Title"
            value={content.studio.title}
            onChange={(value) => updateContent((draft) => void (draft.studio.title = value))}
          />
          <HomeInput
            label="Studio Image Alt"
            value={content.studio.imageAlt}
            onChange={(value) => updateContent((draft) => void (draft.studio.imageAlt = value))}
          />
          <HomeInput
            label="Studio Image Badge"
            value={content.studio.imageBadge}
            onChange={(value) => updateContent((draft) => void (draft.studio.imageBadge = value))}
          />
          {content.studio.paragraphs.map((paragraph, index) => (
            <HomeTextarea
              key={index}
              label={`Studio Paragraph ${index + 1}`}
              value={paragraph}
              onChange={(value) =>
                updateContent((draft) => void (draft.studio.paragraphs[index] = value))
              }
            />
          ))}
          {content.studio.steps.map(([num, label], index) => (
            <div key={index} className="grid gap-4 md:col-span-2 md:grid-cols-2">
              <HomeInput
                label={`Step ${index + 1} Number`}
                value={num}
                onChange={(value) =>
                  updateContent((draft) => void (draft.studio.steps[index][0] = value))
                }
              />
              <HomeInput
                label={`Step ${index + 1} Label`}
                value={label}
                onChange={(value) =>
                  updateContent((draft) => void (draft.studio.steps[index][1] = value))
                }
              />
            </div>
          ))}
        </div>
      </HomeSubsection>

      <HomeSubsection title="Principles">
        {content.principles.map((principle, index) => (
          <div
            key={principle.eyebrow}
            className="grid gap-4 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 md:grid-cols-2"
          >
            <HomeSelect
              label={`Principle ${index + 1} Icon`}
              value={principle.iconKey}
              options={["Eye", "Target", "Sparkles"]}
              onChange={(value) =>
                updateContent(
                  (draft) =>
                    void (draft.principles[index].iconKey = value as "Eye" | "Target" | "Sparkles"),
                )
              }
            />
            <HomeInput
              label={`Principle ${index + 1} Eyebrow`}
              value={principle.eyebrow}
              onChange={(value) =>
                updateContent((draft) => void (draft.principles[index].eyebrow = value))
              }
            />
            <HomeTextarea
              label={`Principle ${index + 1} Title`}
              value={principle.title}
              onChange={(value) =>
                updateContent((draft) => void (draft.principles[index].title = value))
              }
            />
            <HomeTextarea
              label={`Principle ${index + 1} Text`}
              value={principle.text}
              onChange={(value) =>
                updateContent((draft) => void (draft.principles[index].text = value))
              }
            />
          </div>
        ))}
      </HomeSubsection>

      <HomeSubsection title="Founder">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Founder Eyebrow"
            value={content.founder.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.founder.eyebrow = value))}
          />
          <HomeMediaSelect
            label="Founder Image"
            value={content.founder.image}
            options={mediaOptions}
            onChange={(value) => updateContent((draft) => void (draft.founder.image = value))}
          />
          <HomeInput
            label="Founder Title"
            value={content.founder.title}
            onChange={(value) => updateContent((draft) => void (draft.founder.title = value))}
          />
          <HomeInput
            label="Founder Emphasis"
            value={content.founder.emphasis}
            onChange={(value) => updateContent((draft) => void (draft.founder.emphasis = value))}
          />
          <HomeInput
            label="Founder Suffix"
            value={content.founder.suffix}
            onChange={(value) => updateContent((draft) => void (draft.founder.suffix = value))}
          />
          <HomeInput
            label="Founder Image Alt"
            value={content.founder.imageAlt}
            onChange={(value) => updateContent((draft) => void (draft.founder.imageAlt = value))}
          />
          <HomeTextarea
            label="Founder Quote"
            value={content.founder.quote}
            onChange={(value) => updateContent((draft) => void (draft.founder.quote = value))}
          />
          <HomeInput
            label="Founder Name"
            value={content.founder.name}
            onChange={(value) => updateContent((draft) => void (draft.founder.name = value))}
          />
          <HomeInput
            label="Founder Role"
            value={content.founder.role}
            onChange={(value) => updateContent((draft) => void (draft.founder.role = value))}
          />
          {content.founder.bullets.map((bullet, index) => (
            <HomeInput
              key={index}
              label={`Founder Bullet ${index + 1}`}
              value={bullet}
              onChange={(value) =>
                updateContent((draft) => void (draft.founder.bullets[index] = value))
              }
            />
          ))}
        </div>
      </HomeSubsection>

      <HomeSubsection title="Team">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="Team Eyebrow"
            value={content.team.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.team.eyebrow = value))}
          />
          <HomeInput
            label="Team Title"
            value={content.team.title}
            onChange={(value) => updateContent((draft) => void (draft.team.title = value))}
          />
          <HomeInput
            label="Team Emphasis"
            value={content.team.emphasis}
            onChange={(value) => updateContent((draft) => void (draft.team.emphasis = value))}
          />
          <HomeInput
            label="Team Suffix"
            value={content.team.suffix}
            onChange={(value) => updateContent((draft) => void (draft.team.suffix = value))}
          />
          <HomeTextarea
            label="Team Subtitle"
            value={content.team.subtitle}
            onChange={(value) => updateContent((draft) => void (draft.team.subtitle = value))}
          />
        </div>
        {content.team.members.map((member, index) => (
          <div
            key={member.name}
            className="mt-5 grid gap-4 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 md:grid-cols-2"
          >
            <HomeInput
              label={`Team Member ${index + 1} Name`}
              value={member.name}
              onChange={(value) =>
                updateContent((draft) => void (draft.team.members[index].name = value))
              }
            />
            <HomeInput
              label={`Team Member ${index + 1} Role`}
              value={member.role}
              onChange={(value) =>
                updateContent((draft) => void (draft.team.members[index].role = value))
              }
            />
            <HomeMediaSelect
              label={`Team Member ${index + 1} Image`}
              value={member.image}
              options={mediaOptions}
              onChange={(value) =>
                updateContent((draft) => void (draft.team.members[index].image = value))
              }
            />
            <HomeInput
              label={`Team Member ${index + 1} Position`}
              value={member.position}
              onChange={(value) =>
                updateContent((draft) => void (draft.team.members[index].position = value))
              }
            />
            <HomeTextarea
              label={`Team Member ${index + 1} Note`}
              value={member.note}
              onChange={(value) =>
                updateContent((draft) => void (draft.team.members[index].note = value))
              }
            />
          </div>
        ))}
      </HomeSubsection>

      <HomeSubsection title="CTA & Visibility">
        <div className="grid gap-5 md:grid-cols-2">
          <HomeInput
            label="CTA Eyebrow"
            value={content.cta.eyebrow}
            onChange={(value) => updateContent((draft) => void (draft.cta.eyebrow = value))}
          />
          <HomeInput
            label="CTA Button Text"
            value={content.cta.buttonText}
            onChange={(value) => updateContent((draft) => void (draft.cta.buttonText = value))}
          />
          <HomeTextarea
            label="CTA Title"
            value={content.cta.title}
            onChange={(value) => updateContent((draft) => void (draft.cta.title = value))}
          />
          <HomeTextarea
            label="CTA Subtitle"
            value={content.cta.subtitle}
            onChange={(value) => updateContent((draft) => void (draft.cta.subtitle = value))}
          />
          <HomeInput
            label="CTA Link"
            value={content.cta.to}
            onChange={(value) => updateContent((draft) => void (draft.cta.to = value))}
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(content.sections) as Array<keyof AboutContentValue["sections"]>).map(
            (section) => (
              <HomeCheckbox
                key={section}
                label={section}
                checked={content.sections[section]}
                onChange={(checked) =>
                  updateContent((draft) => void (draft.sections[section] = checked))
                }
              />
            ),
          )}
        </div>
      </HomeSubsection>
    </AdminCard>
  );
}

type PortfolioDraft = Omit<PortfolioProjectValue, "id" | "publishedAt" | "updatedAt"> & {
  id?: string;
};

type ServiceDraft = Omit<ServiceValue, "id" | "publishedAt" | "updatedAt"> & {
  id?: string;
};

type ServicesAdminResponse =
  | {
      ok: true;
      data: {
        services: ServiceValue[];
        mediaOptions: string[];
      };
    }
  | {
      ok: false;
      error: { message: string };
    };

function createServiceDraft(displayOrder: number): ServiceDraft {
  return {
    title: "",
    slug: "",
    short: "",
    image: "/katha-media/wedding-traditional-embrace.jpeg",
    position: "object-center",
    status: "draft",
    featured: false,
    displayOrder,
  };
}

function ServicesContentSection() {
  const [services, setServices] = useState<ServiceValue[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [draft, setDraft] = useState<ServiceDraft>(() => createServiceDraft(0));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [draggedId, setDraggedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !query || [service.title, service.short].join(" ").toLowerCase().includes(query);
      const matchesFilter = filter === "All" || service.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search, services]);

  async function loadServices() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/services");
      const payload = (await response.json()) as ServicesAdminResponse;

      if (!response.ok) {
        throw new Error("Unable to load services.");
      }

      if (!payload.ok) {
        throw new Error(payload.error.message);
      }

      setServices(payload.data.services);
      setMediaOptions(payload.data.mediaOptions);
      setDraft((current) =>
        current.id ? current : createServiceDraft(payload.data.services.length),
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load services.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadServices();
  }, []);

  function updateDraft(mutator: (next: ServiceDraft) => void) {
    setDraft((current) => {
      const next = structuredClone(current) as ServiceDraft;
      mutator(next);
      return next;
    });
  }

  function startNewService() {
    setDraft(createServiceDraft(services.length));
    setMessage("");
    setError("");
  }

  function editService(service: ServiceValue) {
    setDraft({ ...service });
    setMessage("");
    setError("");
  }

  async function saveService() {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(draft.id);
      const response = await fetch(
        isEditing
          ? `/api/admin/services/${encodeURIComponent(draft.id ?? "")}`
          : "/api/admin/services",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { service: ServiceValue };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save service.");
      }

      const savedService = payload.data.service;
      setServices((current) => {
        const next = current.filter((service) => service.id !== savedService.id);
        next.push(savedService);
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      });
      setDraft({ ...savedService });
      setMessage("Service saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save service.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteService(service: ServiceValue) {
    const confirmed = window.confirm(`Delete "${service.title}" from Services?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/services/${encodeURIComponent(service.id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: { message: string };
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Unable to delete service.");
      }

      setServices((current) => current.filter((item) => item.id !== service.id));
      if (draft.id === service.id) {
        setDraft(createServiceDraft(Math.max(services.length - 1, 0)));
      }
      setMessage("Service deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete service.");
    }
  }

  async function reorderServices(sourceId: string, targetId: string) {
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = services.findIndex((service) => service.id === sourceId);
    const targetIndex = services.findIndex((service) => service.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...services];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    setServices(next.map((service, index) => ({ ...service, displayOrder: index })));
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((service) => service.id) }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { services: ServiceValue[] };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to reorder services.");
      }

      setServices(payload.data.services);
      setMessage("Service order saved.");
    } catch (reorderError) {
      setError(
        reorderError instanceof Error ? reorderError.message : "Unable to reorder services.",
      );
      void loadServices();
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_1fr]">
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
          <div>
            <h2 className="font-display text-3xl font-light">Services</h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Manage the services shown on the public Services page.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewService}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#17130d] px-4 py-3 text-sm font-bold text-[#efbc4a] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
          >
            <Plus className="size-4" />
            Add Service
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <HomeInput label="Search" value={search} onChange={setSearch} />
          <HomeSelect
            label="Filter"
            value={filter}
            options={["All", "published", "draft", "archived"]}
            onChange={setFilter}
          />
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[#d8c79d] bg-[#fbf3dd] px-4 py-3 text-sm font-semibold text-[#856322]">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-lg border border-[#e8d4cd] bg-[#fff7f4] px-4 py-3 text-sm font-semibold text-[#9b4b35]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {filteredServices.length === 0 ? (
            <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5 text-sm text-[#746c61]">
              No services match this search.
            </div>
          ) : (
            filteredServices.map((service) => (
              <article
                key={service.id}
                draggable
                onDragStart={() => setDraggedId(service.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => void reorderServices(draggedId, service.id)}
                className={`rounded-lg border p-3 transition ${
                  draft.id === service.id
                    ? "border-[#d7a33b] bg-[#fff8e7]"
                    : "border-[#e4ded3] bg-[#faf8f2] hover:border-[#d7a33b]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => editService(service)}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={service.image} alt="" className="h-14 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[#211d16]">
                        {service.title}
                      </div>
                      <div className="mt-1 text-xs text-[#746c61]">{service.status}</div>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editService(service)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(service)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light">
              {draft.id ? "Edit Service" : "Add Service"}
            </h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Keep service copy, imagery, display order, and publishing status accurate.
            </p>
          </div>
          <button
            type="button"
            onClick={saveService}
            disabled={isSaving}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:opacity-60"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <HomeSubsection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Service Title"
              value={draft.title}
              onChange={(value) => updateDraft((next) => void (next.title = value))}
            />
            <HomeInput
              label="Display Order"
              value={draft.displayOrder}
              onChange={(value) =>
                updateDraft((next) => void (next.displayOrder = Number.parseInt(value, 10) || 0))
              }
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Service Details">
          <HomeTextarea
            label="Short Description"
            value={draft.short}
            onChange={(value) => updateDraft((next) => void (next.short = value))}
          />
        </HomeSubsection>

        <HomeSubsection title="Images & Icons">
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-3">
              <img
                src={draft.image}
                alt=""
                className={`aspect-[16/10] w-full rounded-md object-cover ${draft.position}`}
              />
            </div>
            <div className="grid gap-5">
              <HomeMediaSelect
                label="Service Image"
                value={draft.image}
                options={mediaOptions}
                onChange={(value) => updateDraft((next) => void (next.image = value))}
              />
              <HomeInput
                label="Image Position"
                value={draft.position}
                onChange={(value) => updateDraft((next) => void (next.position = value))}
              />
            </div>
          </div>
        </HomeSubsection>

        <HomeSubsection title="Display Settings">
          <HomeCheckbox
            label="Featured Service"
            checked={draft.featured}
            onChange={(checked) => updateDraft((next) => void (next.featured = checked))}
          />
        </HomeSubsection>

        <HomeSubsection title="Publish Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Status"
              value={draft.status}
              options={["draft", "published", "archived"]}
              onChange={(value) =>
                updateDraft((next) => void (next.status = value as ServiceValue["status"]))
              }
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "published"))}
              className="rounded-md border border-[#d8c79d] bg-[#fbf3dd] px-3 py-2 text-xs font-bold text-[#856322]"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "draft"))}
              className="rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
            >
              Unpublish
            </button>
          </div>
        </HomeSubsection>
      </AdminCard>
    </div>
  );
}

type ProductionDraft = Omit<ProductionValue, "id" | "publishedAt" | "updatedAt"> & {
  id?: string;
};

type ProductionsAdminResponse =
  | {
      ok: true;
      data: {
        productions: ProductionValue[];
        mediaOptions: string[];
      };
    }
  | {
      ok: false;
      error: { message: string };
    };

function createProductionDraft(displayOrder: number): ProductionDraft {
  return {
    title: "",
    slug: "",
    type: "",
    desc: "",
    description: "",
    image: "",
    position: "object-center",
    youtubeId: "",
    subscribeUrl: "https://youtube.com",
    destinations: [],
    episodes: [],
    status: "draft",
    featured: false,
    displayOrder,
  };
}

function emptyProductionEpisode(index: number): ProductionEpisodeValue {
  return {
    num: `EP ${String(index + 1).padStart(2, "0")}`,
    title: "",
    guest: "",
    date: "",
  };
}

function ProductionsContentSection() {
  const [productions, setProductions] = useState<ProductionValue[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [draft, setDraft] = useState<ProductionDraft>(() => createProductionDraft(0));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [draggedId, setDraggedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredProductions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return productions.filter((production) => {
      const matchesSearch =
        !query ||
        [production.title, production.type, production.desc, production.description]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        filter === "All" || production.status === filter || production.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, productions, search]);

  const productionTypeOptions = useMemo(() => {
    const types = [...new Set(productions.map((production) => production.type).filter(Boolean))];
    return draft.type && !types.includes(draft.type) ? [draft.type, ...types] : types;
  }, [draft.type, productions]);

  async function loadProductions() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/productions");
      const payload = (await response.json()) as ProductionsAdminResponse;

      if (!response.ok) {
        throw new Error("Unable to load productions.");
      }

      if (!payload.ok) {
        throw new Error(payload.error.message);
      }

      setProductions(payload.data.productions);
      setMediaOptions(payload.data.mediaOptions);
      setDraft((current) =>
        current.id ? current : createProductionDraft(payload.data.productions.length),
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load productions.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProductions();
  }, []);

  function updateDraft(mutator: (next: ProductionDraft) => void) {
    setDraft((current) => {
      const next = structuredClone(current) as ProductionDraft;
      mutator(next);
      return next;
    });
  }

  function startNewProduction() {
    setDraft(createProductionDraft(productions.length));
    setMessage("");
    setError("");
  }

  function editProduction(production: ProductionValue) {
    setDraft({ ...production });
    setMessage("");
    setError("");
  }

  async function saveProduction() {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(draft.id);
      const response = await fetch(
        isEditing
          ? `/api/admin/productions/${encodeURIComponent(draft.id ?? "")}`
          : "/api/admin/productions",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { production: ProductionValue };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save production.");
      }

      const savedProduction = payload.data.production;
      setProductions((current) => {
        const next = current.filter((production) => production.id !== savedProduction.id);
        next.push(savedProduction);
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      });
      setDraft({ ...savedProduction });
      setMessage("Production saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save production.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProduction(production: ProductionValue) {
    const confirmed = window.confirm(`Delete "${production.title}" from Productions?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/productions/${encodeURIComponent(production.id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: { message: string };
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Unable to delete production.");
      }

      setProductions((current) => current.filter((item) => item.id !== production.id));
      if (draft.id === production.id) {
        setDraft(createProductionDraft(Math.max(productions.length - 1, 0)));
      }
      setMessage("Production deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete production.");
    }
  }

  async function reorderProductions(sourceId: string, targetId: string) {
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = productions.findIndex((production) => production.id === sourceId);
    const targetIndex = productions.findIndex((production) => production.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...productions];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    setProductions(next.map((production, index) => ({ ...production, displayOrder: index })));
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/productions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((production) => production.id) }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { productions: ProductionValue[] };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to reorder productions.");
      }

      setProductions(payload.data.productions);
      setMessage("Production order saved.");
    } catch (reorderError) {
      setError(
        reorderError instanceof Error ? reorderError.message : "Unable to reorder productions.",
      );
      void loadProductions();
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_1fr]">
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
          <div>
            <h2 className="font-display text-3xl font-light">Productions</h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Manage original productions, videos, episodes, and upcoming formats.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewProduction}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#17130d] px-4 py-3 text-sm font-bold text-[#efbc4a] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
          >
            <Plus className="size-4" />
            Add Production
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <HomeInput label="Search" value={search} onChange={setSearch} />
          <HomeSelect
            label="Filter"
            value={filter}
            options={[
              "All",
              "published",
              "draft",
              "archived",
              ...productionTypeOptions.filter((type) => type !== "All"),
            ]}
            onChange={setFilter}
          />
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[#d8c79d] bg-[#fbf3dd] px-4 py-3 text-sm font-semibold text-[#856322]">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-lg border border-[#e8d4cd] bg-[#fff7f4] px-4 py-3 text-sm font-semibold text-[#9b4b35]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {filteredProductions.length === 0 ? (
            <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5 text-sm text-[#746c61]">
              No productions match this search.
            </div>
          ) : (
            filteredProductions.map((production) => (
              <article
                key={production.id}
                draggable
                onDragStart={() => setDraggedId(production.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => void reorderProductions(draggedId, production.id)}
                className={`rounded-lg border p-3 transition ${
                  draft.id === production.id
                    ? "border-[#d7a33b] bg-[#fff8e7]"
                    : "border-[#e4ded3] bg-[#faf8f2] hover:border-[#d7a33b]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => editProduction(production)}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-14 w-16 shrink-0 place-items-center rounded-md bg-[#17130d] text-[#efbc4a]">
                      <Video className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[#211d16]">
                        {production.title}
                      </div>
                      <div className="mt-1 text-xs text-[#746c61]">
                        {production.type} / {production.status}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editProduction(production)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduction(production)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light">
              {draft.id ? "Edit Production" : "Add Production"}
            </h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Keep production copy, episodes, videos, and publishing status aligned with the site.
            </p>
          </div>
          <button
            type="button"
            onClick={saveProduction}
            disabled={isSaving}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:opacity-60"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <HomeSubsection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Production Title"
              value={draft.title}
              onChange={(value) => updateDraft((next) => void (next.title = value))}
            />
            <HomeInput
              label="Production Type"
              value={draft.type}
              onChange={(value) => updateDraft((next) => void (next.type = value))}
            />
            <HomeInput
              label="Display Order"
              value={draft.displayOrder}
              onChange={(value) =>
                updateDraft((next) => void (next.displayOrder = Number.parseInt(value, 10) || 0))
              }
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Production Details">
          <HomeTextarea
            label="Page Description"
            value={draft.desc}
            onChange={(value) => updateDraft((next) => void (next.desc = value))}
          />
          <HomeTextarea
            label="Short Description"
            value={draft.description}
            onChange={(value) => updateDraft((next) => void (next.description = value))}
          />
        </HomeSubsection>

        <HomeSubsection title="Images & Videos">
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-3">
              {draft.youtubeId ? (
                <img
                  src={`https://i.ytimg.com/vi/${draft.youtubeId}/hqdefault.jpg`}
                  alt=""
                  className="aspect-video w-full rounded-md object-cover"
                />
              ) : draft.image ? (
                <img
                  src={draft.image}
                  alt=""
                  className={`aspect-video w-full rounded-md object-cover ${draft.position}`}
                />
              ) : (
                <div className="grid aspect-video place-items-center rounded-md bg-[#17130d] text-[#efbc4a]">
                  <Video className="size-8" />
                </div>
              )}
            </div>
            <div className="grid gap-5">
              <HomeMediaSelect
                label="Poster Image"
                value={draft.image}
                options={mediaOptions}
                onChange={(value) => updateDraft((next) => void (next.image = value))}
              />
              <HomeInput
                label="Image Position"
                value={draft.position}
                onChange={(value) => updateDraft((next) => void (next.position = value))}
              />
              <HomeInput
                label="YouTube Video ID"
                value={draft.youtubeId}
                onChange={(value) => updateDraft((next) => void (next.youtubeId = value))}
              />
              <HomeInput
                label="Subscribe Link"
                value={draft.subscribeUrl}
                onChange={(value) => updateDraft((next) => void (next.subscribeUrl = value))}
              />
            </div>
          </div>
        </HomeSubsection>

        <HomeSubsection title="Credits / Team">
          <div className="space-y-4">
            {draft.episodes.map((episode, index) => (
              <div
                key={`${episode.num}-${index}`}
                className="grid gap-4 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 md:grid-cols-2"
              >
                <HomeInput
                  label={`Episode ${index + 1} Number`}
                  value={episode.num}
                  onChange={(value) =>
                    updateDraft((next) => void (next.episodes[index].num = value))
                  }
                />
                <HomeInput
                  label={`Episode ${index + 1} Date`}
                  value={episode.date}
                  onChange={(value) =>
                    updateDraft((next) => void (next.episodes[index].date = value))
                  }
                />
                <HomeInput
                  label={`Episode ${index + 1} Title`}
                  value={episode.title}
                  onChange={(value) =>
                    updateDraft((next) => void (next.episodes[index].title = value))
                  }
                />
                <HomeInput
                  label={`Episode ${index + 1} Guest / Credit`}
                  value={episode.guest ?? ""}
                  onChange={(value) =>
                    updateDraft((next) => void (next.episodes[index].guest = value))
                  }
                />
                <button
                  type="button"
                  onClick={() => updateDraft((next) => void next.episodes.splice(index, 1))}
                  className="inline-flex w-fit items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                >
                  <Trash2 className="size-3.5" />
                  Remove Episode
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              updateDraft(
                (next) => void next.episodes.push(emptyProductionEpisode(next.episodes.length)),
              )
            }
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#ddd6c8] bg-white px-4 py-3 text-sm font-bold text-[#6f665c]"
          >
            <Plus className="size-4" />
            Add Episode
          </button>
        </HomeSubsection>

        <HomeSubsection title="Display Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Destinations"
              value={draft.destinations.join(", ")}
              onChange={(value) =>
                updateDraft(
                  (next) =>
                    void (next.destinations = value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)),
                )
              }
            />
            <HomeCheckbox
              label="Featured Production"
              checked={draft.featured}
              onChange={(checked) => updateDraft((next) => void (next.featured = checked))}
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Publish Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Status"
              value={draft.status}
              options={["draft", "published", "archived"]}
              onChange={(value) =>
                updateDraft((next) => void (next.status = value as ProductionValue["status"]))
              }
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "published"))}
              className="rounded-md border border-[#d8c79d] bg-[#fbf3dd] px-3 py-2 text-xs font-bold text-[#856322]"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "draft"))}
              className="rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
            >
              Unpublish
            </button>
          </div>
        </HomeSubsection>
      </AdminCard>
    </div>
  );
}

type NewsDraft = Omit<NewsPostValue, "id" | "publishedAt" | "updatedAt"> & {
  id?: string;
};

type NewsAdminResponse =
  | {
      ok: true;
      data: {
        posts: NewsPostValue[];
        mediaOptions: string[];
        categories: string[];
      };
    }
  | {
      ok: false;
      error: { message: string };
    };

function createNewsDraft(displayOrder: number): NewsDraft {
  return {
    title: "",
    slug: "",
    category: "Photography",
    date: "",
    author: "Editorial",
    excerpt: "",
    content: "",
    image: "/katha-media/wedding-traditional-embrace.jpeg",
    position: "object-center",
    status: "draft",
    featured: false,
    displayOrder,
  };
}

function NewsContentSection() {
  const [posts, setPosts] = useState<NewsPostValue[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [draft, setDraft] = useState<NewsDraft>(() => createNewsDraft(0));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [draggedId, setDraggedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        [post.title, post.category, post.author, post.excerpt, post.content]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter = filter === "All" || post.status === filter || post.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, posts, search]);

  async function loadNews() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/news");
      const payload = (await response.json()) as NewsAdminResponse;

      if (!response.ok) {
        throw new Error("Unable to load news posts.");
      }

      if (!payload.ok) {
        throw new Error(payload.error.message);
      }

      setPosts(payload.data.posts);
      setMediaOptions(payload.data.mediaOptions);
      setCategories(payload.data.categories);
      setDraft((current) => (current.id ? current : createNewsDraft(payload.data.posts.length)));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load news posts.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadNews();
  }, []);

  function updateDraft(mutator: (next: NewsDraft) => void) {
    setDraft((current) => {
      const next = structuredClone(current) as NewsDraft;
      mutator(next);
      return next;
    });
  }

  function startNewPost() {
    setDraft(createNewsDraft(posts.length));
    setIsPreviewOpen(false);
    setMessage("");
    setError("");
  }

  function editPost(post: NewsPostValue) {
    setDraft({ ...post });
    setIsPreviewOpen(false);
    setMessage("");
    setError("");
  }

  async function savePost() {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(draft.id);
      const response = await fetch(
        isEditing ? `/api/admin/news/${encodeURIComponent(draft.id ?? "")}` : "/api/admin/news",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { post: NewsPostValue };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save news post.");
      }

      const savedPost = payload.data.post;
      setPosts((current) => {
        const next = current.filter((post) => post.id !== savedPost.id);
        next.push(savedPost);
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      });
      setDraft({ ...savedPost });
      setMessage("News post saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save news post.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost(post: NewsPostValue) {
    const confirmed = window.confirm(`Delete "${post.title}" from News?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/news/${encodeURIComponent(post.id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: { message: string };
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Unable to delete news post.");
      }

      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (draft.id === post.id) {
        setDraft(createNewsDraft(Math.max(posts.length - 1, 0)));
      }
      setMessage("News post deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete news post.");
    }
  }

  async function reorderPosts(sourceId: string, targetId: string) {
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = posts.findIndex((post) => post.id === sourceId);
    const targetIndex = posts.findIndex((post) => post.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...posts];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    setPosts(next.map((post, index) => ({ ...post, displayOrder: index })));
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((post) => post.id) }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { posts: NewsPostValue[] };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to reorder news posts.");
      }

      setPosts(payload.data.posts);
      setMessage("News order saved.");
    } catch (reorderError) {
      setError(
        reorderError instanceof Error ? reorderError.message : "Unable to reorder news posts.",
      );
      void loadNews();
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_1fr]">
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
          <div>
            <h2 className="font-display text-3xl font-light">News</h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Manage journal posts shown on the public News page.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewPost}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#17130d] px-4 py-3 text-sm font-bold text-[#efbc4a] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
          >
            <Plus className="size-4" />
            Add Post
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <HomeInput label="Search" value={search} onChange={setSearch} />
          <HomeSelect
            label="Filter"
            value={filter}
            options={[
              "All",
              "published",
              "draft",
              "archived",
              ...categories.filter((item) => item !== "All"),
            ]}
            onChange={setFilter}
          />
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[#d8c79d] bg-[#fbf3dd] px-4 py-3 text-sm font-semibold text-[#856322]">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-lg border border-[#e8d4cd] bg-[#fff7f4] px-4 py-3 text-sm font-semibold text-[#9b4b35]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5 text-sm text-[#746c61]">
              No news posts match this search.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                draggable
                onDragStart={() => setDraggedId(post.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => void reorderPosts(draggedId, post.id)}
                className={`rounded-lg border p-3 transition ${
                  draft.id === post.id
                    ? "border-[#d7a33b] bg-[#fff8e7]"
                    : "border-[#e4ded3] bg-[#faf8f2] hover:border-[#d7a33b]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => editPost(post)}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={post.image} alt="" className="h-14 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[#211d16]">{post.title}</div>
                      <div className="mt-1 text-xs text-[#746c61]">
                        {post.category} / {post.status}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editPost(post)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePost(post)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light">
              {draft.id ? "Edit News Post" : "Add News Post"}
            </h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Keep titles, excerpts, categories, images, and publishing status accurate.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsPreviewOpen((current) => !current)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#ddd6c8] bg-white px-4 py-3 text-sm font-bold text-[#6f665c]"
            >
              <Search className="size-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={savePost}
              disabled={isSaving}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:opacity-60"
            >
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {isPreviewOpen && (
          <div className="mt-6 overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2]">
            <img
              src={draft.image}
              alt=""
              className={`aspect-[16/8] w-full object-cover ${draft.position}`}
            />
            <div className="p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-[#b98722]">
                {draft.category}
              </div>
              <h3 className="mt-3 font-display text-3xl font-light">
                {draft.title || "Untitled post"}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#746c61]">{draft.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 text-xs uppercase tracking-widest text-[#8c8479]">
                <span>{draft.author}</span>
                <span>{draft.date}</span>
              </div>
            </div>
          </div>
        )}

        <HomeSubsection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Title"
              value={draft.title}
              onChange={(value) => updateDraft((next) => void (next.title = value))}
            />
            <HomeInput
              label="Author"
              value={draft.author}
              onChange={(value) => updateDraft((next) => void (next.author = value))}
            />
            <HomeInput
              label="Date"
              value={draft.date}
              onChange={(value) => updateDraft((next) => void (next.date = value))}
            />
            <HomeInput
              label="Display Order"
              value={draft.displayOrder}
              onChange={(value) =>
                updateDraft((next) => void (next.displayOrder = Number.parseInt(value, 10) || 0))
              }
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="News Content">
          <HomeTextarea
            label="Excerpt"
            value={draft.excerpt}
            onChange={(value) => updateDraft((next) => void (next.excerpt = value))}
          />
          <HomeTextarea
            label="Article Content"
            value={draft.content}
            onChange={(value) => updateDraft((next) => void (next.content = value))}
          />
        </HomeSubsection>

        <HomeSubsection title="Images & Media">
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-3">
              <img
                src={draft.image}
                alt=""
                className={`aspect-[4/3] w-full rounded-md object-cover ${draft.position}`}
              />
            </div>
            <div className="grid gap-5">
              <HomeMediaSelect
                label="Image"
                value={draft.image}
                options={mediaOptions}
                onChange={(value) => updateDraft((next) => void (next.image = value))}
              />
              <HomeInput
                label="Image Position"
                value={draft.position}
                onChange={(value) => updateDraft((next) => void (next.position = value))}
              />
            </div>
          </div>
        </HomeSubsection>

        <HomeSubsection title="Category & Tags">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Category"
              value={draft.category}
              options={
                categories.includes(draft.category) ? categories : [draft.category, ...categories]
              }
              onChange={(value) => updateDraft((next) => void (next.category = value))}
            />
            <HomeCheckbox
              label="Featured Post"
              checked={draft.featured}
              onChange={(checked) => updateDraft((next) => void (next.featured = checked))}
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Publish Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Status"
              value={draft.status}
              options={["draft", "published", "archived"]}
              onChange={(value) =>
                updateDraft((next) => void (next.status = value as NewsPostValue["status"]))
              }
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "published"))}
              className="rounded-md border border-[#d8c79d] bg-[#fbf3dd] px-3 py-2 text-xs font-bold text-[#856322]"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "draft"))}
              className="rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
            >
              Unpublish
            </button>
          </div>
        </HomeSubsection>
      </AdminCard>
    </div>
  );
}

type PortfolioAdminResponse =
  | {
      ok: true;
      data: {
        projects: PortfolioProjectValue[];
        mediaOptions: string[];
        categories: string[];
      };
    }
  | {
      ok: false;
      error: { message: string };
    };

function createPortfolioDraft(displayOrder: number): PortfolioDraft {
  return {
    title: "",
    slug: "",
    category: "Weddings",
    location: "",
    date: "",
    desc: "",
    image: "/katha-media/wedding-proposal.jpeg",
    position: "object-center",
    videoUrl: "",
    status: "draft",
    featured: false,
    displayOrder,
  };
}

function PortfolioContentSection() {
  const [projects, setProjects] = useState<PortfolioProjectValue[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [draft, setDraft] = useState<PortfolioDraft>(() => createPortfolioDraft(0));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [draggedId, setDraggedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        [project.title, project.category, project.location, project.date, project.desc]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        filter === "All" || project.status === filter || project.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, projects, search]);

  async function loadPortfolio() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/portfolio");
      const payload = (await response.json()) as PortfolioAdminResponse;

      if (!response.ok) {
        throw new Error("Unable to load portfolio projects.");
      }

      if (!payload.ok) {
        throw new Error(payload.error.message);
      }

      setProjects(payload.data.projects);
      setMediaOptions(payload.data.mediaOptions);
      setCategories(payload.data.categories);
      setDraft((current) =>
        current.id ? current : createPortfolioDraft(payload.data.projects.length),
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load portfolio projects.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPortfolio();
  }, []);

  function updateDraft(mutator: (next: PortfolioDraft) => void) {
    setDraft((current) => {
      const next = structuredClone(current) as PortfolioDraft;
      mutator(next);
      return next;
    });
  }

  function startNewProject() {
    setDraft(createPortfolioDraft(projects.length));
    setMessage("");
    setError("");
  }

  function editProject(project: PortfolioProjectValue) {
    setDraft({ ...project });
    setMessage("");
    setError("");
  }

  async function saveProject() {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(draft.id);
      const response = await fetch(
        isEditing
          ? `/api/admin/portfolio/${encodeURIComponent(draft.id ?? "")}`
          : "/api/admin/portfolio",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { project: PortfolioProjectValue };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save portfolio project.");
      }

      const savedProject = payload.data.project;
      setProjects((current) => {
        const next = current.filter((project) => project.id !== savedProject.id);
        next.push(savedProject);
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      });
      setDraft({ ...savedProject });
      setMessage("Portfolio project saved.");
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to save portfolio project.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProject(project: PortfolioProjectValue) {
    const confirmed = window.confirm(`Delete "${project.title}" from Portfolio?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/portfolio/${encodeURIComponent(project.id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: { message: string };
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Unable to delete portfolio project.");
      }

      setProjects((current) => current.filter((item) => item.id !== project.id));
      if (draft.id === project.id) {
        setDraft(createPortfolioDraft(Math.max(projects.length - 1, 0)));
      }
      setMessage("Portfolio project deleted.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete portfolio project.",
      );
    }
  }

  async function reorderProjects(sourceId: string, targetId: string) {
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = projects.findIndex((project) => project.id === sourceId);
    const targetIndex = projects.findIndex((project) => project.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...projects];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    setProjects(next.map((project, index) => ({ ...project, displayOrder: index })));
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((project) => project.id) }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { projects: PortfolioProjectValue[] };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to reorder portfolio projects.");
      }

      setProjects(payload.data.projects);
      setMessage("Portfolio order saved.");
    } catch (reorderError) {
      setError(
        reorderError instanceof Error
          ? reorderError.message
          : "Unable to reorder portfolio projects.",
      );
      void loadPortfolio();
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_1fr]">
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
          <div>
            <h2 className="font-display text-3xl font-light">Portfolio</h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Manage published portfolio projects shown on the public Portfolio page.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewProject}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#17130d] px-4 py-3 text-sm font-bold text-[#efbc4a] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
          >
            <Plus className="size-4" />
            Add Project
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <HomeInput label="Search" value={search} onChange={setSearch} />
          <HomeSelect
            label="Filter"
            value={filter}
            options={[
              "All",
              "published",
              "draft",
              "archived",
              ...categories.filter((item) => item !== "All"),
            ]}
            onChange={setFilter}
          />
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[#d8c79d] bg-[#fbf3dd] px-4 py-3 text-sm font-semibold text-[#856322]">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-lg border border-[#e8d4cd] bg-[#fff7f4] px-4 py-3 text-sm font-semibold text-[#9b4b35]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5 text-sm text-[#746c61]">
              No portfolio projects match this search.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                draggable
                onDragStart={() => setDraggedId(project.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => void reorderProjects(draggedId, project.id)}
                className={`rounded-lg border p-3 transition ${
                  draft.id === project.id
                    ? "border-[#d7a33b] bg-[#fff8e7]"
                    : "border-[#e4ded3] bg-[#faf8f2] hover:border-[#d7a33b]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => editProject(project)}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={project.image} alt="" className="h-14 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[#211d16]">
                        {project.title}
                      </div>
                      <div className="mt-1 text-xs text-[#746c61]">
                        {project.category} / {project.status}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light">
              {draft.id ? "Edit Project" : "Add Project"}
            </h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Keep text, images, status, and ordering aligned with the public portfolio.
            </p>
          </div>
          <button
            type="button"
            onClick={saveProject}
            disabled={isSaving}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:opacity-60"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <HomeSubsection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Title"
              value={draft.title}
              onChange={(value) => updateDraft((next) => void (next.title = value))}
            />
            <HomeInput
              label="Slug"
              value={draft.slug}
              onChange={(value) => updateDraft((next) => void (next.slug = value))}
            />
            <HomeSelect
              label="Category"
              value={draft.category}
              options={
                categories.includes(draft.category) ? categories : [draft.category, ...categories]
              }
              onChange={(value) => updateDraft((next) => void (next.category = value))}
            />
            <HomeInput
              label="Display Order"
              value={draft.displayOrder}
              onChange={(value) =>
                updateDraft((next) => void (next.displayOrder = Number.parseInt(value, 10) || 0))
              }
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Project Details">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Location"
              value={draft.location}
              onChange={(value) => updateDraft((next) => void (next.location = value))}
            />
            <HomeInput
              label="Date"
              value={draft.date}
              onChange={(value) => updateDraft((next) => void (next.date = value))}
            />
            <HomeTextarea
              label="Description"
              value={draft.desc}
              onChange={(value) => updateDraft((next) => void (next.desc = value))}
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Images & Media">
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-3">
              <img
                src={draft.image}
                alt=""
                className={`aspect-[4/3] w-full rounded-md object-cover ${draft.position}`}
              />
            </div>
            <div className="grid gap-5">
              <HomeMediaSelect
                label="Image"
                value={draft.image}
                options={mediaOptions}
                onChange={(value) => updateDraft((next) => void (next.image = value))}
              />
              <HomeInput
                label="Image Position"
                value={draft.position}
                onChange={(value) => updateDraft((next) => void (next.position = value))}
              />
            </div>
          </div>
        </HomeSubsection>

        <HomeSubsection title="Links">
          <HomeInput
            label="Video URL"
            value={draft.videoUrl}
            onChange={(value) => updateDraft((next) => void (next.videoUrl = value))}
          />
        </HomeSubsection>

        <HomeSubsection title="Publish Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Status"
              value={draft.status}
              options={["draft", "published", "archived"]}
              onChange={(value) =>
                updateDraft((next) => void (next.status = value as PortfolioProjectValue["status"]))
              }
            />
            <HomeCheckbox
              label="Featured Project"
              checked={draft.featured}
              onChange={(checked) => updateDraft((next) => void (next.featured = checked))}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "published"))}
              className="rounded-md border border-[#d8c79d] bg-[#fbf3dd] px-3 py-2 text-xs font-bold text-[#856322]"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "draft"))}
              className="rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
            >
              Unpublish
            </button>
          </div>
        </HomeSubsection>
      </AdminCard>
    </div>
  );
}

type EventDraft = Omit<EventValue, "id" | "publishedAt" | "updatedAt" | "description"> & {
  id?: string;
};

type EventsAdminResponse =
  | {
      ok: true;
      data: {
        events: EventValue[];
        mediaOptions: string[];
      };
    }
  | {
      ok: false;
      error: { message: string };
    };

function createEventDraft(displayOrder: number): EventDraft {
  return {
    name: "",
    slug: "",
    type: "Event coverage",
    date: "",
    dateLabel: "",
    location: "",
    desc: "",
    image: "/katha-media/event-winner-crown.jpeg",
    position: "object-center",
    eventStatus: "upcoming",
    status: "draft",
    featured: false,
    displayOrder,
  };
}

function EventDateInput({
  label,
  onChange,
  value,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d68]">
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-[#ddd6c8] bg-[#faf8f2] px-4 py-3 text-sm text-[#2d271f] outline-none transition focus:border-[#d7a33b]"
      />
    </label>
  );
}

function EventsContentSection() {
  const [events, setEvents] = useState<EventValue[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [draft, setDraft] = useState<EventDraft>(() => createEventDraft(0));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [draggedId, setDraggedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        [event.name, event.type, event.location, event.dateLabel, event.desc]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        filter === "All" ||
        event.status === filter ||
        event.eventStatus === filter ||
        event.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [events, filter, search]);

  const eventTypeOptions = useMemo(() => {
    const types = [...new Set(events.map((event) => event.type).filter(Boolean))];
    return draft.type && !types.includes(draft.type) ? [draft.type, ...types] : types;
  }, [draft.type, events]);

  async function loadEvents() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/events");
      const payload = (await response.json()) as EventsAdminResponse;

      if (!response.ok) {
        throw new Error("Unable to load events.");
      }

      if (!payload.ok) {
        throw new Error(payload.error.message);
      }

      setEvents(payload.data.events);
      setMediaOptions(payload.data.mediaOptions);
      setDraft((current) => (current.id ? current : createEventDraft(payload.data.events.length)));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load events.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadEvents();
  }, []);

  function updateDraft(mutator: (next: EventDraft) => void) {
    setDraft((current) => {
      const next = structuredClone(current) as EventDraft;
      mutator(next);
      return next;
    });
  }

  function startNewEvent() {
    setDraft(createEventDraft(events.length));
    setIsPreviewOpen(false);
    setMessage("");
    setError("");
  }

  function editEvent(event: EventValue) {
    setDraft({ ...event });
    setIsPreviewOpen(false);
    setMessage("");
    setError("");
  }

  async function saveEvent() {
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(draft.id);
      const response = await fetch(
        isEditing ? `/api/admin/events/${encodeURIComponent(draft.id ?? "")}` : "/api/admin/events",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { event: EventValue };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to save event.");
      }

      const savedEvent = payload.data.event;
      setEvents((current) => {
        const next = current.filter((event) => event.id !== savedEvent.id);
        next.push(savedEvent);
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      });
      setDraft({ ...savedEvent });
      setMessage("Event saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save event.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteEvent(event: EventValue) {
    const confirmed = window.confirm(`Delete "${event.name}" from Events?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/events/${encodeURIComponent(event.id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: { message: string };
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Unable to delete event.");
      }

      setEvents((current) => current.filter((item) => item.id !== event.id));
      if (draft.id === event.id) {
        setDraft(createEventDraft(Math.max(events.length - 1, 0)));
      }
      setMessage("Event deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete event.");
    }
  }

  async function reorderEvents(sourceId: string, targetId: string) {
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = events.findIndex((event) => event.id === sourceId);
    const targetIndex = events.findIndex((event) => event.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...events];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    setEvents(next.map((event, index) => ({ ...event, displayOrder: index })));
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((event) => event.id) }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { events: EventValue[] };
        error?: { message: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Unable to reorder events.");
      }

      setEvents(payload.data.events);
      setMessage("Event order saved.");
    } catch (reorderError) {
      setError(reorderError instanceof Error ? reorderError.message : "Unable to reorder events.");
      void loadEvents();
    }
  }

  if (isLoading) {
    return (
      <AdminCard>
        <div className="h-7 w-48 animate-pulse rounded bg-[#eee7dc]" />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_1fr]">
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
          <div className="h-80 animate-pulse rounded-lg bg-[#f4eee4]" />
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
          <div>
            <h2 className="font-display text-3xl font-light">Events</h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Manage upcoming and completed event coverage shown on the public Events page.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewEvent}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#17130d] px-4 py-3 text-sm font-bold text-[#efbc4a] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
          >
            <Plus className="size-4" />
            Add Event
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <HomeInput label="Search" value={search} onChange={setSearch} />
          <HomeSelect
            label="Filter"
            value={filter}
            options={[
              "All",
              "published",
              "draft",
              "archived",
              "upcoming",
              "completed",
              "cancelled",
              ...eventTypeOptions,
            ]}
            onChange={setFilter}
          />
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[#d8c79d] bg-[#fbf3dd] px-4 py-3 text-sm font-semibold text-[#856322]">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-5 rounded-lg border border-[#e8d4cd] bg-[#fff7f4] px-4 py-3 text-sm font-semibold text-[#9b4b35]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5 text-sm text-[#746c61]">
              No events match this search.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <article
                key={event.id}
                draggable
                onDragStart={() => setDraggedId(event.id)}
                onDragOver={(dragEvent) => dragEvent.preventDefault()}
                onDrop={() => void reorderEvents(draggedId, event.id)}
                className={`rounded-lg border p-3 transition ${
                  draft.id === event.id
                    ? "border-[#d7a33b] bg-[#fff8e7]"
                    : "border-[#e4ded3] bg-[#faf8f2] hover:border-[#d7a33b]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => editEvent(event)}
                  className="block w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={event.image} alt="" className="h-14 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[#211d16]">{event.name}</div>
                      <div className="mt-1 text-xs text-[#746c61]">
                        {event.dateLabel} / {event.eventStatus} / {event.status}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editEvent(event)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteEvent(event)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light">
              {draft.id ? "Edit Event" : "Add Event"}
            </h2>
            <p className="mt-2 text-sm text-[#746c61]">
              Keep event dates, locations, descriptions, images, and publishing status accurate.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsPreviewOpen((current) => !current)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#ddd6c8] bg-white px-4 py-3 text-sm font-bold text-[#6f665c]"
            >
              <Search className="size-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={saveEvent}
              disabled={isSaving}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)] disabled:opacity-60"
            >
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {isPreviewOpen && (
          <div className="mt-6 overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2]">
            <img
              src={draft.image}
              alt=""
              className={`aspect-[16/8] w-full object-cover ${draft.position}`}
            />
            <div className="p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-[#b98722]">
                Event coverage
              </div>
              <h3 className="mt-3 font-display text-3xl font-light">
                {draft.name || "Untitled event"}
              </h3>
              <div className="mt-3 text-sm text-[#746c61]">
                {draft.dateLabel} / {draft.location}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#746c61]">{draft.desc}</p>
            </div>
          </div>
        )}

        <HomeSubsection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeInput
              label="Event Name"
              value={draft.name}
              onChange={(value) => updateDraft((next) => void (next.name = value))}
            />
            <HomeInput
              label="Event Type"
              value={draft.type}
              onChange={(value) => updateDraft((next) => void (next.type = value))}
            />
            <HomeInput
              label="Display Order"
              value={draft.displayOrder}
              onChange={(value) =>
                updateDraft((next) => void (next.displayOrder = Number.parseInt(value, 10) || 0))
              }
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Event Details">
          <HomeTextarea
            label="Description"
            value={draft.desc}
            onChange={(value) => updateDraft((next) => void (next.desc = value))}
          />
        </HomeSubsection>

        <HomeSubsection title="Date, Time & Location">
          <div className="grid gap-5 md:grid-cols-2">
            <EventDateInput
              label="Event Date"
              value={draft.date}
              onChange={(value) => updateDraft((next) => void (next.date = value))}
            />
            <HomeInput
              label="Display Date"
              value={draft.dateLabel}
              onChange={(value) => updateDraft((next) => void (next.dateLabel = value))}
            />
            <HomeInput
              label="Location"
              value={draft.location}
              onChange={(value) => updateDraft((next) => void (next.location = value))}
            />
          </div>
        </HomeSubsection>

        <HomeSubsection title="Images & Media">
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-3">
              <img
                src={draft.image}
                alt=""
                className={`aspect-[4/3] w-full rounded-md object-cover ${draft.position}`}
              />
            </div>
            <div className="grid gap-5">
              <HomeMediaSelect
                label="Event Image"
                value={draft.image}
                options={mediaOptions}
                onChange={(value) => updateDraft((next) => void (next.image = value))}
              />
              <HomeInput
                label="Image Position"
                value={draft.position}
                onChange={(value) => updateDraft((next) => void (next.position = value))}
              />
            </div>
          </div>
        </HomeSubsection>

        <HomeSubsection title="Registration Details">
          <div className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 text-sm leading-6 text-[#746c61]">
            The public Events page currently uses the fixed View Gallery action and does not store a
            registration link.
          </div>
        </HomeSubsection>

        <HomeSubsection title="Publish Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <HomeSelect
              label="Event Group"
              value={draft.eventStatus}
              options={["upcoming", "completed", "cancelled"]}
              onChange={(value) =>
                updateDraft((next) => void (next.eventStatus = value as EventValue["eventStatus"]))
              }
            />
            <HomeSelect
              label="Status"
              value={draft.status}
              options={["draft", "published", "archived"]}
              onChange={(value) =>
                updateDraft((next) => void (next.status = value as EventValue["status"]))
              }
            />
            <HomeCheckbox
              label="Featured Event"
              checked={draft.featured}
              onChange={(checked) => updateDraft((next) => void (next.featured = checked))}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "published"))}
              className="rounded-md border border-[#d8c79d] bg-[#fbf3dd] px-3 py-2 text-xs font-bold text-[#856322]"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => updateDraft((next) => void (next.status = "draft"))}
              className="rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
            >
              Unpublish
            </button>
          </div>
        </HomeSubsection>
      </AdminCard>
    </div>
  );
}

function SettingsSection() {
  return (
    <FormGrid
      title="Brand Settings"
      description="Frontend-only placeholder settings for identity, contact, and profile details."
      fields={[
        ["Brand Name", "Katha Digital"],
        ["Admin Email", "hello@kathadigital.com"],
        ["Contact Phone", "+977 9861078220"],
        ["Studio Location", "Madhyapur Thimi, Bhaktapur, Nepal"],
      ]}
    />
  );
}

function FormGrid({
  title,
  description,
  fields,
}: {
  title: string;
  description: string;
  fields: [string, string][];
}) {
  return (
    <AdminCard>
      <SectionHeader title={title} description={description} action="Save" icon={Save} />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map(([label, value]) => (
          <label
            key={label}
            className={label.includes("Text") || label === "Mission" ? "md:col-span-2" : ""}
          >
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d68]">
              {label}
            </span>
            <textarea
              defaultValue={value}
              rows={label.includes("Text") || label === "Mission" ? 4 : 2}
              className="w-full resize-none rounded-lg border border-[#ddd6c8] bg-[#faf8f2] px-4 py-3 text-sm text-[#2d271f] outline-none transition focus:border-[#d7a33b]"
            />
          </label>
        ))}
      </div>
    </AdminCard>
  );
}

function CardsSection({ title, items }: { title: string; items: string[] }) {
  return (
    <AdminCard>
      <SectionHeader
        title={title}
        description="Dummy list management preview."
        action="Add"
        icon={Plus}
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article key={item} className="rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98722]">
              Item {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 font-display text-2xl font-light">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-[#746c61]">
              Placeholder CMS card for future editing, ordering, and publishing controls.
            </p>
            <RowActions />
          </article>
        ))}
      </div>
    </AdminCard>
  );
}

function ProjectListSection({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: string[][];
  columns: string[];
}) {
  return (
    <AdminCard>
      <SectionHeader
        title={title}
        description="Frontend-only management table with dummy data."
        action="Add"
        icon={Plus}
      />
      <SimpleTable columns={columns} rows={rows} />
    </AdminCard>
  );
}

function DataTableSection({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: string[][];
  columns: string[];
}) {
  return (
    <AdminCard>
      <SectionHeader
        title={title}
        description="Dummy inbox data for future admin workflows."
        action="Export"
        icon={FileText}
      />
      <SimpleTable columns={columns} rows={rows} />
    </AdminCard>
  );
}

function SimpleTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#e4ded3]">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-[#f4f0e7] text-xs uppercase tracking-[0.2em] text-[#82786b]">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-4 font-bold">
                {column}
              </th>
            ))}
            <th className="px-5 py-4 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e7e0d4] bg-white">
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td
                  key={cell}
                  className={`px-5 py-4 ${index === 0 ? "font-semibold text-[#211d16]" : "text-[#746c61]"}`}
                >
                  {cell}
                </td>
              ))}
              <td className="px-5 py-4">
                <RowActions compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentSnapshot({ snapshots }: { snapshots: DashboardSnapshot[] }) {
  if (snapshots.length === 0) {
    return (
      <AdminCard>
        <SectionHeader
          title="Content Snapshot"
          description="No CMS sections have database records yet."
          action="Refresh"
          icon={Search}
        />
      </AdminCard>
    );
  }

  return (
    <article className="overflow-hidden rounded-lg border border-[#ddd6c8] bg-white shadow-[0_12px_32px_-24px_rgba(23,19,13,0.42)]">
      <div className="border-b border-[#e4ded3] p-6">
        <h2 className="font-display text-2xl font-light">Content Snapshot</h2>
        <p className="mt-2 text-sm text-[#746c61]">Live CMS section status from the database.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f4f0e7] text-xs uppercase tracking-[0.2em] text-[#82786b]">
            <tr>
              <th className="px-5 py-4 font-bold">Section</th>
              <th className="px-5 py-4 font-bold">Status</th>
              <th className="px-5 py-4 font-bold">Item count</th>
              <th className="px-5 py-4 font-bold">Last updated</th>
              <th className="px-5 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e0d4] bg-white">
            {snapshots.map((snapshot) => (
              <tr key={snapshot.section}>
                <td className="px-5 py-4 font-semibold text-[#211d16]">{snapshot.section}</td>
                <td className="px-5 py-4 text-[#746c61]">
                  <StatusPill status={snapshot.status} />
                </td>
                <td className="px-5 py-4 text-[#746c61]">{snapshot.itemCount}</td>
                <td className="px-5 py-4 text-[#746c61]">
                  {formatDashboardDate(snapshot.lastUpdated)}
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={snapshot.href}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c] transition hover:border-[#d7a33b] hover:text-[#17130d]"
                  >
                    <Edit3 className="size-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: DashboardSnapshot["status"] }) {
  const className =
    status === "Published"
      ? "border-[#d8c79d] bg-[#fbf3dd] text-[#9a6d16]"
      : status === "Draft"
        ? "border-[#d9d1c4] bg-[#f7f4ec] text-[#746c61]"
        : status === "Archived"
          ? "border-[#e8d4cd] bg-[#fff7f4] text-[#9b4b35]"
          : "border-[#d8c79d] bg-[#fff9eb] text-[#856322]";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function formatDashboardDate(value: string | null) {
  if (!value) return "Not updated";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function QueueCard({ pendingWork }: { pendingWork: DashboardPendingWork[] }) {
  return (
    <article className="rounded-lg border border-[#ddd6c8] bg-white p-6 shadow-[0_12px_32px_-24px_rgba(23,19,13,0.42)]">
      <h2 className="font-display text-2xl font-light">Today's Queue</h2>
      <p className="mt-2 text-sm text-[#746c61]">Pending CMS work based on database status.</p>
      {pendingWork.length > 0 ? (
        <div className="mt-6 space-y-4">
          {pendingWork.map((item, index) => (
            <Link
              key={item.section}
              href={item.href}
              className="flex items-center gap-4 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-4 transition hover:border-[#d7a33b] hover:bg-[#fffaf0]"
            >
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#17130d] text-xs font-bold text-[#efbc4a]">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#3b352c]">{item.section}</div>
                <div className="mt-1 text-xs text-[#746c61]">{formatPendingSummary(item)}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-[#e4ded3] bg-[#faf8f2] p-5">
          <div className="text-sm font-semibold text-[#3b352c]">No pending CMS work</div>
          <p className="mt-2 text-sm leading-6 text-[#746c61]">
            Draft and archived records will appear here when they exist.
          </p>
        </div>
      )}
    </article>
  );
}

function formatPendingSummary(item: DashboardPendingWork) {
  const parts = [];

  if (item.draftCount > 0) {
    parts.push(`${item.draftCount} draft ${item.draftCount === 1 ? "record" : "records"}`);
  }

  if (item.archivedCount > 0) {
    parts.push(`${item.archivedCount} archived ${item.archivedCount === 1 ? "record" : "records"}`);
  }

  return parts.join(" / ");
}

function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-[#ddd6c8] bg-white p-6 shadow-[0_12px_32px_-24px_rgba(23,19,13,0.42)]">
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  description,
  action,
  icon: Icon,
}: {
  title: string;
  description: string;
  action: string;
  icon: typeof Plus;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-display text-3xl font-light">{title}</h2>
        <p className="mt-2 text-sm text-[#746c61]">{description}</p>
      </div>
      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#efbc4a] px-4 py-3 text-sm font-bold text-[#17130d] shadow-[0_14px_30px_-22px_rgba(23,19,13,0.7)]"
      >
        <Icon className="size-4" />
        {action}
      </button>
    </div>
  );
}

function RowActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mt-5 flex gap-2 ${compact ? "mt-0" : ""}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md border border-[#ddd6c8] bg-white px-3 py-2 text-xs font-bold text-[#6f665c]"
      >
        <Edit3 className="size-3.5" />
        Edit
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md border border-[#edd8d1] bg-[#fff7f4] px-3 py-2 text-xs font-bold text-[#9b4b35]"
      >
        <Trash2 className="size-3.5" />
        Delete
      </button>
    </div>
  );
}
