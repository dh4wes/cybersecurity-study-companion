# Content Basis Review

## Purpose

This document is the canonical reference for the curriculum behind the app. It explains which outside resources shape the roadmap, what they cover, and the level of treatment the study guide aims to provide.

It is not an implementation document. Route behavior, storage, theme logic, and component structure belong in `docs/master.md`.

## Curriculum Model

The roadmap is a blended program, not a single-course mirror. It combines:

- CompTIA-style fundamentals
- networking foundations
- security analyst preparation
- guided labs and packet/log observation
- incident-response and GRC reinforcement
- portfolio and communication work

The result is a public study guide that stays broad in the early phases, becomes more hands-on in the middle, and finishes with analyst-style reporting, response thinking, and career packaging.

## Coverage Philosophy

The guide is designed around five rules:

1. Early weeks prioritize vocabulary, systems literacy, and hardware or OS mental models.
2. Networking is taught before serious security analysis so later packet, service, and segmentation topics make sense.
3. Security coverage favors analyst readiness over deep specialization.
4. Labs are used for reinforcement, not as the sole source of conceptual teaching.
5. Portfolio deliverables turn study into visible proof-of-work.

In practice, that means the app aims for:

- beginner to lower-intermediate depth for most topics
- strong glossary and flashcard coverage for core terms
- enough mechanism detail to support exam-style reasoning
- enough practical work to avoid remaining purely theoretical

It does not aim to replace:

- advanced enterprise administration training
- deep exploit development
- advanced malware analysis
- professional digital forensics specialization
- full GRC framework implementation mastery

## Phase-by-Phase Intent

### Foundation

Weeks 1-5 establish the baseline needed for the rest of the roadmap.

Covers:

- hardware components
- boot flow
- mobile and endpoint concepts
- operating systems
- support workflows
- troubleshooting logic
- Linux basics
- local virtualization practice

Level:

- beginner
- CompTIA A+ style framing with practical reinforcement

### Networking

Weeks 6-12 build the network understanding required for later security work.

Covers:

- models and topologies
- media and interfaces
- Ethernet, switching, and routing
- IPv4 and subnetting
- service flow
- DNS, DHCP, NAT, and protocol interaction
- Wireshark-based packet observation
- end-to-end request flow

Level:

- beginner to lower-intermediate
- strong enough for Network+ style reasoning and later traffic analysis

### Security

Weeks 13-27 shift into security concepts and analyst-oriented workflows.

Covers:

- security foundations
- risk and controls
- network security reinforcement
- Linux and SQL
- assets, threats, and vulnerabilities
- detection and response
- IAM, cryptography, and social engineering reinforcement
- Python automation
- job-preparation and portfolio work

Level:

- beginner to lower-intermediate analyst preparation
- broad rather than deeply specialized

### GRC / Application

Weeks 28-31 push beyond vocabulary recall into process, reporting, and security communication.

Covers:

- incident-response structure
- playbooks
- breach journaling
- governance and resilience framing
- critical infrastructure context
- mock briefings
- portfolio packaging

Level:

- applied introductory to lower-intermediate
- focused on reasoning, communication, and structured security thinking

### Buffer / Final Review

Week 32 exists to consolidate the system, not introduce a new domain.

Covers:

- backlog cleanup
- comprehensive review
- system reset
- study-material refinement

Level:

- reinforcement and retention

## Primary Resource Sources

### Professor Messer A+ Core 1

Primary weeks:

- 1-2

What it contributes:

- hardware vocabulary
- motherboard and boot concepts
- mobile devices
- wireless basics
- early networking exposure
- virtualization exposure

Level:

- beginner
- exam-aligned foundational coverage

Why it is in the roadmap:

- sets the CompTIA-style baseline for endpoint and support literacy
- supplies the vocabulary needed for Week 1 and Week 2 glossary coverage

### Professor Messer A+ Core 2

Primary weeks:

