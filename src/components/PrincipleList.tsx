"use client";

import React, { useState, useEffect } from 'react';
import { useUiStore } from '@/store/uiStore'; // Adjust path if needed

// Define an interface for the Principle data structure
// based on the Prisma model and API response
interface Principle {
  id: string;
  title: string;
  description?: string | null; // Match optional field
  axis: string;
  category: string;
  createdAt: string; // Dates are typically serialized as strings
  updatedAt: string; // Dates are typically serialized as strings
}

const PrincipleList: React.FC = () => {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading: setUiLoading } = useUiStore((state) => ({
    isLoading: state.isLoading,
    setLoading: state.setLoading,
  }));

  console.log(isLoading, setUiLoading);

  useEffect(() => {
    const fetchPrinciples = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/principles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Principle[] = await response.json();
        setPrinciples(data);
      } catch (err: unknown) {
        console.error("Failed to fetch principles:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrinciples();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading principles...</div>;
  }

  if (error) {
    return <div>Error loading principles: {error}</div>;
  }

  if (principles.length === 0) {
    return <div>No principles found.</div>;
  }

  return (
    <div>
      <h2>Principles</h2>
      <ul>
        {principles.map((principle) => (
          <li key={principle.id}>
            {principle.title}
            {/* You can add more details here later if needed */}
            {/* <p>{principle.description}</p> */}
            {/* <p><small>Axis: {principle.axis} | Category: {principle.category}</small></p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrincipleList; 