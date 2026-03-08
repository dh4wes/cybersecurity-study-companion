# Flashcard Information

## Executive Summary

This document is derived from the canonical content files in `src/data/content/` and covers all 756 unique flashcards used by the 32-week study companion.

Flashcard creation model:
- Glossary terms are the source of truth.
- Each glossary entry contains exactly three teaching bullets: what it is, what it does, and how it works.
- Each glossary entry is converted into exactly three flashcards with predictable IDs: `-definition`, `-mechanism`, and `-scenario`.
- Definition cards use the glossary definition, mechanism cards use the mechanism bullet, and scenario cards use the purpose bullet in `TERM — purpose` format.
- Week decks are built from ordered week glossary lists in `study-companion-v2.json`.
- Day 1-5 decks list only the new glossary terms and flashcards introduced that day, Day 6 is the full review deck, and Day 7 is empty by design.

Deck totals:
- 32 weeks
- 224 day records
- 252 unique glossary terms
- 756 unique flashcards
- 825 week-level flashcard slots across the roadmap
- 32 review decks that point back to each week's full card set

Repeated glossary entries across multiple weeks:
- `alert-triage` (Alert Triage) appears in weeks 20, 30.
- `capability-gap` (Capability Gap) appears in weeks 14, 31.
- `certificate` (Certificate) appears in weeks 12, 26.
- `chain-of-custody` (Chain of Custody) appears in weeks 28, 30.
- `command-line` (Command Line) appears in weeks 03, 05.
- `communication-plan` (Communication Plan) appears in weeks 21, 28.
- `control-recommendation` (Control Recommendation) appears in weeks 14, 27.
- `detection-rule` (Detection Rule) appears in weeks 20, 30.
- `dns-resolution` (DNS Resolution) appears in weeks 09, 12.
- `evidence-handling` (Evidence Handling) appears in weeks 21, 28.
- `exposure` (Exposure) appears in weeks 18, 19.
- `firewall` (Firewall) appears in weeks 10, 15.
- `ioc` (Indicator of Compromise) appears in weeks 20, 30.
- `job-tracker` (Job Tracker) appears in weeks 24, 25.
- `linux-permissions` (Linux Permissions) appears in weeks 05, 16.
- `network-segmentation` (Network Segmentation) appears in weeks 10, 15.
- `package-manager` (Package Manager) appears in weeks 03, 05, 16.
- `playbook` (Playbook) appears in weeks 21, 28.
- `portfolio-artifact` (Portfolio Artifact) appears in weeks 24, 25, 31.
- `process` (Process) appears in weeks 05, 16.
- `shell` (Shell) appears in weeks 05, 16.

Phase breakdown:
- Foundation: 5 weeks
- Networking: 7 weeks
- Security: 15 weeks
- GRC / Application: 4 weeks
- Buffer / Final Review: 1 week

## Week-to-Topic Map

| Week | Phase | Weekly focus | Glossary terms | Flashcards |
| --- | --- | --- | ---: | ---: |
| 01 | Foundation | A+ Core 1: hardware, boot process, and internal components | 13 | 39 |
| 02 | Foundation | A+ Core 1: mobile devices, networking basics, wireless, and virtualization | 13 | 39 |
| 03 | Foundation | A+ Core 2: operating systems, installs, file systems, and admin basics | 11 | 33 |
| 04 | Foundation | A+ Core 2: security, support professionalism, and troubleshooting method | 11 | 33 |
| 05 | Foundation | Linux ramp-up and first VM build | 11 | 33 |
| 06 | Networking | Networking foundations: models, media, devices, and topologies | 12 | 36 |
| 07 | Networking | Ethernet, switching, routing, and gateways | 11 | 33 |
| 08 | Networking | IPv4 addressing, subnetting, and address planning | 10 | 30 |
| 09 | Networking | TCP, UDP, ports, DNS, DHCP, NAT, and service flow | 9 | 27 |
| 10 | Networking | Wireless, SOHO design, cloud, and network security basics | 10 | 30 |
| 11 | Networking | Wireshark and troubleshooting with packet evidence | 10 | 30 |
| 12 | Networking | TryHackMe Pre Security and end-to-end web request capstone | 9 | 27 |
| 13 | Security | Google Course 1: Foundations of Cybersecurity | 8 | 24 |
| 14 | Security | Google Course 2: Play It Safe - Manage Security Risks | 8 | 24 |
| 15 | Security | Google Course 3: Networks and Network Security | 8 | 24 |
| 16 | Security | Google Course 4: Linux and SQL (part 1 - Linux) | 8 | 24 |
| 17 | Security | Google Course 4: Linux and SQL (part 2 - SQL) | 6 | 18 |
| 18 | Security | Google Course 5: Assets, threats, and vulnerabilities (part 1) | 7 | 21 |
| 19 | Security | Google Course 5: Assets, threats, and vulnerabilities (part 2) | 6 | 18 |
| 20 | Security | Google Course 6: Detection and response (part 1) | 7 | 21 |
| 21 | Security | Google Course 6: Detection and response (part 2) | 8 | 24 |
| 22 | Security | Google Course 7: Python automation (part 1) | 6 | 18 |
| 23 | Security | Google Course 7: Python automation (part 2) | 7 | 21 |
| 24 | Security | Google Course 8: Prepare for cybersecurity jobs | 7 | 21 |
| 25 | Security | Google Course 9: Job search systems, AI support, and profile polish | 7 | 21 |
| 26 | Security | Security+ reinforcement: IAM, crypto, and social engineering | 10 | 30 |
| 27 | Security | TryHackMe Cyber Security 101 + breach journal capstone | 7 | 21 |
| 28 | GRC / Application | CISA incident response materials and playbook thinking | 7 | 21 |
| 29 | GRC / Application | Critical infrastructure, governance, risk, and assessment mindset | 7 | 21 |
| 30 | GRC / Application | TryHackMe Defensive Security: SOC, forensics, IR, and logs | 8 | 24 |
| 31 | GRC / Application | Portfolio packaging, mock briefing, and next-step planning | 7 | 21 |
| 32 | Buffer / Final Review | Catch-up, comprehensive review, and study-system reset | 6 | 18 |

## Week-by-Week Flashcards

Each week section explains the topic fit, then lists every flashcard attached to that week.

## Week 01 - A+ Core 1: hardware, boot process, and internal components

- Phase: Foundation
- Deliverable: Hardware glossary + power-on-to-login diagram
- Checkpoint: Can explain what each main computer component does and how a system boots.
- Study-week relationship: The ordered glossary terms for Week 01 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### CPU (`cpu`)

- `cpu-definition` [definition, easy] Front: What is CPU?
  Back: Central Processing Unit, executes instructions and coordinates processing tasks.
- `cpu-mechanism` [understanding, medium] Front: How does CPU fetch, decode, and execute instructions while using registers and cache?
  Back: Fetches instructions, decodes them, and executes operations while registers and caches keep data close to processing cores.
- `cpu-scenario` [application, medium] Front: Scenario: A desktop feels slow in every app even after storage health checks, and the system needs the part that executes instructions. Which component or concept best fits?
  Back: CPU — Fetches, decodes, and executes instructions while coordinating arithmetic, logic, and control operations across the system.

### RAM (`ram`)

- `ram-definition` [definition, easy] Front: What is RAM?
  Back: Volatile memory used for active processes and short-term data access.
- `ram-mechanism` [understanding, medium] Front: How does RAM keep active instructions available for fast processor access?
  Back: Holds active instructions and data in fast volatile cells that the CPU can read or update quickly.
- `ram-scenario` [application, medium] Front: Scenario: A workstation slows down only when many applications stay open, and long-term storage is not the bottleneck. Which component or concept best fits?
  Back: RAM — Holds active instructions and data in fast volatile memory for immediate CPU access during execution.

### Storage Drive (`storage-drive`)

- `storage-drive-definition` [definition, easy] Front: What is Storage Drive?
  Back: Persistent storage device such as HDD or SSD for operating system and files.
- `storage-drive-mechanism` [understanding, medium] Front: How does Storage Drive store data persistently and retrieve it later through the controller?
  Back: Writes data into addressable sectors or cells, then retrieves it later through the controller and filesystem mapping.
- `storage-drive-scenario` [application, medium] Front: Scenario: A system needs the component that keeps the operating system and user files even when power is removed. Which component or concept best fits?
  Back: Storage Drive — Persists operating system files and user data by writing blocks to magnetic or solid-state media.

### Motherboard (`motherboard`)

- `motherboard-definition` [definition, easy] Front: What is Motherboard?
  Back: Main circuit board that connects CPU, memory, storage, and expansion components.
- `motherboard-mechanism` [understanding, medium] Front: How does Motherboard move power, timing, and data between major components?
  Back: Connects CPU, memory, firmware, storage, and buses so components can exchange power, timing, and data signals.
- `motherboard-scenario` [application, medium] Front: Scenario: A technician needs the board that connects the processor, memory, storage, and add-in devices together. Which component or concept best fits?
  Back: Motherboard — Provides power distribution, bus pathways, firmware interfaces, and sockets connecting the main system components.

### Chipset (`chipset`)

- `chipset-definition` [definition, easy] Front: What is Chipset?
  Back: Controller logic on the motherboard that coordinates communication between the processor, storage, USB, and expansion interfaces.
- `chipset-mechanism` [understanding, medium] Front: How does Chipset coordinate data paths between the processor and peripherals?
  Back: Links processor lanes, storage controllers, USB paths, and peripheral buses so board components can exchange data predictably.
- `chipset-scenario` [application, medium] Front: Scenario: A board design needs the controller logic that manages traffic between the processor and peripheral buses. Which component or concept best fits?
  Back: Chipset — Routes data and control signals between major subsystems that do not connect directly to the CPU.

### PSU (Power Supply Unit) (`psu`)

- `psu-definition` [definition, easy] Front: What is PSU (Power Supply Unit)?
  Back: Power supply unit that converts incoming AC power into regulated DC outputs for computer components.
- `psu-mechanism` [understanding, medium] Front: How does PSU (Power Supply Unit) convert wall power into stable rails for internal parts?
  Back: Converts wall power to DC, regulates voltage on several rails, and distributes the correct connectors to each component.
- `psu-scenario` [application, medium] Front: Scenario: A machine will not start reliably, and the suspect part must convert wall power into stable internal rails. Which component or concept best fits?
  Back: PSU (Power Supply Unit) — Delivers stable power rails to the motherboard, storage, fans, and expansion devices.

### BIOS/UEFI Firmware (`bios`)

- `bios-definition` [definition, easy] Front: What is BIOS/UEFI Firmware?
  Back: Low-level firmware that initializes hardware and starts the boot process.
- `bios-mechanism` [understanding, medium] Front: How does BIOS/UEFI Firmware initialize hardware and hand control to startup code?
  Back: Initializes hardware, selects a boot target, and hands execution to the bootloader after hardware checks pass.
- `bios-scenario` [application, medium] Front: Scenario: A technician must change startup settings before the operating system loads. Which component or concept best fits?
  Back: BIOS/UEFI Firmware — Initializes hardware, runs platform checks, and locates a bootable device before handing control to the loader.

### POST (`post`)

- `post-definition` [definition, easy] Front: What is POST?
  Back: Power-On Self-Test routine that checks essential hardware before the operating system starts.
- `post-mechanism` [understanding, medium] Front: How does POST check core hardware before boot continues?
  Back: Firmware powers major components, tests required devices, and then either reports a fault or continues toward boot selection.
- `post-scenario` [application, medium] Front: Scenario: A machine powers on and checks basic hardware before it tries to load the operating system. Which component or concept best fits?
  Back: POST — Detects basic hardware faults early enough to stop booting or report an error condition.

### PCIe / Expansion Bus (`pcie`)

- `pcie-definition` [definition, easy] Front: What is PCIe / Expansion Bus?
  Back: High-speed serial expansion interface used to connect add-in cards and some storage devices to a motherboard.
- `pcie-mechanism` [understanding, medium] Front: How does PCIe / Expansion Bus move high-speed traffic over dedicated lanes?
  Back: Uses dedicated serial lanes between the motherboard and device so data moves quickly without sharing an older parallel bus.
- `pcie-scenario` [application, medium] Front: Scenario: A system needs a high-speed expansion path for a graphics card or NVMe adapter rather than a memory slot. Which component or concept best fits?
  Back: PCIe / Expansion Bus — Provides a fast, scalable path for devices such as GPUs, NICs, and NVMe adapters.

### Cooling / Thermal Management (`cooling`)

- `cooling-definition` [definition, easy] Front: What is Cooling / Thermal Management?
  Back: Hardware and airflow design used to move heat away from processors, chipsets, and other hot components.
- `cooling-mechanism` [understanding, medium] Front: How does Cooling / Thermal Management move heat away before components throttle or fail?
  Back: Transfers heat into a heatsink and then moves it away with airflow so component temperatures stay within safe limits.
- `cooling-scenario` [application, medium] Front: Scenario: A computer throttles or shuts down under load, so the team needs the concept that removes excess heat. Which component or concept best fits?
  Back: Cooling / Thermal Management — Prevents overheating, instability, and thermal throttling during sustained workloads.

### Bootloader (`bootloader`)

- `bootloader-definition` [definition, easy] Front: What is Bootloader?
  Back: Small startup program that loads an operating system kernel after firmware finds a bootable device.
- `bootloader-mechanism` [understanding, medium] Front: How does Bootloader hand off from firmware to the operating system kernel?
  Back: Firmware starts the loader, the loader locates the kernel and startup options, and control passes into the operating system.
- `bootloader-scenario` [application, medium] Front: Scenario: Firmware found a bootable device, and now a small startup program must load the kernel. Which component or concept best fits?
  Back: Bootloader — Bridges firmware startup and operating system execution.

### Boot Process (`boot-process`)

- `boot-process-definition` [definition, easy] Front: What is Boot Process?
  Back: Sequence that moves a system from power-on to a usable operating system session.
- `boot-process-mechanism` [understanding, medium] Front: How does Boot Process move from power-on to a usable operating system session?
  Back: Starts with firmware, loads boot code, initializes the kernel, and then launches system services and user space.
- `boot-process-scenario` [application, medium] Front: Scenario: An analyst is tracing what happens from power-on until the login screen appears. Which component or concept best fits?
  Back: Boot Process — Transitions from firmware execution to loader, kernel initialization, service startup, and interactive user access.

### CPU Cache (`cpu-cache`)

- `cpu-cache-definition` [definition, easy] Front: What is CPU Cache?
  Back: Small, high-speed memory on or near the processor that stores frequently used instructions and data.
- `cpu-cache-mechanism` [understanding, medium] Front: How does CPU Cache keep repeated data close to the processor?
  Back: Keeps recently or frequently used data close to the core, so many requests finish before the CPU waits on RAM.
- `cpu-cache-scenario` [application, medium] Front: Scenario: A processor needs very fast local memory so repeated data reads do not wait on system memory. Which component or concept best fits?
  Back: CPU Cache — Reduces average memory access time by serving repeated reads faster than system RAM can.


## Week 02 - A+ Core 1: mobile devices, networking basics, wireless, and virtualization

- Phase: Foundation
- Deliverable: Home-network map + ports and protocols sheet
- Checkpoint: Can identify common devices, ports, and SOHO troubleshooting steps.
- Study-week relationship: The ordered glossary terms for Week 02 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Mobile Device (`mobile-device`)

- `mobile-device-definition` [definition, easy] Front: What is Mobile Device?
  Back: Portable endpoint such as a phone, tablet, or lightweight computer with integrated radios and battery power.
- `mobile-device-mechanism` [understanding, medium] Front: How does Mobile Device combine compute, storage, radios, and battery power in one endpoint?
  Back: Combines processor, storage, battery, sensors, and wireless interfaces so one compact device can manage apps and data on the move.
- `mobile-device-scenario` [application, medium] Front: Scenario: A team is discussing a portable endpoint that combines wireless radios, battery power, apps, and local storage. Which component or concept best fits?
  Back: Mobile Device — Delivers computing, connectivity, and local apps in a form factor built for movement and short sessions.

### Laptop (`laptop`)

- `laptop-definition` [definition, easy] Front: What is Laptop?
  Back: Portable computer with an integrated display, keyboard, battery, and mobile-oriented internal components.
- `laptop-mechanism` [understanding, medium] Front: How does Laptop keep a full system portable without losing core functions?
  Back: Combines processor, memory, storage, battery, display, and wireless hardware in one chassis so the system operates as one endpoint.
- `laptop-scenario` [application, medium] Front: Scenario: A user needs a full computer that can work unplugged and travel easily between locations. Which component or concept best fits?
  Back: Laptop — Provides a full personal computing platform that can run unplugged and travel easily.

### Docking Station (`docking-station`)

- `docking-station-definition` [definition, easy] Front: What is Docking Station?
  Back: Accessory that expands a portable computer with extra ports, displays, power, or peripherals through one connection.
- `docking-station-mechanism` [understanding, medium] Front: How does Docking Station reconnect power, displays, and peripherals through one link?
  Back: Carries power, video, USB, and network traffic through one dock link so attached peripherals reconnect as a group.
- `docking-station-scenario` [application, medium] Front: Scenario: A user wants one connection that restores power, external displays, network access, and desk peripherals. Which component or concept best fits?
  Back: Docking Station — Lets a mobile system switch quickly between portable and desk-based work setups.

### Modem (`modem`)

- `modem-definition` [definition, easy] Front: What is Modem?
  Back: Device that connects a local network to an ISP service by converting signals between provider media and Ethernet.
- `modem-mechanism` [understanding, medium] Front: How does Modem translate provider signals into local network traffic?
  Back: Receives the provider signal format, translates it into local data frames, and passes traffic between the ISP link and home equipment.
- `modem-scenario` [application, medium] Front: Scenario: A home network needs the device that translates the provider link into local Ethernet for the gateway. Which component or concept best fits?
  Back: Modem — Provides the handoff between the provider network technology and the customer router or gateway.

### Bluetooth (`bluetooth`)

- `bluetooth-definition` [definition, easy] Front: What is Bluetooth?
  Back: Short-range wireless standard used to connect nearby devices such as headsets, keyboards, and phones.
- `bluetooth-mechanism` [understanding, medium] Front: How does Bluetooth pair devices and exchange data over a short-range link?
  Back: Pairs nearby radios, negotiates capabilities, and then exchanges data over a short-range wireless link.
- `bluetooth-scenario` [application, medium] Front: Scenario: A laptop needs to connect wirelessly to nearby peripherals without joining the local Wi-Fi network. Which component or concept best fits?
  Back: Bluetooth — Provides low-power local connectivity for peripherals and quick device-to-device data exchange.

### IP Address (`ip-address`)

- `ip-address-definition` [definition, easy] Front: What is IP Address?
  Back: Logical network address that identifies a source or destination host for routed traffic.
- `ip-address-mechanism` [understanding, medium] Front: How does IP Address separate local destinations from routed ones?
  Back: Combines network and host portions so devices can tell whether traffic stays local or must be forwarded by a router.
- `ip-address-scenario` [application, medium] Front: Scenario: Traffic must be sent toward the correct host or network instead of staying only on the local segment. Which component or concept best fits?
  Back: IP Address — Lets packets be sent toward the correct network and endpoint instead of staying on one local segment.

### Printer (`printer`)

- `printer-definition` [definition, easy] Front: What is Printer?
  Back: Peripheral that produces hard-copy output from digital documents and images.
- `printer-mechanism` [understanding, medium] Front: How does Printer work step by step?
  Back: Receives a print job, buffers and interprets it, then applies ink or toner to paper in the requested layout.
- `printer-scenario` [application, medium] Front: Scenario: An office needs the peripheral that turns digital documents into physical pages. Which component or concept best fits?
  Back: Printer — Turns electronic information into physical pages for sharing, records, or daily work.

### Virtualization (`virtualization`)

- `virtualization-definition` [definition, easy] Front: What is Virtualization?
  Back: Technique that abstracts physical hardware so multiple logical systems can share the same host resources.
- `virtualization-mechanism` [understanding, medium] Front: How does Virtualization present shared hardware as separate logical systems?
  Back: Presents virtual CPU, memory, storage, and network resources so guest systems operate as if they had their own hardware.
- `virtualization-scenario` [application, medium] Front: Scenario: A student wants one host computer to run several isolated lab environments without buying extra hardware. Which component or concept best fits?
  Back: Virtualization — Improves isolation, flexibility, and lab efficiency by letting one machine run several workloads separately.

### Hypervisor (`hypervisor`)

- `hypervisor-definition` [definition, easy] Front: What is Hypervisor?
  Back: Layer that creates and manages virtual machines on host hardware.
- `hypervisor-mechanism` [understanding, medium] Front: How does Hypervisor allocate shared hardware across isolated guest systems?
  Back: Abstracts CPU, memory, storage, and network hardware so multiple guest operating systems can run in isolated virtual environments.
- `hypervisor-scenario` [application, medium] Front: Scenario: Several guest systems must share one physical host without seeing each other directly. Which component or concept best fits?
  Back: Hypervisor — Abstracts physical hardware, allocates virtual resources, and isolates guest systems running on the same host.

### Mobile Hotspot (`mobile-hotspot`)

- `mobile-hotspot-definition` [definition, easy] Front: What is Mobile Hotspot?
  Back: Feature that lets a phone or similar device share its internet connection with other local clients.
