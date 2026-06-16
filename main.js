document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initSectionNavigation();
    initHeroChatSimulator();
    initShowcaseTabs();
    initLiveDemos();
    initEntropyWorkflowDemo();
    initRevealAnimations();
    initBinaryMobileDemo();
});

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('navbar-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuBtn.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuBtn.classList.remove('active');
        });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('nav-bar');
    if (!navbar) return;

    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

function initSectionNavigation() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link-item'));
    if (!navLinks.length) return;

    const isOnIndex = () => {
        // Works for both static file + dev server paths
        const path = (window.location.pathname || '').toLowerCase();
        return path.endsWith('/index.html') || path.endsWith('index.html') || path === '/' || !path.includes('.html');
    };

    const setActiveByKey = (key) => {
        // key: 'home' | 'entropyos' | 'binary'
        navLinks.forEach((link) => {
            const href = (link.getAttribute('href') || '').trim();

            let targetKey = null;
            if (href === '#' || href === '#home') {
                targetKey = 'home';
            } else if (href === 'index.html' || href.endsWith('/index.html') || href === './index.html') {
                targetKey = 'home';
            } else {
                const hash = href.includes('#') ? href.split('#')[1] : '';
                if (hash === 'entropyos') targetKey = 'entropyos';
                if (hash === 'binary') targetKey = 'binary';
            }

            const isActive = targetKey === key;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const applyActiveState = () => {
        const hash = (window.location.hash || '').replace('#', '');

        // Home (index.html) navigation is driven by hash
        if (isOnIndex()) {
            if (hash === 'binary') return setActiveByKey('binary');
            if (hash === 'entropyos') return setActiveByKey('entropyos');
            return setActiveByKey('home');
        }

        // EntropyOS page always highlights EntropyOS
        if ((window.location.pathname || '').toLowerCase().endsWith('/entropyos.html')) {
            return setActiveByKey('entropyos');
        }

        // Binary page always highlights Binary
        if ((window.location.pathname || '').toLowerCase().endsWith('/binary.html')) {
            return setActiveByKey('binary');
        }

        // Fallback: default to Home
        return setActiveByKey('home');
    };

    // Smooth scroll navigation clicks for in-page anchors ONLY
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const navbarHeight = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Update active state on initial load and whenever hash changes
    const safeApply = () => {
        // Wait a tick so nav links are present (some browsers render late)
        setTimeout(applyActiveState, 0);
    };

    window.addEventListener('hashchange', safeApply);
    window.addEventListener('popstate', safeApply);

    // Must be called on DOM ready and again on load to prevent the "sometimes" issue.
    document.addEventListener('DOMContentLoaded', safeApply, { once: true });
    window.addEventListener('load', safeApply, { once: true });

    // Also run immediately for already-ready DOM
    applyActiveState();
}


const chatFlows = [
    {
        user: 'Create a project workspace for my AI startup.',
        entropyResponse: 'Initializing new project workspace...',
        steps: [
            'Configuring startup project directories',
            'Provisioning shared developer resources',
            'Integrating local version control systems',
            'Mapping team agent communications'
        ],
        actionUI: `
            <div class="action-box">
                <div class="action-header">
                    <span>Project Workspace</span>
                    <span class="action-status-pill completed">Active</span>
                </div>
                <ul class="action-list" style="margin-bottom: 0;">
                    <li><span class="check">✓</span> 5 department nodes configured</li>
                    <li><span class="check">✓</span> Git repository initialized</li>
                    <li><span class="check">✓</span> Team agent permissions active</li>
                </ul>
            </div>
        `
    },
    {
        user: 'Draft a marketing partnership proposal for Innovate.',
        entropyResponse: 'Synthesizing partner demographics & proposal copy...',
        steps: [
            "Analyzing Innovate's integration requirements",
            'Formulating shared value propositions',
            'Structuring proposal copy and links'
        ],
        actionUI: `
            <div class="action-box">
                <div class="action-header">
                    <span>Email Draft</span>
                    <span class="action-status-pill ready">Ready to Send</span>
                </div>
                <div class="action-email-preview">
                    <div class="action-email-subj"><strong>Subject:</strong> Proposal: EntropyOS Integration</div>
                    Dear Innovate Product Team,<br><br>
                    I am writing to propose a strategic collaboration. By connecting EntropyOS's natural language execution engine with your template libraries, we can let users trigger actions inside their native app workspaces via plain text instructions.
                </div>
                <button class="action-btn-trigger">Send Now</button>
            </div>
        `
    },
    {
        user: "Compile yesterday's system activity and generate a summary report.",
        entropyResponse: 'Processing event logs and compiling performance metrics...',
        steps: [
            'Parsing raw events from 14 background agents',
            'Calculating autonomy ratios and success indicators',
            'Formatting analytics and output documents'
        ],
        actionUI: `
            <div class="action-box">
                <div class="action-header">
                    <span>Performance Report</span>
                    <span class="action-status-pill completed">Completed</span>
                </div>
                <a href="#" class="action-link-download" onclick="event.preventDefault()">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:4px; vertical-align: middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    <span style="vertical-align: middle;">Download Daily-Summary.pdf</span>
                </a>
            </div>
        `
    },
    {
        user: 'Create an automation rule to parse and log incoming invoices.',
        entropyResponse: 'Constructing trigger-action automation rule...',
        steps: [
            'Configuring email triggers for PDF invoice files',
            'Initializing edge OCR extraction processor',
            'Linking database logging destinations'
        ],
        actionUI: `
            <div class="action-box">
                <div class="action-header">
                    <span>Invoice Automation</span>
                    <span class="action-status-pill completed">Active</span>
                </div>
                <ul class="action-list" style="margin-bottom: 0;">
                    <li><span class="check">✓</span> Trigger: Incoming email containing "invoice"</li>
                    <li><span class="check">✓</span> Action: Extract key totals & log to spreadsheet</li>
                </ul>
            </div>
        `
    }
];

function initHeroChatSimulator() {
    const history = document.getElementById('hero-chat-history');
    const input = document.getElementById('hero-chat-input');
    const sendButton = document.getElementById('hero-chat-send');

    if (!history || !input || !sendButton) return;

    let flowIndex = 0;
    let isRunning = false;

    const welcomeHtml = `
        <div class="chat-welcome">
            <div class="welcome-icon">✦</div>
            <h3>Welcome to Entropy OS</h3>
            <p>Your computer should understand you. Describe what you need, and watch Entropy execute tasks autonomously.</p>
        </div>
    `;

    const appendMessage = (historyEl, type, text) => {
        const wrapper = document.createElement('div');
        const cssType = type === 'assistant' ? 'entropy' : type;
        wrapper.className = `chat-message ${cssType}`;
        wrapper.innerHTML = `
            <div class="chat-bubble">
                <div class="chat-bubble-text">${text}</div>
            </div>
        `;
        historyEl.appendChild(wrapper);
        historyEl.scrollTop = historyEl.scrollHeight;
    };

    const appendTypingIndicator = (historyEl) => {
        if (historyEl.querySelector('.typing-indicator')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'chat-message entropy typing-indicator';
        wrapper.innerHTML = `
            <div class="chat-bubble">
                <div class="typing-dots" aria-label="Typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        historyEl.appendChild(wrapper);
        historyEl.scrollTop = historyEl.scrollHeight;
    };

    const removeTypingIndicator = (historyEl) => {
        const indicator = historyEl.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    const runSimulationLoop = async () => {
        if (isRunning) return;
        isRunning = true;

        while (true) {
            const flow = chatFlows[flowIndex % chatFlows.length];
            flowIndex++;

            // 1. Reset chat history to welcome card
            history.innerHTML = welcomeHtml;
            input.value = '';
            await sleep(1500);

            // 2. Type user prompt query character-by-character
            const promptText = flow.user;
            for (let i = 0; i < promptText.length; i++) {
                input.value += promptText[i];
                await sleep(35 + Math.random() * 25);
            }
            await sleep(600);

            // 3. Highlight send button to simulate click
            sendButton.classList.add('active');
            await sleep(250);
            sendButton.classList.remove('active');

            // 4. Clear input field and append user message
            input.value = '';
            appendMessage(history, 'user', flow.user);
            await sleep(800);

            // 5. Show assistant typing indicator
            appendTypingIndicator(history);
            await sleep(1200);
            removeTypingIndicator(history);

            // 6. Create assistant response bubble with progress steps and placeholder
            const responseMessageEl = document.createElement('div');
            responseMessageEl.className = 'chat-message entropy';
            
            let stepsHtml = '';
            if (flow.steps && flow.steps.length > 0) {
                stepsHtml = `
                    <div class="progress-steps-container" style="margin-top: 10px;">
                        ${flow.steps.map((step, idx) => `
                            <div class="progress-step-item" id="step-${idx}">
                                <span class="step-spinner">⟳</span>
                                <span class="step-text">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            responseMessageEl.innerHTML = `
                <div class="chat-bubble">
                    <div class="chat-bubble-text">${flow.entropyResponse}</div>
                    ${stepsHtml}
                    <div class="action-placeholder"></div>
                </div>
            `;
            history.appendChild(responseMessageEl);
            history.scrollTop = history.scrollHeight;

            // 7. Execute steps progressively
            if (flow.steps && flow.steps.length > 0) {
                const stepItems = responseMessageEl.querySelectorAll('.progress-step-item');
                for (let i = 0; i < stepItems.length; i++) {
                    const item = stepItems[i];
                    
                    // Mark as active
                    item.classList.add('active');
                    history.scrollTop = history.scrollHeight;
                    
                    // Wait for execution time
                    await sleep(1000 + Math.random() * 600);
                    
                    // Mark as completed
                    item.classList.remove('active');
                    item.classList.add('completed');
                    const spinner = item.querySelector('.step-spinner');
                    if (spinner) spinner.textContent = '✓';
                }
            }

            // 8. Render final action UI
            if (flow.actionUI) {
                const placeholder = responseMessageEl.querySelector('.action-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = flow.actionUI;
                    history.scrollTop = history.scrollHeight;
                }
            }

            // 9. Let user read the outcome before starting next flow
            await sleep(5500);
        }
    };

    // Begin the autoplay loop
    runSimulationLoop();
}

const showcaseContents = {
    workspace: {
        title: 'AI Conversation Workspace',
        html: `
            <div class="showcase-anim-wrap mock-chat-workspace">
                <div class="mock-chat-bubble user">Research competitors in the AI operating system space.</div>
                <div class="mock-chat-bubble entropy">
                    <p style="margin-bottom:8px;">Gathering competitor data from public directories and industry reports...</p>
                    <div class="action-box">
                        <div class="action-header">
                            <span>Competitor Research Task</span>
                            <span class="action-status-pill completed">Completed</span>
                        </div>
                        <ul class="action-list" style="font-size:0.75rem;">
                            <li><span class="check">✓</span> Scanned 12 databases and industry blogs</li>
                            <li><span class="check">✓</span> Analyzed pricing layers and target demographics</li>
                            <li><span class="check">✓</span> Synthesized key differentiators into markdown document</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    files: {
        title: 'Smart File Management',
        html: `
            <div class="showcase-anim-wrap mock-file-mgr">
                <p style="font-size:0.78rem; color:var(--color-text-secondary); margin-bottom:8px; text-align:left;">
                    Prompt: <em>"Find all receipts from May and sort them into a new folder."</em>
                </p>
                <div class="mock-file-item">
                    <div class="mock-file-info">
                        <span class="file-icon">📁</span>
                        <div>
                            <strong>/Finance/Receipts-May-2026/</strong>
                            <div style="color:var(--color-text-muted); font-size:0.65rem;">Created directory</div>
                        </div>
                    </div>
                    <span class="file-status">Done</span>
                </div>
                <div class="mock-file-item">
                    <div class="mock-file-info">
                        <span class="file-icon">📄</span>
                        <div>
                            <strong>uber_invoice_2026_05_12.pdf</strong>
                            <div style="color:var(--color-text-muted); font-size:0.65rem;">Moved to Receipts-May-2026/</div>
                        </div>
                    </div>
                    <span class="file-status">Done</span>
                </div>
                <div class="mock-file-item">
                    <div class="mock-file-info">
                        <span class="file-icon">📄</span>
                        <div>
                            <strong>starbucks_receipt_may_08.pdf</strong>
                            <div style="color:var(--color-text-muted); font-size:0.65rem;">Moved to Receipts-May-2026/</div>
                        </div>
                    </div>
                    <span class="file-status">Done</span>
                </div>
            </div>
        `
    },
    email: {
        title: 'Email Generation',
        html: `
            <div class="showcase-anim-wrap mock-email-composer">
                <div class="mock-email-field"><strong>To:</strong> customer_support@infiposts.in</div>
                <div class="mock-email-field"><strong>Subject:</strong> Collaboration proposal - Infiposts Integration</div>
                <div class="mock-email-body">
                    Dear Team at Innovate,<br><br>
                    I hope this email finds you well. I am writing to propose a strategic integration between your workflow templates and Entropy OS's conversational layer.<br><br>
                    By embedding our intent-based computing libraries, your users can trigger actions inside their native app workspaces via natural language speech or chat. Let me know if you are free for a short demo next Tuesday.<br><br>
                    Warm regards,<br>
                    Branding Team
                </div>
                <div class="mock-email-actions">
                    <button class="mock-email-btn cancel">Regenerate</button>
                    <button class="mock-email-btn send">Send Email</button>
                </div>
            </div>
        `
    },
    project: {
        title: 'Project Dashboard',
        html: `
            <div class="showcase-anim-wrap mock-project-board">
                <div class="mock-project-col">
                    <div class="mock-project-col-title">To Do <span>3</span></div>
                    <div class="mock-task-card">
                        <strong>Draft marketing deck</strong>
                        <div class="mock-task-desc">Due in 2 days</div>
                    </div>
                    <div class="mock-task-card">
                        <strong>Setup API client keys</strong>
                        <div class="mock-task-desc">Assigned: DevAgent</div>
                    </div>
                </div>
                <div class="mock-project-col">
                    <div class="mock-project-col-title">In Progress <span>1</span></div>
                    <div class="mock-task-card" style="border-left: 2px solid var(--color-green);">
                        <strong>Audit security logs</strong>
                        <div class="mock-task-desc" style="color:var(--color-green)">Running analysis...</div>
                    </div>
                </div>
                <div class="mock-project-col">
                    <div class="mock-project-col-title">Completed <span>8</span></div>
                    <div class="mock-task-card" style="opacity: 0.6;">
                        <strong>Deploy server node</strong>
                        <div class="mock-task-desc">Completed 3h ago</div>
                    </div>
                </div>
            </div>
        `
    },
    automation: {
        title: 'Workflow Automation',
        html: `
            <div class="showcase-anim-wrap mock-automation-flow">
                <div class="mock-flow-node active">
                    <span class="node-number">1</span>
                    <div>
                        <strong>Trigger: Incoming invoice email</strong>
                        <div style="font-size:0.65rem; color:var(--color-text-secondary)">Scans attachments for 'pdf'</div>
                    </div>
                </div>
                <div class="flow-connector active"></div>
                <div class="mock-flow-node active">
                    <span class="node-number">2</span>
                    <div>
                        <strong>Action: Extract details &amp; sum</strong>
                        <div style="font-size:0.65rem; color:var(--color-text-secondary)">OCR parser extracted $1,240.00 from invoice</div>
                    </div>
                </div>
                <div class="flow-connector active"></div>
                <div class="mock-flow-node">
                    <span class="node-number">3</span>
                    <div>
                        <strong>Action: Log to Finance Sheet &amp; notify</strong>
                        <div style="font-size:0.65rem; color:var(--color-text-secondary)">Waiting for execution approval</div>
                    </div>
                </div>
            </div>
        `
    },
    multiagent: {
        title: 'Multi-Agent Collaboration',
        html: `
            <div class="showcase-anim-wrap mock-multiagent-sec">
                <div class="mock-agent-log">
                    <div class="agent-label researcher"><span class="agent-pulse"></span>Researcher Agent</div>
                    <p style="color:var(--color-text-secondary)">Compiled performance latency metrics for local models running on Apple M3 silicon.</p>
                </div>
                <div class="mock-agent-log">
                    <div class="agent-label writer"><span class="agent-pulse"></span>Technical Writer Agent</div>
                    <p style="color:var(--color-text-secondary)">Drafting the 'Local Performance' analysis for the developer whitepaper.</p>
                </div>
                <div class="mock-agent-log">
                    <div class="agent-label editor"><span class="agent-pulse"></span>Editor Agent</div>
                    <p style="color:var(--color-text-secondary)">Verifying benchmark URLs and styling metrics. Document ready.</p>
                </div>
            </div>
        `
    },
    research: {
        title: 'Research Assistant',
        html: `
            <div class="showcase-anim-wrap mock-research-assistant">
                <div class="research-sidebar">
                    <div style="font-weight:700; border-bottom:1px solid var(--border-color); padding-bottom:6px; margin-bottom:4px;">Sources Searched</div>
                    <div class="research-source">
                        <div class="source-title">Arxiv paper #2405</div>
                        <span style="font-size:0.65rem; color:var(--color-text-muted)">arvix.org/pdf/2405.0213</span>
                    </div>
                    <div class="research-source">
                        <div class="source-title">Vercel V0 Release Notes</div>
                        <span style="font-size:0.65rem; color:var(--color-text-muted)">vercel.com/blog/v0-gen</span>
                    </div>
                </div>
                <div class="research-panel">
                    <div class="research-headline">Intent-Based Computing Analysis</div>
                    <p style="color:var(--color-text-secondary); font-size:0.7rem; line-height:1.5;">
                        Based on recent publications, intent-based operating layers leverage small semantic routers. This reduces latency by bypass-routing standard kernel executions directly into LLM prompts. By mapping prompt vectors to device API endpoints, systems trigger action-loops without scripts [Arxiv #2405].
                    </p>
                </div>
            </div>
        `
    },
    team: {
        title: 'Team Productivity Dashboard',
        html: `
            <div class="showcase-anim-wrap mock-analytics-panel">
                <div class="analytics-grid">
                    <div class="analytics-box">
                        <div class="analytics-val">186h</div>
                        <div class="analytics-lbl">Time Saved</div>
                    </div>
                    <div class="analytics-box">
                        <div class="analytics-val">96.8%</div>
                        <div class="analytics-lbl">Task Autonomy</div>
                    </div>
                    <div class="analytics-box">
                        <div class="analytics-val">14</div>
                        <div class="analytics-lbl">Active Agents</div>
                    </div>
                </div>
                <div class="analytics-graph">
                    <div class="graph-bar" style="height:35%"></div>
                    <div class="graph-bar" style="height:60%"></div>
                    <div class="graph-bar" style="height:45%"></div>
                    <div class="graph-bar" style="height:80%"></div>
                    <div class="graph-bar" style="height:95%"></div>
                    <div class="graph-bar" style="height:55%"></div>
                    <div class="graph-bar" style="height:70%"></div>
                </div>
            </div>
        `
    }
};

function initShowcaseTabs() {
    const tabsList = document.getElementById('showcase-tabs-list');
    const displayTitle = document.getElementById('showcase-active-title');
    const displayContent = document.getElementById('showcase-display-content');

    if (!tabsList || !displayTitle || !displayContent) return;

    loadShowcaseTab('workspace', displayTitle, displayContent);

    tabsList.addEventListener('click', (event) => {
        const tabButton = event.target.closest('.showcase-tab');
        if (!tabButton) return;

        tabsList.querySelectorAll('.showcase-tab').forEach((tab) => tab.classList.remove('active'));
        tabButton.classList.add('active');
        loadShowcaseTab(tabButton.getAttribute('data-tab'), displayTitle, displayContent);
    });
}

function loadShowcaseTab(key, titleEl, contentEl) {
    const data = showcaseContents[key];
    if (!data) return;

    titleEl.textContent = data.title;
    contentEl.innerHTML = data.html;
}

function initEntropyWorkflowDemo() {
    const demo = document.getElementById('entropy-workflow-demo');
    if (!demo) return;

    const promptText = document.getElementById('ewd-prompt-text');
    const cursor = document.getElementById('ewd-prompt-cursor');
    const stepsEl = document.getElementById('ewd-steps');
    const outputEl = document.getElementById('ewd-output');
    const outputTitleEl = document.getElementById('ewd-output-title');
    const outputItemsEl = document.getElementById('ewd-output-items');
    const progressBar = document.getElementById('ewd-progress-bar');
    const progressLabel = document.getElementById('ewd-progress-label');

    if (!promptText || !stepsEl || !outputEl || !outputTitleEl || !outputItemsEl || !progressBar || !progressLabel) return;

    const scenarios = [
        {
            prompt: 'Draft a launch plan for our new AI workspace',
            steps: [
                { title: 'Understanding task', meta: 'Analyzing request scope and business context.', status: 'loading' },
                { title: 'Gathering sources', meta: 'Reviewing prior plans, team notes, and market context.', status: 'processing' },
                { title: 'Generating launch strategy', meta: 'Structuring positioning, milestones, and priorities.', status: 'processing' },
                { title: 'Creating deliverables', meta: 'Building roadmap, timeline, and success milestones.', status: 'processing' },
                { title: 'Exporting results', meta: 'Saving assets into the workspace and preparing handoff.', status: 'completed' }
            ],
            outputTitle: 'Launch plan generated',
            outputItems: ['Roadmap drafted', 'Timeline aligned', 'Milestones captured', 'Workspace export ready']
        },
        {
            prompt: 'Build a customer launch brief for the new release',
            steps: [
                { title: 'Understanding task', meta: 'Parsing goals, audience, and key outcomes.', status: 'loading' },
                { title: 'Gathering sources', meta: 'Collecting release notes and customer context.', status: 'processing' },
                { title: 'Structuring narrative', meta: 'Organizing launch story and proof points.', status: 'processing' },
                { title: 'Creating deliverables', meta: 'Drafting brief, claims, and follow-up actions.', status: 'processing' },
                { title: 'Exporting results', meta: 'Preparing the brief for sharing and review.', status: 'completed' }
            ],
            outputTitle: 'Launch brief ready',
            outputItems: ['Customer narrative drafted', 'Proof points compiled', 'Review checklist added', 'Export prepared']
        }
    ];

    const typeText = async (element, text, speed = 24) => {
        element.textContent = '';
        for (let index = 0; index < text.length; index += 1) {
            element.textContent += text[index];
            await sleep(speed);
        }
    };

    const renderSteps = (currentSteps, activeIndex) => {
        stepsEl.innerHTML = currentSteps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const iconClass = isComplete ? 'completed' : isActive ? step.status : 'loading';
            const statusLabel = isComplete ? 'Completed' : step.status === 'loading' ? 'Loading' : step.status === 'processing' ? 'Processing' : 'Completed';
            return `
                <div class="ewd-step-card ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}">
                    <div class="ewd-step-icon ${iconClass}"></div>
                    <div>
                        <div class="ewd-step-title">${step.title}</div>
                        <div class="ewd-step-meta">${step.meta}</div>
                        <div class="ewd-step-status ${isComplete ? 'completed' : step.status}">${statusLabel}</div>
                    </div>
                </div>
            `;
        }).join('');
    };

    const showOutput = (title, items) => {
        outputTitleEl.textContent = title;
        outputItemsEl.innerHTML = items.map((item) => `<div class="ewd-output-item">${item}</div>`).join('');
        outputEl.style.display = 'block';
    };

    const runScenario = async () => {
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        promptText.textContent = '';
        outputEl.style.display = 'none';
        progressBar.querySelector('span')?.remove();
        const barFill = document.createElement('span');
        progressBar.appendChild(barFill);
        progressLabel.textContent = '0%';
        await typeText(promptText, scenario.prompt);
        await sleep(450);

        scenario.steps.forEach((step, index) => {
            renderSteps(scenario.steps, index);
            const percent = Math.round(((index + 1) / scenario.steps.length) * 100);
            barFill.style.width = `${percent}%`;
            progressLabel.textContent = `${percent}%`;
        });

        await sleep(800);
        showOutput(scenario.outputTitle, scenario.outputItems);
        await sleep(3200);
    };

    const loopDemo = async () => {
        while (true) {
            await runScenario();
        }
    };

    if (cursor) {
        cursor.style.display = 'inline-block';
    }

    loopDemo();
}

function initLiveDemos() {
    const entropyContainer = document.getElementById('entropy-live-demo-page');
    const binaryContainer = document.getElementById('binary-live-demo-page');

    if (entropyContainer) {
        const userText = document.getElementById('entropy-user-text');
        const statusText = document.getElementById('entropy-status-text');
        const loader = document.getElementById('entropy-loader');
        const progressFill = document.getElementById('entropy-progress-fill');
        const logEl = document.getElementById('entropy-log');
        const steps = entropyContainer.querySelectorAll('.demo-step');
        const examples = [
            {
                prompt: 'Draft a launch plan for our new AI workspace',
                stages: [
                    { label: 'Understanding task...', lines: ['Searching workspace files...'], progress: 18 },
                    { label: 'Task understood', lines: ['Searching previous projects...', 'Searching market reports...'], progress: 32 },
                    { label: 'Gathering sources...', lines: ['Searching competitor data...', 'Sources Found: 27'], progress: 48 },
                    { label: 'Creating executive summary...', lines: ['Building milestones...', 'Generating roadmap...'], progress: 68 },
                    { label: 'Building launch plan...', lines: ['Creating timeline...', 'Adding risk analysis...'], progress: 86 },
                    { label: 'Launch plan generated', lines: ['Saved to workspace', 'Ready for review'], progress: 100, success: true }
                ]
            },
            {
                prompt: 'Create competitor analysis report',
                stages: [
                    { label: 'Understanding task...', lines: ['Scanning product pages...'], progress: 18 },
                    { label: 'Task understood', lines: ['Reviewing feature sets...', 'Comparing pricing...'], progress: 36 },
                    { label: 'Gathering sources...', lines: ['Pulling analyst notes...', 'Sources Found: 19'], progress: 58 },
                    { label: 'Generating insights...', lines: ['Comparing positioning...', 'Formatting summary...'], progress: 82 },
                    { label: 'Building report...', lines: ['Drafting executive summary...', 'Preparing export...'], progress: 100, success: true }
                ]
            },
            {
                prompt: 'Prepare quarterly business review',
                stages: [
                    { label: 'Understanding task...', lines: ['Reviewing KPI data...'], progress: 20 },
                    { label: 'Task understood', lines: ['Gathering revenue notes...', 'Checking growth indicators...'], progress: 40 },
                    { label: 'Gathering sources...', lines: ['Scanning team updates...', 'Sources Found: 31'], progress: 62 },
                    { label: 'Building review deck...', lines: ['Drafting highlights...', 'Compiling risks...'], progress: 84 },
                    { label: 'Review prepared', lines: ['Saved to workspace', 'Ready for review'], progress: 100, success: true }
                ]
            }
        ];

        const typeText = async (element, text, speed = 24) => {
            if (!element) return;
            element.textContent = '';
            for (let i = 0; i < text.length; i++) {
                element.textContent += text[i];
                await sleep(speed);
            }
        };

        const setLoader = (show) => {
            if (!loader) return;
            loader.innerHTML = show ? '<span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span>' : '';
        };

        const runEntropyLoop = async () => {
            while (true) {
                for (const example of examples) {
                    steps.forEach((step) => step.classList.remove('active', 'completed'));
                    steps[0].classList.add('active');
                    steps[1].classList.remove('active');
                    await typeText(userText, `User: ${example.prompt}`);
                    await sleep(300);
                    steps[0].classList.remove('active');
                    steps[1].classList.add('active');
                    for (const stage of example.stages) {
                        if (statusText) statusText.textContent = stage.label;
                        setLoader(!stage.success);
                        if (progressFill) progressFill.style.width = `${stage.progress}%`;
                        if (logEl) {
                            logEl.innerHTML = stage.lines.map((item) => `<span class="log-pill${stage.success ? ' success' : ''}">${item}</span>`).join('');
                        }
                        if (stage.success) {
                            steps[1].classList.add('completed');
                        }
                        await sleep(1800);
                    }
                    await sleep(3200);
                }
            }
        };

        runEntropyLoop();
    }

    if (binaryContainer) {
        const userText = document.getElementById('binary-user-text');
        const statusText = document.getElementById('binary-status-text');
        const progressFill = document.getElementById('binary-progress-fill');
        const logEl = document.getElementById('binary-log');
        const steps = binaryContainer.querySelectorAll('.demo-step');
        const phases = [
            {
                label: 'Connecting to Windows PC...',
                log: ['Opening secure channel', 'Authenticating device'],
                progress: 24,
                active: 1
            },
            {
                label: 'Connection established',
                log: ['Launching Figma', 'Selecting homepage frame'],
                progress: 46,
                active: 1
            },
            {
                label: 'Exporting PNG...',
                log: ['Rendering frame', 'Preparing asset'],
                progress: 72,
                active: 1
            },
            {
                label: 'Upload complete',
                log: ['Saved to Downloads', 'Task completed'],
                progress: 100,
                active: 1
            }
        ];

        let binaryIndex = 0;
        const runBinaryLoop = async () => {
            while (true) {
                const phase = phases[binaryIndex % phases.length];
                if (userText) userText.textContent = 'Open Figma and export homepage';
                if (statusText) statusText.textContent = phase.label;
                if (progressFill) progressFill.style.width = `${phase.progress}%`;
                if (logEl) {
                    logEl.innerHTML = phase.log.map((item) => `<span class="log-pill${phase.progress === 100 ? ' success' : ''}">${item}</span>`).join('');
                }
                steps.forEach((step, index) => step.classList.toggle('active', index === 0 || index === 1));
                steps[0].classList.toggle('active', true);
                steps[1].classList.toggle('active', true);
                steps[1].classList.toggle('completed', phase.progress >= 100);
                binaryIndex = (binaryIndex + 1) % phases.length;
                await sleep(2200);
            }
        };
        runBinaryLoop();
    }

    const dash = document.querySelector('.device-control-dashboard');
    if (!dash) return;

    const activityItems = Array.from(dash.querySelectorAll('.activity-item'));
    const cpuValue = document.getElementById('cpu-value');
    const memoryValue = document.getElementById('memory-value');
    const networkValue = document.getElementById('network-value');
    const sessionValue = document.getElementById('session-value');
    const statusPill = dash.querySelector('.status-pill');

    const values = [
        { cpu: '34%', memory: '42%', network: 'Stable', session: 'Streaming' },
        { cpu: '41%', memory: '47%', network: 'Stable', session: 'Executing' },
        { cpu: '38%', memory: '44%', network: 'Stable', session: 'Saving' },
        { cpu: '32%', memory: '40%', network: 'Stable', session: 'Completed' }
    ];

    let currentValueIndex = 0;
    setInterval(() => {
        const current = values[currentValueIndex % values.length];
        if (cpuValue) cpuValue.textContent = current.cpu;
        if (memoryValue) memoryValue.textContent = current.memory;
        if (networkValue) networkValue.textContent = current.network;
        if (sessionValue) sessionValue.textContent = current.session;
        activityItems.forEach((item, itemIndex) => {
            item.classList.toggle('active', itemIndex === currentValueIndex % activityItems.length);
        });
        if (statusPill) statusPill.textContent = current.session === 'Completed' ? 'Completed' : 'Online';
        currentValueIndex++;
    }, 1400);
}

function initRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ============================================================
   BINARY MOBILE DEMO — Full animated scenario engine
   ============================================================ */
function initBinaryMobileDemo() {
    // DOM refs
    const typedText     = document.getElementById('bin-typed-text');
    const connDot       = document.getElementById('bin-conn-dot');
    const connLabel     = document.getElementById('bin-conn-label');
    const progressWrap  = document.getElementById('bin-progress-wrap');
    const progressBar   = document.getElementById('bin-progress-bar');
    const progressLabel = document.getElementById('bin-progress-label');
    const activityLog   = document.getElementById('bin-activity-log');
    const successOverlay= document.getElementById('bin-success-overlay');
    const successText   = document.getElementById('bin-success-text');
    const successSub    = document.getElementById('bin-success-sub');
    const cursorEl      = document.getElementById('bin-remote-cursor');
    const pulseEl       = document.getElementById('bin-cursor-pulse');
    const appLabel      = document.getElementById('bin-app-label');
    const appHeader     = document.getElementById('bin-app-header');
    const canvasHero    = document.getElementById('bin-canvas-hero');

    // All elements must exist (page may not have them)
    if (!typedText || !connDot || !connLabel) return;

    // ── Scenario definitions ──────────────────────────────────
    const scenarios = [
        {
            command:    'Open Figma and export homepage',
            appName:    'Figma - Homepage.fig',
            appHeader:  'Figma — homepage_v3.fig',
            successMsg: 'Homepage exported successfully',
            successSub: 'Saved to Downloads/homepage.png',
            steps: [
                { label: 'Connecting to Windows PC...',   progress: 18, log: '⬡ Opening secure channel' },
                { label: 'Connection established',         progress: 36, log: '✓ Device Connected' },
                { label: 'Opening Figma...',               progress: 50, log: '✓ Figma Opened', cursor: { top:'38%', left:'52%' }, click: true },
                { label: 'Loading Homepage Frame...',      progress: 64, log: '✓ Homepage Selected', cursor: { top:'55%', left:'68%' }, click: true },
                { label: 'Selecting Export Settings...',   progress: 78, log: '✓ Export Started',   cursor: { top:'28%', left:'80%' }, click: true },
                { label: 'Exporting PNG...',               progress: 92, log: '✓ Exporting...', export: true },
                { label: 'File saved',                     progress: 100, log: '✓ File Saved' }
            ]
        },
        {
            command:    'Generate PDF report from notes',
            appName:    'VS Code — notes.md',
            appHeader:  'VS Code — meeting_notes.md',
            successMsg: 'Report generated successfully',
            successSub: 'Saved to Downloads/report.pdf',
            steps: [
                { label: 'Connecting to remote device...',  progress: 16, log: '⬡ Initialising session' },
                { label: 'Connection established',           progress: 32, log: '✓ Device Connected' },
                { label: 'Opening VS Code...',               progress: 48, log: '✓ VS Code Opened', cursor: { top:'42%', left:'44%' }, click: true },
                { label: 'Reading meeting_notes.md...',      progress: 62, log: '✓ Notes Loaded',   cursor: { top:'60%', left:'56%' } },
                { label: 'Converting to PDF...',             progress: 82, log: '✓ Export Started', export: true },
                { label: 'PDF ready',                        progress: 100, log: '✓ File Saved' }
            ]
        },
        {
            command:    'Save meeting notes to Drive',
            appName:    'Entropy OS — Workspace',
            appHeader:  'Entropy OS — Documents',
            successMsg: 'Notes uploaded successfully',
            successSub: 'Synced to Drive / Meeting Notes',
            steps: [
                { label: 'Connecting to device...',          progress: 20, log: '⬡ Authenticating' },
                { label: 'Connection established',           progress: 38, log: '✓ Device Connected' },
                { label: 'Opening Documents folder...',      progress: 54, log: '✓ Folder Opened',  cursor: { top:'45%', left:'38%' }, click: true },
                { label: 'Selecting notes file...',          progress: 70, log: '✓ File Selected',  cursor: { top:'62%', left:'55%' }, click: true },
                { label: 'Uploading to Drive...',            progress: 88, log: '✓ Upload Started', export: true },
                { label: 'Upload complete',                  progress: 100, log: '✓ Task Completed' }
            ]
        },
        {
            command:    'Upload project files to server',
            appName:    'File Manager — Projects/',
            appHeader:  'File Manager — /Projects/ai-app',
            successMsg: 'Upload complete',
            successSub: '14 files pushed to server',
            steps: [
                { label: 'Connecting to server...',          progress: 15, log: '⬡ Opening SSH tunnel' },
                { label: 'Connection established',           progress: 30, log: '✓ Device Connected' },
                { label: 'Opening File Manager...',          progress: 46, log: '✓ Manager Opened',  cursor: { top:'35%', left:'48%' }, click: true },
                { label: 'Selecting project directory...',   progress: 60, log: '✓ Files Selected',  cursor: { top:'54%', left:'64%' }, click: true },
                { label: 'Uploading 14 files...',            progress: 82, log: '✓ Upload Started',  export: true },
                { label: 'Server sync complete',             progress: 100, log: '✓ File Saved' }
            ]
        },
        {
            command:    'Open VS Code workspace',
            appName:    'VS Code — entropy-os/',
            appHeader:  'VS Code — entropy-os/src/main.ts',
            successMsg: 'Workspace opened',
            successSub: 'VS Code ready on remote PC',
            steps: [
                { label: 'Connecting to MacBook...',         progress: 18, log: '⬡ Establishing link' },
                { label: 'Connection established',           progress: 35, log: '✓ Device Connected' },
                { label: 'Launching VS Code...',             progress: 52, log: '✓ VS Code Opened',  cursor: { top:'40%', left:'50%' }, click: true },
                { label: 'Opening workspace folder...',      progress: 68, log: '✓ Workspace Loaded', cursor: { top:'58%', left:'60%' }, click: true },
                { label: 'Loading source files...',          progress: 86, log: '✓ Files Ready',     export: true },
                { label: 'Workspace ready',                  progress: 100, log: '✓ Task Completed' }
            ]
        }
    ];

    // ── Helpers ───────────────────────────────────────────────
    const setConn = (state) => {
        // state: 'offline' | 'connecting' | 'connected'
        connDot.className   = 'bin-conn-dot'   + (state !== 'offline' ? ' ' + state : '');
        connLabel.className = 'bin-conn-label' + (state !== 'offline' ? ' ' + state : '');
        const labels = { offline: 'Offline', connecting: 'Connecting…', connected: 'Connected' };
        connLabel.textContent = labels[state] || 'Offline';
    };

    const setProgress = (pct) => {
        if (!progressBar || !progressLabel) return;
        progressBar.style.setProperty('--prog', pct + '%');
        progressLabel.textContent = pct + '%';
        if (progressWrap) progressWrap.classList.toggle('visible', pct > 0);
    };

    const moveCursor = (top, left) => {
        if (!cursorEl) return;
        cursorEl.style.transition = 'top 0.7s cubic-bezier(0.4,0,0.2,1), left 0.7s cubic-bezier(0.4,0,0.2,1)';
        cursorEl.style.top  = top;
        cursorEl.style.left = left;
    };

    const firePulse = (top, left) => {
        if (!pulseEl) return;
        pulseEl.style.top  = top;
        pulseEl.style.left = left;
        pulseEl.classList.remove('fire');
        void pulseEl.offsetWidth; // reflow to restart animation
        pulseEl.classList.add('fire');
    };

    const addLog = (text) => {
        if (!activityLog) return;
        const item = document.createElement('div');
        item.className = 'bin-log-item';
        item.innerHTML = `<span class="bin-log-check">✓</span><span>${text.replace(/^[✓⬡]\s*/, '')}</span>`;
        activityLog.appendChild(item);
        // Keep only last 3 lines visible
        const items = activityLog.querySelectorAll('.bin-log-item');
        if (items.length > 3) items[0].remove();
    };

    const typeCommand = async (cmd) => {
        if (!typedText) return;
        typedText.textContent = '';
        for (let i = 0; i < cmd.length; i++) {
            typedText.textContent += cmd[i];
            await sleep(32 + Math.random() * 20);
        }
    };

    const reset = async () => {
        // Clear state
        if (typedText)      typedText.textContent = '';
        if (activityLog)    activityLog.innerHTML = '';
        if (progressWrap)   progressWrap.classList.remove('visible');
        if (canvasHero)     canvasHero.classList.remove('exporting');
        if (successOverlay) successOverlay.classList.remove('visible');
        setConn('offline');
        setProgress(0);
        // Reset cursor to default position
        if (cursorEl) {
            cursorEl.style.transition = 'none';
            cursorEl.style.top  = '60%';
            cursorEl.style.left = '45%';
        }
        // Update app header back to default
        if (appLabel)  appLabel.textContent  = 'Entropy OS';
        if (appHeader) appHeader.textContent = 'Figma - Homepage';
    };

    // ── Main loop ─────────────────────────────────────────────
    let scenarioIndex = 0;

    const runLoop = async () => {
        while (true) {
            const sc = scenarios[scenarioIndex % scenarios.length];
            scenarioIndex++;

            await reset();
            await sleep(600);

            // 1. Type the command
            await typeCommand(sc.command);
            await sleep(500);

            // 2. Simulate "Execute" button flash
            const execBtn = document.getElementById('bin-execute-btn');
            if (execBtn) {
                execBtn.style.filter = 'brightness(1.3)';
                await sleep(200);
                execBtn.style.filter = '';
            }
            await sleep(300);

            // 3. Walk through steps
            for (let i = 0; i < sc.steps.length; i++) {
                const step = sc.steps[i];

                // Connection state changes for first two steps
                if (i === 0) setConn('connecting');
                if (i === 1) {
                    setConn('connected');
                    if (appLabel)  appLabel.textContent  = sc.appName;
                    if (appHeader) appHeader.textContent = sc.appHeader;
                }

                // Progress
                setProgress(step.progress);

                // Cursor movement + pulse
                if (step.cursor) {
                    moveCursor(step.cursor.top, step.cursor.left);
                    if (step.click) {
                        await sleep(550);
                        firePulse(step.cursor.top, step.cursor.left);
                    }
                }

                // Export flash
                if (step.export && canvasHero) {
                    canvasHero.classList.add('exporting');
                } else if (canvasHero) {
                    canvasHero.classList.remove('exporting');
                }

                // Activity log
                addLog(step.log);

                // Wait per step (longer for last)
                await sleep(i === sc.steps.length - 1 ? 700 : 1450 + Math.random() * 300);
            }

            // 4. Success overlay
            if (canvasHero)     canvasHero.classList.remove('exporting');
            if (successText)    successText.textContent = sc.successMsg;
            if (successSub)     successSub.textContent  = sc.successSub;
            if (successOverlay) successOverlay.classList.add('visible');

            // 5. Hold success state, then loop
            await sleep(4200);
        }
    };

    runLoop();
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    const updateThemeState = (theme) => {
        document.documentElement.classList.remove('light-theme', 'dark-theme');
        document.body.classList.remove('light-theme', 'dark-theme');
        
        document.documentElement.classList.add(theme + '-theme');
        document.body.classList.add(theme + '-theme');
        localStorage.setItem('theme', theme);
    };

    toggleBtn.addEventListener('click', () => {
        const isCurrentlyLight = document.documentElement.classList.contains('light-theme');
        const nextTheme = isCurrentlyLight ? 'dark' : 'light';
        
        // Add toggling animation class
        toggleBtn.classList.add('toggling');
        updateThemeState(nextTheme);
        
        // Remove animation class after transition ends
        setTimeout(() => {
            toggleBtn.classList.remove('toggling');
        }, 450);
    });

    // Run sync on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    updateThemeState(savedTheme);
}
