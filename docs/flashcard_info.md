# Flashcard Information

## Executive Summary

This document is derived from the canonical content files in `src/data/content/` and covers all 570 unique flashcards used by the 32-week study companion.

Flashcard creation model:
- Glossary terms are the source of truth.
- Each glossary entry contains exactly three teaching bullets: definition, function/application, and mechanism/mental model.
- Each glossary entry is converted into exactly three flashcards with matching suffixes: `-definition`, `-function`, and `-mechanism`.
- The flashcard front changes by card type, but the flashcard back stays aligned to the glossary teaching point it was created from.
- Study days assign cards through `day.flashcard_ids`; weeks aggregate those same cards through `week.flashcard_ids`; review decks reuse the weekly set on Day 6.
- Day 7 is intentionally a rest day, so it introduces no new required flashcards.

Deck totals:
- 32 weeks
- 224 day records
- 190 unique glossary terms
- 570 unique flashcards
- 576 week-level flashcard slots across the roadmap
- 32 review decks that point back to the same weekly flashcard sets

Why week-level slots are higher than unique flashcards:
- `switch` (Switch) appears in weeks 06, 07.
- `playbook` (Playbook) appears in weeks 21, 28.

Phase breakdown:
- Foundation: 5 weeks
- Networking: 7 weeks
- Security: 15 weeks
- GRC / Application: 4 weeks
- Buffer / Final Review: 1 week

## Week-to-Topic Map

| Week | Phase | Weekly focus | Glossary terms | Flashcards |
| --- | --- | --- | ---: | ---: |
| 01 | Foundation | A+ Core 1: hardware, boot process, and internal components | 6 | 18 |
| 02 | Foundation | A+ Core 1: mobile devices, networking basics, wireless, and virtualization | 6 | 18 |
| 03 | Foundation | A+ Core 2: operating systems, installs, file systems, and admin basics | 6 | 18 |
| 04 | Foundation | A+ Core 2: security, support professionalism, and troubleshooting method | 6 | 18 |
| 05 | Foundation | Linux ramp-up and first VM build | 6 | 18 |
| 06 | Networking | Networking foundations: models, media, devices, and topologies | 6 | 18 |
| 07 | Networking | Ethernet, switching, routing, and gateways | 6 | 18 |
| 08 | Networking | IPv4 addressing, subnetting, and address planning | 6 | 18 |
| 09 | Networking | TCP, UDP, ports, DNS, DHCP, NAT, and service flow | 6 | 18 |
| 10 | Networking | Wireless, SOHO design, cloud, and network security basics | 6 | 18 |
| 11 | Networking | Wireshark and troubleshooting with packet evidence | 6 | 18 |
| 12 | Networking | TryHackMe Pre Security and end-to-end web request capstone | 6 | 18 |
| 13 | Security | Google Course 1: Foundations of Cybersecurity | 6 | 18 |
| 14 | Security | Google Course 2: Play It Safe - Manage Security Risks | 6 | 18 |
| 15 | Security | Google Course 3: Networks and Network Security | 6 | 18 |
| 16 | Security | Google Course 4: Linux and SQL (part 1 - Linux) | 6 | 18 |
| 17 | Security | Google Course 4: Linux and SQL (part 2 - SQL) | 6 | 18 |
| 18 | Security | Google Course 5: Assets, threats, and vulnerabilities (part 1) | 6 | 18 |
| 19 | Security | Google Course 5: Assets, threats, and vulnerabilities (part 2) | 6 | 18 |
| 20 | Security | Google Course 6: Detection and response (part 1) | 6 | 18 |
| 21 | Security | Google Course 6: Detection and response (part 2) | 6 | 18 |
| 22 | Security | Google Course 7: Python automation (part 1) | 6 | 18 |
| 23 | Security | Google Course 7: Python automation (part 2) | 6 | 18 |
| 24 | Security | Google Course 8: Prepare for cybersecurity jobs | 6 | 18 |
| 25 | Security | Google Course 9: Job search systems, AI support, and profile polish | 6 | 18 |
| 26 | Security | Security+ reinforcement: IAM, crypto, and social engineering | 6 | 18 |
| 27 | Security | TryHackMe Cyber Security 101 + breach journal capstone | 6 | 18 |
| 28 | GRC / Application | CISA incident response materials and playbook thinking | 6 | 18 |
| 29 | GRC / Application | Critical infrastructure, governance, risk, and assessment mindset | 6 | 18 |
| 30 | GRC / Application | TryHackMe Defensive Security: SOC, forensics, IR, and logs | 6 | 18 |
| 31 | GRC / Application | Portfolio packaging, mock briefing, and next-step planning | 6 | 18 |
| 32 | Buffer / Final Review | Catch-up, comprehensive review, and study-system reset | 6 | 18 |

## Week-by-Week Flashcards

Each week section explains the topic fit, then lists every flashcard attached to that week.

## Week 01 - A+ Core 1: hardware, boot process, and internal components

- Phase: Foundation
- Deliverable: Hardware glossary + power-on-to-login diagram
- Checkpoint: Can explain what each main computer component does and how a system boots.
- Study-week relationship: The six glossary terms for Week 01 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### CPU (`cpu`)

- `cpu-definition` [definition, easy] Front: What is CPU?
  Back: Central Processing Unit; executes instructions and coordinates processing tasks within endpoint hardware and platform operations.
- `cpu-function` [application, medium] Front: Scenario: A system needs the component that executes instructions and coordinates processing, not the part used mainly for long-term storage. Which component best fits?
  Back: CPU — Fetches, decodes, and executes instructions while coordinating arithmetic, logic, and control operations across the system.
- `cpu-mechanism` [understanding, medium] Front: How does CPU handle instruction execution during operation?
  Back: Fetches instructions, decodes them, and executes operations while registers and caches keep data close to processing cores.

### RAM (`ram`)

- `ram-definition` [definition, easy] Front: What is RAM?
  Back: Volatile memory used for active processes and short-term data access within endpoint hardware and platform operations.
- `ram-function` [application, medium] Front: Scenario: A workstation becomes sluggish when many apps stay open. Which component upgrade best improves active multitasking rather than long-term file storage?
  Back: RAM — Holds active instructions and data in fast volatile memory for immediate CPU access during execution.
- `ram-mechanism` [understanding, medium] Front: How does RAM handle active memory access during operation?
  Back: Holds active instructions and data in fast volatile cells that the CPU can read or update quickly.

### Storage Drive (`storage-drive`)

- `storage-drive-definition` [definition, easy] Front: In one phrase, what is Storage Drive?
  Back: Persistent storage device such as HDD or SSD for operating system and files.
- `storage-drive-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for file access, not a storage-only upgrade. Which option best fits?
  Back: Storage Drive — Persists operating system files and user data by writing blocks to magnetic or solid-state media.
- `storage-drive-mechanism` [understanding, medium] Front: What happens inside Storage Drive during file access processing?
  Back: Writes data into addressable sectors or cells, then retrieves it later through the controller and filesystem mapping.

### Motherboard (`motherboard`)

- `motherboard-definition` [definition, easy] Front: In one phrase, what is Motherboard?
  Back: Main circuit board that connects CPU, memory, storage, and expansion components within endpoint hardware and platform operations.
- `motherboard-function` [application, medium] Front: Scenario: CPU and RAM must communicate with storage and expansion devices. Which component provides the primary system interconnect rather than long-term storage?
  Back: Motherboard — Provides power distribution, bus pathways, firmware interfaces, and sockets connecting the main system components.
- `motherboard-mechanism` [understanding, medium] Front: What happens inside Motherboard during system interconnect processing?
  Back: Connects CPU, memory, firmware, storage, and buses so components can exchange power, timing, and data signals.

### BIOS/UEFI Firmware (`bios`)

- `bios-definition` [definition, easy] Front: In one phrase, what is BIOS/UEFI Firmware?
  Back: Low-level firmware that initializes hardware and starts the boot process within endpoint hardware and platform operations.
- `bios-function` [application, medium] Front: Scenario: You need to choose a USB boot device before the operating system loads. Which firmware interface should you use instead of an OS settings tool?
  Back: BIOS/UEFI Firmware — Initializes hardware, runs platform checks, and locates a bootable device before handing control to the loader.
- `bios-mechanism` [understanding, medium] Front: What happens inside BIOS/UEFI Firmware during startup handoff processing?
  Back: Initializes hardware, selects a boot target, and hands execution to the bootloader after hardware checks pass.

### Boot Process (`boot-process`)

- `boot-process-definition` [definition, easy] Front: What is Boot Process?
  Back: Sequence that moves a system from power-on to a usable operating system session.
- `boot-process-function` [application, medium] Front: Scenario: A technician is tracing what happens after power-on and before the login screen appears. Which startup sequence best matches that path rather than a user session task?
  Back: Boot Process — Transitions from firmware execution to loader, kernel initialization, service startup, and interactive user access.
- `boot-process-mechanism` [understanding, medium] Front: How does Boot Process handle boot sequencing during operation?
  Back: Starts with firmware, loads boot code, initializes the kernel, and then launches system services and user space.


## Week 02 - A+ Core 1: mobile devices, networking basics, wireless, and virtualization

- Phase: Foundation
- Deliverable: Home-network map + ports and protocols sheet
- Checkpoint: Can identify common devices, ports, and SOHO troubleshooting steps.
- Study-week relationship: The six glossary terms for Week 02 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Mobile Device (`mobile-device`)

- `mobile-device-definition` [definition, easy] Front: In one phrase, what is Mobile Device?
  Back: Portable endpoint such as a laptop, tablet, or smartphone with dedicated management constraints.
- `mobile-device-function` [application, medium] Front: Scenario: You need to choose a USB boot device before the operating system loads. Which firmware interface should you use instead of an OS settings tool?
  Back: Mobile Device — Integrates compute components, radios, sensors, and power controls under mobile operating system management policies.
- `mobile-device-mechanism` [understanding, medium] Front: What happens inside Mobile Device during shared responsibility processing?
  Back: Combines radios, sensors, firmware, and an OS into a handheld platform that manages apps, identity, and data.

### Wi-Fi Standard (`wifi-standard`)

- `wifi-standard-definition` [definition, easy] Front: In one phrase, what is Wi-Fi Standard?
  Back: Wireless networking specification such as 802.11n/ac/ax defining speed and capability within routed and switched network environments.
- `wifi-standard-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for wireless compatibility, not the option chosen only for speed. Which option best fits?
  Back: Wi-Fi Standard — Defines modulation, channel use, throughput, and features for compatible wireless LAN communication.
- `wifi-standard-mechanism` [understanding, medium] Front: What happens inside Wi-Fi Standard during wireless compatibility processing?
  Back: Defines channel use, modulation, and protocol features so wireless clients and access points can communicate compatibly.

### IP Address (`ip-address`)

- `ip-address-definition` [definition, easy] Front: In one phrase, what is IP Address?
  Back: Logical network address used to identify a host and route traffic within routed and switched network environments.
- `ip-address-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: IP Address — Assigns a logical source or destination identifier so packets can be routed between networks.
- `ip-address-mechanism` [understanding, medium] Front: What happens inside IP Address during request handling processing?
  Back: Combines network and host portions so packets can be routed to the correct interface and endpoint.

### Virtual Machine (`virtual-machine`)

- `virtual-machine-definition` [definition, easy] Front: What is Virtual Machine?
  Back: Software-defined computer running an operating system inside a host system within endpoint hardware and platform operations.
- `virtual-machine-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for a guest operating, not a storage-only upgrade. Which option best fits?
  Back: Virtual Machine — Runs a guest operating system with emulated hardware isolated from the underlying host environment.
- `virtual-machine-mechanism` [understanding, medium] Front: How does Virtual Machine handle a guest operating during operation?
  Back: Runs a guest OS on virtualized hardware abstractions so workloads remain isolated from the host and from each other.

### Hypervisor (`hypervisor`)

- `hypervisor-definition` [definition, easy] Front: What is Hypervisor?
  Back: Layer that creates and manages virtual machines on host hardware within endpoint hardware and platform operations.
- `hypervisor-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for virtual machine management, not a storage-only upgrade. Which option best fits?
  Back: Hypervisor — Abstracts physical hardware, allocates virtual resources, and isolates guest systems running on the same host.
- `hypervisor-mechanism` [understanding, medium] Front: How does Hypervisor handle virtual machine management during operation?
  Back: Abstracts CPU, memory, storage, and network hardware so multiple guest operating systems can run in isolated virtual environments.

### DHCP (`dhcp`)

- `dhcp-definition` [definition, easy] Front: What is DHCP?
  Back: Dynamic Host Configuration Protocol; automatically assigns network settings to devices within host administration and operating system workflows.
- `dhcp-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for name resolution, not a GUI-only task. Which option best fits?
  Back: DHCP — Leases IP settings such as address, gateway, and DNS information to clients during network startup.
- `dhcp-mechanism` [understanding, medium] Front: How does DHCP handle name resolution during operation?
  Back: Leases network settings by exchanging discover, offer, request, and acknowledgment messages between client and server.


## Week 03 - A+ Core 2: operating systems, installs, file systems, and admin basics

- Phase: Foundation
- Deliverable: OS comparison grid + install / upgrade checklist
- Checkpoint: Can compare major operating systems and explain basic installation choices.
- Study-week relationship: The six glossary terms for Week 03 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Operating System (`operating-system`)

- `operating-system-definition` [definition, easy] Front: In one phrase, what is Operating System?
  Back: Core software that manages hardware, files, processes, and user interaction within endpoint hardware and platform operations.
- `operating-system-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for process scheduling, not a storage-only upgrade. Which option best fits?
  Back: Operating System — Schedules processes, manages memory, controls devices, and exposes interfaces for users and applications.
- `operating-system-mechanism` [understanding, medium] Front: What happens inside Operating System during process scheduling processing?
  Back: Schedules processes, manages memory and devices, and exposes system calls so applications can use hardware safely.

### Filesystem (`filesystem`)

- `filesystem-definition` [definition, easy] Front: In one phrase, what is Filesystem?
  Back: Structure and rules used to organize and access files on storage media.
- `filesystem-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for file access, not a storage-only upgrade. Which option best fits?
  Back: Filesystem — Maps file names to directories, metadata, and storage blocks so the operating system can read or write data.
- `filesystem-mechanism` [understanding, medium] Front: What happens inside Filesystem during file access processing?
  Back: Maps filenames to metadata and storage blocks so the OS can locate, read, write, and protect files.

### NTFS (`ntfs`)

- `ntfs-definition` [definition, easy] Front: What is NTFS?
  Back: New Technology File System used by modern Windows systems within host administration and operating system workflows.
- `ntfs-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for file access, not a GUI-only task. Which option best fits?
  Back: NTFS — Stores files with metadata, access controls, journaling, and recovery features on Windows volumes.
- `ntfs-mechanism` [understanding, medium] Front: How does NTFS handle file access during operation?
  Back: Stores file metadata in master file table records and uses permissions and journaling to manage access and recovery.

### Command Line (`command-line`)

- `command-line-definition` [definition, easy] Front: In one phrase, what is Command Line?
  Back: Text-based interface for executing operating system commands within host administration and operating system workflows.
- `command-line-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for command execution, not a GUI-only task. Which option best fits?
  Back: Command Line — Accepts typed commands, arguments, and pipelines for direct interaction with operating system utilities.
- `command-line-mechanism` [understanding, medium] Front: What happens inside Command Line during command execution processing?
  Back: Reads typed commands, parses options and arguments, then executes programs within the current shell environment.

### PowerShell (`powershell`)

- `powershell-definition` [definition, easy] Front: What is PowerShell?
  Back: Windows automation shell and scripting language for system administration within host administration and operating system workflows.
- `powershell-function` [application, medium] Front: Scenario: An administrator needs a shell that pipelines structured objects for automation, not a GUI-only management tool. Which option best fits?
  Back: PowerShell — Runs cmdlets, pipelines, and scripts against Windows objects for administration and automation tasks.
- `powershell-mechanism` [understanding, medium] Front: How does PowerShell handle object pipelines during operation?
  Back: Pipelines structured objects between commands so output can be filtered, transformed, and reused without plain-text parsing.

### Service Management (`service-management`)

- `service-management-definition` [definition, easy] Front: In one phrase, what is Service Management?
  Back: Practice of monitoring, starting, stopping, and configuring background services within host administration and operating system workflows.
- `service-management-function` [application, medium] Front: Scenario: Data must remain available after shutdown and be retrieved later. Which component provides persistent storage rather than temporary working memory?
  Back: Service Management — Starts, stops, enables, and monitors background services that provide persistent system functions.
- `service-management-mechanism` [understanding, medium] Front: What happens inside Service Management during boot sequencing processing?
  Back: Starts, stops, enables, and monitors background services using a controller that tracks state and dependencies.


