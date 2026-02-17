class RiskEngine:
    def calculate_risk(self, user_data: dict, verification_result: dict = None):
        """
        Calculates a dynamic risk score (0-100) based on user data and verification results.
        0 = Low Risk, 100 = High Risk
        """
        base_risk = 10
        risk_level = "LOW"
        flags = []

        # 1. Check Verification Results
        if verification_result:
            if not verification_result.get("verified"):
                base_risk += verification_result.get("risk_score_impact", 50)
                flags.extend(verification_result.get("flags", []))
            
            if "SANCTIONS_WATCHLIST_HIT" in verification_result.get("flags", []):
                risk_level = "CRITICAL"
                base_risk = 100

        # 2. Heuristic Checks on Data
        nationality = user_data.get("nationality", "").upper()
        if nationality in ["UNKNOWN", ""]:
            base_risk += 20
            flags.append("MISSING_NATIONALITY")
        
        # Example: High risk jurisdictions (Mock)
        high_risk_countries = ["HRC", "XX"] 
        if nationality in high_risk_countries:
            base_risk += 40
            flags.append("HIGH_RISK_JURISDICTION")
            risk_level = "HIGH"

        # Cap risk at 100
        total_risk = min(base_risk, 100)

        # Determine Level if not already Critical/High
        if risk_level not in ["CRITICAL", "HIGH"]:
            if total_risk > 70:
                risk_level = "HIGH"
            elif total_risk > 30:
                risk_level = "MEDIUM"
            else:
                risk_level = "LOW"

        return {
            "risk_score": total_risk,
            "risk_level": risk_level,
            "flags": flags,
            "timestamp": "2026-02-17T12:00:00Z" # Mock timestamp, or use datetime.now()
        }
