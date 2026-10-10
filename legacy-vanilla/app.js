/**
 * CreatorAI - Main Application Logic
 * Implements search/filters, dynamic rendering, creator profile modals,
 * project brief builder with live preview & validation, project listings,
 * creator application flow, and the AI creative brief assistant.
 */

// Application State
const state = {
  creators: [...SAMPLE_CREATORS],
  projects: [],
  filters: {
    search: '',
    category: 'all',
    tool: 'all',
    sort: 'rating-desc'
  },
  projectFilters: {
    search: '',
    category: 'all'
  },
  activeCreatorId: null,
  activeProjectIdForApply: null,
  activeProjectIdForView: null
};

// ==========================================================================
// Initialization & LocalStorage Management
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNavigation();
  initCreatorFilters();
  initProjectFilters();
  initBriefBuilder();
  initAiAssistant();
  initModals();
  
  // Render initial views
  renderCreators();
  renderProjects();
  setupLiveBriefPreview();
});

function initStorage() {
  const savedProjects = localStorage.getItem('creatorai_projects');
  if (savedProjects) {
    try {
      state.projects = JSON.parse(savedProjects);
    } catch (e) {
      console.error('Failed to parse saved projects, falling back to initial', e);
      state.projects = [...INITIAL_PROJECTS];
    }
  } else {
    state.projects = [...INITIAL_PROJECTS];
    saveProjectsToStorage();
  }
}

function saveProjectsToStorage() {
  localStorage.setItem('creatorai_projects', JSON.stringify(state.projects));
}

// ==========================================================================
// Navigation & Smooth Scrolling
// ==========================================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          if (navLinksContainer) navLinksContainer.classList.remove('mobile-open');
        }
      }
    });
  });

  // Action Buttons smooth scroll
  const heroExploreBtn = document.getElementById('heroExploreBtn');
  const heroPostBtn = document.getElementById('heroPostBtn');
  const navPostBtn = document.getElementById('navPostBtn');

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
      document.getElementById('creators-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroPostBtn) {
    heroPostBtn.addEventListener('click', () => {
      document.getElementById('brief-builder-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (navPostBtn) {
    navPostBtn.addEventListener('click', () => {
      document.getElementById('brief-builder-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// Creator Directory: Filters & Search
// ==========================================================================
function initCreatorFilters() {
  const searchInput = document.getElementById('creatorSearchInput');
  const searchClearBtn = document.getElementById('creatorSearchClear');
  const toolSelect = document.getElementById('creatorToolSelect');
  const sortSelect = document.getElementById('creatorSortSelect');
  const categoryChips = document.querySelectorAll('.filter-chip[data-category]');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = state.filters.search ? 'block' : 'none';
      }
      renderCreators();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.filters.search = '';
      searchClearBtn.style.display = 'none';
      renderCreators();
    });
  }

  if (toolSelect) {
    toolSelect.addEventListener('change', (e) => {
      state.filters.tool = e.target.value;
      renderCreators();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderCreators();
    });
  }

  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.filters.category = chip.getAttribute('data-category');
      renderCreators();
    });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      resetAllCreatorFilters();
    });
  }
}

function resetAllCreatorFilters() {
  state.filters.search = '';
  state.filters.category = 'all';
  state.filters.tool = 'all';
  state.filters.sort = 'rating-desc';

  const searchInput = document.getElementById('creatorSearchInput');
  const searchClearBtn = document.getElementById('creatorSearchClear');
  const toolSelect = document.getElementById('creatorToolSelect');
  const sortSelect = document.getElementById('creatorSortSelect');
  const categoryChips = document.querySelectorAll('.filter-chip[data-category]');

  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';
  if (toolSelect) toolSelect.value = 'all';
  if (sortSelect) sortSelect.value = 'rating-desc';

  categoryChips.forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-category') === 'all');
  });

  renderCreators();
  showToast('Filters reset to default view', 'info');
}

function getFilteredCreators() {
  let list = [...state.creators];

  // Search filter
  if (state.filters.search) {
    const q = state.filters.search;
    list = list.filter(creator => {
      const matchName = creator.name.toLowerCase().includes(q);
      const matchTitle = creator.title.toLowerCase().includes(q);
      const matchBio = creator.bio.toLowerCase().includes(q);
      const matchSkills = creator.skills.some(s => s.toLowerCase().includes(q));
      const matchTools = creator.aiTools.some(t => t.toLowerCase().includes(q));
      const matchSpecs = creator.specializations.some(sp => sp.toLowerCase().includes(q));
      return matchName || matchTitle || matchBio || matchSkills || matchTools || matchSpecs;
    });
  }

  // Category filter
  if (state.filters.category !== 'all') {
    list = list.filter(c => c.primaryCategory === state.filters.category);
  }

  // Tool filter
  if (state.filters.tool !== 'all') {
    const targetTool = state.filters.tool.toLowerCase();
    list = list.filter(c => c.aiTools.some(t => t.toLowerCase().includes(targetTool)));
  }

  // Sorting
  switch (state.filters.sort) {
    case 'rating-desc':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'projects-desc':
      list.sort((a, b) => b.completedProjects - a.completedProjects);
      break;
    case 'rate-asc':
      list.sort((a, b) => a.hourlyRate - b.hourlyRate);
      break;
    case 'rate-desc':
      list.sort((a, b) => b.hourlyRate - a.hourlyRate);
      break;
    default:
      break;
  }

  return list;
}

