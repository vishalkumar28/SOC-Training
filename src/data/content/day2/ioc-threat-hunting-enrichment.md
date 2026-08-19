# IOC THREAT HUNTING & ENRICHMENT

2.1 What is Threat Hunting?
Layer 1: Beginner Explanation
Threat hunting is the proactive search for threats that have evaded existing security controls. Instead of waiting for an alert, hunters actively look for signs of compromise.

Hinglish: Threat hunting mein hum proactively attacks search karte hain—alerts ke aane ka wait nahi karte.

Layer 2: Technical Explanation
Threat hunting is a hypothesis-driven process that combines:

Data analysis – Reviewing telemetry from multiple sources

Curiosity – Asking "what if" questions

Experience – Knowing what to look for

Threat Hunting vs Alert-Based Detection
Aspect	Alert-Based Detection	Threat Hunting
Trigger	Alert fires	Hunter initiates search
Goal	Respond to detected threat	Find undetected threats
Approach	Reactive	Proactive
Focus	Known threats	Unknown and advanced threats
2.2 IOC-Based Hunting
Workflow
text
IOC (from intelligence or analysis)
    ↓
Enrich IOC (add context)
    ↓
Search internal telemetry
    ↓
Identify potential matches
    ↓
Validate findings
    ↓
Assess scope
    ↓
Document and respond
Hunting Techniques
Technique	Description
IOC Search	Search for known indicators in logs
Behavioral Analysis	Look for suspicious patterns
Anomaly Detection	Find deviations from normal
ATT&CK Mapping	Search for techniques used by known groups
Data Mining	Analyze large datasets for hidden patterns
2.3 IOC Enrichment Process
Step 1: Identify the IOC
What is the indicator? (IP, domain, hash, etc.)

Step 2: Query Intelligence Sources
Source	What to Check
VirusTotal	File hash reputation
AbuseIPDB	IP reputation
AlienVault OTX	Related indicators
WHOIS	Domain ownership
DNS	DNS records
Step 3: Collect Additional Information
Infrastructure relationships

Associated malware

Threat actor attribution

Historical activity

Step 4: Correlate with Other IOCs
Are there other related indicators?

Do they form a pattern?

Step 5: Assess Confidence
How reliable is the source?

How consistent is the evidence?

Step 6: Document the Enriched IOC
PRACTICAL LAB 9: IOC Threat Hunting
Lab Title: "Find the Hidden Threat"
Objective
Perform proactive threat hunting using IOCs from threat intelligence.

Scenario
You have received threat intelligence about a new malware campaign. The intelligence includes the following IOCs:

text
Hash (SHA-256): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Domain: malware-distribution-network.com
IP: 203.0.113.45
URL: http://malware-distribution-network.com/payload.exe
Your task is to hunt for these IOCs in your environment.

Dataset (Simulated SIEM Events)
text
[2024-11-15 09:20:00] DNS: Query for malware-distribution-network.com from 192.168.1.100
[2024-11-15 09:21:00] Firewall: Connection from 192.168.1.100 to 203.0.113.45 port 80
[2024-11-15 09:22:00] Proxy: GET http://malware-distribution-network.com/payload.exe from 192.168.1.100
[2024-11-15 09:23:00] Endpoint: Process creation - C:\Windows\Temp\payload.exe on 192.168.1.100
[2024-11-15 09:24:00] Endpoint: Process creation - powershell.exe on 192.168.1.100
[2024-11-15 09:25:00] Firewall: Connection from 192.168.1.100 to 203.0.113.100 port 4444
[2024-11-15 09:26:00] Endpoint: File creation - C:\Windows\System32\drivers\malware.sys
Step-by-Step Procedure
Step 1: Search for Each IOC

Domain Search:

Query: malware-distribution-network.com

Found in DNS logs at 09:20:00

IP Search:

Query: 203.0.113.45

Found in Firewall logs at 09:21:00

URL Search:

Query: http://malware-distribution-network.com/payload.exe

Found in Proxy logs at 09:22:00

Hash Search:

Query: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

Need to check endpoint file hashes

Step 2: Enrich the IOCs

IOC	Enrichment Result
Domain	Associated with known malware campaign
IP	Malicious C2 server
Hash	Confirmed malware (VirusTotal: 50/70 detection)
Step 3: Identify Affected Systems

System: 192.168.1.100

User: Unknown (investigate)

Step 4: Assess Scope

Single system affected so far

Need to check for lateral movement

Step 5: Create Hunting Report

text
THREAT HUNTING REPORT
====================
Date: 2024-11-15
Hunt Lead: [Your Name]
Intelligence Source: Open-source threat intelligence

HYPOTHESIS:
The organization may have been compromised by the recent malware campaign
using domain malware-distribution-network.com.

FINDINGS:
- DNS query to malware-distribution-network.com from 192.168.1.100
- Network connection to 203.0.113.45 from 192.168.1.100
- Download of payload.exe from malicious domain
- Execution of payload.exe
- C2 connection to 203.0.113.100

AFFECTED SYSTEMS:
- 192.168.1.100 (Identify hostname)

SCOPE:
- Single system identified
- Further hunting recommended for lateral movement

RECOMMENDATIONS:
- Isolate 192.168.1.100
- Block domains and IPs
- Search for additional affected systems
- Escalate to incident response
Key Concepts
Threat hunting is proactive

IOCs from intelligence drive hunting

Enrichment adds context

Scope assessment is critical

Common Mistakes
Not validating findings – Ensure matches are real, not false positives

Stopping too early – Continue hunting for lateral movement

Not documenting – Record your hunting process

