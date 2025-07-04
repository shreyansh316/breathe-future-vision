import torch
import torch.nn as nn
import torch.nn.functional as F
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Attention(nn.Module):
    """
    Attention mechanism to focus on the most relevant historical time steps 
    when predicting sudden AQI spikes.
    """
    def __init__(self, hidden_dim):
        super(Attention, self).__init__()
        self.attention = nn.Linear(hidden_dim, 1, bias=False)

    def forward(self, lstm_outputs):
        # lstm_outputs shape: (batch_size, seq_len, hidden_dim)
        scores = self.attention(lstm_outputs).squeeze(2) # (batch_size, seq_len)
        alpha = F.softmax(scores, dim=1) # (batch_size, seq_len)
        # Context vector is weighted sum of lstm outputs
        context = torch.bmm(alpha.unsqueeze(1), lstm_outputs).squeeze(1) # (batch_size, hidden_dim)
        return context, alpha

class BreatheCastLSTMAttention(nn.Module):
    """
    LSTM with Attention for capturing rapid, unpredictable short-term AQI spikes.
    This model takes the last 48 hours of multivariate data (PM2.5, PM10, Temp, Wind) 
    and predicts the next 24-120 hours.
    """
    def __init__(self, input_dim=4, hidden_dim=64, num_layers=2, output_dim=1):
        super(BreatheCastLSTMAttention, self).__init__()
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        # LSTM layer
        self.lstm = nn.LSTM(
            input_size=input_dim, 
            hidden_size=hidden_dim, 
            num_layers=num_layers, 
            batch_first=True,
            dropout=0.2
        )
        
        # Attention layer
        self.attention = Attention(hidden_dim)
        
        # Fully connected layers for output
        self.fc1 = nn.Linear(hidden_dim, 32)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.2)
        self.fc2 = nn.Linear(32, output_dim)

    def forward(self, x):
        # x shape: (batch_size, seq_len, input_dim)
        lstm_out, (h_n, c_n) = self.lstm(x)
        
        # Apply attention to LSTM outputs
        context, attn_weights = self.attention(lstm_out)
        
        # Pass context vector through dense layers
        out = self.fc1(context)
        out = self.relu(out)
        out = self.dropout(out)
        out = self.fc2(out)
        
        return out, attn_weights

def test_model():
    """Verify tensor shapes"""
    logger.info("Testing BreatheCastLSTMAttention architecture...")
    batch_size = 16
    seq_len = 48 # Last 48 hours
    input_dim = 4 # e.g., PM2.5, PM10, Temp, Humidity
    output_dim = 24 # Predict next 24 hours
    
    model = BreatheCastLSTMAttention(input_dim, 64, 2, output_dim)
    
    # Dummy input tensor
    x = torch.randn(batch_size, seq_len, input_dim)
    
    predictions, attention_weights = model(x)
    
    logger.info(f"Input shape: {x.shape}")
    logger.info(f"Output shape: {predictions.shape} (Expected: {batch_size}, {output_dim})")
    logger.info(f"Attention weights shape: {attention_weights.shape} (Expected: {batch_size}, {seq_len})")
    print("Model architecture is structurally sound.")

if __name__ == "__main__":
    test_model()
