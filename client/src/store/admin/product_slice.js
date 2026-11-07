
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/products";

const initialState = {
  products: [],
  isloading: true,
  error: null,
};

// Add Product
export const addProduct = createAsyncThunk(
  "adminProduct/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        productData
      );

      console.log("Product added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "adminProduct/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/fetch`);

      console.log("Products fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete Product
export const deleteProducts = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/delete/${productId}`
      );

      console.log("Product deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  "adminProduct/editProduct",
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/edit/${productId}`,
        updatedData
      );

      console.log("Product updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isloading = false;
         console.log("Product added successfully in state extrareducer fullfilled:", action.payload);
        if (action.payload.product) {
          state.products.push(action.payload.product);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isloading = false;
        state.error =
          action.payload?.message || "Failed to add product";

      })

      // FETCH ALL PRODUCTS
      .addCase(fetchAllProducts.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.products = action.payload.products || [];
        console.log("Products fetched successfully in state extrareducer fullfilled:", action.payload.products);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isloading = false;
        state.error =
          action.payload?.message || "Failed to fetch products";
      })

      // DELETE PRODUCT
      .addCase(deleteProducts.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isloading = false;

        const deletedProductId =
          action.payload.product?._id || action.meta.arg;

        state.products = state.products.filter(
          (product) => product._id !== deletedProductId
        );
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isloading = false;
        state.error =
          action.payload?.message || "Failed to delete product";
      })

      // EDIT PRODUCT
      .addCase(editProduct.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isloading = false;

        const updatedProduct = action.payload.product;

        if (updatedProduct) {
          state.products = state.products.map((product) =>
            product._id === updatedProduct._id
              ? updatedProduct
              : product
          );
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isloading = false;
        state.error =
          action.payload?.message || "Failed to update product";
      });
  },
});

export default adminProductSlice.reducer;