- 3-4

What it contributes:

- operating systems
- installs and upgrade thinking
- file systems
- administrative basics
- support professionalism
- troubleshooting method
- endpoint security basics

Level:

- beginner to lower-intermediate

Why it is in the roadmap:

- bridges hardware knowledge into day-to-day platform operations
- supports the early workflow and troubleshooting weeks

### Linux Unhatched / NDG Linux Unhatched

Primary weeks:

- 3-5

What it contributes:

- shell basics
- Linux navigation
- files and directories
- permissions
- users and groups
- package-management familiarity

Level:

- beginner practical Linux literacy

Why it is in the roadmap:

- prepares the learner for later Linux use in security workflows
- gives the study guide a real command-line base instead of Windows-only study

### VirtualBox and Ubuntu Desktop

Primary weeks:

- 2
- 5

What it contributes:

- local VM setup
- self-managed practice environment
- low-risk lab repetition

Level:

- introductory hands-on practice

Why it is in the roadmap:

- converts passive watching into repeatable local practice
- creates a lab base for later Linux and security tasks

### Cisco CCST Networking / Network Technician Material

Primary weeks:

- 6-10

What it contributes:

- models and topologies
- media and devices
- Ethernet and switching
- routing and gateways
- IPv4 addressing and subnetting
- network design thinking

Level:

- beginner to intermediate networking fundamentals

Why it is in the roadmap:

- acts as the backbone of the networking phase
- provides structure and rigor beyond memorized networking trivia

### Professor Messer Network+

Primary weeks:

- 6-12

What it contributes:

- protocol explanations
- addressing refresh
- DNS, DHCP, NAT, and service flow
- wireless and SOHO reinforcement
- broad Network+ framing

Level:

- beginner to lower-intermediate
- strong for review and terminology reinforcement

Why it is in the roadmap:

- complements the more structured Cisco-based networking block
- helps make networking concepts exam-ready and glossary-friendly

### Wireshark and Guided Packet Labs

Primary weeks:

- 11-15

What it contributes:

- packet capture
- inspection habits
- protocol observation
- troubleshooting through evidence

Level:

- beginner to lower-intermediate packet analysis

Why it is in the roadmap:

- turns networking concepts into observable behavior
- prepares the learner for later detection and response reasoning

### TryHackMe Pre Security

Primary weeks:

- 12

What it contributes:

- introductory security concepts
- service and web-request flow
- end-to-end reinforcement before the larger security block

Level:

- beginner lab reinforcement

Why it is in the roadmap:

- acts as the bridge between pure networking study and formal security study

### Google Cybersecurity Professional Certificate

Primary weeks:

- 13-25

What it contributes:

- security foundations
- risk and control language
- network-security review
- Linux and SQL
- assets, threats, and vulnerabilities
- detection and response
- Python automation
- job-preparation structure

Level:

- beginner to lower-intermediate analyst preparation

Why it is in the roadmap:

- serves as the backbone of the security phase
- provides the longest continuous block of structured analyst-oriented material

## Google Block Breakdown

### Course 1

Primary week:

- 13

Focus:

- foundations of cybersecurity
- roles
- core terminology

Level:

- introductory

### Course 2

Primary week:

- 14

Focus:

- risk
- controls
- governance-oriented security thinking

Level:

- introductory to lower-intermediate

### Course 3

Primary week:

- 15

Focus:

- security networking recap
- segmentation
- protective network concepts

Level:

- reinforcement, not first-contact networking

### Course 4

Primary weeks:

- 16-17

Focus:

- Linux
- SQL

Level:

- beginner practical usage for analyst tasks

### Course 5

Primary weeks:

- 18-19

Focus:

- assets
- threats
- vulnerabilities
- exposure thinking

Level:

- foundational analyst mindset

### Course 6

Primary weeks:

- 20-21

Focus:

- detection
- triage
- escalation
- response basics

Level:

