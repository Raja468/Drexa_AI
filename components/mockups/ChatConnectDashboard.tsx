import {
  BookOpen,
  Clock,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Package,
  Send,
  Settings,
  TriangleAlert,
  UserPlus,
  Users,
} from 'lucide-react'

/**
 * ChatConnect AI dashboard, rebuilt in markup so the site never ships an
 * empty-state screenshot. All figures are demo data (the frame says so) —
 * nothing here is a claim about a real deployment.
 *
 * Drawn on the 840x525 canvas owned by `.mock-viewport`; sizes are expressed
 * in `var(--u)` (one canvas pixel) so the panel scales with its frame.
 */

const NAV: { label: string; icon: typeof Inbox; active?: boolean }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Conversations', icon: Inbox },
  { label: 'FAQs', icon: BookOpen },
  { label: 'Products', icon: Package },
  { label: 'Knowledge', icon: FolderOpen },
  { label: 'Leads', icon: UserPlus },
  { label: 'Broadcast', icon: Send },
  { label: 'Settings', icon: Settings },
]

const STATS: { label: string; value: string; icon: typeof Users; tint: string; color: string }[] = [
  { label: 'Conversations today', value: '42', icon: MessageSquare, tint: '#EEF2FF', color: '#4F6BF6' },
  { label: 'Leads captured', value: '11', icon: Users, tint: '#E7F8F0', color: '#12B76A' },
  { label: 'Needs attention', value: '3', icon: TriangleAlert, tint: '#FFF4E5', color: '#F79009' },
  { label: 'Avg response', value: '8s', icon: Clock, tint: '#F1EDFF', color: '#7A5AF8' },
]

const STATE_COLOR: Record<string, string> = {
  open: '#4F6BF6',
  attention: '#F79009',
  resolved: '#12B76A',
}

const CONVERSATIONS: { name: string; message: string; time: string; state: keyof typeof STATE_COLOR; tint: string; color: string }[] = [
  { name: 'Ayesha Khan', message: 'Do you have a price list for bulk orders?', time: '2m', state: 'open', tint: '#EEF2FF', color: '#4F6BF6' },
  { name: 'Bilal Ahmed', message: 'Thanks — that answers everything I needed.', time: '14m', state: 'resolved', tint: '#E7F8F0', color: '#12B76A' },
  { name: 'Sara Malik', message: 'Can someone call me back about delivery?', time: '32m', state: 'attention', tint: '#FFF4E5', color: '#F79009' },
  { name: 'Usman Tariq', message: 'Is the plan billed monthly or yearly?', time: '1h', state: 'open', tint: '#F1EDFF', color: '#7A5AF8' },
  { name: 'Hira Noor', message: 'Sent the signed invoice to your email.', time: '2h', state: 'resolved', tint: '#FDECEC', color: '#E4483F' },
]

const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('')

