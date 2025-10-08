// Admin Panel for Digital Visiting Card
class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.adminModal = null;
        this.setupAdminPanel();
        this.bindEvents();
        this.loadAdminSettings();
    }

    setupAdminPanel() {
        // Create admin modal HTML
        const modalHTML = `
            <div id="admin-modal" class="admin-modal">
                <div class="admin-modal-content">
                    <div class="admin-header">
                        <h3><i class="fas fa-shield-alt"></i> Admin Panel</h3>
                        <button class="close-btn" id="close-admin">&times;</button>
                    </div>
                    
                    <div class="admin-body">
                        <!-- Login Form -->
                        <div id="admin-login" class="admin-section">
                            <h4>Authentication Required</h4>
                            <form id="admin-login-form">
                                <div class="form-group">
                                    <label for="admin-password">Admin Password:</label>
                                    <input type="password" id="admin-password" required>
                                </div>
                                <button type="submit" class="admin-btn primary">
                                    <i class="fas fa-sign-in-alt"></i> Login
                                </button>
                            </form>
                            <div class="admin-note">
                                <p><strong>Default Password:</strong> admin123</p>
                                <p>Change this password immediately after first login!</p>
                            </div>
                        </div>

                        <!-- Admin Dashboard -->
                        <div id="admin-dashboard" class="admin-section" style="display: none;">
                            <div class="admin-tabs">
                                <button class="tab-btn active" data-tab="profile">Profile</button>
                                <button class="tab-btn" data-tab="contact">Contact</button>
                                <button class="tab-btn" data-tab="social">Social</button>
                                <button class="tab-btn" data-tab="skills">Skills</button>
                                <button class="tab-btn" data-tab="security">Security</button>
                            </div>

                            <!-- Profile Tab -->
                            <div class="tab-content active" id="profile-tab">
                                <h4>Profile Information</h4>
                                <form id="profile-form">
                                    <div class="form-group">
                                        <label for="edit-name">Full Name:</label>
                                        <input type="text" id="edit-name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-title">Professional Title:</label>
                                        <input type="text" id="edit-title" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-bio">Bio/Description:</label>
                                        <textarea id="edit-bio" rows="3" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-profile-image">Profile Image URL:</label>
                                        <input type="url" id="edit-profile-image">
                                        <small>Or click on profile image to upload</small>
                                    </div>
                                    <button type="submit" class="admin-btn primary">
                                        <i class="fas fa-save"></i> Save Profile
                                    </button>
                                </form>
                            </div>

                            <!-- Contact Tab -->
                            <div class="tab-content" id="contact-tab">
                                <h4>Contact Information</h4>
                                <form id="contact-form-admin">
                                    <div class="form-group">
                                        <label for="edit-email">Email:</label>
                                        <input type="email" id="edit-email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-phone">Phone:</label>
                                        <input type="tel" id="edit-phone" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-location">Location:</label>
                                        <input type="text" id="edit-location" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-website">Website:</label>
                                        <input type="url" id="edit-website">
                                    </div>
                                    <button type="submit" class="admin-btn primary">
                                        <i class="fas fa-save"></i> Save Contact
                                    </button>
                                </form>
                            </div>

                            <!-- Social Tab -->
                            <div class="tab-content" id="social-tab">
                                <h4>Social Media Links</h4>
                                <form id="social-form">
                                    <div class="form-group">
                                        <label for="edit-linkedin">LinkedIn URL:</label>
                                        <input type="url" id="edit-linkedin">
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-twitter">Twitter URL:</label>
                                        <input type="url" id="edit-twitter">
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-github">GitHub URL:</label>
                                        <input type="url" id="edit-github">
                                    </div>
                                    <div class="form-group">
                                        <label for="edit-instagram">Instagram URL:</label>
                                        <input type="url" id="edit-instagram">
                                    </div>
                                    <button type="submit" class="admin-btn primary">
                                        <i class="fas fa-save"></i> Save Social Links
                                    </button>
                                </form>
                            </div>

                            <!-- Skills Tab -->
                            <div class="tab-content" id="skills-tab">
                                <h4>Skills & Expertise</h4>
                                <div id="skills-editor">
                                    <div class="skills-list">
                                        <!-- Skills will be dynamically populated -->
                                    </div>
                                    <div class="add-skill">
                                        <input type="text" id="new-skill-name" placeholder="Skill name">
                                        <input type="number" id="new-skill-level" min="0" max="100" placeholder="Level (0-100)">
                                        <button type="button" class="admin-btn secondary" id="add-skill-btn">
                                            <i class="fas fa-plus"></i> Add Skill
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Security Tab -->
                            <div class="tab-content" id="security-tab">
                                <h4>Security Settings</h4>
                                <form id="security-form">
                                    <div class="form-group">
                                        <label for="current-password">Current Password:</label>
                                        <input type="password" id="current-password" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="new-password">New Password:</label>
                                        <input type="password" id="new-password" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm-password">Confirm New Password:</label>
                                        <input type="password" id="confirm-password" required>
                                    </div>
                                    <button type="submit" class="admin-btn primary">
                                        <i class="fas fa-key"></i> Change Password
                                    </button>
                                </form>
                                
                                <div class="security-actions">
                                    <h5>Data Management</h5>
                                    <button class="admin-btn secondary" id="backup-data">
                                        <i class="fas fa-download"></i> Backup Data
                                    </button>
                                    <button class="admin-btn secondary" id="restore-data">
                                        <i class="fas fa-upload"></i> Restore Data
                                    </button>
                                    <input type="file" id="restore-file" accept=".json" style="display: none;">
                                </div>
                            </div>

                            <div class="admin-footer">
                                <button class="admin-btn danger" id="logout-btn">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.adminModal = document.getElementById('admin-modal');

        // Add admin styles
        this.addAdminStyles();
    }

    addAdminStyles() {
        const styles = `
            <style id="admin-styles">
                .admin-modal {
                    display: none;
                    position: fixed;
                    z-index: 10000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                    backdrop-filter: blur(5px);
                }

                .admin-modal-content {
                    background: var(--card-color);
                    margin: 2% auto;
                    border-radius: var(--radius-xl);
                    width: 90%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-heavy);
                    animation: slideIn 0.3s ease;
                }

                @keyframes slideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .admin-header {
                    padding: var(--spacing-xl);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--gradient-primary);
                    color: white;
                    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
                }

                .admin-header h3 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-sm);
                    transition: all var(--transition-fast);
                }

                .close-btn:hover {
                    background: rgba(255,255,255,0.2);
                }

                .admin-body {
                    padding: var(--spacing-xl);
                }

                .admin-section h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-lg);
                    font-size: 1.3rem;
                }

                .admin-note {
                    background: #fef3c7;
                    color: #92400e;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-md);
                    margin-top: var(--spacing-md);
                    border-left: 4px solid #f59e0b;
                }

                .admin-tabs {
                    display: flex;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-xl);
                    border-bottom: 1px solid var(--border-color);
                    flex-wrap: wrap;
                }

                .tab-btn {
                    background: none;
                    border: none;
                    padding: var(--spacing-md) var(--spacing-lg);
                    color: var(--text-secondary);
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all var(--transition-fast);
                    font-weight: 500;
                }

                .tab-btn.active, .tab-btn:hover {
                    color: var(--primary-color);
                    border-bottom-color: var(--primary-color);
                }

                .tab-content {
                    display: none;
                }

                .tab-content.active {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .admin-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-md) var(--spacing-lg);
                    border: none;
                    border-radius: var(--radius-md);
                    font-family: inherit;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all var(--transition-smooth);
                    margin-right: var(--spacing-sm);
                    margin-bottom: var(--spacing-sm);
                }

                .admin-btn.primary {
                    background: var(--gradient-primary);
                    color: white;
                }

                .admin-btn.secondary {
                    background: var(--surface-color);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                }

                .admin-btn.danger {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    color: white;
                }

                .admin-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-medium);
                }

                .form-group {
                    margin-bottom: var(--spacing-lg);
                }

                .form-group label {
                    display: block;
                    margin-bottom: var(--spacing-sm);
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: var(--spacing-md);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    background: var(--surface-color);
                    color: var(--text-primary);
                    font-family: inherit;
                    transition: all var(--transition-smooth);
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }

                .skills-list {
                    margin-bottom: var(--spacing-lg);
                }

                .skill-editor-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md);
                    background: var(--surface-color);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--spacing-sm);
                }

                .skill-editor-item input {
                    flex: 1;
                    margin: 0;
                }

                .skill-editor-item input[type="number"] {
                    max-width: 80px;
                }

                .add-skill {
                    display: flex;
                    gap: var(--spacing-sm);
                    align-items: end;
                    flex-wrap: wrap;
                }

                .add-skill input {
                    flex: 1;
                    min-width: 150px;
                }

                .security-actions {
                    margin-top: var(--spacing-xl);
                    padding-top: var(--spacing-xl);
                    border-top: 1px solid var(--border-color);
                }

                .security-actions h5 {
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-md);
                }

                .admin-footer {
                    margin-top: var(--spacing-xl);
                    padding-top: var(--spacing-xl);
                    border-top: 1px solid var(--border-color);
                    text-align: right;
                }

                @media (max-width: 768px) {
                    .admin-modal-content {
                        width: 95%;
                        margin: 5% auto;
                    }
                    
                    .admin-tabs {
                        flex-direction: column;
                    }
                    
                    .add-skill {
                        flex-direction: column;
                    }
                    
                    .skill-editor-item {
                        flex-direction: column;
                        align-items: stretch;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    bindEvents() {
        // Show admin modal
        window.addEventListener('showAdminLogin', () => {
            this.showModal();
        });

        // Close modal
        document.getElementById('close-admin').addEventListener('click', () => {
            this.hideModal();
        });

        // Close modal on outside click
        this.adminModal.addEventListener('click', (e) => {
            if (e.target === this.adminModal) {
                this.hideModal();
            }
        });

        // Login form
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            this.handleLogin(e);
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.getAttribute('data-tab'));
            });
        });

        // Form submissions
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            this.handleProfileUpdate(e);
        });

        document.getElementById('contact-form-admin').addEventListener('submit', (e) => {
            this.handleContactUpdate(e);
        });

        document.getElementById('social-form').addEventListener('submit', (e) => {
            this.handleSocialUpdate(e);
        });

        document.getElementById('security-form').addEventListener('submit', (e) => {
            this.handlePasswordChange(e);
        });

        // Skills management
        document.getElementById('add-skill-btn').addEventListener('click', () => {
            this.addSkill();
        });

        // Data management
        document.getElementById('backup-data').addEventListener('click', () => {
            this.backupData();
        });

        document.getElementById('restore-data').addEventListener('click', () => {
            document.getElementById('restore-file').click();
        });

        document.getElementById('restore-file').addEventListener('change', (e) => {
            this.restoreData(e);
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.adminModal.style.display === 'block') {
                this.hideModal();
            }
        });
    }

    showModal() {
        this.adminModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (this.isAuthenticated) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    hideModal() {
        this.adminModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    showLogin() {
        document.getElementById('admin-login').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
        document.getElementById('admin-password').focus();
    }

    showDashboard() {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        this.populateFields();
        this.populateSkills();
    }

    handleLogin(e) {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
        
        if (password === storedPassword) {
            this.isAuthenticated = true;
            this.showDashboard();
            window.digitalCard?.showToast('Login successful!', 'success');
            
            // Enable admin mode in main app
            if (window.digitalCard) {
                window.digitalCard.isAdminMode = true;
            }
        } else {
            window.digitalCard?.showToast('Invalid password!', 'error');
            document.getElementById('admin-password').value = '';
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    populateFields() {
        const userData = window.digitalCard?.getUserData() || {};
        
        // Profile fields
        document.getElementById('edit-name').value = userData.name || '';
        document.getElementById('edit-title').value = userData.title || '';
        document.getElementById('edit-bio').value = userData.bio || '';
        document.getElementById('edit-profile-image').value = document.getElementById('profile-img')?.src || '';
        
        // Contact fields
        document.getElementById('edit-email').value = userData.email || '';
        document.getElementById('edit-phone').value = userData.phone || '';
        document.getElementById('edit-location').value = userData.location || '';
        document.getElementById('edit-website').value = userData.website || '';
        
        // Social fields
        document.getElementById('edit-linkedin').value = userData.linkedin || '';
        document.getElementById('edit-twitter').value = userData.twitter || '';
        document.getElementById('edit-github').value = userData.github || '';
        document.getElementById('edit-instagram').value = userData.instagram || '';
    }

    populateSkills() {
        const skillsList = document.querySelector('.skills-list');
        const skills = this.getSkillsData();
        
        skillsList.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-editor-item';
            skillItem.innerHTML = `
                <input type="text" value="${skill.name}" data-skill-index="${index}" data-field="name">
                <input type="number" value="${skill.level}" min="0" max="100" data-skill-index="${index}" data-field="level">
                <button type="button" class="admin-btn danger" onclick="adminPanel.removeSkill(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            skillsList.appendChild(skillItem);
        });
        
        // Add event listeners for skill updates
        skillsList.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateSkill(e.target.getAttribute('data-skill-index'), e.target.getAttribute('data-field'), e.target.value);
            });
        });
    }

    getSkillsData() {
        const skillElements = document.querySelectorAll('.skill-item');
        const skills = [];
        
        skillElements.forEach(item => {
            const name = item.querySelector('.skill-name').textContent;
            const level = item.querySelector('.skill-progress').getAttribute('data-progress');
            skills.push({ name, level: parseInt(level) });
        });
        
        return skills;
    }

    updateSkill(index, field, value) {
        const skills = this.getSkillsData();
        if (skills[index]) {
            skills[index][field] = field === 'level' ? parseInt(value) : value;
            this.saveSkills(skills);
        }
    }

    addSkill() {
        const name = document.getElementById('new-skill-name').value.trim();
        const level = parseInt(document.getElementById('new-skill-level').value) || 0;
        
        if (!name) {
            window.digitalCard?.showToast('Please enter a skill name', 'error');
            return;
        }
        
        const skills = this.getSkillsData();
        skills.push({ name, level });
        this.saveSkills(skills);
        
        // Clear inputs
        document.getElementById('new-skill-name').value = '';
        document.getElementById('new-skill-level').value = '';
        
        this.populateSkills();
        window.digitalCard?.showToast('Skill added successfully!', 'success');
    }

    removeSkill(index) {
        const skills = this.getSkillsData();
        skills.splice(index, 1);
        this.saveSkills(skills);
        this.populateSkills();
        window.digitalCard?.showToast('Skill removed successfully!', 'success');
    }

    saveSkills(skills) {
        // Update DOM
        const skillsContainer = document.querySelector('.skills-container');
        skillsContainer.innerHTML = '';
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skill.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="${skill.level}"></div>
                </div>
            `;
            skillsContainer.appendChild(skillItem);
        });
        
        // Re-animate skills
        window.digitalCard?.animateSkills();
        
        // Save to localStorage
        localStorage.setItem('skills', JSON.stringify(skills));
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('edit-name').value,
            title: document.getElementById('edit-title').value,
            bio: document.getElementById('edit-bio').value
        };
        
        const profileImage = document.getElementById('edit-profile-image').value;
        if (profileImage) {
            document.getElementById('profile-img').src = profileImage;
        }
        
        window.digitalCard?.updateCardData(data);
        window.digitalCard?.showToast('Profile updated successfully!', 'success');
    }

    handleContactUpdate(e) {
        e.preventDefault();
        
        const data = {
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            location: document.getElementById('edit-location').value,
            website: document.getElementById('edit-website').value
        };
        
        window.digitalCard?.updateCardData(data);
        window.digitalCard?.showToast('Contact information updated successfully!', 'success');
    }

    handleSocialUpdate(e) {
        e.preventDefault();
        
        const data = {
            'linkedin-link': document.getElementById('edit-linkedin').value,
            'twitter-link': document.getElementById('edit-twitter').value,
            'github-link': document.getElementById('edit-github').value,
            'instagram-link': document.getElementById('edit-instagram').value
        };
        
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element && data[key]) {
                element.href = data[key];
            }
        });
        
        // Save to localStorage
        localStorage.setItem('socialLinks', JSON.stringify(data));
        window.digitalCard?.showToast('Social links updated successfully!', 'success');
    }

    handlePasswordChange(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
        
        if (currentPassword !== storedPassword) {
            window.digitalCard?.showToast('Current password is incorrect!', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            window.digitalCard?.showToast('New passwords do not match!', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            window.digitalCard?.showToast('Password must be at least 6 characters long!', 'error');
            return;
        }
        
        localStorage.setItem('adminPassword', newPassword);
        window.digitalCard?.showToast('Password changed successfully!', 'success');
        
        // Clear form
        document.getElementById('security-form').reset();
    }

    backupData() {
        const userData = window.digitalCard?.getUserData() || {};
        const skills = JSON.parse(localStorage.getItem('skills') || '[]');
        const socialLinks = JSON.parse(localStorage.getItem('socialLinks') || '{}');
        
        const backupData = {
            userData,
            skills,
            socialLinks,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `digital-card-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        window.digitalCard?.showToast('Data backup downloaded successfully!', 'success');
    }

    restoreData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const backupData = JSON.parse(e.target.result);
                
                // Restore user data
                if (backupData.userData) {
                    window.digitalCard?.updateCardData(backupData.userData);
                }
                
                // Restore skills
                if (backupData.skills) {
                    this.saveSkills(backupData.skills);
                }
                
                // Restore social links
                if (backupData.socialLinks) {
                    Object.keys(backupData.socialLinks).forEach(key => {
                        const element = document.getElementById(key);
                        if (element && backupData.socialLinks[key]) {
                            element.href = backupData.socialLinks[key];
                        }
                    });
                    localStorage.setItem('socialLinks', JSON.stringify(backupData.socialLinks));
                }
                
                this.populateFields();
                this.populateSkills();
                
                window.digitalCard?.showToast('Data restored successfully!', 'success');
            } catch (error) {
                window.digitalCard?.showToast('Invalid backup file!', 'error');
            }
        };
        
        reader.readAsText(file);
        e.target.value = ''; // Reset file input
    }

    logout() {
        this.isAuthenticated = false;
        if (window.digitalCard) {
            window.digitalCard.isAdminMode = false;
        }
        this.hideModal();
        window.digitalCard?.showToast('Logged out successfully!', 'success');
    }

    loadAdminSettings() {
        // Load any saved admin settings
        const savedSkills = localStorage.getItem('skills');
        if (savedSkills) {
            this.saveSkills(JSON.parse(savedSkills));
        }
        
        const savedSocialLinks = localStorage.getItem('socialLinks');
        if (savedSocialLinks) {
            const links = JSON.parse(savedSocialLinks);
            Object.keys(links).forEach(key => {
                const element = document.getElementById(key);
                if (element && links[key]) {
                    element.href = links[key];
                }
            });
        }
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminPanel;
}