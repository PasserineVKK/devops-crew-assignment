import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orchidApi } from '../../services/api';
import ListOfOrchidsData from '../../data/ListOfOrchids';

// Async thunks for CRUD operations
export const fetchOrchids = createAsyncThunk(
  'orchids/fetchOrchids',
  async (_, { rejectWithValue }) => {
    try {
      const data = await orchidApi.getAll();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch orchids');
    }
  }
);

export const createOrchid = createAsyncThunk(
  'orchids/createOrchid',
  async (newOrchid, { rejectWithValue }) => {
    try {
      const created = await orchidApi.create(newOrchid);
      return created;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create orchid');
    } 
  }
);

export const updateOrchid = createAsyncThunk(
  'orchids/updateOrchid',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await orchidApi.update(id, data);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update orchid');
    }
  }
);

export const deleteOrchid = createAsyncThunk(
  'orchids/deleteOrchid',
  async (id, { rejectWithValue }) => {
    try {
      await orchidApi.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete orchid');
    }
  }
);

const orchidSlice = createSlice({
  name: 'orchids',
  initialState: {
    items: ListOfOrchidsData,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orchids
      .addCase(fetchOrchids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        try {
          localStorage.setItem('orchids_local_cache', JSON.stringify(action.payload));
        } catch {
          // ignore storage quota error
        }
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create orchid
      .addCase(createOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.successMessage = `Added "${action.payload.name}" successfully!`;
        try {
          localStorage.setItem('orchids_local_cache', JSON.stringify(state.items));
        } catch {
          // ignore
        }
      })
      .addCase(createOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update orchid
      .addCase(updateOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrchid.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.successMessage = `Updated "${action.payload.name}" successfully!`;
        try {
          localStorage.setItem('orchids_local_cache', JSON.stringify(state.items));
        } catch {
          // ignore
        }
      })
      .addCase(updateOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete orchid
      .addCase(deleteOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => String(item.id) !== String(action.payload)
        );
        state.successMessage = 'Orchid specimen removed successfully.';
        try {
          localStorage.setItem('orchids_local_cache', JSON.stringify(state.items));
        } catch {
          // ignore
        }
      })
      .addCase(deleteOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = orchidSlice.actions;
export default orchidSlice.reducer;
