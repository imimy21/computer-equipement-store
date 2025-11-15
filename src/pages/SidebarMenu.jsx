import React from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ isOpen, onClose }) => {
  const categories = [
    { id: 1, label: "Laptop", path: "/PCStore" },
    { id: 2, label: "Components", path: "/composants" },
    { id: 3, label: "Périphériques & accessoires", path: "/peripheriques" },
    { id: 4, label: "Printer", path: "/printers" },
    { id: 5, label: "Computer Monitors", path: "/Monitor" },
    { id: 6, label: "Computer Cases", path: "/cases" },
    { id: 7, label: "Cables & Adapters", path: "/CablesAdapters" },
    { id: 8, label: "Gaming Zone", path: "/gaming" },
  ];

  const otherLinks = [
    { label: "Offres spéciales", path: "/offers" },
    { label: "Panier", path: "/cart" },
    { label: "Mon Compte", path: "/account" },
    { label: "Support", path: "/support" },
    { label: "À propos", path: "/about" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : "-250px",
          height: "100vh",
          width: "250px",
          backgroundColor: "#fff",
          boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
          padding: "20px",
          transition: "left 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Catégories</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((cat) => (
            <li
              key={cat.id}
              style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}
            >
              <Link
                to={cat.path}
                style={{ textDecoration: "none", color: "#333" }}
                onClick={onClose} // يغلق الـ sidebar عند النقر
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <ul style={{ listStyle: "none", padding: 0 }}>
          {otherLinks.map((link, idx) => (
            <li
              key={idx}
              style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}
            >
              <Link
                to={link.path}
                style={{ textDecoration: "none", color: "#333" }}
                onClick={onClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default SidebarMenu;

