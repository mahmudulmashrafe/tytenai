/**
 * Tyten AI - Interactive Multi-Agent Fleet Simulator
 * Simulates real-time multi-agent consensus, execution DAG, and live telemetry.
 */

(function () {
  const workflows = {
    incident: {
      title: "Full-Stack Incident Remediation",
      nodes: [
        { id: "obs", icon: "🛰️", name: "Sentinel-Obs", role: "Telemetry Ingestion" },
        { id: "diag", icon: "🧠", name: "Nexus-Planner", role: "Consensus Diagnosis" },
        { id: "exec", icon: "⚡", name: "Synth-Coder", role: "Canary Patch & Deploy" },
        { id: "guard", icon: "🛡️", name: "Gatekeeper-AI", role: "Zero-Trust Verification" }
      ],
      logs: [
        { time: "00:00.12", agent: "Sentinel-Obs", msg: "🚨 Anomaly detected: 504 Gateway spike on cluster [us-east-1a]" },
        { time: "00:00.34", agent: "Sentinel-Obs", msg: "Ingested 42,000 trace vectors. Root cause isolated: Connection pool exhaustion." },
        { time: "00:00.65", agent: "Nexus-Planner", msg: "Convening 4-agent deliberative consensus quorum." },
        { time: "00:00.98", agent: "Nexus-Planner", msg: "Consensus reached (100% confidence). Plan: Auto-scale connection pool & recycle stale workers." },
        { time: "00:01.32", agent: "Synth-Coder", msg: "Applying Terraform patch and spinning up isolated canary containers." },
        { time: "00:01.76", agent: "Gatekeeper-AI", msg: "Zero-trust sandbox verification: Static analysis & regression tests clean." },
        { time: "00:02.10", agent: "Synth-Coder", msg: "Promoted canary to production cluster. Traffic re-routed." },
        { time: "00:02.45", agent: "Sentinel-Obs", msg: "✅ Latency normalized to 14ms. Error rate: 0.00%. Incident resolved autonomously." }
      ],
      metrics: { confidence: 99.8, tokensSaved: 84, latencyMs: 24 }
    },
    migration: {
      title: "Zero-Downtime Data Schema Migration",
      nodes: [
        { id: "obs", icon: "📊", name: "Schema-Scanner", role: "DDL Analysis" },
        { id: "diag", icon: "🔄", name: "Nexus-Planner", role: "DAG Partitioning" },
        { id: "exec", icon: "⚡", name: "Synth-Worker", role: "Dual-Write Sync" },
        { id: "guard", icon: "🛡️", name: "Gatekeeper-AI", role: "Integrity Verifier" }
      ],
      logs: [
        { time: "00:00.10", agent: "Schema-Scanner", msg: "Cataloging 1.8B records across Postgres & DynamoDB tables." },
        { time: "00:00.41", agent: "Nexus-Planner", msg: "Constructed dual-write replication DAG with shadow ledger." },
        { time: "00:00.85", agent: "Synth-Worker", msg: "Spinning up 32 distributed sync workers. Throughput: 140k writes/sec." },
        { time: "00:01.40", agent: "Gatekeeper-AI", msg: "Verifying checksums: 1,840,291,012 records matched. 0 discrepancy." },
        { time: "00:01.90", agent: "Synth-Worker", msg: "Flipping DNS pointer to target partition. Deprecating legacy schema." },
        { time: "00:02.20", agent: "Schema-Scanner", msg: "✅ Migration completed with 0ms downtime and 100% data fidelity." }
      ],
      metrics: { confidence: 100.0, tokensSaved: 91, latencyMs: 18 }
    },
    security: {
      title: "Zero-Day CVE Audit & Auto-Patching",
      nodes: [
        { id: "obs", icon: "🔍", name: "Vuln-Audit", role: "AST & Dependency Scan" },
        { id: "diag", icon: "🛡️", name: "Nexus-Planner", role: "Exploit Vectoring" },
        { id: "exec", icon: "⚡", name: "Synth-Sec", role: "Sandboxed Exploit Test" },
        { id: "guard", icon: "🔒", name: "Gatekeeper-AI", role: "Cryptographic Attestation" }
      ],
      logs: [
        { time: "00:00.15", agent: "Vuln-Audit", msg: "Identified Critical CVE-2026-9812 in transitive dependency chain." },
        { time: "00:00.48", agent: "Nexus-Planner", msg: "Synthesizing minimal backward-compatible semantic fix." },
        { time: "00:01.05", agent: "Synth-Sec", msg: "Executing red-team fuzzing harness inside air-gapped microVM." },
        { time: "00:01.55", agent: "Gatekeeper-AI", msg: "Patch verified: Exploit neutralized, 1,420 existing tests passing." },
        { time: "00:01.98", agent: "Synth-Sec", msg: "Created atomic Pull Request #842 and signed commit with Tyten HSM key." },
        { time: "00:02.30", agent: "Vuln-Audit", msg: "✅ Threat neutralized before external disclosure." }
      ],
      metrics: { confidence: 99.9, tokensSaved: 78, latencyMs: 29 }
    }
  };

  let currentKey = 'incident';
  let simTimer = null;
  let isRunning = false;

  const dagContainer = document.getElementById('sim-dag-pipeline');
  const logBox = document.getElementById('sim-logs');
  const runBtn = document.getElementById('sim-run-btn');
  const tabs = document.querySelectorAll('.sim-tab-btn');

  const confVal = document.getElementById('sim-metric-conf');
  const confBar = document.getElementById('sim-bar-conf');
  const tokenVal = document.getElementById('sim-metric-tokens');
  const tokenBar = document.getElementById('sim-bar-tokens');
  const latVal = document.getElementById('sim-metric-latency');
  const latBar = document.getElementById('sim-bar-latency');

  function renderWorkflow(key) {
    currentKey = key;
    const wf = workflows[key];
    if (!wf || !dagContainer) return;

    // Reset controls
    stopSimulation();

    // Render nodes
    let html = '';
    wf.nodes.forEach((n, idx) => {
      html += `
        <div class="dag-node" id="dag-node-${n.id}">
          <div class="dag-node-icon">${n.icon}</div>
          <div class="dag-node-name">${n.name}</div>
          <div class="dag-node-role">${n.role}</div>
        </div>
      `;
      if (idx < wf.nodes.length - 1) {
        html += `<div class="dag-arrow" id="dag-arrow-${idx}">→</div>`;
      }
    });
    dagContainer.innerHTML = html;

    // Set initial metrics
    if (confVal) confVal.textContent = wf.metrics.confidence + '%';
    if (confBar) confBar.style.width = wf.metrics.confidence + '%';
    if (tokenVal) tokenVal.textContent = wf.metrics.tokensSaved + '%';
    if (tokenBar) tokenBar.style.width = wf.metrics.tokensSaved + '%';
    if (latVal) latVal.textContent = wf.metrics.latencyMs + 'ms';
    if (latBar) latBar.style.width = Math.min(wf.metrics.latencyMs * 2.5, 100) + '%';

    // Set initial prompt/logs
    if (logBox) {
      logBox.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">Ready to simulate workflow: ${wf.title}. Press "Run Simulation" below.</div>`;
    }
  }

  function startSimulation() {
    if (isRunning) return;
    isRunning = true;
    if (runBtn) {
      runBtn.innerHTML = `<span>⏳ Simulating...</span>`;
      runBtn.disabled = true;
    }

    const wf = workflows[currentKey];
    if (logBox) logBox.innerHTML = '';

    const nodes = wf.nodes.map(n => document.getElementById(`dag-node-${n.id}`));
    nodes.forEach(n => n && n.classList.remove('active', 'complete'));

    let step = 0;
    const totalLogs = wf.logs.length;

    simTimer = setInterval(() => {
      if (step < totalLogs) {
        const item = wf.logs[step];
        
        // Append log line
        if (logBox) {
          const div = document.createElement('div');
          div.className = 'log-entry';
          div.innerHTML = `
            <span class="log-time">[${item.time}]</span>
            <span class="log-agent">${item.agent}:</span>
            <span class="log-msg ${step === totalLogs - 1 ? 'highlight' : ''}">${item.msg}</span>
          `;
          logBox.appendChild(div);
          logBox.scrollTop = logBox.scrollHeight;
        }

        // Active node highlight
        const activeNodeIdx = Math.min(Math.floor((step / totalLogs) * wf.nodes.length), wf.nodes.length - 1);
        nodes.forEach((n, idx) => {
          if (!n) return;
          if (idx < activeNodeIdx) {
            n.classList.remove('active');
            n.classList.add('complete');
          } else if (idx === activeNodeIdx) {
            n.classList.add('active');
          } else {
            n.classList.remove('active', 'complete');
          }
        });

        step++;
      } else {
        // Complete
        nodes.forEach(n => {
          if (n) {
            n.classList.remove('active');
            n.classList.add('complete');
          }
        });
        stopSimulation();
      }
    }, 450);
  }

  function stopSimulation() {
    if (simTimer) clearInterval(simTimer);
    simTimer = null;
    isRunning = false;
    if (runBtn) {
      runBtn.innerHTML = `<span>▶ Run Fleet Simulation</span>`;
      runBtn.disabled = false;
    }
  }

  // Event Listeners
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderWorkflow(tab.getAttribute('data-wf'));
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', startSimulation);
  }

  // Initialize default workflow
  renderWorkflow('incident');
})();
