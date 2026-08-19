# AUTHENTICATION & BRUTE-FORCE DETECTION

3.1 What is Authentication?
Layer 1: Beginner Explanation
Authentication is the process of verifying who a user is. When you enter a username and password to log into a computer, you are authenticating.

Hinglish: Authentication ka matlab hai user ki identity verify karna—jaise username/password daal ke login karna.

Layer 2: Technical Explanation
Authentication is the process of validating user credentials (username/password, certificate, biometric) against an identity system (like Active Directory). Successful authentication results in a logon session and generates a 4624 event.

Layer 3: SOC Analyst Perspective
"Authentication events are the bread and butter of SOC analysis. Every login creates an event—successful or failed. By analyzing these events, we can detect attacks like brute force, password spraying, and credential theft."

3.2 Types of Credential Attacks
Brute Force
Aspect	Description
What	Trying many passwords against a single account
Goal	Guess the correct password
Signature	Many failures for the same account
Detection	High volume of 4625 events for same account
Example:

text
Account: jsmith
Attempts: password123, Password1, jsmith2024, letmein, ...
100+ failures
Password Spraying
Aspect	Description
What	Trying one common password against many accounts
Goal	Find accounts with weak passwords
Signature	One failure per account, many accounts
Detection	4625 events for many accounts from same IP
Example:

text
Password: Winter2024!
Accounts: jsmith, bjones, mwilliams, ...
1 failure per account, many accounts
Credential Stuffing
Aspect	Description
What	Using credentials stolen from another breach
Goal	Access accounts using reused passwords
Signature	Failures for many accounts, then success on some
Detection	Login attempts from unusual locations
Example:

text
Credentials from Breach: jsmith/P@ssw0rd123, bjones/Summer2023, ...
Testing against corporate accounts
Key Differences
Attack Type	Many Passwords	Many Accounts	Single Account
Brute Force	✓ (per account)	✗	✓
Password Spraying	✗ (same password)	✓	✗
Credential Stuffing	✓ (from breach)	✓	✗
3.3 Detection Logic
Brute Force Detection
text
Many failed attempts
        ↓
Same account?
        ↓ (YES)
Same source IP?
        ↓ (YES)
Threshold exceeded? (e.g., 10+ failures in 5 minutes)
        ↓ (YES)
→ BRUTE FORCE DETECTED
Password Spraying Detection
text
Many failed attempts
        ↓
Different accounts?
        ↓ (YES)
Same source IP?
        ↓ (YES)
Same failure reason?
        ↓ (YES)
→ PASSWORD SPRAYING DETECTED
Compromised Credential Detection
text
Failed attempts
        ↓
Followed by successful login
        ↓
From a different source IP?
        ↓ (YES)
During unusual hours?
        ↓ (YES)
→ COMPROMISED CREDENTIALS SUSPECTED
3.4 Threshold Concepts
Detection thresholds depend on:

Factor	Consideration
Organization size	Larger organizations have more logins
Time of day	More logins during business hours
User role	Some users log in more frequently
Normal baseline	What is "normal" for this user?
Example Thresholds:

Scenario	Threshold
Brute force	10+ failures in 5 minutes
Password spraying	Failures for 10+ accounts from same IP in 1 hour
Unusual login	Login from IP not seen in 30 days
PRACTICAL LAB 3: Brute-Force Detection
Lab Title: "Catch the Brute Forcer"
Objective
Identify a brute-force attack by analyzing authentication logs and determine whether the attack was successful.

Scenario
ACME University's SIEM has generated an alert for "Multiple Failed Logins." You need to investigate the logs to determine if a brute-force attack occurred and whether any accounts were compromised.

Difficulty
Beginner

Estimated Time
25 minutes

Dataset
text
[2024-11-15 09:23:01] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:05] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:10] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:15] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:20] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:25] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:30] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:35] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:40] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:45] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:50] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:23:55] 4625 | jsmith | 203.0.113.45 | 2 | Unknown user name or bad password
[2024-11-15 09:28:15] 4624 | jsmith | 192.168.1.100 | 10 | N/A
[2024-11-15 09:30:00] 4688 | jsmith | C:\Windows\System32\powershell.exe | N/A | N/A
[2024-11-15 09:30:15] 4688 | jsmith | C:\Users\jsmith\Downloads\payload.exe | N/A | N/A
Step-by-Step Procedure
Step 1: Count the Failures

Q: How many failed logins occurred for jsmith?

Expected answer: 12 failures from 09:23:01 to 09:23:55

Step 2: Identify the Source IP

Q: What is the source IP of the failures?

Expected answer: 203.0.113.45

Step 3: Identify the Attack Type

Q: Is this brute force or password spraying?

Expected answer: Brute force—all attempts target the same account (jsmith)

Step 4: Check for Successful Login

Q: Was there a successful login after the failures?

Expected answer: Yes—at 09:28:15, jsmith logged in successfully from 192.168.1.100

Step 5: Analyze the Successful Login

Q: What is suspicious about the successful login?

Expected answer:

Logon Type 10 = Remote Desktop (RDP)

Source IP is internal (192.168.1.100), not the attacker IP

This could be the legitimate user logging in, or an attacker who compromised an internal system

Step 6: Check for Post-Login Activity

Q: What happened after the successful login?

Expected answer:

PowerShell was launched (4688)

A suspicious executable (payload.exe) was run from Downloads

Step 7: Make Your Assessment

Factor	Assessment
Attack type	Brute force
Success	Likely—successful login occurred
Post-compromise activity	Suspicious processes executed
Severity	High
Expected Output
Investigation Summary:

12 failed login attempts for jsmith from IP 203.0.113.45

Pattern consistent with brute-force attack

Successful login at 09:28:15 from internal IP with RDP

PowerShell and suspicious executable executed after login

Highly likely that account was compromised

Escalation:

Escalate to L2 for immediate response

Disable jsmith account

Investigate payload.exe

How L1 Should Escalate
When escalating this incident, provide:

Alert summary – What triggered the alert

Evidence – Log excerpts showing failures and success

Analysis – Why this is suspicious

Recommendation – What actions should be taken

Severity – High

Key Concepts
Brute force = many failures, same account

Password spraying = few failures, many accounts

Success after failures = likely compromised

Post-login activity = indicator of attacker actions

Common Mistakes
Not checking for successful logins – Failures alone are not enough

Ignoring post-login activity – What happened after the login is critical

Not considering logon type – RDP (Type 10) is more suspicious than interactive (Type 2)

