---
id: "week-20-day-02"
week: 20
day: 2
slug: "week-20-day-02"
phase: "Security"
session_type: "Study"
title: "Indicator of Compromise and Incident Severity in context"
objective: "Deepen concepts and connect them to the bigger system."
primary_exam: "Google Cybersecurity Professional Certificate"
secondary_exam: "CompTIA Security+ (SY0-701)"
resource_names: ["Google Course 6: Detection and Response","CISA Incident Response Training"]
glossary_terms: ["Indicator of Compromise","Incident Severity"]
glossary_ids: ["ioc","incident-severity"]
flashcard_ids: ["ioc-definition","ioc-mechanism","ioc-scenario","incident-severity-definition","incident-severity-mechanism","incident-severity-scenario"]
estimated_read_minutes: 6
---

# Indicator of Compromise and Incident Severity in context

## 1. Today’s concept in plain language
Today you are learning how Indicator of Compromise, Incident Severity fit into google course 6: detection and response (part 1), so the topic feels like a system instead of a vocabulary list.

## 2. Mini lecture
The week focus is Google Course 6: Detection and response (part 1), and today's objective is deepen concepts and connect them to the bigger system. That matters because entry-level certification questions rarely ask for a floating definition by itself; they usually ask whether you can place a concept inside a working system, support action, or troubleshooting sequence. The terms in scope today are Indicator of Compromise and Incident Severity, and the point is to understand what each one does, what problem it solves, and how it interacts with the rest of the platform. If you can explain those relationships cleanly, the week's deliverable becomes more than homework: it becomes evidence that you understand the system well enough to describe it under exam pressure or in an operations conversation.

Indicator of Compromise means observable evidence suggesting malicious activity occurred. Its practical job is that it captures observable artifacts such as hashes, domains, IPs, or processes associated with malicious activity. Mechanically, it uses observable artifacts such as hashes, domains, or registry changes to match activity against known malicious patterns. Incident Severity means impact-based classification used to prioritize incident response. Its practical job is that it scores incidents using impact and urgency criteria to drive escalation, staffing, and response timelines. Mechanically, it combines impact, scope, and urgency into a rating that drives escalation, communication, and response effort. Notice the pattern: the exam target here is not memorizing isolated labels, but recognizing which part of the system is responsible for speed, persistence, coordination, communication, or control. When two concepts seem similar, ask three questions: where does the data live, who acts on it, and what changes if this part fails. That framing turns vocabulary into diagnosis.

Use the task list as a pressure test for understanding. Work through logs, alerts, IDS / NIDS ideas, packets, and why visibility matters so much. If you cannot explain why the task proves the concept, the task is still just activity. The goal is to make each action reveal a mechanism, a dependency, or a decision point.

Resources such as Google Course 6: Detection and Response and CISA Incident Response Training are useful here because they show the same idea from slightly different angles. Use them to check whether your mental model survives contact with examples: can you still identify the component, service, or control once the explanation becomes more concrete? That is the habit that transfers well into Google Cybersecurity Professional Certificate style questions.

By the end of the week, the artifact should act like a compressed proof of understanding. One-page IR playbook. It should show that you can pick the right distinctions, explain the mechanism cleanly, and stay oriented toward the checkpoint rather than toward random detail collection. Can outline the incident lifecycle and the evidence sources used along the way.

A good pressure test is to imagine a short scenario built around Indicator of Compromise and Incident Severity. What symptom would appear first, what layer would you inspect next, and what answer choice would be tempting but wrong? Thinking that way trains the distinction between recognition and diagnosis.

Weekly pacing matters here. Day 2 should either deepen, apply, or consolidate the idea introduced earlier in the block. If you can say how today's work changes the week-level understanding, you are studying the roadmap the way it was designed to be used.

As a final pass, explain the day's system in your own words from input to outcome, then compare that explanation against the terms, tasks, and resource examples. The gap between those two versions is usually the exact concept that still needs work.

If you still feel shaky, pick one term from today and explain how it changes the system's behavior when it is configured correctly versus when it fails. That contrast usually reveals whether the concept is actually clear.

Before moving on, connect today's objective back to the week's checkpoint in one short explanation. If that bridge feels awkward, that is a useful sign that one mechanism or distinction still needs another pass.

As a final pass, explain the day's system in your own words from input to outcome, then compare that explanation against the terms, tasks, and resource examples. The gap between those two versions is usually the exact concept that still needs work.

## 3. How this shows up on the exam
This material is most likely to appear as a short scenario where you must identify how Indicator of Compromise and Incident Severity affect the outcome. That can mean choosing the best answer for a symptom, distinguishing two similar terms, following a process step in the right order, or recognizing why one configuration works while another fails. The exam signal is applied reasoning: knowing what the concept does in context and what evidence points to it.

## 4. Quick recap
Today was about understanding Indicator of Compromise and Incident Severity as part of a working system, then linking that understanding to exam reasoning and the week's artifact.
