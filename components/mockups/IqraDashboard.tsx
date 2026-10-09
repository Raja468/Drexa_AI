import {
  BadgeDollarSign,
  CalendarCheck,
  ChevronLeft,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  UserRound,
  Users,
} from 'lucide-react'

/**
 * Iqra School Management System admin dashboard, rebuilt in markup so the site
 * never ships a thin or empty screenshot. Figures are demo data (the frame says
 * so) — they are not a claim about a real school's records.
 *
 * Drawn on the 840x525 canvas owned by `.mock-viewport`; sizes are expressed
 * in `var(--u)` (one canvas pixel) so the panel scales with its frame.
 */

const NAV: { label: string; icon: typeof Users; active?: boolean }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Students', icon: GraduationCap },
  { label: 'Teachers', icon: UserRound },
  { label: 'Attendance', icon: ClipboardCheck },
  { label: 'Fee System', icon: BadgeDollarSign },
  { label: 'Notices', icon: Megaphone },
]

const NAV_GROUPS: { label: string; from: number; to: number }[] = [
  { label: 'Main', from: 0, to: 1 },
  { label: 'Management', from: 1, to: 5 },
  { label: 'Communication', from: 5, to: 6 },
]

const STATS: { label: string; note: string; value: string; icon: typeof Users; tint: string; color: string }[] = [
  { label: 'Total students', note: 'Enrolled this year', value: '428', icon: GraduationCap, tint: '#E9FBF0', color: '#16A34A' },
  { label: 'Teachers', note: 'Active staff members', value: '26', icon: UserRound, tint: '#EEF0FF', color: '#6366F1' },
  { label: 'Present today', note: 'Of 428 students', value: '397', icon: CalendarCheck, tint: '#E7F8F0', color: '#12B76A' },
  { label: 'Fees pending', note: 'Unpaid this month', value: '12', icon: BadgeDollarSign, tint: '#FFF6E5', color: '#F59E0B' },
]

const STUDENTS: { name: string; grade: string; roll: string; status: 'Present' | 'Absent' | 'Late' }[] = [
  { name: 'Ayesha Noor', grade: 'Grade 6-A', roll: 'ST-1042', status: 'Present' },
  { name: 'Ali Ahmed', grade: 'Grade 10-B', roll: 'ST-1007', status: 'Present' },
  { name: 'Jhanzaib Khan', grade: 'Grade 3-A', roll: 'ST-1088', status: 'Absent' },
  { name: 'Maryam Siddiqui', grade: 'Grade 8-A', roll: 'ST-1023', status: 'Present' },
  { name: 'Hamza Raza', grade: 'Grade 5-B', roll: 'ST-1061', status: 'Late' },
]

const STATUS_COLOR = {
  Present: { background: '#E7F8F0', color: '#0E9F6E' },
  Absent: { background: '#FDECEC', color: '#D92D20' },
  Late: { background: '#FFF6E5', color: '#B54708' },
} as const

const NOTICES: { title: string; tag: string; date: string; tint: string; color: string }[] = [
  { title: 'Mid-term exam timetable published', tag: 'Exams', date: '06 Oct 2025', tint: '#EEF2FF', color: '#4F6BF6' },
  { title: 'Fee vouchers due by 20 October', tag: 'Fees', date: '03 Oct 2025', tint: '#FFF6E5', color: '#B54708' },
  { title: 'Parent–teacher meeting this Saturday', tag: 'Events', date: '01 Oct 2025', tint: '#F1EDFF', color: '#6941C6' },
  { title: 'Winter uniform starts 1 November', tag: 'General', date: '28 Sep 2025', tint: '#EEF0F3', color: '#475467' },
]

const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('')

