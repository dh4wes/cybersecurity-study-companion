# Glossary and Flashcard Overhaul Report

Date: 2026-03-08

This report captures the pre-change audit required before editing the canonical content data.

## A. Coverage Audit by Week

Format:
- Current glossary IDs: the terms currently assigned to the week.
- Candidate terms from syllabus: terms explicitly or strongly implied by the week focus, deliverable, checkpoint, daily tasks, and named resources.
- Missing concepts: candidate terms not adequately covered by the current week glossary set.

### Week 01
- Current glossary IDs: `cpu`, `ram`, `storage-drive`, `motherboard`, `bios`, `boot-process`
- Candidate terms from syllabus: CPU, CPU cache, RAM, storage drive, motherboard, chipset, PCIe / expansion bus, PSU, cooling / thermal management, BIOS / UEFI, POST, bootloader, boot process, `msinfo32`
- Missing concepts: `cpu-cache`, `chipset`, `pcie`, `psu`, `cooling`, `post`, `bootloader`

### Week 02
- Current glossary IDs: `mobile-device`, `wifi-standard`, `ip-address`, `virtual-machine`, `hypervisor`, `dhcp`
- Candidate terms from syllabus: mobile device, laptop, docking station, modem, router, switch, access point, printer, Wi-Fi standard, IP address, DHCP, VirtualBox, virtual machine, hypervisor, cloud service model
- Missing concepts: `laptop`, `docking-station`, `modem`, `access-point`, `printer`, `virtualbox`, `cloud-service-model`

### Week 03
- Current glossary IDs: `operating-system`, `filesystem`, `ntfs`, `command-line`, `powershell`, `service-management`
- Candidate terms from syllabus: operating system, filesystem, NTFS, partition, boot media, upgrade path, permissions, command line, PowerShell, service management, package manager
- Missing concepts: `partition`, `boot-media`, `upgrade-path`, `permissions`, `package-manager`

### Week 04
- Current glossary IDs: `malware`, `mfa`, `least-privilege`, `troubleshooting-method`, `patch-management`, `social-engineering`
- Candidate terms from syllabus: malware, authentication, MFA, least privilege, patch management, ticketing, documentation, change management, troubleshooting methodology, social engineering, playbook
- Missing concepts: `authentication`, `ticketing`, `documentation`, `change-management`, `playbook`

### Week 05
- Current glossary IDs: `linux-kernel`, `shell`, `sudo`, `package-manager`, `virtualbox`, `ssh`
- Candidate terms from syllabus: Linux kernel, shell, command line, paths, permissions, sudo, package manager, process, virtual machine, VirtualBox, SSH, users and groups
- Missing concepts: `command-line`, `linux-permissions`, `process`, `virtual-machine`, `users-and-groups`

### Week 06
- Current glossary IDs: `osi-model`, `tcp-ip-model`, `ethernet-frame`, `mac-address`, `switch`, `network-topology`
- Candidate terms from syllabus: LAN, WAN, OSI model, TCP/IP model, Ethernet frame, MAC address, network topology, switch, router, access point, firewall, network media / cabling
- Missing concepts: `lan`, `wan`, `router`, `access-point`, `firewall`, `network-media`

### Week 07
- Current glossary IDs: `switch`, `vlan`, `stp`, `router`, `default-gateway`, `routing-table`
- Candidate terms from syllabus: Ethernet frame, MAC address, switch, ARP, broadcast domain, VLAN, STP, router, default gateway, routing table, network CLI
- Missing concepts: `arp`, `broadcast-domain`, `network-cli`

### Week 08
- Current glossary IDs: `ipv4`, `cidr`, `subnet-mask`, `private-ip`, `public-ip`, `subnetting`
- Candidate terms from syllabus: IPv4, CIDR, subnet mask, network ID, host range, broadcast address, private IP, public IP, subnetting, address plan, default gateway
- Missing concepts: `network-id`, `host-range`, `broadcast-address`, `address-plan`