- `mobile-hotspot-mechanism` [understanding, medium] Front: How does Mobile Hotspot share one cellular connection with nearby clients?
  Back: Uses the mobile network for upstream access, creates a local wireless network, and routes client traffic through the device.
- `mobile-hotspot-scenario` [application, medium] Front: Scenario: A tablet has internet access over the carrier network and needs to share that connectivity with a nearby laptop. Which component or concept best fits?
  Back: Mobile Hotspot — Provides temporary internet access for nearby devices when fixed wireless or wired service is unavailable.

### Cellular Network (`cellular-network`)

- `cellular-network-definition` [definition, easy] Front: What is Cellular Network?
  Back: Wide-area radio network that connects mobile devices through carrier-operated towers and core infrastructure.
- `cellular-network-mechanism` [understanding, medium] Front: How does Cellular Network attach a device and carry its traffic through the carrier?
  Back: A device attaches to a nearby tower, authenticates with the carrier, and then sends traffic through the provider network.
- `cellular-network-scenario` [application, medium] Front: Scenario: A phone needs mobile data service while moving between locations where no local Wi-Fi exists. Which component or concept best fits?
  Back: Cellular Network — Provides mobile voice and data connectivity beyond the range of a local Wi-Fi network.

### Network Protocol (`network-protocol`)

- `network-protocol-definition` [definition, easy] Front: What is Network Protocol?
  Back: Defined set of rules that controls how devices format, send, receive, and interpret network traffic.
- `network-protocol-mechanism` [understanding, medium] Front: How does Network Protocol keep both ends of a connection using the same rules?
  Back: Specifies message formats, timing, and expected responses so both ends process traffic in the same way.
- `network-protocol-scenario` [application, medium] Front: Scenario: Two systems can exchange data only if they agree on message format, timing, and expected responses. Which component or concept best fits?
  Back: Network Protocol — Lets different systems communicate predictably by agreeing on message structure and behavior.

### Cloud Computing (`cloud-computing`)

- `cloud-computing-definition` [definition, easy] Front: What is Cloud Computing?
  Back: On-demand delivery of computing resources over a network instead of relying only on local hardware.
- `cloud-computing-mechanism` [understanding, medium] Front: How does Cloud Computing allocate shared resources on demand?
  Back: Users request shared compute or application resources from a provider, and the provider allocates capacity from pooled infrastructure.
- `cloud-computing-scenario` [application, medium] Front: Scenario: A team wants to consume compute resources from a provider instead of buying and maintaining every server locally. Which component or concept best fits?
  Back: Cloud Computing — Lets organizations scale services and consume shared infrastructure without building every system themselves.


## Week 03 - A+ Core 2: operating systems, installs, file systems, and admin basics

- Phase: Foundation
- Deliverable: OS comparison grid + install / upgrade checklist
- Checkpoint: Can compare major operating systems and explain basic installation choices.
- Study-week relationship: The ordered glossary terms for Week 03 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Operating System (`operating-system`)

- `operating-system-definition` [definition, easy] Front: What is Operating System?
  Back: Core software that manages hardware, files, processes, and user interaction.
- `operating-system-mechanism` [understanding, medium] Front: How does Operating System schedule work and manage hardware access safely?
  Back: Schedules processes, manages memory and devices, and exposes system calls so applications can use hardware safely.
- `operating-system-scenario` [application, medium] Front: Scenario: A machine needs the software layer that schedules work, manages memory, and controls hardware access. Which component or concept best fits?
  Back: Operating System — Schedules processes, manages memory, controls devices, and exposes interfaces for users and applications.

### Filesystem (`filesystem`)

- `filesystem-definition` [definition, easy] Front: What is Filesystem?
  Back: Structure and rules used to organize, name, store, and retrieve files on storage media.
- `filesystem-mechanism` [understanding, medium] Front: How does Filesystem map names and directories to storage blocks?
  Back: Maps filenames to directories, metadata, and storage blocks so the system can locate, read, write, and protect data.
- `filesystem-scenario` [application, medium] Front: Scenario: A system must keep files in named paths with metadata and predictable locations on disk. Which component or concept best fits?
  Back: Filesystem — Lets an operating system keep data in directories with metadata, permissions, and predictable paths.

### NTFS (`ntfs`)

- `ntfs-definition` [definition, easy] Front: What is NTFS?
  Back: New Technology File System used by modern Windows systems.
- `ntfs-mechanism` [understanding, medium] Front: How does NTFS track files with metadata and journaling?
  Back: Stores file metadata in master file table records and uses permissions and journaling to manage access and recovery.
- `ntfs-scenario` [application, medium] Front: Scenario: A Windows volume needs file metadata, permissions, and journaling rather than a minimal removable-media format. Which component or concept best fits?
  Back: NTFS — Stores files with metadata, access controls, journaling, and recovery features on Windows volumes.

### Partition (`partition`)

- `partition-definition` [definition, easy] Front: What is Partition?
  Back: Logical division of a physical disk that the operating system can format and manage separately.
- `partition-mechanism` [understanding, medium] Front: How does Partition divide one disk into separately managed regions?
  Back: Uses a partition table to mark disk regions, then the operating system formats and mounts each region for use.
- `partition-scenario` [application, medium] Front: Scenario: One physical disk needs separate regions for the OS, data, or recovery tools. Which component or concept best fits?
  Back: Partition — Separates storage space for operating systems, data, recovery areas, or different filesystems.

### Boot Media (`boot-media`)

- `boot-media-definition` [definition, easy] Front: What is Boot Media?
  Back: Removable or attached storage prepared to start a system or launch an installer.
- `boot-media-mechanism` [understanding, medium] Front: How does Boot Media start recovery or installation before the main OS loads?
  Back: Firmware detects the bootable medium, loads its boot code, and starts the installer or recovery environment.
- `boot-media-scenario` [application, medium] Front: Scenario: A technician needs removable media that can start setup or recovery before the installed system loads. Which component or concept best fits?
  Back: Boot Media — Lets a machine load setup tools or an operating system when the normal internal drive is unavailable or being replaced.

### Upgrade Path (`upgrade-path`)

- `upgrade-path-definition` [definition, easy] Front: What is Upgrade Path?
  Back: Supported route for moving a system from one version, edition, or platform state to another.
- `upgrade-path-mechanism` [understanding, medium] Front: How does Upgrade Path move between supported versions without a full rebuild?
  Back: Checks the current state, validates supported transitions, and then applies the new version while preserving or migrating supported data.
- `upgrade-path-scenario` [application, medium] Front: Scenario: A deployment decision depends on whether one system version can move to another without a full reinstall. Which component or concept best fits?
  Back: Upgrade Path — Reduces deployment risk by identifying which transitions can be performed without a full rebuild.

### Command Line (`command-line`)

- `command-line-definition` [definition, easy] Front: What is Command Line?
  Back: Text-based interface for executing operating system commands.
- `command-line-mechanism` [understanding, medium] Front: How does Command Line parse commands and launch the requested programs?
  Back: Reads typed commands, parses options and arguments, then executes programs within the current shell environment.
- `command-line-scenario` [application, medium] Front: Scenario: An administrator wants to type commands directly instead of working through a GUI. Which component or concept best fits?
  Back: Command Line — Accepts typed commands, arguments, and pipelines for direct interaction with operating system utilities.

### PowerShell (`powershell`)

- `powershell-definition` [definition, easy] Front: What is PowerShell?
  Back: Windows automation shell and scripting language for system administration.
- `powershell-mechanism` [understanding, medium] Front: How does PowerShell pass structured objects through a command pipeline?
  Back: Pipelines structured objects between commands so output can be filtered, transformed, and reused without plain-text parsing.
- `powershell-scenario` [application, medium] Front: Scenario: A Windows admin wants commands to pass structured objects down a pipeline instead of raw text only. Which component or concept best fits?
  Back: PowerShell — Runs cmdlets, pipelines, and scripts against Windows objects for administration and automation tasks.

### Service Management (`service-management`)

- `service-management-definition` [definition, easy] Front: What is Service Management?
  Back: Practice of monitoring, starting, stopping, and configuring background services.
- `service-management-mechanism` [understanding, medium] Front: How does Service Management control background services and their state?
  Back: Starts, stops, enables, and monitors background services using a controller that tracks state and dependencies.
- `service-management-scenario` [application, medium] Front: Scenario: A background service must be started, stopped, enabled, or checked for status. Which component or concept best fits?
  Back: Service Management — Starts, stops, enables, and monitors background services that provide persistent system functions.

### Permissions (`permissions`)

- `permissions-definition` [definition, easy] Front: What is Permissions?
  Back: Rules that determine which users or groups can read, write, execute, or change an object.
- `permissions-mechanism` [understanding, medium] Front: How does Permissions check identity against assigned rights before allowing access?
  Back: The system compares the requesting identity against assigned rights and then allows or denies the requested action.
- `permissions-scenario` [application, medium] Front: Scenario: A file should be readable by some users but not editable by everyone else. Which component or concept best fits?
  Back: Permissions — Limit actions on files and resources so access stays appropriate to the task and role.

### Package Manager (`package-manager`)

- `package-manager-definition` [definition, easy] Front: What is Package Manager?
  Back: Tool that installs, updates, and removes software packages with dependency handling.
- `package-manager-mechanism` [understanding, medium] Front: How does Package Manager install software with repository metadata and dependencies?
  Back: Resolves dependencies, verifies package sources, and installs or updates software using repository metadata.
- `package-manager-scenario` [application, medium] Front: Scenario: Software must be installed and updated while resolving dependencies from trusted repositories. Which component or concept best fits?
  Back: Package Manager — Retrieves packages, resolves dependencies, verifies sources, and installs or updates software consistently.


## Week 04 - A+ Core 2: security, support professionalism, and troubleshooting method

- Phase: Foundation
- Deliverable: Three troubleshooting playbooks
- Checkpoint: Can follow a support process and document incidents clearly.
- Study-week relationship: The ordered glossary terms for Week 04 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Password Policy (`password-policy`)

- `password-policy-definition` [definition, easy] Front: What is Password Policy?
  Back: Set of rules that governs how passwords are created, changed, and managed across an environment.
- `password-policy-mechanism` [understanding, medium] Front: How does Password Policy enforce consistent credential rules across accounts?
  Back: Applies requirements for password creation and lifecycle events, then enforces those rules when users set or change credentials.
- `password-policy-scenario` [application, medium] Front: Scenario: An organization wants clear rules for how users create and update their credentials. Which component or concept best fits?
  Back: Password Policy — Reduces weak credential choices and creates a consistent baseline for account security.

### Account Lockout (`account-lockout`)

- `account-lockout-definition` [definition, easy] Front: What is Account Lockout?
  Back: Protective control that temporarily blocks sign-in attempts after repeated authentication failures.
- `account-lockout-mechanism` [understanding, medium] Front: How does Account Lockout stop repeated failed sign-in attempts?
  Back: Counts failed sign-in attempts, crosses a configured threshold, and then denies further logins until the timer or reset condition is met.
- `account-lockout-scenario` [application, medium] Front: Scenario: A system must temporarily block further logins after too many bad password attempts. Which component or concept best fits?
  Back: Account Lockout — Slows brute-force guessing and alerts teams to suspicious login activity.

### Malware (`malware`)

- `malware-definition` [definition, easy] Front: What is Malware?
  Back: Malicious software designed to disrupt systems, steal data, or gain unauthorized control.
- `malware-mechanism` [understanding, medium] Front: How does Malware execute a payload and then persist, spread, or steal data?
  Back: Executes code on a host, then persists, spreads, steals, encrypts, or manipulates data depending on its payload logic.
- `malware-scenario` [application, medium] Front: Scenario: A program is designed to steal, disrupt, or persist on a host without authorization. Which component or concept best fits?
  Back: Malware — Executes malicious instructions that steal data, disrupt operations, establish persistence, or enable remote control.

### Patch Management (`patch-management`)

- `patch-management-definition` [definition, easy] Front: What is Patch Management?
  Back: Process for testing, deploying, and verifying software updates.
- `patch-management-mechanism` [understanding, medium] Front: How does Patch Management remove known flaws through a tested update cycle?
  Back: Identifies missing fixes, deploys approved updates, and verifies installation so known vulnerabilities are removed systematically.
- `patch-management-scenario` [application, medium] Front: Scenario: A team needs the process that finds, tests, deploys, and verifies security updates. Which component or concept best fits?
  Back: Patch Management — Identifies missing updates, tests fixes, schedules deployment, and verifies installation across managed assets.

### Security Awareness (`security-awareness`)

- `security-awareness-definition` [definition, easy] Front: What is Security Awareness?
  Back: Training and reinforcement that helps users recognize and avoid unsafe behavior.
- `security-awareness-mechanism` [understanding, medium] Front: How does Security Awareness help users recognize risky behavior before acting?
  Back: Uses examples, reminders, and repeated practice so users recognize warning signs before acting.
- `security-awareness-scenario` [application, medium] Front: Scenario: A team wants users to notice suspicious messages and follow safer habits in daily work. Which component or concept best fits?
  Back: Security Awareness — Reduces avoidable mistakes by teaching people how to spot risky requests and follow safe habits.

### Ticketing (`ticketing`)

- `ticketing-definition` [definition, easy] Front: What is Ticketing?
  Back: Systematic tracking of support work through numbered cases, status changes, and recorded actions.
- `ticketing-mechanism` [understanding, medium] Front: How does Ticketing track issue state and actions over time?
  Back: Creates a case record, updates status as work progresses, and preserves notes so others can continue or review the work.
- `ticketing-scenario` [application, medium] Front: Scenario: A support issue needs a trackable case record, owner, status, and history. Which component or concept best fits?
  Back: Ticketing — Organizes requests so issues can be prioritized, handed off, and audited consistently.

### Documentation (`documentation`)

- `documentation-definition` [definition, easy] Front: What is Documentation?
  Back: Written record of configurations, procedures, findings, or changes that explains what was done and why.
- `documentation-mechanism` [understanding, medium] Front: How does Documentation capture facts and decisions for later reuse?
  Back: Captures relevant facts, decisions, and steps in a shared record so future work starts from known context instead of memory.
- `documentation-scenario` [application, medium] Front: Scenario: A team needs a written record of what was changed, observed, and decided. Which component or concept best fits?
  Back: Documentation — Preserves knowledge so support and security work can be repeated, handed off, and audited.

### Change Management (`change-management`)

- `change-management-definition` [definition, easy] Front: What is Change Management?
  Back: Controlled process for proposing, reviewing, approving, implementing, and validating a change.
- `change-management-mechanism` [understanding, medium] Front: How does Change Management move a change from request through approval to validation?
  Back: Records the request, evaluates risk and approval, applies the change in a planned window, and verifies the result afterward.
- `change-management-scenario` [application, medium] Front: Scenario: A risky system change needs approval, scheduling, and post-change validation before it is considered complete. Which component or concept best fits?
  Back: Change Management — Reduces unintended outages and security regressions when systems or settings are modified.

### Troubleshooting Methodology (`troubleshooting-method`)

- `troubleshooting-method-definition` [definition, easy] Front: What is Troubleshooting Methodology?
  Back: Structured step-by-step process for diagnosing and resolving technical issues.
- `troubleshooting-method-mechanism` [understanding, medium] Front: How does Troubleshooting Methodology test likely causes without making random changes?
  Back: Defines a sequence of observe, hypothesize, test, and verify so problems are isolated without random changes.
- `troubleshooting-method-scenario` [application, medium] Front: Scenario: A technician wants to test likely causes in order instead of making random changes. Which component or concept best fits?
  Back: Troubleshooting Methodology — Follows defined stages to identify symptoms, test causes, implement fixes, and verify normal operation.

### Knowledge Base (`knowledge-base`)

- `knowledge-base-definition` [definition, easy] Front: What is Knowledge Base?
  Back: Shared collection of documented solutions, procedures, and reference notes for recurring issues.
- `knowledge-base-mechanism` [understanding, medium] Front: How does Knowledge Base turn solved issues into reusable guidance?
  Back: Stores structured articles and updates them over time so staff can search, follow, and improve known solutions.
- `knowledge-base-scenario` [application, medium] Front: Scenario: A help desk wants documented fixes that staff can search and reuse instead of solving the same problem from scratch. Which component or concept best fits?
  Back: Knowledge Base — Speeds support work by making proven fixes and guidance easy to reuse.

### Backup Strategy (`backup-strategy`)

- `backup-strategy-definition` [definition, easy] Front: What is Backup Strategy?
  Back: Planned approach for copying and retaining data so it can be restored after loss or corruption.
- `backup-strategy-mechanism` [understanding, medium] Front: How does Backup Strategy keep recovery practical after data loss?
  Back: Chooses what to back up, where to store copies, and how often to test restoration so recovery remains practical.
- `backup-strategy-scenario` [application, medium] Front: Scenario: A team needs a planned way to preserve important data and restore it after deletion or system failure. Which component or concept best fits?
  Back: Backup Strategy — Protects business continuity by ensuring important data can be recovered after failure, deletion, or attack.


## Week 05 - Linux ramp-up and first VM build

- Phase: Foundation
- Deliverable: Ubuntu VM + Linux command cheat sheet
- Checkpoint: Can navigate Linux comfortably enough to start labs and tooling.
- Study-week relationship: The ordered glossary terms for Week 05 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Linux Kernel (`linux-kernel`)

- `linux-kernel-definition` [definition, easy] Front: What is Linux Kernel?
  Back: Core component of Linux that manages hardware access, processes, and memory.
- `linux-kernel-mechanism` [understanding, medium] Front: How does Linux Kernel bridge user processes and hardware resources?
  Back: Handles process scheduling, memory management, device drivers, and system calls between hardware and user space.
- `linux-kernel-scenario` [application, medium] Front: Scenario: A Linux system needs the core software layer that schedules processes and manages hardware access. Which component or concept best fits?
  Back: Linux Kernel — Handles scheduling, memory management, drivers, and system calls between software and hardware resources.

### Shell (`shell`)

- `shell-definition` [definition, easy] Front: What is Shell?
  Back: Command interpreter used to interact with the operating system.
- `shell-mechanism` [understanding, medium] Front: How does Shell interpret commands and expand syntax before execution?
  Back: Interprets typed commands, expands variables or wildcards, and launches programs in the current session context.
- `shell-scenario` [application, medium] Front: Scenario: A user needs the interpreter that reads commands and launches programs in a terminal session. Which component or concept best fits?
  Back: Shell — Interprets user commands, expands syntax, and launches programs within the current operating system session.

### Command Line (`command-line`)

- `command-line-definition` [definition, easy] Front: What is Command Line?
  Back: Text-based interface for executing operating system commands.
- `command-line-mechanism` [understanding, medium] Front: How does Command Line parse commands and launch the requested programs?
  Back: Reads typed commands, parses options and arguments, then executes programs within the current shell environment.
- `command-line-scenario` [application, medium] Front: Scenario: An administrator wants to type commands directly instead of working through a GUI. Which component or concept best fits?
  Back: Command Line — Accepts typed commands, arguments, and pipelines for direct interaction with operating system utilities.

### Linux Permissions (`linux-permissions`)

- `linux-permissions-definition` [definition, easy] Front: What is Linux Permissions?
  Back: Read/write/execute access model controlling file and directory operations.
- `linux-permissions-mechanism` [understanding, medium] Front: How does Linux Permissions work step by step?
  Back: Apply owner, group, and other permission bits that the kernel checks before allowing file operations.
