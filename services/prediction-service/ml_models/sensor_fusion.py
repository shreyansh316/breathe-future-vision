import numpy as np
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VayuNetSensorFusion:
    """
    AI Sensor Fusion Engine (Phase 3).
    Fuses high-accuracy, sparse ground sensor data (CPCB, IoT) with 
    low-accuracy, dense satellite data (ISRO mock) to predict PM2.5 levels
    across the entire unmonitored grid (rural areas).
    """
    def __init__(self):
        # We use Kriging (Gaussian Process Regression) which is excellent for spatial interpolation
        # Kernel: Constant * Radial Basis Function (RBF)
        kernel = C(1.0, (1e-3, 1e3)) * RBF(1.0, (1e-2, 1e2))
        self.model = GaussianProcessRegressor(kernel=kernel, n_restarts_optimizer=10, alpha=0.1)
        self.is_trained = False

    def train_fusion_model(self, ground_data, satellite_data):
        """
        Train the spatial interpolation model.
        ground_data: list of dicts with 'lat', 'lon', 'pm25' (high weight)
        satellite_data: list of dicts with 'lat', 'lon', 'pm25' (lower weight/higher alpha)
        """
        logger.info("Training VayuNet Sensor Fusion Model...")
        
        X = []
        y = []
        
        # In a real scenario, we would weight ground sensors heavier (lower alpha/variance)
        # than satellite data, but for simplicity here we combine them.
        for data in ground_data + satellite_data:
            X.append([data['lat'], data['lon']])
            y.append(data['pm25'])
            
        X = np.array(X)
        y = np.array(y)
        
        self.model.fit(X, y)
        self.is_trained = True
        logger.info(f"Model trained on {len(X)} data points.")
        
    def predict_grid(self, min_lat=8.0, max_lat=37.0, min_lon=68.0, max_lon=97.0, resolution=1.0):
        """
        Predict AQI over a grid covering India.
        """
        if not self.is_trained:
            raise ValueError("Model is not trained yet.")
            
        logger.info(f"Predicting PM2.5 over grid (resolution: {resolution})")
        
        lats = np.arange(min_lat, max_lat, resolution)
        lons = np.arange(min_lon, max_lon, resolution)
        
        # Create a meshgrid
        Lat, Lon = np.meshgrid(lats, lons)
        X_pred = np.vstack([Lat.ravel(), Lon.ravel()]).T
        
        # Predict
        y_pred, sigma = self.model.predict(X_pred, return_std=True)
        
        results = []
        for i in range(len(X_pred)):
            results.append({
                "lat": float(X_pred[i][0]),
                "lon": float(X_pred[i][1]),
                "pm25_pred": float(y_pred[i]),
                "uncertainty": float(sigma[i])
            })
            
        return results

if __name__ == "__main__":
    # Test the fusion engine with dummy data
    fusion = VayuNetSensorFusion()
    
    # Mock some sparse ground data (e.g. major cities)
    ground_sensors = [
        {"lat": 28.6, "lon": 77.2, "pm25": 150}, # Delhi
        {"lat": 19.0, "lon": 72.8, "pm25": 80},  # Mumbai
        {"lat": 12.9, "lon": 77.5, "pm25": 40},  # Bangalore
    ]
    
    # Mock some dense but inaccurate satellite data
    satellite_sensors = [
        {"lat": lat, "lon": lon, "pm25": 60 + np.random.normal(0, 10)}
        for lat in np.arange(10, 30, 2)
        for lon in np.arange(70, 90, 2)
    ]
    
    fusion.train_fusion_model(ground_sensors, satellite_sensors)
    predictions = fusion.predict_grid(resolution=2.0)
    
    print(f"Generated {len(predictions)} predictions across India.")
    print("Sample prediction:", predictions[0])