## Week 04 - A+ Core 2: security, support professionalism, and troubleshooting method

- Phase: Foundation
- Deliverable: Three troubleshooting playbooks
- Checkpoint: Can follow a support process and document incidents clearly.
- Study-week relationship: The six glossary terms for Week 04 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Malware (`malware`)

- `malware-definition` [definition, easy] Front: In one phrase, what is Malware?
  Back: Malicious software designed to disrupt systems, steal data, or gain unauthorized control.
- `malware-function` [application, medium] Front: Scenario: A team needs the security operations process used for request handling, not an ad hoc analyst action. Which option best fits?
  Back: Malware — Executes malicious instructions that steal data, disrupt operations, establish persistence, or enable remote control.
- `malware-mechanism` [understanding, medium] Front: What happens inside Malware during request handling processing?
  Back: Executes code on a host, then persists, spreads, steals, encrypts, or manipulates data depending on its payload logic.

### Multi-Factor Authentication (`mfa`)

- `mfa-definition` [definition, easy] Front: What is Multi-Factor Authentication?
  Back: Authentication method requiring two or more independent proof factors within authentication and access control security workflows.
- `mfa-function` [application, medium] Front: Scenario: A system checks a password or token before creating a session. Which concept is being performed rather than the step that assigns permissions?
  Back: Multi-Factor Authentication — Combines multiple factor types, such as passwords and tokens, before granting access to a protected system.
- `mfa-mechanism` [understanding, medium] Front: How does Multi-Factor Authentication handle multiple factor types during operation?
  Back: Requires independent factors such as password plus token, so compromise of one factor does not satisfy the full check.

### Least Privilege (`least-privilege`)

- `least-privilege-definition` [definition, easy] Front: What is Least Privilege?
  Back: Security principle granting only the minimum permissions needed for a task within authentication and access control security workflows.
- `least-privilege-function` [application, medium] Front: Scenario: A team needs the identity or cryptography concept used for file access, not a control that only records activity. Which option best fits?
  Back: Least Privilege — Restricts roles and permissions to required actions, limiting misuse, accident scope, and privilege escalation opportunities.
- `least-privilege-mechanism` [understanding, medium] Front: How does Least Privilege handle file access during operation?
  Back: Starts from minimal rights, then grants narrowly scoped permissions by role, task, or time so excess access stays unavailable.

### Troubleshooting Methodology (`troubleshooting-method`)

- `troubleshooting-method-definition` [definition, easy] Front: In one phrase, what is Troubleshooting Methodology?
  Back: Structured step-by-step process for diagnosing and resolving technical issues within monitoring, investigation, and response workflows.
- `troubleshooting-method-function` [application, medium] Front: Scenario: A team needs the security operations process used for defined stages to, not an ad hoc analyst action. Which option best fits?
  Back: Troubleshooting Methodology — Follows defined stages to identify symptoms, test causes, implement fixes, and verify normal operation.
- `troubleshooting-method-mechanism` [understanding, medium] Front: What happens inside Troubleshooting Methodology during defined stages to processing?
  Back: Defines a sequence of observe, hypothesize, test, and verify so problems are isolated without random changes.

### Patch Management (`patch-management`)

- `patch-management-definition` [definition, easy] Front: In one phrase, what is Patch Management?
  Back: Process for testing, deploying, and verifying software updates within monitoring, investigation, and response workflows.
- `patch-management-function` [application, medium] Front: Scenario: A team needs the security operations process used for missing updates, not an ad hoc analyst action. Which option best fits?
  Back: Patch Management — Identifies missing updates, tests fixes, schedules deployment, and verifies installation across managed assets.
- `patch-management-mechanism` [understanding, medium] Front: What happens inside Patch Management during missing updates processing?
  Back: Identifies missing fixes, deploys approved updates, and verifies installation so known vulnerabilities are removed systematically.

### Social Engineering (`social-engineering`)

- `social-engineering-definition` [definition, easy] Front: What is Social Engineering?
  Back: Psychological manipulation used to trick users into unsafe actions within foundational user-focused security awareness contexts.
- `social-engineering-function` [application, medium] Front: Scenario: A team needs the security concept used for persuasion, not a vendor-specific feature. Which option best fits?
  Back: Social Engineering — Uses persuasion, urgency, trust, or deception to influence users into bypassing normal security behavior.
- `social-engineering-mechanism` [understanding, medium] Front: How does Social Engineering handle persuasion during operation?
  Back: Manipulates trust, urgency, or authority cues so people reveal information or perform unsafe actions.


## Week 05 - Linux ramp-up and first VM build

- Phase: Foundation
- Deliverable: Ubuntu VM + Linux command cheat sheet
- Checkpoint: Can navigate Linux comfortably enough to start labs and tooling.
- Study-week relationship: The six glossary terms for Week 05 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Linux Kernel (`linux-kernel`)

- `linux-kernel-definition` [definition, easy] Front: In one phrase, what is Linux Kernel?
  Back: Core component of Linux that manages hardware access, processes, and memory within host administration and operating system workflows.
- `linux-kernel-function` [application, medium] Front: Scenario: A technician is tracing what happens after power-on and before the login screen appears. Which startup sequence best matches that path rather than a user session task?
  Back: Linux Kernel — Handles scheduling, memory management, drivers, and system calls between software and hardware resources.
- `linux-kernel-mechanism` [understanding, medium] Front: What happens inside Linux Kernel during asset scoping processing?
  Back: Handles process scheduling, memory management, device drivers, and system calls between hardware and user space.

### Shell (`shell`)

- `shell-definition` [definition, easy] Front: In one phrase, what is Shell?
  Back: Command interpreter used to interact with the operating system within host administration and operating system workflows.
- `shell-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for command execution, not a GUI-only task. Which option best fits?
  Back: Shell — Interprets user commands, expands syntax, and launches programs within the current operating system session.
- `shell-mechanism` [understanding, medium] Front: What happens inside Shell during command execution processing?
  Back: Interprets typed commands, expands variables or wildcards, and launches programs in the current session context.

### sudo (`sudo`)

- `sudo-definition` [definition, easy] Front: In one phrase, what is sudo?
  Back: Command that allows approved users to run tasks with elevated privileges within host administration and operating system workflows.
- `sudo-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for event logging, not a GUI-only task. Which option best fits?
  Back: sudo — Temporarily runs a command with elevated privileges according to configured authorization policies.
- `sudo-mechanism` [understanding, medium] Front: What happens inside sudo during event logging processing?
  Back: Checks policy, logs the request, and runs the command with elevated identity only if the user is authorized.

### Package Manager (`package-manager`)

- `package-manager-definition` [definition, easy] Front: In one phrase, what is Package Manager?
  Back: Tool that installs, updates, and removes software packages with dependency handling within host administration and operating system workflows.
- `package-manager-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for asset scoping, not a GUI-only task. Which option best fits?
  Back: Package Manager — Retrieves packages, resolves dependencies, verifies sources, and installs or updates software consistently.
- `package-manager-mechanism` [understanding, medium] Front: What happens inside Package Manager during asset scoping processing?
  Back: Resolves dependencies, verifies package sources, and installs or updates software using repository metadata.

### VirtualBox (`virtualbox`)

- `virtualbox-definition` [definition, easy] Front: In one phrase, what is VirtualBox?
  Back: Desktop virtualization platform for running lab virtual machines within endpoint hardware and platform operations.
- `virtualbox-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for file access, not a storage-only upgrade. Which option best fits?
  Back: VirtualBox — Creates virtual machines, attaches virtual hardware, and manages snapshots for desktop lab environments.
- `virtualbox-mechanism` [understanding, medium] Front: What happens inside VirtualBox during file access processing?
  Back: Uses a host hypervisor, virtual hardware profiles, and disk images to start and manage guest operating systems.

### SSH (`ssh`)

- `ssh-definition` [definition, easy] Front: What is SSH?
  Back: Secure Shell protocol for encrypted remote administration within host administration and operating system workflows.
- `ssh-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for key-based protection, not a GUI-only task. Which option best fits?
  Back: SSH — Creates an encrypted remote session for command execution, file transfer, and administrative access.
- `ssh-mechanism` [understanding, medium] Front: How does SSH handle key-based protection during operation?
  Back: Negotiates encryption and host identity, authenticates the user, then carries terminal or file traffic through the secure channel.


## Week 06 - Networking foundations: models, media, devices, and topologies

- Phase: Networking
- Deliverable: Packet-journey diagram
- Checkpoint: Can describe how data moves through a simple network.
- Study-week relationship: The six glossary terms for Week 06 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### OSI Model (`osi-model`)

- `osi-model-definition` [definition, easy] Front: What is OSI Model?
  Back: Seven-layer conceptual model describing how network communication functions within endpoint hardware and platform operations.
- `osi-model-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for communication tasks into, not a storage-only upgrade. Which option best fits?
  Back: OSI Model — Separates communication tasks into layers so protocols can be analyzed by function during design and troubleshooting.
- `osi-model-mechanism` [understanding, medium] Front: How does OSI Model handle communication tasks into during operation?
  Back: Separates communication into layers so addressing, transport, and application functions can be analyzed independently.

### TCP/IP Model (`tcp-ip-model`)

- `tcp-ip-model-definition` [definition, easy] Front: In one phrase, what is TCP/IP Model?
  Back: Practical networking model used to map real internet protocol behavior within endpoint hardware and platform operations.
- `tcp-ip-model-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for communication functions into, not a storage-only upgrade. Which option best fits?
  Back: TCP/IP Model — Groups communication functions into practical layers used to implement and troubleshoot internet protocols.
- `tcp-ip-model-mechanism` [understanding, medium] Front: What happens inside TCP/IP Model during communication functions into processing?
  Back: Groups network functions into link, internet, transport, and application roles so packet behavior can be reasoned about systematically.

### Ethernet Frame (`ethernet-frame`)

- `ethernet-frame-definition` [definition, easy] Front: What is Ethernet Frame?
  Back: Data-link encapsulation format used on Ethernet networks within routed and switched network environments.
- `ethernet-frame-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: Ethernet Frame — Encapsulates payload data with source, destination, type, and integrity fields for local network delivery.
- `ethernet-frame-mechanism` [understanding, medium] Front: How does Ethernet Frame handle request handling during operation?
  Back: Wraps payload data with MAC addresses and control fields so switches and receivers can forward and validate it.

### MAC Address (`mac-address`)

- `mac-address-definition` [definition, easy] Front: What is MAC Address?
  Back: Hardware identifier used by network interfaces on local segments within routed and switched network environments.
- `mac-address-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for a local network, not the option chosen only for speed. Which option best fits?
  Back: MAC Address — Identifies a local network interface at Layer 2 for switching and frame delivery decisions.
- `mac-address-mechanism` [understanding, medium] Front: How does MAC Address handle a local network during operation?
  Back: Identifies a network interface at layer 2 so frames can be delivered on the local segment.

### Switch (`switch`)

- `switch-definition` [definition, easy] Front: What is Switch?
  Back: Layer 2 device that forwards frames based on MAC address tables within routed and switched network environments.
- `switch-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for mac addresses on, not the option chosen only for speed. Which option best fits?
  Back: Switch — Learns MAC addresses on ports and forwards frames only toward the correct destination segment.
- `switch-mechanism` [understanding, medium] Front: How does Switch handle mac addresses on during operation?
  Back: Learns MAC-to-port mappings from incoming frames and forwards later traffic only toward the needed port.

### Network Topology (`network-topology`)

- `network-topology-definition` [definition, easy] Front: What is Network Topology?
  Back: Physical or logical arrangement of network devices and connections within routed and switched network environments.
- `network-topology-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for how hosts, not the option chosen only for speed. Which option best fits?
  Back: Network Topology — Describes how hosts, links, and network devices connect and communicate across an environment.
- `network-topology-mechanism` [understanding, medium] Front: How does Network Topology handle how hosts during operation?
  Back: Describes how links and nodes connect, which determines traffic paths, redundancy, and failure impact.


## Week 07 - Ethernet, switching, routing, and gateways

- Phase: Networking
- Deliverable: Layer 2 vs Layer 3 comparison sheet
- Checkpoint: Can explain when a switch is enough and when a router is required.
- Study-week relationship: The six glossary terms for Week 07 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Switch (`switch`)

- `switch-definition` [definition, easy] Front: What is Switch?
  Back: Layer 2 device that forwards frames based on MAC address tables within routed and switched network environments.
- `switch-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for mac addresses on, not the option chosen only for speed. Which option best fits?
  Back: Switch — Learns MAC addresses on ports and forwards frames only toward the correct destination segment.
- `switch-mechanism` [understanding, medium] Front: How does Switch handle mac addresses on during operation?
  Back: Learns MAC-to-port mappings from incoming frames and forwards later traffic only toward the needed port.

### VLAN (`vlan`)

- `vlan-definition` [definition, easy] Front: What is VLAN?
  Back: Virtual LAN used to segment broadcast domains on switched networks within routed and switched network environments.
- `vlan-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for shared responsibility, not the option chosen only for speed. Which option best fits?
  Back: VLAN — Tags switch traffic to create separate logical broadcast domains across shared physical infrastructure.
- `vlan-mechanism` [understanding, medium] Front: How does VLAN handle shared responsibility during operation?
  Back: Tags frames with a logical network ID so one switch fabric can carry multiple isolated broadcast domains.

### Spanning Tree Protocol (`stp`)

- `stp-definition` [definition, easy] Front: In one phrase, what is Spanning Tree Protocol?
  Back: Protocol that prevents switching loops by managing redundant paths within routed and switched network environments.
- `stp-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for a loop-free forwarding, not the option chosen only for speed. Which option best fits?
  Back: Spanning Tree Protocol — Elects a loop-free forwarding tree and blocks redundant switch paths to prevent broadcast storms.
- `stp-mechanism` [understanding, medium] Front: What happens inside Spanning Tree Protocol during a loop-free forwarding processing?
  Back: Elects a root bridge and blocks redundant links so layer 2 loops do not form.

### Router (`router`)

- `router-definition` [definition, easy] Front: In one phrase, what is Router?
  Back: Layer 3 device that forwards packets between networks within routed and switched network environments.
- `router-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: Router — Examines destination networks and forwards packets toward the next hop using Layer 3 decisions.
- `router-mechanism` [understanding, medium] Front: What happens inside Router during path selection processing?
  Back: Reads destination networks, consults routes, and forwards packets out the next interface toward the destination.

### Default Gateway (`default-gateway`)

- `default-gateway-definition` [definition, easy] Front: In one phrase, what is Default Gateway?
  Back: Router path used when a host sends traffic outside its local subnet.
- `default-gateway-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: Default Gateway — Sends off-subnet packets to a router interface that can reach remote networks.
- `default-gateway-mechanism` [understanding, medium] Front: What happens inside Default Gateway during path selection processing?
  Back: Receives packets for off-subnet destinations and forwards them according to its routing table.

### Routing Table (`routing-table`)

- `routing-table-definition` [definition, easy] Front: What is Routing Table?
  Back: Lookup data used by hosts and routers to choose next-hop paths within routed and switched network environments.
- `routing-table-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: Routing Table — Lists known networks, next hops, interfaces, and metrics used to choose forwarding paths.
- `routing-table-mechanism` [understanding, medium] Front: How does Routing Table handle path selection during operation?
  Back: Stores destination prefixes and next hops so the device can choose the best route for each packet.


## Week 08 - IPv4 addressing, subnetting, and address planning

- Phase: Networking
- Deliverable: Subnet worksheet + address plan
- Checkpoint: Can read and plan IPv4 subnets for small environments.
- Study-week relationship: The six glossary terms for Week 08 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### IPv4 (`ipv4`)

- `ipv4-definition` [definition, easy] Front: What is IPv4?
  Back: 32-bit addressing protocol widely used for internet and private networks within routed and switched network environments.
- `ipv4-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for addresses in 32, not the option chosen only for speed. Which option best fits?
  Back: IPv4 — Represents addresses in 32 bits and forwards packets using hierarchical network and host portions.
- `ipv4-mechanism` [understanding, medium] Front: How does IPv4 handle addresses in 32 during operation?
  Back: Uses 32-bit addresses and header fields so routers can forward packets between networks.

### CIDR (`cidr`)

- `cidr-definition` [definition, easy] Front: In one phrase, what is CIDR?
  Back: Classless Inter-Domain Routing notation for subnet masks and prefixes within routed and switched network environments.
- `cidr-function` [application, medium] Front: Scenario: An administrator needs to show network size and summarize routes without classful addressing. Which notation best fits?
  Back: CIDR — Uses prefix length notation to describe network size and route aggregation more efficiently than classful addressing.
