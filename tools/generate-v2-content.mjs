import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const sourcePath = path.join(root, 'cybersecurity_study_companion_data.json');
const workbookPath = path.join(root, 'src/data/workbook-enrichment.json');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const workbook = JSON.parse(fs.readFileSync(workbookPath, 'utf8'));

const toWeekId = (weekNumber) => `week-${String(weekNumber).padStart(2, '0')}`;
const toDayId = (weekNumber, dayNumber) => `${toWeekId(weekNumber)}-day-${String(dayNumber).padStart(2, '0')}`;
const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toPhaseRef = (phase) => slugify(phase);

const weekPageByWeek = new Map((source.week_pages || []).map((page) => [Number(page.week), page]));

const WEEK_1_SUPPORT_FIX = {
  1: {
    support_resource: 'LearnFree Computers 101',
    support_url: 'https://edu.gcfglobal.org/en/computerbasics/'
  },
  2: {
    support_resource: 'Professor Messer - BIOS Settings (220-1201)',
    support_url:
      'https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/bios-settings-220-1201/'
  },
  3: {
    support_resource: 'Professor Messer - Copper Connectors (220-1201)',
    support_url:
      'https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/copper-connectors-220-1201/'
  },
  4: {
    support_resource: 'Microsoft System Information (msinfo32.exe)',
    support_url: 'https://learn.microsoft.com/windows-server/administration/windows-commands/msinfo32'
  },
  5: {
    support_resource: 'Professor Messer 220-1201 Pop Quizzes Archive',
    support_url: 'https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-pop-quiz/'
  },
  6: {
    support_resource: 'CompTIA A+ Core 1 V15 overview/objectives',
    support_url: 'https://www.comptia.org/certifications/a'
  },
  7: {
    support_resource: '',
    support_url: ''
  }
};

const WEEK_TERM_IDS = {
  1: ['cpu', 'ram', 'storage-drive', 'motherboard', 'bios', 'boot-process'],
  2: ['mobile-device', 'wifi-standard', 'ip-address', 'virtual-machine', 'hypervisor', 'dhcp'],
  3: ['operating-system', 'filesystem', 'ntfs', 'command-line', 'powershell', 'service-management'],
  4: ['malware', 'mfa', 'least-privilege', 'troubleshooting-method', 'patch-management', 'social-engineering'],
  5: ['linux-kernel', 'shell', 'sudo', 'package-manager', 'virtualbox', 'ssh'],
  6: ['osi-model', 'tcp-ip-model', 'ethernet-frame', 'mac-address', 'switch', 'network-topology'],
  7: ['switch', 'vlan', 'stp', 'router', 'default-gateway', 'routing-table'],
  8: ['ipv4', 'cidr', 'subnet-mask', 'private-ip', 'public-ip', 'subnetting'],
  9: ['tcp', 'udp', 'port-number', 'dns', 'nat', 'three-way-handshake'],
  10: ['ssid', 'wpa3', 'soho-router', 'cloud-service-model', 'firewall', 'network-segmentation'],
  11: ['wireshark', 'pcap', 'packet-filter', 'traceroute', 'ping', 'latency'],
  12: ['http-request', 'dns-resolution', 'tls-handshake', 'web-server', 'reverse-proxy', 'session-token'],
  13: ['cia-triad', 'risk', 'threat', 'vulnerability', 'control', 'security-framework'],
  14: ['risk-register', 'likelihood', 'impact', 'risk-treatment', 'qualitative-risk', 'quantitative-risk'],
  15: ['intrusion-detection', 'intrusion-prevention', 'siem', 'log-source', 'network-baseline', 'hardening'],
  16: ['linux-permissions', 'chmod', 'chown', 'process', 'systemctl', 'cron'],
  17: ['sql-query', 'select-statement', 'where-clause', 'join', 'input-validation', 'sql-injection'],
  18: ['asset-inventory', 'data-classification', 'threat-model', 'attack-vector', 'vulnerability-scan', 'cvss'],
  19: ['mitigation', 'exploit', 'compensating-control', 'residual-risk', 'exposure', 'threat-intelligence'],
  20: ['alert-triage', 'false-positive', 'ioc', 'incident-severity', 'containment', 'eradication'],
  21: ['recovery', 'playbook', 'escalation-path', 'case-management', 'timeline-analysis', 'post-incident-review'],
  22: ['python-script', 'variable', 'function', 'loop', 'conditional', 'error-handling'],
  23: ['api', 'http-method', 'automation-playbook', 'regex', 'file-parsing', 'version-control'],
  24: ['resume-tailoring', 'star-method', 'elevator-pitch', 'portfolio-artifact', 'interview-question', 'career-story'],
  25: ['linkedin-profile', 'networking-outreach', 'job-tracker', 'keyword-optimization', 'application-funnel', 'ai-assistant-guardrails'],
  26: ['identity', 'authentication', 'authorization', 'accounting', 'hashing', 'encryption'],
  27: ['reconnaissance', 'enumeration', 'privilege-escalation', 'defense-in-depth', 'incident-journal', 'control-recommendation'],
  28: ['incident-command', 'playbook', 'maturity-model', 'communication-plan', 'evidence-handling', 'tabletop-exercise'],
  29: ['critical-infrastructure', 'business-impact-analysis', 'governance', 'compliance', 'risk-assessment', 'vendor-risk'],
  30: ['soc-workflow', 'forensic-imaging', 'chain-of-custody', 'log-correlation', 'detection-rule', 'triage-queue'],
  31: ['executive-briefing', 'management-summary', 'artifact-curation', 'roadmap-prioritization', 'capability-gap', 'continuous-improvement'],
  32: ['spaced-repetition', 'retrieval-practice', 'mock-exam', 'error-log', 'knowledge-gap', 'study-system-reset']
};

const manualTerms = new Map();
const addTerm = (id, term, definition, whyItMatters, examRelevance = 'medium', tags = []) => {
  manualTerms.set(id, {
    id,
    term,
    definition,
    why_it_matters: whyItMatters,
    exam_relevance: examRelevance,
    tags
  });
};