### Week 09
- Current glossary IDs: `tcp`, `udp`, `port-number`, `dns`, `nat`, `three-way-handshake`
- Candidate terms from syllabus: TCP, UDP, port number, DNS, DHCP, NAT, NTP, TCP three-way handshake, DNS resolution, service flow
- Missing concepts: `dhcp`, `ntp`, `dns-resolution`

### Week 10
- Current glossary IDs: `ssid`, `wpa3`, `soho-router`, `cloud-service-model`, `firewall`, `network-segmentation`
- Candidate terms from syllabus: SSID, Wi-Fi standard, WPA3, access point, SOHO router, firewall, network segmentation, VPN, cloud service model, shared responsibility, Wireshark
- Missing concepts: `wifi-standard`, `access-point`, `vpn`, `shared-responsibility`, `wireshark`

### Week 11
- Current glossary IDs: `wireshark`, `pcap`, `packet-filter`, `traceroute`, `ping`, `latency`
- Candidate terms from syllabus: Wireshark, packet capture, PCAP, packet filter, stream following, conversations, endpoints, ping, traceroute, latency, ICMP, DNS, HTTP
- Missing concepts: `packet-capture`, `stream-follow`, `conversation-view`, `endpoint-view`

### Week 12
- Current glossary IDs: `http-request`, `dns-resolution`, `tls-handshake`, `web-server`, `reverse-proxy`, `session-token`
- Candidate terms from syllabus: HTTP request, DNS resolution, TLS handshake, web server, reverse proxy, session token, browser, page rendering, certificate, attack surface
- Missing concepts: `browser`, `page-rendering`, `certificate`

### Week 13
- Current glossary IDs: `cia-triad`, `risk`, `threat`, `vulnerability`, `control`, `security-framework`
- Candidate terms from syllabus: CIA triad, risk, threat, vulnerability, control, security framework, asset, attack surface
- Missing concepts: `asset`, `attack-surface`

### Week 14
- Current glossary IDs: `risk-register`, `likelihood`, `impact`, `risk-treatment`, `qualitative-risk`, `quantitative-risk`
- Candidate terms from syllabus: risk register, likelihood, impact, risk treatment, qualitative analysis, quantitative analysis, control recommendation, capability gap
- Missing concepts: `control-recommendation`, `capability-gap`

### Week 15
- Current glossary IDs: `intrusion-detection`, `intrusion-prevention`, `siem`, `log-source`, `network-baseline`, `hardening`
- Candidate terms from syllabus: intrusion detection, intrusion prevention, SIEM, log source, network baseline, hardening, firewall, network segmentation
- Missing concepts: `firewall`, `network-segmentation`

### Week 16
- Current glossary IDs: `linux-permissions`, `chmod`, `chown`, `process`, `systemctl`, `cron`
- Candidate terms from syllabus: Linux permissions, chmod, chown, process, systemctl, cron, shell, package manager
- Missing concepts: `shell`, `package-manager`

### Week 17
- Current glossary IDs: `sql-query`, `select-statement`, `where-clause`, `join`, `input-validation`, `sql-injection`
- Candidate terms from syllabus: SQL query, SELECT, WHERE, JOIN, input validation, SQL injection
- Missing concepts: none at week level; quality improvement is the larger need

### Week 18
- Current glossary IDs: `asset-inventory`, `data-classification`, `threat-model`, `attack-vector`, `vulnerability-scan`, `cvss`
- Candidate terms from syllabus: asset inventory, data classification, threat model, attack vector, vulnerability scan, CVSS, exposure
- Missing concepts: `exposure`

### Week 19
- Current glossary IDs: `mitigation`, `exploit`, `compensating-control`, `residual-risk`, `exposure`, `threat-intelligence`
- Candidate terms from syllabus: mitigation, exploit, compensating control, residual risk, exposure, threat intelligence
- Missing concepts: none at week level; quality improvement is the larger need

### Week 20
- Current glossary IDs: `alert-triage`, `false-positive`, `ioc`, `incident-severity`, `containment`, `eradication`
- Candidate terms from syllabus: alert triage, false positive, IOC, incident severity, containment, eradication, detection rule
- Missing concepts: `detection-rule`

