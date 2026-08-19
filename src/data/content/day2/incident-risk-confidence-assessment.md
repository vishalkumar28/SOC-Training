# INCIDENT RISK & CONFIDENCE ASSESSMENT

10.1 Understanding Risk
Risk Definition
Risk is the potential for loss or damage when a threat exploits a vulnerability.

Risk Formula
text
Risk = Impact × Likelihood
But in incident assessment, we consider additional factors:

text
Risk = Asset Criticality + Impact + Likelihood + Scope + Evidence + Confidence
10.2 Understanding Confidence
Confidence Definition
Confidence is how strongly the available evidence supports the conclusion.

Confidence Levels
Level	Description	Criteria
Low	Limited evidence, multiple interpretations	Single source, weak evidence
Medium	Reasonable evidence, few interpretations	Multiple sources, consistent
High	Strong evidence, clear interpretation	Many sources, strong correlation
10.3 Risk Assessment Model
Factors to Consider
Factor	Description	Low	Medium	High
Asset Criticality	How important is the asset?	Low-value system	Business system	Critical system
Impact	What damage could occur?	Minor inconvenience	Moderate disruption	Significant damage
Likelihood	How likely is exploitation?	Unlikely	Possible	Likely
Scope	How many assets affected?	Single system	Multiple systems	Organization-wide
Evidence	How strong is the evidence?	Weak	Moderate	Strong
Confidence	How certain are we?	Low	Medium	High
Risk Levels
Risk Level	Description	Response
Low	Minimal risk, manageable	Monitor
Medium	Moderate risk, requires attention	Investigate
High	Significant risk, requires action	Respond
Critical	Severe risk, immediate action	Emergency response
10.4 Risk-Confidence Matrix
text
                    ┌─────────────────────────────────────────┐
                    │          CONFIDENCE                     │
                    │   LOW          MEDIUM        HIGH      │
┌───────────────────┼─────────────────────────────────────────┤
│        HIGH       │  Investigate   │  Respond   │  Respond │
│                    │  Carefully    │  Quickly   │  Urgently│
├───────────────────┼─────────────────────────────────────────┤
│        MEDIUM      │  Monitor      │ Investigate│ Respond  │
├───────────────────┼─────────────────────────────────────────┤
│        LOW        │  Monitor      │  Monitor   │Investigate│
└───────────────────┴─────────────────────────────────────────┘
Key Insight
High Risk + High Confidence = Immediate Response
High Risk + Low Confidence = Investigate Carefully

PRACTICAL LAB 16: Risk and Confidence Assessment
Lab Title: "Assess the Risk"
Objective
Assess the risk and confidence for a security incident.

Scenario
You have investigated an incident at PIET [Panipat Institute of Engineering & Technology] and have the following findings.

Findings
text
INCIDENT FINDINGS:
- System: WS-FINANCE-01 (Finance Department server)
- Data: Financial records, payroll information
- Evidence: 10 failed logins, 1 successful login from external IP, suspicious PowerShell execution
- Scope: Single system confirmed, no evidence of lateral movement
- Source: Multiple SIEM alerts correlated
- Time: Attack occurred 2 hours ago
- Status: System isolated, investigation ongoing
Step-by-Step Procedure
Step 1: Assess Asset Criticality

Factor	Assessment
System importance	Finance server, critical for operations
Data sensitivity	Financial records, payroll (highly sensitive)
Asset Criticality: High

Step 2: Assess Impact

Factor	Assessment
Potential damage	Financial data exposure, regulatory fines
Business disruption	Significant
Impact: High

Step 3: Assess Likelihood

Factor	Assessment
Exploitation likelihood	Attacker gained access, likely executed malicious activity
Likelihood: High

Step 4: Assess Scope

Factor	Assessment
Affected systems	WS-FINANCE-01 confirmed
Potential spread	No evidence of lateral movement yet
Scope: Single system (Medium)

Step 5: Assess Evidence

Factor	Assessment
Evidence quality	Multiple correlated alerts
Evidence sources	Security logs, endpoint logs, network logs
Evidence: Strong (High)

Step 6: Assess Confidence

Factor	Assessment
Consistency	Multiple alerts tell the same story
Source reliability	Logs are reliable
Alternative explanations	Unlikely
Confidence: High

Step 7: Determine Overall Risk

Factor	Rating
Asset Criticality	High
Impact	High
Likelihood	High
Scope	Medium
Evidence	High
Confidence	High
Overall Risk: High

Step 8: Determine Response

Risk Level	Confidence	Action
High	High	Immediate response
Expected Output
Risk Assessment Report:

text
RISK ASSESSMENT REPORT
====================
Incident: PIET [Panipat Institute of Engineering & Technology] - WS-FINANCE-01 Compromise

RISK ASSESSMENT:
┌─────────────────────┬──────────┐
│ Factor              │ Rating   │
├─────────────────────┼──────────┤
│ Asset Criticality   │ High     │
│ Impact              │ High     │
│ Likelihood          │ High     │
│ Scope               │ Medium   │
│ Evidence            │ High     │
│ Confidence          │ High     │
└─────────────────────┴──────────┘

OVERALL RISK: HIGH
CONFIDENCE: HIGH

RESPONSE: IMMEDIATE ACTION REQUIRED

RECOMMENDATIONS:
1. Complete system isolation
2. Full forensic investigation
3. Password reset for all affected accounts
4. Enhanced monitoring
5. Incident report for management
Key Concepts
Risk = Impact × Likelihood (plus other factors)

Confidence = How certain we are

High risk + High confidence = Immediate action

Risk assessment guides response priority

Common Mistakes
Confusing risk and confidence – They are different concepts

Overlooking asset criticality – Not all systems are equally important

Ignoring confidence – Low confidence requires caution