function renderCreators() {
  const container = document.getElementById('creatorsGrid');
  const countBadge = document.getElementById('creatorCountBadge');
  const emptyState = document.getElementById('creatorsEmptyState');
  const activeTagsWrap = document.getElementById('activeFilterTags');

  if (!container) return;

  const filtered = getFilteredCreators();

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${state.creators.length} Creators`;
  }

  // Active filter indicators
  if (activeTagsWrap) {
    activeTagsWrap.innerHTML = '';
    if (state.filters.search) {
      activeTagsWrap.innerHTML += `<span class="active-filter-tag">Query: "${state.filters.search}"</span>`;
    }
    if (state.filters.category !== 'all') {
      activeTagsWrap.innerHTML += `<span class="active-filter-tag">Category: ${state.filters.category}</span>`;
    }
    if (state.filters.tool !== 'all') {
      activeTagsWrap.innerHTML += `<span class="active-filter-tag">Tool: ${state.filters.tool}</span>`;
    }
  }

  if (filtered.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  container.style.display = 'grid';
  container.innerHTML = '';

  filtered.forEach(creator => {
    const card = document.createElement('div');
    card.className = 'creator-card';
    card.innerHTML = `
      <div class="creator-card-header" style="background-image: url('${creator.coverImage}')">
        <div class="creator-badge-pill">
          <span>★</span> ${creator.badge}
        </div>
      </div>
      <div class="creator-card-body">
        <div class="creator-avatar-row">
          <div class="creator-avatar-wrap">
            <img src="${creator.avatar}" alt="${creator.name}" loading="lazy" />
            ${creator.verified ? '<div class="creator-verified-check" title="Verified AI Creator">✓</div>' : ''}
          </div>
          <div class="creator-rate-tag">
            <div class="creator-rate-val">$${creator.hourlyRate}/hr</div>
            <div class="creator-rate-label">From $${creator.minProjectBudget}/proj</div>
          </div>
        </div>

        <h3 class="creator-name">
          ${creator.name}
        </h3>
        <p class="creator-title">${creator.title}</p>

        <div class="creator-meta-stats">
          <span class="rating-star">★ ${creator.rating}</span>
          <span>(${creator.reviewCount} reviews)</span>
          <span>•</span>
          <span>${creator.completedProjects} projects</span>
          <span>•</span>
          <span>📍 ${creator.location}</span>
        </div>

        <p class="creator-bio-snippet">${creator.bio}</p>

        <div class="tags-group">
          <div class="tags-group-label">Core AI Tools</div>
          <div class="pills-wrap">
            ${creator.aiTools.slice(0, 4).map(tool => `<span class="tool-pill">${tool}</span>`).join('')}
            ${creator.aiTools.length > 4 ? `<span class="tool-pill">+${creator.aiTools.length - 4}</span>` : ''}
          </div>
        </div>

        <div class="portfolio-preview-strip">
          <div class="tags-group-label">Portfolio Highlights</div>
          <div class="portfolio-thumbs-row">
            ${creator.portfolio.map((item, idx) => `
              <div class="portfolio-thumb" onclick="openCreatorModal('${creator.id}', 'portfolio')" title="${item.title}">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="portfolio-thumb-overlay">View</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="commercial-tag-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>${creator.commercialInfo.licenseTag}</span>
        </div>

        <div class="creator-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="openCreatorModal('${creator.id}')">
            View Profile
          </button>
          <button class="btn btn-primary btn-sm" onclick="inviteCreatorToBrief('${creator.id}')">
            Hire / Invite
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// Creator Profile Modal
// ==========================================================================
function openCreatorModal(creatorId, defaultTab = 'about') {
  const creator = state.creators.find(c => c.id === creatorId);
  if (!creator) return;

  state.activeCreatorId = creatorId;

  const modal = document.getElementById('creatorProfileModal');
  const content = document.getElementById('creatorModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-header-hero" style="background-image: url('${creator.coverImage}')"></div>
    <div class="modal-body">
      <div class="profile-summary-header">
        <div style="display: flex; gap: 1.25rem; align-items: flex-end;">
          <div class="profile-avatar-big">
            <img src="${creator.avatar}" alt="${creator.name}" />
          </div>
          <div>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">${creator.name}</h2>
            <div style="color: var(--accent-blue); font-size: 0.95rem;">${creator.handle} • 📍 ${creator.location}</div>
          </div>
        </div>
        <div>
          <button class="btn btn-primary" onclick="inviteCreatorToBrief('${creator.id}')">
            Invite to Project Brief
          </button>
        </div>
      </div>

      <div class="creator-meta-stats" style="margin-bottom: 1.5rem; font-size: 0.95rem;">
        <span class="rating-star">★ ${creator.rating} Rating</span>
        <span>•</span>
        <span>${creator.reviewCount} Client Reviews</span>
        <span>•</span>
        <span>${creator.completedProjects} Projects Completed</span>
        <span>•</span>
        <span style="color: #34d399; font-weight: 700;">$${creator.hourlyRate}/hour</span>
      </div>

      <!-- Navigation Tabs inside Profile -->
      <div class="profile-tabs-nav">
        <button class="profile-tab-btn ${defaultTab === 'about' ? 'active' : ''}" onclick="switchProfileTab('about')">Overview & Bio</button>
        <button class="profile-tab-btn ${defaultTab === 'portfolio' ? 'active' : ''}" onclick="switchProfileTab('portfolio')">Portfolio (${creator.portfolio.length})</button>
        <button class="profile-tab-btn ${defaultTab === 'workflow' ? 'active' : ''}" onclick="switchProfileTab('workflow')">Production Workflow</button>
        <button class="profile-tab-btn ${defaultTab === 'commercial' ? 'active' : ''}" onclick="switchProfileTab('commercial')">Commercial Clearance</button>
      </div>

      <!-- Tab 1: Overview -->
      <div id="tab-about" class="profile-tab-panel ${defaultTab === 'about' ? 'active' : ''}">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #fff;">About the Creator</h4>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">${creator.bio}</p>

        <div style="margin-bottom: 1.5rem;">
          <h5 class="tags-group-label" style="font-size: 0.85rem; margin-bottom: 0.6rem;">Specializations</h5>
          <div class="pills-wrap">
            ${creator.specializations.map(s => `<span class="skill-pill" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h5 class="tags-group-label" style="font-size: 0.85rem; margin-bottom: 0.6rem;">AI Tool Stack</h5>
          <div class="pills-wrap">
            ${creator.aiTools.map(t => `<span class="tool-pill" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${t}</span>`).join('')}
          </div>
        </div>

        <div>
          <h5 class="tags-group-label" style="font-size: 0.85rem; margin-bottom: 0.6rem;">Technical Skills</h5>
          <div class="pills-wrap">
            ${creator.skills.map(s => `<span class="skill-pill" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Tab 2: Portfolio Gallery -->
      <div id="tab-portfolio" class="profile-tab-panel ${defaultTab === 'portfolio' ? 'active' : ''}">
        <div class="modal-portfolio-grid">
          ${creator.portfolio.map(item => `
            <div class="modal-portfolio-card">
              <div class="modal-portfolio-img">
                <img src="${item.image}" alt="${item.title}" />
              </div>
              <div class="modal-portfolio-details">
                <span class="section-tag" style="font-size: 0.65rem; margin-bottom: 0.3rem;">${item.type}</span>
                <div class="modal-portfolio-title">${item.title}</div>
                <p style="font-size: 0.825rem; color: var(--text-secondary); margin-bottom: 0.6rem;">${item.description}</p>
                <div class="pills-wrap" style="margin-bottom: 0.5rem;">
                  ${item.tools.map(t => `<span class="tool-pill" style="font-size: 0.7rem;">${t}</span>`).join('')}
                </div>
                <div class="modal-portfolio-snippet">
                  <strong>Prompt / Concept:</strong><br/>
                  ${item.promptSnippet}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 3: Workflow -->
      <div id="tab-workflow" class="profile-tab-panel ${defaultTab === 'workflow' ? 'active' : ''}">
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">
          Every project follows a structured milestone pipeline with checkpoint reviews to ensure prompt fidelity, identity lock, and legal commercial clearance.
        </p>
        <div class="workflow-timeline">
          ${creator.workflow.map((step, index) => `
            <div class="workflow-step-item">
              <div class="workflow-step-num">0${index + 1}</div>
              <div>
                <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">${step.step}</h4>
                <p style="font-size: 0.875rem; color: var(--text-secondary);">${step.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 4: Commercial Rights & Legal -->
      <div id="tab-commercial" class="profile-tab-panel ${defaultTab === 'commercial' ? 'active' : ''}">
        <div class="commercial-legal-box">
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.85rem;">
            <span style="font-size: 1.3rem;">🛡️</span>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #fff;">${creator.commercialInfo.clearanceLevel}</h4>
          </div>
          <p style="color: #cbd5e1; font-size: 0.925rem; line-height: 1.6; margin-bottom: 1.25rem;">
            ${creator.commercialInfo.summary}
          </p>

          <h5 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6ee7b7; margin-bottom: 0.6rem;">Commercial Warranties Provided</h5>
          <ul class="commercial-legal-checklist">
            <li><span>✓</span> Perpetual, Worldwide Rights Assignment</li>
            <li><span>✓</span> 100% Trademark & Likeness Indemnification</li>
            <li><span>✓</span> Raw Master Deliverables (.ProRes, .TIFF, .PSD)</li>
            <li><span>✓</span> Generation Seed & Lora Weights Access</li>
            <li><span>✓</span> Advertising Policy Compliant (Meta, TikTok, Google)</li>
            <li><span>✓</span> Non-Disclosure Agreement (NDA) Compliant</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchProfileTab(tabName) {
  const tabs = document.querySelectorAll('.profile-tab-btn');
  const panels = document.querySelectorAll('.profile-tab-panel');

  tabs.forEach(btn => btn.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));

  const activeBtn = Array.from(tabs).find(b => b.textContent.toLowerCase().includes(tabName.toLowerCase()));
  const activePanel = document.getElementById(`tab-${tabName}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.add('active');
}

function inviteCreatorToBrief(creatorId) {
  closeModals();
  const creator = state.creators.find(c => c.id === creatorId);
  const briefSection = document.getElementById('brief-builder-section');

  if (creator && briefSection) {
    briefSection.scrollIntoView({ behavior: 'smooth' });

    // Pre-populate or suggest style matching creator
    const styleInput = document.getElementById('briefStyle');
    const typeInput = document.getElementById('briefType');

    if (styleInput && !styleInput.value) {
      styleInput.value = creator.specializations[0] || '';
    }

    showToast(`Ready to create a project brief for ${creator.name}`, 'info');
  }
}

// ==========================================================================
// Project Brief Builder (Live Preview & Validation)
// ==========================================================================
function initBriefBuilder() {
  const form = document.getElementById('briefBuilderForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleBriefSubmit();
  });

  // Attach live preview updates
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('input', updateLivePreview);
    input.addEventListener('change', updateLivePreview);
  });

  // AI Assistant trigger button inside builder
  const aiTriggerBtn = document.getElementById('openAiAssistantFromBuilderBtn');
  if (aiTriggerBtn) {
    aiTriggerBtn.addEventListener('click', () => {
      document.getElementById('ai-assistant-section').scrollIntoView({ behavior: 'smooth' });
      showToast('Scroll down to generate your structured brief with AI', 'info');
    });
  }
}

function updateLivePreview() {
  const title = document.getElementById('briefTitle')?.value || 'Your Project Brief Title';
  const brand = document.getElementById('briefBrand')?.value || 'Your Brand Name';
  const description = document.getElementById('briefIdea')?.value || 'Describe the creative vision, objectives, and specific deliverables for this project...';
  const type = document.getElementById('briefType')?.value || 'AI Video';
  const style = document.getElementById('briefStyle')?.value || 'Cinematic Photorealism';
  const platform = document.getElementById('briefPlatform')?.value || 'TikTok / Reels 9:16';
  const budget = document.getElementById('briefBudget')?.value || '$1,000 - $2,000';
  const deadline = document.getElementById('briefDeadline')?.value || '14 days';

  // Selected commercial tags
  const commercialCheckboxes = document.querySelectorAll('input[name="commercialRights"]:checked');
  const selectedRights = Array.from(commercialCheckboxes).map(cb => cb.value);

  // Update Preview Elements
  const previewTitle = document.getElementById('previewTitle');
  const previewBrand = document.getElementById('previewBrand');
  const previewType = document.getElementById('previewType');
  const previewStyle = document.getElementById('previewStyle');
  const previewPlatform = document.getElementById('previewPlatform');
  const previewBudget = document.getElementById('previewBudget');
  const previewDeadline = document.getElementById('previewDeadline');
  const previewDesc = document.getElementById('previewDescription');
  const previewRights = document.getElementById('previewRights');

  if (previewTitle) previewTitle.textContent = title;
  if (previewBrand) previewBrand.textContent = brand;
  if (previewType) previewType.textContent = type;
  if (previewStyle) previewStyle.textContent = style;
  if (previewPlatform) previewPlatform.textContent = platform;
  if (previewBudget) previewBudget.textContent = budget;
  if (previewDeadline) previewDeadline.textContent = `${deadline} delivery`;
  if (previewDesc) previewDesc.textContent = description;

  if (previewRights) {
    if (selectedRights.length > 0) {
      previewRights.innerHTML = `🛡️ <strong>Rights:</strong> ${selectedRights.join(', ')}`;
    } else {
      previewRights.innerHTML = `🛡️ <strong>Rights:</strong> Commercial Usage Clearance`;
    }
  }
}

function setupLiveBriefPreview() {
  updateLivePreview();
}

function handleBriefSubmit() {
  const titleInput = document.getElementById('briefTitle');
  const brandInput = document.getElementById('briefBrand');
  const ideaInput = document.getElementById('briefIdea');
  const typeInput = document.getElementById('briefType');
  const styleInput = document.getElementById('briefStyle');
  const platformInput = document.getElementById('briefPlatform');
  const budgetInput = document.getElementById('briefBudget');
  const deadlineInput = document.getElementById('briefDeadline');

  let isValid = true;

  // Validation
  function validateField(inputEl, condition, errorMsg) {
    const formGroup = inputEl?.closest('.form-group');
    const feedback = formGroup?.querySelector('.form-validation-feedback');
    if (!condition) {
      if (formGroup) formGroup.classList.add('has-error');
      if (feedback) feedback.textContent = errorMsg;
      isValid = false;
    } else {
      if (formGroup) formGroup.classList.remove('has-error');
    }
  }

  validateField(titleInput, titleInput && titleInput.value.trim().length >= 6, 'Please enter a descriptive project title (at least 6 characters).');
  validateField(brandInput, brandInput && brandInput.value.trim().length >= 2, 'Please specify your brand or organization name.');
  validateField(ideaInput, ideaInput && ideaInput.value.trim().length >= 15, 'Please provide details of your project brief (at least 15 characters).');
  validateField(budgetInput, budgetInput && budgetInput.value.trim().length >= 3, 'Please enter an estimated budget or range (e.g., $1,200).');

  if (!isValid) {
    showToast('Please correct the highlighted fields before posting.', 'error');
    return;
  }

  // Commercial rights checked
  const commercialCheckboxes = document.querySelectorAll('input[name="commercialRights"]:checked');
  const selectedRights = Array.from(commercialCheckboxes).map(cb => cb.value);
  const rightsString = selectedRights.length > 0 ? selectedRights.join(' + ') : 'Full Commercial Buyout';

  // Create new project object
  const newProject = {
    id: `proj-${Date.now()}`,
    title: titleInput.value.trim(),
    brandName: brandInput.value.trim(),
    postedDate: 'Just now',
    deadline: `${deadlineInput ? deadlineInput.value : '14'} days remaining`,
    budget: budgetInput.value.trim().startsWith('$') ? budgetInput.value.trim() : `$${budgetInput.value.trim()}`,
    contentType: typeInput ? typeInput.value : 'AI Video',
    preferredStyle: styleInput && styleInput.value ? styleInput.value : 'Cinematic Photorealism',
    platform: platformInput ? platformInput.value : 'Multi-Platform',
    commercialNeed: rightsString,
    description: ideaInput.value.trim(),
    applicantsCount: 0,
    status: 'Open',
    applications: []
  };

  // Prepend to state and save
  state.projects.unshift(newProject);
  saveProjectsToStorage();

  // Reset Form
  document.getElementById('briefBuilderForm').reset();
  updateLivePreview();

  // Re-render project listings
  renderProjects();

  // Show celebratory toast
  showToast('🎉 Project brief published to the marketplace!', 'success');

  // Smooth scroll to projects section and highlight new project
  setTimeout(() => {
    const projectsSec = document.getElementById('projects-section');
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: 'smooth' });
    }
  }, 400);
}

