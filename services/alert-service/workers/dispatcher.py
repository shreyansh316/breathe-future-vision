import aiohttp
from abc import ABC, abstractmethod

class NotificationChannel(ABC):
    @abstractmethod
    async def send(self, recipient: str, message: str, alert_data: dict) -> bool:
        pass

class SMSChannel(NotificationChannel):
    def __init__(self, twilio_client):
        self.twilio = twilio_client
    
    async def send(self, phone: str, message: str, alert_data: dict) -> bool:
        try:
            msg = self.twilio.messages.create(
                body=message,
                from_="+1234567890",
                to=phone
            )
            return msg.sid is not None
        except Exception as e:
            print(f"SMS send failed: {e}")
            return False

class EmailChannel(NotificationChannel):
    def __init__(self, smtp_config):
        self.smtp_config = smtp_config
    
    async def send(self, email: str, message: str, alert_data: dict) -> bool:
        try:
            html_body = f"""
            <h2>🌍 Air Quality Alert</h2>
            <p>City: {alert_data.get('city_id')}</p>
            <p>PM2.5: {alert_data.get('pm25', 'N/A')} µg/m³</p>
            <p>Severity: <strong>{alert_data.get('severity')}</strong></p>
            <p>Recommendation: {self._get_recommendation(alert_data.get('severity'))}</p>
            """
            # Implementation for SMTP send would go here
            return True
        except Exception as e:
            print(f"Email send failed: {e}")
            return False
    
    def _get_recommendation(self, severity: str) -> str:
        recommendations = {
            'CRITICAL': '⛔ Stay indoors. Wear N95 mask if going out. Avoid exercise.',
            'SEVERE': '🟠 Limit outdoor activities. Use air purifier indoors.',
            'MODERATE': '🟡 Sensitive groups should avoid strenuous outdoor activities.',
        }
        return recommendations.get(severity, 'Monitor air quality')

class WebhookChannel(NotificationChannel):
    async def send(self, webhook_url: str, message: str, alert_data: dict) -> bool:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(webhook_url, json=alert_data, timeout=10) as resp:
                    return resp.status == 200
        except Exception as e:
            print(f"Webhook send failed: {e}")
            return False

class AlertDispatcher:
    def __init__(self, channels: dict):
        self.channels = channels
    
    async def dispatch(self, alert: dict, recipient_preferences: dict):
        results = {}
        for channel_name in alert.get('channels', []):
            if channel_name not in self.channels:
                continue
            
            prefs = recipient_preferences.get(channel_name, {})
            if not prefs.get('enabled', True):
                continue
            
            channel = self.channels[channel_name]
            recipient = prefs.get('phone') if channel_name == 'sms' else prefs.get('email')
            
            if recipient:
                success = await channel.send(
                    recipient,
                    alert['message'],
                    alert
                )
                results[channel_name] = success
        
        return results
