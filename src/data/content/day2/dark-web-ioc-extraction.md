# DARK WEB IOC EXTRACTION

5.1 What is IOC Extraction?
IOC extraction is the process of identifying and recording indicators of compromise from threat intelligence sources.

Hinglish: IOC extraction ka matlab hai intelligence sources se indicators (jaise IPs, domains, hashes) ko identify aur record karna.

5.2 Types of IOCs to Extract
Type	Example
Domains	malware-c2.example.com
IP Addresses	203.0.113.45
File Hashes	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Usernames	compromised_user@example.com
Email Addresses	phisher@malicious-domain.com
URLs	http://malware-distribution-network.com/payload.exe
Cryptocurrency Addresses	1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
Actor Aliases	APT29, Wizard Spider, Evil Corp
Malware Names	Emotet, Cobalt Strike, LockBit
File Names	payload.exe, update.ps1
5.3 IOC Extraction Process
text
Review Intelligence Report
    ↓
Identify Potential IOCs
    ↓
Classify Each IOC by Type
    ↓
Record IOC with Context
    ↓
Enrich Each IOC
    ↓
Validate Confidence
    ↓
Create IOC Table
    ↓
Share with SOC Team
PRACTICAL LAB 11: Dark Web IOC Extraction
Lab Title: "Extract the Indicators"
Objective
Extract IOCs from a simulated threat intelligence report.

Scenario
You have received a threat intelligence report about a new ransomware campaign targeting the education sector. Extract all IOCs from the report.

Intelligence Report (Simulated)
text
THREAT INTELLIGENCE REPORT
=========================
TLP: GREEN
Date: 2024-11-15
Subject: New Ransomware Campaign Targeting Universities

Summary:
A new ransomware campaign has been identified targeting universities in
North America and Europe. The campaign uses phishing emails with malicious
attachments to gain initial access. Once access is obtained, the attackers
deploy Cobalt Strike for command and control, followed by LockBit ransomware.

Indicators:
1. Phishing emails are sent from "security@university-notifications.com"
2. Attachments are named "Invoice_2024-11-15.doc" with MD5 hash:
   d41d8cd98f00b204e9800998ecf8427e
3. The malware communicates with C2 server at ransomware-c2.xyz
4. C2 server resolves to IP 203.0.113.45
5. The ransomware binary has SHA-256:
   e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
6. The attackers are using Bitcoin address:
   1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
7. The group is known as "DarkVector" and has been active since 2023

TTPs:
- Initial Access: Spearphishing Attachment (T1566.001)
- Execution: Malicious File (T1204.002)
- C2: Application Layer Protocol (T1071)
- Impact: Data Encrypted for Impact (T1486)

Recommendations:
- Block the domains and IPs listed above
- Search for the hashes in your environment
- Educate users about phishing emails
- Implement email filtering for the sender domain

Confidence: High (confirmed by multiple sources)
Step-by-Step Procedure
Step 1: Read the Report

Identify potential IOCs throughout the text.

Step 2: Classify Each IOC

Potential IOC	Type	Classification
security@university-notifications.com	Email	Phishing sender
Invoice_2024-11-15.doc	Filename	Malicious attachment
d41d8cd98f00b204e9800998ecf8427e	Hash (MD5)	Malware hash
ransomware-c2.xyz	Domain	C2 server
203.0.113.45	IP Address	C2 server IP
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	Hash (SHA-256)	Ransomware binary
1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa	Cryptocurrency	Ransom payment
DarkVector	Actor Alias	Threat actor
Step 3: Create IOC Table

IOC Type	IOC Value	Context	Confidence
Email	security@university-notifications.com	Phishing sender	High
Filename	Invoice_2024-11-15.doc	Malicious attachment	High
Hash (MD5)	d41d8cd98f00b204e9800998ecf8427e	Malware hash	High
Domain	ransomware-c2.xyz	C2 server	High
IP	203.0.113.45	C2 server IP	High
Hash (SHA-256)	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	Ransomware binary	High
Cryptocurrency	1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa	Ransom payment	Medium
Actor	DarkVector	Threat actor	High
Malware	LockBit	Ransomware family	High
Malware	Cobalt Strike	C2 framework	High
Step 4: Identify TTPs

Tactic	Technique	ID
Initial Access	Spearphishing Attachment	T1566.001
Execution	Malicious File	T1204.002
C2	Application Layer Protocol	T1071
Impact	Data Encrypted for Impact	T1486
Expected Output
IOC Extraction Summary:

10 IOCs extracted from intelligence report

4 TTPs identified

All IOCs have High confidence

Recommendations for blocking and monitoring

Key Concepts
IOCs can be extracted from intelligence reports

Different types of IOCs serve different purposes

Confidence levels help prioritize

TTPs provide strategic intelligence

Common Mistakes
Missing IOCs – Read carefully, don't overlook indicators

Not classifying properly – Correct classification is important

Ignoring context – Context helps with investigation

