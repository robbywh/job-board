import { Mail, Send, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-base-300 via-base-200 to-base-300 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Stay Updated with Latest Jobs</h3>
              <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
                Get exclusive access to premium job opportunities and career insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-bordered flex-1 bg-base-100/80 focus:bg-base-100"
                />
                <button className="btn btn-primary px-8">
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-base-content/10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <p className="font-medium">© 2025 Job Board. All rights reserved.</p>
                <p className="text-sm text-base-content/60 mt-1">
                  Connecting talent with opportunity, one job at a time. 🚀
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <button className="link link-hover hover:text-primary transition-colors">Privacy Policy</button>
                <button className="link link-hover hover:text-primary transition-colors">Terms of Service</button>
              </div>

              <div className="flex gap-4">
                <button className="btn btn-circle btn-ghost btn-sm hover:btn-primary transition-all duration-300" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </button>
                
                <button className="btn btn-circle btn-ghost btn-sm hover:btn-primary transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </button>
                
                <button className="btn btn-circle btn-ghost btn-sm hover:btn-primary transition-all duration-300" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </button>

                <button className="btn btn-circle btn-ghost btn-sm hover:btn-primary transition-all duration-300" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
