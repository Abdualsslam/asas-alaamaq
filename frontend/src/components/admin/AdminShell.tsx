"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FileImage,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Tags,
  X,
} from "lucide-react";
import { logout } from "@/lib/api/admin-api";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/admin/posts", label: "المقالات", icon: FileText },
  { href: "/admin/post-categories", label: "تصنيفات المقالات", icon: Tags },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  {
    href: "/admin/project-categories",
    label: "تصنيفات المشاريع",
    icon: Tags,
  },
  { href: "/admin/media", label: "الوسائط", icon: FileImage },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

function Sidebar({
  pathname,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#171717] text-white">
      <div className="border-b border-white/10 p-6">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <Image
            src="/brand/icon.svg"
            alt="أساس الأعماق"
            width={38}
            height={38}
            className="brightness-0 invert"
          />
          <div>
            <strong className="block text-sm">أساس الأعماق</strong>
            <span className="text-xs text-white/50">لوحة التحكم</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {links.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                    active
                      ? "bg-earth-brown text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/65 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-[270px] lg:block">
        <Sidebar
          pathname={pathname}
          onLogout={() => void handleLogout()}
        />
      </aside>
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-[#f5f2ed]/95 px-4 backdrop-blur md:px-8 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg border border-border bg-white p-2"
            aria-label="فتح القائمة"
          >
            <Menu size={20} />
          </button>
          <strong className="text-sm">لوحة تحكم أساس الأعماق</strong>
          <span className="w-9" />
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 md:p-8 lg:p-10">
          {loggingOut ? (
            <p className="mb-4 text-sm text-concrete-gray">جاري تسجيل الخروج...</p>
          ) : null}
          {children}
        </main>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            className="absolute inset-0 bg-black/55"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-[85%] max-w-[300px]">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="absolute left-3 top-3 z-10 rounded-full bg-white/10 p-2 text-white"
              aria-label="إغلاق القائمة"
            >
              <X size={18} />
            </button>
            <Sidebar
              pathname={pathname}
              onNavigate={() => setDrawerOpen(false)}
              onLogout={() => void handleLogout()}
            />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
