import { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Briefcase,
  Layers,
  Award,
  FileText,
  MessageSquare,
  Activity,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Database,
  Globe,
  Settings,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  User,
  ServiceItem,
  ProductItem,
  ProjectItem,
  CourseItem,
  CertificateItem,
  JobItem,
  ApplicationItem,
  BlogPostItem,
  ContactMessageItem,
  AuditLogItem,
} from '../../types';

interface AdminDashboardProps {
  onViewCertificate?: (cert: CertificateItem) => void;
  onOpenCertificateModal?: (cert: CertificateItem) => void;
  onNavigatePage?: (page: string, param?: string) => void;
}

export default function AdminDashboard({
  onViewCertificate,
  onOpenCertificateModal,
  onNavigatePage,
}: AdminDashboardProps) {
  const handleViewCert = onOpenCertificateModal || onViewCertificate || (() => {});
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'services'
    | 'products'
    | 'portfolio'
    | 'courses'
    | 'certificates'
    | 'jobs'
    | 'applications'
    | 'blog'
    | 'inquiries'
    | 'users'
    | 'audit-logs'
    | 'deployment'
  >('overview');

  const [stats, setStats] = useState<any>({
    totalUsers: 4,
    totalServices: 5,
    totalProducts: 6,
    totalProjects: 7,
    totalCourses: 10,
    totalCertificates: 2,
    totalJobs: 3,
    totalApplications: 1,
    totalInquiries: 1,
  });

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactMessageItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Certificate generator state
  const [newCertStudent, setNewCertStudent] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('Full-Stack Web & Mobile App Development Bootcamp');
  const [newCertDuration, setNewCertDuration] = useState('6 Months (240 Hours)');
  const [isIssuingCert, setIsIssuingCert] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Fetch all management data
  const refreshData = async () => {
    try {
      const [
        sRes,
        pRes,
        projRes,
        cRes,
        certRes,
        jRes,
        appRes,
        bRes,
        inqRes,
        statRes,
        logRes,
      ] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/products'),
        fetch('/api/projects'),
        fetch('/api/courses'),
        fetch('/api/certificates'),
        fetch('/api/jobs'),
        fetch('/api/applications'),
        fetch('/api/blog'),
        fetch('/api/contact'),
        fetch('/api/admin/stats'),
        fetch('/api/audit-logs'),
      ]);

      if (sRes.ok) setServices(await sRes.json());
      if (pRes.ok) setProducts(await pRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (cRes.ok) setCourses(await cRes.json());
      if (certRes.ok) setCertificates(await certRes.json());
      if (jRes.ok) setJobs(await jRes.json());
      if (appRes.ok) setApplications(await appRes.json());
      if (bRes.ok) setBlogPosts(await bRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
      if (statRes.ok) setStats(await statRes.json());
      if (logRes.ok) setAuditLogs(await logRes.json());
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertStudent) return;
    setIsIssuingCert(true);
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: newCertStudent,
          courseTitle: newCertCourse,
          courseDuration: newCertDuration,
          completionDate: new Date().toISOString().split('T')[0],
        }),
      });
      if (res.ok) {
        const cert = await res.json();
        setActionSuccess(`Successfully issued certificate ${cert.certificateId}!`);
        setNewCertStudent('');
        refreshData();
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsIssuingCert(false);
    }
  };

  const handleToggleCertStatus = async (certId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'valid' ? 'revoked' : 'valid';
    try {
      await fetch(`/api/certificates/${certId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAppStatus = async (appId: string, status: string) => {
    try {
      await fetch(`/api/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/contact/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 mb-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">STDTech Admin Console</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live Control Hub for STDTech Group Pvt Ltd (stdtechgroup.com)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigatePage?.('home')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            View Live Site
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Issue Certificate</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'certificates', label: `Certificates (${stats.totalCertificates || 0})`, icon: Award },
          { id: 'inquiries', label: `Inquiries (${stats.totalInquiries || 0})`, icon: MessageSquare },
          { id: 'applications', label: `Applications (${stats.totalApplications || 0})`, icon: Users },
          { id: 'services', label: `Services (${services.length})`, icon: Layers },
          { id: 'products', label: `Products (${products.length})`, icon: Sparkles },
          { id: 'portfolio', label: `Portfolio (${projects.length})`, icon: Briefcase },
          { id: 'courses', label: `Courses (${courses.length})`, icon: FileText },
          { id: 'jobs', label: `Careers / Jobs (${jobs.length})`, icon: Briefcase },
          { id: 'blog', label: `Blog (${blogPosts.length})`, icon: FileText },
          { id: 'audit-logs', label: 'Audit Logs', icon: Activity },
          { id: 'deployment', label: 'Deployment & DB', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stat metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Total Services</span>
              <p className="text-3xl font-black text-white mt-1">{stats.totalServices}</p>
              <span className="text-[10px] text-emerald-400 mt-1 block">5 Core IT Offerings</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Active Products</span>
              <p className="text-3xl font-black text-white mt-1">{stats.totalProducts}</p>
              <span className="text-[10px] text-pink-400 mt-1 block">SWAYNIS + 5 Systems</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Issued Certificates</span>
              <p className="text-3xl font-black text-white mt-1">{stats.totalCertificates}</p>
              <span className="text-[10px] text-emerald-400 mt-1 block">100% QR Verifiable</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Contact Inquiries</span>
              <p className="text-3xl font-black text-white mt-1">{stats.totalInquiries}</p>
              <span className="text-[10px] text-blue-400 mt-1 block">Client Project Requests</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setActiveTab('certificates')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-slate-200"
                >
                  <Award className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-semibold block">Issue Student Certificate</span>
                  <span className="text-[10px] text-slate-500">Generate with QR verification</span>
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-slate-200"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400 mb-1" />
                  <span className="font-semibold block">Review Inquiries</span>
                  <span className="text-[10px] text-slate-500">Manage client proposals</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-slate-200"
                >
                  <Users className="w-4 h-4 text-pink-400 mb-1" />
                  <span className="font-semibold block">Review Applications</span>
                  <span className="text-[10px] text-slate-500">Screen tech candidates</span>
                </button>
                <button
                  onClick={() => setActiveTab('deployment')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-slate-200"
                >
                  <Database className="w-4 h-4 text-amber-400 mb-1" />
                  <span className="font-semibold block">Domain & PostgreSQL</span>
                  <span className="text-[10px] text-slate-500">stdtechgroup.com config</span>
                </button>
              </div>
            </div>

            {/* Recent Audit Stream */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-3">System Activity & Audit Stream</h3>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-2 text-xs">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-emerald-400">{log.action}</span>
                      <span className="text-slate-500 font-mono">{log.timestamp.slice(0, 10)}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CERTIFICATES MANAGEMENT */}
      {activeTab === 'certificates' && (
        <div className="space-y-8">
          {/* Issue New Certificate Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/30">
            <h3 className="text-lg font-bold text-white mb-1">Issue Verifiable Certificate</h3>
            <p className="text-xs text-slate-400 mb-6">
              Generates an official STDTech Group certificate with cryptographic verification ID and QR code.
            </p>

            <form onSubmit={handleIssueCertificate} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCertStudent}
                  onChange={(e) => setNewCertStudent(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title *</label>
                <select
                  value={newCertCourse}
                  onChange={(e) => setNewCertCourse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                <input
                  type="text"
                  value={newCertDuration}
                  onChange={(e) => setNewCertDuration(e.target.value)}
                  placeholder="e.g. 6 Months (240 Hours)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isIssuingCert}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  {isIssuingCert ? 'Issuing...' : 'Generate & Issue Certificate'}
                </button>
              </div>
            </form>
          </div>

          {/* Certificate Table */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Issued Certificates Registry</h3>
              <span className="text-xs text-slate-400">Total: {certificates.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Cert ID</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-emerald-400">{cert.certificateId}</td>
                      <td className="p-4 font-semibold text-white">{cert.studentName}</td>
                      <td className="p-4 max-w-xs truncate">{cert.courseTitle}</td>
                      <td className="p-4 text-slate-400">{cert.completionDate}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            cert.status === 'valid'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleViewCert(cert)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[11px]"
                        >
                          View / Print
                        </button>
                        <button
                          onClick={() => handleToggleCertStatus(cert.id, cert.status)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                            cert.status === 'valid'
                              ? 'bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {cert.status === 'valid' ? 'Revoke' : 'Reinstate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Client Project Inquiries & Leads</h3>
            <span className="text-xs text-slate-400">Total: {inquiries.length}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{inq.subject}</h4>
                    <p className="text-slate-400">
                      From: <strong>{inq.name}</strong> • {inq.email} • {inq.phone || 'No phone'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">{inq.createdAt.slice(0, 10)}</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-bold text-xs"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 text-slate-300 leading-relaxed">
                  {inq.message}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Selected Service: <strong className="text-emerald-400">{inq.service || 'General'}</strong></span>
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${inq.subject} - STDTech Group`}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Reply via Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: JOB APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Talent Applications (Team Growth)</h3>
            <span className="text-xs text-slate-400">Total: {applications.length}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => (
              <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {app.name} — <span className="text-emerald-400">{app.jobTitle}</span>
                    </h4>
                    <p className="text-slate-400">
                      {app.email} • {app.phone} • Experience: {app.experienceYears} • Education: {app.education}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">{app.createdAt.slice(0, 10)}</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-bold text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {app.coverMessage && (
                  <div className="p-3 rounded-xl bg-slate-950 text-slate-300">
                    <strong className="text-slate-400 block mb-1">Cover Note:</strong>
                    {app.coverMessage}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400">
                  <div className="flex items-center gap-4">
                    {app.resumeFileName && (
                      <span className="text-emerald-400 font-semibold">
                        📎 Resume: {app.resumeFileName}
                      </span>
                    )}
                    {app.portfolioUrl && (
                      <a
                        href={app.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Portfolio / GitHub ↗
                      </a>
                    )}
                  </div>
                  <a
                    href={`mailto:${app.email}?subject=Interview Invitation - STDTech Group`}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Send Email ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">5 Major IT Services (Core Capabilities)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  <span className="font-mono text-emerald-400">0{srv.displayOrder}</span>
                </div>
                <p className="text-slate-400">{srv.shortDescription}</p>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                  {srv.techStack.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Products Management</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((prod) => (
              <div key={prod.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      prod.status === 'COMING SOON'
                        ? 'bg-pink-950 text-pink-400 border border-pink-500/30'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {prod.status}
                  </span>
                </div>
                <p className="text-slate-400">{prod.description}</p>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                  {prod.technology.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Portfolio Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                  <span className="text-emerald-400 font-medium">{proj.status}</span>
                </div>
                <p className="text-slate-400">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">STDTech Academy Courses (10 Categories)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((crs) => (
              <div key={crs.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{crs.title}</h4>
                  <span className="text-slate-400">{crs.duration}</span>
                </div>
                <p className="text-slate-400">{crs.overview}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: CAREERS / JOBS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Careers & Hiring Openings</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{job.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    {job.jobType} • {job.workplaceType}
                  </span>
                </div>
                <p className="text-slate-400">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: BLOG */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Technical Blog Articles</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                  <span className="text-slate-500">{post.readingTime}</span>
                </div>
                <p className="text-slate-400">{post.summary}</p>
                <div className="text-[11px] text-emerald-400">By {post.authorName} • {post.category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: AUDIT LOGS */}
      {activeTab === 'audit-logs' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Security & Action Audit Logs</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
                <div>
                  <span className="font-bold text-emerald-400 mr-2">[{log.action}]</span>
                  <span className="text-slate-300">{log.details}</span>
                  <div className="text-[10px] text-slate-500 mt-1">Triggered by: {log.userEmail}</div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-4">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 12: DEPLOYMENT & DATABASE GUIDANCE */}
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs leading-relaxed text-slate-300">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Production Domain & Cloud Deployment Guide</span>
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <p className="text-emerald-400 font-bold">Primary Domain: https://stdtechgroup.com</p>
              <p className="text-slate-400">Cloud Run / Container Binding: Host 0.0.0.0, Port 3000</p>
            </div>

            <h4 className="text-sm font-bold text-white pt-2">1. Custom Domain DNS Configuration for stdtechgroup.com</h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
              <div>A Record: @ → 216.239.32.21 (or Cloud Run IP)</div>
              <div>CNAME Record: www → ghs.googlehosted.com</div>
              <div>TXT Record: Verification token provided by Google Search Console</div>
            </div>

            <h4 className="text-sm font-bold text-white pt-2">2. PostgreSQL Production Setup</h4>
            <p>
              The full database schema is defined in <code>/db/schema.sql</code> and migrations in <code>/db/migrations.sql</code>.
              To connect a live PostgreSQL instance, specify the <code>DATABASE_URL</code> environment variable:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300">
              DATABASE_URL="postgresql://user:password@cloud-sql-host:5432/stdtech_db?sslmode=require"
            </div>
            <p>
              Our backend runs with resilient internal persistence and automatically bridges to PostgreSQL when DATABASE_URL is configured.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