- `linux-permissions-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: Linux Permissions — Evaluates ownership and permission bits before allowing file or directory operations on Linux.

### sudo (`sudo`)

- `sudo-definition` [definition, easy] Front: What is sudo?
  Back: Command that allows approved users to run tasks with elevated privileges.
- `sudo-mechanism` [understanding, medium] Front: How does sudo check policy before running a command with elevated rights?
  Back: Checks policy, logs the request, and runs the command with elevated identity only if the user is authorized.
- `sudo-scenario` [application, medium] Front: Scenario: A standard user must run one administrative command without signing in as the root account. Which component or concept best fits?
  Back: sudo — Temporarily runs a command with elevated privileges according to configured authorization policies.

### Package Manager (`package-manager`)

- `package-manager-definition` [definition, easy] Front: What is Package Manager?
  Back: Tool that installs, updates, and removes software packages with dependency handling.
- `package-manager-mechanism` [understanding, medium] Front: How does Package Manager install software with repository metadata and dependencies?
  Back: Resolves dependencies, verifies package sources, and installs or updates software using repository metadata.
- `package-manager-scenario` [application, medium] Front: Scenario: Software must be installed and updated while resolving dependencies from trusted repositories. Which component or concept best fits?
  Back: Package Manager — Retrieves packages, resolves dependencies, verifies sources, and installs or updates software consistently.

### Process (`process`)

- `process-definition` [definition, easy] Front: What is Process?
  Back: Running program instance with its own state and resource usage.
- `process-mechanism` [understanding, medium] Front: How does Process move work between runnable, running, and waiting states?
  Back: Allocates memory, execution state, and resources to a running program while the scheduler manages CPU time.
- `process-scenario` [application, medium] Front: Scenario: An administrator needs the operating system unit that represents a running or scheduled program. Which component or concept best fits?
  Back: Process — Uses an isolated execution context with memory, threads, and permissions while a program runs.

### Users and Groups (`users-and-groups`)

- `users-and-groups-definition` [definition, easy] Front: What is Users and Groups?
  Back: Account and membership structure used to assign ownership and permissions in multi-user systems.
- `users-and-groups-mechanism` [understanding, medium] Front: How does Users and Groups apply shared permissions across multiple accounts?
  Back: Each account carries a user identity and group memberships, and the system checks those identities when enforcing permissions.
- `users-and-groups-scenario` [application, medium] Front: Scenario: A Linux admin wants to grant shared access rights to several accounts at once. Which component or concept best fits?
  Back: Users and Groups — Simplifies access administration by granting rights to groups instead of managing every user separately.

### Virtual Machine (`virtual-machine`)

- `virtual-machine-definition` [definition, easy] Front: What is Virtual Machine?
  Back: Software-defined computer running an operating system inside a host system.
- `virtual-machine-mechanism` [understanding, medium] Front: How does Virtual Machine run a guest system on virtualized hardware?
  Back: Runs a guest OS on virtualized hardware abstractions so workloads remain isolated from the host and from each other.
- `virtual-machine-scenario` [application, medium] Front: Scenario: A lab needs an isolated guest operating system running inside a host computer. Which component or concept best fits?
  Back: Virtual Machine — Runs a guest operating system with emulated hardware isolated from the underlying host environment.

### VirtualBox (`virtualbox`)

- `virtualbox-definition` [definition, easy] Front: What is VirtualBox?
  Back: Desktop virtualization platform for running lab virtual machines.
- `virtualbox-mechanism` [understanding, medium] Front: How does VirtualBox work step by step?
  Back: Uses a host hypervisor, virtual hardware profiles, and disk images to start and manage guest operating systems.
- `virtualbox-scenario` [application, medium] Front: Scenario: A student needs the desktop tool used to create and run guest machines on a personal computer. Which component or concept best fits?
  Back: VirtualBox — Creates virtual machines, attaches virtual hardware, and manages snapshots for desktop lab environments.

### SSH (`ssh`)

- `ssh-definition` [definition, easy] Front: What is SSH?
  Back: Secure Shell protocol for encrypted remote administration.
- `ssh-mechanism` [understanding, medium] Front: How does SSH authenticate a remote session and protect its traffic?
  Back: Negotiates encryption and host identity, authenticates the user, then carries terminal or file traffic through the secure channel.
- `ssh-scenario` [application, medium] Front: Scenario: A technician needs an encrypted remote terminal session instead of plaintext remote access. Which component or concept best fits?
  Back: SSH — Creates an encrypted remote session for command execution, file transfer, and administrative access.


## Week 06 - Networking foundations: models, media, devices, and topologies

- Phase: Networking
- Deliverable: Packet-journey diagram
- Checkpoint: Can describe how data moves through a simple network.
- Study-week relationship: The ordered glossary terms for Week 06 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### LAN (`lan`)

- `lan-definition` [definition, easy] Front: What is LAN?
  Back: Local area network that connects devices across a limited physical space such as a room, office, or campus.
- `lan-mechanism` [understanding, medium] Front: How does LAN keep nearby systems communicating on one local network?
  Back: Uses local switching and addressing so devices exchange frames directly across a contained network segment.
- `lan-scenario` [application, medium] Front: Scenario: Nearby devices need to communicate quickly inside one office or room. Which component or concept best fits?
  Back: LAN — Provides high-speed local communication among nearby systems and shared resources.

### WAN (`wan`)

- `wan-definition` [definition, easy] Front: What is WAN?
  Back: Wide area network that connects distant sites across provider infrastructure or large geographic areas.
- `wan-mechanism` [understanding, medium] Front: How does WAN connect distant sites across routed links?
  Back: Uses routed links across carrier or internet paths so separate local networks can exchange traffic over distance.
- `wan-scenario` [application, medium] Front: Scenario: Two distant sites need to exchange traffic across provider infrastructure. Which component or concept best fits?
  Back: WAN — Carries traffic between remote networks that cannot be joined by one local switching domain.

### OSI Model (`osi-model`)

- `osi-model-definition` [definition, easy] Front: What is OSI Model?
  Back: Seven-layer reference model used to describe how network communication functions.
- `osi-model-mechanism` [understanding, medium] Front: How does OSI Model separate network communication into analyzable layers?
  Back: Breaks communication into layers so encapsulation, addressing, transport, and applications can be analyzed one function at a time.
- `osi-model-scenario` [application, medium] Front: Scenario: A student wants the reference model that separates networking functions into seven layers for troubleshooting. Which component or concept best fits?
  Back: OSI Model — Helps learners and technicians separate networking tasks by layer during design and troubleshooting.

### TCP/IP Model (`tcp-ip-model`)

- `tcp-ip-model-definition` [definition, easy] Front: What is TCP/IP Model?
  Back: Practical layered model used to describe how internet protocols work together.
- `tcp-ip-model-mechanism` [understanding, medium] Front: How does TCP/IP Model trace packet flow across the practical internet stack?
  Back: Organizes communication into link, internet, transport, and application roles so packet flow can be traced across the stack.
- `tcp-ip-model-scenario` [application, medium] Front: Scenario: An analyst wants the practical stack used to describe real internet protocols. Which component or concept best fits?
  Back: TCP/IP Model — Groups real network behavior into layers that are easier to implement and troubleshoot.

### Network Media (`network-media`)

- `network-media-definition` [definition, easy] Front: What is Network Media?
  Back: Physical transmission medium that carries network signals, such as copper, fiber, or radio.
- `network-media-mechanism` [understanding, medium] Front: How does Network Media transport encoded bits across copper, fiber, or wireless links?
  Back: Encodes data as electrical, light, or radio signals and carries that signal across a cable or wireless channel.
- `network-media-scenario` [application, medium] Front: Scenario: A link design depends on whether data travels over copper, fiber, or radio. Which component or concept best fits?
  Back: Network Media — Provides the path that network frames or bits travel across between interfaces.

### Network Interface Card (`network-interface-card`)

- `network-interface-card-definition` [definition, easy] Front: What is Network Interface Card?
  Back: Hardware adapter that gives a device a physical or wireless connection to a network.
- `network-interface-card-mechanism` [understanding, medium] Front: How does Network Interface Card convert host data into local network traffic?
  Back: Converts device data into network signaling on the local medium and receives incoming traffic for the host.
- `network-interface-card-scenario` [application, medium] Front: Scenario: A computer needs the hardware adapter that actually connects it to Ethernet or wireless service. Which component or concept best fits?
  Back: Network Interface Card — Provides the interface that sends and receives frames or signals on the chosen medium.

### Copper Cabling (`copper-cabling`)

- `copper-cabling-definition` [definition, easy] Front: What is Copper Cabling?
  Back: Network cabling medium that carries data as electrical signals over metal conductors.
- `copper-cabling-mechanism` [understanding, medium] Front: How does Copper Cabling carry encoded data between nearby network devices?
  Back: Sends encoded electrical pulses across twisted conductors so connected interfaces can transmit and receive bits.
- `copper-cabling-scenario` [application, medium] Front: Scenario: A local network needs the wired medium that carries data as electrical signals between ports. Which component or concept best fits?
  Back: Copper Cabling — Provides common local connectivity for endpoints, switches, and other nearby network devices.

### Fiber Optic (`fiber-optic`)

- `fiber-optic-definition` [definition, easy] Front: What is Fiber Optic?
  Back: Network medium that carries data as pulses of light through glass or plastic strands.
- `fiber-optic-mechanism` [understanding, medium] Front: How does Fiber Optic transmit data as light over longer distances?
  Back: Transmits encoded light through the fiber core, and receivers convert the arriving light pulses back into data.
- `fiber-optic-scenario` [application, medium] Front: Scenario: A link needs high bandwidth over distance while resisting electrical interference. Which component or concept best fits?
  Back: Fiber Optic — Supports long distances and high bandwidth with low electrical interference.

### Packet (`packet`)

- `packet-definition` [definition, easy] Front: What is Packet?
  Back: Formatted unit of network data that carries addressing and payload information between systems.
- `packet-mechanism` [understanding, medium] Front: How does Packet carry payload and forwarding data from hop to hop?
  Back: Wraps payload data with header fields, travels hop by hop, and is examined at each stage for forwarding decisions.
- `packet-scenario` [application, medium] Front: Scenario: A network explanation needs the basic unit that travels across routed paths with addressing information attached. Which component or concept best fits?
  Back: Packet — Lets routers and hosts move traffic in manageable pieces across network paths.

### Protocol (`protocol`)

- `protocol-definition` [definition, easy] Front: What is Protocol?
  Back: Agreed communication rule set that defines how systems exchange data for a specific purpose.
- `protocol-mechanism` [understanding, medium] Front: How does Protocol give both sides a shared expectation for communication?
  Back: Defines message structure and expected behavior so each side knows what to send, receive, and do next.
- `protocol-scenario` [application, medium] Front: Scenario: Two systems need a common rule set for what to send, what to expect back, and what to do next. Which component or concept best fits?
  Back: Protocol — Lets different products interoperate because both sides follow the same expectations for communication.

### Bridge (`bridge`)

- `bridge-definition` [definition, easy] Front: What is Bridge?
  Back: Layer 2 device that connects network segments and forwards local traffic between them.
- `bridge-mechanism` [understanding, medium] Front: How does Bridge connect local segments without routing between subnets?
  Back: Receives a frame on one segment, checks the link-layer destination, and forwards the traffic only to the needed segment.
- `bridge-scenario` [application, medium] Front: Scenario: Two local network segments need to be linked at Layer 2 without using a router. Which component or concept best fits?
  Back: Bridge — Extends local connectivity while still making forwarding decisions based on link-layer information.

### Network Topology (`network-topology`)

- `network-topology-definition` [definition, easy] Front: What is Network Topology?
  Back: Physical or logical arrangement of network devices and connections.
- `network-topology-mechanism` [understanding, medium] Front: How does Network Topology work step by step?
  Back: Describes how links and nodes connect, which determines traffic paths, redundancy, and failure impact.
- `network-topology-scenario` [application, medium] Front: Scenario: A network task depends on choosing the correct protocol, service, or device. Which component or concept best fits?
  Back: Network Topology — Describes how hosts, links, and network devices connect and communicate across an environment.


## Week 07 - Ethernet, switching, routing, and gateways

- Phase: Networking
- Deliverable: Layer 2 vs Layer 3 comparison sheet
- Checkpoint: Can explain when a switch is enough and when a router is required.
- Study-week relationship: The ordered glossary terms for Week 07 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Ethernet Frame (`ethernet-frame`)

- `ethernet-frame-definition` [definition, easy] Front: What is Ethernet Frame?
  Back: Data-link encapsulation format used on Ethernet networks.
- `ethernet-frame-mechanism` [understanding, medium] Front: How does Ethernet Frame wrap payload data for local delivery?
  Back: Wraps payload data with MAC addresses and control fields so switches and receivers can forward and validate it.
- `ethernet-frame-scenario` [application, medium] Front: Scenario: Payload data must be wrapped for delivery on one local wired segment. Which component or concept best fits?
  Back: Ethernet Frame — Encapsulates payload data with source, destination, type, and integrity fields for local network delivery.

### MAC Address (`mac-address`)

- `mac-address-definition` [definition, easy] Front: What is MAC Address?
  Back: Hardware identifier used by network interfaces on local segments.
- `mac-address-mechanism` [understanding, medium] Front: How does MAC Address identify one interface on a local segment?
  Back: Identifies a network interface at layer 2 so frames can be delivered on the local segment.
- `mac-address-scenario` [application, medium] Front: Scenario: A switch must identify the correct local interface for a frame destination. Which component or concept best fits?
  Back: MAC Address — Identifies a local network interface at Layer 2 for switching and frame delivery decisions.

### ARP (`arp`)

- `arp-definition` [definition, easy] Front: What is ARP?
  Back: Address Resolution Protocol that maps IPv4 addresses to local MAC addresses on a LAN.
- `arp-mechanism` [understanding, medium] Front: How does ARP learn a local hardware address for an IPv4 destination?
  Back: Broadcasts a question for an IPv4 address, receives the matching MAC reply, and caches the mapping for later frames.
- `arp-scenario` [application, medium] Front: Scenario: A host knows an IPv4 destination but still needs the local hardware address before it can send the frame. Which component or concept best fits?
  Back: ARP — Lets a host deliver a frame to the correct local interface when it only knows the IPv4 destination.

### Broadcast Domain (`broadcast-domain`)

- `broadcast-domain-definition` [definition, easy] Front: What is Broadcast Domain?
  Back: Set of interfaces that receive the same Layer 2 broadcast traffic.
- `broadcast-domain-mechanism` [understanding, medium] Front: How does Broadcast Domain determine which interfaces receive Layer 2 broadcasts?
  Back: Switches flood broadcasts within the same VLAN or segment, but routers and segmentation boundaries prevent the traffic from crossing further.
- `broadcast-domain-scenario` [application, medium] Front: Scenario: A design question depends on how far local broadcasts will travel before a boundary stops them. Which component or concept best fits?
  Back: Broadcast Domain — Defines how far broadcasts travel before a router or other boundary stops them.

### Switch (`switch`)

- `switch-definition` [definition, easy] Front: What is Switch?
  Back: Layer 2 device that forwards frames based on MAC address tables.
- `switch-mechanism` [understanding, medium] Front: How does Switch learn address-to-port mappings and forward traffic locally?
  Back: Learns MAC-to-port mappings from incoming frames and forwards later traffic only toward the needed port.
- `switch-scenario` [application, medium] Front: Scenario: Traffic should stay on the local network and be forwarded by learned interface mappings rather than routed between subnets. Which component or concept best fits?
  Back: Switch — Learns MAC addresses on ports and forwards frames only toward the correct destination segment.

### VLAN (`vlan`)

- `vlan-definition` [definition, easy] Front: What is VLAN?
  Back: Virtual LAN used to segment broadcast domains on switched networks.
- `vlan-mechanism` [understanding, medium] Front: How does VLAN separate one switch fabric into distinct broadcast groups?
  Back: Tags frames with a logical network ID so one switch fabric can carry multiple isolated broadcast domains.
- `vlan-scenario` [application, medium] Front: Scenario: One physical switching environment needs separate logical broadcast groups. Which component or concept best fits?
  Back: VLAN — Tags switch traffic to create separate logical broadcast domains across shared physical infrastructure.

### Spanning Tree Protocol (`stp`)

- `stp-definition` [definition, easy] Front: What is Spanning Tree Protocol?
  Back: Protocol that prevents switching loops by managing redundant paths.
- `stp-mechanism` [understanding, medium] Front: How does Spanning Tree Protocol block redundant links before loops form?
  Back: Elects a root bridge and blocks redundant links so layer 2 loops do not form.
- `stp-scenario` [application, medium] Front: Scenario: A redundant Layer 2 design must avoid loops and broadcast storms. Which component or concept best fits?
  Back: Spanning Tree Protocol — Elects a loop-free forwarding tree and blocks redundant switch paths to prevent broadcast storms.

### Router (`router`)

- `router-definition` [definition, easy] Front: What is Router?
  Back: Layer 3 device that forwards packets between networks.
- `router-mechanism` [understanding, medium] Front: How does Router choose a next hop from destination networks?
  Back: Reads destination networks, consults routes, and forwards packets out the next interface toward the destination.
- `router-scenario` [application, medium] Front: Scenario: Traffic must leave one subnet and be forwarded toward another network. Which component or concept best fits?
  Back: Router — Examines destination networks and forwards packets toward the next hop using Layer 3 decisions.

### Default Gateway (`default-gateway`)

- `default-gateway-definition` [definition, easy] Front: What is Default Gateway?
  Back: Router path used when a host sends traffic outside its local subnet.
- `default-gateway-mechanism` [understanding, medium] Front: How does Default Gateway move off-subnet traffic toward a router?
  Back: Receives packets for off-subnet destinations and forwards them according to its routing table.
- `default-gateway-scenario` [application, medium] Front: Scenario: A host must send traffic toward a router because the destination is outside the local subnet. Which component or concept best fits?
  Back: Default Gateway — Sends off-subnet packets to a router interface that can reach remote networks.

### Routing Table (`routing-table`)

- `routing-table-definition` [definition, easy] Front: What is Routing Table?
  Back: Lookup data used by hosts and routers to choose next-hop paths.
- `routing-table-mechanism` [understanding, medium] Front: How does Routing Table select the best next hop for a destination?
  Back: Stores destination prefixes and next hops so the device can choose the best route for each packet.
- `routing-table-scenario` [application, medium] Front: Scenario: A device needs the data structure that lists destination prefixes and next hops. Which component or concept best fits?
  Back: Routing Table — Lists known networks, next hops, interfaces, and metrics used to choose forwarding paths.

### Network CLI (`network-cli`)

- `network-cli-definition` [definition, easy] Front: What is Network CLI?
  Back: Command-line interface used to view and change settings on network devices.
- `network-cli-mechanism` [understanding, medium] Front: How does Network CLI apply and verify device settings from text commands?
  Back: Accepts commands in configuration modes, applies them to the running configuration, and shows state or errors in text output.
- `network-cli-scenario` [application, medium] Front: Scenario: A switch or router must be configured and verified from a text interface. Which component or concept best fits?
  Back: Network CLI — Lets administrators configure, verify, and troubleshoot routers and switches directly.


## Week 08 - IPv4 addressing, subnetting, and address planning

- Phase: Networking
- Deliverable: Subnet worksheet + address plan
- Checkpoint: Can read and plan IPv4 subnets for small environments.
- Study-week relationship: The ordered glossary terms for Week 08 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### IPv4 (`ipv4`)

- `ipv4-definition` [definition, easy] Front: What is IPv4?
  Back: 32-bit addressing protocol widely used for internet and private networks.
- `ipv4-mechanism` [understanding, medium] Front: How does IPv4 route packets with network and host portions?
  Back: Uses 32-bit addresses and header fields so routers can forward packets between networks.
- `ipv4-scenario` [application, medium] Front: Scenario: A network is using the common addressing protocol with network and host portions in each address. Which component or concept best fits?
  Back: IPv4 — Represents addresses in 32 bits and forwards packets using hierarchical network and host portions.

### CIDR (`cidr`)

- `cidr-definition` [definition, easy] Front: What is CIDR?
  Back: Classless Inter-Domain Routing notation for subnet masks and prefixes.
- `cidr-mechanism` [understanding, medium] Front: How does CIDR express the network prefix length directly?
  Back: Expresses the network prefix length so devices can derive which address bits identify the network and which identify hosts.
- `cidr-scenario` [application, medium] Front: Scenario: A subnet design needs the slash notation that states the prefix length directly. Which component or concept best fits?
  Back: CIDR — Uses prefix length notation to describe network size and route aggregation more efficiently than classful addressing.

### Subnet Mask (`subnet-mask`)

- `subnet-mask-definition` [definition, easy] Front: What is Subnet Mask?
  Back: Bitmask that separates network and host portions of an IP address.
- `subnet-mask-mechanism` [understanding, medium] Front: How does Subnet Mask mark which bits belong to the network?
  Back: Marks which address bits are network bits so hosts can decide whether traffic is local or remote.
- `subnet-mask-scenario` [application, medium] Front: Scenario: A host must determine which bits describe the network and which bits describe the host. Which component or concept best fits?
  Back: Subnet Mask — Marks which IPv4 bits represent the network versus host portion of an address.

### Network ID (`network-id`)

- `network-id-definition` [definition, easy] Front: What is Network ID?
  Back: The network portion of an IPv4 subnet that identifies the subnet itself rather than an individual host.
- `network-id-mechanism` [understanding, medium] Front: How does Network ID derive the subnet identifier from an address and mask?
  Back: Applies the subnet mask to an address, keeps the network bits, and treats the result as the subnet identifier.
- `network-id-scenario` [application, medium] Front: Scenario: An addressing task needs the value that identifies the subnet itself, not an individual machine. Which component or concept best fits?
  Back: Network ID — Helps devices and administrators distinguish one subnet from another.

### Host Range (`host-range`)

- `host-range-definition` [definition, easy] Front: What is Host Range?
  Back: Set of usable host addresses inside a subnet, excluding reserved network and broadcast values.
- `host-range-mechanism` [understanding, medium] Front: How does Host Range determine which addresses are usable by hosts?
  Back: Starts after the network address, ends before the broadcast address, and provides the usable values between those boundaries.
- `host-range-scenario` [application, medium] Front: Scenario: An address planning task needs the usable host values inside a subnet. Which component or concept best fits?
  Back: Host Range — Defines which addresses can be assigned to devices on that subnet.

### Broadcast Address (`broadcast-address`)

- `broadcast-address-definition` [definition, easy] Front: What is Broadcast Address?
  Back: Special IPv4 address that reaches every host on a local subnet.
- `broadcast-address-mechanism` [understanding, medium] Front: How does Broadcast Address reach every host on the local subnet?
  Back: Sets every host bit to one for the subnet, and switches then flood the resulting frame across the local segment.
- `broadcast-address-scenario` [application, medium] Front: Scenario: An addressing task needs the one IPv4 value that reaches every host on the local subnet. Which component or concept best fits?
  Back: Broadcast Address — Lets a sender deliver one message to all hosts in the same broadcast domain.

### Private IP (`private-ip`)

- `private-ip-definition` [definition, easy] Front: What is Private IP?
  Back: Non-routable address range intended for internal networks.
- `private-ip-mechanism` [understanding, medium] Front: How does Private IP work step by step?
  Back: Uses non-routable ranges that stay inside local networks and usually reach the internet through NAT.
- `private-ip-scenario` [application, medium] Front: Scenario: A network task depends on choosing the correct protocol, service, or device. Which component or concept best fits?
  Back: Private IP — Uses reserved address ranges internally, requiring routing controls or translation before internet communication.

### Public IP (`public-ip`)

- `public-ip-definition` [definition, easy] Front: What is Public IP?
  Back: Globally routable address visible on the internet.
- `public-ip-mechanism` [understanding, medium] Front: How does Public IP work step by step?
  Back: Uses globally routable addressing so internet systems can send packets directly toward the exposed endpoint.
- `public-ip-scenario` [application, medium] Front: Scenario: A network task depends on choosing the correct protocol, service, or device. Which component or concept best fits?
  Back: Public IP — Provides an internet-routable address reachable across external networks according to upstream routing.

### Subnetting (`subnetting`)

- `subnetting-definition` [definition, easy] Front: What is Subnetting?
  Back: Practice of dividing networks into smaller addressable segments.
- `subnetting-mechanism` [understanding, medium] Front: How does Subnetting split one address block into smaller subnets?
  Back: Borrows host bits to create smaller networks, trading host capacity for more controlled address groups.
- `subnetting-scenario` [application, medium] Front: Scenario: A network must be divided into smaller groups without wasting address space. Which component or concept best fits?
  Back: Subnetting — Allocates smaller address blocks from a larger range to separate networks and conserve space.

### Address Plan (`address-plan`)

- `address-plan-definition` [definition, easy] Front: What is Address Plan?
  Back: Structured design that assigns subnets and address ranges to users, devices, and network zones.
- `address-plan-mechanism` [understanding, medium] Front: How does Address Plan divide and reserve address space logically?
  Back: Divides the available space into named subnets, reserves ranges for roles, and documents gateways and usage for each segment.
- `address-plan-scenario` [application, medium] Front: Scenario: A small office needs documented subnets and reserved ranges for different device groups. Which component or concept best fits?
  Back: Address Plan — Prevents overlap and leaves room for growth while keeping related systems grouped logically.


## Week 09 - TCP, UDP, ports, DNS, DHCP, NAT, and service flow

- Phase: Networking
- Deliverable: Ports / protocols sheet v2 + trace-route notes
- Checkpoint: Can narrate the service path from 'join network' to 'page loads.'
- Study-week relationship: The ordered glossary terms for Week 09 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### TCP (`tcp`)

- `tcp-definition` [definition, easy] Front: What is TCP?
  Back: Connection-oriented transport protocol that prioritizes reliability and ordered delivery.
- `tcp-mechanism` [understanding, medium] Front: How does TCP track order and recover from missing data?
  Back: Establishes a session, tracks sequence numbers, and retransmits missing data to deliver ordered reliable streams.
- `tcp-scenario` [application, medium] Front: Scenario: An application needs reliable, ordered delivery and retransmission instead of the lowest possible overhead. Which component or concept best fits?
  Back: TCP — Establishes sessions, tracks sequence numbers, acknowledges delivery, and retransmits lost segments when needed.

### UDP (`udp`)

- `udp-definition` [definition, easy] Front: What is UDP?
  Back: Connectionless transport protocol optimized for low overhead and speed.
- `udp-mechanism` [understanding, medium] Front: How does UDP send data without connection setup or retransmission?
  Back: Wraps data with minimal transport headers and sends it without connection setup, ordering, or retransmission.
- `udp-scenario` [application, medium] Front: Scenario: A workflow can tolerate occasional loss and wants minimal transport overhead instead of connection tracking. Which component or concept best fits?
  Back: UDP — Transmits datagrams without connection setup, acknowledgments, or retransmission to minimize protocol overhead.

### Port Number (`port-number`)

- `port-number-definition` [definition, easy] Front: What is Port Number?
  Back: Transport-layer identifier that maps traffic to a specific service or listening process.
- `port-number-mechanism` [understanding, medium] Front: How does Port Number deliver network traffic to the correct service?
  Back: Labels each transport endpoint so the operating system can deliver incoming traffic to the correct socket or process.
- `port-number-scenario` [application, medium] Front: Scenario: A host is receiving network traffic and must deliver it to the correct service. Which component or concept best fits?
  Back: Port Number — Lets one host run many networked services without mixing their traffic together.

### DNS (`dns`)

- `dns-definition` [definition, easy] Front: What is DNS?
  Back: Distributed naming system that maps domain names to IP addresses and other records.
- `dns-mechanism` [understanding, medium] Front: How does DNS find record data through cached or delegated answers?
  Back: A resolver checks cache first, then queries recursive or authoritative servers until the requested record is returned.
- `dns-scenario` [application, medium] Front: Scenario: A user can reach a site by IP address but not by name. Which component or concept best fits?
  Back: DNS — Lets users and applications use human-readable names instead of memorizing numeric addresses.

### DNS Resolution (`dns-resolution`)

- `dns-resolution-definition` [definition, easy] Front: What is DNS Resolution?
  Back: Lookup process that turns a hostname into one or more usable IP addresses.
- `dns-resolution-mechanism` [understanding, medium] Front: How does DNS Resolution move from hostname to usable address data?
  Back: Checks local cache first, then queries resolvers and delegated servers until an answer or failure is returned.
- `dns-resolution-scenario` [application, medium] Front: Scenario: A client needs the lookup process that turns a hostname into an address before the connection can continue. Which component or concept best fits?
  Back: DNS Resolution — Finds the address data needed before a client can contact the intended service.

### DHCP (`dhcp`)

- `dhcp-definition` [definition, easy] Front: What is DHCP?
  Back: Protocol that automatically assigns IP settings to clients when they join a network.
- `dhcp-mechanism` [understanding, medium] Front: How does DHCP lease settings to a new client during startup?
  Back: Clients broadcast discovery messages, servers offer leases, the client requests one, and the server acknowledges the assigned settings.
- `dhcp-scenario` [application, medium] Front: Scenario: A new client joins the network but still needs an address, gateway, and DNS settings automatically. Which component or concept best fits?
  Back: DHCP — Provides addresses, gateway, DNS, and lease timing without manual configuration on every device.

### NAT (`nat`)

- `nat-definition` [definition, easy] Front: What is NAT?
  Back: Network Address Translation that maps internal addresses to external addresses.
- `nat-mechanism` [understanding, medium] Front: How does NAT rewrite addresses while tracking the return mapping?
  Back: Rewrites source or destination addresses and often ports while tracking mappings for return traffic.
- `nat-scenario` [application, medium] Front: Scenario: A private network must reach the internet without exposing every internal address directly. Which component or concept best fits?
  Back: NAT — Rewrites source or destination addresses, and sometimes ports, as traffic crosses between network boundaries.

### NTP (`ntp`)

- `ntp-definition` [definition, easy] Front: What is NTP?
  Back: Network Time Protocol service that synchronizes clocks across connected systems.
- `ntp-mechanism` [understanding, medium] Front: How does NTP bring system clocks toward a shared reference time?
  Back: Clients compare their local time to trusted servers, calculate the offset, and adjust the clock toward a shared reference.
- `ntp-scenario` [application, medium] Front: Scenario: Logs from several systems must share consistent timestamps so investigators can compare them accurately. Which component or concept best fits?
  Back: NTP — Keeps timestamps consistent so logs, authentication, and troubleshooting data line up correctly.

### TCP Three-Way Handshake (`three-way-handshake`)

- `three-way-handshake-definition` [definition, easy] Front: What is TCP Three-Way Handshake?
  Back: TCP setup sequence using SYN, SYN-ACK, and ACK.
- `three-way-handshake-mechanism` [understanding, medium] Front: How does TCP Three-Way Handshake synchronize sequence numbers before data flows?
  Back: Uses SYN, SYN-ACK, and ACK exchanges to synchronize sequence numbers before data transfer begins.
- `three-way-handshake-scenario` [application, medium] Front: Scenario: Two endpoints must agree on sequence state before application data starts flowing. Which component or concept best fits?
  Back: TCP Three-Way Handshake — Synchronizes TCP sequence numbers and confirms both endpoints are ready before data transfer begins.


## Week 10 - Wireless, SOHO design, cloud, and network security basics

- Phase: Networking
- Deliverable: SOHO hardening checklist
- Checkpoint: Can explain baseline protections for a small office or home network.
- Study-week relationship: The ordered glossary terms for Week 10 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### SSID (`ssid`)

- `ssid-definition` [definition, easy] Front: What is SSID?
  Back: Wireless network name advertised by an access point.
- `ssid-mechanism` [understanding, medium] Front: How does SSID advertise a wireless network name to clients?
  Back: Advertises the network name in beacon frames so clients can discover and join the correct wireless LAN.
- `ssid-scenario` [application, medium] Front: Scenario: A client is choosing which wireless network name to join. Which component or concept best fits?
  Back: SSID — Advertises or identifies a wireless network name that clients use during association.

### Wi-Fi Standard (`wifi-standard`)

- `wifi-standard-definition` [definition, easy] Front: What is Wi-Fi Standard?
  Back: Wireless LAN specification that defines how clients and access points communicate over radio.
- `wifi-standard-mechanism` [understanding, medium] Front: How does Wi-Fi Standard coordinate channel use and client compatibility?
  Back: Defines channel use, modulation, frame handling, and negotiated features so compatible devices can associate and exchange traffic.
- `wifi-standard-scenario` [application, medium] Front: Scenario: A wireless deployment needs the specification that determines channel behavior, compatibility, and features. Which component or concept best fits?
  Back: Wi-Fi Standard — Sets compatibility, throughput, channel behavior, and security capabilities for wireless networking.

### WPA3 (`wpa3`)

- `wpa3-definition` [definition, easy] Front: What is WPA3?
  Back: Modern Wi-Fi security standard with stronger protections than earlier protocols.
- `wpa3-mechanism` [understanding, medium] Front: How does WPA3 protect a wireless session with modern key establishment?
  Back: Uses modern authentication and key establishment to protect wireless sessions against interception and offline guessing.
- `wpa3-scenario` [application, medium] Front: Scenario: A wireless deployment needs stronger protection against interception and offline password guessing than earlier Wi-Fi security options. Which component or concept best fits?
  Back: WPA3 — Protects wireless access using stronger authentication and encryption mechanisms than prior Wi-Fi standards.

### Access Point (`access-point`)

- `access-point-definition` [definition, easy] Front: What is Access Point?
  Back: Network device that bridges wireless clients onto a wired LAN.
- `access-point-mechanism` [understanding, medium] Front: How does Access Point bridge wireless clients onto the wired network?
  Back: Advertises a network name, authenticates clients, and forwards their traffic between radio channels and the wired switch path.
- `access-point-scenario` [application, medium] Front: Scenario: Wireless clients need to join the same local network as wired devices. Which component or concept best fits?
  Back: Access Point — Provides Wi-Fi coverage so wireless devices can join the local network.

### SOHO Router (`soho-router`)

- `soho-router-definition` [definition, easy] Front: What is SOHO Router?
  Back: Integrated gateway device common in small office and home networks.
- `soho-router-mechanism` [understanding, medium] Front: How does SOHO Router combine routing, switching, Wi-Fi, and NAT in one gateway?
  Back: Combines routing, NAT, DHCP, switching, and wireless control into one device for small local networks.
- `soho-router-scenario` [application, medium] Front: Scenario: A tiny office needs one device that combines routing, Wi-Fi, switching, NAT, and basic filtering. Which component or concept best fits?
  Back: SOHO Router — Combines routing, switching, wireless access, NAT, and firewall features in a small-network gateway.

### Firewall (`firewall`)

- `firewall-definition` [definition, easy] Front: What is Firewall?
  Back: Control that allows or blocks traffic based on policy rules.
- `firewall-mechanism` [understanding, medium] Front: How does Firewall apply ordered rules to allow or block traffic?
  Back: Compares traffic against ordered rules and may track connection state to permit or deny packets.
- `firewall-scenario` [application, medium] Front: Scenario: Traffic should be allowed or blocked according to ordered policy rules. Which component or concept best fits?
  Back: Firewall — Evaluates traffic against policy rules and permits, rejects, or logs connections based on criteria.

### Network Segmentation (`network-segmentation`)

- `network-segmentation-definition` [definition, easy] Front: What is Network Segmentation?
  Back: Separation of network zones to reduce lateral movement and contain impact.
- `network-segmentation-mechanism` [understanding, medium] Front: How does Network Segmentation restrict movement between zones?
  Back: Separates systems into controlled zones and restricts paths between them with routing or filtering policy.
- `network-segmentation-scenario` [application, medium] Front: Scenario: Sensitive systems should not share the same unrestricted path as guest devices or printers. Which component or concept best fits?
  Back: Network Segmentation — Divides systems into controlled zones using routing, VLANs, or firewalls to restrict lateral movement.

### VPN (`vpn`)

- `vpn-definition` [definition, easy] Front: What is VPN?
  Back: Virtual private network that creates a protected tunnel across an untrusted network.
- `vpn-mechanism` [understanding, medium] Front: How does VPN protect private traffic inside an encrypted tunnel?
  Back: Authenticates endpoints, negotiates encryption, and encapsulates private traffic inside a protected tunnel over the public path.
- `vpn-scenario` [application, medium] Front: Scenario: Remote users need protected access to internal resources across the public internet. Which component or concept best fits?
  Back: VPN — Provides secure remote access or site-to-site connectivity without exposing traffic in plaintext.

### Cloud Service Model (`cloud-service-model`)

- `cloud-service-model-definition` [definition, easy] Front: What is Cloud Service Model?
  Back: Service delivery model such as IaaS, PaaS, or SaaS that defines what the provider manages.
- `cloud-service-model-mechanism` [understanding, medium] Front: How does Cloud Service Model shift management duties up or down the stack?
  Back: Moves responsibility up or down the stack by deciding whether the provider manages infrastructure, platform components, or the full application.
- `cloud-service-model-scenario` [application, medium] Front: Scenario: A team is deciding whether the provider manages only infrastructure, the platform, or the full application. Which component or concept best fits?
  Back: Cloud Service Model — Clarifies which parts of the stack the customer controls versus what the provider operates for them.

### Shared Responsibility (`shared-responsibility`)

- `shared-responsibility-definition` [definition, easy] Front: What is Shared Responsibility?
  Back: Cloud operating model that splits security and maintenance duties between provider and customer.
- `shared-responsibility-mechanism` [understanding, medium] Front: How does Shared Responsibility split cloud security work between provider and customer?
  Back: The provider secures the managed service layers, while the customer secures the resources and settings they still control.
- `shared-responsibility-scenario` [application, medium] Front: Scenario: A cloud team is arguing over whether the provider or customer owns a security task. Which component or concept best fits?
  Back: Shared Responsibility — Clarifies who secures the platform versus who secures data, identities, and configurations.


## Week 11 - Wireshark and troubleshooting with packet evidence

- Phase: Networking
- Deliverable: Three annotated packet captures
- Checkpoint: Can use packet captures to support an explanation instead of guessing.
- Study-week relationship: The ordered glossary terms for Week 11 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Wireshark (`wireshark`)

- `wireshark-definition` [definition, easy] Front: What is Wireshark?
  Back: Packet capture and analysis tool for network troubleshooting and investigations.
- `wireshark-mechanism` [understanding, medium] Front: How does Wireshark decode captured packets into readable protocol fields?
  Back: Decodes captured packets into protocol fields so analysts can filter traffic and inspect conversations in detail.
- `wireshark-scenario` [application, medium] Front: Scenario: An analyst needs a tool that can decode captured packets and expose protocol details. Which component or concept best fits?
  Back: Wireshark — Captures packets and decodes protocol details so analysts can inspect network conversations and anomalies.

### Packet Capture (`packet-capture`)

- `packet-capture-definition` [definition, easy] Front: What is Packet Capture?
  Back: Recorded packet data collected from a network interface for inspection or troubleshooting.
- `packet-capture-mechanism` [understanding, medium] Front: How does Packet Capture copy interface traffic into a timestamped record?
  Back: A capture tool copies packets from an interface, timestamps them, and stores the traffic for filtering and review.
- `packet-capture-scenario` [application, medium] Front: Scenario: A troubleshooting case needs recorded traffic instead of guesswork about what crossed the wire. Which component or concept best fits?
  Back: Packet Capture — Gives analysts evidence of what traffic was actually sent, received, or dropped.

### PCAP (`pcap`)

- `pcap-definition` [definition, easy] Front: What is PCAP?
  Back: Packet capture file format storing recorded network traffic.
- `pcap-mechanism` [understanding, medium] Front: How does PCAP store captured packets for later analysis?
  Back: Stores captured packets with timestamps and headers so tools can replay, filter, or inspect traffic later.
- `pcap-scenario` [application, medium] Front: Scenario: Traffic from a capture session must be saved and reopened later in an analysis tool. Which component or concept best fits?
  Back: PCAP — Stores captured packets with timestamps and frame data for later analysis in supporting tools.

### Packet Filter (`packet-filter`)

- `packet-filter-definition` [definition, easy] Front: What is Packet Filter?
  Back: Query expression used to isolate relevant traffic in a capture.
- `packet-filter-mechanism` [understanding, medium] Front: How does Packet Filter match only the traffic that meets chosen rules?
  Back: Inspects header fields such as address, port, and protocol and then applies matching allow or deny rules.
- `packet-filter-scenario` [application, medium] Front: Scenario: An analyst needs to isolate only the packets that match chosen addresses, ports, or protocols. Which component or concept best fits?
  Back: Packet Filter — Applies capture expressions to packet headers so only matching traffic is displayed or stored.

### Stream Follow (`stream-follow`)

- `stream-follow-definition` [definition, easy] Front: What is Stream Follow?
  Back: Analysis feature that reassembles related packets into one readable conversation flow.
- `stream-follow-mechanism` [understanding, medium] Front: How does Stream Follow reassemble related packets into one readable flow?
  Back: Groups packets from the same flow, orders them by sequence, and reconstructs the exchanged data as one stream.
- `stream-follow-scenario` [application, medium] Front: Scenario: A packet analysis workflow needs one readable application conversation instead of many separate packets. Which component or concept best fits?
  Back: Stream Follow — Helps an analyst read an application exchange without manually stitching each packet together.

### Conversation View (`conversation-view`)

- `conversation-view-definition` [definition, easy] Front: What is Conversation View?
  Back: Summary view that groups traffic by paired endpoints and session statistics.
- `conversation-view-mechanism` [understanding, medium] Front: How does Conversation View summarize exchanges between endpoint pairs?
  Back: Aggregates packets by source and destination pair, counts frames or bytes, and presents the grouped exchange as one record.
- `conversation-view-scenario` [application, medium] Front: Scenario: An analyst needs a per-connection summary instead of reading every packet individually. Which component or concept best fits?
  Back: Conversation View — Shows which hosts talked to each other and how much traffic each exchange produced.

### Endpoint View (`endpoint-view`)

- `endpoint-view-definition` [definition, easy] Front: What is Endpoint View?
  Back: Summary view that groups traffic by host or interface seen in a capture.
- `endpoint-view-mechanism` [understanding, medium] Front: How does Endpoint View summarize traffic by host activity?
  Back: Aggregates packets by endpoint address and reports totals so busy or unusual hosts stand out quickly.
- `endpoint-view-scenario` [application, medium] Front: Scenario: A capture review needs a quick summary of which hosts were most active. Which component or concept best fits?
  Back: Endpoint View — Helps identify which systems were most active in the observed traffic.

### Traceroute (`traceroute`)

- `traceroute-definition` [definition, easy] Front: What is Traceroute?
  Back: Diagnostic command that reveals path hops to a destination.
- `traceroute-mechanism` [understanding, medium] Front: How does Traceroute reveal each router hop along a path?
  Back: Sends probes with increasing hop limits so each router that expires the packet reveals its position.
- `traceroute-scenario` [application, medium] Front: Scenario: A network issue requires identifying each hop traffic takes toward a destination. Which component or concept best fits?
  Back: Traceroute — Sends probes with increasing hop limits to reveal intermediary routers along a path.

### Ping (`ping`)

- `ping-definition` [definition, easy] Front: What is Ping?
  Back: ICMP-based connectivity test used for basic reachability checks.
- `ping-mechanism` [understanding, medium] Front: How does Ping test reachability and round-trip delay?
  Back: Sends ICMP echo requests and measures whether replies return and how long that round trip takes.
- `ping-scenario` [application, medium] Front: Scenario: A technician needs a quick basic reachability test. Which component or concept best fits?
  Back: Ping — Sends ICMP echo messages and measures replies to confirm basic reachability and delay.

### Latency (`latency`)

- `latency-definition` [definition, easy] Front: What is Latency?
  Back: Time delay between request and response across a path.
- `latency-mechanism` [understanding, medium] Front: How does Latency accumulate delay along a network path?
  Back: Accumulates delay from propagation, processing, queuing, and retransmission before data reaches the destination.
- `latency-scenario` [application, medium] Front: Scenario: A user reports that traffic arrives, but the round-trip delay still feels too slow. Which component or concept best fits?
  Back: Latency — Measures elapsed time introduced by transmission, processing, queuing, and distance across a network path.


## Week 12 - TryHackMe Pre Security and end-to-end web request capstone

- Phase: Networking
- Deliverable: End-to-end web request explainer
- Checkpoint: Can explain internet plumbing clearly enough for a manager.
- Study-week relationship: The ordered glossary terms for Week 12 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### HTTP Request (`http-request`)

- `http-request-definition` [definition, easy] Front: What is HTTP Request?
  Back: Client message sent to a web server for a resource or action.
- `http-request-mechanism` [understanding, medium] Front: How does HTTP Request send a method, target, headers, and body to a server?
  Back: Sends a method, target, headers, and optional body so a server can decide how to process the request.
- `http-request-scenario` [application, medium] Front: Scenario: A client must ask a web server for a resource or action using a method and target. Which component or concept best fits?
  Back: HTTP Request — Carries a method, target, headers, and optional body from a client to a server.

### DNS Resolution (`dns-resolution`)

- `dns-resolution-definition` [definition, easy] Front: What is DNS Resolution?
  Back: Lookup process that turns a hostname into one or more usable IP addresses.
- `dns-resolution-mechanism` [understanding, medium] Front: How does DNS Resolution move from hostname to usable address data?
  Back: Checks local cache first, then queries resolvers and delegated servers until an answer or failure is returned.
- `dns-resolution-scenario` [application, medium] Front: Scenario: A client needs the lookup process that turns a hostname into an address before the connection can continue. Which component or concept best fits?
  Back: DNS Resolution — Finds the address data needed before a client can contact the intended service.

### TLS Handshake (`tls-handshake`)

- `tls-handshake-definition` [definition, easy] Front: What is TLS Handshake?
  Back: Cryptographic negotiation that establishes secure session parameters within web, data, and cloud services.
- `tls-handshake-mechanism` [understanding, medium] Front: How does TLS Handshake negotiate trust and keys before encrypted data flows?
  Back: Negotiates algorithms, validates certificates, and derives shared session keys before encrypted application data flows.
- `tls-handshake-scenario` [application, medium] Front: Scenario: A secure connection must verify identity and agree on session keys before protected data flows. Which component or concept best fits?
  Back: TLS Handshake — Negotiates protocol version, algorithms, keys, and certificates before protected application data flows.

### Certificate (`certificate`)

- `certificate-definition` [definition, easy] Front: What is Certificate?
  Back: Digitally signed record that binds an identity to a public key.
- `certificate-mechanism` [understanding, medium] Front: How does Certificate prove identity before trusting a public key?
  Back: A trusted issuer signs identity details and a public key, and the client validates that signature before accepting the key.
- `certificate-scenario` [application, medium] Front: Scenario: A client must decide whether to trust the public key presented by a server. Which component or concept best fits?
  Back: Certificate — Lets systems verify who a server or user claims to be before trusting that key.

### Web Server (`web-server`)

- `web-server-definition` [definition, easy] Front: What is Web Server?
  Back: Service that hosts and delivers web content over HTTP/HTTPS.
- `web-server-mechanism` [understanding, medium] Front: How does Web Server accept a web request and return content or an app response?
  Back: Listens for HTTP requests, maps them to configured content or handlers, and returns responses over the network.
- `web-server-scenario` [application, medium] Front: Scenario: A service must accept a web request and return content or application output. Which component or concept best fits?
  Back: Web Server — Accepts HTTP or HTTPS requests, processes them, and returns web content or application responses.

### Reverse Proxy (`reverse-proxy`)

- `reverse-proxy-definition` [definition, easy] Front: What is Reverse Proxy?
  Back: Service that receives client requests and forwards them to backend servers.
- `reverse-proxy-mechanism` [understanding, medium] Front: How does Reverse Proxy apply front-door policy before forwarding to a backend?
  Back: Accepts client requests first, then forwards them to internal servers while applying routing, TLS, or filtering decisions.
- `reverse-proxy-scenario` [application, medium] Front: Scenario: A front-end service should accept client traffic first and then pass approved requests to internal servers. Which component or concept best fits?
  Back: Reverse Proxy — Accepts client connections, applies policies, and forwards approved requests to internal application servers.

### Session Token (`session-token`)

- `session-token-definition` [definition, easy] Front: What is Session Token?
  Back: Server-issued identifier that links a client request to an authenticated session.
- `session-token-mechanism` [understanding, medium] Front: How does Session Token bind later requests to a signed-in session?
  Back: The server issues a token after login, the client sends it on later requests, and the server checks it before serving protected actions.
- `session-token-scenario` [application, medium] Front: Scenario: A web app needs to remember that the user already signed in on earlier requests. Which component or concept best fits?
  Back: Session Token — Lets a web application remember that the user already proved identity after the initial sign-in.

### Browser (`browser`)

- `browser-definition` [definition, easy] Front: What is Browser?
  Back: Client application that requests, renders, and interacts with web content.
- `browser-mechanism` [understanding, medium] Front: How does Browser turn fetched resources into an interactive page?
  Back: Requests resources from servers, processes returned HTML, CSS, and scripts, and then renders the resulting page.
- `browser-scenario` [application, medium] Front: Scenario: A user needs the client application that requests websites and renders them locally. Which component or concept best fits?
  Back: Browser — Lets users navigate websites, submit forms, and run web applications.

### Page Rendering (`page-rendering`)

- `page-rendering-definition` [definition, easy] Front: What is Page Rendering?
  Back: Process of turning fetched web resources into the visual page a user sees.
- `page-rendering-mechanism` [understanding, medium] Front: How does Page Rendering transform markup, style, and scripts into the visible page?
  Back: Parses HTML into a document tree, applies styles and scripts, then paints the final layout to the screen.
- `page-rendering-scenario` [application, medium] Front: Scenario: Fetched web files must be turned into the visible page a user interacts with. Which component or concept best fits?
  Back: Page Rendering — Transforms markup, styles, and scripts into a usable interface.


## Week 13 - Google Course 1: Foundations of Cybersecurity

- Phase: Security
- Deliverable: Professional statement + CIA / framework notes
- Checkpoint: Can define cybersecurity in business terms, not just technical terms.
- Study-week relationship: The ordered glossary terms for Week 13 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### CIA Triad (`cia-triad`)

- `cia-triad-definition` [definition, easy] Front: What is CIA Triad?
  Back: Security model built around confidentiality, integrity, and availability.
- `cia-triad-mechanism` [understanding, medium] Front: How does CIA Triad work step by step?
  Back: Evaluates whether data stays secret, unaltered, and reachable, then uses those goals to choose and review controls.
- `cia-triad-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: CIA Triad — Provides a basic framework for judging what a control is protecting or what a failure affected.

