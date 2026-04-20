import React from 'react';
import { Home, Users, Search, Settings } from 'lucide-react';
import { Navbar } from './Navbar';
import { NavItem } from '../ui/NavItem';

export function BottomNavGestor({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <Navbar>
      <NavItem icon={Home} label="Início" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
      <NavItem icon={Users} label="Atletas" isActive={activeTab === 'athletes'} onClick={() => setActiveTab('athletes')} />
      <NavItem icon={Search} label="Busca" isActive={activeTab === 'search'} onClick={() => setActiveTab('search')} />
      <NavItem icon={Settings} label="Ajustes" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
    </Navbar>
  );
}
