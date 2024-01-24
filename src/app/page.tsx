'use client'
import Nav from "@/components/Nav"
import ImageGallery from "@/components/ImageGallery"
import useTheme from "@/hooks/useThemes"
import WelcomText from "@/components/WelcomText"
import AboutUs from "@/components/AboutUs"
import Products from "@/components/Products"

export default function Home() {
  const setTheme = useTheme()

  return (
    <main className="main-container flex min-h-screen flex-col items-center justify-between  ">
      <header className="w-screen relative px-14 pt-4">
        <Nav/>
      </header>      

      <section className="welcome-section w-full items-center flex justify-center px-28 shadow-md z-10">
        <WelcomText/>
        <ImageGallery/>
      </section>
      <Products/>
      <AboutUs/>
    
     
    </main>
  )
}