- `cidr-mechanism` [understanding, medium] Front: What happens inside CIDR during prefix interpretation processing?
  Back: Expresses the network prefix length so devices can derive which address bits identify the network and which identify hosts.

### Subnet Mask (`subnet-mask`)

- `subnet-mask-definition` [definition, easy] Front: In one phrase, what is Subnet Mask?
  Back: Bitmask that separates network and host portions of an IP address within routed and switched network environments.
- `subnet-mask-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for prefix interpretation, not the option chosen only for speed. Which option best fits?
  Back: Subnet Mask — Marks which IPv4 bits represent the network versus host portion of an address.
- `subnet-mask-mechanism` [understanding, medium] Front: What happens inside Subnet Mask during prefix interpretation processing?
  Back: Marks which address bits are network bits so hosts can decide whether traffic is local or remote.

### Private IP (`private-ip`)

- `private-ip-definition` [definition, easy] Front: In one phrase, what is Private IP?
  Back: Non-routable address range intended for internal networks within routed and switched network environments.
- `private-ip-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: Private IP — Uses reserved address ranges internally, requiring routing controls or translation before internet communication.
- `private-ip-mechanism` [understanding, medium] Front: What happens inside Private IP during path selection processing?
  Back: Uses non-routable ranges that stay inside local networks and usually reach the internet through NAT.

### Public IP (`public-ip`)

- `public-ip-definition` [definition, easy] Front: What is Public IP?
  Back: Globally routable address visible on the internet within routed and switched network environments.
- `public-ip-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: Public IP — Provides an internet-routable address reachable across external networks according to upstream routing.
- `public-ip-mechanism` [understanding, medium] Front: How does Public IP handle request handling during operation?
  Back: Uses globally routable addressing so internet systems can send packets directly toward the exposed endpoint.

### Subnetting (`subnetting`)

- `subnetting-definition` [definition, easy] Front: What is Subnetting?
  Back: Practice of dividing networks into smaller addressable segments within routed and switched network environments.
- `subnetting-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for query filtering, not the option chosen only for speed. Which option best fits?
  Back: Subnetting — Allocates smaller address blocks from a larger range to separate networks and conserve space.
- `subnetting-mechanism` [understanding, medium] Front: How does Subnetting handle query filtering during operation?
  Back: Borrows host bits to create smaller networks, trading host capacity for more controlled address groups.


## Week 09 - TCP, UDP, ports, DNS, DHCP, NAT, and service flow

- Phase: Networking
- Deliverable: Ports / protocols sheet v2 + trace-route notes
- Checkpoint: Can narrate the service path from 'join network' to 'page loads.'
- Study-week relationship: The six glossary terms for Week 09 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### TCP (`tcp`)

- `tcp-definition` [definition, easy] Front: In one phrase, what is TCP?
  Back: Connection-oriented transport protocol that prioritizes reliability and ordered delivery within routed and switched network environments.
- `tcp-function` [application, medium] Front: Scenario: An application needs reliable, ordered delivery with retransmission, not the lowest possible latency. Which protocol best fits?
  Back: TCP — Establishes sessions, tracks sequence numbers, acknowledges delivery, and retransmits lost segments when needed.
- `tcp-mechanism` [understanding, medium] Front: What happens inside TCP during reliable delivery processing?
  Back: Establishes a session, tracks sequence numbers, and retransmits missing data to deliver ordered reliable streams.

### UDP (`udp`)

- `udp-definition` [definition, easy] Front: What is UDP?
  Back: Connectionless transport protocol optimized for low overhead and speed within routed and switched network environments.
- `udp-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: UDP — Transmits datagrams without connection setup, acknowledgments, or retransmission to minimize protocol overhead.
- `udp-mechanism` [understanding, medium] Front: How does UDP handle request handling during operation?
  Back: Wraps data with minimal transport headers and sends it without connection setup, ordering, or retransmission.

### Port Number (`port-number`)

- `port-number-definition` [definition, easy] Front: In one phrase, what is Port Number?
  Back: Transport-layer identifier that maps traffic to a specific service within host administration and operating system workflows.
- `port-number-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for request handling, not a GUI-only task. Which option best fits?
  Back: Port Number — Identifies the target service within a transport session so hosts deliver traffic to the correct process.
- `port-number-mechanism` [understanding, medium] Front: What happens inside Port Number during request handling processing?
  Back: Labels transport endpoints so the OS can deliver incoming traffic to the correct listening process.

### DNS (`dns`)

- `dns-definition` [definition, easy] Front: In one phrase, what is DNS?
  Back: Domain Name System that resolves hostnames to IP addresses within host administration and operating system workflows.
- `dns-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for boot sequencing, not a GUI-only task. Which option best fits?
  Back: DNS — Stores and serves resource records so resolvers can map names to addresses and services.
- `dns-mechanism` [understanding, medium] Front: What happens inside DNS during boot sequencing processing?
  Back: Queries a resolver, follows cached or delegated answers, and returns the record data needed for name lookup.

### NAT (`nat`)

- `nat-definition` [definition, easy] Front: In one phrase, what is NAT?
  Back: Network Address Translation that maps internal addresses to external addresses within routed and switched network environments.
- `nat-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for source or destination, not the option chosen only for speed. Which option best fits?
  Back: NAT — Rewrites source or destination addresses, and sometimes ports, as traffic crosses between network boundaries.
- `nat-mechanism` [understanding, medium] Front: What happens inside NAT during source or destination processing?
  Back: Rewrites source or destination addresses and often ports while tracking mappings for return traffic.

### TCP Three-Way Handshake (`three-way-handshake`)

- `three-way-handshake-definition` [definition, easy] Front: What is TCP Three-Way Handshake?
  Back: TCP setup sequence using SYN, SYN-ACK, and ACK within routed and switched network environments.
- `three-way-handshake-function` [application, medium] Front: Scenario: An application needs reliable, ordered delivery with retransmission, not the lowest possible latency. Which protocol best fits?
  Back: TCP Three-Way Handshake — Synchronizes TCP sequence numbers and confirms both endpoints are ready before data transfer begins.
- `three-way-handshake-mechanism` [understanding, medium] Front: How does TCP Three-Way Handshake handle reliable delivery during operation?
  Back: Uses SYN, SYN-ACK, and ACK exchanges to synchronize sequence numbers before data transfer begins.


## Week 10 - Wireless, SOHO design, cloud, and network security basics

- Phase: Networking
- Deliverable: SOHO hardening checklist
- Checkpoint: Can explain baseline protections for a small office or home network.
- Study-week relationship: The six glossary terms for Week 10 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### SSID (`ssid`)

- `ssid-definition` [definition, easy] Front: In one phrase, what is SSID?
  Back: Wireless network name advertised by an access point within routed and switched network environments.
- `ssid-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for or identifies a, not the option chosen only for speed. Which option best fits?
  Back: SSID — Advertises or identifies a wireless network name that clients use during association.
- `ssid-mechanism` [understanding, medium] Front: What happens inside SSID during or identifies a processing?
  Back: Advertises the network name in beacon frames so clients can discover and join the correct wireless LAN.

### WPA3 (`wpa3`)

- `wpa3-definition` [definition, easy] Front: In one phrase, what is WPA3?
  Back: Modern Wi-Fi security standard with stronger protections than earlier protocols within routed and switched network environments.
- `wpa3-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for key-based protection, not the option chosen only for speed. Which option best fits?
  Back: WPA3 — Protects wireless access using stronger authentication and encryption mechanisms than prior Wi-Fi standards.
- `wpa3-mechanism` [understanding, medium] Front: What happens inside WPA3 during key-based protection processing?
  Back: Uses modern authentication and key establishment to protect wireless sessions against interception and offline guessing.

### SOHO Router (`soho-router`)

- `soho-router-definition` [definition, easy] Front: In one phrase, what is SOHO Router?
  Back: Integrated gateway device common in small office and home networks within routed and switched network environments.
- `soho-router-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: SOHO Router — Combines routing, switching, wireless access, NAT, and firewall features in a small-network gateway.
- `soho-router-mechanism` [understanding, medium] Front: What happens inside SOHO Router during path selection processing?
  Back: Combines routing, NAT, DHCP, switching, and wireless control into one device for small local networks.

### Cloud Service Model (`cloud-service-model`)

- `cloud-service-model-definition` [definition, easy] Front: What is Cloud Service Model?
  Back: Service delivery layer such as IaaS, PaaS, or SaaS within web, data, and cloud services.
- `cloud-service-model-function` [application, medium] Front: Scenario: A cloud team must decide whether the provider or customer manages infrastructure, platform, or the full application. Which concept best fits?
  Back: Cloud Service Model — Defines whether the provider manages infrastructure, platform components, runtime services, or complete applications.
- `cloud-service-model-mechanism` [understanding, medium] Front: How does Cloud Service Model handle boot sequencing during operation?
  Back: Splits responsibility between provider and customer by defining which party manages infrastructure, platform, or application layers.

### Firewall (`firewall`)

- `firewall-definition` [definition, easy] Front: What is Firewall?
  Back: Control that allows or blocks traffic based on policy rules within routed and switched network environments.
- `firewall-function` [application, medium] Front: Scenario: An organization needs to control inbound and outbound traffic with rules, not just generate alerts. Which control best fits?
  Back: Firewall — Evaluates traffic against policy rules and permits, rejects, or logs connections based on criteria.
- `firewall-mechanism` [understanding, medium] Front: How does Firewall handle policy evaluation during operation?
  Back: Compares traffic against ordered rules and may track connection state to permit or deny packets.

### Network Segmentation (`network-segmentation`)

- `network-segmentation-definition` [definition, easy] Front: In one phrase, what is Network Segmentation?
  Back: Separation of network zones to reduce lateral movement and contain impact within routed and switched network environments.
- `network-segmentation-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for path selection, not the option chosen only for speed. Which option best fits?
  Back: Network Segmentation — Divides systems into controlled zones using routing, VLANs, or firewalls to restrict lateral movement.
- `network-segmentation-mechanism` [understanding, medium] Front: What happens inside Network Segmentation during path selection processing?
  Back: Separates systems into controlled zones and restricts paths between them with routing or filtering policy.


## Week 11 - Wireshark and troubleshooting with packet evidence

- Phase: Networking
- Deliverable: Three annotated packet captures
- Checkpoint: Can use packet captures to support an explanation instead of guessing.
- Study-week relationship: The six glossary terms for Week 11 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Wireshark (`wireshark`)

- `wireshark-definition` [definition, easy] Front: What is Wireshark?
  Back: Packet capture and analysis tool for network troubleshooting and investigations within routed and switched network environments.
- `wireshark-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for packet analysis, not the option chosen only for speed. Which option best fits?
  Back: Wireshark — Captures packets and decodes protocol details so analysts can inspect network conversations and anomalies.
- `wireshark-mechanism` [understanding, medium] Front: How does Wireshark handle packet analysis during operation?
  Back: Decodes captured packets into protocol fields so analysts can filter traffic and inspect conversations in detail.

### PCAP (`pcap`)

- `pcap-definition` [definition, easy] Front: What is PCAP?
  Back: Packet capture file format storing recorded network traffic within routed and switched network environments.
- `pcap-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: PCAP — Stores captured packets with timestamps and frame data for later analysis in supporting tools.
- `pcap-mechanism` [understanding, medium] Front: How does PCAP handle request handling during operation?
  Back: Stores captured packets with timestamps and headers so tools can replay, filter, or inspect traffic later.

### Packet Filter (`packet-filter`)

- `packet-filter-definition` [definition, easy] Front: What is Packet Filter?
  Back: Query expression used to isolate relevant traffic in a capture within routed and switched network environments.
- `packet-filter-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: Packet Filter — Applies capture expressions to packet headers so only matching traffic is displayed or stored.
- `packet-filter-mechanism` [understanding, medium] Front: How does Packet Filter handle request handling during operation?
  Back: Inspects header fields such as address, port, and protocol and then applies matching allow or deny rules.

### Traceroute (`traceroute`)

- `traceroute-definition` [definition, easy] Front: In one phrase, what is Traceroute?
  Back: Diagnostic command that reveals path hops to a destination within routed and switched network environments.
- `traceroute-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for probes with increasing, not the option chosen only for speed. Which option best fits?
  Back: Traceroute — Sends probes with increasing hop limits to reveal intermediary routers along a path.
- `traceroute-mechanism` [understanding, medium] Front: What happens inside Traceroute during probes with increasing processing?
  Back: Sends probes with increasing hop limits so each router that expires the packet reveals its position.

### Ping (`ping`)

- `ping-definition` [definition, easy] Front: In one phrase, what is Ping?
  Back: ICMP-based connectivity test used for basic reachability checks within routed and switched network environments.
- `ping-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for icmp echo messages, not the option chosen only for speed. Which option best fits?
  Back: Ping — Sends ICMP echo messages and measures replies to confirm basic reachability and delay.
- `ping-mechanism` [understanding, medium] Front: What happens inside Ping during icmp echo messages processing?
  Back: Sends ICMP echo requests and measures whether replies return and how long that round trip takes.

### Latency (`latency`)

- `latency-definition` [definition, easy] Front: In one phrase, what is Latency?
  Back: Time delay between request and response across a path within routed and switched network environments.
- `latency-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for elapsed time introduced, not the option chosen only for speed. Which option best fits?
  Back: Latency — Measures elapsed time introduced by transmission, processing, queuing, and distance across a network path.
- `latency-mechanism` [understanding, medium] Front: What happens inside Latency during elapsed time introduced processing?
  Back: Accumulates delay from propagation, processing, queuing, and retransmission before data reaches the destination.


## Week 12 - TryHackMe Pre Security and end-to-end web request capstone

- Phase: Networking
- Deliverable: End-to-end web request explainer
- Checkpoint: Can explain internet plumbing clearly enough for a manager.
- Study-week relationship: The six glossary terms for Week 12 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### HTTP Request (`http-request`)

- `http-request-definition` [definition, easy] Front: In one phrase, what is HTTP Request?
  Back: Client message sent to a web server for a resource or action.
- `http-request-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for request handling, not the option chosen only for speed. Which option best fits?
  Back: HTTP Request — Carries a method, target, headers, and optional body from a client to a server.
- `http-request-mechanism` [understanding, medium] Front: What happens inside HTTP Request during request handling processing?
  Back: Sends a method, target, headers, and optional body so a server can decide how to process the request.

### DNS Resolution (`dns-resolution`)

- `dns-resolution-definition` [definition, easy] Front: What is DNS Resolution?
  Back: Lookup process translating a hostname to one or more IP addresses within routed and switched network environments.
- `dns-resolution-function` [application, medium] Front: Scenario: A team needs the protocol or network concept used for name resolution, not the option chosen only for speed. Which option best fits?
  Back: DNS Resolution — Queries local caches and DNS servers iteratively or recursively until a matching address record is returned.
- `dns-resolution-mechanism` [understanding, medium] Front: How does DNS Resolution handle name resolution during operation?
  Back: Checks local cache first, then queries resolvers iteratively or recursively until an answer or failure returns.

### TLS Handshake (`tls-handshake`)

- `tls-handshake-definition` [definition, easy] Front: What is TLS Handshake?
  Back: Cryptographic negotiation that establishes secure session parameters within web, data, and cloud services.
- `tls-handshake-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for certificate validation, not a local system setting. Which option best fits?
  Back: TLS Handshake — Negotiates protocol version, algorithms, keys, and certificates before protected application data flows.
- `tls-handshake-mechanism` [understanding, medium] Front: How does TLS Handshake handle certificate validation during operation?
  Back: Negotiates algorithms, validates certificates, and derives shared session keys before encrypted application data flows.

### Web Server (`web-server`)

- `web-server-definition` [definition, easy] Front: In one phrase, what is Web Server?
  Back: Service that hosts and delivers web content over HTTP/HTTPS within endpoint hardware and platform operations.
- `web-server-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for process scheduling, not a storage-only upgrade. Which option best fits?
  Back: Web Server — Accepts HTTP or HTTPS requests, processes them, and returns web content or application responses.
- `web-server-mechanism` [understanding, medium] Front: What happens inside Web Server during process scheduling processing?
  Back: Listens for HTTP requests, maps them to configured content or handlers, and returns responses over the network.

### Reverse Proxy (`reverse-proxy`)

- `reverse-proxy-definition` [definition, easy] Front: In one phrase, what is Reverse Proxy?
  Back: Service that receives client requests and forwards them to backend servers within endpoint hardware and platform operations.
- `reverse-proxy-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for path selection, not a storage-only upgrade. Which option best fits?
  Back: Reverse Proxy — Accepts client connections, applies policies, and forwards approved requests to internal application servers.
