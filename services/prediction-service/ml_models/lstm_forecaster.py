import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
import numpy as np

class PollutionLSTM(nn.Module):
    def __init__(self, input_size=8, hidden_size=64, num_layers=2, output_size=1):
        super(PollutionLSTM, self).__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=0.2
        )
        self.fc1 = nn.Linear(hidden_size, 32)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(32, output_size)
    
    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        last_out = lstm_out[:, -1, :]
        hidden = self.relu(self.fc1(last_out))
        forecast = self.fc2(hidden)
        return forecast

class LSTMTrainer:
    def __init__(self, model, device='cpu'):
        self.model = model.to(device)
        self.device = device
        self.criterion = nn.MSELoss()
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)
    
    def train_epoch(self, train_loader):
        self.model.train()
        total_loss = 0
        for X, y in train_loader:
            X, y = X.to(self.device), y.to(self.device)
            
            self.optimizer.zero_grad()
            predictions = self.model(X)
            loss = self.criterion(predictions, y)
            loss.backward()
            self.optimizer.step()
            
            total_loss += loss.item()
        return total_loss / len(train_loader)
    
    def validate(self, val_loader):
        self.model.eval()
        total_loss = 0
        with torch.no_grad():
            for X, y in val_loader:
                X, y = X.to(self.device), y.to(self.device)
                predictions = self.model(X)
                loss = self.criterion(predictions, y)
                total_loss += loss.item()
        return total_loss / len(val_loader)