### Risk (`risk`)

- `risk-definition` [definition, easy] Front: What is Risk?
  Back: Possibility that a threat will exploit a weakness and cause harm to an asset or process.
- `risk-mechanism` [understanding, medium] Front: How does Risk work step by step?
  Back: Combines the chance of a harmful event with the likely impact so work can be ranked and resourced.
- `risk-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Risk — Helps teams prioritize which security problems deserve treatment first.

### Threat (`threat`)

- `threat-definition` [definition, easy] Front: What is Threat?
  Back: Potential source of harm that could exploit a weakness or disrupt normal operations.
- `threat-mechanism` [understanding, medium] Front: How does Threat work step by step?
  Back: Becomes actionable when a capable actor or condition meets an exposed weakness and a path to the target.
- `threat-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Threat — Explains who or what might cause damage, theft, misuse, or outage.

### Vulnerability (`vulnerability`)

- `vulnerability-definition` [definition, easy] Front: What is Vulnerability?
  Back: Weakness in design, implementation, configuration, or process that can be exploited.
- `vulnerability-mechanism` [understanding, medium] Front: How does Vulnerability work step by step?
  Back: Appears when a flaw or misconfiguration leaves a reachable gap that an attacker or failure condition can abuse.
- `vulnerability-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Vulnerability — Creates an opportunity for a threat to bypass protection or cause harm.

### Control (`control`)

- `control-definition` [definition, easy] Front: What is Control?
  Back: Safeguard that prevents, detects, or corrects a security problem.
- `control-mechanism` [understanding, medium] Front: How does Control work step by step?
  Back: Applies a policy, technical setting, or process step that blocks misuse, spots abnormal activity, or limits the resulting damage.
- `control-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Control — Reduces risk by changing how likely, visible, or damaging an unwanted event can become.

