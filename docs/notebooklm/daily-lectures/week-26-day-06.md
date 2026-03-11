---
id: "week-26-day-06"
week: 26
day: 6
slug: "week-26-day-06"
phase: "Security"
session_type: "Review"
title: "Weekly synthesis: Identity, Authentication, Authorization"
objective: "Lock in the week's material, surface weak spots, and tidy your notes."
primary_exam: "CompTIA Security+ (SY0-701)"
secondary_exam: null
resource_names: ["Professor Messer Security+ (SY0-701)","Google Cybersecurity Certificate","Multifactor Authentication","Certificates","Hashing and Digital Signatures","Security Awareness"]
glossary_terms: ["Identity","Authentication","Authorization","Accounting (AAA)","Multi-Factor Authentication","Least Privilege","Hashing","Encryption","Social Engineering","Certificate"]
glossary_ids: ["identity","authentication","authorization","accounting","mfa","least-privilege","hashing","encryption","social-engineering","certificate"]
flashcard_ids: ["identity-definition","identity-mechanism","identity-scenario","authentication-definition","authentication-mechanism","authentication-scenario","authorization-definition","authorization-mechanism","authorization-scenario","accounting-definition","accounting-mechanism","accounting-scenario","mfa-definition","mfa-mechanism","mfa-scenario","least-privilege-definition","least-privilege-mechanism","least-privilege-scenario","hashing-definition","hashing-mechanism","hashing-scenario","encryption-definition","encryption-mechanism","encryption-scenario","social-engineering-definition","social-engineering-mechanism","social-engineering-scenario","certificate-definition","certificate-mechanism","certificate-scenario"]
estimated_read_minutes: 3
---

# Weekly synthesis: Identity, Authentication, Authorization

## 1. Today’s concept in plain language
Today reviews the week's main concepts as one connected model.

## 2. Mini lecture
This is the review day for Security+ reinforcement: IAM, crypto, and social engineering. The goal is to connect the week's main ideas into one working model rather than introduce a new topic. The core terms are Identity, Authentication, Authorization, Accounting (AAA), Multi-Factor Authentication, and Least Privilege.

Across the week, the key mechanisms were: Identity: links usernames, attributes, and credentials in a record that other controls query when making authentication and authorization decisions Authentication: checks submitted credentials against a stored factor, then establishes identity context only when the proof matches expected values Authorization: compares the authenticated identity against policy rules, group membership, or ACL entries before permitting each requested action Accounting (AAA): captures login attempts, privilege changes, and session activity in logs so actions can be tied back to specific identities The value of the review is in seeing how these pieces connect across setup, operation, failure, and troubleshooting.

For CompTIA Security+ (SY0-701), this block is most useful when you can separate similar concepts, place them at the right layer, and connect them to symptoms or evidence. That usually means following a chain from cause to behavior to visible result.

At this point, the week should read as one sequence rather than separate definitions. Each concept should connect to a role, a mechanism, and a likely scenario where it matters.

One useful review lens is to track how the week's concepts relate to symptoms, evidence, and next-step decisions in a short scenario.

The main point of the review is to keep the concepts connected rather than treat them as isolated terms.

## 3. How this shows up on the exam
Expect this material to show up as scenario-style reasoning rather than raw recall. Typical tasks include distinguishing related concepts, choosing the right component or control, identifying the most likely cause from symptoms, and explaining why one workflow step belongs before another. If you can reconstruct the week without the notes open, you are closer to the level these exams reward.

## 4. Quick recap
This review day consolidates Identity, Authentication, and Authorization into one connected model.
