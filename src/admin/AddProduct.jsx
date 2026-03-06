import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CATEGORIES } from "../admin/data/categories";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    priceOriginal: "",
    priceSale: "",
    stock: 1,
    featured: false,
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Upload images to Cloudinary
  const uploadImages = async () => {
    const urls = [];

    for (const file of images) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jewellery_upload");
      data.append("cloud_name", "drswhv8iy");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drswhv8iy/image/upload",
        { method: "POST", body: data },
      );

      const json = await res.json();
      urls.push(json.secure_url);
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 2) return alert("Upload minimum 2 images (max 4)");

    setLoading(true);

    try {
      const uploadedImages = await uploadImages();

      const discount =
        form.priceSale > 0
          ? Math.round(
              ((form.priceOriginal - form.priceSale) / form.priceOriginal) *
                100,
            )
          : 0;

      await addDoc(collection(db, "products"), {
        name: form.name,
        category: form.category,
        description: form.description,
        priceOriginal: Number(form.priceOriginal),
        priceSale: Number(form.priceSale),
        discountPercent: discount,
        stock: Number(form.stock),
        featured: form.featured,
        images: uploadedImages,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("✅ Product Added Successfully");

      setForm({
        name: "",
        category: "",
        description: "",
        priceOriginal: "",
        priceSale: "",
        stock: 1,
        featured: false,
      });
      setImages([]);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Add New Product</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Prices */}
          <div className="form-grid">
            <div className="form-group">
              <label>Original Price</label>
              <input
                name="priceOriginal"
                type="number"
                value={form.priceOriginal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sale Price</label>
              <input
                name="priceSale"
                type="number"
                value={form.priceSale}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Stock */}
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          {/* Featured */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </div>

          {/* Image Upload */}
          <div className="form-group full">
            <label>Upload Images (Max 4)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files].slice(0, 4))}
            />

            {/* Preview */}
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                  />
                ))}
              </div>
            )}
          </div>

          <button className="admin-btn" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
