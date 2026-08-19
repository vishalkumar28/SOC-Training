# INCIDENT TIMELINE RECONSTRUCTION

7.1 Why Timelines Matter
A timeline is a chronological sequence of events that tells the story of an incident. Timelines are essential because they:

Show the sequence of attacker actions

Help identify gaps in detection

Support forensic analysis

Enable legal and regulatory reporting

Hinglish: Timeline se pata chalta hai ki attack kaise hua—pehle kya hua, phir kya, aur kis sequence mein. Yeh investigation ka roadmap hai.

7.2 Timeline Reconstruction Process
Evidence Ordering
text
1. Collect all relevant events
2. Normalize timestamps (convert to UTC)
3. Sort by timestamp
4. Group by phase of attack
5. Identify gaps
6. Create timeline table
7. Interpret the sequence
Timeline Table Structure
Timestamp	Host	User	Event	Source	IOC	Interpretation	Confidence
09:23:00	WS-FINANCE-01	jsmith	4625 (Failed login)	203.0.113.45	203.0.113.45	Brute force attempt	High
09:28:15	WS-FINANCE-01	jsmith	4624 (Successful login)	203.0.113.45	203.0.113.45	Attacker gained access	High
09:29:00	WS-FINANCE-01	jsmith	4688 (PowerShell)	Local	-	Attacker executing commands	High
09:29:15	WS-FINANCE-01	jsmith	4688 (payload.exe)	Local	payload.exe	Malware executed	High
09:29:30	WS-FINANCE-01	SYSTEM	5156 (Network connect)	203.0.113.100	203.0.113.100	C2 communication	High
Attack Phases
Phase	Description	Evidence
Reconnaissance	Attacker gathers information	Scans, DNS queries
Initial Access	Attacker gains entry	Failed → successful login
Execution	Attacker runs code	PowerShell, suspicious processes
Persistence	Attacker maintains access	Scheduled tasks, registry changes
Discovery	Attacker explores environment	Network scans, file access
Lateral Movement	Attacker moves to other systems	RDP to other hosts
Collection	Attacker gathers data	File access, data transfers
Exfiltration	Attacker steals data	Large outbound transfers
PRACTICAL LAB 7: Timeline Reconstruction
Lab Title: "Build the Timeline"
Objective
Reconstruct an incident timeline from multiple log sources.

Scenario
ACME University has experienced a security incident. You have collected the following events from various sources. Your task is to reconstruct the timeline.

Dataset
text
[2024-11-15 09:22:50] Firewall: Connection from 203.0.113.45 to WS-FINANCE-01 port 3389 (RDP)
[2024-11-15 09:23:01] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:05] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:10] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:15] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:23:20] Security: 4625 | jsmith | 203.0.113.45 | 10 | Bad password
[2024-11-15 09:28:15] Security: 4624 | jsmith | 203.0.113.45 | 10 | N/A
[2024-11-15 09:29:00] Security: 4688 | jsmith | powershell.exe | N/A | N/A
[2024-11-15 09:29:15] Security: 4688 | jsmith | C:\Temp\payload.exe | N/A | N/A
[2024-11-15 09:29:30] Firewall: Connection from WS-FINANCE-01 to 203.0.113.100 port 4444
[2024-11-15 09:30:00] Security: 4698 | jsmith | Scheduled task created | N/A | N/A
[2024-11-15 09:35:00] Security: 4624 | jsmith | 192.168.1.100 | 3 | N/A
Step-by-Step Procedure
Step 1: Normalize Timestamps

All times are in UTC. No conversion needed.

Step 2: Sort Chronologically

Events in order:

09:22:50 - Firewall: RDP connection from 203.0.113.45

09:23:01 - Security: 4625 (jsmith, 203.0.113.45)

09:23:05 - Security: 4625 (jsmith, 203.0.113.45)

09:23:10 - Security: 4625 (jsmith, 203.0.113.45)

09:23:15 - Security: 4625 (jsmith, 203.0.113.45)

09:23:20 - Security: 4625 (jsmith, 203.0.113.45)

09:28:15 - Security: 4624 (jsmith, 203.0.113.45)

09:29:00 - Security: 4688 (PowerShell)

09:29:15 - Security: 4688 (payload.exe)

09:29:30 - Firewall: C2 connection

09:30:00 - Security: 4698 (Scheduled task)

09:35:00 - Security: 4624 (jsmith, 192.168.1.100)

Step 3: Interpret Each Event

Event	Interpretation
1	Attacker initiates RDP connection
2-6	Brute force attempts
7	Successful login (attacker access)
8	Attacker uses PowerShell
9	Malware executed
10	C2 connection established
11	Persistence created
12	Another login (possibly legitimate user)
Step 4: Identify Attack Phases

Phase	Events	Time
Reconnaissance	1	09:22:50
Initial Access	2-7	09:23:01 - 09:28:15
Execution	8-9	09:29:00 - 09:29:15
C2 Communication	10	09:29:30
Persistence	11	09:30:00
Normal Activity	12	09:35:00
Expected Output
Timeline Table:

Time	Event	Interpretation	Phase
09:22:50	RDP connection from 203.0.113.45	Attacker reconnaissance	Reconnaissance
09:23:01-09:23:20	5 failed logins (jsmith)	Brute force	Initial Access
09:28:15	Successful login (jsmith)	Attacker access	Initial Access
09:29:00	PowerShell executed	Attacker commands	Execution
09:29:15	payload.exe executed	Malware deployed	Execution
09:29:30	Connection to 203.0.113.100	C2 communication	C2
09:30:00	Scheduled task created	Persistence	Persistence
09:35:00	Login from internal IP	Possibly legitimate user	Normal
Key Concepts
Timelines tell the attack story

Normalize timestamps (UTC)

Identify attack phases

Look for gaps in detection

Common Mistakes
Not normalizing time zones – Different systems may use different time zones

Missing events – Check all log sources

Not identifying phases – The sequence matters