- introductory SOC-style depth

### Course 7

Primary weeks:

- 22-23

Focus:

- Python automation
- scripting logic
- workflow automation

Level:

- beginner scripting

### Course 8

Primary weeks:

- 24
- 31 reinforcement

Focus:

- job preparation
- evidence gathering
- portfolio framing

Level:

- practical career application

### Course 9

Primary week:

- 25

Focus:

- job-search systems
- profile polish
- AI-assisted support workflows

Level:

- career operations rather than technical depth

## Reinforcement Sources

### Professor Messer Security+

Primary weeks:

- 13-27

Concentrated reinforcement:

- 26

What it contributes:

- IAM
- cryptography
- social engineering
- broad security concept reinforcement

Level:

- exam-oriented reinforcement

Why it is in the roadmap:

- broadens the Google block
- keeps the curriculum closer to familiar CompTIA-style security expectations

### TryHackMe Cyber Security 101

Primary weeks:

- 17
- 19
- 23
- 27

What it contributes:

- applied cyber concepts
- attack and defense framing
- breach-journal support
- capstone reinforcement

Level:

- beginner applied practice

Why it is in the roadmap:

- interrupts course-only study with hands-on reinforcement
- supports transfer from theory into observation and reflection

### TryHackMe Defensive Security

Primary weeks:

- 21
- 30

What it contributes:

- SOC thinking
- logs
- detection
- forensics-adjacent workflows
- response context

Level:

- beginner to lower-intermediate defensive operations exposure

Why it is in the roadmap:

- strengthens the later detection and response block
- gives the roadmap a more operations-facing finish

## GRC and Incident-Response Sources

### CISA Incident Response Training

Primary weeks:

- 28
- 30

What it contributes:

- incident-response structure
- playbooks
- communication and escalation thinking
- evidence-handling framing

Level:

- practical process application

Why it is in the roadmap:

- strengthens formal IR thinking after earlier SOC-style exposure

### CISA Critical Infrastructure Material

Primary week:

- 29

What it contributes:

- critical infrastructure context
- resilience thinking
- risk framing
- organizational impact awareness

Level:

- conceptual and governance-oriented

Why it is in the roadmap:

- prevents the guide from collapsing into a narrow SOC-only track

### CISA Learning and CSET Fact Sheet

Primary weeks:

- 28-29

What it contributes:

- assessment mindset
- structured planning support
- resilience and governance reinforcement

Level:

- orientation and applied support

Why it is in the roadmap:

- adds practical governance and assessment framing without pretending to be a full specialist GRC program

## Internal App-Driven Layers

The roadmap is not just a list of outside links. The app adds its own learning structure through:

- canonical glossary terms
- derived flashcards
- weekly review decks
- day-level study sessions
- security journal prompts
- portfolio outputs
- workload-model guidance
- progress tracking

These internal layers do two jobs:

1. They turn mixed outside resources into one coherent study system.
2. They keep the roadmap usable even when the learner is not actively inside a video course or lab platform.

## Practical Depth Summary

If the user asks, "What level does this app cover?", the shortest accurate answer is:

- strong beginner to lower-intermediate cybersecurity foundations
- enough networking depth to support traffic and service reasoning
- enough analyst-oriented security depth to support entry-level SOC or junior security-study preparation
- light but real exposure to Linux, SQL, Python, IR, and GRC concepts

The roadmap is strongest at:

- foundational vocabulary
- structured week-by-week progression
- CompTIA-style mental models
- study-system consistency
- early analyst preparation

It is intentionally lighter at:

- advanced engineering depth
- enterprise administration detail
- offensive specialization
- deep digital forensics
- framework-heavy compliance specialization

## Maintenance Rules

- Update this document when the source mix, phase intent, or coverage level changes.
- Keep week-by-week implementation details out of this file unless they materially change curriculum positioning.
- Keep `docs/master.md` as the implementation source of truth.
