import React from 'react';
import { VerificationStatus } from '../types';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, showIcon = true, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Verified Master':
        return {
          icon: ShieldCheck,
          text: 'Verified Master',
          bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
          dot: 'bg-indigo-400'
        };
      case 'Reviewed':
        return {
          icon: CheckCircle2,
          text: 'Reviewed',
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400'
        };
      case 'Portfolio Submitted':
        return {
          icon: Clock,
          text: 'Portfolio Submitted',
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400'
        };
      case 'Information Provided':
      default:
        return {
          icon: AlertCircle,
          text: 'Info Provided',
          bg: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
          dot: 'bg-slate-400'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses}`}
      title={`Creator Verification Signal: ${status}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      <span>{config.text}</span>
    </span>
  );
};
