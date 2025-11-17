import { Home, LayoutDashboard, Info, BookOpen, Briefcase, Newspaper, Mail } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/about", label: "About", icon: Info },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/projects", label: "Projects", icon: Briefcase },
  { to: "/blog", label: "Blog/News", icon: Newspaper },
  { to: "/contact", label: "Contact", icon: Mail }
];