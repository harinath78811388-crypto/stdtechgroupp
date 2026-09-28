import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ApplyModal from './components/ApplyModal';
import CertificateModal from './components/CertificateModal';
import EnrollModal from './components/EnrollModal';
import CertificateVerificationView from './components/CertificateVerificationView';

// Dashboards
import AdminDashboard from './components/dashboards/AdminDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import StaffDashboard from './components/dashboards/StaffDashboard';
import CustomerDashboard from './components/dashboards/CustomerDashboard';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import PortfolioPage from './pages/PortfolioPage';
import TrainingPage from './pages/TrainingPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LeadershipPage from './pages/LeadershipPage';
import SolutionsPage from './pages/SolutionsPage';
import TechnologiesPage from './pages/TechnologiesPage';
import IndustriesPage from './pages/IndustriesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

// Types & Initial Data Fallback
import {
  User,
  ServiceItem,
  ProductItem,
  ProjectItem,
  CourseItem,
  BlogPostItem,
  JobItem,
  CertificateItem,
} from './types';
import {
  initialServices,
  initialProducts,
  initialProjects,
  initialCourses,
  initialBlogPosts,
  initialJobs,
  initialCertificates,
} from './data/initialData';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string>('');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('stdtech_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Data Store
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(initialBlogPosts);
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState<JobItem | null>(null);
  const [activeCertificateModal, setActiveCertificateModal] = useState<CertificateItem | null>(null);
  const [activeCourseToEnroll, setActiveCourseToEnroll] = useState<CourseItem | null>(null);

  // Background & Aesthetic Theme State
  // Default: 'mint-pink-white' ("mint green aur 🩷 white ka mixture")
  const [theme, setTheme] = useState<'mint-pink-white' | 'mint-white' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('stdtech_theme');
      return saved === 'mint-pink-white' || saved === 'mint-white' || saved === 'dark'
        ? saved
        : 'mint-pink-white';
    } catch {
      return 'mint-pink-white';
    }
  });

  const handleThemeChange = (newTheme: 'mint-pink-white' | 'mint-white' | 'dark') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('stdtech_theme', newTheme);
    } catch {}
  };

  // Fetch live data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, prdRes, prjRes, crsRes, blgRes, jobRes] = await Promise.allSettled([
          fetch('/api/services').then((r) => (r.ok ? r.json() : initialServices)),
          fetch('/api/products').then((r) => (r.ok ? r.json() : initialProducts)),
          fetch('/api/projects').then((r) => (r.ok ? r.json() : initialProjects)),
          fetch('/api/courses').then((r) => (r.ok ? r.json() : initialCourses)),
          fetch('/api/blog').then((r) => (r.ok ? r.json() : initialBlogPosts)),
          fetch('/api/jobs').then((r) => (r.ok ? r.json() : initialJobs)),
        ]);

        if (srvRes.status === 'fulfilled' && srvRes.value?.length) setServices(srvRes.value);
        if (prdRes.status === 'fulfilled' && prdRes.value?.length) setProducts(prdRes.value);
        if (prjRes.status === 'fulfilled' && prjRes.value?.length) setProjects(prjRes.value);
        if (crsRes.status === 'fulfilled' && crsRes.value?.length) setCourses(crsRes.value);
        if (blgRes.status === 'fulfilled' && blgRes.value?.length) setBlogPosts(blgRes.value);
        if (jobRes.status === 'fulfilled' && jobRes.value?.length) setJobs(jobRes.value);
      } catch (err) {
        console.warn('Using local pre-seeded data:', err);
      }
    };
    fetchData();
  }, []);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      if (!path) {
        setCurrentPage('home');
        setPageParam('');
      } else if (path.startsWith('verify/')) {
        setCurrentPage('verify-cert');
        setPageParam(path.replace('verify/', ''));
      } else if (path.startsWith('service/')) {
        setCurrentPage('service-detail');
        setPageParam(path.replace('service/', ''));
      } else if (path.startsWith('product/')) {
        setCurrentPage('product-detail');
        setPageParam(path.replace('product/', ''));
      } else if (path.startsWith('course/')) {
        setCurrentPage('training-detail');
        setPageParam(path.replace('course/', ''));
      } else if (path.startsWith('blog/')) {
        setCurrentPage('blog-detail');
        setPageParam(path.replace('blog/', ''));
      } else {
        setCurrentPage(path);
        setPageParam('');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: string, param: string = '') => {
    setCurrentPage(page);
    setPageParam(param);

    let url = '/';
    if (page === 'home') url = '/';
    else if (page === 'service-detail') url = `/service/${param}`;
    else if (page === 'product-detail') url = `/product/${param}`;
    else if (page === 'training-detail') url = `/course/${param}`;
    else if (page === 'blog-detail') url = `/blog/${param}`;
    else if (page === 'verify-cert') url = param ? `/verify/${param}` : '/verify';
    else url = `/${page}`;

    try {
      window.history.pushState({}, '', url);
    } catch (e) {
      // In sandbox iframe history might be restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('stdtech_user', JSON.stringify(user));
    setIsAuthModalOpen(false);

    // Auto navigate to their dedicated dashboard
    if (user.role === 'admin') navigateTo('dashboard-admin');
    else if (user.role === 'student') navigateTo('dashboard-student');
    else if (user.role === 'staff') navigateTo('dashboard-staff');
    else if (user.role === 'customer') navigateTo('dashboard-customer');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('stdtech_user');
    navigateTo('home');
  };

  const handleQuickRoleSwitch = (role: 'admin' | 'student' | 'staff' | 'customer') => {
    const demoAccounts: Record<string, User> = {
      admin: {
        id: 'usr-admin-01',
        email: 'admin@stdtechgroup.com',
        fullName: 'Harinath Verma (Founder & Admin)',
        role: 'admin',
        createdAt: '2026-01-01',
      },
      student: {
        id: 'usr-student-01',
        email: 'rahul.kumar@student.stdtechgroup.com',
        fullName: 'Rahul Kumar',
        role: 'student',
        createdAt: '2026-01-15',
      },
      staff: {
        id: 'usr-staff-01',
        email: 'staff.eng@stdtechgroup.com',
        fullName: 'Akash Verma (Co-Founder & Lead Engineer)',
        role: 'staff',
        createdAt: '2026-01-01',
      },
      customer: {
        id: 'usr-client-01',
        email: 'enterprise@apexclient.com',
        fullName: 'Rajesh Gupta (Apex Industries)',
        role: 'customer',
        createdAt: '2026-02-01',
      },
    };

    const targetUser = demoAccounts[role];
    setCurrentUser(targetUser);
    localStorage.setItem('stdtech_user', JSON.stringify(targetUser));

    if (role === 'admin') navigateTo('dashboard-admin');
    else if (role === 'student') navigateTo('dashboard-student');
    else if (role === 'staff') navigateTo('dashboard-staff');
    else if (role === 'customer') navigateTo('dashboard-customer');
  };

  const isDashboardPage = currentPage.startsWith('dashboard-');

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'text-slate-900'
      }`}
    >
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onQuickRoleSwitch={handleQuickRoleSwitch}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Public Pages */}
        {currentPage === 'home' && (
          <HomePage
            services={services}
            products={products}
            projects={projects}
            courses={courses}
            blogPosts={blogPosts}
            onNavigate={navigateTo}
            onOpenApplyModal={() => {
              setSelectedJobToApply(null);
              setIsApplyModalOpen(true);
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenApplyModal={() => {
              setSelectedJobToApply(null);
              setIsApplyModalOpen(true);
            }}
          />
        )}

        {currentPage === 'leadership' && (
          <LeadershipPage
            onNavigate={navigateTo}
            onOpenApplyModal={() => {
              setSelectedJobToApply(null);
              setIsApplyModalOpen(true);
            }}
          />
        )}

        {(currentPage === 'services' || currentPage === 'service-detail') && (
          <ServicesPage
            services={services}
            selectedServiceSlug={currentPage === 'service-detail' ? pageParam : undefined}
            onNavigate={navigateTo}
          />
        )}

        {(currentPage === 'products' || currentPage === 'product-detail') && (
          <ProductsPage
            products={products}
            selectedProductSlug={currentPage === 'product-detail' ? pageParam : undefined}
            onNavigate={navigateTo}
          />
        )}

        {(currentPage === 'portfolio' || currentPage === 'portfolio-detail') && (
          <PortfolioPage
            projects={projects}
            selectedProjectSlug={currentPage === 'portfolio-detail' ? pageParam : undefined}
            onNavigate={navigateTo}
          />
        )}

        {(currentPage === 'training' || currentPage === 'training-detail') && (
          <TrainingPage
            courses={courses}
            selectedCourseSlug={currentPage === 'training-detail' ? pageParam : undefined}
            onNavigate={navigateTo}
            onEnroll={(course) => setActiveCourseToEnroll(course)}
          />
        )}

        {currentPage === 'solutions' && <SolutionsPage onNavigate={navigateTo} />}
        {currentPage === 'technologies' && <TechnologiesPage onNavigate={navigateTo} />}
        {currentPage === 'industries' && <IndustriesPage onNavigate={navigateTo} />}

        {currentPage === 'careers' && (
          <CareersPage
            jobs={jobs}
            onApplyForJob={(job) => {
              setSelectedJobToApply(job);
              setIsApplyModalOpen(true);
            }}
          />
        )}

        {(currentPage === 'blog' || currentPage === 'blog-detail') && (
          <BlogPage
            blogPosts={blogPosts}
            selectedBlogSlug={currentPage === 'blog-detail' ? pageParam : undefined}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && <ContactPage initialSubject={pageParam} />}

        {currentPage === 'verify-cert' && (
          <CertificateVerificationView
            initialCertId={pageParam || 'STDT-2026-00001'}
            onViewCertificateModal={(cert) => setActiveCertificateModal(cert)}
          />
        )}

        {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}

        {/* Dedicated Role-Based Dashboards */}
        {currentPage === 'dashboard-admin' && (
          <AdminDashboard
            onOpenCertificateModal={(cert: CertificateItem) => setActiveCertificateModal(cert)}
          />
        )}

        {currentPage === 'dashboard-student' && (
          <StudentDashboard
            currentUser={currentUser}
            onOpenCertificateModal={(cert: CertificateItem) => setActiveCertificateModal(cert)}
            onExploreCourses={() => navigateTo('training')}
          />
        )}

        {currentPage === 'dashboard-staff' && (
          <StaffDashboard
            currentUser={currentUser}
            onOpenCertificateModal={(cert: CertificateItem) => setActiveCertificateModal(cert)}
          />
        )}

        {currentPage === 'dashboard-customer' && (
          <CustomerDashboard
            currentUser={currentUser}
            onRequestProject={() => navigateTo('contact', 'New Enterprise Project Request')}
          />
        )}
      </main>

      {/* Footer (Rendered on all pages for consistent site access and legal links) */}
      <Footer onNavigate={navigateTo} />

      {/* ========================================================================= */}
      {/* GLOBAL MODALS */}
      {/* ========================================================================= */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {isApplyModalOpen && (
        <ApplyModal
          job={selectedJobToApply}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedJobToApply(null);
          }}
        />
      )}

      {activeCertificateModal && (
        <CertificateModal
          certificate={activeCertificateModal}
          onClose={() => setActiveCertificateModal(null)}
        />
      )}

      {activeCourseToEnroll && (
        <EnrollModal
          course={activeCourseToEnroll}
          onClose={() => setActiveCourseToEnroll(null)}
        />
      )}
    </div>
  );
}
