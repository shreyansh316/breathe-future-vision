import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Point 91: Custom React Error Boundaries per Component Block
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // We can also log the error to an error reporting service here
    console.error('Uncaught error in component:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 bg-red-50/50 border border-red-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <div>
            <h3 className="font-bold text-red-900 mb-1">Module Failure</h3>
            <p className="text-sm text-red-700 max-w-md mx-auto">
              {this.props.fallbackMessage || 'This section encountered an unexpected error.'}
            </p>
            {this.state.error && (
              <p className="text-xs text-red-600/70 mt-2 font-mono bg-red-100 p-2 rounded truncate max-w-xs mx-auto">
                {this.state.error.message}
              </p>
            )}
          </div>
          <button 
            onClick={this.handleReset}
            className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Module</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
