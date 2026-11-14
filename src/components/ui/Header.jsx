
import { Search, Bell, Plus } from 'lucide-react'

function Header() {
  return (
    <header className="h-[76px] border-b border-zinc-200 bg-[#FAFAF9] flex items-center justify-between px-8">

      {/* Actions */}
      <div className="flex items-center gap-5">

        <button className="relative text-zinc-500 hover:text-zinc-900">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 border border-[#FAFAF9]" />
        </button>

        <div className="w-9 h-9 rounded-full bg-[#E7E5E4] flex items-center justify-center text-xs font-semibold text-zinc-700">
          AD
        </div>
      </div>
    </header>
  )
}

export default Header
