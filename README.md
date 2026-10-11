# TOPSHOP COFFEE — React E-Commerce App

A modern coffee shop e-commerce application built with React, React Router, and Firebase Firestore. Browse the menu, add drinks to your cart, place orders, and manage your order history — all in a responsive, modern UI.

## Live Demo

**[View the live app](#)** _(link will be added after deployment)_

## Features

- **Browse the menu** — handcrafted drinks fetched from Firebase Firestore
- **Search and filter** — filter by category (Coffee, Cold Drinks, Specialty) and search by name
- **Drink detail pages** — slug-based URLs (e.g. `/drink/milk-shake`) with quantity selection
- **Shopping cart** — add, update quantities, remove items, persisted in `localStorage`
- **Checkout** — confirm your order with a styled dialog, order history saved
- **Order history** — view past orders, delete individual orders, or clear all
- **Contact form** — client-side validation with per-field error messages
- **Toast notifications** — feedback on every action
- **Responsive design** — mobile, tablet, and desktop layouts
- **Dark theme** — consistent styling with red accents

## Tech Stack

- **React 18** — component-based UI
- **Vite** — fast build tool and dev server
- **React Router v6** — client-side routing with dynamic URL params
- **Firebase Firestore** — cloud database for menu items
- **Context API** — global state for cart, toasts, and confirm dialogs
- **Custom Hooks** — `useDrinks`, `useBestSellers`, `useLocalStorage`
- **CSS Grid & Flexbox** — responsive layouts without a framework
- **react-icons** — icon library

## Setup

### Prerequisites

- Node.js 18+ and npm
- A Firebase project with Firestore enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/topshop-coffee.git
   cd topshop-coffee