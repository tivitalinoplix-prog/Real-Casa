import React from 'react';
import { Home, Target, AlertCircle, Settings } from 'lucide-react';
import { Navbar } from './Navbar';
import { NavItem } from '../ui/NavItem';

export function BottomNavResponsavel({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <Navbar>
      <NavItem icon={Home} label="Painel" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
      <NavItem icon={Target} label="Atleta" isActive={activeTab === 'athlete'} onClick={() => setActiveTab('athlete')} />
      <NavItem icon={AlertCircle} label="Avisos" isActive={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} />
      <NavItem icon={Settings} label="Ajustes" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
    </Navbar>
  );
}
