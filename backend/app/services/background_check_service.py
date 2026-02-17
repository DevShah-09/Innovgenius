import asyncio
import random

class BackgroundCheckService:
    async def perform_background_check(self, user_data: dict):
        """
        Simulates a long-running background check (Shadow Agent).
        """
        # Simulate delay
        await asyncio.sleep(5) 
        
        # specific check logic (mock)
        nationality = user_data.get("nationality", "UNKNOWN")
        
        status = "CLEAR"
        details = "No adverse records found."
        
        if nationality == "XX":
            status = "FLAGGED"
            details = "Manual review required for region."
            
        return {
            "check_type": "CRIMINAL_RECORD_GLOBAL",
            "status": status,
            "details": details,
            "timestamp": "2026-02-17T12:05:00Z"
        }

    async def check_social_media(self, user_data: dict):
        # Another shadow task
        await asyncio.sleep(3)
        return {
             "check_type": "ADVERSE_MEDIA",
             "status": "CLEAR",
             "details": "No negative news found."
        }