### Week 21
- Current glossary IDs: `recovery`, `playbook`, `escalation-path`, `case-management`, `timeline-analysis`, `post-incident-review`
- Candidate terms from syllabus: recovery, playbook, escalation path, case management, timeline analysis, post-incident review, communication plan, evidence handling
- Missing concepts: `communication-plan`, `evidence-handling`

### Week 22
- Current glossary IDs: `python-script`, `variable`, `function`, `loop`, `conditional`, `error-handling`
- Candidate terms from syllabus: Python script, variable, function, loop, conditional, error handling
- Missing concepts: none at week level; quality improvement is the larger need

### Week 23
- Current glossary IDs: `api`, `http-method`, `automation-playbook`, `regex`, `file-parsing`, `version-control`
- Candidate terms from syllabus: API, HTTP method, automation playbook, regex, file parsing, version control, JSON
- Missing concepts: `json`

### Week 24
- Current glossary IDs: `resume-tailoring`, `star-method`, `elevator-pitch`, `portfolio-artifact`, `interview-question`, `career-story`
- Candidate terms from syllabus: resume tailoring, STAR method, elevator pitch, portfolio artifact, interview question, career story, job tracker
- Missing concepts: `job-tracker`

### Week 25
- Current glossary IDs: `linkedin-profile`, `networking-outreach`, `job-tracker`, `keyword-optimization`, `application-funnel`, `ai-assistant-guardrails`
- Candidate terms from syllabus: LinkedIn profile, networking outreach, job tracker, keyword optimization, application funnel, AI guardrails, portfolio artifact
- Missing concepts: `portfolio-artifact`

### Week 26
- Current glossary IDs: `identity`, `authentication`, `authorization`, `accounting`, `hashing`, `encryption`
- Candidate terms from syllabus: identity, authentication, authorization, accounting, MFA, least privilege, hashing, encryption, social engineering, certificate
- Missing concepts: `mfa`, `least-privilege`, `social-engineering`, `certificate`

### Week 27
- Current glossary IDs: `reconnaissance`, `enumeration`, `privilege-escalation`, `defense-in-depth`, `incident-journal`, `control-recommendation`
- Candidate terms from syllabus: reconnaissance, enumeration, privilege escalation, defense in depth, incident journal, control recommendation, attack surface
- Missing concepts: `attack-surface`

### Week 28
- Current glossary IDs: `incident-command`, `playbook`, `maturity-model`, `communication-plan`, `evidence-handling`, `tabletop-exercise`
- Candidate terms from syllabus: incident command, playbook, maturity model, communication plan, evidence handling, tabletop exercise, chain of custody
- Missing concepts: `chain-of-custody`

### Week 29
- Current glossary IDs: `critical-infrastructure`, `business-impact-analysis`, `governance`, `compliance`, `risk-assessment`, `vendor-risk`
- Candidate terms from syllabus: critical infrastructure, business impact analysis, governance, compliance, risk assessment, vendor risk, control
- Missing concepts: `control`

### Week 30
- Current glossary IDs: `soc-workflow`, `forensic-imaging`, `chain-of-custody`, `log-correlation`, `detection-rule`, `triage-queue`
- Candidate terms from syllabus: SOC workflow, forensic imaging, chain of custody, log correlation, detection rule, triage queue, alert triage, IOC
- Missing concepts: `alert-triage`, `ioc`

### Week 31
- Current glossary IDs: `executive-briefing`, `management-summary`, `artifact-curation`, `roadmap-prioritization`, `capability-gap`, `continuous-improvement`
- Candidate terms from syllabus: executive briefing, management summary, artifact curation, roadmap prioritization, capability gap, continuous improvement, portfolio artifact
- Missing concepts: `portfolio-artifact`

### Week 32
- Current glossary IDs: `spaced-repetition`, `retrieval-practice`, `mock-exam`, `error-log`, `knowledge-gap`, `study-system-reset`
- Candidate terms from syllabus: spaced repetition, retrieval practice, mock exam, error log, knowledge gap, study-system reset
- Missing concepts: none at week level; quality improvement is the larger need