addTerm('cpu', 'CPU', 'Central Processing Unit; executes instructions and coordinates processing tasks.', 'Helps explain hardware performance and troubleshooting trade-offs.', 'high', ['hardware', 'fundamentals']);
addTerm('ram', 'RAM', 'Volatile memory used for active processes and short-term data access.', 'Directly affects system responsiveness and multitasking behavior.', 'high', ['hardware', 'memory']);
addTerm('storage-drive', 'Storage Drive', 'Persistent storage device such as HDD or SSD for operating system and files.', 'Storage failures and capacity bottlenecks are common support issues.', 'high', ['hardware', 'storage']);
addTerm('motherboard', 'Motherboard', 'Main circuit board that connects CPU, memory, storage, and expansion components.', 'Understanding board layout speeds hardware diagnostics and upgrades.', 'high', ['hardware']);
addTerm('bios', 'BIOS/UEFI Firmware', 'Low-level firmware that initializes hardware and starts the boot process.', 'Firmware settings and boot order problems appear often in exams and real support.', 'high', ['hardware', 'boot']);
addTerm('boot-process', 'Boot Process', 'Sequence that moves a system from power-on to a usable operating system session.', 'Boot-stage failures require precise troubleshooting and clear explanation.', 'high', ['boot', 'troubleshooting']);
addTerm('mobile-device', 'Mobile Device', 'Portable endpoint such as a laptop, tablet, or smartphone with dedicated management constraints.', 'Mobile security and support expectations differ from desktop workflows.', 'medium', ['mobile', 'endpoints']);
addTerm('wifi-standard', 'Wi-Fi Standard', 'Wireless networking specification such as 802.11n/ac/ax defining speed and capability.', 'Wireless expectations and compatibility issues depend on the standard in use.', 'high', ['networking', 'wireless']);
addTerm('ip-address', 'IP Address', 'Logical network address used to identify a host and route traffic.', 'Core concept for every network troubleshooting and security workflow.', 'high', ['networking', 'addressing']);
addTerm('virtual-machine', 'Virtual Machine', 'Software-defined computer running an operating system inside a host system.', 'Supports safe labs, repeatable practice, and isolated testing.', 'high', ['virtualization', 'labs']);
addTerm('hypervisor', 'Hypervisor', 'Layer that creates and manages virtual machines on host hardware.', 'Hypervisor choices impact lab reliability and resource planning.', 'medium', ['virtualization']);
addTerm('dhcp', 'DHCP', 'Dynamic Host Configuration Protocol; automatically assigns network settings to devices.', 'Misconfigured DHCP causes immediate connectivity failures.', 'high', ['networking', 'services']);
addTerm('operating-system', 'Operating System', 'Core software that manages hardware, files, processes, and user interaction.', 'Foundational for system administration, hardening, and troubleshooting.', 'high', ['os', 'fundamentals']);
addTerm('filesystem', 'Filesystem', 'Structure and rules used to organize and access files on storage media.', 'File recovery, permissions, and performance all depend on filesystem behavior.', 'high', ['os', 'storage']);
addTerm('ntfs', 'NTFS', 'New Technology File System used by modern Windows systems.', 'Important for permissions, encryption features, and recovery workflows.', 'high', ['windows', 'filesystem']);
addTerm('command-line', 'Command Line', 'Text-based interface for executing operating system commands.', 'Essential for efficient administration and scripted troubleshooting.', 'high', ['os', 'operations']);
addTerm('powershell', 'PowerShell', 'Windows automation shell and scripting language for system administration.', 'Critical for repeatable administrative and security tasks in Windows environments.', 'high', ['windows', 'automation']);
addTerm('service-management', 'Service Management', 'Practice of monitoring, starting, stopping, and configuring background services.', 'Service failures often explain application downtime or startup problems.', 'medium', ['os', 'troubleshooting']);
addTerm('malware', 'Malware', 'Malicious software designed to disrupt systems, steal data, or gain unauthorized control.', 'Threat recognition is central to detection and response readiness.', 'high', ['security', 'threats']);
addTerm('mfa', 'Multi-Factor Authentication', 'Authentication method requiring two or more independent proof factors.', 'One of the highest-impact controls for account compromise reduction.', 'high', ['iam', 'controls']);
addTerm('least-privilege', 'Least Privilege', 'Security principle granting only the minimum permissions needed for a task.', 'Limits blast radius when accounts are abused or misused.', 'high', ['iam', 'controls']);
addTerm('troubleshooting-method', 'Troubleshooting Methodology', 'Structured step-by-step process for diagnosing and resolving technical issues.', 'Prevents random guessing and produces defensible support decisions.', 'high', ['operations', 'troubleshooting']);
addTerm('patch-management', 'Patch Management', 'Process for testing, deploying, and verifying software updates.', 'Unpatched systems are a common source of compromise.', 'high', ['security', 'operations']);
addTerm('social-engineering', 'Social Engineering', 'Psychological manipulation used to trick users into unsafe actions.', 'People-targeted attacks bypass technical controls if awareness is weak.', 'high', ['security', 'human-risk']);
addTerm('linux-kernel', 'Linux Kernel', 'Core component of Linux that manages hardware access, processes, and memory.', 'Kernel understanding improves troubleshooting confidence in Linux labs.', 'medium', ['linux', 'os']);
addTerm('shell', 'Shell', 'Command interpreter used to interact with the operating system.', 'Shell fluency is required for efficient Linux operations and automation.', 'high', ['linux', 'operations']);
addTerm('sudo', 'sudo', 'Command that allows approved users to run tasks with elevated privileges.', 'Critical for safe privilege escalation and admin accountability.', 'high', ['linux', 'iam']);
addTerm('package-manager', 'Package Manager', 'Tool that installs, updates, and removes software packages with dependency handling.', 'Reliable package workflows reduce configuration drift and security gaps.', 'medium', ['linux', 'operations']);
addTerm('virtualbox', 'VirtualBox', 'Desktop virtualization platform for running lab virtual machines.', 'Provides repeatable lab environments for security practice.', 'medium', ['virtualization', 'labs']);
addTerm('ssh', 'SSH', 'Secure Shell protocol for encrypted remote administration.', 'Remote management and secure command execution are standard operations skills.', 'high', ['linux', 'networking', 'security']);
addTerm('osi-model', 'OSI Model', 'Seven-layer conceptual model describing how network communication functions.', 'Supports structured troubleshooting by layer and protocol.', 'high', ['networking', 'fundamentals']);
addTerm('tcp-ip-model', 'TCP/IP Model', 'Practical networking model used to map real internet protocol behavior.', 'Needed to relate theory to actual packet flow and services.', 'high', ['networking', 'fundamentals']);
addTerm('ethernet-frame', 'Ethernet Frame', 'Data-link encapsulation format used on Ethernet networks.', 'Frame-level understanding helps with switching and capture analysis.', 'high', ['networking', 'ethernet']);
addTerm('mac-address', 'MAC Address', 'Hardware identifier used by network interfaces on local segments.', 'Used heavily in switching, ARP analysis, and access control.', 'high', ['networking', 'ethernet']);
addTerm('switch', 'Switch', 'Layer 2 device that forwards frames based on MAC address tables.', 'Core infrastructure component in enterprise and home networks.', 'high', ['networking']);
addTerm('network-topology', 'Network Topology', 'Physical or logical arrangement of network devices and connections.', 'Topology affects resilience, fault domains, and troubleshooting speed.', 'medium', ['networking', 'design']);
addTerm('vlan', 'VLAN', 'Virtual LAN used to segment broadcast domains on switched networks.', 'Segmentation improves security boundaries and traffic control.', 'high', ['networking', 'segmentation']);
addTerm('stp', 'Spanning Tree Protocol', 'Protocol that prevents switching loops by managing redundant paths.', 'Loop prevention is essential for stable Layer 2 operations.', 'medium', ['networking', 'switching']);
addTerm('router', 'Router', 'Layer 3 device that forwards packets between networks.', 'Routing behavior determines reachability and performance.', 'high', ['networking']);
addTerm('default-gateway', 'Default Gateway', 'Router path used when a host sends traffic outside its local subnet.', 'Gateway misconfiguration is a frequent root cause of network outages.', 'high', ['networking', 'routing']);
addTerm('routing-table', 'Routing Table', 'Lookup data used by hosts and routers to choose next-hop paths.', 'Reading routing entries is vital during troubleshooting.', 'high', ['networking', 'routing']);
addTerm('ipv4', 'IPv4', '32-bit addressing protocol widely used for internet and private networks.', 'Address planning and subnetting are core exam domains.', 'high', ['networking', 'addressing']);
addTerm('cidr', 'CIDR', 'Classless Inter-Domain Routing notation for subnet masks and prefixes.', 'CIDR drives efficient address allocation and route summarization.', 'high', ['networking', 'addressing']);
addTerm('subnet-mask', 'Subnet Mask', 'Bitmask that separates network and host portions of an IP address.', 'Incorrect masks break host-to-host communication patterns.', 'high', ['networking', 'addressing']);
addTerm('private-ip', 'Private IP', 'Non-routable address range intended for internal networks.', 'Essential for LAN design and NAT-based internet access.', 'high', ['networking', 'addressing']);
addTerm('public-ip', 'Public IP', 'Globally routable address visible on the internet.', 'Used in perimeter design, DNS, and exposure analysis.', 'high', ['networking', 'addressing']);
addTerm('subnetting', 'Subnetting', 'Practice of dividing networks into smaller addressable segments.', 'Improves scalability, performance, and security segmentation.', 'high', ['networking', 'addressing']);
addTerm('tcp', 'TCP', 'Connection-oriented transport protocol that prioritizes reliability and ordered delivery.', 'Service behavior and troubleshooting often depend on TCP state.', 'high', ['networking', 'transport']);
addTerm('udp', 'UDP', 'Connectionless transport protocol optimized for low overhead and speed.', 'Helps explain behavior of DNS, streaming, and real-time services.', 'high', ['networking', 'transport']);
addTerm('port-number', 'Port Number', 'Transport-layer identifier that maps traffic to a specific service.', 'Port mapping is central to firewall rules and service triage.', 'high', ['networking', 'services']);
addTerm('dns', 'DNS', 'Domain Name System that resolves hostnames to IP addresses.', 'Many incidents begin as name-resolution failures.', 'high', ['networking', 'services']);
addTerm('nat', 'NAT', 'Network Address Translation that maps internal addresses to external addresses.', 'Important for internet connectivity and perimeter policy behavior.', 'high', ['networking', 'routing']);
addTerm('three-way-handshake', 'TCP Three-Way Handshake', 'TCP setup sequence using SYN, SYN-ACK, and ACK.', 'Handshake state quickly indicates whether connectivity is actually established.', 'high', ['networking', 'transport']);
addTerm('ssid', 'SSID', 'Wireless network name advertised by an access point.', 'Useful for secure wireless configuration and troubleshooting.', 'medium', ['wireless']);
addTerm('wpa3', 'WPA3', 'Modern Wi-Fi security standard with stronger protections than earlier protocols.', 'Wireless security posture depends on encryption and auth method choice.', 'high', ['wireless', 'security']);
addTerm('soho-router', 'SOHO Router', 'Integrated gateway device common in small office and home networks.', 'Common learning environment for routing, Wi-Fi, and firewall basics.', 'medium', ['networking', 'design']);
addTerm('cloud-service-model', 'Cloud Service Model', 'Service delivery layer such as IaaS, PaaS, or SaaS.', 'Shared-responsibility expectations differ by service model.', 'medium', ['cloud', 'security']);
addTerm('firewall', 'Firewall', 'Control that allows or blocks traffic based on policy rules.', 'Firewall logic is foundational for network defense.', 'high', ['security', 'networking']);
addTerm('network-segmentation', 'Network Segmentation', 'Separation of network zones to reduce lateral movement and contain impact.', 'A practical high-value control for breach prevention.', 'high', ['security', 'networking']);
addTerm('wireshark', 'Wireshark', 'Packet capture and analysis tool for network troubleshooting and investigations.', 'Evidence-based troubleshooting depends on packet visibility.', 'high', ['networking', 'analysis']);
addTerm('pcap', 'PCAP', 'Packet capture file format storing recorded network traffic.', 'PCAP review enables repeatable analysis and collaboration.', 'medium', ['networking', 'analysis']);
addTerm('packet-filter', 'Packet Filter', 'Query expression used to isolate relevant traffic in a capture.', 'Filtering is essential to find useful evidence quickly.', 'high', ['networking', 'analysis']);
addTerm('traceroute', 'Traceroute', 'Diagnostic command that reveals path hops to a destination.', 'Useful for isolating latency and routing path issues.', 'high', ['networking', 'troubleshooting']);
addTerm('ping', 'Ping', 'ICMP-based connectivity test used for basic reachability checks.', 'Fast first-step test for network availability.', 'high', ['networking', 'troubleshooting']);
addTerm('latency', 'Latency', 'Time delay between request and response across a path.', 'High latency affects user experience and service quality.', 'medium', ['networking', 'performance']);
addTerm('http-request', 'HTTP Request', 'Client message sent to a web server for a resource or action.', 'Web troubleshooting requires understanding request flow and headers.', 'high', ['web', 'networking']);
addTerm('dns-resolution', 'DNS Resolution', 'Lookup process translating a hostname to one or more IP addresses.', 'Many web failures are resolution failures, not application bugs.', 'high', ['web', 'networking']);
addTerm('tls-handshake', 'TLS Handshake', 'Cryptographic negotiation that establishes secure session parameters.', 'Critical for secure web traffic and certificate validation.', 'high', ['web', 'crypto']);
addTerm('web-server', 'Web Server', 'Service that hosts and delivers web content over HTTP/HTTPS.', 'Core component in many attack paths and defensive controls.', 'high', ['web', 'infrastructure']);
addTerm('reverse-proxy', 'Reverse Proxy', 'Service that receives client requests and forwards them to backend servers.', 'Improves security posture, routing flexibility, and observability.', 'medium', ['web', 'architecture']);
addTerm('session-token', 'Session Token', 'Identifier that binds a user to an authenticated session.', 'Token handling flaws can lead to account compromise.', 'high', ['web', 'security']);
addTerm('cia-triad', 'CIA Triad', 'Confidentiality, Integrity, and Availability security objective model.', 'Provides common language for security decision trade-offs.', 'high', ['security', 'foundations']);
addTerm('risk', 'Risk', 'Potential for loss when a threat exploits a vulnerability.', 'Risk framing is central to governance and prioritization.', 'high', ['grc', 'foundations']);
addTerm('threat', 'Threat', 'Potential cause of unwanted impact to an asset or process.', 'Threat context helps prioritize defensive controls.', 'high', ['security', 'foundations']);
addTerm('vulnerability', 'Vulnerability', 'Weakness that can be exploited to violate security objectives.', 'Identifying and reducing vulnerabilities lowers attack success probability.', 'high', ['security', 'foundations']);
addTerm('control', 'Control', 'Safeguard that prevents, detects, or corrects security issues.', 'Control design and effectiveness drive program maturity.', 'high', ['grc', 'controls']);
addTerm('security-framework', 'Security Framework', 'Structured reference model such as NIST CSF used to organize security practices.', 'Framework alignment improves consistency and communication.', 'medium', ['grc', 'foundations']);
addTerm('risk-register', 'Risk Register', 'Documented inventory of identified risks, ratings, owners, and treatments.', 'Keeps risk decisions visible and accountable.', 'high', ['grc', 'risk']);
addTerm('likelihood', 'Likelihood', 'Estimated probability that a risk event will occur.', 'Likelihood drives prioritization and treatment urgency.', 'medium', ['grc', 'risk']);
addTerm('impact', 'Impact', 'Estimated consequence if a risk event occurs.', 'Impact helps justify budget and control investments.', 'medium', ['grc', 'risk']);
addTerm('risk-treatment', 'Risk Treatment', 'Chosen approach to address risk: mitigate, transfer, avoid, or accept.', 'Formal treatment decisions support governance accountability.', 'high', ['grc', 'risk']);
addTerm('qualitative-risk', 'Qualitative Risk Analysis', 'Risk assessment using categorical scales like low/medium/high.', 'Useful when exact numerical data is unavailable.', 'medium', ['grc', 'risk']);
addTerm('quantitative-risk', 'Quantitative Risk Analysis', 'Risk assessment using numerical estimates such as expected loss values.', 'Supports cost-benefit comparisons and budget planning.', 'medium', ['grc', 'risk']);
addTerm('intrusion-detection', 'Intrusion Detection', 'Monitoring approach that identifies suspicious or malicious activity.', 'Detection coverage impacts time-to-identify incidents.', 'high', ['security', 'detection']);
addTerm('intrusion-prevention', 'Intrusion Prevention', 'Inline security control that blocks malicious activity in real time.', 'Can reduce attack success when tuned correctly.', 'high', ['security', 'detection']);
addTerm('siem', 'SIEM', 'Security Information and Event Management platform for log analysis and alerting.', 'Central to modern SOC workflows and incident visibility.', 'high', ['security', 'operations']);
addTerm('log-source', 'Log Source', 'System or service that generates telemetry ingested for analysis.', 'Coverage gaps in log sources create blind spots.', 'high', ['security', 'operations']);
addTerm('network-baseline', 'Network Baseline', 'Documented normal traffic behavior used to identify anomalies.', 'Baselines reduce false positives and improve triage quality.', 'medium', ['security', 'detection']);
addTerm('hardening', 'Hardening', 'Process of reducing attack surface through secure configuration.', 'Hardening prevents common misconfiguration-driven incidents.', 'high', ['security', 'operations']);
addTerm('linux-permissions', 'Linux Permissions', 'Read/write/execute access model controlling file and directory operations.', 'Incorrect permissions are frequent security and stability issues.', 'high', ['linux', 'security']);
addTerm('chmod', 'chmod', 'Linux command used to modify file permission bits.', 'Needed for controlled access configuration and scripting.', 'medium', ['linux', 'operations']);
addTerm('chown', 'chown', 'Linux command used to change file owner and group.', 'Ownership control is key to privilege boundaries.', 'medium', ['linux', 'operations']);
addTerm('process', 'Process', 'Running program instance with its own state and resource usage.', 'Process analysis supports both operations and incident response.', 'high', ['linux', 'operations']);
addTerm('systemctl', 'systemctl', 'Command-line utility for managing services in systemd-based Linux systems.', 'Service lifecycle control is essential for server operations.', 'medium', ['linux', 'operations']);
addTerm('cron', 'cron', 'Linux scheduling system for recurring task automation.', 'Scheduled jobs are useful for both maintenance and security automation.', 'medium', ['linux', 'automation']);
addTerm('sql-query', 'SQL Query', 'Structured request to retrieve or manipulate data in a relational database.', 'Security analysts often query logs and event datasets with SQL.', 'high', ['data', 'security']);
addTerm('select-statement', 'SELECT Statement', 'SQL command used to retrieve data from one or more tables.', 'Core building block for evidence extraction.', 'medium', ['data', 'sql']);
addTerm('where-clause', 'WHERE Clause', 'SQL condition that filters returned rows.', 'Filtering precision is critical for accurate analysis.', 'medium', ['data', 'sql']);
addTerm('join', 'JOIN', 'SQL operation that combines related rows across multiple tables.', 'Analysts use joins to correlate events across sources.', 'medium', ['data', 'sql']);
addTerm('input-validation', 'Input Validation', 'Process of checking user input for format, length, and allowed values.', 'Poor validation is a common entry point for attacks.', 'high', ['appsec']);
addTerm('sql-injection', 'SQL Injection', 'Attack that manipulates SQL queries through untrusted input.', 'High-impact vulnerability category in web applications.', 'high', ['appsec', 'threats']);
addTerm('asset-inventory', 'Asset Inventory', 'Structured list of hardware, software, and data assets in scope.', 'You cannot defend assets you cannot identify.', 'high', ['grc', 'operations']);
addTerm('data-classification', 'Data Classification', 'Labeling data by sensitivity and handling requirements.', 'Drives control selection, access policy, and retention rules.', 'high', ['grc', 'data']);
addTerm('threat-model', 'Threat Model', 'Structured analysis of potential attackers, paths, and control gaps.', 'Improves proactive risk reduction before incidents occur.', 'high', ['security', 'analysis']);
addTerm('attack-vector', 'Attack Vector', 'Path or method used by an attacker to reach a target.', 'Understanding vectors helps prioritize defensive controls.', 'high', ['security', 'threats']);
addTerm('vulnerability-scan', 'Vulnerability Scan', 'Automated assessment for known weaknesses in systems and software.', 'Scanning provides repeatable visibility into technical exposure.', 'high', ['security', 'operations']);
addTerm('cvss', 'CVSS', 'Common Vulnerability Scoring System for rating vulnerability severity.', 'Standardized scoring supports triage consistency.', 'high', ['security', 'risk']);
addTerm('mitigation', 'Mitigation', 'Action that lowers likelihood or impact of a risk.', 'Risk reduction planning depends on practical mitigation options.', 'high', ['grc', 'risk']);
addTerm('exploit', 'Exploit', 'Code or technique that takes advantage of a vulnerability.', 'Exploitability informs urgency and response strategy.', 'high', ['security', 'threats']);
addTerm('compensating-control', 'Compensating Control', 'Alternative safeguard used when a primary control is not feasible.', 'Maintains risk reduction while constraints are resolved.', 'medium', ['grc', 'controls']);
addTerm('residual-risk', 'Residual Risk', 'Risk that remains after controls are implemented.', 'Residual risk visibility supports informed acceptance decisions.', 'high', ['grc', 'risk']);
addTerm('exposure', 'Exposure', 'Degree to which assets are reachable or vulnerable to threat activity.', 'Exposure analysis improves prioritization of remediation.', 'medium', ['security', 'risk']);
addTerm('threat-intelligence', 'Threat Intelligence', 'Contextual information about threat actors, tactics, and indicators.', 'Improves detection tuning and proactive defense decisions.', 'medium', ['security', 'detection']);
addTerm('alert-triage', 'Alert Triage', 'Initial analysis process that validates and prioritizes alerts.', 'Triage quality determines response speed and analyst workload.', 'high', ['soc', 'operations']);
addTerm('false-positive', 'False Positive', 'Alert that appears malicious but is benign after investigation.', 'Reducing false positives improves SOC efficiency and trust.', 'high', ['soc', 'operations']);
addTerm('ioc', 'Indicator of Compromise', 'Observable evidence suggesting malicious activity occurred.', 'IOCs accelerate detection and scoping workflows.', 'high', ['soc', 'detection']);
addTerm('incident-severity', 'Incident Severity', 'Impact-based classification used to prioritize incident response.', 'Severity ratings align communication and escalation expectations.', 'high', ['soc', 'response']);
addTerm('containment', 'Containment', 'Response action that limits incident spread and immediate damage.', 'Rapid containment reduces business impact.', 'high', ['soc', 'response']);
addTerm('eradication', 'Eradication', 'Removal of attacker presence, malicious artifacts, and root causes.', 'Ensures incidents do not rapidly recur.', 'high', ['soc', 'response']);
addTerm('recovery', 'Recovery', 'Restoration of normal operations after incident containment and eradication.', 'Recovery planning protects service availability and trust.', 'high', ['soc', 'response']);
addTerm('playbook', 'Playbook', 'Documented response workflow for recurring security scenarios.', 'Playbooks improve consistency under pressure.', 'high', ['soc', 'response']);
addTerm('escalation-path', 'Escalation Path', 'Defined process for raising incidents to appropriate teams and leadership.', 'Prevents delays when critical decisions are required.', 'high', ['soc', 'response']);
addTerm('case-management', 'Case Management', 'Tracking and coordination of investigation tasks, evidence, and decisions.', 'Supports accountability and post-incident review.', 'medium', ['soc', 'operations']);
addTerm('timeline-analysis', 'Timeline Analysis', 'Reconstruction of incident events in chronological order.', 'Clarifies scope, root cause, and control gaps.', 'high', ['soc', 'forensics']);
addTerm('post-incident-review', 'Post-Incident Review', 'Structured retrospective focused on lessons and control improvements.', 'Transforms incidents into measurable security improvement.', 'high', ['soc', 'improvement']);
addTerm('python-script', 'Python Script', 'Executable Python code used to automate repetitive tasks.', 'Automation saves analyst time and reduces manual errors.', 'high', ['automation', 'python']);
addTerm('variable', 'Variable', 'Named value container used in programming logic.', 'Core building block for reliable scripts.', 'medium', ['automation', 'python']);
addTerm('function', 'Function', 'Reusable block of code that performs a defined task.', 'Functions improve script structure and maintainability.', 'medium', ['automation', 'python']);
addTerm('loop', 'Loop', 'Programming control structure that repeats actions over data or conditions.', 'Loops enable scalable automation workflows.', 'medium', ['automation', 'python']);
addTerm('conditional', 'Conditional', 'Logic branch that executes code based on true/false evaluation.', 'Conditionals support decision-driven automation.', 'medium', ['automation', 'python']);
addTerm('error-handling', 'Error Handling', 'Code pattern that captures and responds to runtime failures safely.', 'Reliable scripts must fail gracefully and report issues clearly.', 'high', ['automation', 'python']);
addTerm('api', 'API', 'Application Programming Interface used to exchange data between systems.', 'Security workflows increasingly depend on API-driven tooling.', 'high', ['automation', 'integration']);
addTerm('http-method', 'HTTP Method', 'Action verb in HTTP such as GET, POST, PUT, or DELETE.', 'Method semantics matter for API security and troubleshooting.', 'medium', ['web', 'api']);
addTerm('automation-playbook', 'Automation Playbook', 'Defined sequence of automated actions for a repeatable security task.', 'Enables consistent execution and easier quality control.', 'medium', ['automation', 'operations']);
addTerm('regex', 'Regular Expression', 'Pattern syntax used to match and extract structured text.', 'Useful for parsing logs and enforcing data quality checks.', 'high', ['automation', 'analysis']);
addTerm('file-parsing', 'File Parsing', 'Reading structured or semi-structured files into usable data.', 'Essential for automating log and report processing.', 'medium', ['automation', 'analysis']);
addTerm('version-control', 'Version Control', 'System for tracking code changes and collaboration history.', 'Protects script quality and supports rollback during failures.', 'high', ['automation', 'engineering']);
addTerm('resume-tailoring', 'Resume Tailoring', 'Adjusting resume content to align with a specific role.', 'Improves recruiter signal quality for targeted applications.', 'medium', ['career']);
addTerm('star-method', 'STAR Method', 'Interview storytelling format: Situation, Task, Action, Result.', 'Helps communicate impact clearly during interviews.', 'medium', ['career']);
addTerm('elevator-pitch', 'Elevator Pitch', 'Short professional summary of value, direction, and goals.', 'Useful in networking and screening conversations.', 'medium', ['career']);
addTerm('portfolio-artifact', 'Portfolio Artifact', 'Concrete evidence of work quality such as write-ups, diagrams, or labs.', 'Proof-of-work strengthens credibility beyond certificates.', 'high', ['career', 'portfolio']);
addTerm('interview-question', 'Interview Question Drill', 'Structured practice of common technical and behavioral interview prompts.', 'Improves response clarity and confidence under pressure.', 'medium', ['career']);
addTerm('career-story', 'Career Story', 'Narrative linking background, skills, and target role trajectory.', 'Helps employers quickly understand fit and intent.', 'medium', ['career']);
addTerm('linkedin-profile', 'LinkedIn Profile', 'Professional public profile highlighting role alignment and proof-of-work.', 'Improves discoverability and recruiter engagement.', 'medium', ['career']);
addTerm('networking-outreach', 'Networking Outreach', 'Intentional communication with peers, mentors, and hiring contacts.', 'Expands opportunities and practical feedback loops.', 'medium', ['career']);
addTerm('job-tracker', 'Job Tracker', 'System for managing applications, follow-ups, and interview stages.', 'Prevents dropped opportunities and supports iteration.', 'medium', ['career']);
addTerm('keyword-optimization', 'Keyword Optimization', 'Aligning profile and resume terms with job descriptions and ATS logic.', 'Improves match rates in automated screening.', 'medium', ['career']);
addTerm('application-funnel', 'Application Funnel', 'Measurement view of applications from submit to offer stages.', 'Funnel metrics reveal where to improve process effectiveness.', 'medium', ['career']);
addTerm('ai-assistant-guardrails', 'AI Assistant Guardrails', 'Rules that keep AI-supported job-search outputs accurate and authentic.', 'Prevents low-quality or misleading application materials.', 'medium', ['career', 'ai']);
addTerm('identity', 'Identity', 'Digital representation of a user, service, or device in an access system.', 'Identity quality underpins all access control decisions.', 'high', ['iam']);
addTerm('authentication', 'Authentication', 'Process of verifying claimed identity.', 'Strong authentication is foundational to account security.', 'high', ['iam']);
addTerm('authorization', 'Authorization', 'Process of granting permitted actions to an authenticated identity.', 'Authorization errors lead directly to over-privileged access.', 'high', ['iam']);
addTerm('accounting', 'Accounting (AAA)', 'Tracking and logging of identity actions for accountability.', 'Supports audits, investigations, and policy enforcement.', 'medium', ['iam']);
addTerm('hashing', 'Hashing', 'One-way transformation of data into a fixed-length digest.', 'Used for integrity checks and secure credential storage workflows.', 'high', ['crypto']);
addTerm('encryption', 'Encryption', 'Reversible transformation that protects confidentiality with keys.', 'Critical for data protection in transit and at rest.', 'high', ['crypto']);
addTerm('reconnaissance', 'Reconnaissance', 'Information-gathering phase used by attackers before exploitation.', 'Understanding recon helps defenders reduce exposed intelligence.', 'high', ['threats']);
addTerm('enumeration', 'Enumeration', 'Active discovery of services, accounts, or resources on a target.', 'Enumeration artifacts are key early-stage detection signals.', 'high', ['threats']);
addTerm('privilege-escalation', 'Privilege Escalation', 'Technique for gaining higher permissions than initially granted.', 'Major step in many successful attack chains.', 'high', ['threats']);
addTerm('defense-in-depth', 'Defense in Depth', 'Layered control strategy so one failed safeguard does not cause total failure.', 'Improves resilience against diverse attack techniques.', 'high', ['security', 'controls']);
addTerm('incident-journal', 'Incident Journal', 'Structured notes capturing incident observations, decisions, and rationale.', 'Improves learning transfer and reporting quality.', 'medium', ['soc', 'documentation']);
addTerm('control-recommendation', 'Control Recommendation', 'Actionable proposal to improve prevention, detection, or response capability.', 'Connects analysis work to business-facing improvement outcomes.', 'high', ['grc', 'controls']);
addTerm('incident-command', 'Incident Command', 'Leadership structure coordinating decisions and responsibilities during incidents.', 'Clarifies ownership and communication under pressure.', 'high', ['response', 'governance']);
addTerm('maturity-model', 'Maturity Model', 'Framework used to assess current capability level and improvement targets.', 'Guides staged security program growth.', 'medium', ['governance']);
addTerm('communication-plan', 'Communication Plan', 'Documented messaging protocol for stakeholders during security events.', 'Reduces confusion and protects trust during incidents.', 'high', ['response', 'governance']);
addTerm('evidence-handling', 'Evidence Handling', 'Process for collecting and preserving evidence with integrity.', 'Poor handling can invalidate investigations and legal processes.', 'high', ['forensics']);
addTerm('tabletop-exercise', 'Tabletop Exercise', 'Scenario-based drill used to test readiness and coordination.', 'Reveals process gaps before real incidents occur.', 'high', ['response', 'training']);
addTerm('critical-infrastructure', 'Critical Infrastructure', 'Systems essential to societal and economic stability.', 'Security failures in critical sectors have outsized impact.', 'high', ['grc', 'risk']);
addTerm('business-impact-analysis', 'Business Impact Analysis', 'Process for identifying operational effects of disruption over time.', 'Supports recovery priorities and resilience planning.', 'high', ['grc', 'resilience']);
addTerm('governance', 'Governance', 'Decision framework defining accountability, policy, and oversight.', 'Strong governance aligns security with business goals.', 'high', ['grc']);
addTerm('compliance', 'Compliance', 'Conformance to laws, regulations, standards, or internal policies.', 'Noncompliance creates legal and financial risk.', 'high', ['grc']);
addTerm('risk-assessment', 'Risk Assessment', 'Structured evaluation of risk likelihood, impact, and treatment options.', 'Core process for defensible prioritization.', 'high', ['grc', 'risk']);
addTerm('vendor-risk', 'Vendor Risk', 'Risk introduced by third-party suppliers and service providers.', 'Third-party exposure is a common breach path.', 'high', ['grc', 'third-party']);
addTerm('soc-workflow', 'SOC Workflow', 'End-to-end process from alert intake to closure and lessons learned.', 'Workflow clarity improves speed and consistency.', 'high', ['soc']);
addTerm('forensic-imaging', 'Forensic Imaging', 'Bit-level copy of media created for evidence analysis.', 'Preserves original evidence while enabling investigation.', 'high', ['forensics']);
addTerm('chain-of-custody', 'Chain of Custody', 'Record of who handled evidence, when, and why.', 'Maintains evidence integrity for legal and audit scrutiny.', 'high', ['forensics']);
addTerm('log-correlation', 'Log Correlation', 'Linking events from multiple sources to reveal meaningful patterns.', 'Essential for incident scoping and root cause analysis.', 'high', ['soc', 'analysis']);
addTerm('detection-rule', 'Detection Rule', 'Logic used by monitoring systems to trigger alerts.', 'Rule quality drives true-positive rates and analyst efficiency.', 'high', ['soc', 'detection']);
addTerm('triage-queue', 'Triage Queue', 'Ordered list of alerts or cases awaiting analyst review.', 'Queue discipline improves SLA performance and risk handling.', 'medium', ['soc', 'operations']);
addTerm('executive-briefing', 'Executive Briefing', 'Concise leadership-facing summary of risk, impact, and recommended action.', 'Translates technical detail into decision-ready language.', 'high', ['communication']);
addTerm('management-summary', 'Management Summary', 'Non-technical overview focused on business impact and decisions needed.', 'Improves alignment between technical teams and leadership.', 'high', ['communication']);
addTerm('artifact-curation', 'Artifact Curation', 'Selecting and organizing portfolio evidence for clear storytelling.', 'Improves employer evaluation of skills and consistency.', 'medium', ['portfolio']);
addTerm('roadmap-prioritization', 'Roadmap Prioritization', 'Choosing next learning or capability steps based on impact and constraints.', 'Prevents random effort and supports sustained progress.', 'medium', ['planning']);
addTerm('capability-gap', 'Capability Gap', 'Difference between current skills/process maturity and target state.', 'Gap visibility informs practical upskilling plans.', 'medium', ['planning']);
addTerm('continuous-improvement', 'Continuous Improvement', 'Ongoing cycle of measuring outcomes and refining process.', 'Critical for long-term security program effectiveness.', 'high', ['planning']);
addTerm('spaced-repetition', 'Spaced Repetition', 'Review technique that revisits material at increasing intervals.', 'Improves long-term retention for exam and operational recall.', 'medium', ['study']);
addTerm('retrieval-practice', 'Retrieval Practice', 'Actively recalling information without notes to strengthen memory.', 'Builds durable understanding faster than passive rereading.', 'medium', ['study']);
addTerm('mock-exam', 'Mock Exam', 'Practice test used to simulate exam conditions and identify weak areas.', 'Guides final revision priorities.', 'medium', ['study']);
addTerm('error-log', 'Error Log', 'Structured list of mistakes, misconceptions, and corrective notes.', 'Turns repeated errors into targeted improvement actions.', 'medium', ['study']);
addTerm('knowledge-gap', 'Knowledge Gap', 'Specific topic where understanding is currently insufficient.', 'Gap tracking keeps review focused and measurable.', 'medium', ['study']);
addTerm('study-system-reset', 'Study-System Reset', 'Planned refinement of schedule, methods, and tooling after review.', 'Helps sustain momentum beyond initial roadmap completion.', 'medium', ['study']);