- `reverse-proxy-mechanism` [understanding, medium] Front: What happens inside Reverse Proxy during path selection processing?
  Back: Accepts client requests first, then forwards them to internal servers while applying routing, TLS, or filtering decisions.

### Session Token (`session-token`)

- `session-token-definition` [definition, easy] Front: What is Session Token?
  Back: Identifier that binds a user to an authenticated session within web, data, and cloud services.
- `session-token-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for authenticated state by, not a local system setting. Which option best fits?
  Back: Session Token — Maintains authenticated state by presenting a server-issued identifier with subsequent client requests.
- `session-token-mechanism` [understanding, medium] Front: How does Session Token handle authenticated state by during operation?
  Back: Binds a client to server-side session state, and the server checks the token on each subsequent request.


## Week 13 - Google Course 1: Foundations of Cybersecurity

- Phase: Security
- Deliverable: Professional statement + CIA / framework notes
- Checkpoint: Can define cybersecurity in business terms, not just technical terms.
- Study-week relationship: The six glossary terms for Week 13 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### CIA Triad (`cia-triad`)

- `cia-triad-definition` [definition, easy] Front: What is CIA Triad?
  Back: Confidentiality, Integrity, and Availability security objective model within endpoint hardware and platform operations.
- `cia-triad-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for security objective review, not a storage-only upgrade. Which option best fits?
  Back: CIA Triad — Evaluates security objectives by balancing data secrecy, accuracy, and availability across system design decisions.
- `cia-triad-mechanism` [understanding, medium] Front: How does CIA Triad handle security objective review during operation?
  Back: Evaluates security goals by asking whether data stays readable to authorized users, unmodified, and available when needed.

### Risk (`risk`)

- `risk-definition` [definition, easy] Front: What is Risk?
  Back: Potential for loss when a threat exploits a vulnerability within endpoint hardware and platform operations.
- `risk-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for process scheduling, not a storage-only upgrade. Which option best fits?
  Back: Risk — Combines likelihood and impact to estimate potential loss from threats affecting vulnerable assets or processes.
- `risk-mechanism` [understanding, medium] Front: How does Risk handle process scheduling during operation?
  Back: Combines likelihood and impact so exposure can be compared, prioritized, and treated according to business effect.

### Threat (`threat`)

- `threat-definition` [definition, easy] Front: What is Threat?
  Back: Potential cause of unwanted impact to an asset or process within endpoint hardware and platform operations.
- `threat-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for an actor, not a storage-only upgrade. Which option best fits?
  Back: Threat — Represents an actor, event, or condition capable of causing harm to systems, data, or operations.
- `threat-mechanism` [understanding, medium] Front: How does Threat handle an actor during operation?
  Back: Describes a source of harm plus the action it could take against an asset or process.

### Vulnerability (`vulnerability`)

- `vulnerability-definition` [definition, easy] Front: In one phrase, what is Vulnerability?
  Back: Weakness that can be exploited to violate security objectives within endpoint hardware and platform operations.
- `vulnerability-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for a weakness that, not a storage-only upgrade. Which option best fits?
  Back: Vulnerability — Describes a weakness that can be discovered, reached, and abused to violate security objectives.
- `vulnerability-mechanism` [understanding, medium] Front: What happens inside Vulnerability during a weakness that processing?
  Back: Creates exploitable conditions when a weakness can be reached by a threat through some attack path.

### Control (`control`)

- `control-definition` [definition, easy] Front: What is Control?
  Back: Safeguard that prevents, detects, or corrects security issues within governance, risk, and compliance workflows.
- `control-function` [application, medium] Front: Scenario: A team needs the governance process used for event logging, not an informal note. Which option best fits?
  Back: Control — Implements preventive, detective, or corrective measures that reduce likelihood, impact, or exposure.
- `control-mechanism` [understanding, medium] Front: How does Control handle event logging during operation?
  Back: Imposes a rule, technical setting, or process step that prevents, detects, or limits unwanted outcomes.

### Security Framework (`security-framework`)

- `security-framework-definition` [definition, easy] Front: In one phrase, what is Security Framework?
  Back: Structured reference model such as NIST CSF used to organize security practices.
- `security-framework-function` [application, medium] Front: Scenario: A team needs the component or platform concept used for functions, not a storage-only upgrade. Which option best fits?
  Back: Security Framework — Defines functions, domains, or control families that organizations map to policies and improvement plans.
- `security-framework-mechanism` [understanding, medium] Front: What happens inside Security Framework during functions processing?
  Back: Breaks security work into domains, control families, and maturity steps so programs can be organized consistently.


## Week 14 - Google Course 2: Play It Safe - Manage Security Risks

- Phase: Security
- Deliverable: Starter risk register
- Checkpoint: Can distinguish risk from vulnerability and link controls to business priorities.
- Study-week relationship: The six glossary terms for Week 14 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Risk Register (`risk-register`)

- `risk-register-definition` [definition, easy] Front: What is Risk Register?
  Back: Documented inventory of identified risks, ratings, owners, and treatments within governance, risk, and compliance workflows.
- `risk-register-function` [application, medium] Front: Scenario: A team needs a living document listing identified risks, owners, ratings, and treatment status, not just a one-time assessment. Which governance document best fits?
  Back: Risk Register — Maintains a living record of risks, scores, owners, response plans, and status updates.
- `risk-register-mechanism` [understanding, medium] Front: How does Risk Register handle risk tracking during operation?
  Back: Stores each risk with owner, rating, treatment, and status so follow-up can be tracked over time.

### Likelihood (`likelihood`)

- `likelihood-definition` [definition, easy] Front: In one phrase, what is Likelihood?
  Back: Estimated probability that a risk event will occur within governance, risk, and compliance workflows.
- `likelihood-function` [application, medium] Front: Scenario: A team needs the governance process used for how probable a, not an informal note. Which option best fits?
  Back: Likelihood — Estimates how probable a threat event is based on exposure, capability, and control conditions.
- `likelihood-mechanism` [understanding, medium] Front: What happens inside Likelihood during how probable a processing?
  Back: Estimates how probable an event is by considering threat capability, opportunity, and control strength.

### Impact (`impact`)

- `impact-definition` [definition, easy] Front: What is Impact?
  Back: Estimated consequence if a risk event occurs within governance, risk, and compliance workflows.
- `impact-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Impact — Estimates operational, financial, legal, or reputational consequences if a threat event occurs.
- `impact-mechanism` [understanding, medium] Front: How does Impact handle risk tracking during operation?
  Back: Measures consequence across operations, finances, legal exposure, or safety if the risk event occurs.

### Risk Treatment (`risk-treatment`)

- `risk-treatment-definition` [definition, easy] Front: In one phrase, what is Risk Treatment?
  Back: Chosen approach to address risk: mitigate, transfer, avoid, or accept within governance, risk, and compliance workflows.
- `risk-treatment-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Risk Treatment — Chooses whether to mitigate, transfer, avoid, or accept each risk based on context.
- `risk-treatment-mechanism` [understanding, medium] Front: What happens inside Risk Treatment during risk tracking processing?
  Back: Chooses whether to mitigate, transfer, avoid, or accept each risk based on cost, benefit, and tolerance.

### Qualitative Risk Analysis (`qualitative-risk`)

- `qualitative-risk-definition` [definition, easy] Front: What is Qualitative Risk Analysis?
  Back: Risk assessment using categorical scales like low/medium/high within governance, risk, and compliance workflows.
- `qualitative-risk-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Qualitative Risk Analysis — Ranks risks using descriptive scales when precise financial or statistical data is unavailable.
- `qualitative-risk-mechanism` [understanding, medium] Front: How does Qualitative Risk Analysis handle risk tracking during operation?
  Back: Uses ordinal scales and expert judgment to rank risks when precise numerical data is limited.

### Quantitative Risk Analysis (`quantitative-risk`)

- `quantitative-risk-definition` [definition, easy] Front: In one phrase, what is Quantitative Risk Analysis?
  Back: Risk assessment using numerical estimates such as expected loss values within governance, risk, and compliance workflows.
- `quantitative-risk-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Quantitative Risk Analysis — Uses numerical estimates, frequencies, and loss values to calculate expected risk exposure.
- `quantitative-risk-mechanism` [understanding, medium] Front: What happens inside Quantitative Risk Analysis during risk tracking processing?
  Back: Uses numeric frequencies, loss estimates, and ranges to model expected risk in measurable terms.


## Week 15 - Google Course 3: Networks and Network Security

- Phase: Security
- Deliverable: Hardened network checklist
- Checkpoint: Can describe how network design choices affect security outcomes.
- Study-week relationship: The six glossary terms for Week 15 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Intrusion Detection (`intrusion-detection`)

- `intrusion-detection-definition` [definition, easy] Front: In one phrase, what is Intrusion Detection?
  Back: Monitoring approach that identifies suspicious or malicious activity within monitoring, investigation, and response workflows.
- `intrusion-detection-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Intrusion Detection — Analyzes network or host events for suspicious patterns and generates alerts when monitored conditions match.
- `intrusion-detection-mechanism` [understanding, medium] Front: What happens inside Intrusion Detection during case tracking processing?
  Back: Monitors network or host activity, compares it to signatures or baselines, and raises alerts on suspicious matches.

### Intrusion Prevention (`intrusion-prevention`)

- `intrusion-prevention-definition` [definition, easy] Front: What is Intrusion Prevention?
  Back: Inline security control that blocks malicious activity in real time within monitoring, investigation, and response workflows.
- `intrusion-prevention-function` [application, medium] Front: Scenario: A team needs the security operations process used for certificate validation, not an ad hoc analyst action. Which option best fits?
  Back: Intrusion Prevention — Inspects traffic inline and automatically blocks packets or sessions matching malicious signatures or policies.
- `intrusion-prevention-mechanism` [understanding, medium] Front: How does Intrusion Prevention handle certificate validation during operation?
  Back: Inspects traffic inline and drops or resets sessions when packets match blocked signatures or policy conditions.

### SIEM (`siem`)

- `siem-definition` [definition, easy] Front: What is SIEM?
  Back: Security Information and Event Management platform for log analysis and alerting within monitoring, investigation, and response workflows.
- `siem-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: SIEM — Aggregates logs, normalizes events, runs correlation rules, and presents alerts for centralized security monitoring.
- `siem-mechanism` [understanding, medium] Front: How does SIEM handle case tracking during operation?
  Back: Ingests many log streams, normalizes fields, and applies searches or rules so correlated alerts and investigations are possible.

### Log Source (`log-source`)

- `log-source-definition` [definition, easy] Front: What is Log Source?
  Back: System or service that generates telemetry ingested for analysis within monitoring, investigation, and response workflows.
- `log-source-function` [application, medium] Front: Scenario: Analysts need to validate alerts and queue real threats ahead of benign noise, not begin full containment immediately. Which process best fits?
  Back: Log Source — Produces telemetry from systems, applications, and security tools that analysts ingest for monitoring and investigation.
- `log-source-mechanism` [understanding, medium] Front: How does Log Source handle alert prioritization during operation?
  Back: Generates timestamped records from systems, applications, or devices that downstream tools parse and correlate.

### Network Baseline (`network-baseline`)

- `network-baseline-definition` [definition, easy] Front: What is Network Baseline?
  Back: Documented normal traffic behavior used to identify anomalies within monitoring, investigation, and response workflows.
- `network-baseline-function` [application, medium] Front: Scenario: A team needs the security operations process used for normal traffic volume, not an ad hoc analyst action. Which option best fits?
  Back: Network Baseline — Measures normal traffic volume, protocols, hosts, and timing so anomalies can be recognized quickly.
- `network-baseline-mechanism` [understanding, medium] Front: How does Network Baseline handle normal traffic volume during operation?
  Back: Learns normal volumes, peers, ports, and timing so unusual deviations can be flagged as suspicious.

### Hardening (`hardening`)

- `hardening-definition` [definition, easy] Front: What is Hardening?
  Back: Process of reducing attack surface through secure configuration within monitoring, investigation, and response workflows.
- `hardening-function` [application, medium] Front: Scenario: A team needs the security operations process used for boot sequencing, not an ad hoc analyst action. Which option best fits?
  Back: Hardening — Disables unnecessary services, tightens configurations, and applies secure defaults to reduce exposed attack surface.
- `hardening-mechanism` [understanding, medium] Front: How does Hardening handle boot sequencing during operation?
  Back: Reduces attack surface by disabling unnecessary features, enforcing secure settings, and removing weak defaults before exposure.


## Week 16 - Google Course 4: Linux and SQL (part 1 - Linux)

- Phase: Security
- Deliverable: Linux command notebook
- Checkpoint: Can navigate Linux and explain permissions without memorizing blindly.
- Study-week relationship: The six glossary terms for Week 16 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Linux Permissions (`linux-permissions`)

- `linux-permissions-definition` [definition, easy] Front: What is Linux Permissions?
  Back: Read/write/execute access model controlling file and directory operations within host administration and operating system workflows.
- `linux-permissions-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for asset scoping, not a GUI-only task. Which option best fits?
  Back: Linux Permissions — Evaluates ownership and permission bits before allowing file or directory operations on Linux.
- `linux-permissions-mechanism` [understanding, medium] Front: How does Linux Permissions handle asset scoping during operation?
  Back: Apply owner, group, and other permission bits that the kernel checks before allowing file operations.

### chmod (`chmod`)

- `chmod-definition` [definition, easy] Front: What is chmod?
  Back: Linux command used to modify file permission bits within host administration and operating system workflows.
- `chmod-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for permission changes, not a GUI-only task. Which option best fits?
  Back: chmod — Updates read, write, and execute permission bits for users, groups, or others on Linux files.
- `chmod-mechanism` [understanding, medium] Front: How does chmod handle permission changes during operation?
  Back: Changes permission bits on a file or directory by setting read, write, and execute flags for owner, group, or others.

### chown (`chown`)

- `chown-definition` [definition, easy] Front: In one phrase, what is chown?
  Back: Linux command used to change file owner and group within host administration and operating system workflows.
- `chown-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for asset scoping, not a GUI-only task. Which option best fits?
  Back: chown — Reassigns file ownership metadata so access decisions follow the intended user and group account.
- `chown-mechanism` [understanding, medium] Front: What happens inside chown during asset scoping processing?
  Back: Reassigns file ownership metadata so the kernel applies access checks against a different user or group.

### Process (`process`)

- `process-definition` [definition, easy] Front: In one phrase, what is Process?
  Back: Running program instance with its own state and resource usage within host administration and operating system workflows.
- `process-function` [application, medium] Front: Scenario: An administrator needs the operating system concept for a running program instance, not the executable file stored on disk. Which concept best fits?
  Back: Process — Uses an isolated execution context with memory, threads, and permissions while a program runs.
- `process-mechanism` [understanding, medium] Front: What happens inside Process during process scheduling processing?
  Back: Allocates memory, execution state, and resources to a running program while the scheduler manages CPU time.

### systemctl (`systemctl`)

- `systemctl-definition` [definition, easy] Front: In one phrase, what is systemctl?
  Back: Command-line utility for managing services in systemd-based Linux systems within host administration and operating system workflows.
- `systemctl-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for boot sequencing, not a GUI-only task. Which option best fits?
  Back: systemctl — Interacts with systemd units to start, stop, enable, inspect, or reload Linux services.
- `systemctl-mechanism` [understanding, medium] Front: What happens inside systemctl during boot sequencing processing?
  Back: Sends management requests to systemd, which tracks units, dependencies, and current service state.

### cron (`cron`)

- `cron-definition` [definition, easy] Front: What is cron?
  Back: Linux scheduling system for recurring task automation within host administration and operating system workflows.
- `cron-function` [application, medium] Front: Scenario: A team needs the command or operating system concept used for scheduled commands at, not a GUI-only task. Which option best fits?
  Back: cron — Launches scheduled commands at configured times using recurring entries defined in cron tables.
- `cron-mechanism` [understanding, medium] Front: How does cron handle scheduled commands at during operation?
  Back: Matches the current time against scheduled expressions and launches configured commands when a schedule qualifies.


## Week 17 - Google Course 4: Linux and SQL (part 2 - SQL)

- Phase: Security
- Deliverable: SQL query notebook
- Checkpoint: Can read and write basic SQL queries for security-relevant data.
- Study-week relationship: The six glossary terms for Week 17 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### SQL Query (`sql-query`)

- `sql-query-definition` [definition, easy] Front: In one phrase, what is SQL Query?
  Back: Structured request to retrieve or manipulate data in a relational database within web, data, and cloud services.
- `sql-query-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for query filtering, not a local system setting. Which option best fits?
  Back: SQL Query — Uses SQL syntax to retrieve, insert, update, or delete structured relational data.