### Security Framework (`security-framework`)

- `security-framework-definition` [definition, easy] Front: What is Security Framework?
  Back: Structured model that organizes security practices into repeatable domains, functions, or maturity steps.
- `security-framework-mechanism` [understanding, medium] Front: How does Security Framework work step by step?
  Back: Breaks security work into named areas and expected outcomes so organizations can measure current state and target changes.
- `security-framework-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Security Framework — Gives teams a common way to assess coverage, compare gaps, and plan improvement work.

### Asset (`asset`)

- `asset-definition` [definition, easy] Front: What is Asset?
  Back: Any device, account, application, dataset, or service that has value to an organization.
- `asset-mechanism` [understanding, medium] Front: How does Asset work step by step?
  Back: Security teams identify assets, assign ownership and value, and then use that inventory to guide control and response decisions.
- `asset-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Asset — Defines what must be protected, tracked, or prioritized in security work.

### Attack Surface (`attack-surface`)

- `attack-surface-definition` [definition, easy] Front: What is Attack Surface?
  Back: Total collection of entry points, exposed services, identities, and paths an attacker could try to abuse.
- `attack-surface-mechanism` [understanding, medium] Front: How does Attack Surface work step by step?
  Back: Every exposed service, account, or trust path adds a reachable point that defenders can remove, harden, or watch.
- `attack-surface-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Attack Surface — Shows where risk exists so exposure can be reduced or monitored.


## Week 14 - Google Course 2: Play It Safe - Manage Security Risks

- Phase: Security
- Deliverable: Starter risk register
- Checkpoint: Can distinguish risk from vulnerability and link controls to business priorities.
- Study-week relationship: The ordered glossary terms for Week 14 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Risk Register (`risk-register`)

- `risk-register-definition` [definition, easy] Front: What is Risk Register?
  Back: Documented inventory of identified risks, ratings, owners, and treatments.
- `risk-register-mechanism` [understanding, medium] Front: How does Risk Register work step by step?
  Back: Stores each risk with owner, rating, treatment, and status so follow-up can be tracked over time.
- `risk-register-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Risk Register — Maintains a living record of risks, scores, owners, response plans, and status updates.

### Likelihood (`likelihood`)

- `likelihood-definition` [definition, easy] Front: What is Likelihood?
  Back: Estimated probability that a risk event will occur.
- `likelihood-mechanism` [understanding, medium] Front: How does Likelihood work step by step?
  Back: Estimates how probable an event is by considering threat capability, opportunity, and control strength.
- `likelihood-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Likelihood — Estimates how probable a threat event is based on exposure, capability, and control conditions.

### Impact (`impact`)

- `impact-definition` [definition, easy] Front: What is Impact?
  Back: Estimated consequence if a risk event occurs.
- `impact-mechanism` [understanding, medium] Front: How does Impact work step by step?
  Back: Measures consequence across operations, finances, legal exposure, or safety if the risk event occurs.
- `impact-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Impact — Estimates operational, financial, legal, or reputational consequences if a threat event occurs.

### Risk Treatment (`risk-treatment`)

- `risk-treatment-definition` [definition, easy] Front: What is Risk Treatment?
  Back: Chosen approach to address risk: mitigate, transfer, avoid, or accept.
- `risk-treatment-mechanism` [understanding, medium] Front: How does Risk Treatment work step by step?
  Back: Chooses whether to mitigate, transfer, avoid, or accept each risk based on cost, benefit, and tolerance.
- `risk-treatment-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Risk Treatment — Chooses whether to mitigate, transfer, avoid, or accept each risk based on context.

### Qualitative Risk Analysis (`qualitative-risk`)

- `qualitative-risk-definition` [definition, easy] Front: What is Qualitative Risk Analysis?
  Back: Risk assessment using categorical scales like low/medium/high.
- `qualitative-risk-mechanism` [understanding, medium] Front: How does Qualitative Risk Analysis work step by step?
  Back: Uses ordinal scales and expert judgment to rank risks when precise numerical data is limited.
- `qualitative-risk-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Qualitative Risk Analysis — Ranks risks using descriptive scales when precise financial or statistical data is unavailable.

### Quantitative Risk Analysis (`quantitative-risk`)

- `quantitative-risk-definition` [definition, easy] Front: What is Quantitative Risk Analysis?
  Back: Risk assessment using numerical estimates such as expected loss values.
- `quantitative-risk-mechanism` [understanding, medium] Front: How does Quantitative Risk Analysis work step by step?
  Back: Uses numeric frequencies, loss estimates, and ranges to model expected risk in measurable terms.
- `quantitative-risk-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Quantitative Risk Analysis — Uses numerical estimates, frequencies, and loss values to calculate expected risk exposure.

### Control Recommendation (`control-recommendation`)

- `control-recommendation-definition` [definition, easy] Front: What is Control Recommendation?
  Back: Actionable proposal to improve prevention, detection, or response capability.
- `control-recommendation-mechanism` [understanding, medium] Front: How does Control Recommendation work step by step?
  Back: Links an identified gap to a specific safeguard, owner, and priority so remediation can be executed.
- `control-recommendation-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Control Recommendation — Documents a proposed safeguard, rationale, owner, and priority for reducing identified risk.

### Capability Gap (`capability-gap`)

- `capability-gap-definition` [definition, easy] Front: What is Capability Gap?
  Back: Difference between current skills/process maturity and target state.
- `capability-gap-mechanism` [understanding, medium] Front: How does Capability Gap work step by step?
  Back: Compares current people, process, and tooling against a target state to show what is missing.
- `capability-gap-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Capability Gap — Compares current staffing, tooling, or process maturity against required outcomes to identify deficiencies.


## Week 15 - Google Course 3: Networks and Network Security

- Phase: Security
- Deliverable: Hardened network checklist
- Checkpoint: Can describe how network design choices affect security outcomes.
- Study-week relationship: The ordered glossary terms for Week 15 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Intrusion Detection (`intrusion-detection`)

- `intrusion-detection-definition` [definition, easy] Front: What is Intrusion Detection?
  Back: Monitoring approach that identifies suspicious or malicious activity.
- `intrusion-detection-mechanism` [understanding, medium] Front: How does Intrusion Detection work step by step?
  Back: Monitors network or host activity, compares it to signatures or baselines, and raises alerts on suspicious matches.
- `intrusion-detection-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Intrusion Detection — Analyzes network or host events for suspicious patterns and generates alerts when monitored conditions match.

### Intrusion Prevention (`intrusion-prevention`)

- `intrusion-prevention-definition` [definition, easy] Front: What is Intrusion Prevention?
  Back: Inline security control that blocks malicious activity in real time.
- `intrusion-prevention-mechanism` [understanding, medium] Front: How does Intrusion Prevention work step by step?
  Back: Inspects traffic inline and drops or resets sessions when packets match blocked signatures or policy conditions.
- `intrusion-prevention-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Intrusion Prevention — Inspects traffic inline and automatically blocks packets or sessions matching malicious signatures or policies.

### SIEM (`siem`)

- `siem-definition` [definition, easy] Front: What is SIEM?
  Back: Security Information and Event Management platform for log analysis and alerting.
- `siem-mechanism` [understanding, medium] Front: How does SIEM work step by step?
  Back: Ingests many log streams, normalizes fields, and applies searches or rules so correlated alerts and investigations are possible.
- `siem-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: SIEM — Aggregates logs, normalizes events, runs correlation rules, and presents alerts for centralized security monitoring.

### Log Source (`log-source`)

- `log-source-definition` [definition, easy] Front: What is Log Source?
  Back: System or service that generates telemetry ingested for analysis.
- `log-source-mechanism` [understanding, medium] Front: How does Log Source work step by step?
  Back: Generates timestamped records from systems, applications, or devices that downstream tools parse and correlate.
- `log-source-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Log Source — Produces telemetry from systems, applications, and security tools that analysts ingest for monitoring and investigation.

### Network Baseline (`network-baseline`)

- `network-baseline-definition` [definition, easy] Front: What is Network Baseline?
  Back: Documented normal traffic behavior used to identify anomalies.
- `network-baseline-mechanism` [understanding, medium] Front: How does Network Baseline work step by step?
  Back: Learns normal volumes, peers, ports, and timing so unusual deviations can be flagged as suspicious.
- `network-baseline-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Network Baseline — Measures normal traffic volume, protocols, hosts, and timing so anomalies can be recognized quickly.

### Hardening (`hardening`)

- `hardening-definition` [definition, easy] Front: What is Hardening?
  Back: Process of reducing attack surface through secure configuration.
- `hardening-mechanism` [understanding, medium] Front: How does Hardening work step by step?
  Back: Reduces attack surface by disabling unnecessary features, enforcing secure settings, and removing weak defaults before exposure.
- `hardening-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Hardening — Disables unnecessary services, tightens configurations, and applies secure defaults to reduce exposed attack surface.

### Firewall (`firewall`)

- `firewall-definition` [definition, easy] Front: What is Firewall?
  Back: Control that allows or blocks traffic based on policy rules.
- `firewall-mechanism` [understanding, medium] Front: How does Firewall apply ordered rules to allow or block traffic?
  Back: Compares traffic against ordered rules and may track connection state to permit or deny packets.
- `firewall-scenario` [application, medium] Front: Scenario: Traffic should be allowed or blocked according to ordered policy rules. Which component or concept best fits?
  Back: Firewall — Evaluates traffic against policy rules and permits, rejects, or logs connections based on criteria.

### Network Segmentation (`network-segmentation`)

- `network-segmentation-definition` [definition, easy] Front: What is Network Segmentation?
  Back: Separation of network zones to reduce lateral movement and contain impact.
- `network-segmentation-mechanism` [understanding, medium] Front: How does Network Segmentation restrict movement between zones?
  Back: Separates systems into controlled zones and restricts paths between them with routing or filtering policy.
- `network-segmentation-scenario` [application, medium] Front: Scenario: Sensitive systems should not share the same unrestricted path as guest devices or printers. Which component or concept best fits?
  Back: Network Segmentation — Divides systems into controlled zones using routing, VLANs, or firewalls to restrict lateral movement.


## Week 16 - Google Course 4: Linux and SQL (part 1 - Linux)

- Phase: Security
- Deliverable: Linux command notebook
- Checkpoint: Can navigate Linux and explain permissions without memorizing blindly.
- Study-week relationship: The ordered glossary terms for Week 16 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Linux Permissions (`linux-permissions`)

- `linux-permissions-definition` [definition, easy] Front: What is Linux Permissions?
  Back: Read/write/execute access model controlling file and directory operations.
- `linux-permissions-mechanism` [understanding, medium] Front: How does Linux Permissions work step by step?
  Back: Apply owner, group, and other permission bits that the kernel checks before allowing file operations.
- `linux-permissions-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: Linux Permissions — Evaluates ownership and permission bits before allowing file or directory operations on Linux.

### chmod (`chmod`)

- `chmod-definition` [definition, easy] Front: What is chmod?
  Back: Linux command used to modify file permission bits.
- `chmod-mechanism` [understanding, medium] Front: How does chmod work step by step?
  Back: Changes permission bits on a file or directory by setting read, write, and execute flags for owner, group, or others.
- `chmod-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: chmod — Updates read, write, and execute permission bits for users, groups, or others on Linux files.

### chown (`chown`)

- `chown-definition` [definition, easy] Front: What is chown?
  Back: Linux command used to change file owner and group.
- `chown-mechanism` [understanding, medium] Front: How does chown work step by step?
  Back: Reassigns file ownership metadata so the kernel applies access checks against a different user or group.
- `chown-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: chown — Reassigns file ownership metadata so access decisions follow the intended user and group account.

### Process (`process`)

- `process-definition` [definition, easy] Front: What is Process?
  Back: Running program instance with its own state and resource usage.
- `process-mechanism` [understanding, medium] Front: How does Process move work between runnable, running, and waiting states?
  Back: Allocates memory, execution state, and resources to a running program while the scheduler manages CPU time.
- `process-scenario` [application, medium] Front: Scenario: An administrator needs the operating system unit that represents a running or scheduled program. Which component or concept best fits?
  Back: Process — Uses an isolated execution context with memory, threads, and permissions while a program runs.

### systemctl (`systemctl`)

- `systemctl-definition` [definition, easy] Front: What is systemctl?
  Back: Command-line utility for managing services in systemd-based Linux systems.
- `systemctl-mechanism` [understanding, medium] Front: How does systemctl work step by step?
  Back: Sends management requests to systemd, which tracks units, dependencies, and current service state.
