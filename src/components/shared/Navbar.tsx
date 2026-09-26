"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import styles from "./Navbar.module.css";

const navigation = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isPlanPage = pathname === "/my-plan";
  const isWorkoutPage = pathname === "/" || pathname.startsWith("/workout/");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="FitLog home">
          <Image className={styles.brandMark} src={logo} alt="" priority />
          <span className={styles.brandName}>FITLOG</span>
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? isWorkoutPage : isPlanPage;

            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.badges}>
          <Link className={`${styles.badge} ${styles.planBadge}`} href="/my-plan?tab=plan" aria-label="Plan, 0 workouts">
            <span className={styles.badgeLabel}>Plan</span>
            <span className={styles.badgeCount} aria-hidden="true">0</span>
          </Link>
          <Link className={`${styles.badge} ${styles.savedBadge}`} href="/my-plan?tab=saved" aria-label="Saved, 0 workouts">
            <span className={styles.badgeLabel}>Saved</span>
            <span className={styles.badgeCount} aria-hidden="true">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
