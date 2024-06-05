"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/AM-TEK.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

const navLinks = [
  {
    href: "/",
    label: "Home Page",
  },
  {
    href: "/posts",
    label: "Posts",
  },
  {
    href: "/create-post",
    label: "Create Post",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b relative">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          className="w-[40px] h-[40px]"
          width="40"
          height="40"
        />
      </Link>

      <button
        className="block md:hidden text-black focus:outline-none"
        onClick={toggleMenu}
      >
        <FaBars className="w-6 h-6" />
      </button>

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute md:relative top-14 right-0 md:top-auto md:right-auto bg-white md:bg-transparent md:flex md:gap-x-5 text-[14px]`}
      >
        <ul className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-5 p-5 md:p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname === link.href ? "text-black" : "text-neutral-700"
                }`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
