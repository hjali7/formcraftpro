import React from 'react';

interface Field {
  id: number;
  field_key: string;
  field_type: string;
  field_meta?: any;
}

interface FieldListProps {
  fields: Field[];
}

export default function FieldList({ fields }: FieldListProps) {
  return (
    <div className="space-y-2">
      {fields.map(field => (
        <div key={field.id} className="p-3 border rounded bg-white">
          <div className="font-medium">{field.field_key}</div>
          <div className="text-sm text-gray-600">{field.field_type}</div>
        </div>
      ))}
    </div>
  );
}