- `systemctl-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: systemctl — Interacts with systemd units to start, stop, enable, inspect, or reload Linux services.

### cron (`cron`)

- `cron-definition` [definition, easy] Front: What is cron?
  Back: Linux scheduling system for recurring task automation.
- `cron-mechanism` [understanding, medium] Front: How does cron work step by step?
  Back: Matches the current time against scheduled expressions and launches configured commands when a schedule qualifies.
- `cron-scenario` [application, medium] Front: Scenario: An administrator needs the operating system concept or tool that best matches the task. Which component or concept best fits?
  Back: cron — Launches scheduled commands at configured times using recurring entries defined in cron tables.

### Shell (`shell`)

- `shell-definition` [definition, easy] Front: What is Shell?
  Back: Command interpreter used to interact with the operating system.
- `shell-mechanism` [understanding, medium] Front: How does Shell interpret commands and expand syntax before execution?
  Back: Interprets typed commands, expands variables or wildcards, and launches programs in the current session context.
- `shell-scenario` [application, medium] Front: Scenario: A user needs the interpreter that reads commands and launches programs in a terminal session. Which component or concept best fits?
  Back: Shell — Interprets user commands, expands syntax, and launches programs within the current operating system session.

### Package Manager (`package-manager`)

- `package-manager-definition` [definition, easy] Front: What is Package Manager?
  Back: Tool that installs, updates, and removes software packages with dependency handling.
- `package-manager-mechanism` [understanding, medium] Front: How does Package Manager install software with repository metadata and dependencies?
  Back: Resolves dependencies, verifies package sources, and installs or updates software using repository metadata.
- `package-manager-scenario` [application, medium] Front: Scenario: Software must be installed and updated while resolving dependencies from trusted repositories. Which component or concept best fits?
  Back: Package Manager — Retrieves packages, resolves dependencies, verifies sources, and installs or updates software consistently.


## Week 17 - Google Course 4: Linux and SQL (part 2 - SQL)

- Phase: Security
- Deliverable: SQL query notebook
- Checkpoint: Can read and write basic SQL queries for security-relevant data.
- Study-week relationship: The ordered glossary terms for Week 17 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### SQL Query (`sql-query`)

- `sql-query-definition` [definition, easy] Front: What is SQL Query?
  Back: Structured request to retrieve or manipulate data in a relational database within web, data, and cloud services.
- `sql-query-mechanism` [understanding, medium] Front: How does SQL Query work step by step?
  Back: Parses clauses, builds an execution plan, and retrieves or changes rows according to that plan.
- `sql-query-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: SQL Query — Uses SQL syntax to retrieve, insert, update, or delete structured relational data.

### SELECT Statement (`select-statement`)

- `select-statement-definition` [definition, easy] Front: What is SELECT Statement?
  Back: SQL command used to retrieve data from one or more tables within web, data, and cloud services.
- `select-statement-mechanism` [understanding, medium] Front: How does SELECT Statement work step by step?
  Back: Specifies columns, tables, filters, and ordering so the database engine can assemble the requested result.
- `select-statement-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: SELECT Statement — Requests specific columns and rows from database tables based on query conditions.

### WHERE Clause (`where-clause`)

- `where-clause-definition` [definition, easy] Front: What is WHERE Clause?
  Back: SQL condition that filters returned rows within web, data, and cloud services.
- `where-clause-mechanism` [understanding, medium] Front: How does WHERE Clause work step by step?
  Back: Applies boolean conditions to candidate rows so only records that match the filter continue through the query.
- `where-clause-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: WHERE Clause — Applies conditions to rows so only records matching the specified criteria are returned or modified.

### JOIN (`join`)

- `join-definition` [definition, easy] Front: What is JOIN?
  Back: SQL operation that combines related rows across multiple tables within web, data, and cloud services.
- `join-mechanism` [understanding, medium] Front: How does JOIN work step by step?
  Back: Matches rows from multiple tables using related keys so combined records can be returned in one result set.
- `join-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: JOIN — Matches related rows across tables using keys so combined results can be queried together.

### Input Validation (`input-validation`)

- `input-validation-definition` [definition, easy] Front: What is Input Validation?
  Back: Process of checking user input for format, length, and allowed values within web, data, and cloud services.
- `input-validation-mechanism` [understanding, medium] Front: How does Input Validation work step by step?
  Back: Checks type, length, format, and allowed values before processing data or sending it to downstream components.
- `input-validation-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: Input Validation — Checks untrusted data against format, length, type, and allowlist rules before processing.

### SQL Injection (`sql-injection`)

- `sql-injection-definition` [definition, easy] Front: What is SQL Injection?
  Back: Attack that manipulates SQL queries through untrusted input within web, data, and cloud services.
- `sql-injection-mechanism` [understanding, medium] Front: How does SQL Injection work step by step?
  Back: Works when untrusted input changes query structure, allowing the database to execute unintended commands.
- `sql-injection-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: SQL Injection — Injects crafted input into unsafe queries so a database executes unintended commands or data access.


## Week 18 - Google Course 5: Assets, threats, and vulnerabilities (part 1)

- Phase: Security
- Deliverable: Asset inventory + data handling guide
- Checkpoint: Can classify assets and explain why not all data deserves the same treatment.
- Study-week relationship: The ordered glossary terms for Week 18 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Asset Inventory (`asset-inventory`)

- `asset-inventory-definition` [definition, easy] Front: What is Asset Inventory?
  Back: Structured list of hardware, software, and data assets in scope.
- `asset-inventory-mechanism` [understanding, medium] Front: How does Asset Inventory work step by step?
  Back: Collects host attributes, ownership, software, and data scope into records that other controls use for targeting and scoping.
- `asset-inventory-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Asset Inventory — Maps systems, software, owners, and data to known records so investigations and control scope stay accurate.

### Data Classification (`data-classification`)

- `data-classification-definition` [definition, easy] Front: What is Data Classification?
  Back: Labeling data by sensitivity and handling requirements within web, data, and cloud services.
- `data-classification-mechanism` [understanding, medium] Front: How does Data Classification work step by step?
  Back: Assigns labels by sensitivity and handling need so storage, sharing, and retention rules can be enforced.
- `data-classification-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: Data Classification — Assigns sensitivity labels that determine storage, access, transmission, retention, and disposal controls.

### Threat Model (`threat-model`)

- `threat-model-definition` [definition, easy] Front: What is Threat Model?
  Back: Structured analysis of potential attackers, paths, and control gaps.
- `threat-model-mechanism` [understanding, medium] Front: How does Threat Model work step by step?
  Back: Enumerates assets, trust boundaries, and attacker actions so defenses can be designed around likely abuse paths.
- `threat-model-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Threat Model — Identifies assets, attackers, attack paths, and control gaps before implementing or changing a system.

### Attack Vector (`attack-vector`)

- `attack-vector-definition` [definition, easy] Front: What is Attack Vector?
  Back: Path or method used by an attacker to reach a target.
- `attack-vector-mechanism` [understanding, medium] Front: How does Attack Vector work step by step?
  Back: Traces the initial path into the target by following entry point, exposed weakness, and reachable asset sequence.
- `attack-vector-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Attack Vector — Describes the route used for initial access, such as phishing, exposed services, or vulnerable software.

### Vulnerability Scan (`vulnerability-scan`)

- `vulnerability-scan-definition` [definition, easy] Front: What is Vulnerability Scan?
  Back: Automated assessment for known weaknesses in systems and software.
- `vulnerability-scan-mechanism` [understanding, medium] Front: How does Vulnerability Scan work step by step?
  Back: Probes hosts or applications for known conditions, compares findings against signatures, and reports matched weaknesses.
- `vulnerability-scan-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Vulnerability Scan — Probes hosts, software, and configurations against known checks to identify missing patches and insecure settings.

### CVSS (`cvss`)

- `cvss-definition` [definition, easy] Front: What is CVSS?
  Back: Common Vulnerability Scoring System for rating vulnerability severity.
- `cvss-mechanism` [understanding, medium] Front: How does CVSS work step by step?
  Back: Scores vulnerabilities by combining exploitability and impact metrics into a standardized severity value.
- `cvss-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: CVSS — Scores vulnerabilities using base metrics that estimate exploitability and technical impact in a standardized format.

### Exposure (`exposure`)

- `exposure-definition` [definition, easy] Front: What is Exposure?
  Back: Degree to which assets are reachable or vulnerable to threat activity.
- `exposure-mechanism` [understanding, medium] Front: How does Exposure work step by step?
  Back: Reflects how reachable a weakness is, based on attacker access, asset placement, and existing control coverage.
- `exposure-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Exposure — Describes how accessible an asset or weakness is to threat activity under current controls and conditions.


## Week 19 - Google Course 5: Assets, threats, and vulnerabilities (part 2)

- Phase: Security
- Deliverable: Threat model + vulnerability notes
- Checkpoint: Can reason from asset to attacker to mitigation.
- Study-week relationship: The ordered glossary terms for Week 19 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Mitigation (`mitigation`)

- `mitigation-definition` [definition, easy] Front: What is Mitigation?
  Back: Action that lowers likelihood or impact of a risk.
- `mitigation-mechanism` [understanding, medium] Front: How does Mitigation work step by step?
  Back: Reduces either the chance or the consequence of a risk through selected safeguards and process changes.
- `mitigation-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Mitigation — Selects and implements actions that lower the chance or consequences of a risk event.

### Exploit (`exploit`)

- `exploit-definition` [definition, easy] Front: What is Exploit?
  Back: Code or technique that takes advantage of a vulnerability.
- `exploit-mechanism` [understanding, medium] Front: How does Exploit work step by step?
  Back: Uses crafted input or sequence timing to trigger a weakness and execute behavior the system did not intend to allow.
- `exploit-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Exploit — Triggers vulnerable behavior through crafted input, code execution, or protocol abuse to gain unauthorized results.

### Compensating Control (`compensating-control`)

- `compensating-control-definition` [definition, easy] Front: What is Compensating Control?
  Back: Alternative safeguard used when a primary control is not feasible.
- `compensating-control-mechanism` [understanding, medium] Front: How does Compensating Control work step by step?
  Back: Applies an alternative safeguard that reduces the same risk when the preferred control cannot be implemented.
- `compensating-control-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Compensating Control — Implements an alternate safeguard that reduces risk when the preferred primary control cannot be deployed.

### Residual Risk (`residual-risk`)

- `residual-risk-definition` [definition, easy] Front: What is Residual Risk?
  Back: Risk that remains after controls are implemented.
- `residual-risk-mechanism` [understanding, medium] Front: How does Residual Risk work step by step?
  Back: Represents the risk that remains after controls are applied and their realistic effectiveness is considered.
- `residual-risk-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Residual Risk — Measures the remaining exposure after planned or implemented controls reduce the original risk.

### Exposure (`exposure`)

- `exposure-definition` [definition, easy] Front: What is Exposure?
  Back: Degree to which assets are reachable or vulnerable to threat activity.
- `exposure-mechanism` [understanding, medium] Front: How does Exposure work step by step?
  Back: Reflects how reachable a weakness is, based on attacker access, asset placement, and existing control coverage.
- `exposure-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Exposure — Describes how accessible an asset or weakness is to threat activity under current controls and conditions.

### Threat Intelligence (`threat-intelligence`)

- `threat-intelligence-definition` [definition, easy] Front: What is Threat Intelligence?
  Back: Contextual information about threat actors, tactics, and indicators.
- `threat-intelligence-mechanism` [understanding, medium] Front: How does Threat Intelligence work step by step?
  Back: Collects external indicators and adversary context, then maps them to internal telemetry for detection and prioritization.
- `threat-intelligence-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Threat Intelligence — Collects, analyzes, and disseminates information about adversaries, tactics, infrastructure, indicators, and likely targeting behavior.


## Week 20 - Google Course 6: Detection and response (part 1)

- Phase: Security
- Deliverable: One-page IR playbook
- Checkpoint: Can outline the incident lifecycle and the evidence sources used along the way.
- Study-week relationship: The ordered glossary terms for Week 20 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Alert Triage (`alert-triage`)

- `alert-triage-definition` [definition, easy] Front: What is Alert Triage?
  Back: Initial analysis process that validates and prioritizes alerts.
- `alert-triage-mechanism` [understanding, medium] Front: How does Alert Triage work step by step?
  Back: Checks source fidelity, correlates nearby telemetry, and assigns severity so analysts queue real threats ahead of benign noise.
- `alert-triage-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Alert Triage — Reviews alert context, validates indicators, and assigns priority so analysts address the most credible threats first.

### False Positive (`false-positive`)

- `false-positive-definition` [definition, easy] Front: What is False Positive?
  Back: Alert that appears malicious but is benign after investigation.
- `false-positive-mechanism` [understanding, medium] Front: How does False Positive work step by step?
  Back: Appears when a rule matches benign activity because indicators, thresholds, or context are too broad.
- `false-positive-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: False Positive — Occurs when detection logic matches benign activity, requiring tuning to reduce unnecessary analyst effort.

### Indicator of Compromise (`ioc`)

- `ioc-definition` [definition, easy] Front: What is Indicator of Compromise?
  Back: Observable evidence suggesting malicious activity occurred.
- `ioc-mechanism` [understanding, medium] Front: How does Indicator of Compromise work step by step?
  Back: Uses observable artifacts such as hashes, domains, or registry changes to match activity against known malicious patterns.
- `ioc-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Indicator of Compromise — Captures observable artifacts such as hashes, domains, IPs, or processes associated with malicious activity.

### Incident Severity (`incident-severity`)

- `incident-severity-definition` [definition, easy] Front: What is Incident Severity?
  Back: Impact-based classification used to prioritize incident response.
- `incident-severity-mechanism` [understanding, medium] Front: How does Incident Severity work step by step?
  Back: Combines impact, scope, and urgency into a rating that drives escalation, communication, and response effort.
- `incident-severity-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Incident Severity — Scores incidents using impact and urgency criteria to drive escalation, staffing, and response timelines.

### Containment (`containment`)

- `containment-definition` [definition, easy] Front: What is Containment?
  Back: Response action that limits incident spread and immediate damage.
- `containment-mechanism` [understanding, medium] Front: How does Containment work step by step?
  Back: Limits attacker movement by isolating affected assets, blocking malicious paths, and preserving enough access for investigation.
- `containment-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Containment — Applies isolation, account restrictions, or blocking actions to stop attacker movement while preserving evidence.

### Eradication (`eradication`)

- `eradication-definition` [definition, easy] Front: What is Eradication?
  Back: Removal of attacker presence, malicious artifacts, and root causes.
- `eradication-mechanism` [understanding, medium] Front: How does Eradication work step by step?
  Back: Removes malicious artifacts, closes exploited weaknesses, and validates cleanup so the same foothold cannot immediately return.
- `eradication-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Eradication — Removes malware, closes exploited access paths, and fixes root causes before systems return to service.

### Detection Rule (`detection-rule`)

- `detection-rule-definition` [definition, easy] Front: What is Detection Rule?
  Back: Logic used by monitoring systems to trigger alerts.
- `detection-rule-mechanism` [understanding, medium] Front: How does Detection Rule work step by step?
  Back: Evaluates events against defined conditions, thresholds, or sequences and generates alerts when matching activity appears.
- `detection-rule-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Detection Rule — Evaluates log fields, thresholds, and patterns against conditions that generate actionable security alerts.


## Week 21 - Google Course 6: Detection and response (part 2)

- Phase: Security
- Deliverable: Escalation matrix + incident summary
- Checkpoint: Can explain how a SOC turns alerts into actions and communications.
- Study-week relationship: The ordered glossary terms for Week 21 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Recovery (`recovery`)

- `recovery-definition` [definition, easy] Front: What is Recovery?
  Back: Restoration of normal operations after incident containment and eradication.
- `recovery-mechanism` [understanding, medium] Front: How does Recovery work step by step?
  Back: Restores systems in stages, validates normal operation, and monitors for recurrence before returning to full service.
- `recovery-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Recovery — Restores validated systems, services, and business operations after threats are removed and controls are confirmed.

### Playbook (`playbook`)

- `playbook-definition` [definition, easy] Front: What is Playbook?
  Back: Documented response workflow for recurring security scenarios.
- `playbook-mechanism` [understanding, medium] Front: How does Playbook turn a known situation into repeatable response steps?
  Back: Defines trigger conditions, required steps, and decision points so analysts handle repeat scenarios the same way each time.
- `playbook-scenario` [application, medium] Front: Scenario: A repeated problem should be handled through documented steps rather than memory alone. Which component or concept best fits?
  Back: Playbook — Documents response steps, roles, decision points, and evidence requirements for a recurring incident scenario.

### Escalation Path (`escalation-path`)

- `escalation-path-definition` [definition, easy] Front: What is Escalation Path?
  Back: Defined process for raising incidents to appropriate teams and leadership.
- `escalation-path-mechanism` [understanding, medium] Front: How does Escalation Path work step by step?
  Back: Routes an issue through defined responders and thresholds so decisions move quickly when severity or scope increases.
- `escalation-path-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Escalation Path — Routes incidents to higher authority or specialist teams using predefined severity, impact, and responsibility criteria.

### Case Management (`case-management`)

- `case-management-definition` [definition, easy] Front: What is Case Management?
  Back: Tracking and coordination of investigation tasks, evidence, and decisions.
- `case-management-mechanism` [understanding, medium] Front: How does Case Management work step by step?
  Back: Keeps alerts, evidence, notes, and task status in one record so investigations remain coordinated across analysts.
- `case-management-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Case Management — Maintains case status, assigned work, evidence references, and decisions throughout an investigation lifecycle.

### Timeline Analysis (`timeline-analysis`)

- `timeline-analysis-definition` [definition, easy] Front: What is Timeline Analysis?
  Back: Reconstruction of incident events in chronological order.
- `timeline-analysis-mechanism` [understanding, medium] Front: How does Timeline Analysis work step by step?
  Back: Orders events by timestamp, reconciles clock differences, and fills gaps so cause and sequence become clear.
- `timeline-analysis-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Timeline Analysis — Orders events by timestamp to reconstruct attacker actions, response steps, and system changes during an incident.

### Post-Incident Review (`post-incident-review`)

- `post-incident-review-definition` [definition, easy] Front: What is Post-Incident Review?
  Back: Structured retrospective focused on lessons and control improvements.
- `post-incident-review-mechanism` [understanding, medium] Front: How does Post-Incident Review work step by step?
  Back: Reconstructs the event, compares actions to expected procedure, and converts gaps into specific follow-up improvements.
- `post-incident-review-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Post-Incident Review — Evaluates timeline, controls, decisions, and communication after closure to improve future response effectiveness.

### Communication Plan (`communication-plan`)

- `communication-plan-definition` [definition, easy] Front: What is Communication Plan?
  Back: Documented messaging protocol for stakeholders during security events.
- `communication-plan-mechanism` [understanding, medium] Front: How does Communication Plan work step by step?
  Back: Defines audiences, triggers, channels, and message owners so incident updates move on schedule without conflicting reports.
- `communication-plan-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Communication Plan — Defines notification paths, message timing, approval points, and audiences during an incident response process.

### Evidence Handling (`evidence-handling`)

- `evidence-handling-definition` [definition, easy] Front: What is Evidence Handling?
  Back: Process for collecting and preserving evidence with integrity.
- `evidence-handling-mechanism` [understanding, medium] Front: How does Evidence Handling work step by step?
  Back: Acquires, labels, stores, and transfers artifacts using repeatable procedures that preserve integrity and analyst context.
- `evidence-handling-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Evidence Handling — Collects, labels, stores, and transfers artifacts using documented procedures that preserve reliability and traceability.


## Week 22 - Google Course 7: Python automation (part 1)

- Phase: Security
- Deliverable: Python basics notebook
- Checkpoint: Can read and modify short Python scripts without freezing.
- Study-week relationship: The ordered glossary terms for Week 22 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Python Script (`python-script`)

- `python-script-definition` [definition, easy] Front: What is Python Script?
  Back: Executable Python code used to automate repetitive tasks within scripting and systems automation workflows.
- `python-script-mechanism` [understanding, medium] Front: How does Python Script work step by step?
  Back: Reads inputs, executes statements in sequence, and can call libraries or system resources to automate tasks.
- `python-script-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Python Script — Executes Python instructions from a file to automate parsing, reporting, administration, or response tasks.

### Variable (`variable`)

- `variable-definition` [definition, easy] Front: What is Variable?
  Back: Named value container used in programming logic within scripting and systems automation workflows.
- `variable-mechanism` [understanding, medium] Front: How does Variable work step by step?
  Back: Stores a named value in memory so later operations can read, change, or compare that value.
- `variable-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Variable — Stores named data in memory so code can reference, update, and compare values during execution.

### Function (`function`)

- `function-definition` [definition, easy] Front: What is Function?
  Back: Reusable block of code that performs a defined task within scripting and systems automation workflows.
- `function-mechanism` [understanding, medium] Front: How does Function work step by step?
  Back: Packages steps behind a named interface so inputs go in, logic runs, and outputs return predictably.
- `function-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Function — Encapsulates reusable logic behind a named interface so code can be called with inputs and return results.

### Loop (`loop`)

- `loop-definition` [definition, easy] Front: What is Loop?
  Back: Programming control structure that repeats actions over data or conditions within scripting and systems automation workflows.
- `loop-mechanism` [understanding, medium] Front: How does Loop work step by step?
  Back: Repeats a block over a range, collection, or condition until the termination rule is met.
- `loop-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Loop — Repeats statements over a sequence or condition until the dataset is exhausted or the condition changes.

### Conditional (`conditional`)

- `conditional-definition` [definition, easy] Front: What is Conditional?
  Back: Logic branch that executes code based on true/false evaluation within scripting and systems automation workflows.
- `conditional-mechanism` [understanding, medium] Front: How does Conditional work step by step?
  Back: Evaluates a true or false expression and sends execution down different branches based on the result.
- `conditional-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Conditional — Evaluates an expression and executes different code paths depending on whether the result is true or false.

### Error Handling (`error-handling`)

- `error-handling-definition` [definition, easy] Front: What is Error Handling?
  Back: Code pattern that captures and responds to runtime failures safely within scripting and systems automation workflows.
- `error-handling-mechanism` [understanding, medium] Front: How does Error Handling work step by step?
  Back: Wraps risky operations, captures exceptions or return codes, and routes failures into retries, logging, or cleanup.
- `error-handling-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Error Handling — Detects exceptions or invalid states, then logs, retries, exits, or recovers without unsafe program behavior.


## Week 23 - Google Course 7: Python automation (part 2)