// ==========================================================================
// Project Listings & Filtering
// ==========================================================================
function initProjectFilters() {
  const searchInput = document.getElementById('projectSearchInput');
  const catSelect = document.getElementById('projectCategorySelect');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.projectFilters.search = e.target.value.trim().toLowerCase();
      renderProjects();
    });
  }

  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      state.projectFilters.category = e.target.value;
      renderProjects();
    });
  }
}

function getFilteredProjects() {
  let list = [...state.projects];

  if (state.projectFilters.search) {
    const q = state.projectFilters.search;
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.contentType.toLowerCase().includes(q)
    );
  }

  if (state.projectFilters.category !== 'all') {
    list = list.filter(p => p.contentType.toLowerCase().includes(state.projectFilters.category.toLowerCase()));
  }

  return list;
}

function renderProjects() {
  const container = document.getElementById('projectsContainer');
  const countBadge = document.getElementById('projectsCountBadge');
  const emptyState = document.getElementById('projectsEmptyState');

  if (!container) return;

  const filtered = getFilteredProjects();

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Active Briefs`;
  }

  if (filtered.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  container.style.display = 'flex';
  container.innerHTML = '';

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.id = `card-${project.id}`;

    // Get applicant avatars
    const applicantAvatars = project.applications.slice(0, 3).map(app =>
      `<img src="${app.creatorAvatar}" alt="${app.creatorName}" title="${app.creatorName}" />`
    ).join('');

    card.innerHTML = `
      <div class="project-card-header">
        <div>
          <div class="project-client-name">
            <span>🏢</span> ${project.brandName} • <span>Posted ${project.postedDate}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
        </div>
        <div class="project-budget-badge">${project.budget}</div>
      </div>

      <div class="project-specs-row">
        <span class="project-spec-pill" style="color: var(--accent-blue); font-weight: 600;">📁 ${project.contentType}</span>
        <span class="project-spec-pill">🎨 ${project.preferredStyle}</span>
        <span class="project-spec-pill">📱 ${project.platform}</span>
        <span class="project-spec-pill" style="color: #6ee7b7;">🛡️ ${project.commercialNeed}</span>
        <span class="project-spec-pill" style="color: var(--accent-amber);">⏳ ${project.deadline}</span>
      </div>

      <p class="project-card-desc">${project.description}</p>

      <div class="project-card-footer">
        <div class="project-applicants-info">
          <div class="applicant-avatars-stack">
            ${applicantAvatars || '<span style="font-size: 0.8rem; color: var(--text-muted);">No applicants yet</span>'}
          </div>
          <span><strong>${project.applicantsCount}</strong> creator${project.applicantsCount === 1 ? '' : 's'} applied</span>
        </div>

        <div class="project-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="openViewBriefModal('${project.id}')">
            View Brief & Proposals (${project.applicantsCount})
          </button>
          <button class="btn btn-primary btn-sm" onclick="openApplyModal('${project.id}')">
            Apply to Project
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================================================
// Applications: Apply to Project Flow
// ==========================================================================
function openApplyModal(projectId) {
  const project = state.projects.find(p => p.id === projectId);
  if (!project) return;

  state.activeProjectIdForApply = projectId;

  const modal = document.getElementById('applyModal');
  const projectSummary = document.getElementById('applyProjectSummary');
  const creatorSelect = document.getElementById('applyCreatorSelect');

  if (projectSummary) {
    projectSummary.innerHTML = `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.8rem; color: var(--accent-blue); font-weight: 600;">Applying to Brief:</div>
        <h4 style="font-size: 1.1rem; color: #fff; margin: 0.25rem 0;">${project.title}</h4>
        <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 1rem; margin-top: 0.35rem;">
          <span>Client: <strong>${project.brandName}</strong></span>
          <span>Budget: <strong style="color: #34d399;">${project.budget}</strong></span>
          <span>Format: <strong>${project.contentType}</strong></span>
        </div>
      </div>
    `;
  }

  // Populate creator dropdown
  if (creatorSelect) {
    creatorSelect.innerHTML = state.creators.map(c => `
      <option value="${c.id}">${c.name} (${c.title.split('&')[0].trim()}) - $${c.hourlyRate}/hr</option>
    `).join('') + '<option value="custom">Independent Creator (Custom)</option>';
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function handleApplicationSubmit(e) {
  e.preventDefault();

  const projectId = state.activeProjectIdForApply;
  const project = state.projects.find(p => p.id === projectId);
  if (!project) return;

  const creatorSelect = document.getElementById('applyCreatorSelect');
  const quoteInput = document.getElementById('applyQuote');
  const timelineInput = document.getElementById('applyTimeline');
  const pitchInput = document.getElementById('applyPitch');
  const portfolioInput = document.getElementById('applyPortfolio');

  const creatorId = creatorSelect ? creatorSelect.value : 'creator-1';
  let creatorName = 'Creator';
  let creatorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  if (creatorId === 'custom') {
    creatorName = 'Alex Mercer (Independent Creator)';
    creatorAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';
  } else {
    const creatorObj = state.creators.find(c => c.id === creatorId);
    if (creatorObj) {
      creatorName = creatorObj.name;
      creatorAvatar = creatorObj.avatar;
    }
  }

  const quote = quoteInput ? quoteInput.value.trim() : '$1,500';
  const timeline = timelineInput ? timelineInput.value : '7';
  const pitch = pitchInput ? pitchInput.value.trim() : '';
  const portfolioLink = portfolioInput && portfolioInput.value ? portfolioInput.value.trim() : 'Featured Portfolio Reel';

  if (!pitch || pitch.length < 15) {
    showToast('Please provide a descriptive proposal pitch (minimum 15 characters).', 'error');
    return;
  }

  // Add proposal to project
  const applicationObj = {
    id: `app-${Date.now()}`,
    creatorId: creatorId,
    creatorName: creatorName,
    creatorAvatar: creatorAvatar,
    proposal: pitch,
    proposedRate: quote.startsWith('$') ? quote : `$${quote}`,
    deliveryDays: parseInt(timeline, 10) || 7,
    portfolioLink: portfolioLink,
    submittedAt: 'Just now'
  };

  project.applications.unshift(applicationObj);
  project.applicantsCount = project.applications.length;

  saveProjectsToStorage();
  renderProjects();
  closeModals();

  // Show detailed confirmation modal
  showApplicationConfirmation(project, applicationObj);
}

function showApplicationConfirmation(project, application) {
  const modal = document.getElementById('confirmationModal');
  const content = document.getElementById('confirmationModalContent');

  if (modal && content) {
    content.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0.5rem;">
        <div style="width: 64px; height: 64px; background: rgba(16, 185, 129, 0.15); border: 2px solid var(--accent-emerald); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--accent-emerald); margin: 0 auto 1.25rem;">
          ✓
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">Application Submitted Successfully!</h3>
        <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
          Your creative proposal has been submitted to <strong>${project.brandName}</strong> with full commercial clearance compliance.
        </p>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; text-align: left; max-width: 480px; margin: 0 auto 1.75rem;">
          <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">Application Summary</div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
            <span style="color: var(--text-muted);">Applicant:</span>
            <span style="color: #fff; font-weight: 600;">${application.creatorName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
            <span style="color: var(--text-muted);">Proposed Rate:</span>
            <span style="color: #34d399; font-weight: 700;">${application.proposedRate}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
            <span style="color: var(--text-muted);">Turnaround:</span>
            <span style="color: #fff;">${application.deliveryDays} business days</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span style="color: var(--text-muted);">Reference ID:</span>
            <span style="font-family: var(--font-mono); color: var(--accent-blue);">${application.id}</span>
          </div>
        </div>

        <button class="btn btn-primary" onclick="closeModals()">
          Done & Return to Marketplace
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// ==========================================================================
// View Full Brief & Received Proposals Modal
// ==========================================================================
function openViewBriefModal(projectId) {
  const project = state.projects.find(p => p.id === projectId);
  if (!project) return;

  state.activeProjectIdForView = projectId;

  const modal = document.getElementById('viewBriefModal');
  const content = document.getElementById('viewBriefModalContent');

  if (!modal || !content) return;

  const proposalsHtml = project.applications.length > 0
    ? project.applications.map(app => `
        <div class="proposal-item-card">
          <div class="proposal-header">
            <div class="proposal-creator-info">
              <img src="${app.creatorAvatar}" alt="${app.creatorName}" class="proposal-creator-avatar" />
              <div>
                <h5 style="font-size: 1rem; font-weight: 700; color: #fff;">${app.creatorName}</h5>
                <div style="font-size: 0.775rem; color: var(--text-muted);">Applied ${app.submittedAt} • Delivery in ${app.deliveryDays} days</div>
              </div>
            </div>
            <div class="proposal-meta-tags">
              <span class="proposal-rate-badge">${app.proposedRate}</span>
              <button class="btn btn-emerald btn-sm" onclick="acceptProposal('${project.id}', '${app.id}', '${app.creatorName}')">
                Accept Proposal
              </button>
            </div>
          </div>
          <p class="proposal-text">${app.proposal}</p>
          <div style="font-size: 0.8rem; color: var(--accent-blue); display: flex; align-items: center; gap: 0.4rem;">
            <span>📎 Attached Work:</span>
            <span><strong>${app.portfolioLink}</strong></span>
          </div>
        </div>
      `).join('')
    : `
        <div style="text-align: center; padding: 2rem; background: var(--bg-secondary); border-radius: var(--radius-md); color: var(--text-muted);">
          No creators have applied to this brief yet. Be the first to apply!
        </div>
      `;

  content.innerHTML = `
    <div style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <div>
          <div class="project-client-name" style="font-size: 0.95rem;">
            <span>🏢</span> ${project.brandName} • <span>Posted ${project.postedDate}</span>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${project.title}</h2>
        </div>
        <div class="project-budget-badge" style="font-size: 1.25rem;">${project.budget}</div>
      </div>

      <div class="project-specs-row" style="margin-bottom: 1.5rem;">
        <span class="project-spec-pill" style="color: var(--accent-blue);">📁 ${project.contentType}</span>
        <span class="project-spec-pill">🎨 ${project.preferredStyle}</span>
        <span class="project-spec-pill">📱 ${project.platform}</span>
        <span class="project-spec-pill" style="color: #6ee7b7;">🛡️ ${project.commercialNeed}</span>
        <span class="project-spec-pill" style="color: var(--accent-amber);">⏳ ${project.deadline}</span>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Creative Brief & Requirements</h4>
        <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; white-space: pre-line;">${project.description}</p>
      </div>

      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h4 style="font-size: 1.1rem; font-weight: 800; color: #fff;">
            Creator Applications & Proposals (${project.applications.length})
          </h4>
          <button class="btn btn-primary btn-sm" onclick="closeModals(); openApplyModal('${project.id}');">
            Submit Proposal
          </button>
        </div>
        <div class="proposals-list">
          ${proposalsHtml}
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function acceptProposal(projectId, appId, creatorName) {
  showToast(`🤝 Proposal from ${creatorName} accepted! Escrow milestone contract generated.`, 'success');
  closeModals();
}

// ==========================================================================
// AI Creative Brief Assistant (Deterministic Intelligent Heuristic Fallback)
// ==========================================================================
function initAiAssistant() {
  const generateBtn = document.getElementById('generateAiBriefBtn');
  const roughInput = document.getElementById('aiRoughInput');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  const applyToBuilderBtn = document.getElementById('applyAiBriefToBuilderBtn');

  // Preset chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      if (roughInput && promptText) {
        roughInput.value = promptText;
        roughInput.focus();
      }
    });
  });

  if (generateBtn) {
    generateBtn.addEventListener('click', handleAiGeneration);
  }

  if (applyToBuilderBtn) {
    applyToBuilderBtn.addEventListener('click', applyGeneratedBriefToBuilder);
  }
}

// The structured generative brief cache
let lastGeneratedBrief = null;

function handleAiGeneration() {
  const roughInput = document.getElementById('aiRoughInput');
  const toneSelect = document.getElementById('aiToneSelect');
  const industrySelect = document.getElementById('aiIndustrySelect');
  const generateBtn = document.getElementById('generateAiBriefBtn');
  const outputContainer = document.getElementById('aiAssistantOutput');

  const text = roughInput ? roughInput.value.trim() : '';

  if (!text || text.length < 8) {
    showToast('Please type a rough idea (at least 8 characters) to generate a brief.', 'error');
    if (roughInput) roughInput.focus();
    return;
  }

  // Button loading state
  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Analyzing with Generative Heuristics Engine...
    `;
  }

  const tone = toneSelect ? toneSelect.value : 'Cinematic & High-End';
  const industry = industrySelect ? industrySelect.value : 'Technology & Gaming';

  // Deterministic local generative heuristics engine (offline-safe, instant, zero API keys required)
  setTimeout(() => {
    const brief = generateStructuredCreativeBrief(text, tone, industry);
    lastGeneratedBrief = brief;

    // Render output
    renderGeneratedBrief(brief);

    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `✨ Generate Structured Creative Brief`;
    }

    if (outputContainer) {
      outputContainer.classList.add('has-result');
      outputContainer.scrollIntoView({ behavior: 'smooth' });
    }

    showToast('✨ Creative brief generated successfully using local heuristics engine!', 'success');
  }, 650);
}

/**
 * Intelligent Deterministic Heuristics Engine
 * Extracts concepts, styles, recommended tools, and prompt syntax from raw user text.
 */
function generateStructuredCreativeBrief(rawIdea, tone, industry) {
  const lower = rawIdea.toLowerCase();

  // Detect format
  let contentType = 'AI Video';
  let aspect = '16:9 4K (Landscape Cinematic)';
  let tools = ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'Topaz Video AI', 'DaVinci Resolve'];

  if (lower.includes('voice') || lower.includes('audio') || lower.includes('podcast') || lower.includes('music')) {
    contentType = 'Voice & Audio';
    aspect = 'Stereo / Spatial Binaural Audio (48kHz 24-bit WAV)';
    tools = ['ElevenLabs Pro', 'Suno v3.5', 'AudioCraft', 'Reaper DAW'];
  } else if (lower.includes('fashion') || lower.includes('model') || lower.includes('lookbook') || lower.includes('clothing')) {
    contentType = 'Generative Imagery';
    aspect = '4:5 Social & 300 DPI CMYK Print (8K Upscaled)';
    tools = ['Midjourney v6.1', 'Magnific AI', 'Photoshop Generative Fill', 'Krea AI'];
  } else if (lower.includes('avatar') || lower.includes('influencer') || lower.includes('3d') || lower.includes('splat')) {
    contentType = 'Virtual Influencer & 3D';
    aspect = '9:16 Vertical & 3D Gaussian Splat PLY / GLB';
    tools = ['Flux.1 Dev', 'ComfyUI', 'InstantID', 'Blender 4.2'];
  } else if (lower.includes('product') || lower.includes('bottle') || lower.includes('cosmetic') || lower.includes('packaging')) {
    contentType = 'Product Staging';
    aspect = '1:1 Square & 9:16 Vertical (300 DPI)';
    tools = ['Flux.1 Schnell', 'ControlNet Tile', 'Stable Diffusion WebUI', 'Photoshop CC'];
  } else if (lower.includes('game') || lower.includes('concept') || lower.includes('matte') || lower.includes('world')) {
    contentType = 'Concept Art & Worldbuilding';
    aspect = '21:9 Ultrawide Concept Matte Painting (8K)';
    tools = ['Stable Diffusion 3', 'ComfyUI', 'DALL-E 3', 'Photoshop'];
  }

  // Detect target platform
  let platform = 'TikTok & Reels (9:16)';
  if (lower.includes('youtube') || lower.includes('tv') || lower.includes('commercial')) {
    platform = 'YouTube & Connected TV (16:9)';
  } else if (lower.includes('print') || lower.includes('billboard') || lower.includes('magazine')) {
    platform = 'Print & Billboard (300 DPI)';
  } else if (lower.includes('shopify') || lower.includes('amazon') || lower.includes('ecom')) {
    platform = 'Shopify & Amazon E-Commerce';
  }

  // Generate Title
  const cleanKeyword = rawIdea.split(' ')
    .filter(w => w.length > 4 && !['about', 'would', 'could', 'should', 'video', 'create', 'image'].includes(w.toLowerCase()))
    .slice(0, 3)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || 'Flagship';

  const generatedTitle = `${tone.split('&')[0].trim()} ${contentType} Campaign: ${cleanKeyword || 'Visionary Brand Launch'}`;

  // Generate Prompt Seeds
  const promptSeed = `cinematic ${tone.toLowerCase()} shot of ${rawIdea.slice(0, 90)}, volumetric atmospheric haze, anamorphic 35mm lens, photorealistic sub-surface scattering, 8k resolution, octane render aesthetic --ar ${platform.includes('9:16') ? '9:16' : '16:9'} --style raw --v 6.1`;
  const negativePrompt = `blurry, distorted anatomy, warped fingers, low resolution, watermark, amateur lighting, oversaturated plastic artifacts, CGI cartoon look`;

  // Recommend Budget & Deadline
  let budgetEstimate = '$1,400 - $2,200';
  let deadlineEstimate = '14';
  if (contentType === 'Voice & Audio') {
    budgetEstimate = '$800 - $1,500';
    deadlineEstimate = '10';
  } else if (contentType === 'Virtual Influencer & 3D') {
    budgetEstimate = '$1,800 - $3,000';
    deadlineEstimate = '21';
  }

  return {
    title: generatedTitle,
    industry: industry,
    contentType: contentType,
    tone: tone,
    platform: platform,
    aspectRatio: aspect,
    recommendedTools: tools,
    budget: budgetEstimate,
    deadline: deadlineEstimate,
    creativeSummary: `Develop an impactful ${tone.toLowerCase()} ${contentType.toLowerCase()} initiative tailored for ${industry}. The production will leverage cutting-edge generative synthesis to materialize the concept: "${rawIdea}". Every asset must preserve physical continuity, lighting realism, and pristine brand alignment.`,
    technicalSpecs: [
      `Master Format: ${aspect}`,
      `Color Profile: Rec.709 / P3 Wide Gamut`,
      `Frame Rate / Bitrate: 60fps ProRes 422 HQ (if video) or 300 DPI TIFF (if still)`,
      `Audio Standards: -14 LUFS integrated loudness with binaural stems`
    ],
    promptSeed: promptSeed,
    negativePrompt: negativePrompt,
    commercialRights: 'Full Commercial Buyout + Trademark Clearance + Model Indemnity'
  };
}

function renderGeneratedBrief(brief) {
  const container = document.getElementById('aiAssistantOutput');
  if (!container) return;

  container.innerHTML = `
    <div class="generated-brief-card">
      <div class="generated-header-row">
        <div>
          <span class="section-tag">✨ Structured Creative Brief Output</span>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${brief.title}</h3>
          <div style="font-size: 0.85rem; color: var(--accent-blue); margin-top: 0.35rem;">
            Format: <strong>${brief.contentType}</strong> • Tone: <strong>${brief.tone}</strong> • Industry: <strong>${brief.industry}</strong>
          </div>
        </div>
        <button class="btn btn-primary" id="applyAiBriefToBuilderBtn" onclick="applyGeneratedBriefToBuilder()">
          ✨ Apply to Brief Builder
        </button>
      </div>

      <div class="brief-output-section">
        <h5>Executive Scope & Objective</h5>
        <p>${brief.creativeSummary}</p>
      </div>

      <div class="form-grid-2" style="margin-bottom: 1.5rem;">
        <div class="brief-output-section">
          <h5>Recommended AI Pipeline & Tools</h5>
          <div class="pills-wrap" style="margin-top: 0.4rem;">
            ${brief.recommendedTools.map(t => `<span class="tool-pill" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${t}</span>`).join('')}
          </div>
        </div>
        <div class="brief-output-section">
          <h5>Platform & Master Deliverables</h5>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem;">
            📱 <strong>${brief.platform}</strong><br/>
            📐 ${brief.aspectRatio}
          </p>
        </div>
      </div>

      <div class="brief-output-section">
        <h5>Recommended Generative Prompt Seeds</h5>
        <div class="prompt-seed-code-box">
          <span style="color: #6ee7b7;">// Positive Diffusion Seed:</span><br/>
          ${brief.promptSeed}
          <br/><br/>
          <span style="color: #f43f5e;">// Negative Prompt Tokens:</span><br/>
          ${brief.negativePrompt}
        </div>
      </div>

      <div class="form-grid-2">
        <div class="brief-output-section">
          <h5>Commercial-Use Legal Guidance</h5>
          <p style="color: #6ee7b7; font-size: 0.875rem;">
            🛡️ ${brief.commercialRights}
          </p>
        </div>
        <div class="brief-output-section">
          <h5>Estimated Market Budget & Timeline</h5>
          <p style="font-size: 0.95rem; color: #fff;">
            💵 <strong>${brief.budget}</strong> • ⏳ <strong>${brief.deadline} days production</strong>
          </p>
        </div>
      </div>
    </div>
  `;
}

function applyGeneratedBriefToBuilder() {
  if (!lastGeneratedBrief) return;

  const b = lastGeneratedBrief;
  const titleInput = document.getElementById('briefTitle');
  const ideaInput = document.getElementById('briefIdea');
  const typeInput = document.getElementById('briefType');
  const styleInput = document.getElementById('briefStyle');
  const platformInput = document.getElementById('briefPlatform');
  const budgetInput = document.getElementById('briefBudget');
  const deadlineInput = document.getElementById('briefDeadline');

  if (titleInput) titleInput.value = b.title;
  if (ideaInput) ideaInput.value = `${b.creativeSummary}\n\nTechnical Deliverables:\n${b.technicalSpecs.join('\n')}\n\nPrompt Blueprint:\n${b.promptSeed}`;
  if (typeInput) typeInput.value = b.contentType;
  if (styleInput) styleInput.value = b.tone;
  if (platformInput) platformInput.value = b.platform;
  if (budgetInput) budgetInput.value = b.budget;
  if (deadlineInput) deadlineInput.value = b.deadline;

  updateLivePreview();

  // Scroll to brief builder
  const builder = document.getElementById('brief-builder-section');
  if (builder) {
    builder.scrollIntoView({ behavior: 'smooth' });
  }

  showToast('✨ Generated brief successfully copied into the Brief Builder!', 'success');
}

// ==========================================================================
// Modals & Toast Management
// ==========================================================================
function initModals() {
  // Global close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  // Close on background overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModals();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModals();
    }
  });

  // Application form submission inside modal
  const applyForm = document.getElementById('applyProjectForm');
  if (applyForm) {
    applyForm.addEventListener('submit', handleApplicationSubmit);
  }
}

function closeModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `
    <span style="font-weight: 700; font-size: 1.1rem;">${icon}</span>
    <span style="flex-grow: 1;">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Keyframe animation for inline spinners
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleEl);
