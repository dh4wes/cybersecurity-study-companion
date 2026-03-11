# Daily Mini Lectures: Master Index

## Purpose
This folder contains the current daily lecture pack generated from the live canonical syllabus in `src/data/content/study-companion-v2.json`.
The current repo state contains 29 active weeks and 203 active day records. The original 32-week prompt does not match the current source of truth, so this pack follows the live canonical data instead of the older assumption.

## File map
- `00_master_index.md`: entry point and ingestion notes.
- `01_exam_alignment_matrix.md`: current week-range alignment to A+, Network+, Security+, and the Google Cybersecurity Certificate.
- `02_authoring_principles.md`: writing and scope rules used by the generator.
- `week-XX-overview.md`: one prose overview for each active canonical week.
- `week-XX-day-YY.md`: one standalone daily lecture for each canonical day.
- `99_sources_ledger.md`: repo and external source families used for alignment.

## Study sequence
Read the week overview first, then the seven day files in order. Review days are synthesis-oriented and rest days are intentionally short.

## NotebookLM ingestion
Ingest the whole folder as a collection. The stable naming convention lets NotebookLM connect each week overview to its day files, and the per-file metadata makes retrieval cleaner for exam-specific prompts.

## Current lecture set
- Week 01: A+ Core 1: hardware, boot process, and internal components (7 day files, primary alignment: CompTIA A+ Core 1 (220-1201))
- Week 02: A+ Core 1: mobile devices, networking basics, wireless, and virtualization (7 day files, primary alignment: CompTIA A+ Core 1 (220-1201))
- Week 03: A+ Core 2: operating systems, installs, file systems, and admin basics (7 day files, primary alignment: CompTIA A+ Core 2 (220-1202))
- Week 04: A+ Core 2: security, support professionalism, and troubleshooting method (7 day files, primary alignment: CompTIA A+ Core 2 (220-1202))
- Week 05: Linux ramp-up and first VM build (7 day files, primary alignment: CompTIA A+ Core 2 (220-1202))
- Week 06: Networking foundations: models, media, devices, and topologies (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 07: Ethernet, switching, routing, and gateways (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 08: IPv4 addressing, subnetting, and address planning (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 09: TCP, UDP, ports, DNS, DHCP, NAT, and service flow (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 10: Wireless, SOHO design, cloud, and network security basics (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 11: Wireshark and troubleshooting with packet evidence (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 12: TryHackMe Pre Security and end-to-end web request capstone (7 day files, primary alignment: CompTIA Network+ (N10-009))
- Week 13: Google Course 1: Foundations of Cybersecurity (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 14: Google Course 2: Play It Safe - Manage Security Risks (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 15: Google Course 3: Networks and Network Security (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 16: Google Course 4: Linux and SQL (part 1 - Linux) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 17: Google Course 4: Linux and SQL (part 2 - SQL) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 18: Google Course 5: Assets, threats, and vulnerabilities (part 1) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 19: Google Course 5: Assets, threats, and vulnerabilities (part 2) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 20: Google Course 6: Detection and response (part 1) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 21: Google Course 6: Detection and response (part 2) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 22: Google Course 7: Python automation (part 1) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 23: Google Course 7: Python automation (part 2) (7 day files, primary alignment: Google Cybersecurity Professional Certificate)
- Week 26: Security+ reinforcement: IAM, crypto, and social engineering (7 day files, primary alignment: CompTIA Security+ (SY0-701))
- Week 27: TryHackMe Cyber Security 101 + breach journal capstone (7 day files, primary alignment: CompTIA Security+ (SY0-701))
- Week 28: CISA incident response materials and playbook thinking (7 day files, primary alignment: CompTIA Security+ (SY0-701))
- Week 29: Critical infrastructure, governance, risk, and assessment mindset (7 day files, primary alignment: CompTIA Security+ (SY0-701))
- Week 30: TryHackMe Defensive Security: SOC, forensics, IR, and logs (7 day files, primary alignment: CompTIA Security+ (SY0-701))
- Week 32: Catch-up, comprehensive review, and study-system reset (7 day files, primary alignment: Cross-certification review (A+ / Network+ / Security+))
