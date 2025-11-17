import React from "react";

export function useApiResource({ listFn, createFn, updateFn, deleteFn }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    setError("");
    const data = await listFn();
    const arr = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
    setItems(arr);
    setLoading(false);
  }, [listFn]);

  React.useEffect(() => { load(); }, [load]);

  const create = async (payload) => {
    const saved = await createFn(payload);
    if (saved && (saved._id || saved.id)) {
      setItems((prev) => [saved, ...prev]);
    } else {
      await load();
    }
    return saved;
  };

  const update = async (id, payload) => {
    const saved = await updateFn(id, payload);
    if (saved && (saved._id || saved.id)) {
      setItems((prev) => prev.map((it) => (String(it._id||it.id) === String(id) ? saved : it)));
    } else {
      await load();
    }
    return saved;
  };

  const remove = async (id) => {
    const ok = await deleteFn(id);
    if (ok !== null) {
      setItems((prev) => prev.filter((it) => String(it._id||it.id) !== String(id)));
    } else {
      await load();
    }
    return ok;
  };

  return { items, loading, error, reload: load, create, update, remove };
}