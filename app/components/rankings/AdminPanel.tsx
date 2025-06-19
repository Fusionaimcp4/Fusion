'use client';

import React, { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import type { ModelRanking, ModelOverride } from '@/types/rankings';

interface AdminPanelProps {
  model: ModelRanking;
  onUpdate: (modelId: string, field: string, value: any, reason: string) => void;
  onRefresh: () => void;
  isAdmin: boolean;
}

interface EditableFieldProps {
  label: string;
  field: string;
  value: any;
  type?: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  onSave: (field: string, value: any, reason: string) => void;
}

function EditableField({ label, field, value, type = 'text', options, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!reason.trim()) {
      setError('Reason is required for edits');
      return;
    }

    try {
      let finalValue = editValue;
      
      if (type === 'number') {
        finalValue = parseFloat(editValue);
        if (isNaN(finalValue)) {
          setError('Invalid number');
          return;
        }
      } else if (type === 'boolean') {
        finalValue = editValue === 'true' || editValue === true;
      }

      onSave(field, finalValue, reason);
      setIsEditing(false);
      setReason('');
      setError('');
    } catch (err) {
      setError('Invalid value');
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setReason('');
    setError('');
    setIsEditing(false);
  };

  const displayValue = () => {
    if (type === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (type === 'number' && typeof value === 'number') {
      return value.toFixed(2);
    }
    return value?.toString() || 'N/A';
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
        <div>
          <div className="text-sm font-medium text-gray-900">{label}</div>
          <div className="text-sm text-gray-600">{displayValue()}</div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-blue-600"
          title="Edit this field"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-2 px-3 bg-blue-50 rounded border-l-4 border-blue-400">
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        
        {/* Value Input */}
        {type === 'select' && options ? (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'boolean' ? (
          <select
            value={editValue.toString()}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        ) : (
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          />
        )}

        {/* Reason Input */}
        <input
          type="text"
          placeholder="Reason for this change..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
        />

        {error && (
          <div className="text-red-600 text-xs">{error}</div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            <CheckIcon className="w-3 h-3" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500"
          >
            <XMarkIcon className="w-3 h-3" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminControls({ onRefresh }: { onRefresh: () => void }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Admin Actions</h4>
      <div className="space-y-2">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh All Data'}</span>
        </button>
        
        <div className="text-xs text-gray-500">
          This will fetch fresh data from all sources and recalculate rankings.
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel({ model, onUpdate, onRefresh, isAdmin }: AdminPanelProps) {
  if (!isAdmin) {
    return null;
  }

  const handleFieldUpdate = (field: string, value: any, reason: string) => {
    onUpdate(model.id, field, value, reason);
  };

  const editableFields = [
    { 
      label: 'Featured Status', 
      field: 'metadata.featured', 
      value: model.metadata.featured, 
      type: 'boolean' as const 
    },
    { 
      label: 'Availability', 
      field: 'metadata.availability', 
      value: model.metadata.availability, 
      type: 'select' as const,
      options: ['active', 'inactive', 'beta', 'deprecated']
    },
    { 
      label: 'Composite Score Override', 
      field: 'composite_score', 
      value: model.composite_score, 
      type: 'number' as const 
    },
    { 
      label: 'Prompt Cost Override', 
      field: 'pricing.prompt_cost', 
      value: model.pricing.prompt_cost, 
      type: 'number' as const 
    },
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
      <div className="flex items-center space-x-2 mb-4">
        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-medium text-yellow-900">Admin Panel</h3>
      </div>
      
      <div className="space-y-1">
        {editableFields.map(field => (
          <EditableField
            key={field.field}
            label={field.label}
            field={field.field}
            value={field.value}
            type={field.type}
            options={field.options}
            onSave={handleFieldUpdate}
          />
        ))}
      </div>

      <AdminControls onRefresh={onRefresh} />
      
      <div className="mt-4 text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
        <strong>Note:</strong> All changes are logged with timestamps and reasons. 
        Overrides take precedence over automated data but can be reverted.
      </div>
    </div>
  );
} 