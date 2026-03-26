"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Briefcase, FileCheck } from 'lucide-react'
// import { Icons } from "./icons";

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/job-postings', label: 'Job Postings', icon: Briefcase },
  { href: '/application-status', label: 'Application Status', icon: FileCheck },
]

// const navItems = [
//     { href: "/", label: "Home", icon: Icons.home },
//     { href: "/profile", label: "Profile", icon: Icons.user },
//     { href: "/job-postings", label: "Job Postings", icon: Icons.briefcase },
//     { href: "/application-status", label: "Application Status", icon: Icons.fileCheck },
//   ];

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-secondary text-secondary-foreground p-4">
      <div className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

