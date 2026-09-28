-- ==========================================================
-- STDTech Group Pvt Ltd — Production PostgreSQL Database Schema
-- Domain: https://stdtechgroup.com
-- Database Engine: PostgreSQL 14+
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types for roles and statuses
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE certificate_status AS ENUM ('valid', 'revoked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'shortlisted', 'rejected', 'hired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'in_progress', 'resolved', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    bio TEXT,
    title VARCHAR(150),
    organization VARCHAR(150),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. STAFF METADATA
CREATE TABLE IF NOT EXISTS staff_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    permissions JSONB DEFAULT '["view_projects", "view_courses"]'::jsonb,
    assigned_tasks_count INT DEFAULT 0
);

-- 4. STUDENT METADATA
CREATE TABLE IF NOT EXISTS student_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    enrollment_number VARCHAR(50) UNIQUE,
    college_institution VARCHAR(200),
    academic_branch VARCHAR(100),
    current_year VARCHAR(50)
);

-- 5. CUSTOMER METADATA
CREATE TABLE IF NOT EXISTS customer_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    company_name VARCHAR(200),
    industry VARCHAR(100),
    gst_number VARCHAR(50),
    contact_person VARCHAR(100)
);

-- 6. SERVICES
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    technology_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    process JSONB NOT NULL DEFAULT '[]'::jsonb,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    solution_statement TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    technology_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'COMING SOON',
    demo_url VARCHAR(255),
    github_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    technology_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    details TEXT,
    demo_url VARCHAR(255),
    github_url VARCHAR(255),
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. TRAINING COURSES
CREATE TABLE IF NOT EXISTS training_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    overview TEXT NOT NULL,
    curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
    duration VARCHAR(50) NOT NULL,
    skill_level VARCHAR(50) NOT NULL,
    learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
    projects JSONB NOT NULL DEFAULT '[]'::jsonb,
    certificate_included BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. COURSE ENROLLMENTS
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES training_courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'enrolled',
    progress_percentage INT DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- 11. CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    course_id UUID REFERENCES training_courses(id) ON DELETE SET NULL,
    course_title VARCHAR(150) NOT NULL,
    course_duration VARCHAR(50) NOT NULL,
    completion_date DATE NOT NULL,
    issuing_organization VARCHAR(150) DEFAULT 'STDTech Group Pvt Ltd',
    status certificate_status DEFAULT 'valid',
    qr_code_payload TEXT NOT NULL,
    verification_hash VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON certificates(certificate_id);

-- 12. CERTIFICATE VERIFICATION AUDIT LOGS
CREATE TABLE IF NOT EXISTS certificate_verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id VARCHAR(50) NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    client_ip VARCHAR(50),
    user_agent TEXT,
    is_valid BOOLEAN NOT NULL
);

-- 13. CAREER JOBS
CREATE TABLE IF NOT EXISTS career_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- Full-time, Internship, Contract
    experience_level VARCHAR(50) NOT NULL, -- Fresher, Experienced, Intern
    workplace_type VARCHAR(50) NOT NULL, -- Remote, On-site, Hybrid
    location VARCHAR(150) DEFAULT 'Jitoura, Ballia, UP / Remote',
    description TEXT NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. JOB APPLICATIONS
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES career_jobs(id) ON DELETE SET NULL,
    job_title VARCHAR(150) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    position VARCHAR(100) NOT NULL,
    experience_years VARCHAR(50),
    education VARCHAR(150),
    resume_url TEXT,
    portfolio_github_linkedin VARCHAR(255),
    cover_message TEXT,
    status application_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author_name VARCHAR(100) DEFAULT 'STDTech Editorial Team',
    reading_time VARCHAR(20) DEFAULT '5 min read',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE
);

-- 16. CONTACT INQUIRIES
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    service VARCHAR(100),
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. CUSTOMER SUPPORT / PROJECT REQUESTS
CREATE TABLE IF NOT EXISTS customer_support_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'Normal',
    status VARCHAR(50) DEFAULT 'Open',
    admin_reply TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. AUDIT LOGS
CREATE TABLE IF NOT EXISTS system_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    user_email VARCHAR(255),
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
