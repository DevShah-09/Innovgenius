class VerificationService:
    def verify_identity(self, data: dict):
        """
        Mocks a government database check.
        """
        doc_number = data.get("document_number", "")
        
        # Simulate a "Hit" on a watchlist if the number ends in '999'
        if doc_number and doc_number.endswith("999"):
            return {
                "verified": False,
                "flags": ["SANCTIONS_WATCHLIST_HIT", "PEP_MATCH"],
                "risk_score_impact": 90,
                "details": "Match found in OFAC Sanctions List"
            }
        
        # Simulate an expired document if number ends in '000'
        if doc_number and doc_number.endswith("000"):
             return {
                "verified": False,
                "flags": ["DOCUMENT_EXPIRED"],
                "risk_score_impact": 50,
                "details": "Document expiry date is in the past"
            }

        return {
            "verified": True,
            "flags": [],
            "risk_score_impact": 0,
            "details": "Identity verified against Government Database"
        }
