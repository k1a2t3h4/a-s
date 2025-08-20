// src/components/pages/ManagePage.tsx
import { useAuth } from "./contexts/AuthContext";

export default function Manage() {
  const { user } = useAuth();

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold">Manage Page</h1>
      {user() ? (
        <p class="mt-2">Logged in as: <strong>{user()?.email}</strong></p>
      ) : (
        <p class="mt-2 text-red-600">You are not logged in.</p>
      )}
    </div>
  );
}