export function ChatConnectDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F7FA] font-body text-[#101828]">
      {/* Sidebar */}
      <aside className="flex w-[calc(var(--u)*140)] shrink-0 flex-col bg-[#241C4E] text-[#A79FD4]">
        <div className="flex items-center gap-[calc(var(--u)*8)] border-b border-white/10 px-[calc(var(--u)*13)] py-[calc(var(--u)*12)]">
          <span className="grid h-[calc(var(--u)*26)] w-[calc(var(--u)*26)] shrink-0 place-items-center rounded-[calc(var(--u)*8)] bg-[#5B4BD6] text-white">
            <MessageSquare className="h-[calc(var(--u)*14)] w-[calc(var(--u)*14)]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[calc(var(--u)*11)] font-bold leading-[1.2] text-white">ChatConnect AI</span>
            <span className="mt-[calc(var(--u)*3)] flex items-center gap-[calc(var(--u)*4)] text-[calc(var(--u)*9.5)] leading-none">
              <i className="h-[calc(var(--u)*5)] w-[calc(var(--u)*5)] rounded-full bg-[#3DDC97]" />
              Bot active
            </span>
          </span>
        </div>

        <nav className="flex flex-col gap-[calc(var(--u)*3)] p-[calc(var(--u)*9)]">
          {NAV.map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-[calc(var(--u)*8)] rounded-[calc(var(--u)*7)] px-[calc(var(--u)*9)] py-[calc(var(--u)*7)] text-[calc(var(--u)*10.5)] leading-[1.2] ${
                item.active ? 'bg-[#3D3182] font-semibold text-white' : ''
              }`}
            >
              <item.icon className="h-[calc(var(--u)*13)] w-[calc(var(--u)*13)] shrink-0" />
              <span className="truncate">{item.label}</span>
            </span>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-[calc(var(--u)*7)] border-t border-white/10 px-[calc(var(--u)*13)] py-[calc(var(--u)*11)]">
          <span className="grid h-[calc(var(--u)*22)] w-[calc(var(--u)*22)] shrink-0 place-items-center rounded-full bg-[#3D3182] text-[calc(var(--u)*10)] font-semibold text-white">R</span>
          <span className="truncate text-[calc(var(--u)*10.5)]">root_admin</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[calc(var(--u)*38)] shrink-0 items-center justify-between border-b border-[#E9E9EF] bg-white px-[calc(var(--u)*16)]">
          <span className="text-[calc(var(--u)*12.5)] font-semibold text-[#101828]">Central Command</span>
          <span className="flex items-center gap-[calc(var(--u)*9)]">
            <span className="rounded-full border border-[#E4E4EF] bg-[#F4F4F8] px-[calc(var(--u)*9)] py-[calc(var(--u)*4)] text-[calc(var(--u)*10)] text-[#667085]">ChatConnect HQ</span>
            <span className="grid h-[calc(var(--u)*22)] w-[calc(var(--u)*22)] place-items-center rounded-full bg-[#4F6BF6] text-[calc(var(--u)*10)] font-semibold text-white">A</span>
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-[calc(var(--u)*12)] p-[calc(var(--u)*14)]">
          <div className="shrink-0">
            <h2 className="text-[calc(var(--u)*19)] font-bold leading-[1.15] tracking-[-0.02em]">Dashboard</h2>
            <p className="mt-[calc(var(--u)*3)] text-[calc(var(--u)*11)] leading-[1.3] text-[#667085]">Here&apos;s what your AI is handling right now.</p>
          </div>

          <div className="grid shrink-0 grid-cols-4 gap-[calc(var(--u)*10)]">
            {STATS.map((stat) => (
              <div key={stat.label} className="relative rounded-[calc(var(--u)*10)] border border-[#ECECF3] bg-white px-[calc(var(--u)*11)] py-[calc(var(--u)*9)]">
                <span className="absolute right-[calc(var(--u)*10)] top-[calc(var(--u)*9)] grid h-[calc(var(--u)*24)] w-[calc(var(--u)*24)] place-items-center rounded-[calc(var(--u)*7)]" style={{ background: stat.tint, color: stat.color }}>
                  <stat.icon className="h-[calc(var(--u)*13)] w-[calc(var(--u)*13)]" />
                </span>
                <p className="truncate pr-[calc(var(--u)*30)] text-[calc(var(--u)*10.5)] leading-[1.3] text-[#667085]">{stat.label}</p>
                <p className="mt-[calc(var(--u)*4)] text-[calc(var(--u)*22)] font-bold leading-[1.1] tracking-[-0.02em]">{stat.value}</p>
              </div>
            ))}
          </div>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[calc(var(--u)*10)] border border-[#ECECF3] bg-white">
            <header className="flex h-[calc(var(--u)*32)] shrink-0 items-center justify-between px-[calc(var(--u)*14)]">
              <h3 className="text-[calc(var(--u)*12)] font-semibold">Recent conversations</h3>
              <span className="text-[calc(var(--u)*10.5)] font-medium text-[#4F6BF6]">View all →</span>
            </header>

            <ul className="flex min-h-0 flex-1 flex-col">
              {CONVERSATIONS.map((row) => (
                <li key={row.name} className="flex min-h-0 flex-1 items-center gap-[calc(var(--u)*10)] border-t border-[#F0EFF5] px-[calc(var(--u)*14)]">
                  <span
                    className="grid h-[calc(var(--u)*26)] w-[calc(var(--u)*26)] shrink-0 place-items-center rounded-full text-[calc(var(--u)*10.5)] font-semibold"
                    style={{ background: row.tint, color: row.color }}
                    aria-hidden="true"
                  >
                    {initials(row.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[calc(var(--u)*11.5)] font-semibold leading-[1.3]">{row.name}</span>
                    <span className="block truncate text-[calc(var(--u)*11)] leading-[1.3] text-[#667085]">{row.message}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-[calc(var(--u)*5)] text-[calc(var(--u)*10.5)] text-[#98A2B3]">
                    <i className="h-[calc(var(--u)*5)] w-[calc(var(--u)*5)] rounded-full" style={{ background: STATE_COLOR[row.state] }} />
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>

            <footer className="flex h-[calc(var(--u)*26)] shrink-0 items-center justify-between border-t border-[#F0EFF5] bg-[#FBFBFD] px-[calc(var(--u)*14)] text-[calc(var(--u)*10)] text-[#98A2B3]">
              <span>Showing 5 of 42 conversations</span>
              <span>Synced just now</span>
            </footer>
          </section>
        </div>
      </main>
    </div>
  )
}
