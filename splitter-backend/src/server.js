import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const { Pool } = pg;
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

app.get('/api/health', async (_req, res) => {
  const dbStatus = pool ? 'postgres-ready' : 'postgres-not-configured';
  const supabaseStatus = supabase ? 'supabase-ready' : 'supabase-not-configured';

  res.json({
    ok: true,
    service: 'splitter-backend',
    db: dbStatus,
    supabase: supabaseStatus,
  });
});

app.get('/api/groups', async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('groups').select('*').order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    if (pool) {
      const result = await pool.query('SELECT * FROM groups ORDER BY created_at DESC');
      return res.json(result.rows);
    }

    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch groups', error: error.message });
  }
});

app.get('/api/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) throw error;
      return res.json(data);
    }

    if (pool) {
      const result = await pool.query('SELECT * FROM groups WHERE id = $1', [groupId]);
      return res.json(result.rows[0] || null);
    }

    return res.status(404).json({ message: 'Group not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch group', error: error.message });
  }
});

app.post('/api/groups', async (req, res) => {
  const { name, description = '', members = [] } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Group name is required' });
  }

  try {
    const payload = {
      name: name.trim(),
      description,
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase.from('groups').insert(payload).select().single();

      if (error) throw error;

      if (members.length > 0) {
        const groupMembers = members.map((memberId) => ({
          group_id: data.id,
          member_id: memberId,
        }));

        await supabase.from('group_members').insert(groupMembers);
      }

      return res.status(201).json(data);
    }

    if (pool) {
      const result = await pool.query(
        'INSERT INTO groups (name, description, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [payload.name, payload.description],
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(201).json({
      id: `group_${Date.now()}`,
      name: payload.name,
      description: payload.description,
      created_at: payload.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create group', error: error.message });
  }
});

app.get('/api/groups/:groupId/transactions', async (req, res) => {
  const { groupId } = req.params;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    if (pool) {
      const result = await pool.query(
        'SELECT * FROM transactions WHERE group_id = $1 ORDER BY created_at DESC',
        [groupId],
      );
      return res.json(result.rows);
    }

    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
});

app.post('/api/groups/:groupId/transactions', async (req, res) => {
  const { groupId } = req.params;
  const { type, amount, description, member_id } = req.body || {};

  if (!type || !amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Valid type and amount are required' });
  }

  try {
    const payload = {
      group_id: groupId,
      type,
      amount: Number(amount),
      description: description || 'Transaction',
      member_id: member_id || null,
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase.from('transactions').insert(payload).select().single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (pool) {
      const result = await pool.query(
        `INSERT INTO transactions (group_id, type, amount, description, member_id, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
        [payload.group_id, payload.type, payload.amount, payload.description, payload.member_id],
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(201).json({
      ...payload,
      id: `txn_${Date.now()}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create transaction', error: error.message });
  }
});

app.get('/api/groups/:groupId/activity', async (req, res) => {
  const { groupId } = req.params;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    if (pool) {
      const result = await pool.query(
        'SELECT * FROM transactions WHERE group_id = $1 ORDER BY created_at DESC',
        [groupId],
      );
      return res.json(result.rows);
    }

    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activity', error: error.message });
  }
});

app.get('/api/groups/:groupId/settlements', async (req, res) => {
  const { groupId } = req.params;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('settlements')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    if (pool) {
      const result = await pool.query(
        'SELECT * FROM settlements WHERE group_id = $1 ORDER BY created_at DESC',
        [groupId],
      );
      return res.json(result.rows);
    }

    return res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settlements', error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(port, () => {
  console.log(`Splitter backend running on http://localhost:${port}`);
});
