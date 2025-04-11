"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function SuperUserDashboard({ user }: { user: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*").order(sortBy, { ascending: false });
      if (!error) setUsers(data);
    };
    fetchUsers();
  }, [sortBy]);

  const filteredUsers = users.filter((u) =>
    (u.name.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase())) &&
    (roleFilter ? u.role === roleFilter : true)
  );

  const handleApprove = async (id: string) => {
    const { error } = await supabase.from("users").update({ approved: true }).eq("id", id);
    if (!error) setUsers(users.map((u) => (u.id === id ? { ...u, approved: true } : u)));
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    const { error } = await supabase.from("users").update({ role: newRole }).eq("id", id);
    if (!error) setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
      <div className="container space-y-12">
        <h1 className="text-5xl font-extrabold text-foreground">Super User Control, {user.name}</h1>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search users..." value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full" />
          <Select onValueChange={setRoleFilter}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent className="bg-card dark:bg-card-dark rounded-2xl">
              {["", "member", "volunteer", "core", "super_user"].map((role) => (
                <SelectItem key={role} value={role}>{role || "All"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card dark:bg-card-dark rounded-2xl">
              {["created_at", "name", "email"].map((field) => (
                <SelectItem key={field} value={field}>{field.replace("_", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* User Table */}
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-primary/40 overflow-x-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">User Management</h2>
          <motion.table className="w-full text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <thead>
              <tr className="text-muted-foreground dark:text-muted-dark">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Approved</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-primary/20"
                  >
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.role}</td>
                    <td className="p-4">{u.department?.name || "N/A"}</td>
                    <td className="p-4">{u.approved ? "Yes" : "No"}</td>
                    <td className="p-4 flex gap-2">
                      {!u.approved && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(u.id)}
                          className="bg-gradient-to-r from-primary to-accent rounded-full"
                        >
                          Approve
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-secondary text-secondary rounded-full" onClick={() => setSelectedUser(u)}>
                            Edit Role
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card/90 dark:bg-card-dark/90 rounded-3xl border border-primary/40">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">Edit Role for {selectedUser?.name}</DialogTitle>
                          </DialogHeader>
                          <Select onValueChange={(value) => handleRoleChange(selectedUser.id, value)} defaultValue={selectedUser?.role}>
                            <SelectTrigger className="rounded-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card dark:bg-card-dark rounded-2xl">
                              {["member", "volunteer", "core", "super_user"].map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>

        {/* User Statistics */}
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-primary/40">
          <h2 className="text-3xl font-bold text-foreground mb-6">User Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <p className="text-lg text-foreground">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-2xl">
              <p className="text-lg text-foreground">Approved</p>
              <p className="text-3xl font-bold">{users.filter((u) => u.approved).length}</p>
            </div>
            <div className="p-4 bg-accent/20 rounded-2xl">
              <p className="text-lg text-foreground">Pending</p>
              <p className="text-3xl font-bold">{users.filter((u) => !u.approved).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}