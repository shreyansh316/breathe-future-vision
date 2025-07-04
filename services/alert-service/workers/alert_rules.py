from enum import Enum
from dataclasses import dataclass
from typing import List
from datetime import datetime

class AlertSeverity(Enum):
    CRITICAL = "CRITICAL"
    SEVERE = "SEVERE"
    MODERATE = "MODERATE"
    INFO = "INFO"

@dataclass
class AlertRule:
    rule_id: str
    city_id: int
    metric: str  # "pm25", "pm10", "aqi_score", "anomaly"
    operator: str  # ">", "<", "=", "between"
    threshold: float
    severity: AlertSeverity
    cooldown_minutes: int  # Prevent alert spam
    channels: List[str]  # ["sms", "email", "push", "webhook"]
    enabled: bool

class AlertRuleEngine:
    def __init__(self):
        self.rules: List[AlertRule] = []
        self.last_alert_time = {}  # Track cooldown
    
    def evaluate(self, city_id: int, pollution_data: dict) -> List[dict]:
        triggered_alerts = []
        
        for rule in self.rules:
            if not rule.enabled or rule.city_id != city_id:
                continue
            
            if self._is_on_cooldown(rule.rule_id):
                continue
            
            if self._evaluate_condition(rule, pollution_data):
                alert = {
                    'rule_id': rule.rule_id,
                    'city_id': city_id,
                    'severity': rule.severity.value,
                    'message': self._generate_message(rule, pollution_data),
                    'timestamp': datetime.now().isoformat(),
                    'channels': rule.channels
                }
                triggered_alerts.append(alert)
                self.last_alert_time[rule.rule_id] = datetime.now()
        
        return triggered_alerts
    
    def _evaluate_condition(self, rule: AlertRule, data: dict) -> bool:
        value = data.get(rule.metric)
        if value is None:
            return False
        
        if rule.operator == ">":
            return value > rule.threshold
        elif rule.operator == "<":
            return value < rule.threshold
        elif rule.operator == "between":
            if isinstance(rule.threshold, (list, tuple)) and len(rule.threshold) == 2:
                return rule.threshold[0] <= value <= rule.threshold[1]
        return False
    
    def _is_on_cooldown(self, rule_id: str) -> bool:
        if rule_id not in self.last_alert_time:
            return False
        elapsed = (datetime.now() - self.last_alert_time[rule_id]).total_seconds() / 60
        rule = next((r for r in self.rules if r.rule_id == rule_id), None)
        if rule:
            return elapsed < rule.cooldown_minutes
        return False
    
    def _generate_message(self, rule: AlertRule, data: dict) -> str:
        value = data.get(rule.metric)
        return f"⚠️ {rule.city_id}: {rule.metric}={value:.1f} exceeds safe level ({rule.threshold})"
