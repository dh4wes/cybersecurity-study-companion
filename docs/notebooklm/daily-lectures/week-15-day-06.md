---
id: "week-15-day-06"
week: 15
day: 6
slug: "week-15-day-06"
phase: "Security"
session_type: "Review"
title: "Weekly synthesis: Intrusion Detection, Intrusion Prevention, SIEM"
objective: "Lock in the week's material, surface weak spots, and tidy your notes."
primary_exam: "Google Cybersecurity Professional Certificate"
secondary_exam: "CompTIA Security+ (SY0-701)"
resource_names: ["Google Course 3: Networks and Network Security","Wireshark"]
glossary_terms: ["Intrusion Detection","Intrusion Prevention","SIEM","Log Source","Network Baseline","Hardening","Firewall","Network Segmentation"]
glossary_ids: ["intrusion-detection","intrusion-prevention","siem","log-source","network-baseline","hardening","firewall","network-segmentation"]
flashcard_ids: ["intrusion-detection-definition","intrusion-detection-mechanism","intrusion-detection-scenario","intrusion-prevention-definition","intrusion-prevention-mechanism","intrusion-prevention-scenario","siem-definition","siem-mechanism","siem-scenario","log-source-definition","log-source-mechanism","log-source-scenario","network-baseline-definition","network-baseline-mechanism","network-baseline-scenario","hardening-definition","hardening-mechanism","hardening-scenario","firewall-definition","firewall-mechanism","firewall-scenario","network-segmentation-definition","network-segmentation-mechanism","network-segmentation-scenario"]
estimated_read_minutes: 5
---

# Weekly synthesis: Intrusion Detection, Intrusion Prevention, SIEM

## 1. Today’s concept in plain language
Today is about turning this week's terms and tasks into one working mental picture so you can retrieve them under pressure instead of remembering isolated facts.

## 2. Mini lecture
This is a synthesis day, which means the goal is retrieval, connection, and cleanup rather than adding a fresh topic. The week's focus was Google Course 3: Networks and Network Security, and the real question now is whether the concepts from earlier study days fit together as one working model. You should be able to move from term names such as Intrusion Detection, Intrusion Prevention, SIEM, Log Source, Network Baseline, and Hardening to the underlying system behavior without rereading every resource from scratch.

Start by reconstructing the week from memory. Explain the week's deliverable, the checkpoint, and the sequence of ideas that led there. Then test whether you can connect mechanism to purpose: Intrusion Detection: monitors network or host activity, compares it to signatures or baselines, and raises alerts on suspicious matches Intrusion Prevention: inspects traffic inline and drops or resets sessions when packets match blocked signatures or policy conditions SIEM: ingests many log streams, normalizes fields, and applies searches or rules so correlated alerts and investigations are possible Log Source: generates timestamped records from systems, applications, or devices that downstream tools parse and correlate If one term only makes sense in isolation, that is the weak spot to revisit. Review days are for rebuilding those bridges before they become exam traps.

For Google Cybersecurity Professional Certificate, weak understanding usually shows up in one of four ways: mixing up two similar concepts, picking the wrong layer, skipping the evidence trail, or remembering the name of a control without knowing why it fits. Use today's review to correct those failure modes explicitly. Say out loud what symptom belongs to which component or service, what data should move where, and what you would check first if the expected outcome did not happen.

This is also the right time to prune notes. Keep the explanations that help you reason, keep one or two clean examples, and discard repetition. The point of a good review deck is not maximum volume; it is fast retrieval under realistic pressure. When the terms, mechanisms, and examples line up, the week becomes easier to carry into the next block of study.

A strong review also checks whether the week's ideas connect vertically across layers. For example, a hardware topic should still map to a user-visible symptom, a networking topic should still map to packet movement and service behavior, and a security topic should still map to control choice, evidence, and response. If you can move up and down that stack without getting lost, you are much less likely to freeze when a question compresses several layers into a short scenario.

Before you leave the week, make one final pass at the checkpoint in your own words. Do not repeat the checkpoint sentence exactly as written. Rewrite it as an explanation you could give to a teammate or instructor, then compare that explanation against the week's terms, resource examples, and deliverable. Any missing link you notice there is the right target for your next short review burst.

Keep the review practical: retrieve the week from memory, link each term to evidence or behavior, and check whether you can still explain the checkpoint cleanly without opening the notes first.

## 3. How this shows up on the exam
Expect this material to show up as scenario-style reasoning rather than raw recall. Typical tasks include distinguishing related concepts, choosing the right component or control, identifying the most likely cause from symptoms, and explaining why one workflow step belongs before another. If you can reconstruct the week without the notes open, you are closer to the level these exams reward.

## 4. Key distinctions and common confusions
- Intrusion Detection vs Intrusion Prevention — Intrusion Detection: Monitoring approach that identifies suspicious or malicious activity. Intrusion Prevention: Inline security control that blocks malicious activity in real time.
- Intrusion Prevention vs Intrusion Detection — Intrusion Prevention: Inline security control that blocks malicious activity in real time. Intrusion Detection: Monitoring approach that identifies suspicious or malicious activity.
- SIEM vs Log Correlation — SIEM: Security Information and Event Management platform for log analysis and alerting. Log Correlation: Linking events from multiple sources to reveal meaningful patterns.
- Log Source vs SIEM — Log Source: System or service that generates telemetry ingested for analysis. SIEM: Security Information and Event Management platform for log analysis and alerting.
- Network Baseline vs Alert Triage — Network Baseline: Documented normal traffic behavior used to identify anomalies. Alert Triage: Initial analysis process that validates and prioritizes alerts.

## 5. Concrete mental model
Use a pipeline model for this day: input arrives, a component or service processes it, state changes occur, and an output or symptom becomes visible to the user, administrator, or analyst. Intrusion Detection: monitors network or host activity, compares it to signatures or baselines, and raises alerts on suspicious matches Intrusion Prevention: inspects traffic inline and drops or resets sessions when packets match blocked signatures or policy conditions SIEM: ingests many log streams, normalizes fields, and applies searches or rules so correlated alerts and investigations are possible Log Source: generates timestamped records from systems, applications, or devices that downstream tools parse and correlate If you can narrate that path from start to finish without skipping the middle, the topic is becoming operational instead of abstract.

## 6. If you can explain this, you understand it
- Explain the difference between Intrusion Detection and Intrusion Prevention without using the words "better" or "faster" as your whole answer.
- Describe what Intrusion Detection does, what input it works on, and what evidence would show that it is functioning correctly.
- Walk through today's objective in sequence and say which step would fail first if the system were misconfigured.
- Connect today's glossary terms to this week's deliverable: what part of the artifact proves that you understand the mechanism and not just the label?
- Rebuild the week from memory in under three minutes and note which transition between concepts is still weak.

## 7. Quick recap
This review day turns Intrusion Detection, Intrusion Prevention, and SIEM into one coherent model so you can retrieve the week's logic, spot confusions quickly, and carry the right mental structure forward.

## 8. Resource anchors
- Google Course 3: Networks and Network Security (course) - https://www.coursera.org/learn/networks-and-network-security?specialization=google-cybersecurity
- Wireshark (tool) - https://www.wireshark.org/download.html
