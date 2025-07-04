from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import json
from datetime import datetime
import numpy as np

class ModelCard:
    def __init__(self, model_name, model_version):
        self.model_name = model_name
        self.model_version = model_version
        self.metrics = {}
        self.created_at = datetime.now().isoformat()
    
    def add_metrics(self, y_true, y_pred):
        self.metrics = {
            'rmse': float(np.sqrt(mean_squared_error(y_true, y_pred))),
            'mae': float(mean_absolute_error(y_true, y_pred)),
            'r2': float(r2_score(y_true, y_pred)),
            'mape': float(np.mean(np.abs((y_true - y_pred) / y_true)) * 100)
        }
    
    def save_card(self, filepath):
        card = {
            'model_name': self.model_name,
            'model_version': self.model_version,
            'created_at': self.created_at,
            'metrics': self.metrics,
            'training_data_size': 50000,
            'features': ['pm25_lag1', 'pm25_lag24', 'temperature', 'humidity', 'wind_speed', 'day_of_week', 'hour', 'season'],
            'known_limitations': [
                'Accuracy degrades during extreme weather events (sandstorms, fog)',
                'Training data limited to 2020-2024 period',
                'Does not account for sudden industrial incidents'
            ]
        }
        with open(filepath, 'w') as f:
            json.dump(card, f, indent=2)