- `sql-query-mechanism` [understanding, medium] Front: What happens inside SQL Query during query filtering processing?
  Back: Parses clauses, builds an execution plan, and retrieves or changes rows according to that plan.

### SELECT Statement (`select-statement`)

- `select-statement-definition` [definition, easy] Front: What is SELECT Statement?
  Back: SQL command used to retrieve data from one or more tables within web, data, and cloud services.
- `select-statement-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for query filtering, not a local system setting. Which option best fits?
  Back: SELECT Statement — Requests specific columns and rows from database tables based on query conditions.
- `select-statement-mechanism` [understanding, medium] Front: How does SELECT Statement handle query filtering during operation?
  Back: Specifies columns, tables, filters, and ordering so the database engine can assemble the requested result.

### WHERE Clause (`where-clause`)

- `where-clause-definition` [definition, easy] Front: What is WHERE Clause?
  Back: SQL condition that filters returned rows within web, data, and cloud services.
- `where-clause-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for query filtering, not a local system setting. Which option best fits?
  Back: WHERE Clause — Applies conditions to rows so only records matching the specified criteria are returned or modified.
- `where-clause-mechanism` [understanding, medium] Front: How does WHERE Clause handle query filtering during operation?
  Back: Applies boolean conditions to candidate rows so only records that match the filter continue through the query.

### JOIN (`join`)

- `join-definition` [definition, easy] Front: What is JOIN?
  Back: SQL operation that combines related rows across multiple tables within web, data, and cloud services.
- `join-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for key-based protection, not a local system setting. Which option best fits?
  Back: JOIN — Matches related rows across tables using keys so combined results can be queried together.
- `join-mechanism` [understanding, medium] Front: How does JOIN handle key-based protection during operation?
  Back: Matches rows from multiple tables using related keys so combined records can be returned in one result set.

### Input Validation (`input-validation`)

- `input-validation-definition` [definition, easy] Front: In one phrase, what is Input Validation?
  Back: Process of checking user input for format, length, and allowed values within web, data, and cloud services.
- `input-validation-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for untrusted data against, not a local system setting. Which option best fits?
  Back: Input Validation — Checks untrusted data against format, length, type, and allowlist rules before processing.
- `input-validation-mechanism` [understanding, medium] Front: What happens inside Input Validation during untrusted data against processing?
  Back: Checks type, length, format, and allowed values before processing data or sending it to downstream components.

### SQL Injection (`sql-injection`)

- `sql-injection-definition` [definition, easy] Front: What is SQL Injection?
  Back: Attack that manipulates SQL queries through untrusted input within web, data, and cloud services.
- `sql-injection-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for query filtering, not a local system setting. Which option best fits?
  Back: SQL Injection — Injects crafted input into unsafe queries so a database executes unintended commands or data access.
- `sql-injection-mechanism` [understanding, medium] Front: How does SQL Injection handle query filtering during operation?
  Back: Works when untrusted input changes query structure, allowing the database to execute unintended commands.


## Week 18 - Google Course 5: Assets, threats, and vulnerabilities (part 1)

- Phase: Security
- Deliverable: Asset inventory + data handling guide
- Checkpoint: Can classify assets and explain why not all data deserves the same treatment.
- Study-week relationship: The six glossary terms for Week 18 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Asset Inventory (`asset-inventory`)

- `asset-inventory-definition` [definition, easy] Front: What is Asset Inventory?
  Back: Structured list of hardware, software, and data assets in scope within monitoring, investigation, and response workflows.
- `asset-inventory-function` [application, medium] Front: Scenario: Responders need accurate records of systems, software, owners, and data before scoping an incident. Which process best fits?
  Back: Asset Inventory — Maps systems, software, owners, and data to known records so investigations and control scope stay accurate.
- `asset-inventory-mechanism` [understanding, medium] Front: How does Asset Inventory handle asset scoping during operation?
  Back: Collects host attributes, ownership, software, and data scope into records that other controls use for targeting and scoping.

### Data Classification (`data-classification`)

- `data-classification-definition` [definition, easy] Front: What is Data Classification?
  Back: Labeling data by sensitivity and handling requirements within web, data, and cloud services.
- `data-classification-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for sensitivity labels that, not a local system setting. Which option best fits?
  Back: Data Classification — Assigns sensitivity labels that determine storage, access, transmission, retention, and disposal controls.
- `data-classification-mechanism` [understanding, medium] Front: How does Data Classification handle sensitivity labels that during operation?
  Back: Assigns labels by sensitivity and handling need so storage, sharing, and retention rules can be enforced.

### Threat Model (`threat-model`)

- `threat-model-definition` [definition, easy] Front: What is Threat Model?
  Back: Structured analysis of potential attackers, paths, and control gaps within monitoring, investigation, and response workflows.
- `threat-model-function` [application, medium] Front: Scenario: A team needs the security operations process used for assets, not an ad hoc analyst action. Which option best fits?
  Back: Threat Model — Identifies assets, attackers, attack paths, and control gaps before implementing or changing a system.
- `threat-model-mechanism` [understanding, medium] Front: How does Threat Model handle assets during operation?
  Back: Enumerates assets, trust boundaries, and attacker actions so defenses can be designed around likely abuse paths.

### Attack Vector (`attack-vector`)

- `attack-vector-definition` [definition, easy] Front: In one phrase, what is Attack Vector?
  Back: Path or method used by an attacker to reach a target within monitoring, investigation, and response workflows.
- `attack-vector-function` [application, medium] Front: Scenario: Responders need accurate records of systems, software, owners, and data before scoping an incident. Which process best fits?
  Back: Attack Vector — Describes the route used for initial access, such as phishing, exposed services, or vulnerable software.
- `attack-vector-mechanism` [understanding, medium] Front: What happens inside Attack Vector during asset scoping processing?
  Back: Traces the initial path into the target by following entry point, exposed weakness, and reachable asset sequence.

### Vulnerability Scan (`vulnerability-scan`)

- `vulnerability-scan-definition` [definition, easy] Front: What is Vulnerability Scan?
  Back: Automated assessment for known weaknesses in systems and software within monitoring, investigation, and response workflows.
- `vulnerability-scan-function` [application, medium] Front: Scenario: Responders need accurate records of systems, software, owners, and data before scoping an incident. Which process best fits?
  Back: Vulnerability Scan — Probes hosts, software, and configurations against known checks to identify missing patches and insecure settings.
- `vulnerability-scan-mechanism` [understanding, medium] Front: How does Vulnerability Scan handle asset scoping during operation?
  Back: Probes hosts or applications for known conditions, compares findings against signatures, and reports matched weaknesses.

### CVSS (`cvss`)

- `cvss-definition` [definition, easy] Front: In one phrase, what is CVSS?
  Back: Common Vulnerability Scoring System for rating vulnerability severity within governance, risk, and compliance workflows.
- `cvss-function` [application, medium] Front: Scenario: Analysts need a standardized way to score vulnerability severity, not just list weaknesses without priority. Which framework best fits?
  Back: CVSS — Scores vulnerabilities using base metrics that estimate exploitability and technical impact in a standardized format.
- `cvss-mechanism` [understanding, medium] Front: What happens inside CVSS during severity scoring processing?
  Back: Scores vulnerabilities by combining exploitability and impact metrics into a standardized severity value.


## Week 19 - Google Course 5: Assets, threats, and vulnerabilities (part 2)

- Phase: Security
- Deliverable: Threat model + vulnerability notes
- Checkpoint: Can reason from asset to attacker to mitigation.
- Study-week relationship: The six glossary terms for Week 19 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Mitigation (`mitigation`)

- `mitigation-definition` [definition, easy] Front: What is Mitigation?
  Back: Action that lowers likelihood or impact of a risk within governance, risk, and compliance workflows.
- `mitigation-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Mitigation — Selects and implements actions that lower the chance or consequences of a risk event.
- `mitigation-mechanism` [understanding, medium] Front: How does Mitigation handle risk tracking during operation?
  Back: Reduces either the chance or the consequence of a risk through selected safeguards and process changes.

### Exploit (`exploit`)

- `exploit-definition` [definition, easy] Front: In one phrase, what is Exploit?
  Back: Code or technique that takes advantage of a vulnerability within monitoring, investigation, and response workflows.
- `exploit-function` [application, medium] Front: Scenario: A team needs the security operations process used for incident communications, not an ad hoc analyst action. Which option best fits?
  Back: Exploit — Triggers vulnerable behavior through crafted input, code execution, or protocol abuse to gain unauthorized results.
- `exploit-mechanism` [understanding, medium] Front: What happens inside Exploit during incident communications processing?
  Back: Uses crafted input or sequence timing to trigger a weakness and execute behavior the system did not intend to allow.

### Compensating Control (`compensating-control`)

- `compensating-control-definition` [definition, easy] Front: In one phrase, what is Compensating Control?
  Back: Alternative safeguard used when a primary control is not feasible within governance, risk, and compliance workflows.
- `compensating-control-function` [application, medium] Front: Scenario: A team needs the governance process used for compensating safeguards, not an informal note. Which option best fits?
  Back: Compensating Control — Implements an alternate safeguard that reduces risk when the preferred primary control cannot be deployed.
- `compensating-control-mechanism` [understanding, medium] Front: What happens inside Compensating Control during compensating safeguards processing?
  Back: Applies an alternative safeguard that reduces the same risk when the preferred control cannot be implemented.

### Residual Risk (`residual-risk`)

- `residual-risk-definition` [definition, easy] Front: What is Residual Risk?
  Back: Risk that remains after controls are implemented within governance, risk, and compliance workflows.
- `residual-risk-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Residual Risk — Measures the remaining exposure after planned or implemented controls reduce the original risk.
- `residual-risk-mechanism` [understanding, medium] Front: How does Residual Risk handle risk tracking during operation?
  Back: Represents the risk that remains after controls are applied and their realistic effectiveness is considered.

### Exposure (`exposure`)

- `exposure-definition` [definition, easy] Front: What is Exposure?
  Back: Degree to which assets are reachable or vulnerable to threat activity within governance, risk, and compliance workflows.
- `exposure-function` [application, medium] Front: Scenario: A team needs the governance process used for how accessible an, not an informal note. Which option best fits?
  Back: Exposure — Describes how accessible an asset or weakness is to threat activity under current controls and conditions.
- `exposure-mechanism` [understanding, medium] Front: How does Exposure handle how accessible an during operation?
  Back: Reflects how reachable a weakness is, based on attacker access, asset placement, and existing control coverage.

### Threat Intelligence (`threat-intelligence`)

- `threat-intelligence-definition` [definition, easy] Front: In one phrase, what is Threat Intelligence?
  Back: Contextual information about threat actors, tactics, and indicators within monitoring, investigation, and response workflows.
- `threat-intelligence-function` [application, medium] Front: Scenario: Analysts need to validate alerts and queue real threats ahead of benign noise, not begin full containment immediately. Which process best fits?
  Back: Threat Intelligence — Collects, analyzes, and disseminates information about adversaries, tactics, infrastructure, indicators, and likely targeting behavior.
- `threat-intelligence-mechanism` [understanding, medium] Front: What happens inside Threat Intelligence during alert prioritization processing?
  Back: Collects external indicators and adversary context, then maps them to internal telemetry for detection and prioritization.


## Week 20 - Google Course 6: Detection and response (part 1)

- Phase: Security
- Deliverable: One-page IR playbook
- Checkpoint: Can outline the incident lifecycle and the evidence sources used along the way.
- Study-week relationship: The six glossary terms for Week 20 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Alert Triage (`alert-triage`)

- `alert-triage-definition` [definition, easy] Front: What is Alert Triage?
  Back: Initial analysis process that validates and prioritizes alerts within monitoring, investigation, and response workflows.
- `alert-triage-function` [application, medium] Front: Scenario: Analysts need to validate alerts and queue real threats ahead of benign noise, not begin full containment immediately. Which process best fits?
  Back: Alert Triage — Reviews alert context, validates indicators, and assigns priority so analysts address the most credible threats first.
- `alert-triage-mechanism` [understanding, medium] Front: How does Alert Triage handle alert prioritization during operation?
  Back: Checks source fidelity, correlates nearby telemetry, and assigns severity so analysts queue real threats ahead of benign noise.

### False Positive (`false-positive`)

- `false-positive-definition` [definition, easy] Front: In one phrase, what is False Positive?
  Back: Alert that appears malicious but is benign after investigation within monitoring, investigation, and response workflows.
- `false-positive-function` [application, medium] Front: Scenario: Analysts need to validate alerts and queue real threats ahead of benign noise, not begin full containment immediately. Which process best fits?
  Back: False Positive — Occurs when detection logic matches benign activity, requiring tuning to reduce unnecessary analyst effort.
- `false-positive-mechanism` [understanding, medium] Front: What happens inside False Positive during alert prioritization processing?
  Back: Appears when a rule matches benign activity because indicators, thresholds, or context are too broad.

### Indicator of Compromise (`ioc`)

- `ioc-definition` [definition, easy] Front: What is Indicator of Compromise?
  Back: Observable evidence suggesting malicious activity occurred within monitoring, investigation, and response workflows.
- `ioc-function` [application, medium] Front: Scenario: A team needs the security operations process used for artifact selection, not an ad hoc analyst action. Which option best fits?
  Back: Indicator of Compromise — Captures observable artifacts such as hashes, domains, IPs, or processes associated with malicious activity.
- `ioc-mechanism` [understanding, medium] Front: How does Indicator of Compromise handle artifact selection during operation?
  Back: Uses observable artifacts such as hashes, domains, or registry changes to match activity against known malicious patterns.

### Incident Severity (`incident-severity`)

- `incident-severity-definition` [definition, easy] Front: In one phrase, what is Incident Severity?
  Back: Impact-based classification used to prioritize incident response within monitoring, investigation, and response workflows.
- `incident-severity-function` [application, medium] Front: Scenario: A team needs the security operations process used for incidents using impact, not an ad hoc analyst action. Which option best fits?
  Back: Incident Severity — Scores incidents using impact and urgency criteria to drive escalation, staffing, and response timelines.
- `incident-severity-mechanism` [understanding, medium] Front: What happens inside Incident Severity during incidents using impact processing?
  Back: Combines impact, scope, and urgency into a rating that drives escalation, communication, and response effort.

### Containment (`containment`)

- `containment-definition` [definition, easy] Front: What is Containment?
  Back: Response action that limits incident spread and immediate damage within monitoring, investigation, and response workflows.
- `containment-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Containment — Applies isolation, account restrictions, or blocking actions to stop attacker movement while preserving evidence.
- `containment-mechanism` [understanding, medium] Front: How does Containment handle case tracking during operation?
  Back: Limits attacker movement by isolating affected assets, blocking malicious paths, and preserving enough access for investigation.

### Eradication (`eradication`)

- `eradication-definition` [definition, easy] Front: What is Eradication?
  Back: Removal of attacker presence, malicious artifacts, and root causes within monitoring, investigation, and response workflows.
- `eradication-function` [application, medium] Front: Scenario: A team needs the security operations process used for artifact selection, not an ad hoc analyst action. Which option best fits?
  Back: Eradication — Removes malware, closes exploited access paths, and fixes root causes before systems return to service.
- `eradication-mechanism` [understanding, medium] Front: How does Eradication handle artifact selection during operation?
  Back: Removes malicious artifacts, closes exploited weaknesses, and validates cleanup so the same foothold cannot immediately return.


## Week 21 - Google Course 6: Detection and response (part 2)

- Phase: Security
- Deliverable: Escalation matrix + incident summary
- Checkpoint: Can explain how a SOC turns alerts into actions and communications.
- Study-week relationship: The six glossary terms for Week 21 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Recovery (`recovery`)

- `recovery-definition` [definition, easy] Front: What is Recovery?
  Back: Restoration of normal operations after incident containment and eradication within monitoring, investigation, and response workflows.
- `recovery-function` [application, medium] Front: Scenario: A team needs the security operations process used for boot sequencing, not an ad hoc analyst action. Which option best fits?
  Back: Recovery — Restores validated systems, services, and business operations after threats are removed and controls are confirmed.
- `recovery-mechanism` [understanding, medium] Front: How does Recovery handle boot sequencing during operation?
  Back: Restores systems in stages, validates normal operation, and monitors for recurrence before returning to full service.

### Playbook (`playbook`)

- `playbook-definition` [definition, easy] Front: What is Playbook?
  Back: Documented response workflow for recurring security scenarios within monitoring, investigation, and response workflows.
- `playbook-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Playbook — Documents response steps, roles, decision points, and evidence requirements for a recurring incident scenario.
- `playbook-mechanism` [understanding, medium] Front: How does Playbook handle case tracking during operation?
  Back: Defines trigger conditions, required steps, and decision points so analysts handle repeat scenarios the same way each time.

