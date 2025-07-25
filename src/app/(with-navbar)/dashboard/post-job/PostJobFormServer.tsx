import { Lightbulb, Clock } from 'lucide-react';
import PostJobFormClient from "./PostJobFormClient";

export default function PostJobFormServer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl relative z-10">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          <div className="flex-1 xl:max-w-4xl">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Post a New Job
                  </h1>
                  <p className="text-sm sm:text-base text-base-content/70 mt-1">
                    Find the perfect candidate for your team
                  </p>
                </div>

                <PostJobFormClient />
              </div>
            </div>
          </div>

          <div className="xl:w-80 xl:flex-shrink-0">
            <div className="lg:hidden mb-4">
              <div className="collapse collapse-arrow bg-base-100 shadow-lg">
                <input type="checkbox" /> 
                <div className="collapse-title text-lg font-medium flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Tips for Success
                </div>
                <div className="collapse-content">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        icon: "🎯",
                        title: "Clear Job Title",
                        desc: "Use specific, searchable titles"
                      },
                      {
                        icon: "📝",
                        title: "Detailed Description", 
                        desc: "Include responsibilities and growth opportunities"
                      },
                      {
                        icon: "📍",
                        title: "Accurate Location",
                        desc: "Be specific about location or remote options"
                      },
                      {
                        icon: "🏢",
                        title: "Company Brand",
                        desc: "Add your logo to build trust"
                      }
                    ].map((tip, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="text-lg flex-shrink-0">{tip.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm">{tip.title}</h4>
                          <p className="text-xs text-base-content/70">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block xl:sticky xl:top-6 space-y-4">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    Tips for Success
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      {
                        icon: "🎯",
                        title: "Clear Job Title",
                        desc: "Use specific, searchable titles"
                      },
                      {
                        icon: "📝",
                        title: "Detailed Description", 
                        desc: "Include responsibilities and growth opportunities"
                      },
                      {
                        icon: "📍",
                        title: "Accurate Location",
                        desc: "Be specific about location or remote options"
                      },
                      {
                        icon: "🏢",
                        title: "Company Brand",
                        desc: "Add your logo to build trust"
                      }
                    ].map((tip, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="text-lg flex-shrink-0">{tip.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm">{tip.title}</h4>
                          <p className="text-xs text-base-content/70">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 text-center">
                  <div className="stat p-0">
                    <div className="stat-figure text-primary">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="stat-title text-xs">Average Time to Fill</div>
                    <div className="stat-value text-xl text-primary">23 days</div>
                    <div className="stat-desc text-xs">For similar positions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}