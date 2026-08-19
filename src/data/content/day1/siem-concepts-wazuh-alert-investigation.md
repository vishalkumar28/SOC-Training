# SIEM CONCEPTS & WAZUH ALERT INVESTIGATION

4.1 What is SIEM?
Layer 1: Beginner Explanation
A SIEM (Security Information and Event Management) is like a central security dashboard that collects logs from all your systems, analyzes them for threats, and alerts you when something suspicious happens.

Hinglish: SIEM ek central system hai jo saare logs collect karta hai, unhe analyze karta hai, aur suspicious activity detect karta hai.

Layer 2: Technical Explanation
SIEM combines two functions:

SIM (Security Information Management): Long-term storage and analysis of log data

SEM (Security Event Management): Real-time monitoring and alerting

Key SIEM Capabilities
Capability	Description
Log Collection	Aggregates logs from multiple sources
Parsing	Normalizes different log formats
Storage	Retains logs for investigation and compliance
Search	Enables analysts to find relevant events
Detection	Applies rules to identify suspicious activity
Correlation	Links related events across sources
Alerting	Notifies analysts of potential threats
Visualization	Presents data in dashboards
SIEM Architecture
text
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES                            │
├──────────┬──────────┬──────────┬──────────┬────────────────┤
│  Windows │  Linux   │ Firewall │  IDS/IPS │  Applications  │
│  Servers │  Servers │          │         │                │
└────┬─────┴────┬─────┴────┬─────┴────┬────┴────────────────┘
     │          │          │          │
     ▼          ▼          ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                    LOG COLLECTOR                            │
│              (Collects and forwards logs)                   │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    SIEM ENGINE                              │
│         (Parses, normalizes, correlates, alerts)            │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    STORAGE & INDEX                          │
│              (Stores logs for search)                       │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD                                │
│              (Visualization & investigation)                │
└─────────────────────────────────────────────────────────────┘
4.2 Wazuh Overview
What is Wazuh?
Wazuh is an open-source SIEM and XDR platform that provides security monitoring, threat detection, and incident response capabilities.

Wazuh Architecture
Wazuh follows an agent-server-storage-visualization model:

text
┌─────────────────────────────────────────────────────────────┐
│                     WAZUH AGENTS                            │
│        (Installed on monitored endpoints)                   │
│  • Collect logs, file changes, processes                   │
│  • Monitor system integrity                                 │
│  • Detect vulnerabilities                                   │
└────────────────────────┬────────────────────────────────────┘
                         ▼ (Encrypted connection)
┌─────────────────────────────────────────────────────────────┐
│                    WAZUH MANAGER                            │
│          (Central server for analysis)                      │
│  • Receive and analyze agent data                           │
│  • Apply rules and decoders                                 │
│  • Generate alerts                                          │
│  • Store data in indexer[reference:20]                       │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    WAZUH INDEXER                            │
│              (OpenSearch/Elasticsearch)                     │
│  • Index and store alerts                                   │
│  • Enable fast searching                                    │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    WAZUH DASHBOARD                          │
│              (OpenSearch Dashboards/Kibana)                 │
│  • Visualize alerts                                         │
│  • Enable investigation[reference:21]                        │
└─────────────────────────────────────────────────────────────┘
Key Wazuh Components
Component	Function
Agent	Runs on monitored endpoints, collects data
Manager	Central server that analyzes data
Indexer	Stores and indexes alerts
Dashboard	Web interface for visualization and investigation
Manager Daemons (Wazuh v5.0.0+)
Daemon	Function
wazuh-manager-remoted	Encrypted agent communication
wazuh-manager-analysisd	Event analysis, decoding, rule matching
wazuh-manager-db	SQLite database management
wazuh-manager-apid	RESTful API
wazuh-manager-authd	Agent registration and key distribution
wazuh-manager-modulesd	Vulnerability scans, SCA
wazuh-manager-clusterd	Cluster synchronization
Agent Daemons
Daemon	Function
wazuh-agentd	Main agent process
wazuh-logcollector	Collects logs
wazuh-syscheckd	File Integrity Monitoring (FIM)
wazuh-modulesd	System inventory, SCA
wazuh-execd	Active response execution
Wazuh Capabilities
Capability	Description
Log Analysis	Collects and analyzes logs from multiple sources
File Integrity Monitoring	Detects file changes on monitored systems
Vulnerability Detection	Identifies vulnerabilities on endpoints
Malware Detection	Detects malicious activity
MITRE ATT&CK Mapping	Maps alerts to ATT&CK framework
Active Response	Automates response actions
4.3 Wazuh Alert Investigation
Understanding Wazuh Alerts
Wazuh alerts contain rich contextual information:

