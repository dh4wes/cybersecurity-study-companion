---
id: "week-27-day-02"
week: 27
day: 2
slug: "week-27-day-02"
phase: "Security"
session_type: "Study"
title: "Privilege Escalation and Defense in Depth in context"
objective: "Deepen concepts and connect them to the bigger system."
primary_exam: "CompTIA Security+ (SY0-701)"
secondary_exam: null
resource_names: ["TryHackMe Cyber Security 101","Security Journal sheet in this workbook"]
glossary_terms: ["Privilege Escalation","Defense in Depth"]
glossary_ids: ["privilege-escalation","defense-in-depth"]
flashcard_ids: ["privilege-escalation-definition","privilege-escalation-mechanism","privilege-escalation-scenario","defense-in-depth-definition","defense-in-depth-mechanism","defense-in-depth-scenario"]
estimated_read_minutes: 3
---

# Privilege Escalation and Defense in Depth in context

## 1. Today’s concept in plain language
Today covers Privilege Escalation and Defense in Depth within tryhackme cyber security 101 + breach journal capstone.

## 2. Mini lecture
The week focus is TryHackMe Cyber Security 101 + breach journal capstone, and today's objective is deepen concepts and connect them to the bigger system. The main terms in scope are Privilege Escalation and Defense in Depth. The focus is on what each one does, how it operates, and how it affects the rest of the system.

Privilege Escalation is technique for gaining higher permissions than initially granted. It exploits misconfigurations or software flaws to obtain permissions beyond the initial security context. Mechanically, it abuses misconfigurations, weak permissions, or software flaws to gain rights beyond the attacker's starting level. Defense in Depth is layered control strategy so one failed safeguard does not cause total failure. It applies multiple safeguards across layers so a single control failure does not expose the entire environment. Mechanically, it layers preventive, detective, and corrective controls so one failure does not expose the full asset. Together, these terms describe where work happens, how state changes, and what the visible outcome looks like when the system is operating normally.

Use the path to refresh Windows, Linux, Active Directory, and command-line fundamentals. This day is meant to show the topic in action rather than leave it at the definition level.

Resources such as TryHackMe Cyber Security 101 and Security Journal sheet in this workbook provide concrete examples for this topic. For CompTIA Security+ (SY0-701), this matters because many questions turn on behavior in context rather than a standalone label.

In a scenario, Privilege Escalation and Defense in Depth usually matters through symptoms, sequence, or visible system behavior rather than through a direct definition prompt.

Another useful angle is to note where the concept sits in the larger system, what it depends on, and what would change if it failed or were configured incorrectly.

The practical value of the topic is usually clearest when you follow one path from input to processing to output and identify the point where the concept changes the result.

## 3. How this shows up on the exam
This material is most likely to appear as a short scenario where you must identify how Privilege Escalation and Defense in Depth affect the outcome. That can mean choosing the best answer for a symptom, distinguishing two similar terms, following a process step in the right order, or recognizing why one configuration works while another fails. The exam signal is applied reasoning: knowing what the concept does in context and what evidence points to it.

## 4. Quick recap
Today covered Privilege Escalation and Defense in Depth in terms of role, mechanism, and system effect.