## B. Quality Audit

### Boilerplate phrase findings

The glossary currently contains widespread bullet boilerplate that weakens definitions and duplicates category meaning instead of explaining the concept itself.

Count observed before overhaul:
- 134 glossary entries contain banned or low-value environment suffixes in their bullets.

Patterns found repeatedly:
- `within endpoint hardware and platform operations`
- `within host administration and operating system workflows`
- `within routed and switched network environments`
- `within monitoring, investigation, and response workflows`
- `within governance, risk, and compliance workflows`

Effect on quality:
- Definitions become category labels instead of concept explanations.
- Different terms read as near-duplicates because the distinctive meaning is buried.
- Flashcards inherit the same weak wording, so recall cues become vague and repetitive.

### Bullet 3 mechanism failures

Bullet 3 is supposed to explain how a concept works, but many entries currently use generic restatements or shallow paraphrases of bullet 2.

Examples observed:
- `ram`: Bullet 2 and Bullet 3 both describe “holds active instructions and data” with minimal mechanistic difference.
- `wifi-standard`: Bullet 3 mostly restates compatibility rather than explaining association/channel/modulation behavior.
- `operating-system`: Bullet 3 repeats scheduling and management functions rather than a concrete control flow.
- `network-segmentation`: Bullet 3 is closer to a purpose statement than a mechanism.

### Flashcard semantic mismatches

The current flashcards inherit bad prompts from the templated generator, producing scenario/mechanism fronts that are often disconnected from the actual term.

Examples observed:
- `dhcp-function`: asks about “name resolution,” which belongs to DNS, not DHCP.
- `dhcp-mechanism`: asks how DHCP handles “name resolution,” again mixing DHCP and DNS.
- `dns-function`: asks about “boot sequencing,” which belongs to startup flow, not DNS.
- `mobile-device-function`: asks about choosing a USB boot device before the OS loads, which is really a BIOS/UEFI scenario.
- `switch-function`: asks about “mac addresses on” in a malformed prompt.
- `subnetting-function`: asks about “query filtering,” which is unrelated to subnetting.
- `hashing-function`: asks about “process scheduling,” which belongs to operating systems, not hashing.

Root cause:
- Flashcard fronts were generated from generic category-level templates instead of term-specific contrasts.
- Mechanism prompts often reused a placeholder fragment rather than referencing the actual mechanism in bullet 3.

## C. Exam Alignment

This roadmap is not a verbatim exam objective list, but several phases clearly map to common CompTIA-style expectations:

- Weeks 01-04 align with A+ Core 1 / Core 2 fundamentals:
  hardware, boot flow, mobile devices, networking basics, operating systems, authentication basics, troubleshooting, ticketing, and support process.
- Weeks 06-12 align with Network+ style fundamentals:
  network models, media, switching, routing, IPv4, subnetting, TCP/UDP, infrastructure services, wireless security, and packet troubleshooting.
- Week 26 aligns with Security+ reinforcement:
  IAM, authentication vs authorization vs accounting, hashing, encryption, least privilege, MFA, and social-engineering awareness.

High-level implication for the overhaul:
- Early weeks need broader vocabulary coverage so study decks mirror what a learner is expected to explain on an exam-style check.
- Networking weeks need clearer service distinctions so terms like DNS, DHCP, NAT, TCP, UDP, and routing are not blurred together.
- Security reinforcement weeks need cleaner identity and cryptography concepts with scenario prompts that distinguish related controls correctly.

## Recommended Change Direction

- Expand Week 01 from 6 terms to a fuller hardware and boot vocabulary deck.
- Add missing syllabus terms to early A+, networking, and Security+ reinforcement weeks where the tasks explicitly name them.
- Rewrite glossary bullets to remove boilerplate and make bullet 3 truly mechanistic.
- Regenerate flashcards from the improved glossary with definition, mechanism, and scenario cards.
- Reassign Day 1-5 decks so new terms are introduced progressively and Day 6 becomes the full weekly review deck.
