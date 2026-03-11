---
id: "week-18-day-06"
week: 18
day: 6
slug: "week-18-day-06"
phase: "Security"
session_type: "Review"
title: "Weekly synthesis: Asset Inventory, Data Classification, Threat Model"
objective: "Lock in the week's material, surface weak spots, and tidy your notes."
primary_exam: "Google Cybersecurity Professional Certificate"
secondary_exam: "CompTIA Security+ (SY0-701)"
resource_names: ["Google Course 5: Assets, Threats, and Vulnerabilities","Professor Messer Security+"]
glossary_terms: ["Asset Inventory","Data Classification","Threat Model","Attack Vector","Vulnerability Scan","CVSS","Exposure"]
glossary_ids: ["asset-inventory","data-classification","threat-model","attack-vector","vulnerability-scan","cvss","exposure"]
flashcard_ids: ["asset-inventory-definition","asset-inventory-mechanism","asset-inventory-scenario","data-classification-definition","data-classification-mechanism","data-classification-scenario","threat-model-definition","threat-model-mechanism","threat-model-scenario","attack-vector-definition","attack-vector-mechanism","attack-vector-scenario","vulnerability-scan-definition","vulnerability-scan-mechanism","vulnerability-scan-scenario","cvss-definition","cvss-mechanism","cvss-scenario","exposure-definition","exposure-mechanism","exposure-scenario"]
estimated_read_minutes: 5
---

# Weekly synthesis: Asset Inventory, Data Classification, Threat Model

## 1. Today’s concept in plain language
Today is about turning this week's terms and tasks into one working mental picture so you can retrieve them under pressure instead of remembering isolated facts.

## 2. Mini lecture
This is a synthesis day, which means the goal is retrieval, connection, and cleanup rather than adding a fresh topic. The week's focus was Google Course 5: Assets, threats, and vulnerabilities (part 1), and the real question now is whether the concepts from earlier study days fit together as one working model. You should be able to move from term names such as Asset Inventory, Data Classification, Threat Model, Attack Vector, Vulnerability Scan, and CVSS to the underlying system behavior without rereading every resource from scratch.

Start by reconstructing the week from memory. Explain the week's deliverable, the checkpoint, and the sequence of ideas that led there. Then test whether you can connect mechanism to purpose: Asset Inventory: collects host attributes, ownership, software, and data scope into records that other controls use for targeting and scoping Data Classification: assigns labels by sensitivity and handling need so storage, sharing, and retention rules can be enforced Threat Model: enumerates assets, trust boundaries, and attacker actions so defenses can be designed around likely abuse paths Attack Vector: traces the initial path into the target by following entry point, exposed weakness, and reachable asset sequence If one term only makes sense in isolation, that is the weak spot to revisit. Review days are for rebuilding those bridges before they become exam traps.

For Google Cybersecurity Professional Certificate, weak understanding usually shows up in one of four ways: mixing up two similar concepts, picking the wrong layer, skipping the evidence trail, or remembering the name of a control without knowing why it fits. Use today's review to correct those failure modes explicitly. Say out loud what symptom belongs to which component or service, what data should move where, and what you would check first if the expected outcome did not happen.

This is also the right time to prune notes. Keep the explanations that help you reason, keep one or two clean examples, and discard repetition. The point of a good review deck is not maximum volume; it is fast retrieval under realistic pressure. When the terms, mechanisms, and examples line up, the week becomes easier to carry into the next block of study.

A strong review also checks whether the week's ideas connect vertically across layers. For example, a hardware topic should still map to a user-visible symptom, a networking topic should still map to packet movement and service behavior, and a security topic should still map to control choice, evidence, and response. If you can move up and down that stack without getting lost, you are much less likely to freeze when a question compresses several layers into a short scenario.

Before you leave the week, make one final pass at the checkpoint in your own words. Do not repeat the checkpoint sentence exactly as written. Rewrite it as an explanation you could give to a teammate or instructor, then compare that explanation against the week's terms, resource examples, and deliverable. Any missing link you notice there is the right target for your next short review burst.

## 3. How this shows up on the exam
Expect this material to show up as scenario-style reasoning rather than raw recall. Typical tasks include distinguishing related concepts, choosing the right component or control, identifying the most likely cause from symptoms, and explaining why one workflow step belongs before another. If you can reconstruct the week without the notes open, you are closer to the level these exams reward.

## 4. Key distinctions and common confusions
- Asset Inventory vs Asset — Asset Inventory: Structured list of hardware, software, and data assets in scope. Asset: Any device, account, application, dataset, or service that has value to an organization.
- Data Classification vs Compliance — Data Classification: Labeling data by sensitivity and handling requirements within web, data, and cloud services. Compliance: Conformance to laws, regulations, standards, or internal policies.
- Threat Model vs Attack Surface — Threat Model: Structured analysis of potential attackers, paths, and control gaps. Attack Surface: Total collection of entry points, exposed services, identities, and paths an attacker could try to abuse.
- Attack Vector vs Attack Surface — Attack Vector: Path or method used by an attacker to reach a target. Attack Surface: Total collection of entry points, exposed services, identities, and paths an attacker could try to abuse.
- Vulnerability Scan vs Enumeration — Vulnerability Scan: Automated assessment for known weaknesses in systems and software. Enumeration: Active discovery of services, accounts, or resources on a target.

## 5. Concrete mental model
Use a pipeline model for this day: input arrives, a component or service processes it, state changes occur, and an output or symptom becomes visible to the user, administrator, or analyst. Asset Inventory: collects host attributes, ownership, software, and data scope into records that other controls use for targeting and scoping Data Classification: assigns labels by sensitivity and handling need so storage, sharing, and retention rules can be enforced Threat Model: enumerates assets, trust boundaries, and attacker actions so defenses can be designed around likely abuse paths Attack Vector: traces the initial path into the target by following entry point, exposed weakness, and reachable asset sequence If you can narrate that path from start to finish without skipping the middle, the topic is becoming operational instead of abstract.

## 6. If you can explain this, you understand it
- Explain the difference between Asset Inventory and Data Classification without using the words "better" or "faster" as your whole answer.
- Describe what Asset Inventory does, what input it works on, and what evidence would show that it is functioning correctly.
- Walk through today's objective in sequence and say which step would fail first if the system were misconfigured.
- Connect today's glossary terms to this week's deliverable: what part of the artifact proves that you understand the mechanism and not just the label?
- Rebuild the week from memory in under three minutes and note which transition between concepts is still weak.

## 7. Quick recap
This review day turns Asset Inventory, Data Classification, and Threat Model into one coherent model so you can retrieve the week's logic, spot confusions quickly, and carry the right mental structure forward.

## 8. Resource anchors
- Google Course 5: Assets, Threats, and Vulnerabilities (course) - https://www.coursera.org/learn/assets-threats-and-vulnerabilities?specialization=google-cybersecurity
- Professor Messer Security+ (course) - https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/