### Escalation Path (`escalation-path`)

- `escalation-path-definition` [definition, easy] Front: In one phrase, what is Escalation Path?
  Back: Defined process for raising incidents to appropriate teams and leadership within monitoring, investigation, and response workflows.
- `escalation-path-function` [application, medium] Front: Scenario: A team needs the security operations process used for incidents to higher, not an ad hoc analyst action. Which option best fits?
  Back: Escalation Path — Routes incidents to higher authority or specialist teams using predefined severity, impact, and responsibility criteria.
- `escalation-path-mechanism` [understanding, medium] Front: What happens inside Escalation Path during incidents to higher processing?
  Back: Routes an issue through defined responders and thresholds so decisions move quickly when severity or scope increases.

### Case Management (`case-management`)

- `case-management-definition` [definition, easy] Front: What is Case Management?
  Back: Tracking and coordination of investigation tasks, evidence, and decisions within monitoring, investigation, and response workflows.
- `case-management-function` [application, medium] Front: Scenario: Multiple analysts need one record for tasks, notes, evidence, and decisions during an investigation. Which process best fits?
  Back: Case Management — Maintains case status, assigned work, evidence references, and decisions throughout an investigation lifecycle.
- `case-management-mechanism` [understanding, medium] Front: How does Case Management handle case tracking during operation?
  Back: Keeps alerts, evidence, notes, and task status in one record so investigations remain coordinated across analysts.

### Timeline Analysis (`timeline-analysis`)

- `timeline-analysis-definition` [definition, easy] Front: In one phrase, what is Timeline Analysis?
  Back: Reconstruction of incident events in chronological order within monitoring, investigation, and response workflows.
- `timeline-analysis-function` [application, medium] Front: Scenario: Evidence will be handed between responders, storage, and investigators. Which process preserves traceable handling rather than just storing the files?
  Back: Timeline Analysis — Orders events by timestamp to reconstruct attacker actions, response steps, and system changes during an incident.
- `timeline-analysis-mechanism` [understanding, medium] Front: What happens inside Timeline Analysis during event logging processing?
  Back: Orders events by timestamp, reconciles clock differences, and fills gaps so cause and sequence become clear.

### Post-Incident Review (`post-incident-review`)

- `post-incident-review-definition` [definition, easy] Front: In one phrase, what is Post-Incident Review?
  Back: Structured retrospective focused on lessons and control improvements within monitoring, investigation, and response workflows.
- `post-incident-review-function` [application, medium] Front: Scenario: A team needs the security operations process used for timeline, not an ad hoc analyst action. Which option best fits?
  Back: Post-Incident Review — Evaluates timeline, controls, decisions, and communication after closure to improve future response effectiveness.
- `post-incident-review-mechanism` [understanding, medium] Front: What happens inside Post-Incident Review during timeline processing?
  Back: Reconstructs the event, compares actions to expected procedure, and converts gaps into specific follow-up improvements.


## Week 22 - Google Course 7: Python automation (part 1)

- Phase: Security
- Deliverable: Python basics notebook
- Checkpoint: Can read and modify short Python scripts without freezing.
- Study-week relationship: The six glossary terms for Week 22 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Python Script (`python-script`)

- `python-script-definition` [definition, easy] Front: In one phrase, what is Python Script?
  Back: Executable Python code used to automate repetitive tasks within scripting and systems automation workflows.
- `python-script-function` [application, medium] Front: Scenario: A team needs the automation concept used for python instructions from, not a manual copy-and-paste task. Which option best fits?
  Back: Python Script — Executes Python instructions from a file to automate parsing, reporting, administration, or response tasks.
- `python-script-mechanism` [understanding, medium] Front: What happens inside Python Script during python instructions from processing?
  Back: Reads inputs, executes statements in sequence, and can call libraries or system resources to automate tasks.

### Variable (`variable`)

- `variable-definition` [definition, easy] Front: In one phrase, what is Variable?
  Back: Named value container used in programming logic within scripting and systems automation workflows.
- `variable-function` [application, medium] Front: Scenario: A team needs the automation concept used for value storage, not a manual copy-and-paste task. Which option best fits?
  Back: Variable — Stores named data in memory so code can reference, update, and compare values during execution.
- `variable-mechanism` [understanding, medium] Front: What happens inside Variable during value storage processing?
  Back: Stores a named value in memory so later operations can read, change, or compare that value.

### Function (`function`)

- `function-definition` [definition, easy] Front: What is Function?
  Back: Reusable block of code that performs a defined task within scripting and systems automation workflows.
- `function-function` [application, medium] Front: Scenario: A team needs the automation concept used for reusable logic behind, not a manual copy-and-paste task. Which option best fits?
  Back: Function — Encapsulates reusable logic behind a named interface so code can be called with inputs and return results.
- `function-mechanism` [understanding, medium] Front: How does Function handle reusable logic behind during operation?
  Back: Packages steps behind a named interface so inputs go in, logic runs, and outputs return predictably.

### Loop (`loop`)

- `loop-definition` [definition, easy] Front: In one phrase, what is Loop?
  Back: Programming control structure that repeats actions over data or conditions within scripting and systems automation workflows.
- `loop-function` [application, medium] Front: Scenario: A team needs the automation concept used for statements over a, not a manual copy-and-paste task. Which option best fits?
  Back: Loop — Repeats statements over a sequence or condition until the dataset is exhausted or the condition changes.
- `loop-mechanism` [understanding, medium] Front: What happens inside Loop during statements over a processing?
  Back: Repeats a block over a range, collection, or condition until the termination rule is met.

### Conditional (`conditional`)

- `conditional-definition` [definition, easy] Front: In one phrase, what is Conditional?
  Back: Logic branch that executes code based on true/false evaluation within scripting and systems automation workflows.
- `conditional-function` [application, medium] Front: Scenario: A team needs the automation concept used for an expression and, not a manual copy-and-paste task. Which option best fits?
  Back: Conditional — Evaluates an expression and executes different code paths depending on whether the result is true or false.
- `conditional-mechanism` [understanding, medium] Front: What happens inside Conditional during an expression and processing?
  Back: Evaluates a true or false expression and sends execution down different branches based on the result.

### Error Handling (`error-handling`)

- `error-handling-definition` [definition, easy] Front: In one phrase, what is Error Handling?
  Back: Code pattern that captures and responds to runtime failures safely within scripting and systems automation workflows.
- `error-handling-function` [application, medium] Front: Scenario: A team needs the automation concept used for risk tracking, not a manual copy-and-paste task. Which option best fits?
  Back: Error Handling — Detects exceptions or invalid states, then logs, retries, exits, or recovers without unsafe program behavior.
- `error-handling-mechanism` [understanding, medium] Front: What happens inside Error Handling during risk tracking processing?
  Back: Wraps risky operations, captures exceptions or return codes, and routes failures into retries, logging, or cleanup.


## Week 23 - Google Course 7: Python automation (part 2)

- Phase: Security
- Deliverable: Automation script portfolio item
- Checkpoint: Can connect automation ideas to real analyst workflows.
- Study-week relationship: The six glossary terms for Week 23 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### API (`api`)

- `api-definition` [definition, easy] Front: In one phrase, what is API?
  Back: Application Programming Interface used to exchange data between systems within scripting and systems automation workflows.
- `api-function` [application, medium] Front: Scenario: A team needs the automation concept used for request handling, not a manual copy-and-paste task. Which option best fits?
  Back: API — Sends structured requests to defined endpoints and receives machine-readable responses for integration and automation tasks.
- `api-mechanism` [understanding, medium] Front: What happens inside API during request handling processing?
  Back: Builds requests with method, endpoint, headers, and payload, then parses the returned status and data for automation logic.

### HTTP Method (`http-method`)

- `http-method-definition` [definition, easy] Front: What is HTTP Method?
  Back: Action verb in HTTP such as GET, POST, PUT, or DELETE within web, data, and cloud services.
- `http-method-function` [application, medium] Front: Scenario: A team needs the service model or web/cloud concept used for the intended operation, not a local system setting. Which option best fits?
  Back: HTTP Method — Specifies the intended operation, such as reading, creating, updating, or deleting a resource.
- `http-method-mechanism` [understanding, medium] Front: How does HTTP Method handle the intended operation during operation?
  Back: Signals intended action such as retrieval, creation, update, or deletion so servers apply the correct handler logic.

### Automation Playbook (`automation-playbook`)

- `automation-playbook-definition` [definition, easy] Front: What is Automation Playbook?
  Back: Defined sequence of automated actions for a repeatable security task within monitoring, investigation, and response workflows.
- `automation-playbook-function` [application, medium] Front: Scenario: A team needs the security operations process used for response branching, not an ad hoc analyst action. Which option best fits?
  Back: Automation Playbook — Executes predefined steps, branching logic, and notifications to handle repetitive detection and response tasks consistently.
- `automation-playbook-mechanism` [understanding, medium] Front: How does Automation Playbook handle response branching during operation?
  Back: Chains predefined steps, inputs, and decision branches so repetitive response actions run consistently with minimal manual handling.

### Regular Expression (`regex`)

- `regex-definition` [definition, easy] Front: In one phrase, what is Regular Expression?
  Back: Pattern syntax used to match and extract structured text within monitoring, investigation, and response workflows.
- `regex-function` [application, medium] Front: Scenario: A team needs the security operations process used for character patterns within, not an ad hoc analyst action. Which option best fits?
  Back: Regular Expression — Matches character patterns within text so scripts and tools can filter, extract, or transform data.
- `regex-mechanism` [understanding, medium] Front: What happens inside Regular Expression during character patterns within processing?
  Back: Matches character patterns using tokens, grouping, and quantifiers so text can be searched or extracted precisely.

### File Parsing (`file-parsing`)

- `file-parsing-definition` [definition, easy] Front: What is File Parsing?
  Back: Reading structured or semi-structured files into usable data within monitoring, investigation, and response workflows.
- `file-parsing-function` [application, medium] Front: Scenario: A team needs the security operations process used for file access, not an ad hoc analyst action. Which option best fits?
  Back: File Parsing — Reads structured fields from logs or data files so automation and analysis can operate on extracted values.
- `file-parsing-mechanism` [understanding, medium] Front: How does File Parsing handle file access during operation?
  Back: Reads structured or semi-structured content, extracts needed fields, and normalizes the results for later analysis.

### Version Control (`version-control`)

- `version-control-definition` [definition, easy] Front: In one phrase, what is Version Control?
  Back: System for tracking code changes and collaboration history within scripting and systems automation workflows.
- `version-control-function` [application, medium] Front: Scenario: A team needs the automation concept used for change tracking, not a manual copy-and-paste task. Which option best fits?
  Back: Version Control — Records changes as commits, tracks history, and supports branching or collaboration on code and content.
- `version-control-mechanism` [understanding, medium] Front: What happens inside Version Control during change tracking processing?
  Back: Stores changes as commits, tracks diffs between versions, and merges or reverts work through branch history.


## Week 24 - Google Course 8: Prepare for cybersecurity jobs

- Phase: Security
- Deliverable: Resume bullets + five mock interview answers
- Checkpoint: Can talk about your work in evidence-based, employer-friendly language.
- Study-week relationship: The six glossary terms for Week 24 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Resume Tailoring (`resume-tailoring`)

- `resume-tailoring-definition` [definition, easy] Front: In one phrase, what is Resume Tailoring?
  Back: Adjusting resume content to align with a specific role within cybersecurity job-search and portfolio workflows.
- `resume-tailoring-function` [application, medium] Front: Scenario: A team needs the workflow concept used for case tracking, not an unstructured checklist. Which option best fits?
  Back: Resume Tailoring — Reorders content, rewrites bullets, and emphasizes relevant evidence for each specific role description.
- `resume-tailoring-mechanism` [understanding, medium] Front: What happens inside Resume Tailoring during case tracking processing?
  Back: Adjusts summary, bullets, and keywords against a specific posting so the document reflects that role's priorities.

### STAR Method (`star-method`)

- `star-method-definition` [definition, easy] Front: What is STAR Method?
  Back: Interview storytelling format: Situation, Task, Action, Result within cybersecurity job-search and portfolio workflows.
- `star-method-function` [application, medium] Front: Scenario: A team needs the workflow concept used for interview answers by, not an unstructured checklist. Which option best fits?
  Back: STAR Method — Structures interview answers by sequencing context, responsibility, action taken, and measurable outcome in a concise format.
- `star-method-mechanism` [understanding, medium] Front: How does STAR Method handle interview answers by during operation?
  Back: Structures answers as situation, task, action, and result so examples stay specific and easy to follow.

### Elevator Pitch (`elevator-pitch`)

- `elevator-pitch-definition` [definition, easy] Front: In one phrase, what is Elevator Pitch?
  Back: Short professional summary of value, direction, and goals within cybersecurity job-search and portfolio workflows.
- `elevator-pitch-function` [application, medium] Front: Scenario: A team needs the workflow concept used for career narrative, not an unstructured checklist. Which option best fits?
  Back: Elevator Pitch — Compresses role target, relevant evidence, and specialization into a brief introduction suitable for networking and screening calls.
- `elevator-pitch-mechanism` [understanding, medium] Front: What happens inside Elevator Pitch during career narrative processing?
  Back: Compresses background, target role, and differentiator into a short sequence that can be delivered consistently in introductions.

### Portfolio Artifact (`portfolio-artifact`)

- `portfolio-artifact-definition` [definition, easy] Front: What is Portfolio Artifact?
  Back: Concrete evidence of work quality such as write-ups, diagrams, or labs within cybersecurity job-search and portfolio workflows.
- `portfolio-artifact-function` [application, medium] Front: Scenario: A team needs the workflow concept used for request handling, not an unstructured checklist. Which option best fits?
  Back: Portfolio Artifact — Captures a completed deliverable with context, method, and outcome so reviewers can evaluate practical capability.
- `portfolio-artifact-mechanism` [understanding, medium] Front: How does Portfolio Artifact handle request handling during operation?
  Back: Packages one concrete output with context, methods, and result so a reviewer can understand what was built and why.

### Interview Question Drill (`interview-question`)

- `interview-question-definition` [definition, easy] Front: What is Interview Question Drill?
  Back: Structured practice of common technical and behavioral interview prompts within cybersecurity job-search and portfolio workflows.
- `interview-question-function` [application, medium] Front: Scenario: A team needs the workflow concept used for stage tracking, not an unstructured checklist. Which option best fits?
  Back: Interview Question Drill — Uses repeated prompt-response practice with timed answers to improve structure, precision, and confidence under interview conditions.
- `interview-question-mechanism` [understanding, medium] Front: How does Interview Question Drill handle stage tracking during operation?
  Back: Repeats likely prompts, retrieves structured answers from memory, and exposes weak examples before real interviews.

### Career Story (`career-story`)

- `career-story-definition` [definition, easy] Front: In one phrase, what is Career Story?
  Back: Narrative linking background, skills, and target role trajectory within cybersecurity job-search and portfolio workflows.
- `career-story-function` [application, medium] Front: Scenario: A team needs the workflow concept used for stage tracking, not an unstructured checklist. Which option best fits?
  Back: Career Story — Combines prior experience, current skills, and target roles into a consistent narrative used across interviews and profiles.
- `career-story-mechanism` [understanding, medium] Front: What happens inside Career Story during stage tracking processing?
  Back: Connects prior experience, current training, and target role into a sequence that shows progression, intent, and fit.


## Week 25 - Google Course 9: Job search systems, AI support, and profile polish

- Phase: Security
- Deliverable: LinkedIn update + application tracker
- Checkpoint: Your online profile and job-search system are live and usable.
- Study-week relationship: The six glossary terms for Week 25 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### LinkedIn Profile (`linkedin-profile`)

- `linkedin-profile-definition` [definition, easy] Front: What is LinkedIn Profile?
  Back: Professional public profile highlighting role alignment and proof-of-work within cybersecurity job-search and portfolio workflows.
- `linkedin-profile-function` [application, medium] Front: Scenario: A team needs the workflow concept used for artifact selection, not an unstructured checklist. Which option best fits?
  Back: LinkedIn Profile — Publishes a searchable professional summary, experience evidence, and network-facing activity aligned with target cybersecurity roles.
- `linkedin-profile-mechanism` [understanding, medium] Front: How does LinkedIn Profile handle artifact selection during operation?
  Back: Combines headline, summary, experience, and artifacts into a searchable public profile recruiters can scan quickly.

### Networking Outreach (`networking-outreach`)

- `networking-outreach-definition` [definition, easy] Front: In one phrase, what is Networking Outreach?
  Back: Intentional communication with peers, mentors, and hiring contacts within cybersecurity job-search and portfolio workflows.
