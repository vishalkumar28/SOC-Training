# SOC INCIDENT TRIAGE & RESPONSE

8.1 Incident Classification
Classification Categories
Classification	Definition
False Positive	Alert is triggered by normal activity
Benign	Activity is unusual but not malicious
Suspicious	Activity is unusual and potentially malicious
Confirmed Incident	Malicious activity is confirmed
Critical Incident	Active breach with significant impact
Decision Framework
text
                    ┌─────────────────┐
                    │     ALERT       │
                    └────────┬────────┘
                             ↓
              Is activity expected?
                    /          \
                  YES           NO
                   |             |
              ┌────┘             ↓
              │           Is activity malicious?
              │            /          \
              │          YES           NO
              │           |             |
              │      ┌────┘             ↓
              │      │           ┌─────────────┐
              │      │           │   BENIGN    │
              │      │           └─────────────┘
              │      ↓
              │  ┌─────────────────────────────┐
              │  │   CONFIRMED INCIDENT         │
              │  └─────────────────────────────┘
              ↓
       ┌─────────────┐
       │ FALSE       │
       │ POSITIVE    │
       └─────────────┘
8.2 Severity, Priority, and Impact
Severity Assessment
Factor	Consideration
Asset Criticality	How important is the affected system?
Data Sensitivity	What data is at risk?
User Privilege	What access does the user have?
Scope	How many systems are affected?
Evidence Quality	How strong is the evidence?
Attacker Capability	How sophisticated is the attack?
Impact Assessment
Impact Level	Description	Examples
Low	Minimal impact, easily recoverable	Single workstation compromised
Medium	Moderate impact, some data at risk	Multiple workstations, some data accessed
High	Significant impact, data breach likely	Server compromised, sensitive data exfiltrated
Critical	Severe impact, business operations affected	Ransomware, complete network compromise
Confidence Assessment
Confidence	Description
Low	Limited evidence, possible false positive
Medium	Reasonable evidence, multiple indicators
High	Strong evidence, consistent with known attacks
8.3 Incident Response Process (NIST SP 800-61r3)
The current NIST incident response guidance (SP 800-61 Revision 3, April 2025) describes how to incorporate incident response into cybersecurity risk management. The six Functions of the NIST Cybersecurity Framework (CSF) 2.0 all play vital roles in incident response.

Incident Response Lifecycle
text
┌─────────────────────────────────────────────────────────────┐
│                    PREPARATION                              │
│           (Establish IR capability, train staff)            │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  DETECTION & ANALYSIS                       │
│        (Identify incidents, triage, investigate)            │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTAINMENT                               │
│           (Limit the impact of the incident)                │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   ERADICATION                               │
│              (Remove the threat)                            │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    RECOVERY                                 │
│            (Restore systems to normal)                      │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 LESSONS LEARNED                             │
│            (Improve for future incidents)                   │
└─────────────────────────────────────────────────────────────┘
Containment Strategies
Strategy	Description	When to Use
Isolation	Disconnect affected systems from network	Active malware/ransomware
Account Disable	Disable compromised accounts	Credential theft
IP Blocking	Block malicious IPs at firewall	Attacks from known malicious IPs
Application Restriction	Block specific applications	Malware execution
Eradication Strategies
Strategy	Description
Malware Removal	Remove malicious files
Patch Application	Fix vulnerabilities
Account Reset	Reset compromised passwords
System Reimage	Rebuild compromised systems
Recovery Strategies
Strategy	Description
System Restoration	Restore from clean backups
Monitoring	Enhanced monitoring after recovery
Validation	Verify systems are clean
PRACTICAL LAB 8: Incident Triage and Response
Lab Title: "Make the Call"
Objective
Perform complete incident triage and recommend response actions.

Scenario
You are an L1 SOC analyst at PIET [Panipat Institute of Engineering & Technology]. You have received the following alert. Perform triage and recommend response.

