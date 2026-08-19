# CYBER THREAT INTELLIGENCE FUNDAMENTALS

1.1 What is CTI?
Layer 1: Beginner Explanation
Cyber Threat Intelligence (CTI) is information about threats that helps organizations understand and defend against cyber attacks. It answers questions like:

Who is attacking us?

Why are they attacking?

How do they operate?

What are they likely to do next?

Hinglish: CTI information hai jo batati hai ki kaun attack kar raha hai, kyun kar raha hai, aur kaise. Yeh humein future attacks ke liye prepare karne mein madad karti hai.

Layer 2: Technical Explanation
CTI is evidence-based knowledge about existing or emerging threats that can be used to inform security decisions. It involves:

Collection – Gathering threat data from multiple sources

Analysis – Processing and interpreting the data

Dissemination – Sharing actionable intelligence with stakeholders

Layer 3: SOC Analyst Perspective
"Threat intelligence transforms raw data into actionable insights. Instead of just seeing an IP address, I learn that it belongs to a known ransomware group. This helps me prioritize my response and anticipate what they might do next."

1.2 Intelligence vs Information
Aspect	Information	Intelligence
Definition	Raw, unprocessed data	Processed, analyzed, actionable
Example	IP address 203.0.113.45	IP 203.0.113.45 is associated with APT group, used in recent attacks
Value	Limited without context	High—supports decision-making
1.3 Types of Threat Intelligence
By Level
Type	Audience	Purpose	Time Horizon
Strategic	Executives, Board	Understand risk landscape	Long-term
Operational	SOC Managers, Security Leaders	Plan defensive operations	Medium-term
Tactical	SOC Analysts, Incident Responders	Detect and respond to attacks	Short-term
Technical	Analysts, Engineers	Identify specific threats	Real-time
Example: Each Type for the Same Threat
Type	Example
Strategic	"Ransomware attacks against the education sector increased 45% last year."
Operational	"APT groups are targeting universities for intellectual property."
Tactical	"Attackers are using brute force against RDP to gain initial access."
Technical	"IP 203.0.113.45 is a known C2 server for the LockBit ransomware."
1.4 The CTI Lifecycle
text
┌─────────────────────────────────────────────────────────────┐
│                    1. DIRECTION                             │
│      (Define intelligence requirements)                    │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    2. COLLECTION                            │
│           (Gather data from sources)                       │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    3. PROCESSING                            │
│          (Normalize, organize, store data)                 │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    4. ANALYSIS                              │
│        (Interpret, contextualize, enrich)                  │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    5. DISSEMINATION                         │
│           (Share intelligence with stakeholders)           │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    6. FEEDBACK                              │
│         (Evaluate and improve the process)                 │
└─────────────────────────────────────────────────────────────┘
1.5 Intelligence Sources
Types of Sources
Source Type	Description	Examples
Open Source	Publicly available	OSINT, security blogs, social media
Commercial	Paid intelligence feeds	Recorded Future, CrowdStrike
Government	Official government sources	CISA, NCSC
Community	Shared intelligence	ISACs, sharing groups
Internal	Organization's own data	SIEM logs, incident reports
Intelligence Quality Criteria
Criterion	Description
Relevance	Does it apply to your organization?
Timeliness	Is it current?
Accuracy	Is it correct?
Reliability	Is the source trustworthy?
Actionability	Can you act on it?
Key Concepts
CTI provides context for security events

There are four types of intelligence (strategic, operational, tactical, technical)

The CTI lifecycle is a continuous process

Intelligence must be relevant, timely, and actionable

Common Mistakes
Collecting too much data – Focus on relevant intelligence

Not sharing intelligence – Intelligence is most valuable when shared

Ignoring the feedback loop – Continuously improve

Interview Questions
Basic:

What is Cyber Threat Intelligence?

What is the difference between information and intelligence?

What are the four types of threat intelligence?

Intermediate:

Explain the CTI lifecycle.

What makes intelligence "actionable"?

Scenario:

You receive an intelligence report about a new threat actor targeting your industry. How do you respond?

