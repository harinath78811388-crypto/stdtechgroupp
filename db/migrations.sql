-- ==========================================================
-- STDTech Group Pvt Ltd — Database Migrations & Initial Seed Data
-- ==========================================================

-- Migration 001_initial_baseline
-- (Includes all table definitions from schema.sql)

-- Insert Roles & Core Administrator
-- Seed accounts use password hashes. Set real credentials via a secure provisioning process; never store plaintext passwords in source control.

INSERT INTO users (id, email, password_hash, full_name, role, phone)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'admin@stdtechgroup.com', '$2b$10$7e1.N6K9e6F0K1v9Z7Q9Me6xY6.Wc0s1Pz9B3D1H6G5J4K3L2M1N0', 'Harinath Verma (Admin)', 'admin', '7318514528'),
    ('00000000-0000-0000-0000-000000000002', 'staff@stdtechgroup.com', '$2b$10$7e1.N6K9e6F0K1v9Z7Q9Me6xY6.Wc0s1Pz9B3D1H6G5J4K3L2M1N0', 'Akash Verma (Staff / Ops)', 'staff', '7318514528'),
    ('00000000-0000-0000-0000-000000000003', 'student@stdtechgroup.com', '$2b$10$7e1.N6K9e6F0K1v9Z7Q9Me6xY6.Wc0s1Pz9B3D1H6G5J4K3L2M1N0', 'Aditya Sharma', 'student', '9876543210'),
    ('00000000-0000-0000-0000-000000000004', 'client@stdtechgroup.com', '$2b$10$7e1.N6K9e6F0K1v9Z7Q9Me6xY6.Wc0s1Pz9B3D1H6G5J4K3L2M1N0', 'Rajesh Gupta', 'customer', '9812345678')
ON CONFLICT (email) DO NOTHING;

-- Seed Sample Verified Certificate
INSERT INTO certificates (
    certificate_id, student_name, course_title, course_duration, completion_date, issuing_organization, status, qr_code_payload, verification_hash
) VALUES (
    'STDT-2026-00001',
    'Aditya Sharma',
    'Full Stack Web & Mobile App Development with AI',
    '6 Months (240 Hours)',
    '2026-08-15',
    'STDTech Group Pvt Ltd',
    'valid',
    'https://stdtechgroup.com/verify/STDT-2026-00001',
    'sha256-stdt-verified-00001-2026'
) ON CONFLICT (certificate_id) DO NOTHING;