export function IqraDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F8FA] font-body text-[#101828]">
      {/* Sidebar */}
      <aside className="flex w-[calc(var(--u)*140)] shrink-0 flex-col bg-[#111827] text-[#9CA3AF]">
        <div className="flex items-center gap-[calc(var(--u)*8)] border-b border-white/10 px-[calc(var(--u)*13)] py-[calc(var(--u)*12)]">
          <span className="grid h-[calc(var(--u)*26)] w-[calc(var(--u)*26)] shrink-0 place-items-center rounded-full bg-[#16A34A] text-[calc(var(--u)*12)] font-bold text-white">I</span>
          <span className="min-w-0">
            <span className="block truncate text-[calc(var(--u)*11)] font-bold leading-[1.2] text-white">Iqra School</span>
            <span className="block truncate text-[calc(var(--u)*9.5)] leading-none text-[#6B7280]">Admin portal</span>
          </span>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-[calc(var(--u)*8)] overflow-hidden p-[calc(var(--u)*11)]">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-[calc(var(--u)*5)] px-[calc(var(--u)*6)] text-[calc(var(--u)*9)] font-semibold uppercase tracking-[0.08em] leading-none text-[#6B7280]">
                {group.label}
              </p>
              <div className="flex flex-col gap-[calc(var(--u)*3)]">
                {NAV.slice(group.from, group.to).map((item) => (
                  <span
                    key={item.label}
                    className={`flex items-center gap-[calc(var(--u)*8)] rounded-[calc(var(--u)*6)] border-l-[calc(var(--u)*3)] px-[calc(var(--u)*8)] py-[calc(var(--u)*7)] text-[calc(var(--u)*10.5)] leading-[1.2] ${
                      item.active ? 'border-[#22C55E] bg-[#1F2937] font-semibold text-white' : 'border-transparent'
                    }`}
                  >
                    <item.icon className="h-[calc(var(--u)*13)] w-[calc(var(--u)*13)] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-[calc(var(--u)*7)] border-t border-white/10 px-[calc(var(--u)*13)] py-[calc(var(--u)*11)]">
          <span className="grid h-[calc(var(--u)*22)] w-[calc(var(--u)*22)] shrink-0 place-items-center rounded-full bg-[#16A34A] text-[calc(var(--u)*10)] font-semibold text-white">A</span>
          <span className="truncate text-[calc(var(--u)*10.5)]">admin</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[calc(var(--u)*38)] shrink-0 items-center justify-between border-b border-[#E9E9EF] bg-white px-[calc(var(--u)*16)]">
          <span className="flex items-center gap-[calc(var(--u)*5)] text-[calc(var(--u)*12.5)] font-semibold">
            <ChevronLeft className="h-[calc(var(--u)*13)] w-[calc(var(--u)*13)] text-[#98A2B3]" />
            Admin portal
          </span>
          <span className="flex items-center gap-[calc(var(--u)*9)]">
            <span className="rounded-full border border-[#E4E4EF] bg-[#F4F4F8] px-[calc(var(--u)*9)] py-[calc(var(--u)*4)] text-[calc(var(--u)*10)] text-[#667085]">Session 2025–26</span>
            <span className="grid h-[calc(var(--u)*22)] w-[calc(var(--u)*22)] place-items-center rounded-full bg-[#16A34A] text-[calc(var(--u)*10)] font-semibold text-white">A</span>
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-[calc(var(--u)*12)] p-[calc(var(--u)*14)]">
          <div className="shrink-0">
            <h2 className="text-[calc(var(--u)*19)] font-bold leading-[1.15] tracking-[-0.02em]">Dashboard</h2>
            <p className="mt-[calc(var(--u)*3)] text-[calc(var(--u)*11)] leading-[1.3] text-[#667085]">Wednesday, 8 October 2025 · Iqra Jannat-UL-Atfal</p>
          </div>

          <div className="grid shrink-0 grid-cols-4 gap-[calc(var(--u)*10)]">
            {STATS.map((stat) => (
              <div key={stat.label} className="relative overflow-hidden rounded-[calc(var(--u)*10)] border border-[#ECECF3] bg-white px-[calc(var(--u)*11)] py-[calc(var(--u)*9)]">
                <span className="absolute inset-x-0 top-0 h-[calc(var(--u)*3)]" style={{ background: stat.color }} />
                <span className="absolute right-[calc(var(--u)*10)] top-[calc(var(--u)*11)] grid h-[calc(var(--u)*24)] w-[calc(var(--u)*24)] place-items-center rounded-[calc(var(--u)*7)]" style={{ background: stat.tint, color: stat.color }}>
                  <stat.icon className="h-[calc(var(--u)*13)] w-[calc(var(--u)*13)]" />
                </span>
                <p className="truncate pr-[calc(var(--u)*30)] text-[calc(var(--u)*10.5)] leading-[1.3] text-[#667085]">{stat.label}</p>
                <p className="mt-[calc(var(--u)*4)] text-[calc(var(--u)*22)] font-bold leading-[1.1] tracking-[-0.02em]">{stat.value}</p>
                <p className="truncate text-[calc(var(--u)*9.5)] leading-[1.3] text-[#98A2B3]">{stat.note}</p>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[calc(var(--u)*10)]">
            {/* Students */}
            <section className="flex min-h-0 flex-col overflow-hidden rounded-[calc(var(--u)*10)] border border-[#ECECF3] bg-white">
              <header className="flex h-[calc(var(--u)*30)] shrink-0 items-center justify-between px-[calc(var(--u)*14)]">
                <h3 className="text-[calc(var(--u)*12)] font-semibold">Recent students</h3>
                <span className="text-[calc(var(--u)*10.5)] font-medium text-[#16A34A]">View all →</span>
              </header>

              <div className="grid shrink-0 grid-cols-[1.5fr_1fr_1fr_1fr] border-y border-[#F0EFF5] bg-[#FBFBFD] px-[calc(var(--u)*14)] py-[calc(var(--u)*6)] text-[calc(var(--u)*9)] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                <span>Name</span>
                <span>Class</span>
                <span>Roll no</span>
                <span>Status</span>
              </div>

              <ul className="flex min-h-0 flex-1 flex-col">
                {STUDENTS.map((student) => (
                  <li key={student.roll} className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-[calc(var(--u)*6)] border-b border-[#F0EFF5] px-[calc(var(--u)*14)] last:border-b-0">
                    <span className="flex min-w-0 items-center gap-[calc(var(--u)*7)]">
                      <span className="grid h-[calc(var(--u)*22)] w-[calc(var(--u)*22)] shrink-0 place-items-center rounded-full bg-[#E9FBF0] text-[calc(var(--u)*9.5)] font-semibold text-[#0E9F6E]">
                        {initials(student.name)}
                      </span>
                      <span className="truncate text-[calc(var(--u)*11)] font-medium">{student.name}</span>
                    </span>
                    <span className="truncate text-[calc(var(--u)*10.5)] text-[#667085]">{student.grade}</span>
                    <span className="truncate font-mono text-[calc(var(--u)*10.5)] text-[#667085]">{student.roll}</span>
                    <span>
                      <span
                        className="inline-block rounded-full px-[calc(var(--u)*7)] py-[calc(var(--u)*3)] text-[calc(var(--u)*9.5)] font-semibold"
                        style={STATUS_COLOR[student.status]}
                      >
                        {student.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <footer className="flex h-[calc(var(--u)*26)] shrink-0 items-center justify-between border-t border-[#F0EFF5] bg-[#FBFBFD] px-[calc(var(--u)*14)] text-[calc(var(--u)*10)] text-[#98A2B3]">
                <span>Showing 5 of 428 students</span>
                <span>Register updated 8 Oct</span>
              </footer>
            </section>

            {/* Notices */}
            <section className="flex min-h-0 flex-col overflow-hidden rounded-[calc(var(--u)*10)] border border-[#ECECF3] bg-white">
              <header className="flex h-[calc(var(--u)*30)] shrink-0 items-center justify-between px-[calc(var(--u)*14)]">
                <h3 className="text-[calc(var(--u)*12)] font-semibold">Latest notices</h3>
                <span className="text-[calc(var(--u)*10.5)] font-medium text-[#16A34A]">Post new →</span>
              </header>

              <ul className="flex min-h-0 flex-1 flex-col">
                {NOTICES.map((notice) => (
                  <li key={notice.title} className="flex min-h-0 flex-1 flex-col justify-center gap-[calc(var(--u)*6)] border-t border-[#F0EFF5] px-[calc(var(--u)*14)]">
                    <p className="text-[calc(var(--u)*11)] font-medium leading-[1.3]">{notice.title}</p>
                    <p className="flex items-center gap-[calc(var(--u)*7)]">
                      <span
                        className="rounded-full px-[calc(var(--u)*7)] py-[calc(var(--u)*2)] text-[calc(var(--u)*9)] font-semibold"
                        style={{ background: notice.tint, color: notice.color }}
                      >
                        {notice.tag}
                      </span>
                      <span className="text-[calc(var(--u)*9.5)] text-[#98A2B3]">{notice.date}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
