import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Learning from "@/components/Learning";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Home() {
    return (
        <main className="relative">
            <LoadingScreen />
            <ScrollProgressBar />
            <ThreeBackground />
            <Navbar />

            <div className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Learning />
                <GithubActivity />
                <Contact />
                <Footer />
            </div>
        </main>
    );
}
