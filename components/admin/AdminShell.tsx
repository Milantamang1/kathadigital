"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

const services = [
  "Wedding Cinematography",
  "Event Coverage",
  "Brand Films",
  "Music Videos",
  "Talk Show Production",
  "Portrait Sessions",
];

const portfolioItems = [
  ["Ride Into Forever", "Wedding Films", "Published"],
  ["Diva Supermodel Finale", "Events", "Published"],
  ["Studio Red", "Portraits", "Draft"],
  ["Mountain Story", "Travel", "Published"],
];

const productions = [
  ["Katha Mero Pani", "Talk Show", "Season planning"],
  ["Gantavya Eak Katha", "Travel Series", "Published"],
  ["Karigar", "Documentary Series", "Draft"],
];

const posts = [
  ["How to Prepare for Your Wedding Photoshoot", "Wedding Tips", "Published"],
  ["Behind the Scenes of Katha Mero Pani", "Media", "Draft"],
  ["Travel Storytelling Through Video", "Travel Stories", "Published"],
];

const events = [
  ["Mrs Nepal Finale 2026", "Jan 18, 2026", "Scheduled"],
  ["Himalaya Fashion Week", "Feb 22, 2026", "Scheduled"],
  ["Startup Nepal Summit", "Mar 09, 2026", "Draft"],
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
  if (activeSection === "Services") return <CardsSection title="Services" items={services} />;
  if (activeSection === "Portfolio")
    return (
      <ProjectListSection
        title="Portfolio"
        rows={portfolioItems}
        columns={["Project", "Category", "Status"]}
      />
    );
  if (activeSection === "Productions")
    return (
      <ProjectListSection
        title="Productions"
        rows={productions}
        columns={["Title", "Type", "Status"]}
      />
    );
  if (activeSection === "News")
    return (
      <ProjectListSection
        title="News Posts"
        rows={posts}
        columns={["Title", "Category", "Status"]}
      />
    );
  if (activeSection === "Events")
    return (
      <ProjectListSection title="Events" rows={events} columns={["Event", "Date", "Status"]} />
    );
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
  return (
    <FormGrid
      title="Homepage Content"
      description="Dummy editable fields for the public homepage hero and CTA content."
      fields={[
        ["Hero Title", "Premium films and photography with emotional clarity."],
        ["Subtitle", "Wedding films, event coverage, talk shows, music videos, and brand stories."],
        ["CTA Text", "Book Now"],
      ]}
    />
  );
}

function AboutContentSection() {
  return (
    <FormGrid
      title="About Content"
      description="Studio profile copy ready for future CMS editing."
      fields={[
        [
          "About Text",
          "Katha Digital is a cinematic production studio built around story, emotion, and craft.",
        ],
        [
          "Mission",
          "To preserve meaningful moments through polished photography, film, and digital media.",
        ],
        [
          "Studio Info",
          "Bhaktapur-based creative team for weddings, events, brands, and original productions.",
        ],
      ]}
    />
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
