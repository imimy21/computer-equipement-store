import React, { useState } from "react";
import { useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Search } from "lucide-react"; // استيراد الأيقونات

const allProducts = [
  // PC
  { id: 1, name: "MacBook Pro 16-inch", price: 376500, stock: 10, image: "https://webstar-electro.com/documents/document_service_21038_698_5_1473342992.jpg", category: "PC" },
  { id: 2, name: "Dell XPS 15", price: 268900, stock: 10, image: "https://www.acomputerservice.com.pe/5148/notebook-dell-latitude-14-3420-14-hd-i5-1135g7-24ghz-8gb-ddr4-3200mhz-512gb-ssd-kw11n.jpg", category: "PC" },
  { id: 3, name: "HP Spectre x360", price: 201600, stock: 10, image:"https://www.elasslihitech.com/wp-content/uploads/2023/11/LD0005638889_2.jpg", category: "PC" },
 { id:43 , name: "Lenovo ThinkPad X1", price: 228500 , stock: 15, image:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnYpGL794F6wpnWEm1-eWaR2NqqfkUytjESFzxgFaU8jxVcc4Pe8F3MdtrViqt9Qq7lg&usqp=CAU", category: "PC" },
 { id:44 , name: "ASUS ROG Zephyrus", price: 295700 , stock: 8, image:  "https://dlcdnwebimgs.asus.com/gain/DBB47F70-325D-4510-9E3E-0548FEF67FB1", category: "PC" },
  
  // Hard Drives
  { id: 4, name: "Seagate BarraCuda 4TB", price: 18000, stock: 15, image: "https://m.media-amazon.com/images/I/61HTOLqpL4L.jpg", category: "Hard Drives" },
  { id: 5, name: "WD Blue 6TB", price: 25000, stock: 12, image: "https://media.ldlc.com/r1600/ld/products/00/06/16/20/LD0006162048.jpg", category: "Hard Drives" },
  { id: 6, name: "Toshiba P300 3TB", price: 15000, stock: 8, image: "https://www.toshiba-storage.com/wp/wp-content/uploads/2019/09/P300_Highlihgt_Product_Image.png", category: "Hard Drives" },
  { id: 7, name: "Seagate IronWolf 8TB", price: 35000, stock: 5, image: "https://admin-info.dz/wp-content/uploads/2024/08/LD0004001524_2.jpg", category: "Hard Drives" },
// Headsets
 { id: 11, name: "SteelSeries Arctis 7", price: 27000, stock: 10, image: "/headset3.png", category: "Headsets" },
  { id: 12, name: "Razer Kraken", price: 20000, stock: 12, image: "/headset4.png", category: "Headsets" },
  { id: 13, name: "Corsair HS60", price: 18000, stock: 15, image: "/headset5.png", category: "Headsets" },
  // Microphones
  { id: 14, name: "Blue Snowball", price: 9000, stock: 20, image: "/micro1.png", category: "Microphones" },
  { id: 15, name: "Fifine K669", price: 6500, stock: 25, image: "/micro2.png", category: "Microphones" },
  { id: 16, name: "Razer Seiren", price: 15000, stock: 10, image: "/micro3.png", category: "Microphones" },
 // Motherboards
  { id: 21, name: "MSI MPG X670E Carbon", price: 52000, stock: 4, image: "/motherboard3.png", category: "Motherboards" },
  { id: 22, name: "ASRock B760M Steel", price: 28000, stock: 7, image: "/motherboard4.png", category: "Motherboards" },
  { id: 23, name: "ASUS TUF Gaming B550", price: 22000, stock: 8, image: "/motherboard5.png", category: "Motherboards" },
  { id: 24, name: "Gigabyte Z690 UD", price: 35000, stock: 5, image: "/motherboard6.png", category: "Motherboards" },
  // Mice
 { id: 27, name: "Corsair Harpoon", price: 9000, stock: 20, image: "/mouse3.png", category: "Mice" },
  { id: 28, name: "Microsoft Bluetooth", price: 3200, stock: 25, image: "/mouse4.png", category: "Mice" },
  { id: 29, name: "Logitech MX Master", price: 22000, stock: 10, image: "/mouse5.png", category: "Mice" },
  
    // Printers
  { id: 41, name: "HP LaserJet Pro M15w", price: 25000, stock: 5, image: "https://webstar-electro.com/documents/document_service_9829511_702_5_1523247057.jpg", category: "Printers" },
  { id: 42, name: "Canon PIXMA TS3450", price: 18000, stock: 8,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwo9pLfcv1FmYoWjxrDxviVJHiNvRy9tVXCQ&s" ,  category: "Printers" },
  { id: 43, name: "Epson EcoTank L3210", price: 35000, stock: 4,image :  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAPDxIRDw8PEBAPDw8PFRAPDw8PFRIWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQFjAdHyItLS0tNzUtKzgvLjctKy4rLTg3LSszODU3My0uNysrMzErOCs4NTUrOCstKysrLS0rN//AABEIAKgBKwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUHBgj/xABNEAACAQIBBggICQkHBQAAAAAAAQIDEQQFBhIhMVEHExRTYZGx0SIjQVJxgZOhFRYyM1RicrPBJCU0QnOio7LwNUN0ksLS00RjgoO0/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGxEBAQACAwEAAAAAAAAAAAAAAAERMRIhQQL/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeVz8zqeBpxp0FCeLrX4uM7uFKmmtKrNJptLYldXb3JtbzLWVKeEoVMRVfgwSsl8qc5NRhCK8spSaS6WcgxTqV6tTE4hp16zTnZ3jTivkUoX/UinbpblLbJgRXz0ytLZidDohSoW/ei2YlTOrK7VuW1Y673VPDX2bNdPYX3hkQ8MgKcLnjlene+LlVvztPDu3otBF55+ZW56HsqXcWHhkUPDIDIef2Vueh7Kl3FL4QMr89D2VLuMWWGRQ8KgMt8IWV+eh7Kl3FL4RMr89D2VLuMKWFLcsKBsHwi5X56HsaXcUvhHyvz1P2NLuNbLCluWG6ANq+EjK/PU/Y0u4pfCVlfnqfsaXcah4boLbw3QBunwl5X56n7Gl3FnFcIuV5x0eU8X006VBS63FmoeH6Ch4foAzvjxlj6fW/yYX/jJhn5lhX/AC6q7prXDDO1/KvF7TXPD9BQ6HQBuKPCHlmO3GSn0TpYV9lNHu+DrhIq4qvyPH8Wp1f0atTjxanNbac1drSa1pq17Nbr8qdDoIdB+S6aaalFuMoyTupRa2NNJp+RoD6mB5Hg5zr+EMPoVmljMOoxrpauMT+TWit0rO68kk1uPXAAAAAAAAAAAAAAAAAAAAAAHkuE/wDs+T3VqL/fS/E5z8IuEVKSU/c2dI4T/wCzav7Sh97E5NiJeL9QGRVzshrXEvrjq1+TVqMeWdcNXiZa/rR3X3Hm671sx6ktcelv+ST/AAJJJoeted1PmZeqUe4onndB/wBy16JRPKNlLZR6medsLW4l/wCaPcWpZ0w5mWpedHuPMNlLYG3yhlrTXiZVqEv/AFVYetSjfqZrXlHFfSZ+yolhspbAyHlHFfSJeyolLyjifpEvZUTHZSwMn4RxPPy9lRKXlHEc/L2dIxrkNgZLyhiOfl7OkUPKOI5+Xs6RjtluTA9JhMY504TvfSim9m21n77lzjma7N6UXQipPY5L1Xv+Js7U9/YBbdVkcaXbU9/YLU9/YB6bgryhxWVKKezEU6uHe75PGR98Lf8Akd5Pm7INWFPGYOcXrji8L768E+0+kQAAAAAAAAAAAAAAAAAAAAADyvCcvzZX+3Q++gcgxEvF+o7Fwlr82Yno4l/xoHGK78X6gNDXlrMapLXD7T+7mXK71sx6j1w+0/u5gXWyhshspbAqbKGyGylsCXIyHk+vzFfbb5qrt3bNpiS1pp7HqM55axF3JTs5OcpWutNztpXd72ejHUmk7LcBYng6ys3SrJO9m6dRJpOz8nkeoxmzPWXMQtK00uM+Woqyn4CgrrZqjGKVkraKe1GtuBLf9f1/XqKWyGyGwDZQ2S2USYFWFqNUoW3y7InpMzs3pZRliE8TDCww1OFSVSpHTi9OTXnRUdm1vyo8zh/moemXYj0mZ2cNPA8qjWpTrQxVOnTtTcIuOhNyv4Sae31WDXzjM5aehyjwb1KO3HU5NpSUVS8LReyVlVbt0nmcrZGnh4Sm6yqaNtSg4Xu0tuk95vspZ+Uq39xVi0kk9KlsV9WpbNfYebyjleNWEoKM1paOuUlLZbuJNTO/WfatZAqyeMwav/1mE+/gfXJ8i5tr8uwX+Nwn38D66KAAAAAAAAAAAAAAAAAAAAADzXCOvzXi/s03/FgcSrPxfqO4cIavkzF/s4vqnE4ZVfiwNDXetmPN64faf8ki9WesxcTVjDRlJ2Sl/pkgLrZS2YTyrT3S6l3kfClPdLqXeBmNlLZhvKUN0upd5DyjDdLqXeBltlLZi/CEN0upd5HL4bpdS7wMlkNmNy6H1upd5HLofW6l3gZBDZj8th9bqXeRyyPT1LvAvsoky08XHp6l3lDxUenqXeBlYf5uGza/ItyK/UupFNH5qHpfYipMCerqQ9S6kRcm6A2Wa/6fgNn6dg/IvpED63PknNTXlDJ9vp+D/wDogfWwAAAAAAAAAAAAAAAAAgMgCSLkNlEmBo8/HfJuMX/Zb6pI4NVl4B3bPJOWAxiWt8nqPqV/wOB1J+ABqKz1moyw9cV9WT95tKr1mLxcZV6WlFTSU5aMr6MmldJ2adtQGjGo37p0+apdU/8AcUOjTu/Fw2LyS6ekDSWQsjdPD0+bj+93lLw1PzI+/vA09hZG35NT81e8jksPNXvA1NkLI2vJYeaiOSw80DV2FjZ8lh5pHJoeaBrCDYvDwvs8neY+KpqKVlbWBnU/moemX4EaN09mvcXsFG6pJ75diNsqKlXpaSvdyvfy2jdAaNR261rt6NROjt2a2vJq1HpsdhYcoo+CvCU29z0bWv1kYrDR5TS1LXGTfS42t2idrZiZYWZcfzjgPLfHYR/x4H1epnzPkqko5WydZWcsXhm+m1aB9IUphIy7gtxZXcCSSESAAAAAAAAAAAEMglgChluZesQ4gazFxTTjJXjJOMk9ji1Zo+fs783amFqyVKWnRbbg/wBZRvqUlv6fKfR9SgntOaZy4GnXqTcVqvZbrLUv66QOG1FJbWusw8VGTcWtdr7NdjqlbNKk9sL+nWUwzSor9W3o1Acq0Zbn7ybS3S6mdYWatLcT8VaW5gcm0Z+bLqY0Z+bLqZ1n4r0tzHxXpbmBybRn5supkaM/Nl1M618V6W5kfFeluYHJtCfmy6mRoT82XUzrXxXp7mR8V6e5gcm0J+bLqZGhPdLqZ1l5r09zKXmtT3MDkzhLdLqZS4S3PqOryzVp7mWp5rwXkYHgsC/mvTM3FN+Po+mf8pGUMgVaM1GMZNRcpRat8mWtLX0aiw8LWvGWhNOPybaCtfaBtcc/ynD/AGav+kjFP8ppfs6nbE1s6FeUlNxqaUdSfg6vUTLDV3JT0amklZPwNS9FxOltzMN1kx/nbJv+JofexPoWhI4JmLkLEVsoYatJaqFSFaTlKCehCSb0Yp62d7oQYrMZcGXEUQiXEgqUVEIkAAAAAAAAAAAAAAAACxjX4upbboS7DxzwV0ezxKvCS+q+w0qoagPPywZZrYTWrLeeilhy1PDa091wPP8AJXuHJnuN7xCHEIDQ8me7tHJnu7TfcQhxCA0PJnu7RyZ7u033EIjiEBouTPd2jkz3dpveTocQgNDyZ7u0cle7tN9ydDk6A0HJXuDwvQb/AJOimWGuBpnk9SSuij4Kju9yPRxw2ouU8NrQHmPgleb7ifgpbvceqlh/CXoDw/hL0AaPIuD4vEUpLV4dn6Gmn2nutFGko0PGwe5o3gEWJAAAAAAAAAAAAAAAAAAAACmotT9DMPiiQBQ6RTOiQAI4kcSAA4kcSAA4kcQQAJ4gcSAA4kcSQAJ4kjiQAK1RKlS1gAVOnrHF6wAJhT8JPpM0AAAAAAAAAAAAP//Z" ,   category: "Printers" }
];

function ManageProducts() {
  const [products, setProducts] = useState(() => {
  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : allProducts;
});

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null); // حالة لتحديد المنتج الذي يتم تعديله
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    stock: "", 
    image: "",
    category: "PC"
  });
  useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
}, [products]);