const titleCase = (id) =>
  id
    .split('-')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');

const fallbackTerm = (id) => {
  const term = titleCase(id);
  return {
    id,
    term,
    definition: `${term} is a core concept in this cybersecurity roadmap.`,
    why_it_matters: `Understanding ${term} improves exam readiness and practical decision-making during labs or troubleshooting.`,
    exam_relevance: 'medium',
    tags: ['roadmap']
  };
};

const allTermIds = [...new Set(Object.values(WEEK_TERM_IDS).flat())];
const missingTermIds = allTermIds.filter((id) => !manualTerms.has(id));
for (const id of missingTermIds) {
  manualTerms.set(id, fallbackTerm(id));
}

const termRefs = new Map(
  allTermIds.map((id) => [
    id,
    {
      phases: new Set(),
      weeks: new Set(),
      days: new Set(),
      resourceRefs: new Set(),
      related: new Set()
    }
  ])
);

const flashcardRefs = new Map();
const flashcards = [];
const reviewDecks = [];
const securityJournalPrompts = [];
const weeks = [];
const days = [];
const portfolioOutputs = [];

const parseBoolean = (value) => String(value || '').trim().toLowerCase() === 'yes';
const parseTaskTags = (value) =>
  String(value || '')
    .split('+')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

const dayGlossaryIndexMap = {
  1: [0, 1, 2, 3, 4],
  2: [1, 2, 3, 4, 5],
  3: [0, 2, 3, 4, 5],
  4: [0, 1, 3, 4, 5],
  5: [0, 1, 2, 4, 5]
};

