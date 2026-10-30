
      {/* STDTech Team */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-800 border border-pink-300">
            <UserCheck className="w-3.5 h-3.5 text-pink-600" />
            <span>Our Team</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            The People Behind STDTech
          </h3>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            A growing team learning, creating, and contributing to Technology, Innovation & Impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {([
            {
              name: 'Sudhanshu Prajapati',
              branch: 'Computer Science in Engineering',
              year: '2nd Year',
              role: 'Video Editor & Content Creator',
              team: 'Creative Media & Content Team',
              image: '/images/team/sudhanshu-prajapati.png',
              accent: 'emerald'
            },
            {
              name: 'Jatin Singh Chauhan',
              branch: 'Information Technology',
              year: '2nd Year',
              role: 'Business Development & Content Creation',
              team: 'Business Development & Content',
              image: '/images/team/jatin-singh-chauhan.png',
              accent: 'pink'
            },
            {
              name: 'Anurag patel',
              branch: 'Information Technology',
              year: '2nd Year',
              role: 'AI, Design & Digital Media',
              team: 'AI, Design & Digital Media',
              image: '/images/team/anuragh.png',
              accent: 'teal'
            },
            {
              name: 'Shivam Shonkar',
              role: 'AI/ML Developer',
              team: 'AI & Machine Learning Department',
              focus: 'AI-Based Student Performance Prediction System',
              image: '/images/team/shivam-shonkar.png',
              accent: 'blue'
            }
          ] as {
            name: string;
            branch?: string;
            year?: string;
            role: string;
            team: string;
            focus?: string;
            image: string;
            accent: string;
          }[]).map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-black text-slate-900">
                      {member.name}
                    </h4>
                    <p className="text-xs font-bold text-emerald-700 mt-1">
                      {member.role}
                    </p>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                    Team
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-xs text-slate-700">
                  {member.year && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{member.year}</span>
                    </div>
                  )}

                  {member.branch && (
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-pink-600" />
                      <span>Branch: {member.branch}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                    <span>{member.team}</span>
                  </div>

                  {member.focus && (
                    <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] leading-relaxed text-slate-600">
                      <span className="font-bold text-slate-700">Project:</span>
                      {' '}{member.focus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