- `networking-outreach-function` [application, medium] Front: Scenario: A team needs the workflow concept used for case tracking, not an unstructured checklist. Which option best fits?
  Back: Networking Outreach — Schedules targeted messages, follow-ups, and conversation notes to expand referral paths and market visibility.
- `networking-outreach-mechanism` [understanding, medium] Front: What happens inside Networking Outreach during case tracking processing?
  Back: Uses targeted messages, shared context, and timed follow-ups to open conversations without sending generic requests.

### Job Tracker (`job-tracker`)

- `job-tracker-definition` [definition, easy] Front: In one phrase, what is Job Tracker?
  Back: System for managing applications, follow-ups, and interview stages within cybersecurity job-search and portfolio workflows.
- `job-tracker-function` [application, medium] Front: Scenario: A team needs the workflow concept used for stage tracking, not an unstructured checklist. Which option best fits?
  Back: Job Tracker — Stores application dates, contact details, follow-up tasks, and outcomes so outreach activity remains measurable and current.
- `job-tracker-mechanism` [understanding, medium] Front: What happens inside Job Tracker during stage tracking processing?
  Back: Stores roles, dates, contacts, and follow-ups in one record so applications can be reviewed and acted on systematically.

### Keyword Optimization (`keyword-optimization`)

- `keyword-optimization-definition` [definition, easy] Front: In one phrase, what is Keyword Optimization?
  Back: Aligning profile and resume terms with job descriptions and ATS logic within cybersecurity job-search and portfolio workflows.
- `keyword-optimization-function` [application, medium] Front: Scenario: A team needs the workflow concept used for resume and profile, not an unstructured checklist. Which option best fits?
  Back: Keyword Optimization — Maps resume and profile language to recurring job-description terms so applicant tracking systems match relevant skills.
- `keyword-optimization-mechanism` [understanding, medium] Front: What happens inside Keyword Optimization during resume and profile processing?
  Back: Maps resume and profile wording to repeated job-post terms so screening systems and recruiters find the intended matches.

### Application Funnel (`application-funnel`)

- `application-funnel-definition` [definition, easy] Front: What is Application Funnel?
  Back: Measurement view of applications from submit to offer stages within cybersecurity job-search and portfolio workflows.
- `application-funnel-function` [application, medium] Front: Scenario: A team needs the workflow concept used for stage tracking, not an unstructured checklist. Which option best fits?
  Back: Application Funnel — Tracks counts, conversion rates, and delays between application stages to expose where the search process stalls.
- `application-funnel-mechanism` [understanding, medium] Front: How does Application Funnel handle stage tracking during operation?
  Back: Breaks the search into stages, measures transitions between them, and exposes where outreach or interviews stop converting.

### AI Assistant Guardrails (`ai-assistant-guardrails`)

- `ai-assistant-guardrails-definition` [definition, easy] Front: In one phrase, what is AI Assistant Guardrails?
  Back: Rules that keep AI-supported job-search outputs accurate and authentic within cybersecurity job-search and portfolio workflows.
- `ai-assistant-guardrails-function` [application, medium] Front: Scenario: A team needs the workflow concept used for approval checks, not an unstructured checklist. Which option best fits?
  Back: AI Assistant Guardrails — Define source boundaries, review checks, and approval rules before generated text is used in resumes or outreach.
- `ai-assistant-guardrails-mechanism` [understanding, medium] Front: What happens inside AI Assistant Guardrails during approval checks processing?
  Back: Applies prompt boundaries, source checks, and human approval gates so generated text is constrained before publication.


## Week 26 - Security+ reinforcement: IAM, crypto, and social engineering

- Phase: Security
- Deliverable: IAM / crypto / social-engineering brief
- Checkpoint: Can explain core defensive principles clearly and consistently.
- Study-week relationship: The six glossary terms for Week 26 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Identity (`identity`)

- `identity-definition` [definition, easy] Front: In one phrase, what is Identity?
  Back: Digital representation of a user, service, or device in an access system.
- `identity-function` [application, medium] Front: Scenario: Investigators need records of sign-ins, permission decisions, and admin changes, not just access enforcement. Which AAA function best fits?
  Back: Identity — Associates attributes, credentials, and permissions with a subject so systems can evaluate access requests consistently.
- `identity-mechanism` [understanding, medium] Front: What happens inside Identity during credential checks processing?
  Back: Links usernames, attributes, and credentials in a record that other controls query when making authentication and authorization decisions.

### Authentication (`authentication`)

- `authentication-definition` [definition, easy] Front: What is Authentication?
  Back: Process of verifying claimed identity within authentication and access control security workflows.
- `authentication-function` [application, medium] Front: Scenario: A system checks a password or token before creating a session. Which concept is being performed rather than the step that assigns permissions?
  Back: Authentication — Validates submitted credentials, tokens, certificates, or biometrics before issuing a session or allowing access requests.
- `authentication-mechanism` [understanding, medium] Front: How does Authentication handle credential checks during operation?
  Back: Checks submitted credentials against a stored factor, then establishes identity context only when the proof matches expected values.

### Authorization (`authorization`)

- `authorization-definition` [definition, easy] Front: In one phrase, what is Authorization?
  Back: Process of granting permitted actions to an authenticated identity within authentication and access control security workflows.
- `authorization-function` [application, medium] Front: Scenario: A user signs in successfully, but file access still depends on policy rules and ACLs. Which concept best determines what actions are permitted?
  Back: Authorization — Evaluates policy rules after authentication to determine which resources and actions an identity may use.
- `authorization-mechanism` [understanding, medium] Front: What happens inside Authorization during policy evaluation processing?
  Back: Compares the authenticated identity against policy rules, group membership, or ACL entries before permitting each requested action.

### Accounting (AAA) (`accounting`)

- `accounting-definition` [definition, easy] Front: What is Accounting (AAA)?
  Back: Tracking and logging of identity actions for accountability within authentication and access control security workflows.
- `accounting-function` [application, medium] Front: Scenario: Investigators need records of sign-ins, permission decisions, and admin changes, not just access enforcement. Which AAA function best fits?
  Back: Accounting (AAA) — Records authentication events, authorization decisions, and administrative actions so investigators can reconstruct accountability across monitored systems.
- `accounting-mechanism` [understanding, medium] Front: How does Accounting (AAA) handle event logging during operation?
  Back: Captures login attempts, privilege changes, and session activity in logs so actions can be tied back to specific identities.

### Hashing (`hashing`)

- `hashing-definition` [definition, easy] Front: In one phrase, what is Hashing?
  Back: One-way transformation of data into a fixed-length digest within authentication and access control security workflows.
- `hashing-function` [application, medium] Front: Scenario: A team needs the identity or cryptography concept used for process scheduling, not a control that only records activity. Which option best fits?
  Back: Hashing — Processes input through a deterministic algorithm to produce a fixed digest for integrity checks and password verification.
- `hashing-mechanism` [understanding, medium] Front: What happens inside Hashing during process scheduling processing?
  Back: Runs input through a one-way algorithm that deterministically produces a fixed-length digest, exposing changes when inputs differ.

### Encryption (`encryption`)

- `encryption-definition` [definition, easy] Front: What is Encryption?
  Back: Reversible transformation that protects confidentiality with keys within authentication and access control security workflows.
- `encryption-function` [application, medium] Front: Scenario: A team needs the identity or cryptography concept used for key-based protection, not a control that only records activity. Which option best fits?
  Back: Encryption — Uses algorithms and keys to transform plaintext into ciphertext that authorized parties can later decrypt.
- `encryption-mechanism` [understanding, medium] Front: How does Encryption handle key-based protection during operation?
  Back: Transforms plaintext with a key and algorithm into ciphertext, and only the correct key reverses that transformation.


## Week 27 - TryHackMe Cyber Security 101 + breach journal capstone

- Phase: Security
- Deliverable: Three breach summaries + management brief
- Checkpoint: Can translate technical incidents into management language.
- Study-week relationship: The six glossary terms for Week 27 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Reconnaissance (`reconnaissance`)

- `reconnaissance-definition` [definition, easy] Front: In one phrase, what is Reconnaissance?
  Back: Information-gathering phase used by attackers before exploitation within monitoring, investigation, and response workflows.
- `reconnaissance-function` [application, medium] Front: Scenario: A team needs the security operations process used for target information from, not an ad hoc analyst action. Which option best fits?
  Back: Reconnaissance — Collects target information from public or direct sources before exploitation, phishing, or lateral movement attempts.
- `reconnaissance-mechanism` [understanding, medium] Front: What happens inside Reconnaissance during target information from processing?
  Back: Collects public or reachable information first, then uses those findings to choose likely targets and attack paths.

### Enumeration (`enumeration`)

- `enumeration-definition` [definition, easy] Front: In one phrase, what is Enumeration?
  Back: Active discovery of services, accounts, or resources on a target within monitoring, investigation, and response workflows.
- `enumeration-function` [application, medium] Front: Scenario: Responders need accurate records of systems, software, owners, and data before scoping an incident. Which process best fits?
  Back: Enumeration — Queries services, directories, or hosts to identify available accounts, ports, shares, and software details.
- `enumeration-mechanism` [understanding, medium] Front: What happens inside Enumeration during asset scoping processing?
  Back: Queries exposed services, users, shares, or directories step by step to expand knowledge of a target environment.

### Privilege Escalation (`privilege-escalation`)

- `privilege-escalation-definition` [definition, easy] Front: What is Privilege Escalation?
  Back: Technique for gaining higher permissions than initially granted within monitoring, investigation, and response workflows.
- `privilege-escalation-function` [application, medium] Front: Scenario: Responders need accurate records of systems, software, owners, and data before scoping an incident. Which process best fits?
  Back: Privilege Escalation — Exploits misconfigurations or software flaws to obtain permissions beyond the initial security context.
- `privilege-escalation-mechanism` [understanding, medium] Front: How does Privilege Escalation handle asset scoping during operation?
  Back: Abuses misconfigurations, weak permissions, or software flaws to gain rights beyond the attacker's starting level.

### Defense in Depth (`defense-in-depth`)

- `defense-in-depth-definition` [definition, easy] Front: What is Defense in Depth?
  Back: Layered control strategy so one failed safeguard does not cause total failure.
- `defense-in-depth-function` [application, medium] Front: Scenario: A team needs the governance process used for multiple safeguards across, not an informal note. Which option best fits?
  Back: Defense in Depth — Applies multiple safeguards across layers so a single control failure does not expose the entire environment.
- `defense-in-depth-mechanism` [understanding, medium] Front: How does Defense in Depth handle multiple safeguards across during operation?
  Back: Layers preventive, detective, and corrective controls so one failure does not expose the full asset.

### Incident Journal (`incident-journal`)

- `incident-journal-definition` [definition, easy] Front: What is Incident Journal?
  Back: Structured notes capturing incident observations, decisions, and rationale within monitoring, investigation, and response workflows.
- `incident-journal-function` [application, medium] Front: Scenario: Evidence will be handed between responders, storage, and investigators. Which process preserves traceable handling rather than just storing the files?
  Back: Incident Journal — Records timestamps, observations, hypotheses, and actions in sequence to support investigation continuity and review.
- `incident-journal-mechanism` [understanding, medium] Front: How does Incident Journal handle timeline reconstruction during operation?
  Back: Records timestamps, actions, findings, and decisions in order so the investigation can be reconstructed accurately later.

### Control Recommendation (`control-recommendation`)

- `control-recommendation-definition` [definition, easy] Front: In one phrase, what is Control Recommendation?
  Back: Actionable proposal to improve prevention, detection, or response capability within governance, risk, and compliance workflows.
- `control-recommendation-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Control Recommendation — Documents a proposed safeguard, rationale, owner, and priority for reducing identified risk.
- `control-recommendation-mechanism` [understanding, medium] Front: What happens inside Control Recommendation during risk tracking processing?
  Back: Links an identified gap to a specific safeguard, owner, and priority so remediation can be executed.


## Week 28 - CISA incident response materials and playbook thinking

- Phase: GRC / Application
- Deliverable: IR checklist + roles matrix
- Checkpoint: Can think about incidents in terms of preparation, roles, and business continuity.
- Study-week relationship: The six glossary terms for Week 28 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Incident Command (`incident-command`)

- `incident-command-definition` [definition, easy] Front: In one phrase, what is Incident Command?
  Back: Leadership structure coordinating decisions and responsibilities during incidents within monitoring, investigation, and response workflows.
- `incident-command-function` [application, medium] Front: Scenario: A team needs the security operations process used for incident communications, not an ad hoc analyst action. Which option best fits?
  Back: Incident Command — Assigns command roles, decision authority, and coordination channels so response teams act under a consistent structure.
- `incident-command-mechanism` [understanding, medium] Front: What happens inside Incident Command during incident communications processing?
  Back: Assigns leadership, roles, and reporting lines so technical response and business decisions stay coordinated under pressure.

### Playbook (`playbook`)

- `playbook-definition` [definition, easy] Front: What is Playbook?
  Back: Documented response workflow for recurring security scenarios within monitoring, investigation, and response workflows.
- `playbook-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Playbook — Documents response steps, roles, decision points, and evidence requirements for a recurring incident scenario.
- `playbook-mechanism` [understanding, medium] Front: How does Playbook handle case tracking during operation?
  Back: Defines trigger conditions, required steps, and decision points so analysts handle repeat scenarios the same way each time.

### Maturity Model (`maturity-model`)

- `maturity-model-definition` [definition, easy] Front: In one phrase, what is Maturity Model?
  Back: Framework used to assess current capability level and improvement targets within governance, risk, and compliance workflows.
- `maturity-model-function` [application, medium] Front: Scenario: A team needs the governance process used for gap analysis, not an informal note. Which option best fits?
  Back: Maturity Model — Rates current process capability against defined levels to guide staged improvement planning.
- `maturity-model-mechanism` [understanding, medium] Front: What happens inside Maturity Model during gap analysis processing?
  Back: Defines staged capability levels with observable practices so programs can judge progress against a target state.

### Communication Plan (`communication-plan`)

- `communication-plan-definition` [definition, easy] Front: What is Communication Plan?
  Back: Documented messaging protocol for stakeholders during security events within monitoring, investigation, and response workflows.
- `communication-plan-function` [application, medium] Front: Scenario: A team needs the security operations process used for approval checks, not an ad hoc analyst action. Which option best fits?
  Back: Communication Plan — Defines notification paths, message timing, approval points, and audiences during an incident response process.
- `communication-plan-mechanism` [understanding, medium] Front: How does Communication Plan handle approval checks during operation?
  Back: Defines audiences, triggers, channels, and message owners so incident updates move on schedule without conflicting reports.

### Evidence Handling (`evidence-handling`)

- `evidence-handling-definition` [definition, easy] Front: In one phrase, what is Evidence Handling?
  Back: Process for collecting and preserving evidence with integrity within monitoring, investigation, and response workflows.
- `evidence-handling-function` [application, medium] Front: Scenario: A team needs the security operations process used for artifact selection, not an ad hoc analyst action. Which option best fits?
  Back: Evidence Handling — Collects, labels, stores, and transfers artifacts using documented procedures that preserve reliability and traceability.
- `evidence-handling-mechanism` [understanding, medium] Front: What happens inside Evidence Handling during artifact selection processing?
  Back: Acquires, labels, stores, and transfers artifacts using repeatable procedures that preserve integrity and analyst context.

### Tabletop Exercise (`tabletop-exercise`)

- `tabletop-exercise-definition` [definition, easy] Front: What is Tabletop Exercise?
  Back: Scenario-based drill used to test readiness and coordination within monitoring, investigation, and response workflows.
- `tabletop-exercise-function` [application, medium] Front: Scenario: A team needs the security operations process used for stakeholders through a, not an ad hoc analyst action. Which option best fits?
  Back: Tabletop Exercise — Walks stakeholders through a scenario to test decisions, communications, and documented response procedures.
- `tabletop-exercise-mechanism` [understanding, medium] Front: How does Tabletop Exercise handle stakeholders through a during operation?
  Back: Walks participants through a scenario, pauses at decision points, and compares responses to expected actions and gaps.


## Week 29 - Critical infrastructure, governance, risk, and assessment mindset

- Phase: GRC / Application
- Deliverable: Risk register + control map
- Checkpoint: Can talk about cyber in governance and resilience terms, not just tools.
- Study-week relationship: The six glossary terms for Week 29 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Critical Infrastructure (`critical-infrastructure`)

- `critical-infrastructure-definition` [definition, easy] Front: In one phrase, what is Critical Infrastructure?
  Back: Systems essential to societal and economic stability within governance, risk, and compliance workflows.
- `critical-infrastructure-function` [application, medium] Front: Scenario: A team needs the governance process used for boot sequencing, not an informal note. Which option best fits?
  Back: Critical Infrastructure — Includes essential services whose disruption would significantly affect safety, economy, health, or national security.
