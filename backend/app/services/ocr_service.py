from PIL import Image, ImageStat
import io
import re

class OCRService:
    def process_document(self, image_bytes: bytes):
        """
        Simulates OCR extraction with heuristic validation.
        """
        try:
            image = Image.open(io.BytesIO(image_bytes))
            
            # --- Heuristic Validation ---
            width, height = image.size
            if width < 500 or height < 500:
                print(f"Validation Failed: Resolution too low ({width}x{height})")
                return {"error": "Resolution too low. Please upload a clearer image."}
            
            aspect_ratio = width / height
            if aspect_ratio < 0.5 or aspect_ratio > 2.5:
                print(f"Validation Failed: Invalid Aspect Ratio ({aspect_ratio:.2f})")
                return {"error": "Invalid document dimensions. Please upload a standard ID document."}
            
            # Variance check (detects solid colors/blank images)
            stat = ImageStat.Stat(image)
            variance = sum(stat.var) / len(stat.var)
            if variance < 500:
                 print(f"Validation Failed: Low Image Detail (Variance: {variance:.2f})")
                 return {"error": "Image is too blurry or lacks detail. Please upload a valid ID."}

            print("Validation Passed. Returning mock data.")
            # ---------------------------
            
            # Mock Data - Enhanced for demo
            return {
                "extracted_data": {
                    "full_name": "JOHN DOE",
                    "dob": "1990-01-01",
                    "document_number": "A12345678",
                    "expiry_date": "2030-12-31",
                    "nationality": "USA",
                    "address": "123 Innovation Dr, Tech City, TC 94043"
                },
                "raw_text": "PASSPORT UNITED STATES OF AMERICA... JOHN DOE ...",
                "confidence": 0.98,
                "document_type": "passport"
            }
        except Exception as e:
            return {"error": f"Processing Error: {str(e)}"}

    def _extract_fields(self, text: str):
        # Placeholder for Regex logic
        pass
