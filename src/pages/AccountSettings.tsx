import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  UserCircle, 
  Users, 
  Clock, 
  MonitorSmartphone, 
  Heart, 
  Crown,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AccountSettings = () => {
  const location = useLocation();
  // Simple extraction of current tab based on URL
  const currentTab = location.pathname.split('/').pop() || 'profile';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center px-6">
        <Link to="/dashboard" className="flex items-center text-slate-800 font-semibold text-sm hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> My Account
        </Link>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white hidden md:block">
          <nav className="p-4 space-y-1">
            <Link 
              to="/account/profile" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <UserCircle className="w-5 h-5 mr-3" /> My Account
            </Link>
            <Link 
              to="/account/admins" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'admins' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Users className="w-5 h-5 mr-3" /> Manage Admins
            </Link>
            <Link 
              to="/account/transactions" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'transactions' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Clock className="w-5 h-5 mr-3" /> My Transactions
            </Link>
            <Link 
              to="/account/devices" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'devices' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <MonitorSmartphone className="w-5 h-5 mr-3" /> Manage Devices
            </Link>
            <Link 
              to="/account/favorites" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'favorites' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Heart className="w-5 h-5 mr-3" /> Favorites
            </Link>
            <Link 
              to="/account/plans" 
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentTab === 'plans' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Crown className={`w-5 h-5 mr-3 ${currentTab === 'plans' ? 'text-blue-600' : 'text-amber-500'}`} /> Explore Plans
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          
          {/* ======================= */}
          {/* MANAGE DEVICES VIEW     */}
          {/* ======================= */}
          {currentTab === 'devices' && (
            <div className="max-w-4xl">
              <h1 className="text-xl font-bold text-slate-800 mb-6">All Devices</h1>
              
              <div className="flex items-center justify-between border-b border-slate-200 mb-6 pb-2">
                <div className="flex space-x-8">
                  <button className="text-blue-500 font-medium pb-2 border-b-2 border-blue-500 -mb-[10px]">All</button>
                  <button className="text-slate-500 hover:text-slate-700 font-medium pb-2">Premium</button>
                  <button className="text-slate-500 hover:text-slate-700 font-medium pb-2">Non Premium</button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input 
                      placeholder="Search" 
                      className="pl-9 h-8 w-64 text-sm border-slate-200"
                    />
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 rounded">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Empty state placeholder since screenshot shows blank area */}
              <div className="py-20 text-center text-slate-400 text-sm">
                No devices found matching your criteria.
              </div>
            </div>
          )}

          {/* ======================= */}
          {/* EXPLORE PLANS VIEW      */}
          {/* ======================= */}
          {currentTab === 'plans' && (
            <div className="max-w-5xl">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-slate-800">Choose a Plan</h1>
                <Button className="bg-[#4ADE80] hover:bg-[#22C55E] text-white shadow-sm rounded-lg h-9 px-4 text-sm font-semibold">
                  See Premium Benefits <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative flex flex-col h-40">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-slate-50/50 border-l-[300px] border-l-transparent pointer-events-none"></div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-lg font-medium text-slate-700"><span className="font-bold">3</span> Months</div>
                      <div className="text-2xl font-bold text-slate-800">₹2,990/-</div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-50 mt-auto flex justify-end">
                    <a href="#" className="text-[#38BDF8] text-sm font-medium flex items-center hover:text-blue-500">
                      Purchase Now <div className="w-5 h-5 rounded-full bg-[#38BDF8] text-white flex items-center justify-center ml-2 text-[10px]"><ArrowRight className="w-3 h-3" /></div>
                    </a>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative flex flex-col h-40">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-slate-50/50 border-l-[300px] border-l-transparent pointer-events-none"></div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-lg font-medium text-slate-700"><span className="font-bold">6</span> Months</div>
                      <div className="text-2xl font-bold text-slate-800">₹4,990/-</div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-50 mt-auto flex justify-end">
                    <a href="#" className="text-[#38BDF8] text-sm font-medium flex items-center hover:text-blue-500">
                      Purchase Now <div className="w-5 h-5 rounded-full bg-[#38BDF8] text-white flex items-center justify-center ml-2 text-[10px]"><ArrowRight className="w-3 h-3" /></div>
                    </a>
                  </div>
                </div>

                {/* Card 3 (Bestseller) */}
                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#38BDF8]/20 overflow-hidden relative flex flex-col h-40">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-slate-50/50 border-l-[300px] border-l-transparent pointer-events-none"></div>
                  <div className="p-6 flex-1 relative">
                    <div className="flex justify-between items-start">
                      <div className="text-lg font-medium text-slate-700"><span className="font-bold">12</span> Months</div>
                      <div className="text-2xl font-bold text-slate-800">₹7,990/-</div>
                    </div>
                    {/* Bestseller Ribbon */}
                    <div className="absolute top-[4.5rem] left-0 bg-[#38BDF8]/20 text-[#0284C7] text-xs font-bold px-4 py-1.5 flex items-center">
                      Bestseller
                      <div className="absolute right-[-10px] top-0 w-0 h-0 border-y-[12px] border-y-transparent border-l-[10px] border-l-[#38BDF8]/20"></div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-50 mt-auto flex justify-end">
                    <a href="#" className="text-[#38BDF8] text-sm font-medium flex items-center hover:text-blue-500">
                      Purchase Now <div className="w-5 h-5 rounded-full bg-[#38BDF8] text-white flex items-center justify-center ml-2 text-[10px]"><ArrowRight className="w-3 h-3" /></div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Feature Comparison Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 px-6 font-medium text-slate-500 w-1/2"></th>
                      <th className="py-4 px-6 font-medium text-slate-500 text-center w-1/4">Free Plan</th>
                      <th className="py-4 px-6 font-medium text-amber-500 text-center w-1/4 flex items-center justify-center">
                        <Crown className="w-4 h-4 mr-2" /> Premium Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {/* SECTION: Data Insights */}
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="py-3 px-6 font-bold text-slate-800">Data Insights</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Real-time Device data</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Real-time Pollutant based data</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Historic Graphs (Daily, 7days, 30 days)</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Historic Data based on custom date</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Weekly and Monthly Insights</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Comparative Analysis</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>

                    {/* SECTION: Data Export */}
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="py-3 px-6 font-bold text-slate-800">Data Export</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Export single device data</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Export Multiple devices data</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Report Generation</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>

                    {/* SECTION: Device Settings */}
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="py-3 px-6 font-bold text-slate-800">Device Settings</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Device alert settings</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Pollutant unit settings</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Admin settings</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>

                    {/* SECTION: Additional Features */}
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="py-3 px-6 font-bold text-slate-800">Additional Features</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Scores based on Pollutant levels</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Real Time Data of all devices in one view</td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Grouping of devices</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">Link Generation (multiple themes)</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 text-slate-600">QR Code Generation</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">Generate QR Code for each of your devices</td>
                      <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Simple fallback for other tabs */}
          {currentTab !== 'devices' && currentTab !== 'plans' && (
            <div className="flex items-center justify-center h-full text-slate-400">
              Select an option from the sidebar
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;