const dayFlashcardIndexMap = {
  1: [0, 1, 2, 3, 6, 7],
  2: [1, 2, 3, 4, 6, 8],
  3: [0, 2, 4, 5, 7, 8],
  4: [0, 1, 3, 5, 6, 8],
  5: [2, 3, 4, 5, 7, 8]
};

for (const weekSource of source.weeks) {
  const weekNumber = Number(weekSource.week);
  const weekId = toWeekId(weekNumber);
  const phaseRef = toPhaseRef(weekSource.phase);
  const weekPage = weekPageByWeek.get(weekNumber) || {};
  const checkpoint =
    workbook?.checkpoints_by_week?.[weekId] ||
    weekPage.portfolio_angle ||
    weekSource.days.find((day) => day.session_type === 'Review')?.deliverable_or_checkpoint ||
    '';

  const weekSlug = String(weekPage.slug || `/weeks/${weekId}/`).replace(/\/+$/, '/');
  const weekTermIds = WEEK_TERM_IDS[weekNumber];

  if (!weekTermIds) {
    throw new Error(`Missing term mapping for week ${weekNumber}`);
  }

  const weekFlashcards = [];
  for (let i = 0; i < weekTermIds.length; i += 1) {
    const termId = weekTermIds[i];
    const termEntry = manualTerms.get(termId);
    const cardId = `fc-${weekId}-${String(i + 1).padStart(2, '0')}`;
    const card = {
      id: cardId,
      question: `Define ${termEntry.term} and explain its role in Week ${String(weekNumber).padStart(2, '0')}.`,
      answer: `${termEntry.term}: ${termEntry.definition}`,
      card_type: 'definition',
      difficulty: i < 2 ? 'easy' : 'medium',
      exam_relevance: termEntry.exam_relevance,
      tags: [...new Set([phaseRef, weekId, ...termEntry.tags])],
      phase_refs: [phaseRef],
      week_refs: [weekNumber],
      day_refs: []
    };

    flashcards.push(card);
    weekFlashcards.push(card);
    flashcardRefs.set(cardId, {
      phases: new Set([phaseRef]),
      weeks: new Set([weekNumber]),
      days: new Set()
    });
  }

  const termA = manualTerms.get(weekTermIds[0]);
  const termB = manualTerms.get(weekTermIds[1]);
  const termC = manualTerms.get(weekTermIds[2]);

  const comparisonCard = {
    id: `fc-${weekId}-07`,
    question: `How do ${termA.term} and ${termB.term} differ in practical troubleshooting or analysis?`,
    answer: `${termA.term} and ${termB.term} solve different problems. Use each based on the specific failure point, and document why that distinction affects your next action.`,
    card_type: 'comparison',
    difficulty: 'medium',
    exam_relevance: 'high',
    tags: [phaseRef, weekId, 'comparison'],
    phase_refs: [phaseRef],
    week_refs: [weekNumber],
    day_refs: []
  };

  const applicationCard = {
    id: `fc-${weekId}-08`,
    question: `You are executing this week's focus: "${weekSource.weekly_focus}". Which concept should you verify early, and why?`,
    answer: `Start with ${termC.term}. ${termC.why_it_matters} This keeps your workflow aligned with the weekly checkpoint.`,
    card_type: 'application',
    difficulty: 'medium',
    exam_relevance: 'high',
    tags: [phaseRef, weekId, 'application'],
    phase_refs: [phaseRef],
    week_refs: [weekNumber],
    day_refs: []
  };

  const mgmtOrTroubleType = weekNumber >= 13 ? 'management' : 'troubleshooting';
  const mgmtOrTroubleCard = {
    id: `fc-${weekId}-09`,
    question: `What is the expected outcome for Week ${String(weekNumber).padStart(2, '0')}?`,
    answer: `Checkpoint: ${checkpoint || weekSource.deliverable}. Use your deliverable to prove the outcome and record one improvement for next week.`,
    card_type: mgmtOrTroubleType,
    difficulty: 'medium',
    exam_relevance: 'medium',
    tags: [phaseRef, weekId, mgmtOrTroubleType],
    phase_refs: [phaseRef],
    week_refs: [weekNumber],
    day_refs: []
  };

  flashcards.push(comparisonCard, applicationCard, mgmtOrTroubleCard);
  weekFlashcards.push(comparisonCard, applicationCard, mgmtOrTroubleCard);

  flashcardRefs.set(comparisonCard.id, {
    phases: new Set([phaseRef]),
    weeks: new Set([weekNumber]),
    days: new Set()
  });
  flashcardRefs.set(applicationCard.id, {
    phases: new Set([phaseRef]),
    weeks: new Set([weekNumber]),
    days: new Set()
  });
  flashcardRefs.set(mgmtOrTroubleCard.id, {
    phases: new Set([phaseRef]),
    weeks: new Set([weekNumber]),
    days: new Set()
  });

  const weekDays = [];

  for (const daySource of weekSource.days) {
    const dayNumber = Number(daySource.day);
    const dayId = toDayId(weekNumber, dayNumber);
    const isReview = daySource.session_type === 'Review';
    const isRest = daySource.session_type === 'Rest';

    let supportResource = daySource.support_resource ?? '';
    let supportUrl = daySource.support_url ?? '';

    if (weekNumber === 1 && WEEK_1_SUPPORT_FIX[dayNumber]) {
      supportResource = WEEK_1_SUPPORT_FIX[dayNumber].support_resource;
      supportUrl = WEEK_1_SUPPORT_FIX[dayNumber].support_url;
    }

    if (isRest) {
      supportResource = '';
      supportUrl = '';
    }

    const glossaryIds = isRest
      ? []
      : isReview
        ? [...weekTermIds]
        : dayGlossaryIndexMap[dayNumber]
          .filter((index) => index < weekTermIds.length)
          .map((index) => weekTermIds[index]);

    const flashcardIds = isRest
      ? []
      : isReview
        ? weekFlashcards.map((card) => card.id)
        : dayFlashcardIndexMap[dayNumber]
          .filter((index) => index < weekFlashcards.length)
          .map((index) => weekFlashcards[index].id);

    for (const termId of glossaryIds) {
      const refs = termRefs.get(termId);
      refs.phases.add(phaseRef);
      refs.weeks.add(weekNumber);
      refs.days.add(dayId);
      if (daySource.primary_resource) refs.resourceRefs.add(daySource.primary_resource);
      for (const relatedId of weekTermIds) {
        if (relatedId !== termId) refs.related.add(relatedId);
      }
    }

    for (const cardId of flashcardIds) {
      const refs = flashcardRefs.get(cardId);
      refs.days.add(dayId);
    }

    const checkpointText =
      daySource.deliverable_or_checkpoint || (isReview ? `Weekly recap toward: ${checkpoint}` : weekSource.deliverable);

    const day = {
      id: dayId,
      week: weekNumber,
      day: dayNumber,
      slug: dayId,
      phase: weekSource.phase,
      phase_ref: phaseRef,
      label: daySource.label,
      session_type: daySource.session_type,
      hours: Number(daySource.hours) || 0,
      session_objective: daySource.session_objective,
      suggested_split: daySource.suggested_split,
      todo: String(daySource.todo || '')
        .split(/\s*;\s*|\s*\.\s*/)
        .map((item) => item.trim())
        .filter(Boolean),
      deliverable_or_checkpoint: daySource.deliverable_or_checkpoint,
      journal_prompt: daySource.journal_prompt,
      primary_resource: daySource.primary_resource || weekSource.primary_resource || '',
      primary_url: daySource.primary_url || weekSource.primary_url || '',
      support_resource: supportResource,
      support_url: supportUrl,
      task_mode_tags: parseTaskTags(daySource.task_mode_tags),
      laptop_needed: String(daySource.laptop_needed || '').toLowerCase(),
      video: parseBoolean(daySource.video),
      reading: parseBoolean(daySource.reading),
      hands_on: parseBoolean(daySource.hands_on),
      writing_portfolio: parseBoolean(daySource.writing_portfolio),
      glossary_ids: glossaryIds,
      flashcard_ids: flashcardIds,
      checkpoint: checkpointText,
      weekly_deliverable: weekSource.deliverable,
      portfolio_output_prompt:
        weekPage.what_to_publish ||
        `Publish this week's artifact (${weekSource.deliverable}) with one reflection on what improved.`
    };

    days.push(day);
    weekDays.push(dayId);
  }

  const week = {
    id: weekId,
    week: weekNumber,
    slug: weekSlug,
    phase: weekSource.phase,
    phase_ref: phaseRef,
    weekly_focus: weekSource.weekly_focus,
    deliverable: weekSource.deliverable,
    checkpoint,
    primary_resource: weekSource.primary_resource,
    primary_url: weekSource.primary_url,
    support_resource:
      weekNumber === 1 ? 'Week-specific support resources mapped per day (Week 1 correction).' : weekSource.support_resource,
    support_url: weekNumber === 1 ? '' : weekSource.support_url,
    day_ids: weekDays,
    review_day_id: toDayId(weekNumber, 6),
    glossary_ids: [...weekTermIds],
    flashcard_ids: weekFlashcards.map((card) => card.id)
  };

  weeks.push(week);

  reviewDecks.push({
    id: `review-deck-${weekId}`,
    week: weekNumber,
    week_id: weekId,
    day_id: toDayId(weekNumber, 6),
    title: `Week ${String(weekNumber).padStart(2, '0')} Review Deck`,
    description: `Aggregated weekly review deck for ${weekSource.weekly_focus}.`,
    glossary_ids: [...weekTermIds],
    flashcard_ids: weekFlashcards.map((card) => card.id)
  });

  portfolioOutputs.push({
    id: `portfolio-output-${weekId}`,
    week: weekNumber,
    week_id: weekId,
    slug: weekSlug,
    title: weekPage.page_title || `Week ${String(weekNumber).padStart(2, '0')} Output`,
    what_to_publish: weekPage.what_to_publish || weekSource.deliverable,
    evidence_assets: weekPage.evidence_assets || '',
    publish_when: weekPage.publish_when || '',
    portfolio_angle: weekPage.portfolio_angle || checkpoint
  });

  securityJournalPrompts.push({
    id: `sj-${weekId}`,
    week: weekNumber,
    phase: weekSource.phase,
    phase_ref: phaseRef,
    title: `Week ${String(weekNumber).padStart(2, '0')}: Incident Thinking Prompt`,
    prompt: `Use this week's focus ("${weekSource.weekly_focus}") to analyze one real or simulated security scenario. Summarize impact, likely root cause, and one control improvement.`,
    template: {
      source: 'Source URL, report, lab, or scenario name',
      technical_summary: 'What happened technically in 3-5 bullet points?',
      management_summary: 'How would you explain impact and priority to leadership?',
      prevention_ideas: 'List two controls or process changes that would reduce recurrence.',
      next_step: 'What skill or evidence will you practice next?'
    },
    tags: [phaseRef, weekId]
  });
}

