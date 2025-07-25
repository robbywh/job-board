import { redirect } from 'next/navigation'
import Link from "next/link";
import { Briefcase, Search } from 'lucide-react';
import Footer from "@/components/ui/Footer";
import { createClient } from '@/utils/supabase/server'
import LoginForm from '@/app/login/LoginForm'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="hero py-20 relative z-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ml-8">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4">
                <Briefcase className="w-8 h-8 text-primary-content" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Job Board
              </h1>
            </div>
            <p className="text-xl mb-4 text-base-content/80">
              🚀 Your dream career starts here
            </p>
            <p className="py-6 text-base-content/70 max-w-md">
              Connect with top employers and discover opportunities that match your skills. 
              Join thousands of professionals building their future through our platform.
            </p>
            
            <div className="stats shadow bg-base-100/50 backdrop-blur-sm mb-6">
              <div className="stat place-items-center">
                <div className="stat-title">Active Jobs</div>
                <div className="stat-value text-primary">10K+</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Companies</div>
                <div className="stat-value text-secondary">500+</div>
              </div>
            </div>
            <div>
              <Link href="/jobs" className="btn btn-primary btn-lg group">
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Jobs
              </Link>
            </div>
          </div>
          
          <LoginForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
