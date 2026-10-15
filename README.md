# TOPSHOP COFFEE — React E-Commerce App

A full-stack coffee shop e-commerce application built with React, React Router, Firebase Authentication, and Cloud Firestore. Users can browse the menu, add drinks to their cart, sign up or log in, place orders, and view their personal order history — all in a responsive, modern UI.

## Live Demo

**https://topshop-coff.vercel.app**

## Features

### Shopping
- **Browse the menu** — handcrafted drinks fetched from Firestore
- **Search and filter** — by category (Coffee, Cold Drinks, Specialty) and by name
- **Drink detail pages** — slug-based URLs (e.g. `/drink/milk-shake`) with quantity selection
- **Shopping cart** — add, update quantities, remove items; persisted per user
- **Checkout** — confirm order with a styled dialog; saved to Firestore
- **Best sellers** — home page shows the top drinks ranked by real order counts

### Authentication
- **Email/password signup** with a custom username
- **Login and logout** with session persistence across refreshes
- **Password reset** via email link (Firebase-hosted reset page)
- **Protected routes** — guests trying to view `/orders` are redirected to login

### Per-User Data
- **Each user's cart is private** — stored by UID in `localStorage`; guests start empty
- **Guest cart merge** — if a guest adds items and then logs in, their cart merges with their saved cart
- **Order history is per user** — enforced at the database level with Firestore security rules

### UX
- **Toast notifications** — success and informational toasts for every action
- **Confirm dialogs** — replace browser `confirm()` with styled modals
- **Client-side validation** — per-field error messages on all forms
- **Responsive design** — mobile, tablet, and desktop layouts
- **Dark theme** — consistent styling with red accents

## Tech Stack

- **React 18** — component-based UI
- **Vite** — fast build tool and dev server
- **React Router v6** — client-side routing with dynamic URL params
- **Firebase Authentication** — email/password signup, login, logout, password reset
- **Firebase Firestore** — cloud database for menu items and per-user orders
- **Firestore Security Rules** — per-user data isolation enforced at the DB layer
- **Context API** — global state for auth, cart, toasts, and confirm dialogs
- **Custom Hooks** — `useAuth`, `useCart`, `useDrinks`, `useBestSellers`
- **CSS Grid & Flexbox** — responsive layouts without a framework
- **react-icons** — icon library

## Setup

### Prerequisites

- Node.js 18+ and npm
- A Firebase project with **Authentication (Email/Password)** and **Firestore** enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhizi/TOPSHOP-COFF.git
   cd TOPSHOP-COFF