/**
 * Tyten AI - Main Interactive Application Logic
 * Manages UI state, theme switching, calculations, modals, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Theme Management (Dark / Light)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('tyten-theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tyten-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  setTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ==========================================================================
  // 2. Mobile Navigation Drawer
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = window.getComputedStyle(navLinks).display !== 'none';
      if (isVisible) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = 'var(--nav-height)';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-secondary)';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid var(--border-subtle)';
      }
    });
  }

  // ==========================================================================
  // 3. Dynamic ROI Calculator
  // ==========================================================================
  const teamSizeSlider = document.getElementById('roi-team-size');
  const workflowsSlider = document.getElementById('roi-workflows');
  const teamSizeVal = document.getElementById('roi-team-val');
  const workflowsVal = document.getElementById('roi-workflows-val');
  const savedDollars = document.getElementById('roi-saved-dollars');
  const savedHours = document.getElementById('roi-saved-hours');

  function calculateROI() {
    if (!teamSizeSlider || !workflowsSlider) return;
    const engineers = parseInt(teamSizeSlider.value, 10);
    const flows = parseInt(workflowsSlider.value, 10);

    if (teamSizeVal) teamSizeVal.textContent = engineers;
    if (workflowsVal) workflowsVal.textContent = flows;

    // Average hourly engineering cost: $85/hr
    // Hours saved per workflow per engineer per month: ~6.5 hours
    const hours = Math.round(engineers * flows * 5.8);
    const dollars = Math.round(hours * 92);

    if (savedHours) savedHours.textContent = `${hours.toLocaleString()} hours saved/month`;
    if (savedDollars) savedDollars.textContent = `$${dollars.toLocaleString()}`;
  }

  if (teamSizeSlider && workflowsSlider) {
    teamSizeSlider.addEventListener('input', calculateROI);
    workflowsSlider.addEventListener('input', calculateROI);
    calculateROI();
  }

  // ==========================================================================
  // 4. Billing Toggle (Monthly / Annual 20% discount)
  // ==========================================================================
  const billToggle = document.getElementById('billing-toggle');
  const optMonthly = document.getElementById('opt-monthly');
  const optAnnual = document.getElementById('opt-annual');
  const proPrice = document.getElementById('price-pro');
  const proCycle = document.getElementById('cycle-pro');

  let isAnnual = false;

  function updateBilling(annual) {
    isAnnual = annual;
    if (optMonthly && optAnnual) {
      if (annual) {
        optMonthly.classList.remove('active');
        optAnnual.classList.add('active');
      } else {
        optMonthly.classList.add('active');
        optAnnual.classList.remove('active');
      }
    }

    if (proPrice && proCycle) {
      if (annual) {
        proPrice.textContent = '$64';
        proCycle.textContent = '/ month (billed annually)';
      } else {
        proPrice.textContent = '$79';
        proCycle.textContent = '/ month';
      }
    }
  }

  if (optMonthly) optMonthly.addEventListener('click', () => updateBilling(false));
  if (optAnnual) optAnnual.addEventListener('click', () => updateBilling(true));

  // ==========================================================================
  // 5. Code Showcase Tabs & Copy Button
  // ==========================================================================
  const codeTabs = document.querySelectorAll('.code-tab-btn');
  const codePre = document.getElementById('sdk-code-display');
  const copyBtn = document.getElementById('copy-code-btn');

  const codeSnippets = {
    python: `<span class="code-kw">from</span> tyten <span class="code-kw">import</span> <span class="code-fn">Swarm</span>, <span class="code-fn">Agent</span>

<span class="code-comm"># Initialize sovereign autonomous agent swarm</span>
swarm = <span class="code-fn">Swarm</span>(
    fleet_name=<span class="code-str">"core-devops"</span>,
    consensus_protocol=<span class="code-str">"byzantine-fault-tolerant"</span>,
    zero_trust_guardrails=<span class="code-kw">True</span>
)

<span class="code-comm"># Dispatch multi-step production incident remediation</span>
result = swarm.<span class="code-fn">dispatch_task</span>(
    goal=<span class="code-str">"Resolve latency spike on kubernetes-prod cluster"</span>,
    verify_canary=<span class="code-kw">True</span>
)

<span class="code-fn">print</span>(<span class="code-str">f"Autonomous resolution completed in: {result.latency_ms}ms"</span>)`,

    typescript: `<span class="code-kw">import</span> { <span class="code-fn">TytenSwarm</span>, <span class="code-fn">AgentPolicy</span> } <span class="code-kw">from</span> <span class="code-str">'@tyten/sdk'</span>;

<span class="code-comm">// Configure Tyten autonomous agent mesh</span>
<span class="code-kw">const</span> swarm = <span class="code-kw">new</span> <span class="code-fn">TytenSwarm</span>({
  apiKey: process.env.<span class="code-prop">TYTEN_API_KEY</span>,
  region: <span class="code-str">'us-east-cluster'</span>,
  sandbox: <span class="code-str">'air-gapped-microvm'</span>
});

<span class="code-comm">// Execute autonomous workflow DAG</span>
<span class="code-kw">const</span> session = <span class="code-kw">await</span> swarm.<span class="code-fn">execute</span>({
  workflow: <span class="code-str">'zero-downtime-db-migration'</span>,
  safetyLevel: <span class="code-str">'strict'</span>
});

console.<span class="code-fn">log</span>(<span class="code-str">\`Execution DAG Status: \${session.status}\`</span>);`,

    curl: `<span class="code-comm"># Run Tyten Autonomous Task via REST API</span>
curl -X POST https://api.tyten.ai/v1/swarms/dispatch \\
  -H <span class="code-str">"Authorization: Bearer \$TYTEN_API_KEY"</span> \\
  -H <span class="code-str">"Content-Type: application/json"</span> \\
  -d '{
    <span class="code-prop">"task"</span>: <span class="code-str">"Audit security CVEs and build canary PR"</span>,
    <span class="code-prop">"consensus_nodes"</span>: 4,
    <span class="code-prop">"sandbox_enclave"</span>: <span class="code-kw">true</span>
  }'`
  };

  let activeCodeSnippet = 'python';

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      activeCodeSnippet = lang;
      if (codePre && codeSnippets[lang]) {
        codePre.innerHTML = codeSnippets[lang];
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = codeSnippets[activeCodeSnippet] || '';
      const textToCopy = tempElement.textContent || tempElement.innerText;

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.textContent = '✓ Copied!';
        showToast('Code copied to clipboard');
        setTimeout(() => {
          copyBtn.innerHTML = `<span>📋 Copy</span>`;
        }, 2000);
      });
    });
  }

  // ==========================================================================
  // 6. FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ==========================================================================
  // 7. Modal Dialog ("Book a Demo" / "Get Access")
  // ==========================================================================
  const demoModal = document.getElementById('demo-modal');
  const openModalBtns = document.querySelectorAll('.open-demo-modal-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const demoForm = document.getElementById('demo-form');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal && typeof demoModal.showModal === 'function') {
        demoModal.showModal();
      }
    });
  });

  if (closeModalBtn && demoModal) {
    closeModalBtn.addEventListener('click', () => {
      demoModal.close();
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      const rect = demoModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        demoModal.close();
      }
    });
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = demoForm.querySelector('input[type="email"]').value;
      demoModal.close();
      showToast(`Thank you! Priority access requested for ${email}`);
      demoForm.reset();
    });
  }

  // ==========================================================================
  // 8. Lead Capture Newsletter Form
  // ==========================================================================
  const ctaForm = document.getElementById('cta-newsletter-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = ctaForm.querySelector('.cta-input');
      if (input && input.value) {
        showToast(`Early access code dispatched to ${input.value}`);
        input.value = '';
      }
    });
  }

  // ==========================================================================
  // 9. Toast Notification System
  // ==========================================================================
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
});
