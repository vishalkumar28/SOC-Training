# DARK WEB INTELLIGENCE → SOC CORRELATION

8.1 How External Intelligence Becomes Useful Internally
External threat intelligence is only valuable if it can be correlated with internal telemetry.

Correlation Workflow
text
External Intelligence (IOC)
    ↓
Enrich IOC (add context)
    ↓
Query Internal SIEM
    ↓
Search Historical Telemetry
    ↓
Identify Potential Matches
    ↓
Validate and Investigate
    ↓
Assess Scope and Impact
    ↓
Respond if Necessary
Types of Internal Correlation
Correlation Type	Description
DNS Query	Did any system resolve the malicious domain?
Network Connection	Did any system connect to the malicious IP?
File Hash	Is the malicious file present on any system?
Email	Did anyone receive a phishing email?
Process	Was the malicious process executed?
8.2 Practical Correlation Example
External Intelligence
text
Threat Actor: DarkVector
IOC: 203.0.113.45 (C2 server)
IOC: darkvector-c2.xyz (C2 domain)
IOC: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (malware hash)
Internal SIEM Search
Search 1: DNS Queries

text
data.dns.query: "darkvector-c2.xyz"
Result: 3 queries from 2 different systems

Search 2: Network Connections

text
data.srcip: "203.0.113.45" OR data.dstip: "203.0.113.45"
Result: 5 connections from 3 systems

Search 3: File Hash

text
data.win.eventdata.hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
Result: 1 system has the file

Correlation Results
Finding	Count	Systems
DNS queries to malicious domain	3	2 systems
Network connections to C2 IP	5	3 systems
Malicious file present	1	1 system
Investigation Conclusion
3 systems potentially compromised

1 system confirmed compromised (file present)

Scope: Limited to 3 systems

Response: Investigate and contain

PRACTICAL LAB 14: Dark Web → SOC Correlation
Lab Title: "From Intelligence to Action"
Objective
Correlate external threat intelligence with internal SIEM data.

Scenario
You have received threat intelligence about a new campaign. Your task is to search your environment for signs of compromise.

Intelligence
text
Intelligence Source: CISA Alert AA-2024-11-15
Threat Actor: DarkVector
Indicators:
- Domain: darkvector-c2.xyz
- IP: 203.0.113.45
- Hash (SHA-256): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
- File: update_installer.exe
SIEM Events (Simulated)
text
DNS Logs:
[2024-11-14 14:23:00] DNS Query: darkvector-c2.xyz from 192.168.1.101
[2024-11-14 14:24:00] DNS Query: darkvector-c2.xyz from 192.168.1.102
[2024-11-14 14:25:00] DNS Query: darkvector-c2.xyz from 192.168.1.103

Firewall Logs:
[2024-11-14 14:24:30] Connection from 192.168.1.101 to 203.0.113.45 port 443
[2024-11-14 14:25:30] Connection from 192.168.1.102 to 203.0.113.45 port 443
[2024-11-14 14:26:30] Connection from 192.168.1.103 to 203.0.113.45 port 443

Endpoint Logs:
[2024-11-14 14:24:45] File created on 192.168.1.101: C:\Windows\Temp\update_installer.exe
[2024-11-14 14:25:45] Process executed on 192.168.1.101: update_installer.exe
[2024-11-14 14:26:45] File created on 192.168.1.102: C:\Windows\Temp\update_installer.exe
[2024-11-14 14:27:45] Process executed on 192.168.1.102: update_installer.exe
Step-by-Step Procedure
Step 1: Search for Domain

Q: Which systems resolved darkvector-c2.xyz?

Answer: 192.168.1.101, 192.168.1.102, 192.168.1.103

Step 2: Search for IP

Q: Which systems connected to 203.0.113.45?

Answer: Same three systems

Step 3: Search for File

Q: Which systems have update_installer.exe?

Answer: 192.168.1.101, 192.168.1.102

Step 4: Search for Hash

Q: Which systems have the malicious hash?

Answer: Need to check file hashes on endpoints

Step 5: Assess Scope

System	DNS Query	C2 Connection	File Present	Process Executed
192.168.1.101	✓	✓	✓	✓
192.168.1.102	✓	✓	✓	✓
192.168.1.103	✓	✓	✗	✗
Step 6: Determine Response

System	Status	Action
192.168.1.101	Confirmed compromised	Isolate, investigate
192.168.1.102	Confirmed compromised	Isolate, investigate
192.168.1.103	Potentially compromised	Investigate further
Expected Output
Correlation Report:

text
INTELLIGENCE CORRELATION REPORT
==============================
Intelligence Source: CISA Alert AA-2024-11-15
Threat Actor: DarkVector

CORRELATION FINDINGS:
- 3 systems resolved malicious domain darkvector-c2.xyz
- 3 systems connected to malicious IP 203.0.113.45
- 2 systems have update_installer.exe
- 2 systems executed the malicious file

AFFECTED SYSTEMS:
- 192.168.1.101 (Confirmed - file and execution)
- 192.168.1.102 (Confirmed - file and execution)
- 192.168.1.103 (Potentially - DNS and connection only)

SCOPE: 3 systems

RECOMMENDATIONS:
1. Isolate 192.168.1.101 and 192.168.1.102 immediately
2. Investigate 192.168.1.103 for additional evidence
3. Block darkvector-c2.xyz and 203.0.113.45
4. Search for the hash across all systems
5. Escalate to incident response team

CONFIDENCE: High
Key Concepts
External intelligence must be correlated internally

Multiple data sources provide a complete picture

Scope assessment is critical for response

Documentation is essential

Common Mistakes
Not searching all data sources – Check DNS, network, endpoints

Ignoring partial matches – DNS queries without connections still matter

Delaying response – Act quickly on confirmed findings

