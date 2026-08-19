# INCIDENT RESPONSE & DEFENSIVE RECOMMENDATIONS

11.1 Incident Response Process (NIST SP 800-61r3)
The current NIST guidance (SP 800-61 Revision 3, April 2025) describes incident response as a critical part of cybersecurity risk management that should be integrated across organizational operations.

The Six Functions of CSF 2.0 in Incident Response
Function	Role in Incident Response
Govern	Establish IR policies and oversight
Identify	Identify assets, risks, and vulnerabilities
Protect	Implement safeguards to prevent incidents
Detect	Detect incidents promptly
Respond	Contain, eradicate, and recover
Recover	Restore and improve
Incident Response Phases
text
1. DETECTION
   - Identify the incident
   - Validate the incident
   - Assess severity

2. CONTAINMENT
   - Short-term containment (immediate actions)
   - Long-term containment (sustainable actions)
   - System isolation or account disablement

3. ERADICATION
   - Remove the threat
   - Remove malware, close backdoors
   - Patch vulnerabilities

4. RECOVERY
   - Restore systems from clean backups
   - Rebuild compromised systems
   - Validate system integrity

5. LESSONS LEARNED
   - Conduct post-incident review
   - Identify improvements
   - Update processes and controls
11.2 Defensive Recommendations
By Security Domain
Identity
Recommendation	Priority
Implement Multi-Factor Authentication (MFA)	Critical
Enforce strong password policies	High
Review and audit privileged accounts	High
Implement account lockout policies	Medium
Regular password rotation	Medium
Endpoint
Recommendation	Priority
Deploy EDR/XDR on all endpoints	Critical
Implement application whitelisting	High
Keep systems patched	High
Enable Windows Defender or equivalent	High
Regular vulnerability scanning	Medium
Network
Recommendation	Priority
Implement network segmentation	High
Block known malicious IPs/domains	High
Monitor for C2 communication	High
Implement DNS filtering	Medium
Use next-generation firewall	Medium
SIEM
Recommendation	Priority
Tune detection rules to reduce false positives	High
Create correlation rules for attack chains	High
Ensure all critical logs are ingested	High
Review alert volume and adjust thresholds	Medium
Create dashboards for key use cases	Medium
Email
Recommendation	Priority
Implement email filtering	High
DMARC, SPF, DKIM configuration	High
User security awareness training	High
Block malicious attachments	Medium
Sandbox suspicious emails	Medium
Threat Intelligence
Recommendation	Priority
Subscribe to threat intelligence feeds	High
Automate IOC ingestion	High
Correlate intelligence with SIEM	High
Share intelligence with partners	Medium
Use intelligence for proactive hunting	Medium
User Awareness
Recommendation	Priority
Regular security awareness training	High
Phishing simulation exercises	High
Incident reporting procedures	High
Password security education	Medium
Social engineering awareness	Medium
PRACTICAL LAB 17: Defensive Recommendations
Lab Title: "Improve the Defense"
Objective
Develop defensive recommendations based on incident findings.

Scenario
Based on the investigation of the DarkVector attack on ACME University, develop recommendations to prevent similar attacks.

Attack Summary
text
ATTACK SUMMARY:
1. Attacker sent spearphishing email to jsmith
2. jsmith opened malicious attachment
3. Macro executed PowerShell
4. PowerShell downloaded Cobalt Strike
5. Attacker used Cobalt Strike for C2
6. Attacker used PowerShell to enumerate domain
7. Attacker created scheduled task for persistence
8. Attacker used RDP for lateral movement
9. Attacker accessed sensitive files
10. Attacker encrypted files (ransomware)
Step-by-Step Procedure
Step 1: Identify Gaps in Current Defenses

Attack Step	Current Defense	Gap
Phishing	Email filtering	Not effective enough
Attachment	User awareness	User opened attachment
PowerShell	Endpoint logging	Not monitoring PowerShell
C2	Network monitoring	Did not detect C2 traffic
Persistence	Endpoint monitoring	Did not detect scheduled task
Lateral Movement	Network segmentation	RDP allowed between segments
File Access	File auditing	Not monitoring sensitive files
Ransomware	Endpoint protection	Did not prevent encryption
Step 2: Develop Recommendations

Domain	Recommendation	Priority	Addresses
Email	Implement advanced email filtering	High	Phishing
User	Regular security awareness training	High	Phishing
Endpoint	Enable PowerShell logging	High	PowerShell abuse
Network	Block known C2 IPs/domains	High	C2 traffic
Identity	Implement MFA for all users	Critical	Credential theft
Network	Segment network (finance isolated)	High	Lateral movement
Endpoint	Deploy EDR with ransomware protection	High	Ransomware
Endpoint	Monitor scheduled task creation	Medium	Persistence
File	Audit sensitive file access	Medium	Data theft
Step 3: Prioritize Recommendations

Priority	Recommendations
Critical	MFA implementation
High	Email filtering, EDR deployment, Network segmentation, PowerShell logging
Medium	File auditing, Scheduled task monitoring
Expected Output
Defensive Recommendations Report:

text
DEFENSIVE RECOMMENDATIONS
=======================
Incident: DarkVector Attack on ACME University

CRITICAL PRIORITY:
1. Implement Multi-Factor Authentication (MFA) for all users
   - Prevents credential theft even if passwords are compromised
   - Timeline: Immediate

HIGH PRIORITY:
2. Implement advanced email filtering
   - Reduce phishing emails reaching users
   - Timeline: 1 month

3. Deploy EDR with ransomware protection
   - Detect and prevent malicious activity
   - Timeline: 3 months

4. Segment network to isolate finance department
   - Prevent lateral movement
   - Timeline: 3 months

5. Enable PowerShell logging and monitoring
   - Detect PowerShell abuse
   - Timeline: 1 month

6. Block known C2 IPs and domains
   - Prevent C2 communication
   - Timeline: Immediate

MEDIUM PRIORITY:
7. Monitor scheduled task creation
   - Detect persistence mechanisms
   - Timeline: 2 months

8. Audit sensitive file access
   - Detect data theft
   - Timeline: 2 months

9. Regular security awareness training
   - Reduce phishing success rate
   - Timeline: Ongoing

ONGOING:
10. Regular vulnerability scanning and patching
11. Review and update detection rules
12. Conduct tabletop exercises
Key Concepts
Recommendations should address specific gaps

Prioritize recommendations by impact and effort

Use a layered defense approach

Recommendations should be actionable

Common Mistakes
Overwhelming recommendations – Focus on high-priority items

Not addressing root causes – Don't just treat symptoms

Unrealistic timelines – Be practical about implementation

