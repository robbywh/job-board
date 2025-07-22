import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <Navbar />

      {/* Hero Section */}
      <div className="hero py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">
              Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dream Job</span>
            </h1>
            <p className="py-6 text-base-content/70">
              Discover thousands of job opportunities from top companies around the world.
            </p>
            <Link href="/jobs" className="btn btn-primary btn-lg">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 pb-20">
        <div className="stats shadow bg-base-100/50 backdrop-blur-sm w-full">
          <div className="stat place-items-center">
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-primary">10K+</div>
            <div className="stat-desc">Available positions</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Companies</div>
            <div className="stat-value text-secondary">500+</div>
            <div className="stat-desc">Trusted employers</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Success Rate</div>
            <div className="stat-value">98%</div>
            <div className="stat-desc">Job placement</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