- Phase: Security
- Deliverable: Automation script portfolio item
- Checkpoint: Can connect automation ideas to real analyst workflows.
- Study-week relationship: The ordered glossary terms for Week 23 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### API (`api`)

- `api-definition` [definition, easy] Front: What is API?
  Back: Application Programming Interface used to exchange data between systems within scripting and systems automation workflows.
- `api-mechanism` [understanding, medium] Front: How does API work step by step?
  Back: Builds requests with method, endpoint, headers, and payload, then parses the returned status and data for automation logic.
- `api-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: API — Sends structured requests to defined endpoints and receives machine-readable responses for integration and automation tasks.

### HTTP Method (`http-method`)

- `http-method-definition` [definition, easy] Front: What is HTTP Method?
  Back: Action verb in HTTP such as GET, POST, PUT, or DELETE within web, data, and cloud services.
- `http-method-mechanism` [understanding, medium] Front: How does HTTP Method work step by step?
  Back: Signals intended action such as retrieval, creation, update, or deletion so servers apply the correct handler logic.
- `http-method-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: HTTP Method — Specifies the intended operation, such as reading, creating, updating, or deleting a resource.

### Automation Playbook (`automation-playbook`)

- `automation-playbook-definition` [definition, easy] Front: What is Automation Playbook?
  Back: Defined sequence of automated actions for a repeatable security task.
- `automation-playbook-mechanism` [understanding, medium] Front: How does Automation Playbook work step by step?
  Back: Chains predefined steps, inputs, and decision branches so repetitive response actions run consistently with minimal manual handling.
- `automation-playbook-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Automation Playbook — Executes predefined steps, branching logic, and notifications to handle repetitive detection and response tasks consistently.

### Regular Expression (`regex`)

- `regex-definition` [definition, easy] Front: What is Regular Expression?
  Back: Pattern syntax used to match and extract structured text.
- `regex-mechanism` [understanding, medium] Front: How does Regular Expression work step by step?
  Back: Matches character patterns using tokens, grouping, and quantifiers so text can be searched or extracted precisely.
- `regex-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Regular Expression — Matches character patterns within text so scripts and tools can filter, extract, or transform data.

### File Parsing (`file-parsing`)

- `file-parsing-definition` [definition, easy] Front: What is File Parsing?
  Back: Reading structured or semi-structured files into usable data.
- `file-parsing-mechanism` [understanding, medium] Front: How does File Parsing work step by step?
  Back: Reads structured or semi-structured content, extracts needed fields, and normalizes the results for later analysis.
- `file-parsing-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: File Parsing — Reads structured fields from logs or data files so automation and analysis can operate on extracted values.

### Version Control (`version-control`)

- `version-control-definition` [definition, easy] Front: What is Version Control?
  Back: System for tracking code changes and collaboration history within scripting and systems automation workflows.
- `version-control-mechanism` [understanding, medium] Front: How does Version Control work step by step?
  Back: Stores changes as commits, tracks diffs between versions, and merges or reverts work through branch history.
- `version-control-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Version Control — Records changes as commits, tracks history, and supports branching or collaboration on code and content.

### JSON (`json`)

- `json-definition` [definition, easy] Front: What is JSON?
  Back: Structured text format that represents data as name-value pairs and nested arrays or objects.
- `json-mechanism` [understanding, medium] Front: How does JSON work step by step?
  Back: Encodes values in a predictable syntax that parsers can read into objects and serialize back into text.
- `json-scenario` [application, medium] Front: Scenario: A web, API, or cloud workflow depends on the correct concept. Which component or concept best fits?
  Back: JSON — Makes application data easy to exchange between APIs, scripts, and services.


## Week 24 - Google Course 8: Prepare for cybersecurity jobs

- Phase: Security
- Deliverable: Resume bullets + five mock interview answers
- Checkpoint: Can talk about your work in evidence-based, employer-friendly language.
- Study-week relationship: The ordered glossary terms for Week 24 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Resume Tailoring (`resume-tailoring`)

- `resume-tailoring-definition` [definition, easy] Front: What is Resume Tailoring?
  Back: Adjusting resume content to align with a specific role within cybersecurity job-search and portfolio workflows.
- `resume-tailoring-mechanism` [understanding, medium] Front: How does Resume Tailoring work step by step?
  Back: Adjusts summary, bullets, and keywords against a specific posting so the document reflects that role's priorities.
- `resume-tailoring-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Resume Tailoring — Reorders content, rewrites bullets, and emphasizes relevant evidence for each specific role description.

### STAR Method (`star-method`)

- `star-method-definition` [definition, easy] Front: What is STAR Method?
  Back: Interview storytelling format: Situation, Task, Action, Result within cybersecurity job-search and portfolio workflows.
- `star-method-mechanism` [understanding, medium] Front: How does STAR Method work step by step?
  Back: Structures answers as situation, task, action, and result so examples stay specific and easy to follow.
- `star-method-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: STAR Method — Structures interview answers by sequencing context, responsibility, action taken, and measurable outcome in a concise format.

### Elevator Pitch (`elevator-pitch`)

- `elevator-pitch-definition` [definition, easy] Front: What is Elevator Pitch?
  Back: Short professional summary of value, direction, and goals within cybersecurity job-search and portfolio workflows.
- `elevator-pitch-mechanism` [understanding, medium] Front: How does Elevator Pitch work step by step?
  Back: Compresses background, target role, and differentiator into a short sequence that can be delivered consistently in introductions.
- `elevator-pitch-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Elevator Pitch — Compresses role target, relevant evidence, and specialization into a brief introduction suitable for networking and screening calls.

### Portfolio Artifact (`portfolio-artifact`)

- `portfolio-artifact-definition` [definition, easy] Front: What is Portfolio Artifact?
  Back: Concrete evidence of work quality such as write-ups, diagrams, or labs within cybersecurity job-search and portfolio workflows.
- `portfolio-artifact-mechanism` [understanding, medium] Front: How does Portfolio Artifact work step by step?
  Back: Packages one concrete output with context, methods, and result so a reviewer can understand what was built and why.
- `portfolio-artifact-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Portfolio Artifact — Captures a completed deliverable with context, method, and outcome so reviewers can evaluate practical capability.

### Interview Question Drill (`interview-question`)

- `interview-question-definition` [definition, easy] Front: What is Interview Question Drill?
  Back: Structured practice of common technical and behavioral interview prompts within cybersecurity job-search and portfolio workflows.
- `interview-question-mechanism` [understanding, medium] Front: How does Interview Question Drill work step by step?
  Back: Repeats likely prompts, retrieves structured answers from memory, and exposes weak examples before real interviews.
- `interview-question-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Interview Question Drill — Uses repeated prompt-response practice with timed answers to improve structure, precision, and confidence under interview conditions.

### Career Story (`career-story`)

- `career-story-definition` [definition, easy] Front: What is Career Story?
  Back: Narrative linking background, skills, and target role trajectory within cybersecurity job-search and portfolio workflows.
- `career-story-mechanism` [understanding, medium] Front: How does Career Story work step by step?
  Back: Connects prior experience, current training, and target role into a sequence that shows progression, intent, and fit.
- `career-story-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Career Story — Combines prior experience, current skills, and target roles into a consistent narrative used across interviews and profiles.

### Job Tracker (`job-tracker`)

- `job-tracker-definition` [definition, easy] Front: What is Job Tracker?
  Back: System for managing applications, follow-ups, and interview stages within cybersecurity job-search and portfolio workflows.
- `job-tracker-mechanism` [understanding, medium] Front: How does Job Tracker work step by step?
  Back: Stores roles, dates, contacts, and follow-ups in one record so applications can be reviewed and acted on systematically.
- `job-tracker-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Job Tracker — Stores application dates, contact details, follow-up tasks, and outcomes so outreach activity remains measurable and current.


## Week 25 - Google Course 9: Job search systems, AI support, and profile polish

- Phase: Security
- Deliverable: LinkedIn update + application tracker
- Checkpoint: Your online profile and job-search system are live and usable.
- Study-week relationship: The ordered glossary terms for Week 25 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### LinkedIn Profile (`linkedin-profile`)

- `linkedin-profile-definition` [definition, easy] Front: What is LinkedIn Profile?
  Back: Professional public profile highlighting role alignment and proof-of-work within cybersecurity job-search and portfolio workflows.
- `linkedin-profile-mechanism` [understanding, medium] Front: How does LinkedIn Profile work step by step?
  Back: Combines headline, summary, experience, and artifacts into a searchable public profile recruiters can scan quickly.
- `linkedin-profile-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: LinkedIn Profile — Publishes a searchable professional summary, experience evidence, and network-facing activity aligned with target cybersecurity roles.

### Networking Outreach (`networking-outreach`)

- `networking-outreach-definition` [definition, easy] Front: What is Networking Outreach?
  Back: Intentional communication with peers, mentors, and hiring contacts within cybersecurity job-search and portfolio workflows.
- `networking-outreach-mechanism` [understanding, medium] Front: How does Networking Outreach work step by step?
  Back: Uses targeted messages, shared context, and timed follow-ups to open conversations without sending generic requests.
- `networking-outreach-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Networking Outreach — Schedules targeted messages, follow-ups, and conversation notes to expand referral paths and market visibility.

### Job Tracker (`job-tracker`)

- `job-tracker-definition` [definition, easy] Front: What is Job Tracker?
  Back: System for managing applications, follow-ups, and interview stages within cybersecurity job-search and portfolio workflows.
- `job-tracker-mechanism` [understanding, medium] Front: How does Job Tracker work step by step?
  Back: Stores roles, dates, contacts, and follow-ups in one record so applications can be reviewed and acted on systematically.
- `job-tracker-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Job Tracker — Stores application dates, contact details, follow-up tasks, and outcomes so outreach activity remains measurable and current.

### Keyword Optimization (`keyword-optimization`)

- `keyword-optimization-definition` [definition, easy] Front: What is Keyword Optimization?
  Back: Aligning profile and resume terms with job descriptions and ATS logic within cybersecurity job-search and portfolio workflows.
- `keyword-optimization-mechanism` [understanding, medium] Front: How does Keyword Optimization work step by step?
  Back: Maps resume and profile wording to repeated job-post terms so screening systems and recruiters find the intended matches.
- `keyword-optimization-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Keyword Optimization — Maps resume and profile language to recurring job-description terms so applicant tracking systems match relevant skills.

### Application Funnel (`application-funnel`)

- `application-funnel-definition` [definition, easy] Front: What is Application Funnel?
  Back: Measurement view of applications from submit to offer stages within cybersecurity job-search and portfolio workflows.
- `application-funnel-mechanism` [understanding, medium] Front: How does Application Funnel work step by step?
  Back: Breaks the search into stages, measures transitions between them, and exposes where outreach or interviews stop converting.
- `application-funnel-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Application Funnel — Tracks counts, conversion rates, and delays between application stages to expose where the search process stalls.

### AI Assistant Guardrails (`ai-assistant-guardrails`)

- `ai-assistant-guardrails-definition` [definition, easy] Front: What is AI Assistant Guardrails?
  Back: Rules that keep AI-supported job-search outputs accurate and authentic within cybersecurity job-search and portfolio workflows.
- `ai-assistant-guardrails-mechanism` [understanding, medium] Front: How does AI Assistant Guardrails work step by step?
  Back: Applies prompt boundaries, source checks, and human approval gates so generated text is constrained before publication.
- `ai-assistant-guardrails-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: AI Assistant Guardrails — Define source boundaries, review checks, and approval rules before generated text is used in resumes or outreach.

### Portfolio Artifact (`portfolio-artifact`)

- `portfolio-artifact-definition` [definition, easy] Front: What is Portfolio Artifact?
  Back: Concrete evidence of work quality such as write-ups, diagrams, or labs within cybersecurity job-search and portfolio workflows.
- `portfolio-artifact-mechanism` [understanding, medium] Front: How does Portfolio Artifact work step by step?
  Back: Packages one concrete output with context, methods, and result so a reviewer can understand what was built and why.
- `portfolio-artifact-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Portfolio Artifact — Captures a completed deliverable with context, method, and outcome so reviewers can evaluate practical capability.


## Week 26 - Security+ reinforcement: IAM, crypto, and social engineering

- Phase: Security
- Deliverable: IAM / crypto / social-engineering brief
- Checkpoint: Can explain core defensive principles clearly and consistently.
- Study-week relationship: The ordered glossary terms for Week 26 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Identity (`identity`)

- `identity-definition` [definition, easy] Front: What is Identity?
  Back: Digital representation of a user, service, or device in an access system.
- `identity-mechanism` [understanding, medium] Front: How does Identity link a subject record to credentials and permissions?
  Back: Links usernames, attributes, and credentials in a record that other controls query when making authentication and authorization decisions.
- `identity-scenario` [application, medium] Front: Scenario: An access system needs the subject record that represents a user, service, or device. Which component or concept best fits?
  Back: Identity — Associates attributes, credentials, and permissions with a subject so systems can evaluate access requests consistently.

### Authentication (`authentication`)

- `authentication-definition` [definition, easy] Front: What is Authentication?
  Back: Process of verifying claimed identity within authentication and access control security workflows.
- `authentication-mechanism` [understanding, medium] Front: How does Authentication verify submitted proof before creating a session?
  Back: Checks submitted credentials against a stored factor, then establishes identity context only when the proof matches expected values.
- `authentication-scenario` [application, medium] Front: Scenario: A system is checking proof of identity before creating a session. Which component or concept best fits?
  Back: Authentication — Validates submitted credentials, tokens, certificates, or biometrics before issuing a session or allowing access requests.

### Authorization (`authorization`)

- `authorization-definition` [definition, easy] Front: What is Authorization?
  Back: Process of granting permitted actions to an authenticated identity within authentication and access control security workflows.
- `authorization-mechanism` [understanding, medium] Front: How does Authorization compare an authenticated subject against policy rules?
  Back: Compares the authenticated identity against policy rules, group membership, or ACL entries before permitting each requested action.
- `authorization-scenario` [application, medium] Front: Scenario: A signed-in user still needs a policy decision about which actions are allowed. Which component or concept best fits?
  Back: Authorization — Evaluates policy rules after authentication to determine which resources and actions an identity may use.

### Accounting (AAA) (`accounting`)

- `accounting-definition` [definition, easy] Front: What is Accounting (AAA)?
  Back: Tracking and logging of identity actions for accountability within authentication and access control security workflows.
- `accounting-mechanism` [understanding, medium] Front: How does Accounting (AAA) record identity actions for later review?
  Back: Captures login attempts, privilege changes, and session activity in logs so actions can be tied back to specific identities.
- `accounting-scenario` [application, medium] Front: Scenario: Investigators need records of sign-ins, privilege use, and administrative actions. Which component or concept best fits?
  Back: Accounting (AAA) — Records authentication events, authorization decisions, and administrative actions so investigators can reconstruct accountability across monitored systems.

### Multi-Factor Authentication (`mfa`)

- `mfa-definition` [definition, easy] Front: What is Multi-Factor Authentication?
  Back: Authentication method requiring two or more independent proof factors within authentication and access control security workflows.
- `mfa-mechanism` [understanding, medium] Front: How does Multi-Factor Authentication combine independent factors before granting access?
  Back: Requires independent factors such as password plus token, so compromise of one factor does not satisfy the full check.
- `mfa-scenario` [application, medium] Front: Scenario: A login should require more than one independent proof factor before access is granted. Which component or concept best fits?
  Back: Multi-Factor Authentication — Combines multiple factor types, such as passwords and tokens, before granting access to a protected system.

### Least Privilege (`least-privilege`)

- `least-privilege-definition` [definition, easy] Front: What is Least Privilege?
  Back: Security principle granting only the minimum permissions needed for a task within authentication and access control security workflows.
- `least-privilege-mechanism` [understanding, medium] Front: How does Least Privilege start from minimal rights and grant only what is needed?
  Back: Starts from minimal rights, then grants narrowly scoped permissions by role, task, or time so excess access stays unavailable.
- `least-privilege-scenario` [application, medium] Front: Scenario: An account should receive only the access required for the current task and nothing broader. Which component or concept best fits?
  Back: Least Privilege — Restricts roles and permissions to required actions, limiting misuse, accident scope, and privilege escalation opportunities.

### Hashing (`hashing`)

- `hashing-definition` [definition, easy] Front: What is Hashing?
  Back: One-way transformation of data into a fixed-length digest within authentication and access control security workflows.
- `hashing-mechanism` [understanding, medium] Front: How does Hashing turn input into a fixed digest that reveals change?
  Back: Runs input through a one-way algorithm that deterministically produces a fixed-length digest, exposing changes when inputs differ.
- `hashing-scenario` [application, medium] Front: Scenario: A system needs a one-way digest for integrity checking rather than reversible secrecy. Which component or concept best fits?
  Back: Hashing — Processes input through a deterministic algorithm to produce a fixed digest for integrity checks and password verification.

### Encryption (`encryption`)

- `encryption-definition` [definition, easy] Front: What is Encryption?
  Back: Reversible transformation that protects confidentiality with keys within authentication and access control security workflows.
- `encryption-mechanism` [understanding, medium] Front: How does Encryption turn plaintext into ciphertext that only the right key can reverse?
  Back: Transforms plaintext with a key and algorithm into ciphertext, and only the correct key reverses that transformation.
- `encryption-scenario` [application, medium] Front: Scenario: Data must be unreadable without the correct key but recoverable for authorized use. Which component or concept best fits?
  Back: Encryption — Uses algorithms and keys to transform plaintext into ciphertext that authorized parties can later decrypt.

### Social Engineering (`social-engineering`)

- `social-engineering-definition` [definition, easy] Front: What is Social Engineering?
  Back: Psychological manipulation used to trick users into unsafe actions within foundational user-focused security awareness contexts.
- `social-engineering-mechanism` [understanding, medium] Front: How does Social Engineering exploit trust or urgency to trigger unsafe actions?
  Back: Manipulates trust, urgency, or authority cues so people reveal information or perform unsafe actions.
- `social-engineering-scenario` [application, medium] Front: Scenario: An attacker is using urgency, trust, or fear to trick a user into unsafe behavior. Which component or concept best fits?
  Back: Social Engineering — Uses persuasion, urgency, trust, or deception to influence users into bypassing normal security behavior.

### Certificate (`certificate`)

- `certificate-definition` [definition, easy] Front: What is Certificate?
  Back: Digitally signed record that binds an identity to a public key.
- `certificate-mechanism` [understanding, medium] Front: How does Certificate prove identity before trusting a public key?
  Back: A trusted issuer signs identity details and a public key, and the client validates that signature before accepting the key.
- `certificate-scenario` [application, medium] Front: Scenario: A client must decide whether to trust the public key presented by a server. Which component or concept best fits?
  Back: Certificate — Lets systems verify who a server or user claims to be before trusting that key.


## Week 27 - TryHackMe Cyber Security 101 + breach journal capstone

- Phase: Security
- Deliverable: Three breach summaries + management brief
- Checkpoint: Can translate technical incidents into management language.
- Study-week relationship: The ordered glossary terms for Week 27 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Reconnaissance (`reconnaissance`)

- `reconnaissance-definition` [definition, easy] Front: What is Reconnaissance?
  Back: Information-gathering phase used by attackers before exploitation.
- `reconnaissance-mechanism` [understanding, medium] Front: How does Reconnaissance work step by step?
  Back: Collects public or reachable information first, then uses those findings to choose likely targets and attack paths.
- `reconnaissance-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Reconnaissance — Collects target information from public or direct sources before exploitation, phishing, or lateral movement attempts.

### Enumeration (`enumeration`)

- `enumeration-definition` [definition, easy] Front: What is Enumeration?
  Back: Active discovery of services, accounts, or resources on a target.
- `enumeration-mechanism` [understanding, medium] Front: How does Enumeration work step by step?
  Back: Queries exposed services, users, shares, or directories step by step to expand knowledge of a target environment.
- `enumeration-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Enumeration — Queries services, directories, or hosts to identify available accounts, ports, shares, and software details.

### Privilege Escalation (`privilege-escalation`)

- `privilege-escalation-definition` [definition, easy] Front: What is Privilege Escalation?
  Back: Technique for gaining higher permissions than initially granted.
- `privilege-escalation-mechanism` [understanding, medium] Front: How does Privilege Escalation work step by step?
  Back: Abuses misconfigurations, weak permissions, or software flaws to gain rights beyond the attacker's starting level.
- `privilege-escalation-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Privilege Escalation — Exploits misconfigurations or software flaws to obtain permissions beyond the initial security context.

### Defense in Depth (`defense-in-depth`)

- `defense-in-depth-definition` [definition, easy] Front: What is Defense in Depth?
  Back: Layered control strategy so one failed safeguard does not cause total failure.
- `defense-in-depth-mechanism` [understanding, medium] Front: How does Defense in Depth work step by step?
  Back: Layers preventive, detective, and corrective controls so one failure does not expose the full asset.
- `defense-in-depth-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Defense in Depth — Applies multiple safeguards across layers so a single control failure does not expose the entire environment.

### Incident Journal (`incident-journal`)

- `incident-journal-definition` [definition, easy] Front: What is Incident Journal?
  Back: Structured notes capturing incident observations, decisions, and rationale.
- `incident-journal-mechanism` [understanding, medium] Front: How does Incident Journal work step by step?
  Back: Records timestamps, actions, findings, and decisions in order so the investigation can be reconstructed accurately later.