const filteredProducts = products.filter(product => 
  product.name.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase())
);

  // قائمة الفئات المستخرجة من المنتجات
  const categories = [...new Set(products.map(product => product.category))];

  // دالة إضافة منتج جديد
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }
    
    
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", price: "", stock: "", image: "", category: "PC" });
    setShowForm(false);
  };

  // دالة بدء التعديل
  const handleEdit = (product) => {
    setEditingId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category: product.category
    });
  };

  // دالة حفظ التعديلات
  const handleSaveEdit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }
    
    const updatedProducts = products.map(p => 
      p.id === editingId 
        ? { 
            ...p, 
            name: newProduct.name,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            image: newProduct.image,
            category: newProduct.category
          }
        : p
    );
    
    setProducts(updatedProducts);
    setEditingId(null);
    setNewProduct({ name: "", price: "", stock: "", image: "", category: "PC" });
  };

  // دالة إلغاء التعديل
  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({ name: "", price: "", stock: "", image: "", category: "PC" });
  };

  // دالة حذف المنتج
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // تجميع المنتجات حسب الفئة
 const filteredCategories = categories.filter(category =>
  filteredProducts.some(product => product.category === category)
);

const productsByCategory = {};
filteredCategories.forEach(category => {
  productsByCategory[category] = filteredProducts.filter(p => p.category === category);
});

  return (
   <div className="w-screen h-screen p-6 bg-white flex flex-col relative">
<h1 className="text-3xl font-bold text-gray-800 mb-4">Manage Products</h1>
<div className="mb-6 flex gap-2 flex-wrap items-center">
  <div className="relative flex-1 min-w-[250px]">
    <Search className="absolute right-3 top-3 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

      
      {/* زر إضافة منتج جديد - أزرق */}
      <div className="mb-6">
       <button
  className="px-4 py-3 !bg-blue-500 hover:!bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
  onClick={() => {
    setEditingId(null);
    setShowForm(!showForm);
  }}
>
  <FaPlus className="text-lg" />
  <span>{showForm ? "Cancel" : "Add New Product"}</span>
</button>

      </div>

      {/* نموذج إضافة/تعديل منتج */}
      {(showForm || editingId) && (
        <div className="mb-8 p-6 border rounded-lg shadow-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Product Name" 
              value={newProduct.name} 
              onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
              className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input 
              placeholder="Price (DA)" 
              type="number" 
              value={newProduct.price} 
              onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
              className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input 
              placeholder="Stock Quantity" 
              type="number" 
              value={newProduct.stock} 
              onChange={e => setNewProduct({...newProduct, stock: e.target.value})} 
              className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <select 
              value={newProduct.category} 
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {filteredCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input 
              placeholder="Image URL" 
              value={newProduct.image} 
              onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
              className="border p-3 rounded w-full md:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button 
               className="px-4 py-3 !bg-blue-500 hover:!bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
              onClick={editingId ? handleSaveEdit : handleAddProduct}
            >
              <FaSave />
              <span>{editingId ? "Save Changes" : "Add Product"}</span>
            </button>
            {editingId && (
              <button 
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                onClick={handleCancelEdit}
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* عرض جداول المنتجات حسب الفئة */}
      {filteredCategories.map(category => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-gray-300 text-gray-800">
            {category} ({productsByCategory[category].length} products)
          </h2>
          
          {productsByCategory[category].length === 0 ? (
            <p className="text-gray-500 italic">No products in this category</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100 text-gray-700 sticky top-0">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left">Image</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Price (DA)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Stock</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsByCategory[category].map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                   <td className="p-3 text-left">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover rounded border"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">{product.name}</td>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">
                        {product.price.toLocaleString()} DA
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm ${product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="flex gap-2">
                          {/* زر التعديل */}
                      <button
  onClick={() => handleEdit(product)}
  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
  title="Edit product"
>
  <FaEdit size={18} />
</button>

                          
                          {/* زر الحذف مع سلة المهملات الحمراء */}
                  <button
  onClick={() => handleDelete(product.id)}
  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
  title="Delete product"
>
  <FaTrash size={18} />
</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* ملخص المنتجات */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg shadow-sm border">
        <h3 className="font-bold text-lg mb-3 text-gray-800">Products Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Total Categories</p>
            <p className="text-2xl font-bold text-green-600">{categories.length}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <p className="text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-purple-600">
              {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()} DA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;