- `critical-infrastructure-mechanism` [understanding, medium] Front: What happens inside Critical Infrastructure during boot sequencing processing?
  Back: Depends on interlocking services, suppliers, and control systems, so failure in one area can cascade into others.

### Business Impact Analysis (`business-impact-analysis`)

- `business-impact-analysis-definition` [definition, easy] Front: In one phrase, what is Business Impact Analysis?
  Back: Process for identifying operational effects of disruption over time within governance, risk, and compliance workflows.
- `business-impact-analysis-function` [application, medium] Front: Scenario: A team needs the governance process used for impact mapping, not an informal note. Which option best fits?
  Back: Business Impact Analysis — Estimates process disruption effects, recovery priorities, and tolerable downtime for critical business functions.
- `business-impact-analysis-mechanism` [understanding, medium] Front: What happens inside Business Impact Analysis during impact mapping processing?
  Back: Maps business processes to dependencies, outage tolerances, and recovery needs so disruption consequences can be measured.

### Governance (`governance`)

- `governance-definition` [definition, easy] Front: In one phrase, what is Governance?
  Back: Decision framework defining accountability, policy, and oversight within governance, risk, and compliance workflows.
- `governance-function` [application, medium] Front: Scenario: A team needs the concept process used for decision rights, not an informal note. Which option best fits?
  Back: Governance — Assigns decision rights, policy direction, and oversight mechanisms for managing cybersecurity activities.
- `governance-mechanism` [understanding, medium] Front: What happens inside Governance during decision rights processing?
  Back: Assigns decision rights, accountability, and policy direction so security work aligns with organizational objectives.

### Compliance (`compliance`)

- `compliance-definition` [definition, easy] Front: What is Compliance?
  Back: Conformance to laws, regulations, standards, or internal policies within governance, risk, and compliance workflows.
- `compliance-function` [application, medium] Front: Scenario: A team needs the governance process used for case tracking, not an informal note. Which option best fits?
  Back: Compliance — Measures implemented practices against external or internal requirements and documents conformity or deficiency.
- `compliance-mechanism` [understanding, medium] Front: How does Compliance handle case tracking during operation?
  Back: Compares actual practices and evidence against a required standard, then records where controls meet or miss expectations.

### Risk Assessment (`risk-assessment`)

- `risk-assessment-definition` [definition, easy] Front: In one phrase, what is Risk Assessment?
  Back: Structured evaluation of risk likelihood, impact, and treatment options within governance, risk, and compliance workflows.
- `risk-assessment-function` [application, medium] Front: Scenario: A team needs a living document listing identified risks, owners, ratings, and treatment status, not just a one-time assessment. Which governance document best fits?
  Back: Risk Assessment — Identifies assets, threats, vulnerabilities, likelihood, and impact to support informed treatment decisions.
- `risk-assessment-mechanism` [understanding, medium] Front: What happens inside Risk Assessment during risk tracking processing?
  Back: Identifies assets, threats, vulnerabilities, likelihood, and impact, then combines them into prioritized risk statements.

### Vendor Risk (`vendor-risk`)

- `vendor-risk-definition` [definition, easy] Front: What is Vendor Risk?
  Back: Risk introduced by third-party suppliers and service providers within governance, risk, and compliance workflows.
- `vendor-risk-function` [application, medium] Front: Scenario: A team needs the governance process used for boot sequencing, not an informal note. Which option best fits?
  Back: Vendor Risk — Assesses how third-party access, services, dependencies, or weaknesses affect organizational security exposure.
- `vendor-risk-mechanism` [understanding, medium] Front: How does Vendor Risk handle boot sequencing during operation?
  Back: Evaluates third-party access, handling practices, and dependency impact so supplier exposure is understood before onboarding.


## Week 30 - TryHackMe Defensive Security: SOC, forensics, IR, and logs

- Phase: GRC / Application
- Deliverable: SOC workflow + lab notes
- Checkpoint: Can describe a defensive workflow from alert to escalation.
- Study-week relationship: The six glossary terms for Week 30 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### SOC Workflow (`soc-workflow`)

- `soc-workflow-definition` [definition, easy] Front: In one phrase, what is SOC Workflow?
  Back: End-to-end process from alert intake to closure and lessons learned within monitoring, investigation, and response workflows.
- `soc-workflow-function` [application, medium] Front: Scenario: A team needs the security operations process used for work from intake, not an ad hoc analyst action. Which option best fits?
  Back: SOC Workflow — Moves work from intake through triage, investigation, containment, and closure using defined operational procedures.
- `soc-workflow-mechanism` [understanding, medium] Front: What happens inside SOC Workflow during work from intake processing?
  Back: Moves work from alert intake through investigation, escalation, and closure using defined roles, tooling, and handoff points.

### Forensic Imaging (`forensic-imaging`)

- `forensic-imaging-definition` [definition, easy] Front: In one phrase, what is Forensic Imaging?
  Back: Bit-level copy of media created for evidence analysis within monitoring, investigation, and response workflows.
- `forensic-imaging-function` [application, medium] Front: Scenario: A team needs the security operations process used for a sector-level duplicate, not an ad hoc analyst action. Which option best fits?
  Back: Forensic Imaging — Creates a sector-level duplicate of media while preserving source state for repeatable forensic examination.
- `forensic-imaging-mechanism` [understanding, medium] Front: What happens inside Forensic Imaging during a sector-level duplicate processing?
  Back: Copies storage bit for bit, verifies the image with hashes, and preserves the original media from further change.

### Chain of Custody (`chain-of-custody`)

- `chain-of-custody-definition` [definition, easy] Front: In one phrase, what is Chain of Custody?
  Back: Record of who handled evidence, when, and why within monitoring, investigation, and response workflows.
- `chain-of-custody-function` [application, medium] Front: Scenario: Evidence will be handed between responders, storage, and investigators. Which process preserves traceable handling rather than just storing the files?
  Back: Chain of Custody — Documents each evidence transfer, handler, timestamp, and purpose to preserve admissibility and integrity.
- `chain-of-custody-mechanism` [understanding, medium] Front: What happens inside Chain of Custody during case tracking processing?
  Back: Documents who collected, transferred, stored, and examined evidence so handling remains traceable and defensible.

### Log Correlation (`log-correlation`)

- `log-correlation-definition` [definition, easy] Front: In one phrase, what is Log Correlation?
  Back: Linking events from multiple sources to reveal meaningful patterns within monitoring, investigation, and response workflows.
- `log-correlation-function` [application, medium] Front: Scenario: A team needs the security operations process used for event logging, not an ad hoc analyst action. Which option best fits?
  Back: Log Correlation — Combines events across sources by time, host, user, or indicator to reveal attack sequences.
- `log-correlation-mechanism` [understanding, medium] Front: What happens inside Log Correlation during event logging processing?
  Back: Joins events across sources by time, host, user, or session so one isolated signal becomes a complete narrative.

### Detection Rule (`detection-rule`)

- `detection-rule-definition` [definition, easy] Front: In one phrase, what is Detection Rule?
  Back: Logic used by monitoring systems to trigger alerts within monitoring, investigation, and response workflows.
- `detection-rule-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Detection Rule — Evaluates log fields, thresholds, and patterns against conditions that generate actionable security alerts.
- `detection-rule-mechanism` [understanding, medium] Front: What happens inside Detection Rule during case tracking processing?
  Back: Evaluates events against defined conditions, thresholds, or sequences and generates alerts when matching activity appears.

### Triage Queue (`triage-queue`)

- `triage-queue-definition` [definition, easy] Front: What is Triage Queue?
  Back: Ordered list of alerts or cases awaiting analyst review within monitoring, investigation, and response workflows.
- `triage-queue-function` [application, medium] Front: Scenario: A team needs the security operations process used for case tracking, not an ad hoc analyst action. Which option best fits?
  Back: Triage Queue — Maintains pending alerts or cases in prioritized order so analysts work according to urgency and capacity.
- `triage-queue-mechanism` [understanding, medium] Front: How does Triage Queue handle case tracking during operation?
  Back: Ranks incoming work by severity, confidence, and business impact so limited analyst time goes to the riskiest items first.


## Week 31 - Portfolio packaging, mock briefing, and next-step planning

- Phase: GRC / Application
- Deliverable: Final portfolio pack + next-step plan
- Checkpoint: You have a usable portfolio and a credible next-step roadmap.
- Study-week relationship: The six glossary terms for Week 31 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Executive Briefing (`executive-briefing`)

- `executive-briefing-definition` [definition, easy] Front: What is Executive Briefing?
  Back: Concise leadership-facing summary of risk, impact, and recommended action within governance, risk, and compliance workflows.
- `executive-briefing-function` [application, medium] Front: Scenario: A team needs the governance process used for technical findings into, not an informal note. Which option best fits?
  Back: Executive Briefing — Summarizes technical findings into business impact, options, and decisions needed by senior leadership.
- `executive-briefing-mechanism` [understanding, medium] Front: How does Executive Briefing handle technical findings into during operation?
  Back: Condenses technical facts into business impact, decision needs, and recommended actions suited to leadership review.

### Management Summary (`management-summary`)

- `management-summary-definition` [definition, easy] Front: What is Management Summary?
  Back: Non-technical overview focused on business impact and decisions needed within governance, risk, and compliance workflows.
- `management-summary-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Management Summary — Condenses technical detail into concise statements about business effect, priority, and recommended actions.
- `management-summary-mechanism` [understanding, medium] Front: How does Management Summary handle risk tracking during operation?
  Back: Distills detailed analysis into risk, impact, and recommended action so managers can decide quickly.

### Artifact Curation (`artifact-curation`)

- `artifact-curation-definition` [definition, easy] Front: In one phrase, what is Artifact Curation?
  Back: Selecting and organizing portfolio evidence for clear storytelling within cybersecurity job-search and portfolio workflows.
- `artifact-curation-function` [application, medium] Front: Scenario: A team needs the workflow concept used for artifact selection, not an unstructured checklist. Which option best fits?
  Back: Artifact Curation — Selects representative evidence, standardizes presentation, and removes weak samples before publishing portfolio materials.
- `artifact-curation-mechanism` [understanding, medium] Front: What happens inside Artifact Curation during artifact selection processing?
  Back: Sorts artifacts by relevance and quality, then keeps strong evidence while removing duplicates, weak samples, and formatting noise.

### Roadmap Prioritization (`roadmap-prioritization`)

- `roadmap-prioritization-definition` [definition, easy] Front: What is Roadmap Prioritization?
  Back: Choosing next learning or capability steps based on impact and constraints within governance, risk, and compliance workflows.
- `roadmap-prioritization-function` [application, medium] Front: Scenario: A team needs the governance process used for risk tracking, not an informal note. Which option best fits?
  Back: Roadmap Prioritization — Ranks planned improvements by impact, dependency, cost, and timing to sequence work realistically.
- `roadmap-prioritization-mechanism` [understanding, medium] Front: How does Roadmap Prioritization handle risk tracking during operation?
  Back: Ranks initiatives by risk reduction, effort, dependency, and timing so the backlog can be sequenced realistically.

### Capability Gap (`capability-gap`)

- `capability-gap-definition` [definition, easy] Front: What is Capability Gap?
  Back: Difference between current skills/process maturity and target state within governance, risk, and compliance workflows.
- `capability-gap-function` [application, medium] Front: Scenario: A team needs the governance process used for gap analysis, not an informal note. Which option best fits?
  Back: Capability Gap — Compares current staffing, tooling, or process maturity against required outcomes to identify deficiencies.
- `capability-gap-mechanism` [understanding, medium] Front: How does Capability Gap handle gap analysis during operation?
  Back: Compares current people, process, and tooling against a target state to show what is missing.

### Continuous Improvement (`continuous-improvement`)

- `continuous-improvement-definition` [definition, easy] Front: In one phrase, what is Continuous Improvement?
  Back: Ongoing cycle of measuring outcomes and refining process within governance, risk, and compliance workflows.
- `continuous-improvement-function` [application, medium] Front: Scenario: A team needs the governance process used for process scheduling, not an informal note. Which option best fits?
  Back: Continuous Improvement — Uses metrics, lessons learned, and review cycles to refine controls, processes, and training over time.
- `continuous-improvement-mechanism` [understanding, medium] Front: What happens inside Continuous Improvement during process scheduling processing?
  Back: Uses review findings, metrics, and repeated adjustments to raise control effectiveness over successive cycles.


## Week 32 - Catch-up, comprehensive review, and study-system reset

- Phase: Buffer / Final Review
- Deliverable: Completion checklist + retrospective
- Checkpoint: Everything is either complete or deliberately parked with a next step.
- Study-week relationship: The six glossary terms for Week 32 define the vocabulary needed to complete the week's deliverable and checkpoint. Day 1-5 introduce and reuse these cards, Day 6 reviews them as a single deck, and Day 7 adds no new cards.

### Spaced Repetition (`spaced-repetition`)

- `spaced-repetition-definition` [definition, easy] Front: What is Spaced Repetition?
  Back: Review technique that revisits material at increasing intervals within structured review and exam preparation.
- `spaced-repetition-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for reviews at expanding, not an unstructured checklist. Which option best fits?
  Back: Spaced Repetition — Schedules reviews at expanding intervals based on difficulty and prior recall performance.
- `spaced-repetition-mechanism` [understanding, medium] Front: How does Spaced Repetition handle reviews at expanding during operation?
  Back: Schedules reviews at increasing intervals, bringing material back near the point it would otherwise be forgotten.

### Retrieval Practice (`retrieval-practice`)

- `retrieval-practice-definition` [definition, easy] Front: What is Retrieval Practice?
  Back: Actively recalling information without notes to strengthen memory within structured review and exam preparation.
- `retrieval-practice-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for recall from memory, not an unstructured checklist. Which option best fits?
  Back: Retrieval Practice — Forces recall from memory without prompts, strengthening retention and identifying weak recall paths.
- `retrieval-practice-mechanism` [understanding, medium] Front: How does Retrieval Practice handle recall from memory during operation?
  Back: Forces recall from memory first, then checks the answer so weak traces are strengthened through correction.

### Mock Exam (`mock-exam`)

- `mock-exam-definition` [definition, easy] Front: What is Mock Exam?
  Back: Practice test used to simulate exam conditions and identify weak areas within structured review and exam preparation.
- `mock-exam-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for exam timing, not an unstructured checklist. Which option best fits?
  Back: Mock Exam — Simulates exam timing, format, and pressure to measure readiness under realistic test conditions.
- `mock-exam-mechanism` [understanding, medium] Front: How does Mock Exam handle exam timing during operation?
  Back: Simulates test conditions, measures performance under time limits, and reveals weak domains before the real exam.

### Error Log (`error-log`)

- `error-log-definition` [definition, easy] Front: What is Error Log?
  Back: Structured list of mistakes, misconceptions, and corrective notes within structured review and exam preparation.
- `error-log-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for missed questions, not an unstructured checklist. Which option best fits?
  Back: Error Log — Records missed questions, wrong assumptions, and corrections so review targets recurring failure patterns.
- `error-log-mechanism` [understanding, medium] Front: How does Error Log handle missed questions during operation?
  Back: Captures failed questions or mistakes, records why they happened, and turns them into targeted review items.

### Knowledge Gap (`knowledge-gap`)

- `knowledge-gap-definition` [definition, easy] Front: What is Knowledge Gap?
  Back: Specific topic where understanding is currently insufficient within structured review and exam preparation.
- `knowledge-gap-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for a specific concept, not an unstructured checklist. Which option best fits?
  Back: Knowledge Gap — Identifies a specific concept needing further study based on errors, uncertainty, or weak explanation.
- `knowledge-gap-mechanism` [understanding, medium] Front: How does Knowledge Gap handle a specific concept during operation?
  Back: Appears when retrieval or application fails, indicating a topic that needs focused review or practice.

### Study-System Reset (`study-system-reset`)

- `study-system-reset-definition` [definition, easy] Front: What is Study-System Reset?
  Back: Planned refinement of schedule, methods, and tooling after review within structured review and exam preparation.
- `study-system-reset-function` [application, medium] Front: Scenario: A team needs the study workflow concept used for request handling, not an unstructured checklist. Which option best fits?
  Back: Study-System Reset — Adjusts schedule, review methods, and tooling after analyzing progress, workload, and missed objectives.
- `study-system-reset-mechanism` [understanding, medium] Front: How does Study-System Reset handle request handling during operation?
  Back: Rebuilds the plan by clearing stale tasks, reordering priorities, and restoring a workable review cadence.

## Canonical Sources

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

If the content data changes, this document should be regenerated so the counts, week mappings, and flashcard wording stay synchronized.