- `incident-journal-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Incident Journal — Records timestamps, observations, hypotheses, and actions in sequence to support investigation continuity and review.

### Control Recommendation (`control-recommendation`)

- `control-recommendation-definition` [definition, easy] Front: What is Control Recommendation?
  Back: Actionable proposal to improve prevention, detection, or response capability.
- `control-recommendation-mechanism` [understanding, medium] Front: How does Control Recommendation work step by step?
  Back: Links an identified gap to a specific safeguard, owner, and priority so remediation can be executed.
- `control-recommendation-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Control Recommendation — Documents a proposed safeguard, rationale, owner, and priority for reducing identified risk.

### Lateral Movement (`lateral-movement`)

- `lateral-movement-definition` [definition, easy] Front: What is Lateral Movement?
  Back: Post-compromise activity where an attacker moves from one system to other reachable systems.
- `lateral-movement-mechanism` [understanding, medium] Front: How does Lateral Movement let an attacker pivot beyond the first compromised host?
  Back: Uses stolen access, trust paths, or remote tools to pivot from the initial foothold into additional internal systems.
- `lateral-movement-scenario` [application, medium] Front: Scenario: After one system is compromised, the attacker begins using trust relationships to reach additional internal machines. Which component or concept best fits?
  Back: Lateral Movement — Expands attacker access and increases the damage that one compromised account or host can cause.


## Week 28 - CISA incident response materials and playbook thinking

- Phase: GRC / Application
- Deliverable: IR checklist + roles matrix
- Checkpoint: Can think about incidents in terms of preparation, roles, and business continuity.
- Study-week relationship: The ordered glossary terms for Week 28 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Incident Command (`incident-command`)

- `incident-command-definition` [definition, easy] Front: What is Incident Command?
  Back: Leadership structure coordinating decisions and responsibilities during incidents.
- `incident-command-mechanism` [understanding, medium] Front: How does Incident Command work step by step?
  Back: Assigns leadership, roles, and reporting lines so technical response and business decisions stay coordinated under pressure.
- `incident-command-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Incident Command — Assigns command roles, decision authority, and coordination channels so response teams act under a consistent structure.

### Playbook (`playbook`)

- `playbook-definition` [definition, easy] Front: What is Playbook?
  Back: Documented response workflow for recurring security scenarios.
- `playbook-mechanism` [understanding, medium] Front: How does Playbook turn a known situation into repeatable response steps?
  Back: Defines trigger conditions, required steps, and decision points so analysts handle repeat scenarios the same way each time.
- `playbook-scenario` [application, medium] Front: Scenario: A repeated problem should be handled through documented steps rather than memory alone. Which component or concept best fits?
  Back: Playbook — Documents response steps, roles, decision points, and evidence requirements for a recurring incident scenario.

### Maturity Model (`maturity-model`)

- `maturity-model-definition` [definition, easy] Front: What is Maturity Model?
  Back: Framework used to assess current capability level and improvement targets.
- `maturity-model-mechanism` [understanding, medium] Front: How does Maturity Model work step by step?
  Back: Defines staged capability levels with observable practices so programs can judge progress against a target state.
- `maturity-model-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Maturity Model — Rates current process capability against defined levels to guide staged improvement planning.

### Communication Plan (`communication-plan`)

- `communication-plan-definition` [definition, easy] Front: What is Communication Plan?
  Back: Documented messaging protocol for stakeholders during security events.
- `communication-plan-mechanism` [understanding, medium] Front: How does Communication Plan work step by step?
  Back: Defines audiences, triggers, channels, and message owners so incident updates move on schedule without conflicting reports.
- `communication-plan-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Communication Plan — Defines notification paths, message timing, approval points, and audiences during an incident response process.

### Evidence Handling (`evidence-handling`)

- `evidence-handling-definition` [definition, easy] Front: What is Evidence Handling?
  Back: Process for collecting and preserving evidence with integrity.
- `evidence-handling-mechanism` [understanding, medium] Front: How does Evidence Handling work step by step?
  Back: Acquires, labels, stores, and transfers artifacts using repeatable procedures that preserve integrity and analyst context.
- `evidence-handling-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Evidence Handling — Collects, labels, stores, and transfers artifacts using documented procedures that preserve reliability and traceability.

### Tabletop Exercise (`tabletop-exercise`)

- `tabletop-exercise-definition` [definition, easy] Front: What is Tabletop Exercise?
  Back: Scenario-based drill used to test readiness and coordination.
- `tabletop-exercise-mechanism` [understanding, medium] Front: How does Tabletop Exercise work step by step?
  Back: Walks participants through a scenario, pauses at decision points, and compares responses to expected actions and gaps.
- `tabletop-exercise-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Tabletop Exercise — Walks stakeholders through a scenario to test decisions, communications, and documented response procedures.

### Chain of Custody (`chain-of-custody`)

- `chain-of-custody-definition` [definition, easy] Front: What is Chain of Custody?
  Back: Record of who handled evidence, when, and why.
- `chain-of-custody-mechanism` [understanding, medium] Front: How does Chain of Custody work step by step?
  Back: Documents who collected, transferred, stored, and examined evidence so handling remains traceable and defensible.
- `chain-of-custody-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Chain of Custody — Documents each evidence transfer, handler, timestamp, and purpose to preserve admissibility and integrity.


## Week 29 - Critical infrastructure, governance, risk, and assessment mindset

- Phase: GRC / Application
- Deliverable: Risk register + control map
- Checkpoint: Can talk about cyber in governance and resilience terms, not just tools.
- Study-week relationship: The ordered glossary terms for Week 29 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Critical Infrastructure (`critical-infrastructure`)

- `critical-infrastructure-definition` [definition, easy] Front: What is Critical Infrastructure?
  Back: Systems essential to societal and economic stability.
- `critical-infrastructure-mechanism` [understanding, medium] Front: How does Critical Infrastructure work step by step?
  Back: Depends on interlocking services, suppliers, and control systems, so failure in one area can cascade into others.
- `critical-infrastructure-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Critical Infrastructure — Includes essential services whose disruption would significantly affect safety, economy, health, or national security.

### Business Impact Analysis (`business-impact-analysis`)

- `business-impact-analysis-definition` [definition, easy] Front: What is Business Impact Analysis?
  Back: Process for identifying operational effects of disruption over time.
- `business-impact-analysis-mechanism` [understanding, medium] Front: How does Business Impact Analysis work step by step?
  Back: Maps business processes to dependencies, outage tolerances, and recovery needs so disruption consequences can be measured.
- `business-impact-analysis-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Business Impact Analysis — Estimates process disruption effects, recovery priorities, and tolerable downtime for critical business functions.

### Governance (`governance`)

- `governance-definition` [definition, easy] Front: What is Governance?
  Back: Decision framework defining accountability, policy, and oversight.
- `governance-mechanism` [understanding, medium] Front: How does Governance work step by step?
  Back: Assigns decision rights, accountability, and policy direction so security work aligns with organizational objectives.
- `governance-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Governance — Assigns decision rights, policy direction, and oversight mechanisms for managing cybersecurity activities.

### Compliance (`compliance`)

- `compliance-definition` [definition, easy] Front: What is Compliance?
  Back: Conformance to laws, regulations, standards, or internal policies.
- `compliance-mechanism` [understanding, medium] Front: How does Compliance work step by step?
  Back: Compares actual practices and evidence against a required standard, then records where controls meet or miss expectations.
- `compliance-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Compliance — Measures implemented practices against external or internal requirements and documents conformity or deficiency.

### Risk Assessment (`risk-assessment`)

- `risk-assessment-definition` [definition, easy] Front: What is Risk Assessment?
  Back: Structured evaluation of risk likelihood, impact, and treatment options.
- `risk-assessment-mechanism` [understanding, medium] Front: How does Risk Assessment work step by step?
  Back: Identifies assets, threats, vulnerabilities, likelihood, and impact, then combines them into prioritized risk statements.
- `risk-assessment-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Risk Assessment — Identifies assets, threats, vulnerabilities, likelihood, and impact to support informed treatment decisions.

### Vendor Risk (`vendor-risk`)

- `vendor-risk-definition` [definition, easy] Front: What is Vendor Risk?
  Back: Risk introduced by third-party suppliers and service providers.
- `vendor-risk-mechanism` [understanding, medium] Front: How does Vendor Risk work step by step?
  Back: Evaluates third-party access, handling practices, and dependency impact so supplier exposure is understood before onboarding.
- `vendor-risk-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Vendor Risk — Assesses how third-party access, services, dependencies, or weaknesses affect organizational security exposure.

### Risk Owner (`risk-owner`)

- `risk-owner-definition` [definition, easy] Front: What is Risk Owner?
  Back: Person or role accountable for deciding how a specific risk is handled.
- `risk-owner-mechanism` [understanding, medium] Front: How does Risk Owner keep treatment decisions tied to an accountable role?
  Back: Receives the risk details, chooses treatment or acceptance, and remains accountable for that decision over time.
- `risk-owner-scenario` [application, medium] Front: Scenario: A risk register entry needs a named decision-maker who must approve treatment or acceptance. Which component or concept best fits?
  Back: Risk Owner — Ensures each risk has a responsible decision-maker instead of being left unresolved.


## Week 30 - TryHackMe Defensive Security: SOC, forensics, IR, and logs

- Phase: GRC / Application
- Deliverable: SOC workflow + lab notes
- Checkpoint: Can describe a defensive workflow from alert to escalation.
- Study-week relationship: The ordered glossary terms for Week 30 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### SOC Workflow (`soc-workflow`)

- `soc-workflow-definition` [definition, easy] Front: What is SOC Workflow?
  Back: End-to-end process from alert intake to closure and lessons learned.
- `soc-workflow-mechanism` [understanding, medium] Front: How does SOC Workflow work step by step?
  Back: Moves work from alert intake through investigation, escalation, and closure using defined roles, tooling, and handoff points.
- `soc-workflow-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: SOC Workflow — Moves work from intake through triage, investigation, containment, and closure using defined operational procedures.

### Forensic Imaging (`forensic-imaging`)

- `forensic-imaging-definition` [definition, easy] Front: What is Forensic Imaging?
  Back: Bit-level copy of media created for evidence analysis.
- `forensic-imaging-mechanism` [understanding, medium] Front: How does Forensic Imaging work step by step?
  Back: Copies storage bit for bit, verifies the image with hashes, and preserves the original media from further change.
- `forensic-imaging-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Forensic Imaging — Creates a sector-level duplicate of media while preserving source state for repeatable forensic examination.

### Chain of Custody (`chain-of-custody`)

- `chain-of-custody-definition` [definition, easy] Front: What is Chain of Custody?
  Back: Record of who handled evidence, when, and why.
- `chain-of-custody-mechanism` [understanding, medium] Front: How does Chain of Custody work step by step?
  Back: Documents who collected, transferred, stored, and examined evidence so handling remains traceable and defensible.
- `chain-of-custody-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Chain of Custody — Documents each evidence transfer, handler, timestamp, and purpose to preserve admissibility and integrity.

### Log Correlation (`log-correlation`)

- `log-correlation-definition` [definition, easy] Front: What is Log Correlation?
  Back: Linking events from multiple sources to reveal meaningful patterns.
- `log-correlation-mechanism` [understanding, medium] Front: How does Log Correlation work step by step?
  Back: Joins events across sources by time, host, user, or session so one isolated signal becomes a complete narrative.
- `log-correlation-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Log Correlation — Combines events across sources by time, host, user, or indicator to reveal attack sequences.

### Detection Rule (`detection-rule`)

- `detection-rule-definition` [definition, easy] Front: What is Detection Rule?
  Back: Logic used by monitoring systems to trigger alerts.
- `detection-rule-mechanism` [understanding, medium] Front: How does Detection Rule work step by step?
  Back: Evaluates events against defined conditions, thresholds, or sequences and generates alerts when matching activity appears.
- `detection-rule-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Detection Rule — Evaluates log fields, thresholds, and patterns against conditions that generate actionable security alerts.

### Triage Queue (`triage-queue`)

- `triage-queue-definition` [definition, easy] Front: What is Triage Queue?
  Back: Ordered list of alerts or cases awaiting analyst review.
- `triage-queue-mechanism` [understanding, medium] Front: How does Triage Queue work step by step?
  Back: Ranks incoming work by severity, confidence, and business impact so limited analyst time goes to the riskiest items first.
- `triage-queue-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Triage Queue — Maintains pending alerts or cases in prioritized order so analysts work according to urgency and capacity.

### Alert Triage (`alert-triage`)

- `alert-triage-definition` [definition, easy] Front: What is Alert Triage?
  Back: Initial analysis process that validates and prioritizes alerts.
- `alert-triage-mechanism` [understanding, medium] Front: How does Alert Triage work step by step?
  Back: Checks source fidelity, correlates nearby telemetry, and assigns severity so analysts queue real threats ahead of benign noise.
- `alert-triage-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Alert Triage — Reviews alert context, validates indicators, and assigns priority so analysts address the most credible threats first.

### Indicator of Compromise (`ioc`)

- `ioc-definition` [definition, easy] Front: What is Indicator of Compromise?
  Back: Observable evidence suggesting malicious activity occurred.
- `ioc-mechanism` [understanding, medium] Front: How does Indicator of Compromise work step by step?
  Back: Uses observable artifacts such as hashes, domains, or registry changes to match activity against known malicious patterns.
- `ioc-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Indicator of Compromise — Captures observable artifacts such as hashes, domains, IPs, or processes associated with malicious activity.


## Week 31 - Portfolio packaging, mock briefing, and next-step planning

- Phase: GRC / Application
- Deliverable: Final portfolio pack + next-step plan
- Checkpoint: You have a usable portfolio and a credible next-step roadmap.
- Study-week relationship: The ordered glossary terms for Week 31 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Executive Briefing (`executive-briefing`)

- `executive-briefing-definition` [definition, easy] Front: What is Executive Briefing?
  Back: Concise leadership-facing summary of risk, impact, and recommended action.
- `executive-briefing-mechanism` [understanding, medium] Front: How does Executive Briefing work step by step?
  Back: Condenses technical facts into business impact, decision needs, and recommended actions suited to leadership review.
- `executive-briefing-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Executive Briefing — Summarizes technical findings into business impact, options, and decisions needed by senior leadership.

### Management Summary (`management-summary`)

- `management-summary-definition` [definition, easy] Front: What is Management Summary?
  Back: Non-technical overview focused on business impact and decisions needed.
- `management-summary-mechanism` [understanding, medium] Front: How does Management Summary work step by step?
  Back: Distills detailed analysis into risk, impact, and recommended action so managers can decide quickly.
- `management-summary-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Management Summary — Condenses technical detail into concise statements about business effect, priority, and recommended actions.

### Artifact Curation (`artifact-curation`)

- `artifact-curation-definition` [definition, easy] Front: What is Artifact Curation?
  Back: Selecting and organizing portfolio evidence for clear storytelling within cybersecurity job-search and portfolio workflows.
- `artifact-curation-mechanism` [understanding, medium] Front: How does Artifact Curation work step by step?
  Back: Sorts artifacts by relevance and quality, then keeps strong evidence while removing duplicates, weak samples, and formatting noise.
- `artifact-curation-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Artifact Curation — Selects representative evidence, standardizes presentation, and removes weak samples before publishing portfolio materials.

### Roadmap Prioritization (`roadmap-prioritization`)

- `roadmap-prioritization-definition` [definition, easy] Front: What is Roadmap Prioritization?
  Back: Choosing next learning or capability steps based on impact and constraints.
- `roadmap-prioritization-mechanism` [understanding, medium] Front: How does Roadmap Prioritization work step by step?
  Back: Ranks initiatives by risk reduction, effort, dependency, and timing so the backlog can be sequenced realistically.
- `roadmap-prioritization-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Roadmap Prioritization — Ranks planned improvements by impact, dependency, cost, and timing to sequence work realistically.

### Capability Gap (`capability-gap`)

- `capability-gap-definition` [definition, easy] Front: What is Capability Gap?
  Back: Difference between current skills/process maturity and target state.
- `capability-gap-mechanism` [understanding, medium] Front: How does Capability Gap work step by step?
  Back: Compares current people, process, and tooling against a target state to show what is missing.
- `capability-gap-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Capability Gap — Compares current staffing, tooling, or process maturity against required outcomes to identify deficiencies.

### Continuous Improvement (`continuous-improvement`)

- `continuous-improvement-definition` [definition, easy] Front: What is Continuous Improvement?
  Back: Ongoing cycle of measuring outcomes and refining process.
- `continuous-improvement-mechanism` [understanding, medium] Front: How does Continuous Improvement work step by step?
  Back: Uses review findings, metrics, and repeated adjustments to raise control effectiveness over successive cycles.
- `continuous-improvement-scenario` [application, medium] Front: Scenario: The team needs the concept that best matches the situation. Which component or concept best fits?
  Back: Continuous Improvement — Uses metrics, lessons learned, and review cycles to refine controls, processes, and training over time.

### Portfolio Artifact (`portfolio-artifact`)

- `portfolio-artifact-definition` [definition, easy] Front: What is Portfolio Artifact?
  Back: Concrete evidence of work quality such as write-ups, diagrams, or labs within cybersecurity job-search and portfolio workflows.
- `portfolio-artifact-mechanism` [understanding, medium] Front: How does Portfolio Artifact work step by step?
  Back: Packages one concrete output with context, methods, and result so a reviewer can understand what was built and why.
- `portfolio-artifact-scenario` [application, medium] Front: Scenario: A candidate needs the career or portfolio concept that best matches the situation. Which component or concept best fits?
  Back: Portfolio Artifact — Captures a completed deliverable with context, method, and outcome so reviewers can evaluate practical capability.


## Week 32 - Catch-up, comprehensive review, and study-system reset

- Phase: Buffer / Final Review
- Deliverable: Completion checklist + retrospective
- Checkpoint: Everything is either complete or deliberately parked with a next step.
- Study-week relationship: The ordered glossary terms for Week 32 match the syllabus focus for Days 1-5, appear on their first relevant day only, roll up into a full review deck on Day 6, and leave Day 7 empty for rest.

### Spaced Repetition (`spaced-repetition`)

- `spaced-repetition-definition` [definition, easy] Front: What is Spaced Repetition?
  Back: Review technique that revisits material at increasing intervals within structured review and exam preparation.
- `spaced-repetition-mechanism` [understanding, medium] Front: How does Spaced Repetition work step by step?
  Back: Schedules reviews at increasing intervals, bringing material back near the point it would otherwise be forgotten.
- `spaced-repetition-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Spaced Repetition — Schedules reviews at expanding intervals based on difficulty and prior recall performance.

### Retrieval Practice (`retrieval-practice`)

- `retrieval-practice-definition` [definition, easy] Front: What is Retrieval Practice?
  Back: Actively recalling information without notes to strengthen memory within structured review and exam preparation.
- `retrieval-practice-mechanism` [understanding, medium] Front: How does Retrieval Practice work step by step?
  Back: Forces recall from memory first, then checks the answer so weak traces are strengthened through correction.
- `retrieval-practice-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Retrieval Practice — Forces recall from memory without prompts, strengthening retention and identifying weak recall paths.

### Mock Exam (`mock-exam`)

- `mock-exam-definition` [definition, easy] Front: What is Mock Exam?
  Back: Practice test used to simulate exam conditions and identify weak areas within structured review and exam preparation.
- `mock-exam-mechanism` [understanding, medium] Front: How does Mock Exam work step by step?
  Back: Simulates test conditions, measures performance under time limits, and reveals weak domains before the real exam.
- `mock-exam-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Mock Exam — Simulates exam timing, format, and pressure to measure readiness under realistic test conditions.

### Error Log (`error-log`)

- `error-log-definition` [definition, easy] Front: What is Error Log?
  Back: Structured list of mistakes, misconceptions, and corrective notes within structured review and exam preparation.
- `error-log-mechanism` [understanding, medium] Front: How does Error Log work step by step?
  Back: Captures failed questions or mistakes, records why they happened, and turns them into targeted review items.
- `error-log-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Error Log — Records missed questions, wrong assumptions, and corrections so review targets recurring failure patterns.

### Knowledge Gap (`knowledge-gap`)

- `knowledge-gap-definition` [definition, easy] Front: What is Knowledge Gap?
  Back: Specific topic where understanding is currently insufficient within structured review and exam preparation.
- `knowledge-gap-mechanism` [understanding, medium] Front: How does Knowledge Gap work step by step?
  Back: Appears when retrieval or application fails, indicating a topic that needs focused review or practice.
- `knowledge-gap-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Knowledge Gap — Identifies a specific concept needing further study based on errors, uncertainty, or weak explanation.

### Study-System Reset (`study-system-reset`)

- `study-system-reset-definition` [definition, easy] Front: What is Study-System Reset?
  Back: Planned refinement of schedule, methods, and tooling after review within structured review and exam preparation.
- `study-system-reset-mechanism` [understanding, medium] Front: How does Study-System Reset work step by step?
  Back: Rebuilds the plan by clearing stale tasks, reordering priorities, and restoring a workable review cadence.
- `study-system-reset-scenario` [application, medium] Front: Scenario: A review workflow needs the study concept that best matches the problem. Which component or concept best fits?
  Back: Study-System Reset — Adjusts schedule, review methods, and tooling after analyzing progress, workload, and missed objectives.

## Canonical Sources

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

If the content data changes, regenerate this document so the counts, week mappings, and flashcard wording stay synchronized.