const glossary = allTermIds
  .map((termId) => {
    const base = manualTerms.get(termId);
    const refs = termRefs.get(termId);

    return {
      id: termId,
      term: base.term,
      definition: base.definition,
      why_it_matters: base.why_it_matters,
      exam_relevance: base.exam_relevance,
      tags: base.tags,
      related_terms: [...refs.related].slice(0, 6),
      phase_refs: [...refs.phases].sort(),
      week_refs: [...refs.weeks].sort((a, b) => a - b),
      day_refs: [...refs.days].sort(),
      resource_refs: [...refs.resourceRefs].slice(0, 6)
    };
  })
  .sort((a, b) => a.term.localeCompare(b.term));

const normalizedFlashcards = flashcards
  .map((card) => {
    const refs = flashcardRefs.get(card.id);
    return {
      ...card,
      phase_refs: [...refs.phases].sort(),
      week_refs: [...refs.weeks].sort((a, b) => a - b),
      day_refs: [...refs.days].sort()
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const canonicalSite = {
  title: source.site?.title || 'Cybersecurity Study Companion',
  subtitle: source.site?.subtitle || '32-week roadmap and portfolio study system',
  description:
    source.site?.description ||
    'Static cybersecurity roadmap with day-level tasks, glossary, flashcards, progress tracking, and local notes tool.',
  version: 'v2-static-content'
};

const corePages = (source.core_pages || []).map((page) => ({ ...page }));

const resources = (source.resources || []).map((resource) => ({
  id: slugify(resource.resource),
  category: resource.category,
  resource: resource.resource,
  use_case: resource.use_it_for,
  best_weeks: resource.best_weeks,
  url: resource.url,
  notes: resource.notes
}));

const contentModel = {
  site: canonicalSite,
  core_pages: corePages,
  resources,
  weeks,
  days,
  security_journal_prompts: securityJournalPrompts,
  portfolio_outputs: portfolioOutputs,
  review_decks: reviewDecks,
  metadata: {
    generated_at: new Date().toISOString(),
    source_files: [
      'cybersecurity_study_companion_data.json',
      'src/data/workbook-enrichment.json'
    ],
    assumptions: [
      'Week1 support-resource correction applied from prompt guidance because week1_support_fixed files were not available in repository.',
      'Canonical glossary and flashcards are precomputed static datasets mapped by day ID.',
      'Review days aggregate each week\'s review deck; rest days have no required new glossary or flashcards.'
    ]
  }
};

const outputDir = path.join(root, 'src/data/content');
fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'study-companion-v2.json'), `${JSON.stringify(contentModel, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, 'glossary.json'), `${JSON.stringify(glossary, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, 'flashcards.json'), `${JSON.stringify(normalizedFlashcards, null, 2)}\n`);

console.log('Generated content files:');
console.log(`- ${path.relative(root, path.join(outputDir, 'study-companion-v2.json'))}`);
console.log(`- ${path.relative(root, path.join(outputDir, 'glossary.json'))}`);
console.log(`- ${path.relative(root, path.join(outputDir, 'flashcards.json'))}`);
console.log(`Glossary entries: ${glossary.length}`);
console.log(`Flashcards: ${normalizedFlashcards.length}`);
console.log(`Days: ${days.length}`);
console.log(`Weeks: ${weeks.length}`);
console.log(`Fallback glossary entries auto-generated: ${missingTermIds.length}`);