Field	Description
Rule	Rule ID, level, description, groups
Agent	Agent ID, name, IP address, OS
Data	Source logs and system information
MITRE ATT&CK	Mapped tactics and techniques
GeoIP	Geographic location (for network events)
Severity Levels
Level	Severity	Response
0-3	Informational	Monitor
4-7	Low-Medium	Review
8-11	High	Investigate
12-15	Critical	Immediate action
Investigation Workflow in Wazuh
Identify the Alert

Navigate to Threat Hunting dashboard

Filter by severity level >= 8

Review recent high-severity events

Gather Context

Click on alert to view details

Note: Timestamp, agent, source IP, user accounts

Expand Investigation

Search for related events by:

Agent: agent.id:"001" AND timestamp:[now-1h TO now]

Source IP: data.srcip:"192.168.1.100"

User: data.dstuser:"suspicious-account"

Check related modules: FIM, vulnerability detection, MITRE

Analyze Patterns

Look for: volume, timing, sequence, scope, geography

Document Findings

Affected systems, accounts, timeline, impact

Wazuh Dashboard Navigation
The Wazuh Dashboard provides:

Overview of security incidents and activities

Connected/disconnected agent summaries

Alert severity levels (last 24 hours)

Prebuilt dashboards for endpoint security, threat intelligence, security operations

PRACTICAL LAB 4: Wazuh Environment and Alert Investigation
Lab A: Wazuh Environment Overview
Objective: Understand the Wazuh environment and navigate the dashboard.

Environment: Wazuh instance (provided by instructor or lab environment)

Procedure:

Access the Wazuh Dashboard URL

Log in with provided credentials

Observe the main dashboard:

Total alerts

Connected agents

Severity distribution

Navigate to Threat Hunting module

Review the Alerts Overview section

Lab B: Alert Investigation
Objective: Investigate a specific alert in Wazuh.

Scenario: A high-severity alert has been triggered for suspicious authentication activity.

Procedure:

Navigate to Threat Hunting dashboard

Filter by severity level >= 8

Identify an alert with description containing "authentication" or "login"

Click on the alert to view details

Analyze the Alert:

Field	Information to Extract
Timestamp	When did this occur?
Agent	Which system is affected?
Source IP	Where did the activity come from?
User Account	Which account is involved?
Rule Description	What triggered the alert?
MITRE Mapping	What tactics/techniques are indicated?
Expand the Investigation:

Search for related events from the same agent:

text
agent.id:"[AGENT_ID]" AND timestamp:[now-24h TO now]
Search for related events from the same source IP:

text
data.srcip:"[SOURCE_IP]"
Check if there are FIM events on the affected system

Check vulnerability status

Document Findings:

Create a summary including:

Affected systems and accounts

Timeline of events

Potential impact

Recommended actions

Lab C: Searching Events in Wazuh
Objective: Learn to search for specific events in Wazuh.

Common Search Queries:

Query	Purpose
rule.level:>=8	High severity alerts
data.win.eventdata.userName:"jsmith"	Events for specific user
data.srcip:"203.0.113.45"	Events from specific IP
agent.name:"WS-FINANCE-01"	Events for specific system
rule.groups:"authentication_failed"	Failed authentication events
Procedure:

Navigate to Security Analytics section

Enter a search query

Review results

Refine query based on findings

Troubleshooting Common Issues
Issue	Solution
No results	Check time range, verify query syntax
Too many results	Add filters, narrow time range
Agent not showing	Verify agent is connected
UI differs from documentation	Check Wazuh version, UI may vary
Learning Outcomes
After completing these labs, you should be able to:

Navigate the Wazuh Dashboard

Identify high-severity alerts

Investigate alerts using contextual information

Search for related events

Document investigation findings

