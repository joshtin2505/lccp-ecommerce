"use client"
import "./Nav.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  BsCart,
  BsChevronDown,
  BsChevronUp,
  BsLaptop,
  BsList,
  BsMoonStars,
  BsSun,
  BsXLg,
} from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/hooks/useCart"
import useTheme from "@/hooks/useThemes"
import { Theme } from "@/types/types"

/**
 * Renders the navigation component.
 */
function Nav() {
  const pathname = usePathname()
  const [navDropDown, setNavDropDown] = useState<boolean>(false)

  return (
    <header className="home-header">
      <nav className="nav">
        <Link className="logoContainer" href="/">
          <Image
            src="/logo.webp"
            width={192}
            height={192}
            className="logo"
            alt="logo"
          />
        </Link>
        <NavOptions pathname={pathname} type="normal" />
        <button
          onClick={(e) => {
            e.stopPropagation()
            setNavDropDown(!navDropDown)
          }}
          className="md:hidden sm:block"
        >
          {navDropDown ? <BsXLg size={24} /> : <BsList size={24} />}
        </button>
        <AnimatePresence>
          {navDropDown && <NavOptions pathname={pathname} type="dropdown" />}
        </AnimatePresence>
      </nav>
    </header>
  )
}

interface LinksProps {
  pathname: string
  type: "normal" | "dropdown"
}

/**
 * Renders the navigation options.
 * @param pathname - The current pathname.
 * @param type - The type of navigation options to render.
 */
function OptionsLinks({ pathname, type }: LinksProps) {
  const hidden =
    type === "normal" ? "md:flex hidden" : "flex md:hidden flex-col"

  return (
    <ul className={"gap-4 items-center justify-center text-center " + hidden}>
      <Link className={pathname === "/" ? "linkSelected" : "links"} href="/">
        Inicio
      </Link>
      <Link
        className={pathname === "/products" ? "linkSelected" : "links"}
        href="products"
      >
        Productos
      </Link>
      <Link
        className={pathname === "/#aboutUs" ? "linkSelected" : "links"}
        href="#aboutUs"
      >
        Sobre Nosotros
      </Link>
      <Link
        className={pathname === "signIn" ? "linkSelected" : "links"}
        href="signIn"
      >
        Iniciar Sesion
      </Link>
      <Link
        className={pathname === "signUp" ? "linkSelected" : "links"}
        href="signUp"
      >
        Crear Cuenta
      </Link>
      <ThemeDropDown />
      <Cart />
    </ul>
  )
}

/**
 * Renders the navigation options based on the type.
 * @param pathname - The current pathname.
 * @param type - The type of navigation options to render.
 */
function NavOptions({ pathname, type }: LinksProps) {
  if (type === "dropdown") {
    return (
      <motion.ul
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="dropdownContainer"
      >
        <OptionsLinks pathname={pathname} type="dropdown" />
      </motion.ul>
    )
  }
  return <OptionsLinks pathname={pathname} type="normal" />
}

/**
 * Renders the cart component.
 */
function Cart() {
  const [isClient, setIsClient] = useState(false)
  const { cart, setOpenCart, openCart } = useCart()

  useEffect(() => {
    setIsClient(true)
  }, [openCart])

  if (isClient) {
    return (
      <button
        onClick={() => setOpenCart(true)}
        className="relative outline-none"
      >
        <BsCart className={"cartIcon"} size={22} />
        {cart.length > 0 && <span className="cartCounter">{cart.length}</span>}
      </button>
    )
  }
}

/**
 * Renders the theme dropdown component.
 */
function ThemeDropDown() {
  const [dropDown, setDropDown] = useState(false)
  const { setTheme, theme } = useTheme()
  const dropDownRef = useRef<HTMLUListElement>(null)

  /**
   * Handles the change of theme.
   * @param newTheme - The new theme to set.
   */
  const handleChangeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setDropDown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setDropDown((prevState) => !prevState)}
        className="flex gap-2 font-medium btnChangeTheme max-md:bg-tertiary-300 max-md:p-2 max-md:py-1 max-md:rounded max-md:hover:shadow"
      >
        {theme === "light" ? (
          <>
            <BsSun size={22} />
            <span className="md:hidden">Claro</span>
          </>
        ) : (
          <>
            <BsMoonStars size={22} />
            <span className="md:hidden">Oscuro</span>
          </>
        )}
        <span className="md:hidden">
          {dropDown ? <BsChevronUp size={22} /> : <BsChevronDown size={22} />}
        </span>
      </button>
      <AnimatePresence>
        {dropDown && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[-140px] z-30 bg-light-Background-secondary p-2 rounded border-primary-500 border-2 flex flex-col gap-2"
            ref={dropDownRef}
          >
            <button
              className="flex gap-2 p-1 rounded cursor-pointer hover:bg-tertiary-300 hover:shadow"
              onClick={() => handleChangeTheme("light")}
            >
              <BsSun size={22} />
              Claro
            </button>
            <button
              className="flex gap-2 p-1 rounded cursor-pointer hover:bg-tertiary-300 hover:shadow"
              onClick={() => handleChangeTheme("dark")}
            >
              <BsMoonStars size={22} />
              Oscuro
            </button>
            <button
              className="flex gap-2 p-1 rounded cursor-pointer hover:bg-tertiary-300 hover:shadow"
              onClick={() => handleChangeTheme("system")}
            >
              <BsLaptop size={22} />
              Sistema
            </button>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Nav