Alert
text
ALERT ID: INC-2024-001
TIMESTAMP: 2024-11-15 09:35:00 UTC
TITLE: Suspicious Process Execution on Finance Server
SEVERITY: High
AFFECTED SYSTEM: WS-FINANCE-01
AFFECTED USER: jsmith
DETAILS:
- Event ID 4688: powershell.exe executed with encoded command
- Event ID 4688: C:\Temp\payload.exe executed
- Event ID 5156: Network connection to 203.0.113.100 port 4444
- Multiple failed logins for jsmith from 203.0.113.45 earlier
- Successful login for jsmith from 203.0.113.45 at 09:28:15
Step-by-Step Procedure
Step 1: Validate the Alert

Q: Is this a real security event?

Expected answer: Yes—multiple indicators (failed logins, successful login from external IP, suspicious process execution, C2 connection)

Step 2: Assess Severity

Factor	Assessment
Asset Criticality	High (Finance server)
Data Sensitivity	High (Financial data)
User Privilege	Finance user with sensitive access
Scope	Single system so far
Evidence Quality	High (multiple correlated events)
Severity: Critical

Step 3: Determine Classification

Classification	Decision
False Positive	No
Benign	No
Suspicious	No
Confirmed Incident	Yes
Critical Incident	Yes
Step 4: Recommend Containment

Isolate WS-FINANCE-01 – Disconnect from network

Disable jsmith account – Prevent further access

Block IP 203.0.113.45 – At firewall

Block IP 203.0.113.100 – At firewall

Step 5: Recommend Eradication

Analyze payload.exe – Determine malware type

Remove malicious files – payload.exe, any other suspicious files

Reset jsmith password – Force password change

Check for persistence – Scheduled tasks, registry entries

Step 6: Recommend Recovery

Restore from backup – If data was affected

Enhanced monitoring – Monitor jsmith account and WS-FINANCE-01

Patch vulnerabilities – Address any vulnerabilities exploited

Step 7: Escalate

Escalation To	Reason
L2 Analyst	Deep investigation of malware and scope
Incident Response Team	Active compromise requiring response
Management	Critical incident notification
Expected Output
Incident Triage Report:

text
INCIDENT TRIAGE REPORT
=====================
Incident ID: INC-2024-001
Reported: 2024-11-15 09:35:00 UTC
Analyst: [Your Name]

ALERT SUMMARY:
Suspicious process execution on WS-FINANCE-01 involving PowerShell,
payload.exe, and C2 communication.

INVESTIGATION SUMMARY:
- Multiple failed logins for jsmith from external IP (203.0.113.45)
- Successful login from same external IP
- PowerShell execution with encoded command
- payload.exe executed from Temp folder
- Network connection to C2 IP (203.0.113.100:4444)

CLASSIFICATION: Critical Incident

SEVERITY: Critical
CONFIDENCE: High
SCOPE: WS-FINANCE-01 (possibly more)

CONTAINMENT RECOMMENDATIONS:
1. Isolate WS-FINANCE-01 from the network
2. Disable jsmith account
3. Block IPs 203.0.113.45 and 203.0.113.100

ERADICATION RECOMMENDATIONS:
1. Remove payload.exe and related files
2. Reset jsmith password
3. Check for persistence mechanisms

RECOVERY RECOMMENDATIONS:
1. Restore from clean backup if needed
2. Implement enhanced monitoring
3. Patch vulnerabilities

ESCALATION:
- L2 Analyst
- Incident Response Team
- Management (notification)

ANALYST CONCLUSION:
This is a confirmed critical incident. The evidence shows a successful
brute-force attack followed by malware execution and C2 communication.
Immediate containment is required.
Key Concepts
Incident classification guides response

Severity is based on multiple factors

Containment comes before eradication

Documentation is critical throughout

Common Mistakes
Delaying containment – Act quickly to limit damage

Not documenting decisions – Record your reasoning

Insufficient escalation – Don't hesitate to escalate when needed

